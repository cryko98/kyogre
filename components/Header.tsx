
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
    { name: 'Legacy', href: '#about' },
    { name: 'Ninja Way', href: '#buy' },
    { name: 'Jutsu', href: '#meme' },
    { name: 'Scrolls', href: '#chart' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 py-2 backdrop-blur-md border-b border-orange-600/50' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={CONFIG.LOGO_URL} alt="Naruto Logo" className="w-12 h-12 rounded-full border-2 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
          <span className="font-special text-2xl font-black tracking-wider text-white">
            <span className="text-orange-500">NARUTO</span>
          </span>
        </div>
        <nav className="flex gap-6 items-center">
          {navItems.map(item => (
            <a key={item.name} href={item.href} className="text-sm font-bold hover:text-orange-400 transition-colors uppercase tracking-widest hidden md:block text-slate-200">
              {item.name}
            </a>
          ))}
          <a 
            href={CONFIG.PUMP_FUN_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-orange-600 hover:bg-orange-500 text-black px-6 py-2 rounded-sm text-sm font-black transition-all shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:scale-105 border-l-4 border-black hover:border-white uppercase skew-x-[-10deg]"
          >
            <span className="skew-x-[10deg] inline-block">BUY $NARUTO</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
