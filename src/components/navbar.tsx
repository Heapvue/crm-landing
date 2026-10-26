"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
    onOpenModal: () => void;
}

export function Navbar({ onOpenModal }: NavbarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        if (pathname === "/") {
            const element = document.getElementById(id);
            element?.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push(`/?section=${id}`);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Brand Text Only */}
                <div className="flex-shrink-0 flex items-center">
                    <Link href="/" className="flex flex-col hover:opacity-90 transition-opacity">
                        <span className="font-bold text-xl tracking-tight text-[#0a0f29] leading-none">
                            Heapsync
                        </span>
                        <span className="text-[10px] text-[#64748b] font-medium tracking-wide mt-1">
                            Powered by Heapvue
                        </span>
                    </Link>
                </div>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-8">
                    <a
                        href="#features"
                        onClick={(e) => handleScroll(e, "features")}
                        className="text-[0.92rem] font-medium text-[#1e293b] hover:text-[#0555FF] transition-colors cursor-pointer"
                    >
                        Features
                    </a>
                    <a
                        href="#pricing"
                        onClick={(e) => handleScroll(e, "pricing")}
                        className="text-[0.92rem] font-medium text-[#1e293b] hover:text-[#0555FF] transition-colors cursor-pointer"
                    >
                        Pricing
                    </a>
                    <a
                        href="https://heapvue.com/about"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.92rem] font-medium text-[#1e293b] hover:text-[#0555FF] transition-colors cursor-pointer"
                    >
                        About
                    </a>
                </nav>

                {/* Right Action */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onOpenModal}
                        className="btn-heapvue-primary rounded-none text-sm px-6 py-2.5"
                    >
                        Get in Touch
                    </button>
                </div>
            </div>
        </header>
    );
}
