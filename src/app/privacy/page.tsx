"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingModal } from "@/components/booking-modal";
import { useState } from "react";

export default function PrivacyPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans relative">
            <Navbar onOpenModal={() => setIsModalOpen(true)} />

            {/* Standard Background */}
            <div className="fixed inset-0 h-full w-full pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black,transparent)] z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.5)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-32 relative z-10">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                    <p className="mb-4">Last updated: January 14, 2026</p>
                    <p className="mb-4">At Heapsync (a product of Heapvue), we prioritize your data sovereignty. This Privacy Policy explains how we handle your information.</p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Data Ownership</h2>
                    <p>Unlike traditional CRMs, Heapsync is self-hosted. This means <strong>you own your data</strong>. We do not have access to the customer data stored within your self-hosted instance of Heapsync.</p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Information We Collect</h2>
                    <p>We only collect information necessary to provide you with the software license and support, such as:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>Account information (name, email, payment details) for billing purposes.</li>
                        <li>Telemetry data (optional) to improve software performance, which can be disabled.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Security</h2>
                    <p>We implement industry-standard security measures to protect your account information. However, the security of your self-hosted instance depends on your infrastructure.</p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Contact Us</h2>
                    <p>If you have questions about this policy, please contact us at privacy@heapvue.com.</p>
                </div>
            </div>
            <Footer />
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
}
