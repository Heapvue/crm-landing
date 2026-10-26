"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingModal } from "@/components/booking-modal";
import { useState } from "react";

export default function DisclaimerPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-white text-[#0a0f29] selection:bg-[#0555FF]/15 selection:text-[#081d63] font-sans relative">
            <Navbar onOpenModal={() => setIsModalOpen(true)} />

            <div className="max-w-4xl mx-auto px-6 py-32 relative z-10">
                <h1 className="text-4xl font-bold mb-8 text-[#0a0f29]">Disclaimer</h1>
                <div className="prose max-w-none text-[#475569] leading-relaxed">
                    <p className="mb-4">Last updated: January 14, 2026</p>

                    <h2 className="text-2xl font-semibold text-[#0a0f29] mt-8 mb-4">No Warranties</h2>
                    <p>Heapsync is provided &quot;as is,&quot; with all faults, and Heapvue expresses no representations or warranties, of any kind related to this website or the materials contained on this website.</p>

                    <h2 className="text-2xl font-semibold text-[#0a0f29] mt-8 mb-4">Professional Advice</h2>
                    <p>Content on this website is not intended to constitute professional advice of any kind.</p>

                    <h2 className="text-2xl font-semibold text-[#0a0f29] mt-8 mb-4">Errors and Omissions</h2>
                    <p>While we strive for accuracy, Heapsync assumes no responsibility for any errors or omissions in the content of this Service.</p>
                </div>
            </div>
            <Footer />
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
}
