import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="pt-16 pb-12 relative overflow-hidden bg-[#0e0e0e] text-white border-t border-white/10 [background-image:url('/images/footer_bg_1920.webp')] bg-cover bg-top bg-no-repeat">
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-24">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6 max-w-sm">
                        <Link href="/" className="hover:opacity-90 transition-opacity">
                            <span className="font-bold text-2xl tracking-tight text-white block">Heapsync</span>
                        </Link>
                        <p className="text-[#94a3b8] text-sm leading-relaxed">
                            Empowering teams to own their data with self-hosted, sovereign CRM solutions.
                            Secure, fast, and yours forever.
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                            <a
                                href="https://x.com/heapvue"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-none bg-white/5 hover:bg-[#0555FF] text-[#cbd5e1] hover:text-white transition-all flex items-center justify-center border border-white/10"
                                aria-label="X (Twitter)"
                            >
                                <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg">
                                    <title>X</title>
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                </svg>
                            </a>
                            <a
                                href="https://github.com/heapvue"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-none bg-white/5 hover:bg-[#0555FF] text-[#cbd5e1] hover:text-white transition-all flex items-center justify-center border border-white/10"
                                aria-label="GitHub"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/heapvue"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-none bg-white/5 hover:bg-[#0555FF] text-[#cbd5e1] hover:text-white transition-all flex items-center justify-center border border-white/10"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="https://instagram.com/heapvue"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-none bg-white/5 hover:bg-[#0555FF] text-[#cbd5e1] hover:text-white transition-all flex items-center justify-center border border-white/10"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-white text-base tracking-wide" style={{ color: "#ffffff" }}>
                                Industries
                            </h4>
                            <ul className="flex flex-col gap-3 text-sm text-[#cbd5e1]">
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">Education</span></li>
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">Medical</span></li>
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">Real Estate</span></li>
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">Finance</span></li>
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">Legal</span></li>
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">Retail</span></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-white text-base tracking-wide" style={{ color: "#ffffff" }}>
                                Capabilities
                            </h4>
                            <ul className="flex flex-col gap-3 text-sm text-[#cbd5e1]">
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">Sales Pipelines</span></li>
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">Role Hierarchy</span></li>
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">Quotes</span></li>
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">Transactions</span></li>
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">Accounts</span></li>
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">Analytics</span></li>
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">API Access</span></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-white text-base tracking-wide" style={{ color: "#ffffff" }}>
                                Benefits
                            </h4>
                            <ul className="flex flex-col gap-3 text-sm text-[#cbd5e1]">
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">Data Ownership</span></li>
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">No Vendor Lock-in</span></li>
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">One-time Payment</span></li>
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">Unlimited Users</span></li>
                                <li><span className="cursor-default hover:text-[#60a5fa] transition-colors">High Performance</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#94a3b8]">
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <span>© {new Date().getFullYear()} Heapsync. All rights reserved.</span>
                        <span className="hidden md:inline text-white/30">|</span>
                        <span className="font-medium text-[#cbd5e1]">
                            A Product of{" "}
                            <a
                                href="https://heapvue.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-[#0555FF] transition-colors"
                            >
                                Heapvue
                            </a>
                        </span>
                    </div>
                    <div className="flex items-center gap-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/disclaimer" className="hover:text-white transition-colors">
                            Disclaimer
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
