"use client";

import { FeaturesGrid } from "@/components/features-grid";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { PricingComparison } from "@/components/pricing-comparison";
import { Testimonials } from "@/components/testimonials";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BookingModal } from "@/components/booking-modal";

function HomeContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          // Clean URL without refresh
          window.history.replaceState(null, "", "/");
        }, 100);
      }
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <FeaturesGrid />
      <Testimonials />
      <PricingComparison />

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-background">
        {/* Grids and Glows */}
        <div className="absolute inset-0 h-full w-full pointer-events-none [mask-image:radial-gradient(ellipse_at_bottom,black,transparent)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.5)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary rounded-full blur-[150px] opacity-20 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-foreground">
            Ready to <span className="text-primary">own your data?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join hundreds of high-growth SMEs who switched to Heapsync for speed, security, and savings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative px-8 py-4 bg-foreground text-background font-bold rounded-full shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group text-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-[shimmer_1.5s_infinite]" />
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-secondary/50 backdrop-blur-sm text-foreground rounded-full hover:bg-secondary transition-all font-bold border border-foreground/10 flex items-center gap-2 hover:-translate-y-1 duration-200"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
