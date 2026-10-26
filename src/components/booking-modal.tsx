"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { trackMetaEvent, type DemoSource } from "@/lib/meta-events";
import { captureUtmParams } from "@/lib/utm";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    source?: DemoSource;
}

export function BookingModal({ isOpen, onClose, source = "navbar" }: BookingModalProps) {
    const [step, setStep] = useState(1);
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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const wasOpen = useRef(false);
    const hasStarted = useRef(false);
    const submitting = useRef(false);

    useEffect(() => {
        if (isOpen) {
            captureUtmParams();

            if (!wasOpen.current) {
                trackMetaEvent("DemoClicked", { cta_source: source });
                trackMetaEvent("DemoFormOpened", {
                    cta_source: source,
                    form_id: "heapsync_demo",
                    form_state: step === 2 ? "submitted" : hasStarted.current ? "started" : "empty",
                });
            }
        }
        wasOpen.current = isOpen;
    }, [isOpen, source, step]);

    const handleFormChange = (event: React.FormEvent<HTMLFormElement>) => {
        const field = event.target;
        // Typing counts; toggling the consent checkbox or choosing a country code does not.
        if (hasStarted.current || !(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return;
        if (field instanceof HTMLInputElement && (field.type === "checkbox" || field.type === "radio")) return;
        if (!field.value.trim()) return;
        hasStarted.current = true;
        trackMetaEvent("DemoFormStarted", { cta_source: source, form_id: "heapsync_demo" });
    };

    const handleClose = () => {
        if (submitting.current) return;
        trackMetaEvent("DemoFormClosed", {
            cta_source: source,
            form_id: "heapsync_demo",
            form_state: step === 2 ? "submitted" : hasStarted.current ? "started" : "empty",
        });
        if (step === 2) {
            setStep(1);
            setFormData({
                fullName: "",
                email: "",
                countryCode: "+91",
                phone: "",
                companyName: "",
                message: "",
                agree: true,
            });
            hasStarted.current = false;
        }
        setErrorMessage(null);
        onClose();
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
            cta_source: source,
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

            // Lead fires only here: the CMS has confirmed the enquiry. Never on failure, once per submit.
            trackMetaEvent("Lead", {
                cta_source: source,
                form_id: "heapsync_demo",
                submission_status: "confirmed",
            });

            setStep(2);
        } catch (error: unknown) {
            trackMetaEvent("DemoFormSubmitError", {
                cta_source: source,
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
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-[#0a0f29]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    />

                    {/* Modal Content with Sharp 0px Corners */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 15 }}
                        className="fixed z-[101] w-full max-w-lg bg-white border border-[#e2e8f0] rounded-none shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto"
                    >
                        <button
                            onClick={handleClose}
                            aria-label="Close enquiry form"
                            className="absolute top-4 right-4 p-2 rounded-none hover:bg-[#f1f5f9] text-[#64748b] hover:text-[#0a0f29] transition-colors z-20 cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-6 sm:p-8">
                            {step === 1 ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className="text-center mb-6 pt-1">
                                        <h2 className="text-2xl font-bold text-[#0a0f29] mb-1.5 tracking-tight">Get in Touch</h2>
                                        <p className="text-[#64748b] text-sm">
                                            Connect with our team to explore Heapsync or discuss your requirements.
                                        </p>
                                    </div>

                                    {errorMessage && (
                                        <div className="mb-4 p-3 rounded-none bg-[#fef2f2] border border-[#fecaca] text-[#dc2626] text-xs flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} onChange={handleFormChange} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-[#475569] mb-1.5">Full name *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-none px-4 py-2.5 text-[#0a0f29] outline-none focus:border-[#0555FF] focus:bg-white transition-all placeholder:text-[#94a3b8] text-sm"
                                                placeholder="Rahul Sharma"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                            <div>
                                                <label className="block text-xs font-semibold text-[#475569] mb-1.5">Work email *</label>
                                                <input
                                                    type="email"
                                                    required
                                                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-none px-4 py-2.5 text-[#0a0f29] outline-none focus:border-[#0555FF] focus:bg-white transition-all placeholder:text-[#94a3b8] text-sm"
                                                    placeholder="rahul@company.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-[#475569] mb-1.5">Company</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-none px-4 py-2.5 text-[#0a0f29] outline-none focus:border-[#0555FF] focus:bg-white transition-all placeholder:text-[#94a3b8] text-sm"
                                                    placeholder="Acme Technologies Pvt. Ltd."
                                                    value={formData.companyName}
                                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-[#475569] mb-1.5">Phone number *</label>
                                            <div className="flex gap-2">
                                                <select
                                                    className="bg-[#f8fafc] border border-[#cbd5e1] rounded-none px-3 py-2.5 text-[#0a0f29] outline-none focus:border-[#0555FF] focus:bg-white transition-all appearance-none min-w-[85px] text-sm cursor-pointer"
                                                    value={formData.countryCode}
                                                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                                >
                                                    <option value="+91">🇮🇳 +91</option>
                                                    <option value="+1">🇺🇸 +1</option>
                                                    <option value="+44">🇬🇧 +44</option>
                                                    <option value="+61">🇦🇺 +61</option>
                                                    <option value="+81">🇯🇵 +81</option>
                                                    <option value="+49">🇩🇪 +49</option>
                                                    <option value="+971">🇦🇪 +971</option>
                                                    <option value="+65">🇸🇬 +65</option>
                                                </select>
                                                <input
                                                    type="tel"
                                                    required
                                                    className="flex-1 w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-none px-4 py-2.5 text-[#0a0f29] outline-none focus:border-[#0555FF] focus:bg-white transition-all placeholder:text-[#94a3b8] text-sm"
                                                    placeholder="98765 43210"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-[#475569] mb-1.5">Message / requirements</label>
                                            <textarea
                                                rows={3}
                                                className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-none px-4 py-2.5 text-[#0a0f29] outline-none focus:border-[#0555FF] focus:bg-white transition-all placeholder:text-[#94a3b8] text-sm resize-none"
                                                placeholder="Tell us about your team size, custom workflows, or what you're looking for..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            />
                                        </div>

                                        <div className="flex items-start gap-2.5 pt-1">
                                            <input
                                                type="checkbox"
                                                id="agree-checkbox"
                                                checked={formData.agree}
                                                onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                                                className="mt-1 h-4 w-4 rounded-none border-[#cbd5e1] text-[#081d63] accent-[#081d63] focus:ring-[#081d63] cursor-pointer"
                                            />
                                            <label htmlFor="agree-checkbox" className="text-xs text-[#64748b] leading-snug cursor-pointer">
                                                I agree to allow Heapsync to contact me regarding this enquiry in accordance with the privacy policy.
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn-heapvue-primary w-full py-3.5 text-sm rounded-none mt-4 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span>Submitting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    Submit Enquiry
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-center text-[11px] text-[#94a3b8] pt-1">
                                            No spam • Complete confidentiality
                                        </p>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-14 h-14 rounded-none bg-[#E9F5FF] text-[#0555FF] border border-[#CEE1FF] flex items-center justify-center mx-auto mb-5">
                                        <CheckCircle className="w-7 h-7" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#0a0f29] mb-2">Enquiry Received!</h2>
                                    <p className="text-[#64748b] text-sm mb-6 max-w-sm mx-auto leading-relaxed">
                                        Thank you, <span className="font-semibold text-[#0a0f29]">{formData.fullName || "there"}</span>. We&apos;ve received your enquiry and our team will get back to you shortly at <span className="text-[#0555FF] font-medium">{formData.email}</span>.
                                    </p>
                                    <button
                                        onClick={handleClose}
                                        className="btn-heapvue-secondary rounded-none px-6 py-2.5 text-sm"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
