import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "CalcCent – Free Online Percentage Calculator",
  description: "Calculate discounts, tips, taxes, margins, and more instantly. Free online percentage calculator with 50+ powerful tools.",
  keywords: "percentage calculator, discount calculator, tip calculator, tax calculator, financial calculator",
  authors: [{ name: "CalcCent" }],
  creator: "CalcCent",
  publisher: "CalcCent",
  robots: "index, follow",
  openGraph: {
    title: "CalcCent – Free Online Percentage Calculator",
    description: "50+ free calculators for discounts, tips, taxes, margins, and more.",
    type: "website",
    url: "https://calccent.com",
    siteName: "CalcCent",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcCent – Free Online Percentage Calculator",
    description: "50+ free calculators for discounts, tips, taxes, margins, and more.",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%234F46E5'/><text x='50' y='72' text-anchor='middle' font-size='60' font-weight='bold' fill='white'>%</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes" />
        <meta name="theme-color" content="#4F46E5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* AdSense script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-gray-50 antialiased min-h-screen flex flex-col">
        {/* ✅ NavBar - Fixed at top */}
        <NavBar />
        
        {/* ✅ Main content - Pushed down, grows to fill space */}
        <main className="pt-16 md:pt-20 flex-grow">
          {children}
        </main>
        
        {/* ✅ Footer - ALWAYS at bottom on EVERY page */}
        <footer className="bg-gray-900 text-gray-400 py-12 mt-12">
          <div className="max-w-6xl mx-auto px-4">
            {/* Footer Columns - Side by side on all devices */}
            <div className="flex flex-wrap justify-between gap-6 md:gap-8 mb-8">
              
              {/* Column 1: Product */}
              <div className="flex-1 min-w-[120px]">
                <h4 className="text-white font-semibold mb-3">Product</h4>
                <Link href="/#tools" className="block hover:text-white transition py-1">All Calculators</Link>
                <Link href="/about" className="block hover:text-white transition py-1">About</Link>
              </div>
              
              {/* Column 2: Company */}
              <div className="flex-1 min-w-[120px]">
                <h4 className="text-white font-semibold mb-3">Company</h4>
                <Link href="/about" className="block hover:text-white transition py-1">About Us</Link>
                <Link href="/contact" className="block hover:text-white transition py-1">Contact</Link>
              </div>
              
              {/* Column 3: Legal */}
              <div className="flex-1 min-w-[120px]">
                <h4 className="text-white font-semibold mb-3">Legal</h4>
                <Link href="/privacy" className="block hover:text-white transition py-1">Privacy Policy</Link>
              </div>
              
              {/* Column 4: Social */}
              <div className="flex-1 min-w-[120px]">
                <h4 className="text-white font-semibold mb-3">Social</h4>
                <a href="#" className="block hover:text-white transition py-1">Twitter</a>
                <a href="#" className="block hover:text-white transition py-1">GitHub</a>
              </div>
              
            </div>
            
            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-6 text-center text-sm">
              <p>© 2025 CalcCent. Built with ❤️ for speed and utility.</p>
              <p className="text-xs mt-1 text-gray-600">Every percent, instantly calculated.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}