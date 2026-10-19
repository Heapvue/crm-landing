import type { Metadata } from "next";
import Script from "next/script";
import { MetaEvents } from "@/components/meta-events";
import { Geist, Geist_Mono, Playfair_Display, Cookie } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cookie = Cookie({
  variable: "--font-cookie",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Heapsync - A CRM built for speed.",
  description: "The fastest self-hosted CRM for modern SMEs.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cookie.variable} antialiased`}
      >
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1142810485096006');
fbq('track', 'PageView');`}
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
            src="https://www.facebook.com/tr?id=1142810485096006&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
