// Screenshot helper (CJS so NODE_PATH works): node scripts/shot.cjs <url> <outfile> [w] [h] [waitMs]
const { chromium } = require("playwright");

(async () => {
  const [url, out, w = "1440", h = "900", waitMs = "2500"] = process.argv.slice(2);
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage({ viewport: { width: +w, height: +h } });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 200)));
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(+waitMs);
  await page.screenshot({ path: out });
  console.log("saved", out);
  console.log("console errors:", errors.length ? errors : "none");
  await browser.close();
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
