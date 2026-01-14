import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="pt-0 pb-12 relative overflow-hidden bg-background">
            {/* Continuous Grid Background */}
            <div className="absolute inset-0 h-full w-full pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black,transparent)]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.5)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>
            <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
                <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-24">

                    {/* Brand Column */}
                    <div className="flex flex-col gap-6 max-w-sm">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full bg-background" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-foreground">Heapsync</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Empowering teams to own their data with self-hosted, sovereign CRM solutions.
                            Secure, fast, and yours forever.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            <a href="https://x.com/heapvue" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all">
                                <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                            </a>
                            <a href="https://github.com/heapvue" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/company/heapvue" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com/heapvue" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-foreground text-sm">Industries</h4>
                            <ul className="flex flex-col gap-3 text-sm text-muted-foreground/80">
                                <li><span className="cursor-default hover:text-primary transition-colors">Medical</span></li>
                                <li><span className="cursor-default hover:text-primary transition-colors">Real Estate</span></li>
                                <li><span className="cursor-default hover:text-primary transition-colors">Finance</span></li>
                                <li><span className="cursor-default hover:text-primary transition-colors">Legal</span></li>
                                <li><span className="cursor-default hover:text-primary transition-colors">Retail</span></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-foreground text-sm">Capabilities</h4>
                            <ul className="flex flex-col gap-3 text-sm text-muted-foreground/80">
                                <li><span className="cursor-default hover:text-primary transition-colors">Sales Pipelines</span></li>
                                <li><span className="cursor-default hover:text-primary transition-colors">Role Hierarchy</span></li>
                                <li><span className="cursor-default hover:text-primary transition-colors">Lead Scoring</span></li>
                                <li><span className="cursor-default hover:text-primary transition-colors">Analytics</span></li>
                                <li><span className="cursor-default hover:text-primary transition-colors">API Access</span></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-foreground text-sm">Benefits</h4>
                            <ul className="flex flex-col gap-3 text-sm text-muted-foreground/80">
                                <li><span className="cursor-default hover:text-primary transition-colors">Data Ownership</span></li>
                                <li><span className="cursor-default hover:text-primary transition-colors">No Vendor Lock-in</span></li>
                                <li><span className="cursor-default hover:text-primary transition-colors">One-time Payment</span></li>
                                <li><span className="cursor-default hover:text-primary transition-colors">Unlimited Users</span></li>
                                <li><span className="cursor-default hover:text-primary transition-colors">High Performance</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60">
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <span>© {new Date().getFullYear()} Heapsync. All rights reserved.</span>
                        <span className="hidden md:inline text-muted-foreground/40">|</span>
                        <span className="font-medium text-muted-foreground/80">A Product of <a href="https://heapvue.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Heapvue</a></span>
                    </div>
                    <div className="flex items-center gap-8">
                        <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
                        <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
                        <a href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
