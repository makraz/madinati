// Test des 6 demandes: i18n, submit, apparition marqueur, zoom out, onboarding, dark mode, popup.
const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const [base = "http://localhost:3000", outdir = "/tmp/madinati-test2"] = process.argv.slice(2);
  fs.mkdirSync(outdir, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--no-sandbox"] });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const failed = [];
  page.on("response", (r) => { if (r.status() >= 400) failed.push(r.status() + " " + r.url()); });
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 150)));
  const shot = (n) => page.screenshot({ path: `${outdir}/${n}.png` });

  await page.goto(base, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2500);

  // 1. Onboarding à la première visite
  const onbVisible = await page.locator(".fixed.inset-0.z-50").count();
  console.log("1. onboarding visible on first visit:", onbVisible > 0);
  await shot("01-onboarding");
  await page.getByRole("button", { name: "Suivant" }).click();
  await page.waitForTimeout(200);
  await page.getByRole("button", { name: "Suivant" }).click();
  await page.waitForTimeout(200);
  await page.getByRole("button", { name: "C'est parti !" }).click();
  await page.waitForTimeout(400);
  console.log("   onboarding closed, localStorage:", await page.evaluate(() => localStorage.getItem("madinati:onboarded")));

  // 2. Popup au clic sur un marqueur (avec image)
  await page.locator(".mkpin-issue").first().click();
  await page.waitForTimeout(700);
  const popup = await page.locator(".madinati-popup");
  const popupHasImg = await popup.locator("img").count();
  const popupText = await popup.innerText().catch(() => "");
  console.log("2. popup open:", await popup.count() > 0, "| img in popup:", popupHasImg > 0, "| has ref:", /MRK-/.test(popupText));
  await shot("02-popup");
  // détails depuis le popup
  await page.getByRole("button", { name: /Voir les détails/ }).click();
  await page.waitForTimeout(900);
  console.log("   detail panel open:", await page.locator("aside.panel-scroll").count() > 0);
  await page.locator("aside.panel-scroll button").last().click(); // fermer
  await page.waitForTimeout(300);

  // 3. Submit invalide -> erreur inline, pas d'envoi
  const markersBefore = await page.locator(".leaflet-marker-icon").count();
  await page.getByRole("button", { name: "Signaler un problème" }).click();
  await page.waitForTimeout(400);
  await page.locator("textarea").fill("abc");
  await page.getByRole("button", { name: "Envoyer le signalement" }).click();
  await page.waitForTimeout(400);
  const errShown = await page.getByText(/5 caractères minimum/).count();
  console.log("3a. short desc blocked with inline error:", errShown > 0, "| drawer still open:", await page.locator("form").count() > 0);
  // 3b. Submit valide -> marqueur apparaît
  await page.locator("textarea").fill("Lampadaire éteint depuis une semaine devant Bab Doukkala, la rue est noire le soir.");
  await page.getByRole("button", { name: "Envoyer le signalement" }).click();
  await page.waitForTimeout(1500);
  const markersAfter = await page.locator(".leaflet-marker-icon").count();
  const toast = await page.locator(".pointer-events-none").innerText().catch(() => "");
  console.log("3b. marker added:", markersAfter === markersBefore + 1, `(${markersBefore}->${markersAfter})`, "| toast ref:", /MRK-\d{5}/.test(toast));
  await shot("03-after-submit");

  // 4. Zoom out fonctionne (niveau de zoom diminue, tuiles chargées, pas de 404)
  const z0 = await page.evaluate(() => window.__map.getZoom());
  for (let i = 0; i < 2; i++) { await page.locator(".leaflet-control-zoom-out").dispatchEvent("click"); await page.waitForTimeout(400); }
  const z1 = await page.evaluate(() => window.__map.getZoom());
  const tilesLoaded = await page.locator(".leaflet-tile-loaded").count();
  console.log("4. zoom", z0, "->", z1, "| zoomed out ok:", z1 < z0, "| tiles loaded:", tilesLoaded);
  await shot("04-zoomed-out");
  for (let i = 0; i < 2; i++) { await page.locator(".leaflet-control-zoom-in").dispatchEvent("click"); await page.waitForTimeout(300); }

  // 5. Bouton "Réinitialiser la démo" : données restaurées + vue réajustée
  const markersAfterReset = await page.locator(".leaflet-marker-icon").count();
  await page.getByRole("button", { name: "Réinitialiser la démo" }).click();
  await page.waitForTimeout(900);
  const markersReset = await page.locator(".leaflet-marker-icon").count();
  const zAfterReset = await page.evaluate(() => window.__map.getZoom());
  const panelClosed = await page.locator("aside.panel-scroll").count();
  console.log("5. reset: markers", markersAfterReset, "->", markersReset, "(9 attendu) | zoom back:", zAfterReset, "| panel closed:", panelClosed === 0);

  // 5. Dark mode
  await page.getByTitle("Dark mode").click();
  await page.waitForTimeout(400);
  const darkOn = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  console.log("5. dark mode applied:", darkOn, "| persisted:", await page.evaluate(() => localStorage.getItem("madinati:theme")));
  await shot("05-dark");

  // 6. Langue arabe -> RTL + textes arabes
  await page.getByRole("button", { name: "عربي" }).click();
  await page.waitForTimeout(500);
  const dir = await page.evaluate(() => document.documentElement.dir);
  const fab = await page.getByRole("button", { name: "بلّغ عن مشكلة" }).count();
  console.log("6. AR: dir=", dir, "| arabic FAB present:", fab > 0);
  await shot("06-arabic-dark");
  await page.getByRole("button", { name: "FR" }).click();
  await page.getByTitle("Dark mode").click(); // retour clair
  await page.waitForTimeout(300);

  console.log("failed requests:", failed.length ? failed : "NONE");
  console.log("pageerrors:", errs.length ? errs : "none");
  await browser.close();
})().catch((e) => { console.error("FAILED:", e.message); process.exit(1); });
