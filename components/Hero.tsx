'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      heroRef.current.style.setProperty('--x', String(x));
      heroRef.current.style.setProperty('--y', String(y));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden min-h-[55vh] md:min-h-[65vh] flex items-center" style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 30%, #C7D2FE 60%, #A5B4FC 100%)' }}>
      <div className="hero-glow top-1/4 left-1/4" style={{ transform: 'translate(calc(var(--x, 0) * 40px), calc(var(--y, 0) * 40px))', transition: 'transform 0.1s ease-out' }} />
      <div className="hero-glow-accent bottom-1/4 right-1/4" style={{ transform: 'translate(calc(var(--x, 0) * -30px), calc(var(--y, 0) * -30px))', transition: 'transform 0.1s ease-out' }} />
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-indigo-200/30 animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-purple-200/20 animate-float delay-200" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-100/20 animate-pulse-slow" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center lg:text-left animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-indigo-700 text-sm mb-6 border border-white/30 shadow-sm">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
              <span className="font-medium">50+ Powerful Calculators</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1]">
              Calculate Any <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">Percentage</span><br />
              <span className="text-gray-700">In Seconds</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 mt-4 md:mt-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Free, lightning-fast, and beautifully designed calculators for discounts, tips, taxes, margins, and everything in between.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8 justify-center lg:justify-start">
              <Link href="#tools" className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all hover:scale-105 active:scale-95 text-sm md:text-base">
                🧮 Start Calculating <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white/70 backdrop-blur-sm text-gray-700 rounded-2xl font-semibold border border-gray-200 hover:bg-white/90 hover:shadow-md transition-all text-sm md:text-base">Learn More</Link>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-6 mt-6 md:mt-8 justify-center lg:justify-start text-gray-500 text-xs md:text-sm">
              <span className="flex items-center gap-2 text-gray-600">⚡ 50+ Tools</span>
              <span className="flex items-center gap-2 text-gray-600">🔒 No Sign-ups</span>
              <span className="flex items-center gap-2 text-gray-600">📱 All Devices</span>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4 animate-fadeInScale delay-300">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/60 shadow-sm">
              <div className="text-3xl font-extrabold text-indigo-600">50+</div>
              <div className="text-gray-600 text-sm mt-1">Calculators</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/60 shadow-sm">
              <div className="text-3xl font-extrabold text-indigo-600">∞</div>
              <div className="text-gray-600 text-sm mt-1">Free Forever</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/60 shadow-sm col-span-2">
              <div className="text-3xl font-extrabold text-indigo-600">⚡</div>
              <div className="text-gray-600 text-sm mt-1">Instant Results</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-indigo-300/50 flex justify-center">
          <div className="w-1.5 h-3 bg-indigo-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}