'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile && isOpen) setIsOpen(false);
  }, [isMobile, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg border-b border-gray-200/50' : 'bg-white/90 backdrop-blur-sm border-b border-gray-100'
      }`} role="navigation" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link href="/" className="flex items-center space-x-3 group flex-shrink-0" onClick={closeMenu}>
              <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0">
                <span className="text-white font-extrabold text-base md:text-lg">%</span>
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight">
                  Calc<span className="text-indigo-600">Cent</span>
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase hidden sm:block">Calculator</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <NavLink href="/" onClick={closeMenu}>Home</NavLink>
              <NavLink href="/#tools" onClick={closeMenu}>All Tools</NavLink>
              <NavLink href="/about" onClick={closeMenu}>About</NavLink>
              <NavLink href="/contact" onClick={closeMenu}>Contact</NavLink>
              <Link href="/#tools" onClick={closeMenu} className="ml-4 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm">
                🚀 Start
              </Link>
            </div>

            <button ref={buttonRef} onClick={toggleMenu} className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100/70 transition touch-target relative z-50" aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} aria-controls="mobile-menu">
              <div className="relative w-6 h-6">
                <span className={`absolute left-0 top-[5px] h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 top-[11px] w-6' : 'w-6'}`} />
                <span className={`absolute left-0 top-[11px] h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 w-0' : 'w-6'}`} />
                <span className={`absolute left-0 bottom-[5px] h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 bottom-[11px] w-6' : 'w-6'}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div id="mobile-menu" ref={menuRef} className={`fixed top-16 md:top-20 left-0 right-0 bottom-0 z-40 transition-all duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={closeMenu} />
        <div className={`absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl rounded-b-2xl transition-all duration-300 overflow-y-auto max-h-[calc(100vh-64px)] md:max-h-[calc(100vh-80px)] ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          <div className="px-4 py-4 space-y-1">
            <MobileNavLink href="/" onClick={closeMenu}><span className="text-xl mr-3">🏠</span> Home</MobileNavLink>
            <MobileNavLink href="/#tools" onClick={closeMenu}><span className="text-xl mr-3">🧮</span> All Tools</MobileNavLink>
            <MobileNavLink href="/about" onClick={closeMenu}><span className="text-xl mr-3">ℹ️</span> About</MobileNavLink>
            <MobileNavLink href="/contact" onClick={closeMenu}><span className="text-xl mr-3">📬</span> Contact</MobileNavLink>
            <div className="pt-4 mt-4 border-t border-gray-100">
              <Link href="/#tools" onClick={closeMenu} className="flex items-center justify-center w-full px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 text-base">
                🚀 Start Calculating
              </Link>
              <p className="text-xs text-gray-400 text-center mt-3">Free • No Sign-up • 50+ Tools</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return <Link href={href} onClick={onClick} className="px-4 py-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 transition-all font-medium">{children}</Link>;
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return <Link href={href} onClick={onClick} className="flex items-center px-4 py-3.5 rounded-xl text-gray-700 hover:bg-gray-100/70 transition font-medium text-base">{children}</Link>;
}