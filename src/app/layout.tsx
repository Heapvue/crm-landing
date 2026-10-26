import type { Metadata } from "next";
import Script from "next/script";
import { MetaEvents } from "@/components/meta-events";
import { HEAPSYNC_PIXEL_ID, META_DEBUG_KEY, META_PRODUCTION_HOSTS } from "@/lib/meta-events";
import { buildMetaPixelSnippet } from "@/lib/meta-pixel-snippet";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Heapsync - Eliminate Monthly Recurring & Per-User CRM Fees",
  description: "The perpetual self-hosted CRM built to eliminate recurring subscription costs and per-user fees forever. Complete data sovereignty on your private infrastructure.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/minilogo_heapvue.png", type: "image/png" },
    ],
    shortcut: "/images/minilogo_heapvue.png",
    apple: "/apple-icon.png",
  },
};

import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body
        className={`${poppins.className} font-sans antialiased`}
      >
        <Script id="meta-pixel" strategy="afterInteractive">
          {buildMetaPixelSnippet({
            pixelId: HEAPSYNC_PIXEL_ID,
            hosts: META_PRODUCTION_HOSTS,
            debugKey: META_DEBUG_KEY,
          })}
        </Script>
        <ThemeProvider
          forcedTheme="light"
          disableTransitionOnChange
        >
          {children}
          <MetaEvents />
        </ThemeProvider>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${HEAPSYNC_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
