
import React from 'react';
import { CONFIG } from '../constants';

const Hero: React.FC = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(CONFIG.CA);
    alert("Contract Address Copied!");
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-black">
      {/* Visual background layers */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-block px-3 py-1 bg-red-600/10 border border-red-600/50 text-red-500 text-xs font-black tracking-widest uppercase mb-4">
              Legendary Primal Power
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
              <span className="text-white">THE KING</span> <br />
              <span className="text-red-600">OF THE SEA</span>
            </h1>
            
            <div className="max-w-xl space-y-4 mb-10">
              <p className="text-lg text-slate-300 leading-relaxed font-light">
                In ancient mythology, <span className="text-white font-bold italic">Kyogre</span> is a powerful Legendary Pokémon said to have created the oceans by causing torrential rains and massive tidal waves. It has been locked in a cataclysmic battle with Groudon for eons, threatening the very fabric of the world's climate.
              </p>
              <p className="text-md text-red-500/80 font-mono tracking-tight uppercase">
                "It is said to have saved people who were suffering from droughts by causing rain to fall."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start mb-8">
              <div className="flex bg-slate-900 border border-red-600/30 rounded-sm overflow-hidden w-full sm:w-auto">
                <div className="px-4 py-3 text-xs md:text-sm font-mono truncate text-white max-w-[200px] md:max-w-none">
                  {CONFIG.CA}
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="bg-red-600 hover:bg-red-700 px-4 transition-colors text-xs font-black uppercase tracking-widest"
                >
                  COPY
                </button>
              </div>
              <a href={CONFIG.PUMP_FUN_URL} className="w-full sm:w-auto text-center px-8 py-3 bg-white text-black font-black text-sm hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest">
                PUMP.FUN
              </a>
            </div>

            <div className="flex gap-6 items-center opacity-60">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-[10px] uppercase font-black tracking-[0.2em]">{CONFIG.TICKER} PROTOCOL ACTIVE</span>
                </div>
                <a href={CONFIG.X_COMMUNITY} className="text-[10px] uppercase font-black tracking-[0.2em] border-b border-white hover:text-red-500 hover:border-red-500 transition-all">JOIN THE SWARM</a>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-red-600 blur-[150px] opacity-20 animate-pulse"></div>
            <div className="relative z-10 group">
              <div className="absolute -inset-1 bg-red-600 rounded-full opacity-30 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
              <img 
                src={CONFIG.LOGO_URL} 
                alt="Kyogre Hero" 
                className="w-72 h-72 md:w-[450px] md:h-[450px] rounded-full relative z-20 border-8 border-black shadow-2xl animate-float transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 text-red-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7-7-7"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
