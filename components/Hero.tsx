
import React from 'react';
import { CONFIG } from '../constants';

const Hero: React.FC = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(CONFIG.CA);
    alert("Contract Address Copied!");
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Dynamic Hero Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-70 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${CONFIG.HERO_BG})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-[#020617]/20 to-[#020617]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-block px-4 py-2 bg-cyan-900/30 border border-cyan-400 rounded-full text-cyan-300 text-xs font-black tracking-widest uppercase mb-6 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              The Legend is True
            </div>
            <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tight leading-none drop-shadow-xl text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">FLUFFIN</span>
            </h1>
            
            <div className="max-w-xl space-y-6 mb-10">
              <p className="text-xl text-blue-100 leading-relaxed font-bold drop-shadow-md">
                Born from a legendary transaction. When <span className="text-cyan-400 font-black">@TheWhiteWhaleV2</span> sent USDC to the wallet, <span className="text-white font-black">$FLUFFIN</span> appeared. 
              </p>
              <p className="text-md text-slate-300 font-bold italic border-l-4 border-cyan-400 pl-4 bg-blue-950/40 py-3 rounded-r-lg backdrop-blur-sm">
                "It wasn't a whale that emerged... it was a cute, fluffy monster ready to take over Solana."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start mb-8">
              <div className="flex bg-black/60 backdrop-blur-md border border-cyan-500/50 rounded-full overflow-hidden w-full sm:w-auto shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <div className="px-6 py-3 text-xs md:text-sm font-mono truncate text-cyan-200 max-w-[200px] md:max-w-none">
                  {CONFIG.CA}
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="bg-cyan-500 hover:bg-cyan-400 px-6 transition-colors text-xs font-black uppercase tracking-widest text-black"
                >
                  COPY
                </button>
              </div>
            </div>

            <div className="flex gap-4">
               <a href={CONFIG.PUMP_FUN_URL} className="px-8 py-3 bg-white text-black font-black text-sm rounded-full hover:bg-cyan-300 transition-all uppercase tracking-widest shadow-lg hover:scale-105 transform duration-200 border-2 border-transparent hover:border-white">
                Buy on Pump.fun
              </a>
              <a href={CONFIG.X_COMMUNITY} className="px-8 py-3 bg-blue-900/60 text-white border border-blue-400 font-bold text-sm rounded-full hover:bg-blue-800 transition-all uppercase tracking-widest">
                Join Community
              </a>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative z-10 group">
              <div className="absolute inset-0 bg-cyan-500 rounded-full opacity-20 blur-[80px] animate-pulse"></div>
              <img 
                src={CONFIG.LOGO_URL} 
                alt="Fluffin Character" 
                className="w-64 h-64 md:w-[400px] md:h-[400px] rounded-full relative z-20 border-8 border-cyan-400/30 shadow-[0_0_60px_rgba(34,211,238,0.4)] animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
