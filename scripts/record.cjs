// Plan C: enregistre la démo complète en vidéo locale (webm).
// node scripts/record.cjs <baseUrl> <outfile.webm>
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const [base = "http://localhost:3000", out = "demo-backup.webm"] = process.argv.slice(2);
  const tmpDir = "/tmp/madinati-video";
  fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.mkdirSync(tmpDir, { recursive: true });

  const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--no-sandbox"] });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: tmpDir, size: { width: 1440, height: 900 } },
  });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2000);

  const pause = (ms) => page.waitForTimeout(ms);

  // 0. fermer l'onboarding si présent
  await page.getByRole("button", { name: "Passer" }).click().catch(() => {});
  await pause(400);

  // 1. découvre le nid-de-poule (popup) et le soutient (panneau détails)
  await page.locator(".mkpin-issue").first().click();
  await pause(700);
  await page.getByRole("button", { name: /Voir les détails/ }).click();
  await pause(900);
  await page.getByRole("button", { name: /Soutenir/ }).first().click();
  await pause(700);
  await page.locator("aside.panel-scroll button").first().click().catch(() => {}); // fermer le panneau
  await pause(400);

  // 2. signale un nouveau problème
  await page.getByRole("button", { name: "Signaler un problème" }).click();
  await pause(500);
  await page.selectOption("select", "bab-doukkala");
  await page.getByRole("button", { name: "Éclairage public", exact: true }).click();
  await page.locator("textarea").fill("Lampadaire éteint depuis une semaine devant Bab Doukkala, la rue est noire le soir.");
  await pause(600);
  await page.getByRole("button", { name: "Envoyer le signalement" }).click();
  await pause(1800);

  // 3. vote sur une proposition
  await page.getByRole("button", { name: /Propositions/ }).click();
  await pause(600);
  await page.getByRole("button", { name: /Voter/ }).nth(1).click();
  await pause(900);

  // 4. suit le chantier Jemaa el-Fnaa jusqu'à complétion (simulation)
  await page.getByRole("button", { name: /Carte de Marrakech/ }).click();
  await pause(400);
  await page.locator(".mkpin-project").first().click();
  await pause(1200);
  const sim = page.getByRole("button", { name: /Simuler une mise à jour/ });
  if (await sim.count()) {
    await sim.click();
    await pause(1500);
  }
  await pause(1000);

  await context.close();
  await browser.close();
  const video = fs.readdirSync(tmpDir).find((f) => f.endsWith(".webm"));
  fs.copyFileSync(path.join(tmpDir, video), out);
  console.log("backup video saved:", out, `(${(fs.statSync(out).size / 1e6).toFixed(1)} MB)`);
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
