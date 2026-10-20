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
            // Preload/capture any UTM parameters present in the URL
            captureUtmParams();

            if (!wasOpen.current) {
                trackMetaEvent("DemoClicked", { cta_source: source });
                trackMetaEvent("DemoFormOpened", {
                    cta_source: source,
                    form_id: "heapsync_demo",
                    form_state: step === 2 ? "submitted_unverified" : hasStarted.current ? "started" : "empty",
                });
            }
        }
        wasOpen.current = isOpen;
    }, [isOpen, source, step]);

    const handleFormChange = (event: React.FormEvent<HTMLFormElement>) => {
        const field = event.target;
        if (hasStarted.current || !(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) || !field.value.trim()) return;
        hasStarted.current = true;
        trackMetaEvent("DemoFormStarted", { cta_source: source, form_id: "heapsync_demo" });
    };

    const handleClose = () => {
        if (submitting.current) return;
        trackMetaEvent("DemoFormClosed", {
            cta_source: source,
            form_id: "heapsync_demo",
            form_state: step === 2 ? "submitted_unverified" : hasStarted.current ? "started" : "empty",
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

        try {
            const response = await fetch("https://cms.heapvue.cloud/api/v1/enquiries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok || data.success === false) {
                throw new Error(data.error || "Failed to submit enquiry. Please try again.");
            }

            trackMetaEvent("DemoFormSubmitUnverified", {
                cta_source: source,
                form_id: "heapsync_demo",
                submission_status: "unverified",
            });
            trackMetaEvent("Lead", {
                cta_source: source,
                form_id: "heapsync_demo",
                submission_status: "unverified",
            });

            setStep(2);
        } catch (error: unknown) {
            trackMetaEvent("DemoFormSubmitError", {
                cta_source: source,
                form_id: "heapsync_demo",
                submission_status: "network_error",
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
                    {/* Backdrop with Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed z-[101] w-full max-w-lg bg-background border border-border rounded-3xl overflow-hidden shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto"
                    >
                        <motion.div
                            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        <button
                            onClick={handleClose}
                            aria-label="Close enquiry form"
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors z-20"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-6 sm:p-8">
                            {step === 1 ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className="text-center mb-6">
                                        <h2 className="text-2xl font-bold text-foreground mb-1.5 tracking-tight">Get in Touch</h2>
                                        <p className="text-muted-foreground text-sm">
                                            Connect with our team to explore Heapsync or discuss your requirements.
                                        </p>
                                    </div>

                                    {errorMessage && (
                                        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} onChange={handleFormChange} className="space-y-3.5">
                                        <div>
                                            <label className="block text-xs font-semibold text-muted-foreground mb-1 ml-1 tracking-wider uppercase">Full Name *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-primary/50 focus:bg-primary/5 transition-all placeholder:text-muted-foreground/30 text-sm"
                                                placeholder="Rahul Sharma"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                            <div>
                                                <label className="block text-xs font-semibold text-muted-foreground mb-1 ml-1 tracking-wider uppercase">Work Email *</label>
                                                <input
                                                    type="email"
                                                    required
                                                    className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-primary/50 focus:bg-primary/5 transition-all placeholder:text-muted-foreground/30 text-sm"
                                                    placeholder="rahul@company.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-muted-foreground mb-1 ml-1 tracking-wider uppercase">Company</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-primary/50 focus:bg-primary/5 transition-all placeholder:text-muted-foreground/30 text-sm"
                                                    placeholder="Acme Technologies Pvt. Ltd."
                                                    value={formData.companyName}
                                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-muted-foreground mb-1 ml-1 tracking-wider uppercase">Phone Number *</label>
                                            <div className="flex gap-2">
                                                <select
                                                    className="bg-secondary/50 border border-white/10 rounded-xl px-3 py-2.5 text-foreground outline-none focus:border-primary/50 focus:bg-primary/5 transition-all appearance-none min-w-[85px] text-sm"
                                                    value={formData.countryCode}
                                                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                                >
                                                    <option value="+91" className="bg-zinc-950 text-white">🇮🇳 +91</option>
                                                    <option value="+1" className="bg-zinc-950 text-white">🇺🇸 +1</option>
                                                    <option value="+44" className="bg-zinc-950 text-white">🇬🇧 +44</option>
                                                    <option value="+61" className="bg-zinc-950 text-white">🇦🇺 +61</option>
                                                    <option value="+81" className="bg-zinc-950 text-white">🇯🇵 +81</option>
                                                    <option value="+49" className="bg-zinc-950 text-white">🇩🇪 +49</option>
                                                    <option value="+971" className="bg-zinc-950 text-white">🇦🇪 +971</option>
                                                    <option value="+65" className="bg-zinc-950 text-white">🇸🇬 +65</option>
                                                </select>
                                                <input
                                                    type="tel"
                                                    required
                                                    className="flex-1 w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-primary/50 focus:bg-primary/5 transition-all placeholder:text-muted-foreground/30 text-sm"
                                                    placeholder="98765 43210"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-muted-foreground mb-1 ml-1 tracking-wider uppercase">Message / Requirements</label>
                                            <textarea
                                                rows={3}
                                                className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-primary/50 focus:bg-primary/5 transition-all placeholder:text-muted-foreground/30 text-sm resize-none"
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
                                                className="mt-1 h-4 w-4 rounded border-white/20 bg-secondary/50 text-primary accent-primary focus:ring-primary"
                                            />
                                            <label htmlFor="agree-checkbox" className="text-xs text-muted-foreground leading-snug cursor-pointer">
                                                I agree to allow Heapsync to contact me regarding this enquiry in accordance with the privacy policy.
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:shadow-[0_0_20px_-5px_var(--primary)] transition-all flex items-center justify-center gap-2 group mt-5 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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

                                        <p className="text-center text-[11px] text-muted-foreground/60 pt-2">
                                            No spam • Complete confidentiality • GDPR Compliant
                                        </p>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">Enquiry Received!</h2>
                                    <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                                        Thank you, <span className="font-semibold text-foreground">{formData.fullName || "there"}</span>. We&apos;ve received your enquiry and our team will get back to you shortly at <span className="text-primary font-medium">{formData.email}</span>.
                                    </p>
                                    <button
                                        onClick={handleClose}
                                        className="bg-secondary hover:bg-secondary/80 text-foreground px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Decorative Grid inside modal */}
                        <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none -z-10" />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
