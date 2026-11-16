// Test responsive mobile (viewport iPhone 13, tactile)
const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const [base = "http://localhost:3000", outdir = "/tmp/madinati-mobile"] = process.argv.slice(2);
  fs.mkdirSync(outdir, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--no-sandbox"] });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148",
  });
  const page = await ctx.newPage();
  const failed = [];
  page.on("response", (r) => { if (r.status() >= 400) failed.push(r.status() + " " + r.url()); });
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 150)));
  const shot = (n) => page.screenshot({ path: `${outdir}/${n}.png` });
  const visible = async (sel) => {
    const l = page.locator(sel);
    return (await l.count()) > 0 && (await l.first().isVisible());
  };

  await page.goto(base, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2500);

  // 1. Onboarding mobile
  console.log("1. onboarding visible:", await visible(".fixed.inset-0.z-50"));
  await shot("01-onboarding");
  await page.getByRole("button", { name: "Passer" }).click();
  await page.waitForTimeout(400);

  // 2. Layout mobile : bottom nav visible, sidebar cachée, footer caché
  const nav = page.locator("nav").last();
  console.log("2. bottom nav visible:", await nav.isVisible(), "| sidebar hidden:", !(await visible("aside")), "| zoom:", await page.evaluate(() => window.__map.getZoom()));
  await shot("02-map-mobile");

  // 3. Tap marqueur -> popup compact
  await page.locator(".mkpin-issue").first().tap();
  await page.waitForTimeout(700);
  const popup = page.locator(".madinati-popup");
  const pw = await popup.locator(".leaflet-popup-content").boundingBox();
  console.log("3. popup open:", await popup.count() > 0, "| popup width:", pw && Math.round(pw.width), "<= 390:", pw ? pw.width <= 390 : false);
  await shot("03-popup-mobile");

  // 4. Voir les détails -> bottom sheet pleine largeur
  await page.getByRole("button", { name: /Voir les détails/ }).tap();
  await page.waitForTimeout(900);
  const panel = await page.locator("aside.panel-scroll").boundingBox();
  console.log("4. bottom sheet open:", !!panel, "| width:", panel && Math.round(panel.width), "| at bottom:", panel && Math.round(panel.y + panel.height), "~844");
  await shot("04-sheet-detail");
  await page.getByRole("button", { name: /Soutenir/ }).tap();
  await page.waitForTimeout(400);

  // 5. Formulaire en bottom sheet + envoi
  await page.locator("aside.panel-scroll button").first().tap(); // fermer
  await page.waitForTimeout(300);
  const before = await page.locator(".leaflet-marker-icon").count();
  await page.getByRole("button", { name: "Signaler un problème" }).tap();
  await page.waitForTimeout(500);
  await shot("05-sheet-report");
  await page.locator("textarea").fill("Lampadaire éteint depuis une semaine devant Bab Doukkala.");
  await page.getByRole("button", { name: "Envoyer le signalement" }).tap();
  await page.waitForTimeout(1500);
  const after = await page.locator(".leaflet-marker-icon").count();
  console.log("5. report submit on mobile:", after === before + 1, `(${before}->${after})`);
  await shot("06-after-submit");

  // 6. Propositions via bottom nav + vote
  await page.locator("nav").last().getByRole("button", { name: /Propositions/ }).tap();
  await page.waitForTimeout(600);
  await shot("07-proposals-mobile");
  await page.getByRole("button", { name: /^Voter/ }).first().tap();
  await page.waitForTimeout(400);

  // 7. AR + dark sur mobile
  await page.getByRole("button", { name: "عربي" }).tap();
  await page.waitForTimeout(400);
  console.log("7. AR dir:", await page.evaluate(() => document.documentElement.dir));
  await page.getByTitle("Dark mode").tap();
  await page.waitForTimeout(400);
  await shot("08-arabic-dark-mobile");
  console.log("   dark:", await page.evaluate(() => document.documentElement.classList.contains("dark")));

  console.log("failed requests:", failed.length ? failed : "NONE");
  console.log("pageerrors:", errs.length ? errs : "none");
  await browser.close();
})().catch((e) => { console.error("FAILED:", e.message); process.exit(1); });
