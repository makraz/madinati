// Offline resilience test: block ALL non-localhost traffic, reload, verify app + tiles render.
// Also verifies the demo reset button. node scripts/offline.cjs <baseUrl> <outfile>
const { chromium } = require("playwright");

(async () => {
  const [base = "http://localhost:3000", out = "/tmp/offline.png"] = process.argv.slice(2);
  const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.route("**/*", (route) => {
    const u = route.request().url();
    if (u.startsWith("http://localhost") || u.startsWith("data:") || u.startsWith("blob:")) route.continue();
    else route.abort();
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 150)));
  await page.goto(base, { waitUntil: "load", timeout: 30000 });
  await page.waitForTimeout(3000);

  const tileImgs = await page.locator(".leaflet-tile-loaded").count();
  const markers = await page.locator(".leaflet-marker-icon").count();
  console.log("offline: loaded tiles =", tileImgs, "| markers =", markers);

  // reset button restores seed counts
  await page.getByRole("button", { name: "Réinitialiser la démo" }).click();
  await page.waitForTimeout(300);
  const sidebar = await page.locator("aside").first().innerText();
  console.log("after reset, sidebar:", sidebar.includes("Problèmes signalés (4)") ? "OK (4 issues)" : "MISMATCH");

  await page.screenshot({ path: out });
  console.log("saved", out, "| pageerrors:", errors.length ? errors : "none");
  await browser.close();
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
