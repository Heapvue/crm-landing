// The base code in app/layout.tsx initializes this dataset and sends the first PageView.
export const HEAPSYNC_PIXEL_ID = "1142810485096006";

// The pixel and every event are inert off these hosts, so localhost and previews never pollute
// the dataset. Open any page with ?meta_debug=1 to switch tracking on for the browser session
// (?meta_debug=0 switches it off again). The base snippet in layout.tsx applies the same rule.
export const META_PRODUCTION_HOSTS = ["heapsync.heapvue.com"];
export const META_DEBUG_KEY = "heapsync_meta_debug";

export function isMetaTrackingEnabled() {
    if (typeof window === "undefined") return false;
    try {
        if (META_PRODUCTION_HOSTS.includes(window.location.hostname)) return true;
        const flag = new URLSearchParams(window.location.search).get("meta_debug");
        if (flag === "1") return true;
        if (flag === "0") return false;
        return window.sessionStorage.getItem(META_DEBUG_KEY) === "1";
    } catch {
        return false;
    }
}

export type DemoSource =
    | "navbar"
    | "hero_get_started"
    | "hero_lifetime_access"
    | "pricing_lifetime_access"
    | "footer_get_started"
    | "footer_contact_sales";

export type MetaEventName =
    | "PageView"
    | "ViewContent"
    | "Lead"
    | "FeaturesViewed"
    | "PricingViewed"
    | "DemoClicked"
    | "DemoFormOpened"
    | "DemoFormStarted"
    | "DemoFormClosed"
    | "DemoFormSubmitAttempt"
    | "DemoFormSubmitError";

// Deliberately exclude names, emails, phone numbers, field values and arbitrary URLs.
type EventDetails = {
    cta_source?: DemoSource;
    form_id?: "heapsync_demo";
    form_state?: "empty" | "started" | "submitted";
    // confirmed: the CMS accepted the enquiry. rejected: the CMS answered but did not accept it.
    // network_error: no usable response (offline, blocked, CORS or timeout).
    submission_status?: "attempted" | "confirmed" | "rejected" | "network_error";
};

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

type PendingEvent = {
    name: MetaEventName;
    details: EventDetails;
    id: string;
};

const pending: PendingEvent[] = [];
const onceKeys = new Set<string>();
let retryTimer: ReturnType<typeof setTimeout> | undefined;
let retryCount = 0;
let sequence = 0;
let lastPath: string | undefined;
let pageVisit = 0;

export function getPageVisitKey() {
    return `visit:${pageVisit}`;
}

export function flushMetaEvents() {
    if (typeof window === "undefined") return;
    if (typeof window.fbq !== "function") {
        // An interaction may happen before Next's afterInteractive base script.
        // Bound retries and memory when tracking is unavailable or blocked.
        if (pending.length && !retryTimer && retryCount < 100) {
            retryTimer = setTimeout(() => {
                retryTimer = undefined;
                retryCount += 1;
                flushMetaEvents();
            }, 100);
        } else if (retryCount >= 100) {
            pending.length = 0;
        }
        return;
    }
    if (retryTimer) clearTimeout(retryTimer);
    retryTimer = undefined;
    retryCount = 0;

    while (pending.length) {
        const event = pending.shift()!;
        const method = event.name === "PageView" || event.name === "ViewContent" || event.name === "Lead"
            ? "trackSingle"
            : "trackSingleCustom";
        try {
            window.fbq(method, HEAPSYNC_PIXEL_ID, event.name, {
                content_name: "Heapsync CRM",
                content_category: "CRM",
                content_ids: ["heapsync-crm"],
                product: "heapsync",
                ...event.details,
            }, { eventID: event.id });
        } catch {
            // Analytics must never interrupt navigation or the enquiry form.
        }
    }
}

export function trackMetaEvent(name: MetaEventName, details: EventDetails = {}, onceKey?: string) {
    if (!isMetaTrackingEnabled()) return;
    if (onceKey && onceKeys.has(onceKey)) return;
    if (onceKey) onceKeys.add(onceKey);

    // Copy only approved keys, even if a caller passes extra runtime properties.
    const safeDetails: EventDetails = {};
    if (details.cta_source) safeDetails.cta_source = details.cta_source;
    if (details.form_id) safeDetails.form_id = details.form_id;
    if (details.form_state) safeDetails.form_state = details.form_state;
    if (details.submission_status) safeDetails.submission_status = details.submission_status;

    sequence += 1;
    const id = typeof window.crypto?.randomUUID === "function"
        ? window.crypto.randomUUID()
        : `heapsync-${Date.now()}-${sequence}`;
    if (pending.length >= 50) pending.shift();
    pending.push({ name, details: safeDetails, id });
    flushMetaEvents();
}

export function trackPageVisit(pathname: string) {
    if (lastPath === pathname) return;
    const isInitialPage = lastPath === undefined;
    lastPath = pathname;
    pageVisit += 1;
    // Initial PageView already comes from the user's base code. Track SPA navigation only.
    if (!isInitialPage) trackMetaEvent("PageView");
    if (pathname === "/") trackMetaEvent("ViewContent");
}
