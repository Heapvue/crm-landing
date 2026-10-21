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
});

export const metadata: Metadata = {
  title: "Heapsync - A CRM built for speed.",
  description: "The fastest self-hosted CRM for modern SMEs.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        <Script id="meta-pixel" strategy="afterInteractive">
          {buildMetaPixelSnippet({
            pixelId: HEAPSYNC_PIXEL_ID,
            hosts: META_PRODUCTION_HOSTS,
            debugKey: META_DEBUG_KEY,
          })}
        </Script>
        <ThemeProvider
          forcedTheme="dark"
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
