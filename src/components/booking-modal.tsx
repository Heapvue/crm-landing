"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        countryCode: "+91",
        phone: "",
        demoTime: "",
        timezone: "UTC"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdP6e7KOkNQbxOESfe4FE64x12fiaM_Px_RJtkVW7p-ybNoCg/formResponse";

        const formBody = new FormData();
        formBody.append("entry.762828552", formData.name);
        formBody.append("entry.101020759", formData.email);
        formBody.append("entry.447874252", `${formData.countryCode} ${formData.phone}`);
        formBody.append("entry.1845390245", formData.demoTime);
        formBody.append("entry.1507794951", formData.timezone);

        try {
            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: "POST",
                mode: "no-cors",
                body: formBody
            });
            // With no-cors, we can't check response.ok, so we assume success if no network error.
            setStep(2);
        } catch (error) {
            console.error("Form submission failed", error);
            alert("Something went wrong. Please try again.");
        } finally {
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
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed z-[101] w-full max-w-md bg-background border border-border rounded-3xl overflow-hidden shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <motion.div
                            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8">
                            {step === 1 ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className="text-center mb-8">
                                        <h2 className="text-2xl font-bold text-foreground mb-2">Schedule Your Demo</h2>
                                        <p className="text-muted-foreground text-sm">See how Heapsync handles 1M+ records in microseconds.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-muted-foreground mb-1 ml-1">FULL NAME</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary/50 focus:bg-primary/5 transition-all placeholder:text-muted-foreground/30"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-muted-foreground mb-1 ml-1">WORK EMAIL</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary/50 focus:bg-primary/5 transition-all placeholder:text-muted-foreground/30"
                                                placeholder="john@company.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-muted-foreground mb-1 ml-1">PHONE NUMBER</label>
                                            <div className="flex gap-2">
                                                <select
                                                    className="bg-secondary/50 border border-white/10 rounded-xl px-3 py-3 text-foreground outline-none focus:border-primary/50 focus:bg-primary/5 transition-all appearance-none min-w-[80px]"
                                                    value={formData.countryCode}
                                                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                                >
                                                    <option value="+91" className="bg-zinc-950 text-white">🇮🇳 +91</option>
                                                    <option value="+1" className="bg-zinc-950 text-white">🇺🇸 +1</option>
                                                    <option value="+44" className="bg-zinc-950 text-white">🇬🇧 +44</option>
                                                    <option value="+61" className="bg-zinc-950 text-white">🇦🇺 +61</option>
                                                    <option value="+81" className="bg-zinc-950 text-white">🇯🇵 +81</option>
                                                    <option value="+49" className="bg-zinc-950 text-white">🇩🇪 +49</option>
                                                </select>
                                                <input
                                                    type="tel"
                                                    required
                                                    className="flex-1 w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary/50 focus:bg-primary/5 transition-all placeholder:text-muted-foreground/30"
                                                    placeholder="123 456 7890"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1 ml-1">DEMO TIME</label>
                                                <input
                                                    type="datetime-local"
                                                    required
                                                    className="w-full bg-secondary/50 border border-white/10 rounded-xl px-3 py-3 text-foreground outline-none focus:border-primary/50 focus:bg-primary/5 transition-all text-xs"
                                                    value={formData.demoTime}
                                                    onChange={(e) => setFormData({ ...formData, demoTime: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-muted-foreground mb-1 ml-1">TIMEZONE</label>
                                                <select
                                                    className="w-full bg-secondary/50 border border-white/10 rounded-xl px-3 py-3 text-foreground outline-none focus:border-primary/50 focus:bg-primary/5 transition-all text-xs appearance-none"
                                                    value={formData.timezone}
                                                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                                                >
                                                    <option value="UTC" className="bg-zinc-950 text-white">UTC (Universal)</option>
                                                    <option value="PST" className="bg-zinc-950 text-white">PST (Pacific)</option>
                                                    <option value="EST" className="bg-zinc-950 text-white">EST (Eastern)</option>
                                                    <option value="CET" className="bg-zinc-950 text-white">CET (Central Euro)</option>
                                                    <option value="IST" className="bg-zinc-950 text-white">IST (India)</option>
                                                    <option value="JST" className="bg-zinc-950 text-white">JST (Japan)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <button
                                            disabled={isSubmitting}
                                            className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:shadow-[0_0_20px_-5px_var(--primary)] transition-all flex items-center justify-center gap-2 group mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? "Booking..." : "Book Time Slot"}
                                            {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                        </button>

                                        <p className="text-center text-xs text-muted-foreground/60 pt-4">
                                            No credit card required • GDPR Compliant
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
                                    <h2 className="text-2xl font-bold text-foreground mb-2">You're on the list!</h2>
                                    <p className="text-muted-foreground text-sm mb-8">
                                        We will send a calendar invite to <span className="text-primary">{formData.email}</span>.
                                    </p>
                                    <button
                                        onClick={onClose}
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
