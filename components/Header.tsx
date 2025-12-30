
import React, { useState, useEffect } from 'react';
import { CONFIG } from '../constants';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Burn Story', href: '#about' },
    { name: 'How to Buy', href: '#buy' },
    { name: 'Meme Gen', href: '#meme' },
    { name: 'Chart', href: '#chart' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 py-2 backdrop-blur-md border-b border-red-600/30' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={CONFIG.LOGO_URL} alt="Burn Whale Logo" className="w-10 h-10 rounded-full border border-red-600 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          <span className="font-special text-xl font-bold tracking-tighter hidden sm:block">
            <span className="text-red-500">BURN</span> WHALE
          </span>
        </div>
        <nav className="flex gap-6 items-center">
          {navItems.map(item => (
            <a key={item.name} href={item.href} className="text-sm font-semibold hover:text-red-500 transition-colors uppercase tracking-widest hidden md:block">
              {item.name}
            </a>
          ))}
          <a 
            href={CONFIG.PUMP_FUN_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-sm text-sm font-bold transition-all shadow-lg shadow-red-900/50 uppercase tracking-tighter"
          >
            BUY NOW
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
