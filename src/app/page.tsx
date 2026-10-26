"use client";

import { FeaturesGrid } from "@/components/features-grid";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { PricingComparison } from "@/components/pricing-comparison";
import { Testimonials } from "@/components/testimonials";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BookingModal } from "@/components/booking-modal";
import type { DemoSource } from "@/lib/meta-events";
import { captureUtmParams } from "@/lib/utm";

function HomeContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [demoSource, setDemoSource] = useState<DemoSource>("navbar");
  const searchParams = useSearchParams();

  useEffect(() => {
    captureUtmParams();
  }, []);

  const openDemo = (source: DemoSource) => {
    setDemoSource(source);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        const timeout = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          const url = new URL(window.location.href);
          url.searchParams.delete("section");
          window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
        }, 100);
        return () => clearTimeout(timeout);
      }
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-white text-[#0a0f29] selection:bg-[#0555FF]/15 selection:text-[#081d63] font-sans">
      <Navbar onOpenModal={() => openDemo("navbar")} />
      <Hero onOpenModal={openDemo} />
      <FeaturesGrid onOpenModal={openDemo} />
      <Testimonials />
      <PricingComparison onOpenModal={() => openDemo("pricing_lifetime_access")} />

      {/* CTA Section Above Footer with Official Heapvue Striped Textures (up.png & down.png) */}
      <section className="cta-banner-wrapper">
        <div className="cta-banner-container">
          {/* Top-Right Striped Graphic */}
          <div className="cta-graphic-top-right">
            <Image
              src="/images/up.png"
              alt=""
              width={332}
              height={184}
              className="cta-graphic-img"
              priority
            />
          </div>

          {/* Bottom-Left Striped Graphic */}
          <div className="cta-graphic-bottom-left">
            <Image
              src="/images/down.png"
              alt=""
              width={332}
              height={184}
              className="cta-graphic-img"
              priority
            />
          </div>

          <div className="cta-content-box">
            <h2 className="cta-main-title text-white">
              Ready to own your data?
            </h2>
            <p className="cta-subtext">
              Join hundreds of high-growth SMEs who switched to Heapsync for speed, security, and savings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button
                onClick={() => openDemo("footer_get_started")}
                className="w-full max-w-[260px] sm:w-[220px] py-3.5 bg-[#003bb3] text-white hover:bg-[#081d63] font-semibold rounded-none shadow-md transition-all flex items-center justify-center gap-2 group text-base cursor-pointer"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => openDemo("footer_contact_sales")}
                className="w-full max-w-[260px] sm:w-[220px] py-3.5 bg-white hover:bg-slate-100 text-[#081d63] font-semibold rounded-none border border-white transition-all flex items-center justify-center gap-2 text-base cursor-pointer shadow-md"
              >
                <span>Contact Sales</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BookingModal isOpen={isModalOpen} source={demoSource} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Loader2 className="w-8 h-8 text-[#081d63] animate-spin" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
