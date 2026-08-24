import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "CalcCent – Free Percentage Calculator",
  description: "Calculate discounts, tips, taxes, margins, and more instantly. Free online percentage calculator with 50+ tools.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* GOOGLE ADSENSE SCRIPT - Replace YOUR_PUBLISHER_ID with your actual AdSense ID */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-gray-50 antialiased">{children}</body>
    </html>
  );
} 