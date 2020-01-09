const testSetup = require('../__shared__/test-setup');

const puppeteer = require('puppeteer');

test('can use wasm library in development', async () => {
  const { port, done } = await testSetup.scripts.start();

  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}/`);
    await page.waitForSelector('.wasm-result', { timeout: 0 });
    const output = await page.evaluate(() => {
      return Array.from(document.getElementsByClassName('wasm-result')).pop()
        .innerHTML;
    });
    expect(output).toMatchSnapshot();
  } finally {
    browser.close();
    done();
  }
});
test('can use wasm library in production', async () => {
  await testSetup.scripts.build();
  const { port, done } = await testSetup.scripts.serve();

  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}/`);
    await page.waitForSelector('.wasm-result', { timeout: 0 });
    const output = await page.evaluate(() => {
      return Array.from(document.getElementsByClassName('wasm-result')).pop()
        .innerHTML;
    });
    expect(output).toMatchSnapshot();
  } finally {
    browser.close();
    done();
  }
});
