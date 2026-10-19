"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { flushMetaEvents, getPageVisitKey, trackMetaEvent, trackPageVisit } from "@/lib/meta-events";

export function MetaEvents() {
    const pathname = usePathname();

    useEffect(() => {
        trackPageVisit(pathname);
        flushMetaEvents();
        if (pathname !== "/" || !("IntersectionObserver" in window)) return;

        const observers: IntersectionObserver[] = [];
        const cleanups: (() => void)[] = [];
        const watched = new Set<string>();
        const attachSections = () => {
          for (const [section, event] of [["features", "FeaturesViewed"], ["pricing", "PricingViewed"]] as const) {
            if (watched.has(section)) continue;
            const element = document.getElementById(section);
            if (!element) continue;
            watched.add(section);
            // Observe the heading, not 50% of an entire tall section (unreachable on mobile).
            const target = element.querySelector("h2") ?? element;
            const key = `${getPageVisitKey()}:${section}`;
            let visible = false;
            let fired = false;
            let timer: ReturnType<typeof setTimeout> | undefined;
            const cancel = () => {
                if (timer) clearTimeout(timer);
                timer = undefined;
            };
            const schedule = () => {
                cancel();
                if (fired || !visible || document.visibilityState !== "visible") return;
                timer = setTimeout(() => {
                    trackMetaEvent(event, {}, key);
                    fired = true;
                    observer.disconnect();
                }, 1000);
            };
            const observer = new IntersectionObserver(([entry]) => {
                visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
                schedule();
            }, { threshold: [0, 0.5] });
            observer.observe(target);
            document.addEventListener("visibilitychange", schedule);
            observers.push(observer);
            cleanups.push(() => {
                cancel();
                document.removeEventListener("visibilitychange", schedule);
            });
          }
          if (watched.size === 2) mounts.disconnect();
        };
        // HomeContent can appear after the layout effect because it has a Suspense fallback.
        const mounts = new MutationObserver(attachSections);
        mounts.observe(document.body, { childList: true, subtree: true });
        attachSections();
        return () => {
            mounts.disconnect();
            observers.forEach(observer => observer.disconnect());
            cleanups.forEach(cleanup => cleanup());
        };
    }, [pathname]);

    return null;
}
