"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingModal } from "@/components/booking-modal";
import { useState } from "react";

export default function TermsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans relative">
            <Navbar onOpenModal={() => setIsModalOpen(true)} />

            {/* Standard Background */}
            <div className="fixed inset-0 h-full w-full pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black,transparent)] z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.5)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-32 relative z-10">
                <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                    <p className="mb-4">Last updated: January 14, 2026</p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. License Grant</h2>
                    <p>Heapsync grants you a revocable, non-exclusive, non-transferable, limited license to download, install, and use the software strictly in accordance with the terms of this Agreement.</p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Self-Hosting</h2>
                    <p>You acknowledge that Heapsync is a self-hosted solution. You are responsible for provisioning, securing, and maintaining the infrastructure required to run the software.</p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Restrictions</h2>
                    <p>You agree not to, and you will not permit others to:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>License, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose, or otherwise commercially exploit the software.</li>
                        <li>Modify, make derivative works of, disassemble, decrypt, reverse compile, or reverse engineer any part of the software.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Liability</h2>
                    <p>To the maximum extent permitted by applicable law, in no event shall Heapsync or Heapvue be liable for any special, incidental, indirect, or consequential damages whatsoever.</p>
                </div>
            </div>
            <Footer />
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
}
