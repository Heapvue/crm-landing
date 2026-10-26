"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle2, ShieldCheck, Zap, Database } from "lucide-react";
import type { DemoSource } from "@/lib/meta-events";
import { trackMetaEvent } from "@/lib/meta-events";
import { captureUtmParams } from "@/lib/utm";

interface HeroProps {
    onOpenModal?: (source: DemoSource) => void;
}

export function Hero({ onOpenModal }: HeroProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        countryCode: "+91",
        phone: "",
        companyName: "",
        message: "",
        agree: true,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const hasStarted = useRef(false);
    const submitting = useRef(false);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const { checked } = e.target as HTMLInputElement;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        if (!hasStarted.current && value.trim()) {
            hasStarted.current = true;
            trackMetaEvent("DemoFormStarted", { cta_source: "hero_get_started", form_id: "heapsync_demo" });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting.current) return;
        setErrorMessage(null);

        if (!formData.agree) {
            setErrorMessage("Please agree to the privacy statement before submitting.");
            return;
        }

        submitting.current = true;
        setIsSubmitting(true);
        trackMetaEvent("DemoFormSubmitAttempt", {
            cta_source: "hero_get_started",
            form_id: "heapsync_demo",
            submission_status: "attempted",
        });

        const utms = captureUtmParams();
        const cleanPhone = formData.phone.trim().replace(/^\+/, "");
        const fullPhone = `${formData.countryCode} ${cleanPhone}`.trim();

        const payload = {
            full_name: formData.fullName.trim(),
            email: formData.email.trim(),
            phone: fullPhone,
            company: formData.companyName.trim(),
            company_name: formData.companyName.trim(),
            service: "Heapsync Self-Hosted CRM",
            service_type: "Heapsync Self-Hosted CRM",
            description: formData.message.trim(),
            message: formData.message.trim(),
            agree: formData.agree,
            agreePrivacy: formData.agree,
            utm_source: utms.utm_source || "",
            utm_medium: utms.utm_medium || "",
            utm_campaign: utms.utm_campaign || "",
            utm_term: utms.utm_term || "",
            utm_content: utms.utm_content || "",
            utm_id: utms.utm_id || "",
            utm_placement: utms.utm_placement || "",
            utm_device: utms.utm_device || "",
            utm_network: utms.utm_network || "",
        };

        // network_error until the CMS answers; after that a failure means it did not accept the enquiry.
        let failure: "network_error" | "rejected" = "network_error";

        try {
            const response = await fetch("https://cms.heapvue.cloud/api/v1/enquiries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            failure = "rejected";
            const data = await response.json();

            if (!response.ok || data.success === false) {
                throw new Error(data.error || "Failed to submit enquiry. Please try again.");
            }

            // Lead fires only here: the CMS has confirmed the enquiry.
            trackMetaEvent("Lead", {
                cta_source: "hero_get_started",
                form_id: "heapsync_demo",
                submission_status: "confirmed",
            });

            setIsSubmitted(true);
        } catch (error: unknown) {
            trackMetaEvent("DemoFormSubmitError", {
                cta_source: "hero_get_started",
                form_id: "heapsync_demo",
                submission_status: failure,
            });
            console.error("Enquiry submission failed", error);
            const msg = error instanceof Error ? error.message : "Something went wrong. Please try again.";
            setErrorMessage(msg);
        } finally {
            submitting.current = false;
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative pt-32 pb-20 md:py-36 overflow-hidden bg-white selection:bg-[#0555FF]/15 selection:text-[#081d63]">
            {/* Soft Ambient Light Gradient (No Grids) */}
            <div className="absolute left-1/4 top-10 -z-10 h-[500px] w-[650px] rounded-full bg-gradient-to-b from-[#E9F5FF]/60 to-transparent blur-[110px] pointer-events-none" />

            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    
                    {/* Left Column: Larger Headline, Substantial Content & Balanced Height */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left justify-center">
                        {/* Main Headline: Bold, Larger Sizing, Max 2 Lines */}
                        <motion.h1
                            className="text-[22px] xs:text-[26px] sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px] font-bold tracking-tight mb-5 sm:mb-6 leading-[1.2] sm:leading-[1.14] text-[#0a0f29]"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            The CRM built to eliminate <br />
                            <span className="text-[#0555FF] relative inline-block">
                                monthly &amp; per-user fees.
                            </span>
                        </motion.h1>

                        {/* Description: Proportional responsive text */}
                        <motion.p
                            className="text-sm sm:text-base lg:text-lg text-[#475569] max-w-xl mb-7 sm:mb-8 font-normal leading-relaxed"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                        >
                            Stop paying compounding subscriptions. Heapsync gives your business a perpetual self-hosted CRM with unlimited users, full data sovereignty, and zero recurring monthly invoices.
                        </motion.p>

                        {/* Key Pillars (Single line with button theme color circles) */}
                        <motion.div
                            className="flex flex-wrap items-center gap-4 sm:gap-6 w-full max-w-xl mb-7"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-[#081d63] text-white flex items-center justify-center shrink-0 shadow-xs">
                                    <Zap className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-xs font-semibold text-[#0a0f29]">Microsecond latency</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-[#081d63] text-white flex items-center justify-center shrink-0 shadow-xs">
                                    <ShieldCheck className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-xs font-semibold text-[#0a0f29]">100% data sovereignty</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-[#081d63] text-white flex items-center justify-center shrink-0 shadow-xs">
                                    <Database className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-xs font-semibold text-[#0a0f29]">Zero recurring invoices</span>
                            </div>
                        </motion.div>

                        {/* Button to see Capability Comparison */}
                        <motion.div
                            className="mb-7"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    const el = document.getElementById("pricing");
                                    el?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="btn-heapvue-primary group cursor-pointer inline-flex items-center gap-2 text-xs font-semibold shadow-xs"
                            >
                                <span>See capability comparison</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>

                        {/* Social Proof with Official Photos: Rajiv Ambat & Libin Joseph K */}
                        <motion.div
                            className="flex items-center gap-4 pt-2"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                        >
                            <div className="flex -space-x-2.5 overflow-hidden shrink-0">
                                <img
                                    className="inline-block h-11 w-11 sm:h-12 sm:w-12 aspect-square shrink-0 rounded-full ring-2 ring-white object-cover bg-[#E9F5FF]"
                                    src="/images/clients/rajiv-ambat.png"
                                    alt="Rajiv Ambat - Founder & CEO, SOLVEMyHealth"
                                    title="Rajiv Ambat (SOLVEMyHealth)"
                                />
                                <img
                                    className="inline-block h-11 w-11 sm:h-12 sm:w-12 aspect-square shrink-0 rounded-full ring-2 ring-white object-cover bg-[#E9F5FF]"
                                    src="/images/clients/libin-joseph.jpg"
                                    alt="Libin Joseph K - Director, Forsight Group"
                                    title="Libin Joseph K (Forsight Group)"
                                />
                                <div className="inline-flex h-11 w-11 sm:h-12 sm:w-12 aspect-square shrink-0 items-center justify-center rounded-full bg-[#081d63] text-white text-xs font-bold ring-2 ring-white">
                                    50+
                                </div>
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-[#0a0f29] block">
                                    Trusted by forward-thinking leaders &amp; enterprises
                                </span>
                                <span className="text-[11px] text-[#64748b] block">
                                    SOLVEMyHealth, Forsight Group, Conzaura &amp; more
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Embedded 'Get In Touch' Form (Light Theme, No Corner Angles) */}
                    <div className="lg:col-span-5 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white border border-[#e2e8f0] p-6 sm:p-8 rounded-none relative overflow-hidden"
                        >
                            {/* Form Header */}
                            <div className="mb-6">
                                <span className="text-xs font-semibold text-[#0555FF] block mb-1">
                                    Let&apos;s connect
                                </span>
                                <h3 className="text-2xl font-bold text-[#0a0f29] mb-1">
                                    Get in touch
                                </h3>
                                <p className="text-xs text-[#64748b] leading-relaxed">
                                    Send us a message, and we&apos;ll promptly discuss your private CRM deployment.
                                </p>
                            </div>

                            {/* Success State */}
                            {isSubmitted ? (
                                <div className="py-10 text-center flex flex-col items-center justify-center space-y-4">
                                    <div className="w-14 h-14 bg-[#E9F5FF] text-[#0555FF] rounded-none border border-[#CEE1FF] flex items-center justify-center">
                                        <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                                    </div>
                                    <h4 className="text-xl font-bold text-[#0a0f29]">Thank you!</h4>
                                    <p className="text-xs text-[#64748b] max-w-xs leading-relaxed">
                                        We&apos;ve received your request. An enterprise systems engineer will reach out within 2 hours.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormData({
                                                fullName: "",
                                                email: "",
                                                countryCode: "+91",
                                                phone: "",
                                                companyName: "",
                                                message: "",
                                                agree: true,
                                            });
                                        }}
                                        className="text-xs text-[#0555FF] hover:underline font-semibold pt-2 cursor-pointer"
                                    >
                                        Submit another inquiry
                                    </button>
                                </div>
                            ) : (
                                /* Active Form (Matching Popup Theme & Fields) */
                                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                                    {errorMessage && (
                                        <div className="p-3 bg-[#fef2f2] border border-[#fee2e2] text-[#dc2626] text-xs">
                                            {errorMessage}
                                        </div>
                                    )}

                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                                            Full name *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            placeholder="Rahul Sharma"
                                            value={formData.fullName}
                                            onChange={handleFormChange}
                                            className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-none px-3.5 py-2.5 text-[#0a0f29] outline-none focus:border-[#0555FF] focus:bg-white transition-all placeholder:text-[#94a3b8] text-xs"
                                        />
                                    </div>

                                    {/* 2-Column: Email & Company */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                                                Work email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="rahul@company.com"
                                                value={formData.email}
                                                onChange={handleFormChange}
                                                className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-none px-3.5 py-2.5 text-[#0a0f29] outline-none focus:border-[#0555FF] focus:bg-white transition-all placeholder:text-[#94a3b8] text-xs"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                                                Company
                                            </label>
                                            <input
                                                type="text"
                                                name="companyName"
                                                placeholder="Acme Pvt. Ltd."
                                                value={formData.companyName}
                                                onChange={handleFormChange}
                                                className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-none px-3.5 py-2.5 text-[#0a0f29] outline-none focus:border-[#0555FF] focus:bg-white transition-all placeholder:text-[#94a3b8] text-xs"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                                            Phone number *
                                        </label>
                                        <div className="flex gap-2">
                                            <select
                                                name="countryCode"
                                                value={formData.countryCode}
                                                onChange={handleFormChange}
                                                className="bg-[#f8fafc] border border-[#cbd5e1] rounded-none px-2 py-2.5 text-[#0a0f29] outline-none focus:border-[#0555FF] focus:bg-white transition-all appearance-none min-w-[75px] text-xs cursor-pointer"
                                            >
                                                <option value="+91">🇮🇳 +91</option>
                                                <option value="+1">🇺🇸 +1</option>
                                                <option value="+44">🇬🇧 +44</option>
                                                <option value="+971">🇦🇪 +971</option>
                                                <option value="+65">🇸🇬 +65</option>
                                                <option value="+61">🇦🇺 +61</option>
                                            </select>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                placeholder="98765 43210"
                                                value={formData.phone}
                                                onChange={handleFormChange}
                                                className="flex-1 w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-none px-3.5 py-2.5 text-[#0a0f29] outline-none focus:border-[#0555FF] focus:bg-white transition-all placeholder:text-[#94a3b8] text-xs"
                                            />
                                        </div>
                                    </div>

                                    {/* Message Textarea */}
                                    <div>
                                        <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                                            Message / requirements
                                        </label>
                                        <textarea
                                            name="message"
                                            rows={3}
                                            placeholder="Tell us about your team size, custom workflows, or deployment preference..."
                                            value={formData.message}
                                            onChange={handleFormChange}
                                            className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-none px-3.5 py-2.5 text-[#0a0f29] outline-none focus:border-[#0555FF] focus:bg-white transition-all placeholder:text-[#94a3b8] text-xs resize-none"
                                        />
                                    </div>

                                    {/* Privacy Agreement Checkbox matching popup */}
                                    <div className="flex items-start gap-2.5 pt-1">
                                        <input
                                            type="checkbox"
                                            id="hero-agree-checkbox"
                                            name="agree"
                                            checked={formData.agree}
                                            onChange={handleFormChange}
                                            className="mt-0.5 h-3.5 w-3.5 rounded-none border-[#cbd5e1] text-[#081d63] accent-[#081d63] focus:ring-[#081d63] cursor-pointer"
                                        />
                                        <label htmlFor="hero-agree-checkbox" className="text-[11px] text-[#64748b] leading-tight cursor-pointer">
                                            I agree to allow Heapsync to contact me regarding this enquiry in accordance with the privacy policy.
                                        </label>
                                    </div>

                                    {/* Submit Button matching popup */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-heapvue-primary w-full py-3.5 text-xs rounded-none mt-2 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Submit Enquiry</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
