"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
    FileText, 
    CreditCard, 
    Building2, 
    TrendingUp, 
    ShieldCheck, 
    BarChart3, 
    Cpu, 
    LayoutDashboard
} from "lucide-react";
import type { DemoSource } from "@/lib/meta-events";

interface FeaturesGridProps {
    onOpenModal?: (source: DemoSource) => void;
}

const capabilitiesData = [
    {
        id: "quotes",
        title: "Quotes",
        description: "Generate, dispatch, and track formal estimates with itemized line items and real-time approval status.",
        icon: FileText,
        bg: "/images/bluebg.png",
    },
    {
        id: "transactions",
        title: "Transactions",
        description: "Secure, high-performance financial tracking built for payment settlements, order logs, and transaction audit histories.",
        icon: CreditCard,
        bg: "/images/greenbg.png",
    },
    {
        id: "accounts",
        title: "Accounts",
        description: "Corporate account management with multi-contact relationship mapping and parent-child enterprise hierarchies.",
        icon: Building2,
        bg: "/images/bluebg.png",
    },
    {
        id: "sales-pipelines",
        title: "Sales Pipelines",
        description: "Visual multi-stage deal tracking, custom stage triggers, automated progression, and predictive revenue forecasting.",
        icon: TrendingUp,
        bg: "/images/greenbg.png",
    },
    {
        id: "role-hierarchy",
        title: "Role Hierarchy",
        description: "Enterprise governance designed for scalability, with granular RBAC permissions, department isolation, and audit trails.",
        icon: ShieldCheck,
        bg: "/images/greenbg.png",
    },
    {
        id: "analytics",
        title: "Analytics",
        description: "Deep conversion funnel breakdowns, sales velocity KPIs, rep performance metrics, and actionable pipeline reports.",
        icon: BarChart3,
        bg: "/images/bluebg.png",
    },
    {
        id: "api-access",
        title: "API Access",
        description: "High-throughput REST API endpoints and event webhooks for seamless real-time integration with external tools and ERPs.",
        icon: Cpu,
        bg: "/images/greenbg.png",
    },
    {
        id: "smart-dashboard",
        title: "Smart Dashboard",
        description: "Unified command center for pending activities, meeting logs, urgent follow-ups, and real-time lead velocity metrics.",
        icon: LayoutDashboard,
        bg: "/images/bluebg.png",
    },
];

export function FeaturesGrid({ onOpenModal }: FeaturesGridProps) {
    return (
        <section id="features" className="py-24 md:py-28 bg-[#fdfdfd] relative">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Top Header Block matching Official Heapvue Industries Layout */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16">
                    {/* Left Title Block */}
                    <div className="max-w-xl">
                        <div className="section-badge-capsule mb-4">
                            <span className="badge-bullet" />
                            <span className="badge-text">Enterprise Capabilities</span>
                        </div>
                        <h2 className="text-[22px] xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0a0f29] leading-[1.2] sm:leading-[1.18]">
                            Smart Technology <span className="text-[#0555FF]">Capabilities</span>
                            <br />
                            for <span className="text-[#0555FF]">Modern Teams</span>
                        </h2>
                    </div>

                    {/* Right Subtext */}
                    <div className="max-w-lg lg:pb-1">
                        <p className="text-[#64748b] text-xs sm:text-sm lg:text-base leading-relaxed">
                            Heapsync equips your business with an end-to-end CRM suite built for sovereign execution. All core capabilities below are <span className="text-[#0a0f29] font-semibold">fully included with the one-time license</span> with zero recurring fees.
                        </p>
                    </div>
                </div>

                {/* 8 Capability Cards Grid matching official pastel pattern */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
                    {capabilitiesData.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: idx * 0.05 }}
                                className="capability-box-card"
                                style={{ backgroundImage: `url(${item.bg})` }}
                            >
                                <div className="capability-box-icon-wrapper">
                                    <Icon className="w-6 h-6 text-[#0a0f29] stroke-[2]" />
                                </div>

                                <div>
                                    <h3 className="capability-box-title">
                                        {item.title}
                                    </h3>
                                    <p className="capability-box-desc">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Custom Modules Banner (Matching Official Heapvue MapStack Design) */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="map-stack-wrapper"
                >
                    <div className="map-stack-container">
                        {/* Left Graphic Mark (down.png) */}
                        <div className="map-stack-graphic-left">
                            <Image
                                src="/images/down.png"
                                alt=""
                                width={332}
                                height={184}
                                className="map-stack-img"
                                priority
                            />
                        </div>

                        {/* Right Graphic Mark (up.png) */}
                        <div className="map-stack-graphic-right">
                            <Image
                                src="/images/up.png"
                                alt=""
                                width={332}
                                height={184}
                                className="map-stack-img"
                                priority
                            />
                        </div>

                        {/* Center Content Box */}
                        <div className="map-stack-content">
                            <h2 className="map-stack-title">
                                Need Custom Modules or
                                <br />
                                Bespoke Workflows?
                            </h2>
                            <p className="map-stack-subtext max-w-2xl mx-auto">
                                All 8 core capabilities above are included out-of-the-box. For bespoke modules or proprietary workflows, we engineer and deploy them for ₹10,000 extra per module.
                            </p>
                            <button
                                onClick={() => {
                                    if (onOpenModal) {
                                        onOpenModal("footer_contact_sales");
                                    } else {
                                        const el = document.getElementById("pricing");
                                        el?.scrollIntoView({ behavior: "smooth" });
                                    }
                                }}
                                className="map-stack-btn cursor-pointer"
                            >
                                Book a Demo
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
