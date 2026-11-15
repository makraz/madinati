// End-to-end demo flow test: node scripts/flow.cjs <baseUrl> <outdir>
const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const [base = "http://localhost:3000", outdir = "/tmp/madinati-shots"] = process.argv.slice(2);
  fs.mkdirSync(outdir, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 200)));
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));

  const shot = (name) => page.screenshot({ path: `${outdir}/${name}.png` });

  await page.goto(base, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2500);
  await shot("01-map");

  // 1. Click the pothole issue marker -> detail panel
  await page.locator(".mkpin-issue").first().click();
  await page.waitForTimeout(600);
  await shot("02-issue-detail");

  // 2. Support it
  await page.getByRole("button", { name: /Soutenir/ }).first().click();
  await page.waitForTimeout(400);
  await shot("03-supported");

  // 3. Report flow
  await page.getByRole("button", { name: "Signaler un problème" }).click();
  await page.waitForTimeout(400);
  await page.selectOption("select", "bab-doukkala");
  await page.getByRole("button", { name: "Voirie", exact: true }).click();
  await page.locator("textarea").fill("Trottoir très endommagé devant Bab Doukkala, dangereux pour les personnes âgées.");
  await shot("04-report-form");
  await page.getByRole("button", { name: "Envoyer le signalement" }).click();
  await page.waitForTimeout(900);
  await shot("05-submitted-toast");

  const ref = await page.locator("aside.panel-scroll").innerText();
  console.log("new issue panel contains ref:", /MRK-\d{5}/.test(ref));

  // 4. Proposals + vote
  await page.getByRole("button", { name: /Propositions/ }).click();
  await page.waitForTimeout(500);
  await shot("06-proposals");
  await page.getByRole("button", { name: /Voter/ }).first().click();
  await page.waitForTimeout(400);
  await shot("07-voted");

  // 5. Project marker -> simulate municipal update
  await page.getByRole("button", { name: /Carte de Marrakech/ }).click();
  await page.waitForTimeout(300);
  await page.locator(".mkpin-project").first().click();
  await page.waitForTimeout(600);
  await shot("08-project-detail");
  const simBtn = page.getByRole("button", { name: /Simuler une mise à jour/ });
  if (await simBtn.count()) {
    await simBtn.click();
    await page.waitForTimeout(1000);
    await shot("09-project-done");
    const txt = await page.locator("aside.panel-scroll").innerText();
    console.log("project shows 100% / Terminé:", txt.includes("100%") && txt.includes("Terminé"));
  } else {
    console.log("simulate button NOT found");
  }

  console.log("console errors:", errors.length ? errors : "none");
  await browser.close();
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
