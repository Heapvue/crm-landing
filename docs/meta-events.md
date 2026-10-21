# Heapsync Meta tracking

Dataset / Pixel: **1142810485096006** ("HeapSync Pixel"). Website: **https://heapsync.heapvue.com/**.

The base code in `src/app/layout.tsx` (built by `src/lib/meta-pixel-snippet.ts`) initialises the pixel and sends the first PageView. `src/lib/meta-events.ts` and `src/components/meta-events.tsx` send the product and funnel events below to this dataset only. No Meta account configuration is done from code.

## Production-only tracking and the test switch

The pixel and every event are inert unless the page is on `heapsync.heapvue.com`. `localhost`, previews and any other host send nothing, so test traffic cannot reach the audiences (46 of the first 106 events came from localhost before this was added).

To test on another host (for example `npm run dev`), open any page with `?meta_debug=1`, e.g. `http://localhost:3000/?meta_debug=1`. The switch is stored for that browser tab session, so route changes and the demo form keep tracking. `?meta_debug=0` turns it off. The flag does nothing on the production host (always on).

Debug traffic is real traffic to the production dataset. Use Events Manager > Test Events with a test event code when you do this, and do not submit real enquiries. The `<noscript>` pixel image cannot be host-gated; it only runs for visitors with JavaScript disabled.

## Event contract

| Event | Type | Trigger | Frequency |
| --- | --- | --- | --- |
| PageView | Standard | Base code on page load; the tracker on a changed Next.js route | Once per load or route change; no extra initial PageView |
| ViewContent | Standard | Home page appears | Once per home-page visit |
| FeaturesViewed | Custom | At least half of the features heading visible for one continuous second in a visible tab | Once per page visit |
| PricingViewed | Custom | Same rule for the pricing heading | Once per page visit |
| DemoClicked | Custom | A demo CTA opens the enquiry form | Once per opening; carries `cta_source` |
| DemoFormOpened | Custom | The form opens, including reopening a saved draft | Once per opening |
| DemoFormStarted | Custom | First non-empty typing in a text, email, phone or message field | Once per form journey. Toggling the consent checkbox or choosing a country code does not count |
| DemoFormClosed | Custom | Form closed via backdrop or close button | Once per close; `form_state` is `empty`, `started` or `submitted` |
| DemoFormSubmitAttempt | Custom | A valid submit begins (consent ticked) | Once per request; rapid repeat submits are blocked |
| DemoFormSubmitError | Custom | The submit did not succeed | Once per failure; `submission_status` is `network_error` (no usable response) or `rejected` (the CMS answered but did not accept) |
| **Lead** | **Standard** | **The CMS confirms the enquiry (HTTP ok and `success` not false)** | **Once per successful submit, never on failure** |

`DemoFormSubmitUnverified` no longer exists. It was a stand-in for "the request resolved" while the form posted to Google Forms and the response could not be read. Now that the CMS returns a readable result, `Lead` carries that meaning on its own, and a second event for the same moment would only invite double counting. Use `Lead` for conversion goals and for excluding converted visitors.

`Schedule` is not fired. A submitted enquiry is not a confirmed meeting. Fire `Schedule` only when a meeting is actually booked (for example when the CRM marks a demo as scheduled).

Common parameters on every event: `product=heapsync`, `content_name=Heapsync CRM`, `content_category=CRM`, `content_ids=[heapsync-crm]`. Form events add `form_id=heapsync_demo`. Demo CTA sources (`cta_source`): `navbar`, `hero_get_started`, `hero_lifetime_access`, `pricing_lifetime_access`, `footer_get_started`, `footer_contact_sales` (the navbar button on the legal pages also reports `navbar`). `Lead` carries `cta_source`, `form_id` and `submission_status=confirmed`.

Each event has a unique `eventID`. Only the parameters listed here are ever sent: names, email addresses, phone numbers, company, message text, UTM values and error messages are never added to Meta events. No advanced matching is configured in code; Meta's own account settings and base-script behaviour (for example automatic cookies) still apply, so check the live requests in Test Events.

## UTM naming convention (ad links)

Set these in the ad's URL parameters (Meta Ads Manager > Ad > Tracking > URL parameters):

```
utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_term={{adset.name}}&utm_content={{ad.name}}&utm_id={{campaign.id}}&utm_placement={{placement}}
```

| Parameter | Value | Example after Meta fills it in |
| --- | --- | --- |
| utm_source | `facebook` (fixed) | facebook |
| utm_medium | `paid_social` (fixed) | paid_social |
| utm_campaign | `{{campaign.name}}` | `hv_leads_q426` |
| utm_term | `{{adset.name}}` | `hsync_in_broad_lead` |
| utm_content | `{{ad.name}}` | `hsync_ownership_4x5_v1` |
| utm_id | `{{campaign.id}}` | numeric campaign ID |
| utm_placement | `{{placement}}` | e.g. `Facebook_Mobile_Feed` |

Naming rules for campaign, ad set and ad names: lowercase, underscores instead of spaces, no other punctuation, so the same text appears in the CMS and in reports. Pattern used so far: campaign `<brand>_<goal>_<quarter>`, ad set `<product>_<country>_<targeting>_<goal>`, ad `<product>_<message>_<format>_<version>`.

What the site does with them: `src/lib/utm.ts` reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id`, `utm_placement` (and `utm_device`, `utm_network` if present) from the landing URL and keeps them in `sessionStorage` (`heapsync_utms`) for the tab session. The booking form sends them to the CMS with each enquiry, so every lead can be traced to a campaign, ad set and ad. They are not sent to Meta; Meta already knows its own campaign structure.

`fbclid`: Meta adds this to ad clicks automatically. The site leaves it in the URL (the `?section=` cleanup removes only `section`), and the Meta pixel reads it and stores it in its own first-party `_fbc` cookie; the pixel also sets `_fbp`. Nothing in the site code needs to handle it. It is **not** sent to the CMS today.

### Before a later Conversions API (CAPI) send

To send Lead server-side later and have Meta de-duplicate it with the browser Lead, the CMS record needs more than UTMs. Ask the CMS owner to accept these optional fields (the payload contract was not changed here because the endpoint's accepted fields are not documented):

- `fbclid`, `fbp`, `fbc` (the cookie values, read in the browser at submit time)
- `lead_event_id`: generate the Lead `eventID` *before* the POST, send it to the CMS, then pass the same ID to `fbq`. The CAPI call then reuses it.

Without these, server-side events can only match on hashed email and phone, and cannot de-duplicate against the browser Lead.

## Audience recipes

These are starting points, not audiences that exist in an ad account. Use dataset `1142810485096006` and exclude `Lead` everywhere you are not targeting converted visitors.

| Scenario | Include | Exclude | Starting window / message |
| --- | --- | --- | --- |
| Visited the product site | ViewContent | Lead, DemoFormStarted | 30 days; explain the CRM and its modules |
| Explored features | FeaturesViewed | Lead | 14-30 days; show how the modules fit a business |
| Looked at pricing | PricingViewed | Lead | 14 days; explain the pricing |
| Opened the form without typing | DemoFormOpened | DemoFormStarted, Lead | 7-14 days; invite product questions |
| Started the form, did not finish | DemoFormStarted | Lead | 7-14 days; offer help choosing a setup |
| Closed an unfinished form | DemoFormClosed with `form_state=started` | Lead | 7 days; offer a requirements discussion |
| Submission failed | DemoFormSubmitError | Lead | 1-7 days; invite another attempt or a call |
| Converted leads | Lead | (none) | Use for lookalikes and to exclude from prospecting |

Exclusions are audience rules applied across the chosen windows, not a reconstruction of one browsing session. Overlapping audiences need exclusions if they run as separate ad sets. CRM-confirmed customers remain the reliable suppression list; upload it when the CRM is linked.

## Known risks in the CMS form flow

- **Non-JSON success looks like a failure.** The form calls `response.json()` on the reply. If the CMS ever answers 2xx with an empty or non-JSON body, the visitor sees an error although the enquiry may have been saved. They retry (duplicate CMS record) and Lead does not fire. Treat a 2xx as success and read the body defensively.
- **Pre-ticked consent.** The privacy checkbox is ticked by default (`agree: true`). Pre-ticked consent is generally not valid under GDPR/DPDP.
- **Spam and bots.** The endpoint is called straight from the browser with no visible captcha or honeypot. Bot submissions would fire Lead and distort ad optimisation.
- **Server error text is shown to visitors verbatim** (`data.error`).

## Verification after deployment

1. Deploy through the normal workflow. Local tests do not prove the live site.
2. Open the Heapsync dataset > Test Events and open `https://heapsync.heapvue.com/`. Confirm one PageView and one ViewContent.
3. Scroll to Features and Pricing and pause a second: each section event appears once per visit.
4. Open each demo button and check `cta_source`. Tick and untick the consent box: no DemoFormStarted. Type in a field: DemoFormStarted once.
5. Close and reopen an unfinished draft: DemoFormClosed has `form_state=started`, then a new DemoFormOpened.
6. Submit one test enquiry that the CMS team expects. Confirm DemoFormSubmitAttempt then Lead (`submission_status=confirmed`), no Schedule, and that the CMS stored the enquiry with its UTMs.
7. Open the site from `localhost` without `?meta_debug=1`: no events should arrive.
8. After a day of real traffic, create the audiences above and check their eligibility and size in Ads Manager.

## Local validation

- `npm run build`: production static export passes.
- `npm run lint`: no errors; existing unused-variable and `<noscript><img>` warnings remain.
- `npm run test:tracking`: 8 Node tests cover initial PageView de-duplication, route changes, the early-event queue, section de-duplication, safe payloads and unique IDs, the Lead standard-event path, tracker failures, host gating and the base snippet.
- `npm run test:tracking:browser`: needs Playwright (set `PLAYWRIGHT_MODULE` to an installed package, optionally `TEST_BROWSER_PATH`) and a prior `npm run build`. It mocks the CMS (network failure, rejection, confirmation) and blocks all outside traffic. It covers desktop and mobile section events, preserved `utm_*` and `fbclid`, all six CTA sources, form start and close, Lead once only on confirmation, duplicate-submit blocking, privacy of payloads, and silence off the production host.
