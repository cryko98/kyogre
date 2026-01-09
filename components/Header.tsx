
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
    { name: 'Story', href: '#about' },
    { name: 'Adopt', href: '#buy' },
    { name: 'Create', href: '#meme' },
    { name: 'Chart', href: '#chart' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#020617]/90 py-2 backdrop-blur-md border-b border-cyan-500/20' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={CONFIG.LOGO_URL} alt="Fluffin Logo" className="w-10 h-10 rounded-full border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
          <span className="font-special text-2xl font-black tracking-tight text-white">
            <span className="text-cyan-400">FLUFF</span>IN
          </span>
        </div>
        <nav className="flex gap-6 items-center">
          {navItems.map(item => (
            <a key={item.name} href={item.href} className="text-sm font-bold hover:text-cyan-400 transition-colors uppercase tracking-wider hidden md:block text-blue-100">
              {item.name}
            </a>
          ))}
          <a 
            href={CONFIG.PUMP_FUN_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white hover:bg-cyan-100 text-black px-6 py-2 rounded-full text-sm font-black transition-all shadow-lg hover:scale-105 border border-transparent hover:border-cyan-400"
          >
            BUY $FLUFFIN
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
