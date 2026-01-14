"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Server } from "lucide-react";

interface HeroProps {
    onOpenModal: () => void;
}

export function Hero({ onOpenModal }: HeroProps) {

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-start pt-32 overflow-hidden selection:bg-primary selection:text-primary-foreground">
            {/* dynamic premium background */}
            {/* dynamic premium background */}
            <div className="absolute inset-0 h-full w-full pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.5)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="relative inline-flex overflow-hidden rounded-full p-[1px] mb-8">
                        <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--primary)_50%,transparent_100%)]" />
                        <span className="inline-flex h-full w-full cursor-default items-center gap-2 rounded-full bg-secondary/90 px-4 py-2 text-xs font-medium text-foreground/80 backdrop-blur-3xl tracking-wide">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span>
                                Now available for <span className="text-primary font-bold">self-hosting</span>
                            </span>
                        </span>
                    </div>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    The CRM built for <br className="hidden md:block" />
                    <span className="relative inline-block text-primary">
                        microsecond speed.
                        <motion.div
                            className="absolute -inset-1 bg-primary/20 blur-xl -z-10"
                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    </span>
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Stop renting your data. Maintain complete sovereignty with a self-hosted CRM
                    that runs on your infrastructure.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <button
                        onClick={onOpenModal}
                        className="relative px-8 py-4 bg-foreground text-background font-bold rounded-full shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group text-lg overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-[shimmer_1.5s_infinite]" />
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={onOpenModal}
                        className="px-8 py-4 bg-secondary/50 backdrop-blur-sm text-foreground rounded-full hover:bg-secondary transition-all font-bold border border-foreground/10 flex items-center gap-2 hover:-translate-y-1 duration-200"
                    >
                        Get Lifetime Access
                    </button>
                </motion.div>

                {/* Hub & Spoke Visualization */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mt-24 relative w-full max-w-[95%] mx-auto opacity-100" // Increased max-width
                >
                    {/* Connecting Lines (SVG) */}
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 hidden md:block" viewBox="0 0 1400 600" preserveAspectRatio="none"> {/* Widened viewBox */}
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" /> {/* Max opacity */}
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Left Side Connectors - Moved X from 250 to 150 */}
                        {/* Path 1: Top Left */}
                        <path d="M 150 150 C 400 150 400 300 700 300" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-border opacity-30" fill="none" />
                        <motion.path
                            d="M 150 150 C 400 150 400 300 700 300"
                            stroke="url(#lineGradient)"
                            strokeWidth="3"  // Increased width
                            filter="url(#glow)" // Added glow filter
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0], pathOffset: [0, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0 }}
                        />

                        {/* Path 2: Middle Left */}
                        <path d="M 150 300 C 400 300 400 300 700 300" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-border opacity-30" fill="none" />
                        <motion.path
                            d="M 150 300 C 400 300 400 300 700 300"
                            stroke="url(#lineGradient)"
                            strokeWidth="3"
                            filter="url(#glow)"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0], pathOffset: [0, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.8 }}
                        />

                        {/* Path 3: Bottom Left */}
                        <path d="M 150 450 C 400 450 400 300 700 300" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-border opacity-30" fill="none" />
                        <motion.path
                            d="M 150 450 C 400 450 400 300 700 300"
                            stroke="url(#lineGradient)"
                            strokeWidth="3"
                            filter="url(#glow)"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0], pathOffset: [0, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.6 }}
                        />

                        {/* Right Side Connectors - Moved X from 950 to 1250 */}
                        {/* Path 4: Top Right */}
                        <path d="M 1250 150 C 1000 150 1000 300 700 300" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-border opacity-30" fill="none" />
                        <motion.path
                            d="M 1250 150 C 1000 150 1000 300 700 300"
                            stroke="url(#lineGradient)"
                            strokeWidth="3"
                            filter="url(#glow)"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0], pathOffset: [0, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.4 }}
                        />

                        {/* Path 5: Middle Right */}
                        <path d="M 1250 300 C 1000 300 1000 300 700 300" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-border opacity-30" fill="none" />
                        <motion.path
                            d="M 1250 300 C 1000 300 1000 300 700 300"
                            stroke="url(#lineGradient)"
                            strokeWidth="3"
                            filter="url(#glow)"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0], pathOffset: [0, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.2 }}
                        />

                        {/* Path 6: Bottom Right */}
                        <path d="M 1250 450 C 1000 450 1000 300 700 300" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-border opacity-30" fill="none" />
                        <motion.path
                            d="M 1250 450 C 1000 450 1000 300 700 300"
                            stroke="url(#lineGradient)"
                            strokeWidth="3"
                            filter="url(#glow)"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: [0, 1, 0], pathOffset: [0, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 2.0 }}
                        />
                    </svg>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-24 items-center w-full"> {/* Increased Gap */}

                        {/* Left Integrations */}
                        <div className="hidden md:flex flex-col gap-20 items-center md:items-end">
                            <div className="p-5 bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-lg flex items-center gap-4 w-60 hover:scale-105 transition-transform">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                                    <Server className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-foreground">Self-Hosted</div>
                                    <div className="text-xs text-muted-foreground">Your Infrastructure</div>
                                </div>
                            </div>
                            <div className="p-5 bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-lg flex items-center gap-4 w-60 translate-x-8 hover:scale-105 transition-transform">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-foreground">Encrypted</div>
                                    <div className="text-xs text-muted-foreground">End-to-End Security</div>
                                </div>
                            </div>
                            <div className="p-5 bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-lg flex items-center gap-4 w-60 hover:scale-105 transition-transform">
                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-foreground">Local-First</div>
                                    <div className="text-xs text-muted-foreground">Zero Latency</div>
                                </div>
                            </div>
                        </div>

                        {/* Central Hub Card */}
                        <div className="w-full max-w-2xl mx-auto relative group">
                            <div className="absolute inset-0 bg-primary/20 blur-[120px] opacity-20 rounded-full group-hover:opacity-30 transition-opacity" />
                            <div className="relative bg-background/80 md:backdrop-blur-xl border border-white/20 dark:border-white/10 p-6 md:p-10 rounded-[2.5rem] shadow-2xl dark:shadow-primary/5 ring-1 ring-black/5 dark:ring-white/10">
                                {/* Mock Header */}
                                <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3.5 h-3.5 rounded-full bg-red-400" />
                                        <div className="w-3.5 h-3.5 rounded-full bg-yellow-400" />
                                        <div className="w-3.5 h-3.5 rounded-full bg-green-400" />
                                    </div>
                                    <div className="px-3 py-1 bg-secondary rounded-full text-xs text-foreground/70 font-mono flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        heapsync-dashboard.local
                                    </div>
                                </div>

                                {/* Mock Content */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="h-2.5 w-32 bg-muted rounded-full" />
                                        <div className="h-7 px-3 bg-primary/10 text-primary text-[10px] font-bold rounded-full flex items-center justify-center tracking-widest">LIVE STREAM</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-6 bg-muted/30 rounded-3xl border border-border">
                                            <div className="text-2xl font-bold mb-2 text-foreground">99.9<span className="text-md text-muted-foreground ml-1">%</span></div>
                                            <div className="text-sm text-muted-foreground font-medium">Sync Accuracy</div>
                                        </div>
                                        <div className="p-6 bg-muted/30 rounded-3xl border border-border">
                                            <div className="text-2xl font-bold mb-2 text-foreground">0.4<span className="text-md text-muted-foreground ml-1">ms</span></div>
                                            <div className="text-sm text-muted-foreground font-medium">Event Latency</div>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-card rounded-2xl border border-border shadow-sm flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-primary-foreground text-xs font-bold shadow-lg shadow-primary/20">AI</div>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <div className="h-2 w-24 bg-primary/20 rounded-full" />
                                                <span className="text-[10px] text-muted-foreground">Processing</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-primary"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Floating Pill */}
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-sm font-bold px-6 py-3 rounded-full shadow-xl flex items-center gap-3 whitespace-nowrap z-20">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                                    System Optimal
                                </div>
                            </div>
                        </div>

                        {/* Right Integrations */}
                        <div className="hidden md:flex flex-col gap-20 items-center md:items-start">
                            <div className="p-5 bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-lg flex items-center gap-4 w-60 hover:scale-105 transition-transform">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-foreground">Calendar</div>
                                    <div className="text-xs text-muted-foreground">Real-time Sync</div>
                                </div>
                            </div>
                            <div className="p-5 bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-lg flex items-center gap-4 w-60 -translate-x-8 hover:scale-105 transition-transform">
                                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-600 shrink-0">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-foreground">Team Flow</div>
                                    <div className="text-xs text-muted-foreground">Collaboration</div>
                                </div>
                            </div>
                            <div className="p-5 bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-lg flex items-center gap-4 w-60 hover:scale-105 transition-transform">
                                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-foreground">Assets</div>
                                    <div className="text-xs text-muted-foreground">Digital Library</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>

            </div>
        </section >
    );
}
