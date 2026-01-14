"use client";

import { motion } from "framer-motion";
import { Users, CheckSquare, LayoutDashboard, BarChart3, ShieldCheck, FileText, StickyNote, Paperclip, Crown, Sparkles } from "lucide-react";

const features = [
    {
        category: "Smart Dashboard",
        icon: LayoutDashboard,
        description: "Stay on top of everything with a unified view of birthdays, pending tasks, upcoming activities, and real-time lead status updates."
    },
    {
        category: "Core CRM",
        icon: Users,
        description: "Comprehensive contact management offering seamless task tracking, rich notes with file attachments, and relationship history."
    },
    {
        category: "Sales Engine",
        icon: BarChart3,
        description: "Accelerate growth with a complete product catalog, visual sales pipelines, deep analytics, and precise revenue tracking."
    },
    {
        category: "Enterprise Control",
        icon: ShieldCheck,
        description: "Scale confidently with granular role hierarchies, advanced user management, and unlimited user capacity with data integrity."
    }
];

export function FeaturesGrid() {
    return (
        <section id="features" className="py-32 bg-background relative">
            {/* Feature Section Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[120px] opacity-5 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                    }}
                    className="grid grid-cols-1 lg:grid-cols-12 rounded-[2.5rem] border border-white/10 bg-card/50 backdrop-blur-2xl overflow-hidden shadow-2xl"
                >
                    {/* Left Panel - Header */}
                    <div className="lg:col-span-4 p-10 flex flex-col justify-between bg-white/5 relative group overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 min-h-[400px] lg:min-h-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6 tracking-tighter text-foreground font-serif leading-tight">
                                Everything you <br />
                                need to <span className="text-muted-foreground">grow.</span>
                            </h2>
                            <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-sm">
                                From lead generation to closing deals, manage every aspect of your business with microsecond precision.
                            </p>
                        </div>

                        <div className="mt-12">
                            <button className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors group/btn">
                                Explore all features
                                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Right Panel - Feature Grid */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 bg-white/5 gap-px">
                        {features.map((feature, idx) => (
                            <div key={idx} className="group p-8 md:p-10 bg-card/40 hover:bg-card/60 transition-colors flex flex-col gap-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-6 h-6 text-primary group-hover:text-primary transition-colors" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-foreground">{feature.category}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Call To Action Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-lg">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-foreground">Need specific modules?</h3>
                            <p className="text-sm text-muted-foreground">Add specific capabilities for just ₹10,000 each. Pay only for what you use.</p>
                        </div>
                    </div>
                    <button className="relative z-10 px-6 py-3 rounded-full bg-foreground text-background font-bold hover:opacity-90 transition-opacity whitespace-nowrap">
                        View Pricing
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
