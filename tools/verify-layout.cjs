const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const url = process.argv[2] || 'http://localhost:5173/';
const outDir = path.resolve(process.cwd(), 'test-artifacts');
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 900 },
];

(async () => {
  const browserPaths = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ];
  const executablePath = browserPaths.find((candidate) => fs.existsSync(candidate));
  const browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  });
  const results = [];

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.screenshot({
      path: path.join(outDir, `${viewport.name}.png`),
      fullPage: true,
    });

    const audit = await page.evaluate(() => {
      const images = [...document.images].map((image) => ({
        src: image.getAttribute('src'),
        ok: image.complete && image.naturalWidth > 0,
      }));

      const overflowingText = [...document.querySelectorAll('a, button, h1, h2, h3, p, span')]
        .filter((node) => {
          const style = getComputedStyle(node);
          if (style.display === 'none' || style.visibility === 'hidden') return false;
          return node.scrollWidth > node.clientWidth + 2;
        })
        .slice(0, 8)
        .map((node) => node.textContent.trim().replace(/\s+/g, ' ').slice(0, 80));

      return {
        title: document.title,
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 2,
        brokenImages: images.filter((image) => !image.ok),
        overflowingText,
      };
    });

    results.push({ viewport, audit });
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
