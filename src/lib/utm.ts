export interface UtmParams {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    utm_id?: string;
    utm_placement?: string;
    utm_device?: string;
    utm_network?: string;
}

const UTM_KEYS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "utm_id",
    "utm_placement",
    "utm_device",
    "utm_network",
] as const;

export function captureUtmParams(): UtmParams {
    if (typeof window === "undefined") return {};

    try {
        const params = new URLSearchParams(window.location.search);
        const captured: UtmParams = {};
        let foundAny = false;

        for (const key of UTM_KEYS) {
            const val = params.get(key);
            if (val) {
                captured[key] = val;
                foundAny = true;
            }
        }

        if (foundAny) {
            sessionStorage.setItem("heapsync_utms", JSON.stringify(captured));
            return captured;
        }

        const stored = sessionStorage.getItem("heapsync_utms");
        if (stored) {
            return JSON.parse(stored);
        }
    } catch {
        // Ignore storage errors in restricted contexts
    }

    return {};
}
