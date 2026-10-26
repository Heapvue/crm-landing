"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, ChevronDown } from "lucide-react";

interface PricingComparisonProps {
    onOpenModal: () => void;
}

interface ComparisonRow {
    category: string;
    description: string;
    saasShort: string;
    saasDetail: string;
    heapsyncShort: string;
    heapsyncDetail: string;
}

const comparisonRows: ComparisonRow[] = [
    {
        category: "Pricing & Ownership Model",
        description: "License structure, recurring fees, and long-term capital expenditure.",
        saasShort: "Recurring per-user subscriptions (₹2L+/yr) with perpetual overhead.",
        saasDetail: "You never own the software. If you pause or cancel your monthly subscription, you lose immediate access to your CRM platform, historical logs, and custom views.",
        heapsyncShort: "₹70,000 one-time lifetime license with 0% recurring fees.",
        heapsyncDetail: "Pay once and own your CRM forever. 100% capital asset ownership with zero monthly per-user invoices and total immunity from recurring vendor price hikes.",
    },
    {
        category: "User Seats & Team Scalability",
        description: "Cost and licensing impact as your sales, marketing, and operations teams expand.",
        saasShort: "Strict $50–$150/user/mo pricing that penalizes team growth.",
        saasDetail: "Scaling from 10 to 50 reps quadruples your annual bill, forcing management into artificial seat rationing, shared logins, and security compromises.",
        heapsyncShort: "Unlimited user seats, roles, and contacts at ₹0 extra charge.",
        heapsyncDetail: "Scale from 5 to 500+ team members across sales, support, and leadership without paying a single rupee in incremental seat fees or user upgrade penalties.",
    },
    {
        category: "Data Sovereignty & Privacy",
        description: "Where your customer records, financial transactions, and leads reside.",
        saasShort: "Customer data locked on 3rd-party multi-tenant cloud servers.",
        saasDetail: "Your business records reside alongside thousands of other companies, vulnerable to third-party outages, cross-tenant breaches, and external data profiling.",
        heapsyncShort: "100% self-hosted on your own AWS, GCP, Azure, or private VPS.",
        heapsyncDetail: "Complete data sovereignty and HIPAA/GDPR readiness. Your customer records never leave your private perimeter, and only your team holds the encryption keys.",
    },
    {
        category: "Database Access & Schema Freedom",
        description: "Direct access to backend database schemas, SQL queries, and automated backups.",
        saasShort: "Walled-garden database locked behind rate-limited REST APIs.",
        saasDetail: "No direct SQL access and heavy API rate limits. Moving your data out involves laborious proprietary formats and expensive professional export fees.",
        heapsyncShort: "Unrestricted direct PostgreSQL database access and full schema control.",
        heapsyncDetail: "Execute direct SQL queries, connect private BI tools like Metabase or Tableau, and run automated local and off-site database backups with zero friction.",
    },
    {
        category: "Modular Capabilities & Feature Gating",
        description: "Access to quotes, pipelines, analytics, workflows, and transaction logs.",
        saasShort: "Essential operational modules locked behind 'Enterprise' paywalls.",
        saasDetail: "Entry and mid-tier plans artificially disable role hierarchies, audit logs, and workflow automations to force expensive plan upgrades.",
        heapsyncShort: "All 8 core capabilities included out-of-the-box.",
        heapsyncDetail: "Includes Quotes, Transactions, Accounts, Pipelines, Role-Based Access Control (RBAC), Analytics, Workflows, and Audit Logs with no tier gating.",
    },
    {
        category: "Performance & Query Latency",
        description: "System response speeds and interface loading performance under load.",
        saasShort: "Shared-tenant throttles, bloated interfaces, and peak-hour lag.",
        saasDetail: "Third-party network queuing and multi-tenant database contention lead to sluggish page loads, slow search queries, and employee productivity loss.",
        heapsyncShort: "Microsecond query latency with dedicated local database connections.",
        heapsyncDetail: "Engineered for microsecond speed on bare metal or private cloud instances. Enjoy instantaneous search, rapid deal updates, and ultra-snappy navigation.",
    },
    {
        category: "Custom Engineering & Extensibility",
        description: "Building bespoke workflows, custom business logic, and internal integrations.",
        saasShort: "Rigid proprietary SDKs requiring expensive certified consultants.",
        saasDetail: "Customizing workflows is restricted to closed plugin ecosystems that require high-cost external developers and break during mandatory cloud updates.",
        heapsyncShort: "Bespoke custom modules built directly by Heapvue engineers @ ₹10k/mod.",
        heapsyncDetail: "Bespoke engineering supported directly by our core software engineers. Add tailored industry-specific modules, ERP bridges, and custom logic with full source ownership.",
    },
    {
        category: "Customer Support & Maintenance SLA",
        description: "Technical assistance, deployment guidance, and ongoing engineering maintenance.",
        saasShort: "Mandatory bot-first ticket queues; human SLAs cost ₹5L+/year.",
        saasDetail: "Customer requests are filtered through automated chatbots. Direct phone and engineering SLAs are locked behind prohibitive enterprise support retainers.",
        heapsyncShort: "3 months free support; optional minimal AMC or on-demand fixes.",
        heapsyncDetail: "First 3 months of 100% free comprehensive support and onboarding included. After 3 months, an optional minimal Annual Maintenance Contract (AMC) is available covering proactive software version upgrades, security patches, vulnerability monitoring, and continuous oversight. If you choose not to opt for AMC, maintenance is purely on-demand — we will always resolve any issues that arise, charged only per incident.",
    },
];

export function PricingComparison({ onOpenModal }: PricingComparisonProps) {
    const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
    const [showAllDetails, setShowAllDetails] = useState(false);

    const toggleRow = (index: number) => {
        setExpandedRows((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const toggleAll = () => {
        const nextState = !showAllDetails;
        setShowAllDetails(nextState);
        const all: Record<number, boolean> = {};
        comparisonRows.forEach((_, i) => {
            all[i] = nextState;
        });
        setExpandedRows(all);
    };

    return (
        <section id="pricing" className="py-20 md:py-28 relative overflow-hidden bg-white">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Top Header Block matching Official Heapvue Split-Header Layout */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16">
                    {/* Left Title Block */}
                    <div className="max-w-xl">
                        <div className="section-badge-capsule mb-4">
                            <span className="badge-bullet" />
                            <span className="badge-text">Fair Pricing &amp; Ownership</span>
                        </div>
                        <h2 className="text-[22px] xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0a0f29] leading-[1.2] sm:leading-[1.18]">
                            Why Rent Your CRM?
                            <br />
                            Own It <span className="text-[#0555FF]">Forever.</span>
                        </h2>
                    </div>

                    {/* Right Subtext */}
                    <div className="max-w-lg lg:pb-1">
                        <p className="text-[#64748b] text-xs sm:text-sm lg:text-base leading-relaxed">
                            Stop paying compounding per-user subscriptions. Heapsync gives your business complete data sovereignty, unlimited user scalability, and <span className="text-[#0a0f29] font-semibold">saves ₹10,00,000+ over 5 years</span>.
                        </p>
                    </div>
                </div>

                {/* =========================================================================
                    DESKTOP VIEW (lg:block) - 3-Column Comparison Matrix Table
                ========================================================================= */}
                <div className="hidden lg:block border border-[#e2e8f0] bg-white">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 items-end">
                        {/* Top Left Cell: Category Header + Global Expand Toggle */}
                        <div className="col-span-4 p-6 lg:p-8 flex flex-col justify-between h-full">
                            <div>
                                <span className="text-xs font-semibold text-[#64748b] block mb-1">
                                    Feature comparison
                                </span>
                                <h3 className="text-lg font-bold text-[#0a0f29]">
                                    Architectural capabilities
                                </h3>
                            </div>
                            <button
                                onClick={toggleAll}
                                className="text-xs text-[#0555FF] hover:text-[#002299] font-semibold inline-flex items-center gap-1.5 mt-4 transition-colors cursor-pointer self-start"
                            >
                                <span>{showAllDetails ? "Collapse details" : "Expand all details"}</span>
                                <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                        showAllDetails ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Column 2 Header: Traditional SaaS Competitors */}
                        <div className="col-span-4 p-6 lg:p-8 text-center flex flex-col items-center justify-between h-full border-l border-[#e2e8f0] bg-[#fafbfc]">
                            <div className="w-full">
                                <span className="text-xs font-semibold text-[#081d63] block mb-1">
                                    Perpetual rental model
                                </span>
                                <h3 className="text-xl lg:text-2xl font-bold text-[#475569] mb-1">
                                    Traditional CRM SaaS
                                </h3>
                                <p className="text-xs text-[#94a3b8] mb-4">
                                    HubSpot, Salesforce, Zoho subscriptions
                                </p>
                                <div className="mb-5">
                                    <div className="text-3xl lg:text-4xl font-bold text-[#64748b] font-mono tracking-tight flex items-baseline justify-center gap-1">
                                        ₹2L<span className="text-xs font-sans font-medium text-[#94a3b8]">/yr average</span>
                                    </div>
                                    <span className="text-xs text-[#081d63] font-medium block mt-1">
                                        Compounding 5-Yr Cost: ₹10,00,000+
                                    </span>
                                </div>
                            </div>
                            <div className="w-full max-w-[200px] py-2 px-4 bg-[#eff6ff] text-[#081d63] border border-[#CEE1FF] text-xs font-semibold text-center">
                                Zero asset ownership
                            </div>
                        </div>

                        {/* Column 3 Header: Heapsync Sovereign CRM (Highlighted - Theme Matched) */}
                        <div className="col-span-4 bg-[#f8fbff] text-center flex flex-col items-center justify-between h-full border-l border-[#e2e8f0] relative pt-0">
                            {/* Theme-Matched Solid Navy Header Banner */}
                            <div className="w-full bg-[#081d63] text-white py-2.5 text-xs lg:text-sm font-semibold tracking-normal border-b border-[#081d63]">
                                Most popular • Sovereign control
                            </div>
                            <div className="p-6 lg:p-8 pt-6 w-full flex flex-col items-center justify-between flex-1">
                                <div className="w-full">
                                    <span className="text-xs font-semibold text-[#0555FF] block mb-1">
                                        Self-hosted ownership
                                    </span>
                                    <h3 className="text-xl lg:text-2xl font-bold text-[#0555FF] mb-1">
                                        Heapsync Enterprise
                                    </h3>
                                    <p className="text-xs text-[#475569] mb-4">
                                        Complete perpetual license for your private cloud
                                    </p>
                                    <div className="mb-5">
                                        <div className="text-3xl lg:text-4xl font-bold text-[#081d63] font-mono tracking-tight flex items-baseline justify-center gap-1">
                                            ₹70,000 <span className="text-xs font-sans font-medium text-[#64748b]">one-time</span>
                                        </div>
                                        <span className="text-xs text-[#0555FF] font-medium block mt-1">
                                            Pay once. Own forever. 0% recurring fees.
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={onOpenModal}
                                    className="btn-heapvue-primary rounded-none w-full max-w-[200px] text-sm py-3 font-semibold cursor-pointer shadow-md flex items-center justify-center gap-2 group"
                                >
                                    Get in touch
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Rows */}
                    {comparisonRows.map((row, index) => {
                        const isExpanded = !!expandedRows[index];

                        return (
                            <div
                                key={index}
                                className="grid grid-cols-12 border-t border-[#e2e8f0] items-stretch text-left"
                            >
                                {/* Column 1: Feature Category & Subtext */}
                                <div className="col-span-4 p-5 lg:p-6 flex flex-col justify-center">
                                    <h4 className="text-sm lg:text-base font-bold text-[#0a0f29] leading-snug mb-1 font-serif">
                                        {row.category}
                                    </h4>
                                    <p className="text-xs text-[#64748b] leading-relaxed">
                                        {row.description}
                                    </p>
                                    <button
                                        onClick={() => toggleRow(index)}
                                        className="text-xs text-[#0555FF] hover:text-[#002299] font-medium inline-flex items-center gap-1 mt-2 transition-colors cursor-pointer self-start"
                                    >
                                        <span>{isExpanded ? "Less" : "Know more"}</span>
                                        <ChevronDown
                                            className={`w-3 h-3 transition-transform duration-200 ${
                                                isExpanded ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                </div>

                                {/* Column 2: Traditional SaaS Disadvantage (Theme Blue Dark X) */}
                                <div className="col-span-4 p-5 lg:p-6 border-l border-[#e2e8f0] bg-[#fafbfc] flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-[#081d63] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                        <X className="w-3 h-3 stroke-[3] text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs lg:text-[13px] text-[#475569] font-medium leading-snug">
                                            {row.saasShort}
                                        </p>
                                        {/* SEO Crawlable Detailed Explanation */}
                                        <AnimatePresence initial={false}>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-xs text-[#64748b] leading-relaxed pt-2 border-t border-[#f1f5f9] mt-2">
                                                        {row.saasDetail}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Column 3: Heapsync Advantage (Theme Blue Checkmark & Theme-Matched Tinted Column) */}
                                <div className="col-span-4 p-5 lg:p-6 bg-[#f8fbff] border-l border-[#e2e8f0] flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-[#081d63] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                        <Check className="w-3 h-3 stroke-[3] text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs lg:text-[13px] text-[#0a0f29] font-semibold leading-snug">
                                            {row.heapsyncShort}
                                        </p>
                                        {/* SEO Crawlable Detailed Explanation */}
                                        <AnimatePresence initial={false}>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-xs text-[#334155] leading-relaxed pt-2 border-t border-[#CEE1FF]/40 mt-2">
                                                        {row.heapsyncDetail}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* =========================================================================
                    MOBILE & TABLET VIEW (block lg:hidden) - Fully Responsive Native Cards
                    (Zero Horizontal Scrolling!)
                ========================================================================= */}
                <div className="block lg:hidden space-y-6">
                    {/* Top Tier Summary Cards */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {/* Heapsync Highlighted Card */}
                        <div className="border border-[#e2e8f0] bg-[#f8fbff] rounded-none overflow-hidden flex flex-col justify-between">
                            <div className="bg-[#081d63] text-white py-2 px-4 text-xs font-semibold text-center">
                                Most popular • Sovereign control
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-semibold text-[#0555FF] block mb-1">
                                        Self-hosted ownership
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-bold text-[#0555FF] mb-1">
                                        Heapsync Enterprise
                                    </h3>
                                    <p className="text-xs text-[#475569] mb-4">
                                        Complete perpetual license for your private cloud
                                    </p>
                                    <div className="mb-4">
                                        <div className="text-2xl sm:text-3xl font-bold text-[#081d63] font-mono">
                                            ₹70,000 <span className="text-xs font-sans font-medium text-[#64748b]">one-time</span>
                                        </div>
                                        <span className="text-xs text-[#0555FF] font-medium block mt-1">
                                            Pay once. Own forever. 0% recurring fees.
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={onOpenModal}
                                    className="btn-heapvue-primary rounded-none w-full text-sm py-3 font-semibold cursor-pointer shadow-md flex items-center justify-center gap-2 group mt-2"
                                >
                                    Get in touch
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Competitor SaaS Card */}
                        <div className="border border-[#e2e8f0] bg-[#fafbfc] rounded-none p-5 flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-semibold text-[#081d63] block mb-1">
                                    Perpetual rental model
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold text-[#475569] mb-1">
                                    Traditional CRM SaaS
                                </h3>
                                <p className="text-xs text-[#94a3b8] mb-4">
                                    HubSpot, Salesforce, Zoho subscriptions
                                </p>
                                <div className="mb-4">
                                    <div className="text-3xl font-bold text-[#64748b] font-mono">
                                        ₹2L <span className="text-xs font-sans font-medium text-[#94a3b8]">/yr average</span>
                                    </div>
                                    <span className="text-xs text-[#081d63] font-medium block mt-1">
                                        Compounding 5-Yr Cost: ₹10,00,000+
                                    </span>
                                </div>
                            </div>
                            <div className="py-2 px-3 bg-[#eff6ff] text-[#081d63] border border-[#CEE1FF] text-xs font-semibold text-center">
                                Zero asset ownership
                            </div>
                        </div>
                    </div>

                    {/* Mobile Feature Comparison Header + Global Toggle */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
                        <div>
                            <span className="text-xs font-semibold text-[#64748b] block">
                                Direct head-to-head
                            </span>
                            <h3 className="text-base font-bold text-[#0a0f29]">
                                Feature specifications
                            </h3>
                        </div>
                        <button
                            onClick={toggleAll}
                            className="text-xs text-[#0555FF] hover:text-[#002299] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                            <span>{showAllDetails ? "Collapse all" : "Expand all"}</span>
                            <ChevronDown
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                    showAllDetails ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                    </div>

                    {/* Stacked Mobile Feature Cards (Zero horizontal scroll) */}
                    <div className="space-y-4">
                        {comparisonRows.map((row, index) => {
                            const isExpanded = !!expandedRows[index];

                            return (
                                <div
                                    key={index}
                                    className="border border-[#e2e8f0] bg-white rounded-none p-4 sm:p-5"
                                >
                                    {/* Card Header: Category Title + Subtext */}
                                    <div className="mb-3.5">
                                        <h4 className="text-sm font-bold text-[#0a0f29] font-serif leading-snug">
                                            {row.category}
                                        </h4>
                                        <p className="text-xs text-[#64748b] leading-relaxed mt-0.5">
                                            {row.description}
                                        </p>
                                    </div>

                                    {/* Head-to-Head Comparison Blocks */}
                                    <div className="space-y-2.5">
                                        {/* Heapsync Enterprise Block */}
                                        <div className="p-3 bg-[#f8fbff] border border-[#CEE1FF]/70 rounded-none flex items-start gap-2.5">
                                            <div className="w-5 h-5 rounded-full bg-[#081d63] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                                <Check className="w-3 h-3 stroke-[3] text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-[11px] font-bold text-[#0555FF] block mb-0.5">
                                                    Heapsync Enterprise
                                                </span>
                                                <p className="text-xs text-[#0a0f29] font-semibold leading-snug">
                                                    {row.heapsyncShort}
                                                </p>
                                                {/* SEO Detail */}
                                                <AnimatePresence initial={false}>
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <p className="text-xs text-[#334155] leading-relaxed pt-2 border-t border-[#CEE1FF]/40 mt-2">
                                                                {row.heapsyncDetail}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        {/* Traditional SaaS Block */}
                                        <div className="p-3 bg-[#fafbfc] border border-[#e2e8f0] rounded-none flex items-start gap-2.5">
                                            <div className="w-5 h-5 rounded-full bg-[#081d63] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                                <X className="w-3 h-3 stroke-[3] text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-[11px] font-bold text-[#081d63] block mb-0.5">
                                                    Traditional SaaS
                                                </span>
                                                <p className="text-xs text-[#475569] font-medium leading-snug">
                                                    {row.saasShort}
                                                </p>
                                                {/* SEO Detail */}
                                                <AnimatePresence initial={false}>
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <p className="text-xs text-[#64748b] leading-relaxed pt-2 border-t border-[#f1f5f9] mt-2">
                                                                {row.saasDetail}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer: Know more toggle */}
                                    <div className="mt-3 pt-2.5 border-t border-[#f1f5f9] flex justify-end">
                                        <button
                                            onClick={() => toggleRow(index)}
                                            className="text-xs text-[#0555FF] hover:text-[#002299] font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                                        >
                                            <span>{isExpanded ? "Show less" : "Know more"}</span>
                                            <ChevronDown
                                                className={`w-3 h-3 transition-transform duration-200 ${
                                                    isExpanded ? "rotate-180" : ""
                                                }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
