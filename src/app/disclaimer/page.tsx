"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingModal } from "@/components/booking-modal";
import { useState } from "react";

export default function DisclaimerPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans relative">
            <Navbar onOpenModal={() => setIsModalOpen(true)} />

            {/* Standard Background */}
            <div className="fixed inset-0 h-full w-full pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black,transparent)] z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.5)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-32 relative z-10">
                <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                    <p className="mb-4">Last updated: January 14, 2026</p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">No Warranties</h2>
                    <p>Heapsync is provided "as is," with all faults, and Heapvue expresses no representations or warranties, of any kind related to this website or the materials contained on this website.</p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Professional Advice</h2>
                    <p>Content on this website is not intended to constitute professional advice of any kind.</p>

                    <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Errors and Omissions</h2>
                    <p>While we strive for accuracy, Heapsync assumes no responsibility for any errors or omissions in the content of this Service.</p>
                </div>
            </div>
            <Footer />
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
}
