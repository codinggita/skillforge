const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    errors.push(err.toString());
  });

  try {
    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2' });
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    
    await page.goto('http://localhost:5173/project/69ebb9b1a43ac8422b529e7f', { waitUntil: 'networkidle2' });
    console.log('---ERRORS---');
    errors.forEach(e => console.log(e));
    console.log('---END---');
  } catch(e) {
    console.error('Script Error:', e);
  } finally {
    await browser.close();
  }
})();
