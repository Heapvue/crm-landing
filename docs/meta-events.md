# Heapsync audience events

Dataset / Pixel: **1142810485096006**. Website: **https://heapsync.heapvue.com/**.

The user's original base code initializes the Pixel and sends the first PageView. The added tracker sends product and interaction events specifically to this dataset. No Meta account configuration or deployment is performed by this change.

## Event contract

| Event | Type | Trigger | Frequency |
| --- | --- | --- | --- |
| PageView | Standard | Original base code on page load; added tracker on a changed Next.js route | Once per load or route transition; no extra initial PageView |
| ViewContent | Standard | Heapsync home page appears | Once per home-page visit |
| FeaturesViewed | Custom | At least half of the features heading is visible continuously for one second in a visible tab | Once per page visit |
| PricingViewed | Custom | At least half of the pricing heading is visible continuously for one second in a visible tab | Once per page visit |
| DemoClicked | Custom | A demo CTA opens the modal | Once per opening; carries button source |
| DemoFormOpened | Custom | Modal opens, including reopening a saved in-page draft | Once per opening |
| DemoFormStarted | Custom | First nonempty change to a text, email, phone or date/time input | Once per form journey; focusing or changing a country/timezone alone does not count |
| DemoFormClosed | Custom | Visitor closes modal through its backdrop or close button | Once per close; carries empty, started or submitted_unverified state |
| DemoFormSubmitAttempt | Custom | A browser-valid form submission begins | Once per request; rapid double submissions are blocked |
| DemoFormSubmitUnverified | Custom | Google Forms no-cors fetch resolves | Once per resolved request; **not confirmed acceptance or a booked demo** |
| Lead | Standard | Same moment as DemoFormSubmitUnverified: a valid "Book Time Slot" submit whose request did not fail | Once per resolved request; **a demo request, not a verified or booked lead** |
| DemoFormSubmitError | Custom | Submission fetch rejects | Once per network failure; a later retry can succeed |

FeaturesViewed and PricingViewed indicate exposure to the section heading, not proof that every feature or price was read. Mobile tracking observes headings rather than an unreachable percentage of a tall section. Brief scrolling and background tabs do not satisfy the one-second visibility condition. Form close means a deliberate close in this page, not a proven permanent abandonment. Navigation away and tab closure are not inferred as confirmed abandonment.

Common parameters: product=heapsync, content_name=Heapsync CRM, content_category=CRM, content_ids=[heapsync-crm]. Each added event has a unique eventID. Names, email addresses, phone numbers, field contents and error messages are not added to these event payloads. No new advanced matching is configured. Meta's existing base script and account settings can have their own behaviour; inspect the actual live requests in Test Events.

Form events carry form_id=heapsync_demo. Button sources are navbar, hero_get_started, hero_lifetime_access, pricing_lifetime_access, footer_get_started and footer_contact_sales. The navbar's demo form on legal pages uses the same source. Form entry is preserved across closing and reopening an unfinished draft; a sent request resets on close so another request is a new journey.

The existing section-query cleanup now removes only section, preserving utm_source, utm_medium, utm_campaign, utm_content, fbclid and other existing parameters for attribution.

## Audience recipes

These are suggested starting windows, not audiences already created in an ad account. Use the new Heapsync dataset and the deployed Heapsync domain. Check available event/parameter filters in your account.

| Scenario | Include | Exclude | Starting window / message |
| --- | --- | --- | --- |
| Visited the product site | ViewContent | DemoFormStarted, DemoFormSubmitUnverified and known leads/customers | 30 days; explain the CRM and eight core modules |
| Explored features | FeaturesViewed | DemoFormSubmitUnverified and known leads/customers | 14–30 days; demonstrate how modules fit a business |
| Looked at pricing | PricingViewed | DemoFormSubmitUnverified and known leads/customers | 14 days; explain ₹70,000 base and ₹10,000 per extra module |
| Opened form without beginning | DemoFormOpened | DemoFormStarted, DemoFormSubmitUnverified and known leads/customers | 7–14 days; invite product questions |
| Started form without a sent request | DemoFormStarted | DemoFormSubmitUnverified and known leads/customers | 7–14 days; offer help choosing a setup |
| Closed an unfinished form | DemoFormClosed with form_state=started | DemoFormSubmitUnverified and known leads/customers | 7 days; offer a requirements discussion |
| Submission had a network error | DemoFormSubmitError | DemoFormSubmitUnverified and known leads/customers | 1–7 days; invite another attempt or conversation |

DemoFormSubmitUnverified is only a practical proxy for suppressing recovery ads after a request was sent. It is not a source of verified customer/lead status. Until verified conversion receipt exists, avoid presenting this event as a qualified lead or selecting it as a confirmed-lead conversion goal. Imported/CRM-confirmed leads and customers remain the source for reliable suppression. Exclusions are audience rules applied across their chosen time windows, not a reconstruction of an individual browsing session. Overlapping groups need exclusions if run as separate ad sets.

## Lead is a proxy; Schedule is not fired

Lead fires when the Book Time Slot form is validly submitted and the request does not fail, so Meta can optimise for demo requests. It is a proxy: the response is opaque, so it can overcount if Google rejects an entry. Schedule is not fired because no meeting is confirmed. This project uses output: export and GitHub Pages. The form sends a direct no-cors POST to Google Forms, which gives this page an opaque response. A resolved promise cannot show whether Google accepted the fields, and a requested time is not an accepted calendar booking. HTTP failures returned as opaque responses can also resolve the fetch.

For confirmed Lead tracking, add a receiving service that validates and persists a request and returns a readable success acknowledgement with an enquiry ID. Fire Lead once for that receipt, then use it for recovery exclusions. If browser and server both send the same conversion, share the same event ID for that occurrence. Fire Schedule only after a meeting is actually confirmed. That receiving infrastructure and Conversions API integration are outside the current browser-event change.

## Verification after deployment

1. Deploy this code through the site's normal workflow. These changes have only been tested locally.
2. Open the new Heapsync dataset in Events Manager → Test Events and open the deployed website with any blocking extensions disabled for the test.
3. Confirm one initial PageView and one ViewContent on the home page. Scroll to Features and Pricing, pause for a second, then scroll away and back: each section event should appear once for that visit.
4. Open each demo CTA and inspect cta_source. Focus a blank field: DemoFormStarted should not appear. Type a value: it should appear once. Edit other fields: it should not repeat.
5. Close and reopen the unfinished draft. Inspect DemoFormClosed's form_state=started and the new DemoFormOpened event.
6. Use a designated test enquiry only if the receiving team expects it. Inspect SubmitAttempt, SubmitUnverified and Lead (one each per resolved request); Schedule must not appear. Check received enquiries separately in Google Forms. A live test here was not performed by the agent.
7. Check that the custom events are visible and accepted for use in your account. Review any existing Event Setup Tool or automatic-event rules so the same interaction is not counted twice as a lead.
8. Create the relevant website Custom Audiences and exclusions. Live Meta receipt, account permissions, audience eligibility/size and delivery remain account-side checks.

## Local validation

- npm run build — production static export passes.
- npm run lint — no errors; existing unused-import and noscript-img warnings remain.
- npm run test:tracking — six Node tests cover initial PageView deduplication, route changes, early event queue, section deduplication, safe payloads, unique IDs and tracking failures.
- npm run test:tracking:browser — requires Playwright available locally, or PLAYWRIGHT_MODULE pointing to an installed package; TEST_BROWSER_PATH optionally selects the Chromium executable. Run after the production build. Tests cover desktop/mobile heading exposure, all six CTA sources, preserved attribution, focus vs input, reopened drafts, submission failure/retry, duplicate submit blocking and no false conversions. All external requests are intercepted; no enquiry or Meta event is sent outside the local test.

Reference supplied by the user: https://eventsmanager.facebook.com/business/help/402791146561655 . It redirected to a Meta login page during this session. The public Meta developer reference endpoints returned rate limits, so their current text was not available to inspect.
