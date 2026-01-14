"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    imageColor: string;
    initials: string;
    quote: string;
    position: { left: string; top: string }; // Position relative to wave container
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "VP of Operations",
        imageColor: "from-blue-400 to-blue-600",
        initials: "SJ",
        quote: "This platform made my experience seamless and enjoyable. The quality of service exceeded my expectations!",
        position: { left: "10%", top: "40%" },
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Head of Sales",
        imageColor: "from-purple-400 to-purple-600",
        initials: "MC",
        quote: "Heapsync completely transformed how we manage our client data. The insights are deeper and the automation is seamless.",
        position: { left: "25%", top: "60%" },
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "Founder & CEO",
        imageColor: "from-pink-400 to-pink-600",
        initials: "ER",
        quote: "We switched from Salesforce and haven't looked back. The migration was instant and the support has been incredible.",
        position: { left: "40%", top: "30%" },
    },
    {
        id: 4,
        name: "David Kim",
        role: "CTO",
        imageColor: "from-green-400 to-green-600",
        initials: "DK",
        quote: "The API is robust and the documentation is excellent. It was incredibly easy to integrate with our existing stack.",
        position: { left: "55%", top: "50%" },
    },
    {
        id: 5,
        name: "Jessica Lee",
        role: "Marketing Director",
        imageColor: "from-orange-400 to-orange-600",
        initials: "JL",
        quote: "Our marketing campaigns are performing 3x better thanks to the detailed analytics provided by Heapsync.",
        position: { left: "70%", top: "65%" },
    },
    {
        id: 6,
        name: "Tom Harris",
        role: "Product Manager",
        imageColor: "from-indigo-400 to-indigo-600",
        initials: "TH",
        quote: "User-friendly, fast, and reliable. It's the best CRM tool we've used in years.",
        position: { left: "85%", top: "45%" },
    },
];

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(2); // Start with middle item

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const activeTestimonial = testimonials[activeIndex];

    return (
        <section className="py-24 bg-background relative overflow-hidden flex flex-col items-center">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className=""
                >
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-foreground font-serif leading-tight">
                            What Our <br />
                            <span className="text-muted-foreground">Customers Say</span>
                        </h2>
                        <p className="text-muted-foreground text-lg font-light leading-relaxed">
                            Real stories from real people! See how our services have transformed their experiences.
                        </p>
                    </div>

                    {/* Wave Container */}
                    <div className="relative w-full h-[300px] my-4 hidden md:block">
                        {/* SVG Wave Line */}
                        <svg
                            className="absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-visible"
                            height="150"
                            viewBox="0 0 1200 150"
                            fill="none"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="transparent" />
                                    <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                                <filter id="glow-wave" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* Base Line */}
                            <path
                                d="M0,75 C200,150 400,0 600,75 C800,150 1000,0 1200,75"
                                stroke="currentColor"
                                strokeOpacity="0.1"
                                strokeWidth="2"
                                fill="none"
                                className="text-foreground"
                            />

                            {/* Animated Glowing Line */}
                            <motion.path
                                d="M0,75 C200,150 400,0 600,75 C800,150 1000,0 1200,75"
                                stroke="url(#waveGradient)"
                                strokeWidth="3"
                                filter="url(#glow-wave)"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: 1,
                                    opacity: [0, 1, 0],
                                    pathOffset: [0, 1]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                    repeatDelay: 0.5
                                }}
                            />
                        </svg>

                        {/* Avatars */}
                        {testimonials.map((testi, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <button
                                    key={testi.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out group ${isActive ? "z-20 scale-125" : "z-10 scale-90 opacity-70 hover:opacity-100 hover:scale-100"
                                        }`}
                                    style={{ left: testi.position.left, top: testi.position.top }}
                                >
                                    <div
                                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${testi.imageColor} flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg border-4 transition-colors ${isActive ? "border-primary" : "border-white/10"
                                            }`}
                                    >
                                        {testi.initials}
                                    </div>
                                    {/* Optional Ring for active */}
                                    {isActive && (
                                        <div className="absolute inset-0 -m-3 border border-primary/30 rounded-full animate-pulse" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Mobile Grid Fallback */}
                    <div className="md:hidden grid grid-cols-3 gap-4 mb-8 w-full px-4">
                        {testimonials.map((testi, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <button
                                    key={testi.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${isActive ? "bg-white/10" : ""}`}
                                >
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testi.imageColor} flex items-center justify-center text-white font-bold shadow-sm mb-2 opacity-90`}>
                                        {testi.initials}
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    {/* Bottom Quote & Controls */}
                    <div className="max-w-3xl mx-auto px-4 text-center mt-4 h-32 flex flex-col justify-between">
                        <div className="min-h-[80px] flex items-center justify-center">
                            <p className="text-xl md:text-2xl text-foreground font-serif leading-relaxed italic transition-all duration-300 transform">
                                &quot;{activeTestimonial.quote}&quot;
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-6 mt-4">
                            <button
                                onClick={prevTestimonial}
                                className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors group bg-white/5"
                                aria-label="Previous testimonial"
                            >
                                <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                            </button>

                            <div className="flex flex-col">
                                <div className="text-base font-bold text-foreground">
                                    {activeTestimonial.name}
                                </div>
                                <div className="text-xs text-muted-foreground uppercase tracking-widest">
                                    {activeTestimonial.role}
                                </div>
                            </div>

                            <button
                                onClick={nextTestimonial}
                                className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors group bg-white/5"
                                aria-label="Next testimonial"
                            >
                                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
