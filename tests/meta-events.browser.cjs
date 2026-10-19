// Run after npm run build. PLAYWRIGHT_MODULE may point to a preinstalled Playwright package.
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const root = path.resolve(__dirname, '../out');
const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain' };
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let file = path.resolve(root, '.' + pathname);
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if (pathname === '/') file = path.join(root, 'index.html');
  else if (!path.extname(file)) file += '.html';
  if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true, ...(process.env.TEST_BROWSER_PATH ? { executablePath: process.env.TEST_BROWSER_PATH } : {}) });
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    let networkFailure = true;
    let formPosts = 0;
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin === origin) return route.continue();
      if (url.hostname === 'docs.google.com' && url.pathname.endsWith('/formResponse')) {
        formPosts += 1;
        return networkFailure ? route.abort('failed') : route.fulfill({ status: 200, body: 'mock acknowledgement' });
      }
      return route.abort(); // Never send test data or events outside this machine.
    });
    await context.addInitScript(() => {
      window.__metaCalls = [];
      window.fbq = (...args) => window.__metaCalls.push(args);
    });
    const page = await context.newPage();
    page.on('dialog', dialog => dialog.accept());
    const events = name => page.evaluate(name => window.__metaCalls.filter(x => (x[0] === 'trackSingle' || x[0] === 'trackSingleCustom') && x[2] === name), name);
    const waitEvent = (name, count) => page.waitForFunction(({ name, count }) => window.__metaCalls.filter(x => x[2] === name).length === count, { name, count });
    await page.goto(origin + '/?section=pricing&utm_source=instagram&utm_content=workflow&fbclid=test_click_id');
    await waitEvent('ViewContent', 1);
    await page.waitForFunction(() => !new URL(location.href).searchParams.has('section'));
    assert.equal(new URL(page.url()).searchParams.get('utm_content'), 'workflow');
    assert.equal(new URL(page.url()).searchParams.get('fbclid'), 'test_click_id');
    await waitEvent('PricingViewed', 1);
    await page.locator('#features h2').scrollIntoViewIfNeeded();
    await waitEvent('FeaturesViewed', 1);
    await page.locator('#pricing h2').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1250);
    assert.equal((await events('PricingViewed')).length, 1);
    const base = await page.evaluate(() => window.__metaCalls.filter(x => x[0] === 'track' && x[1] === 'PageView'));
    assert.equal(base.length, 1, 'initial PageView belongs to the original base code only');

    await page.getByRole('button', { name: 'Schedule Demo', exact: true }).click();
    await waitEvent('DemoFormOpened', 1);
    await page.locator('input[type=text]').focus();
    assert.equal((await events('DemoFormStarted')).length, 0);
    await page.locator('input[type=text]').fill('Tracking Test Person');
    await page.locator('input[type=email]').fill('tracking-test@example.test');
    assert.equal((await events('DemoFormStarted')).length, 1);
    await page.getByRole('button', { name: 'Close demo form', exact: true }).click();
    await page.locator('form').waitFor({ state: 'detached' });
    assert.equal((await events('DemoFormClosed'))[0][3].form_state, 'started');
    await page.getByRole('button', { name: 'Schedule Demo', exact: true }).click();
    await page.locator('input[type=tel]').fill('9990001234');
    await page.locator('input[type=datetime-local]').fill('2026-12-01T10:00');
    assert.equal((await events('DemoFormStarted')).length, 1, 'reopened draft is the same form journey');
    await page.locator('form').evaluate(form => form.requestSubmit());
    await waitEvent('DemoFormSubmitError', 1);
    assert.equal((await events('DemoFormSubmitUnverified')).length, 0);
    networkFailure = false;
    await page.locator('form').evaluate(form => { form.requestSubmit(); form.requestSubmit(); });
    await waitEvent('DemoFormSubmitUnverified', 1);
    await page.getByRole('heading', { name: 'Request sent', exact: true }).waitFor();
    assert.equal((await events('DemoFormSubmitAttempt')).length, 2, 'double-submit guard blocks duplicate network requests');
    assert.equal(formPosts, 2);
    await page.getByRole('button', { name: 'Close', exact: true }).click();
    await page.locator('form').waitFor({ state: 'detached' });

    for (const [button, source] of [
      [page.getByRole('button', { name: 'Get Started', exact: true }), 'hero_get_started'],
      [page.getByRole('button', { name: 'Get Lifetime Access', exact: true }).first(), 'hero_lifetime_access'],
      [page.locator('#pricing').getByRole('button', { name: 'Get Lifetime Access', exact: true }), 'pricing_lifetime_access'],
      [page.getByRole('button', { name: 'Get Started Now', exact: true }), 'footer_get_started'],
      [page.getByRole('button', { name: 'Contact Sales', exact: true }), 'footer_contact_sales'],
    ]) {
      await button.click();
      await page.locator('form').waitFor();
      const clicked = await events('DemoClicked');
      assert.equal(clicked.at(-1)[3].cta_source, source);
      await page.getByRole('button', { name: 'Close demo form', exact: true }).click();
      await page.locator('form').waitFor({ state: 'detached' });
    }
    const calls = await page.evaluate(() => window.__metaCalls);
    const tracked = calls.filter(x => x[0] === 'trackSingle' || x[0] === 'trackSingleCustom');
    assert.ok(tracked.every(x => x[1] === '1142810485096006'));
    assert.equal(tracked.filter(x => x[2] === 'Lead').length, 1, 'one Lead for the one resolved submission; failed attempt fires none');
    assert.ok(!tracked.some(x => x[2] === 'Schedule'));
    assert.ok(!JSON.stringify(tracked).includes('tracking-test@example.test'));
    assert.ok(!JSON.stringify(tracked).includes('Tracking Test Person'));
    assert.ok(!JSON.stringify(tracked).includes('9990001234'));
    assert.equal(new Set(tracked.map(x => x[4].eventID)).size, tracked.length);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(origin + '/?section=pricing');
    await waitEvent('PricingViewed', 1);
    await page.locator('#features h2').scrollIntoViewIfNeeded();
    await waitEvent('FeaturesViewed', 1);
    console.log('PASS: desktop/mobile visibility, attribution, all CTA sources, form lifecycle, duplicate-submit guard, retries, privacy and no false conversions. All external requests intercepted.');
    await context.close();
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
