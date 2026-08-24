import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "CalcCent – Free Percentage Calculator",
  description: "Calculate discounts, tips, taxes, margins, and more instantly. Free online percentage calculator with 50+ tools.",
  icons: {
    icon: "🧮",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap" rel="stylesheet" />
        {/* GOOGLE ADSENSE SCRIPT - Replace with your real ID after approval */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-gray-50 antialiased">
        <NavBar />
        <main className="min-h-screen">
          {children}
        </main>
        {/* Footer - appears on ALL pages */}
        <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <link href="/" className="hover:text-white transition">Home</link>
              <link href="/about" className="hover:text-white transition">About</link>
              <link href="/privacy" className="hover:text-white transition">Privacy</link>
              <link href="/contact" className="hover:text-white transition">Contact</link>
            </div>
            <p className="text-sm">© 2025 CalcCent. Built for speed and utility.</p>
            <p className="text-xs mt-2 text-gray-600">Every percent, instantly calculated.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}