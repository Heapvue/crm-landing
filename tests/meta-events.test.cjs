const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/lib/meta-events.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
}).outputText;

function makeBrowser(hostname = 'heapsync.heapvue.com', search = '') {
  const store = new Map();
  return {
    location: { hostname, search },
    sessionStorage: { getItem: k => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) },
    store,
  };
}

function setup(withPixel = true, hostname = 'heapsync.heapvue.com', search = '') {
  const calls = [];
  const timers = new Map();
  let id = 0;
  const browser = makeBrowser(hostname, search);
  const window = { crypto: { randomUUID: () => `test-event-${++id}` }, location: browser.location, sessionStorage: browser.sessionStorage };
  if (withPixel) window.fbq = (...args) => calls.push(args);
  const context = { exports: {}, window, Date, Set, URLSearchParams,
    setTimeout: fn => { const timer = ++id; timers.set(timer, fn); return timer; },
    clearTimeout: timer => timers.delete(timer),
  };
  vm.runInNewContext(source, context);
  return { api: context.exports, calls, timers, window, context };
}

test('does not duplicate the base PageView, but tracks route changes and return visits', () => {
  const { api, calls } = setup();
  api.trackPageVisit('/');
  api.trackPageVisit('/'); // React effect replay.
  assert.deepEqual(calls.map(x => x[2]), ['ViewContent']);
  api.trackPageVisit('/privacy');
  api.trackPageVisit('/');
  assert.deepEqual(calls.map(x => x[2]), ['ViewContent', 'PageView', 'PageView', 'ViewContent']);
  assert.ok(calls.every(x => x[0] === 'trackSingle' && x[1] === '1142810485096006'));
});

test('queues an early interaction until the base pixel becomes available, preserving its event ID', () => {
  const { api, calls, window, timers } = setup(false);
  api.trackMetaEvent('DemoFormStarted', { form_id: 'heapsync_demo' });
  assert.equal(calls.length, 0);
  assert.equal(timers.size, 1);
  window.fbq = (...args) => calls.push(args);
  api.flushMetaEvents();
  api.flushMetaEvents();
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], 'trackSingleCustom');
  assert.equal(calls[0][2], 'DemoFormStarted');
  assert.ok(calls[0][4].eventID);
  assert.equal(timers.size, 0);
});

test('section events deduplicate per visit rather than once for the entire browser lifetime', () => {
  const { api, calls } = setup();
  api.trackPageVisit('/');
  const first = api.getPageVisitKey() + ':pricing';
  api.trackMetaEvent('PricingViewed', {}, first);
  api.trackMetaEvent('PricingViewed', {}, first);
  api.trackPageVisit('/terms');
  api.trackPageVisit('/');
  api.trackMetaEvent('PricingViewed', {}, api.getPageVisitKey() + ':pricing');
  assert.equal(calls.filter(x => x[2] === 'PricingViewed').length, 2);
});

test('rejects extra runtime payload fields and assigns distinct IDs to actual occurrences', () => {
  const { api, calls } = setup();
  api.trackMetaEvent('DemoFormStarted', { form_id: 'heapsync_demo', email: 'never-send@example.test', phone: '12345678', name: 'Never Send' });
  api.trackMetaEvent('DemoFormSubmitAttempt', { submission_status: 'attempted' });
  assert.ok(!JSON.stringify(calls).includes('never-send'));
  assert.ok(!JSON.stringify(calls).includes('12345678'));
  assert.ok(!JSON.stringify(calls).includes('Never Send'));
  assert.notEqual(calls[0][4].eventID, calls[1][4].eventID);
  assert.ok(!calls.some(x => x[2] === 'Lead' || x[2] === 'Schedule'));
  api.trackMetaEvent('Lead', { submission_status: 'confirmed', cta_source: 'navbar', form_id: 'heapsync_demo', email: 'never-send@example.test' });
  const lead = calls.find(x => x[2] === 'Lead');
  assert.equal(lead[0], 'trackSingle', 'Lead is a standard event');
  assert.equal(lead[3].submission_status, 'confirmed');
  assert.ok(!JSON.stringify(lead).includes('never-send'));
});

test('tracking is inert off the production host and can be switched on per browser session', () => {
  const off = setup(true, 'localhost');
  off.api.trackMetaEvent('DemoClicked');
  off.api.trackPageVisit('/');
  off.api.trackPageVisit('/privacy');
  assert.equal(off.calls.length, 0);
  assert.equal(off.timers.size, 0, 'no retry timers while disabled');
  assert.equal(off.api.isMetaTrackingEnabled(), false);

  const on = setup(true, 'localhost', '?meta_debug=1');
  assert.equal(on.api.isMetaTrackingEnabled(), true);
  on.api.trackMetaEvent('DemoClicked');
  assert.equal(on.calls.length, 1);

  const sticky = setup(true, 'localhost');
  sticky.window.sessionStorage.setItem('heapsync_meta_debug', '1');
  assert.equal(sticky.api.isMetaTrackingEnabled(), true, 'a stored debug flag survives route changes');
  sticky.window.location.search = '?meta_debug=0';
  assert.equal(sticky.api.isMetaTrackingEnabled(), false, 'meta_debug=0 switches it off');

  const prod = setup(true, 'heapsync.heapvue.com');
  prod.window.location.search = '?meta_debug=0';
  assert.equal(prod.api.isMetaTrackingEnabled(), true, 'production is always on');
  for (const host of ['www.heapsync.heapvue.com', 'heapvue.com', 'heapsync.heapvue.com.evil.test', '127.0.0.1']) {
    assert.equal(setup(true, host).api.isMetaTrackingEnabled(), false, host);
  }
});

function runSnippet(hostname, search = '') {
  const snippetSource = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/lib/meta-pixel-snippet.ts'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
  }).outputText;
  const builder = {};
  vm.runInNewContext(snippetSource, { exports: builder, JSON });
  const code = builder.buildMetaPixelSnippet({ pixelId: '1142810485096006', hosts: ['heapsync.heapvue.com'], debugKey: 'heapsync_meta_debug' });
  const browser = makeBrowser(hostname, search);
  const inserted = [];
  const document = {
    createElement: () => ({}),
    getElementsByTagName: () => [{ parentNode: { insertBefore: node => inserted.push(node) } }],
  };
  // Like a browser, the global object is the window, so bare fbq(...) resolves to window.fbq.
  const window = { document, location: browser.location, sessionStorage: browser.sessionStorage, URLSearchParams };
  window.window = window;
  vm.runInNewContext(code, window);
  return { window, inserted, browser };
}

test('base snippet loads the pixel and queues init + PageView only on the production host or with the debug switch', () => {
  const prod = runSnippet('heapsync.heapvue.com');
  assert.equal(typeof prod.window.fbq, 'function');
  assert.deepEqual(Array.from(prod.window.fbq.queue, args => Array.from(args)), [['init', '1142810485096006'], ['track', 'PageView']]);
  assert.equal(prod.inserted.length, 1);
  assert.equal(prod.inserted[0].src, 'https://connect.facebook.net/en_US/fbevents.js');

  const local = runSnippet('localhost');
  assert.equal(local.window.fbq, undefined);
  assert.equal(local.inserted.length, 0);

  const debug = runSnippet('localhost', '?meta_debug=1');
  assert.equal(typeof debug.window.fbq, 'function');
  assert.equal(debug.browser.store.get('heapsync_meta_debug'), '1');

  const cleared = runSnippet('localhost', '?meta_debug=0');
  assert.equal(cleared.window.fbq, undefined);
});

test('a broken or unavailable tracker cannot break the form and retries stop', () => {
  const { api, window, timers } = setup();
  window.fbq = () => { throw new Error('tracker unavailable'); };
  assert.doesNotThrow(() => api.trackMetaEvent('DemoFormSubmitAttempt'));
  delete window.fbq;
  api.trackMetaEvent('DemoFormSubmitAttempt');
  for (let i = 0; i < 110 && timers.size; i++) {
    const [id, callback] = timers.entries().next().value;
    timers.delete(id);
    callback();
  }
  assert.equal(timers.size, 0);
  delete window.fbq;
  assert.doesNotThrow(() => api.trackMetaEvent('DemoFormStarted'));
  assert.equal(timers.size, 0);
});

test('server rendering does not access window or schedule tracking', () => {
  const { api, context, calls, timers } = setup();
  delete context.window;
  assert.doesNotThrow(() => api.trackMetaEvent('DemoFormOpened'));
  assert.equal(calls.length, 0);
  assert.equal(timers.size, 0);
});
