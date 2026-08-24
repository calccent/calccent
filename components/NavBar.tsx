'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold text-white">CalcCent</span>
            <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">⚡</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white/90 hover:text-white hover:scale-105 transition">Home</Link>
            <Link href="/#tools" className="text-white/90 hover:text-white hover:scale-105 transition">All Tools</Link>
            <Link href="/about" className="text-white/90 hover:text-white hover:scale-105 transition">About</Link>
            <Link href="/contact" className="text-white/90 hover:text-white hover:scale-105 transition">Contact</Link>
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition">Home</Link>
            <Link href="/#tools" className="block text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition">All Tools</Link>
            <Link href="/about" className="block text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition">About</Link>
            <Link href="/contact" className="block text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}