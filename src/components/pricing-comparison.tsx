"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";

export function PricingComparison() {
    return (
        <section id="pricing" className="py-32 relative overflow-hidden bg-background">
            {/* Dynamic Backgrounds */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[200px] opacity-10 pointer-events-none" />
            <div className="absolute inset-0 bg-grid-white/10 dark:bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-primary font-mono tracking-wider uppercase text-xs border border-primary/20 px-3 py-1 rounded-full bg-primary/10">Fair Pricing</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-6 tracking-tighter text-foreground font-serif">
                        Why pay <span className="text-muted-foreground/60 line-through decoration-red-500/50 decoration-4">monthly?</span>
                    </h2>
                    <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-2xl mx-auto">
                        Stop renting your software. Own it forever. <br className="hidden md:block" />
                        <span className="text-primary font-medium">Save ₹10,00,000+ over 5 years.</span>
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
                    {/* Competitor Card - De-emphasized */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="p-10 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-sm relative hover:bg-white/10 transition-colors group"
                    >
                        <h3 className="text-xl font-bold mb-1 text-muted-foreground">SaaS Competitors</h3>
                        <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-8">Rentals</p>

                        <div className="text-5xl font-bold text-muted-foreground/50 mb-2 font-mono tracking-tighter decoration-slice">
                            ₹2L<span className="text-xl tracking-normal opacity-50">/yr</span>
                        </div>
                        <p className="text-muted-foreground/50 text-sm mb-10">Recurring costs over 5 years: <span className="text-red-500/50 font-bold decoration-slice">₹10 Lakhs+</span></p>

                        <ul className="space-y-5">
                            {[
                                "Recurring per-user fees",
                                "Data held on shared servers",
                                "Unexpected price hikes",
                                "Vendor lock-in"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                                        <X className="w-4 h-4 text-red-500/50" />
                                    </div>
                                    <span className="text-base">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Heapsync Card - Premium & Highlighted */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="p-10 md:p-12 rounded-[2.5rem] border border-white/10 bg-card/50 backdrop-blur-2xl relative shadow-2xl overflow-hidden group ring-1 ring-white/10"
                    >
                        {/* Glossy Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                        <div className="absolute top-8 right-8 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase shadow-sm backdrop-blur-md flex items-center gap-2">
                            <Sparkles className="w-3 h-3" />
                            Best Value
                        </div>

                        <h3 className="text-2xl font-bold mb-1 text-foreground">Heapsync</h3>
                        <p className="text-xs text-primary uppercase tracking-widest mb-8 font-bold">Self-Hosted Ownership</p>

                        <div className="text-6xl font-bold text-foreground mb-2 font-mono tracking-tighter flex items-baseline gap-2">
                            ₹70k <span className="text-lg font-sans font-medium text-muted-foreground/60 tracking-normal">one-time</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-10 border-b border-white/10 pb-8">
                            Pay once. Own forever. <span className="text-primary font-bold">0% recurring fees.</span>
                        </p>

                        <ul className="space-y-5 mb-10 relative z-10">
                            {[
                                "Unlimited Users & Data",
                                "Full Source Code Access",
                                "Hosted on Your Private Cloud",
                                "Microsecond Latency"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-foreground">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 shadow-inner">
                                        <Check className="w-4 h-4 text-primary stroke-[3]" />
                                    </div>
                                    <span className="font-medium text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="w-full py-5 bg-foreground text-background font-bold rounded-2xl shadow-lg hover:opacity-90 hover:-translate-y-1 transition-all duration-200 relative z-10 text-center flex items-center justify-center gap-2 group/btn">
                            Get Lifetime Access
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div >
        </section >
    );
}
