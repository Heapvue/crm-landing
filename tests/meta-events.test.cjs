const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/lib/meta-events.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
}).outputText;

function setup(withPixel = true) {
  const calls = [];
  const timers = new Map();
  let id = 0;
  const window = { crypto: { randomUUID: () => `test-event-${++id}` } };
  if (withPixel) window.fbq = (...args) => calls.push(args);
  const context = { exports: {}, window, Date, Set,
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
  api.trackMetaEvent('DemoFormSubmitUnverified', { submission_status: 'unverified' });
  assert.ok(!JSON.stringify(calls).includes('never-send'));
  assert.ok(!JSON.stringify(calls).includes('12345678'));
  assert.ok(!JSON.stringify(calls).includes('Never Send'));
  assert.notEqual(calls[0][4].eventID, calls[1][4].eventID);
  assert.ok(!calls.some(x => x[2] === 'Lead' || x[2] === 'Schedule'));
  api.trackMetaEvent('Lead', { submission_status: 'unverified' });
  const lead = calls.find(x => x[2] === 'Lead');
  assert.equal(lead[0], 'trackSingle', 'Lead is a standard event');
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
