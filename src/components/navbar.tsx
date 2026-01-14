"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
// Button import removed
// Actually, I should create a reusable button component since I'll use it in Hero too.

function NavButton({ children, variant = "primary", className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
    const base = "px-4 py-2 rounded-lg font-medium transition-all duration-200";
    const variants = {
        primary: "bg-primary text-primary-foreground hover:shadow-[0_0_20px_-5px_var(--primary)]",
        ghost: "hover:bg-secondary/50 text-foreground"
    };
    return <button className={`${base} ${variants[variant]} ${className || ""}`} {...props}>{children}</button>;
}

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
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-4xl z-50">
            <div className="bg-background/60 backdrop-blur-2xl rounded-full px-6 py-3 flex items-center justify-between border border-white/5 shadow-2xl shadow-black/50">
                <div className="flex-shrink-0 flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-background" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-xl tracking-tight text-foreground leading-none">Heapsync</span>
                            <span className="text-[10px] text-muted-foreground font-medium tracking-wide">Powered by Heapvue</span>
                        </div>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" onClick={(e) => handleScroll(e, "features")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">Features</a>
                    <a href="#pricing" onClick={(e) => handleScroll(e, "pricing")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">Pricing</a>
                    <a href="#about" onClick={(e) => handleScroll(e, "about")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">About</a>
                </div>

                <div className="flex items-center gap-4">

                    <button
                        onClick={onOpenModal}
                        className="relative group bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold text-sm overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_-5px_var(--primary)] hover:shadow-[0_0_30px_-5px_var(--primary)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:animate-[shimmer_1.5s_infinite]" />
                        <span className="relative z-10">Schedule Demo</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
