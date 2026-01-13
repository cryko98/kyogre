
import React from 'react';
import { CONFIG } from '../constants';

const Hero: React.FC = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(CONFIG.CA);
    alert("Jutsu Scroll Copied!");
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Dynamic Hero Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${CONFIG.HERO_BG})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0a]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-block px-4 py-2 bg-orange-900/40 border border-orange-500 rounded-sm text-orange-400 text-xs font-black tracking-widest uppercase mb-6 shadow-[0_0_10px_rgba(249,115,22,0.3)] skew-x-[-10deg]">
              <span className="skew-x-[10deg] inline-block">The Seventh Hokage</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black mb-2 tracking-tighter leading-none drop-shadow-xl text-white font-special">
              <span className="text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]">NARUTO</span><br />
              <span className="text-white text-5xl md:text-7xl">UZUMAKI</span>
            </h1>
            
            <div className="max-w-xl space-y-6 mb-10">
              <p className="text-xl text-orange-100 leading-relaxed font-bold drop-shadow-md">
                "I'm not gonna run away, I never go back on my word! That's my <span className="text-orange-500 font-black">Nindō</span>: my ninja way!"
              </p>
              <p className="text-md text-slate-300 font-bold border-l-4 border-orange-500 pl-4 bg-black/60 py-3 rounded-r-sm backdrop-blur-sm">
                From the Hidden Leaf Village to the Solana Blockchain. The hero we deserve is finally here.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start mb-8">
              <div className="flex bg-black/80 backdrop-blur-md border border-orange-500/50 rounded-sm overflow-hidden w-full sm:w-auto shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                <div className="px-6 py-3 text-xs md:text-sm font-mono truncate text-orange-300 max-w-[200px] md:max-w-none">
                  {CONFIG.CA}
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="bg-orange-600 hover:bg-orange-500 px-6 transition-colors text-xs font-black uppercase tracking-widest text-black flex items-center"
                >
                  COPY
                </button>
              </div>
            </div>

            <div className="flex gap-4">
               <a href={CONFIG.PUMP_FUN_URL} className="px-8 py-4 bg-orange-600 text-black font-black text-sm rounded-sm hover:bg-white transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:scale-105 transform duration-200 clip-path-slant">
                Buy on Pump.fun
              </a>
              <a href={CONFIG.X_COMMUNITY} className="px-8 py-4 bg-black/80 text-white border border-orange-500 font-bold text-sm rounded-sm hover:bg-orange-900/50 transition-all uppercase tracking-widest">
                Join Village
              </a>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative z-10 group">
              <div className="absolute inset-0 bg-orange-500 rounded-full opacity-30 blur-[100px] animate-pulse"></div>
              {/* Using CSS mask or border to make it look cool */}
              <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] animate-float">
                 <img 
                  src={CONFIG.LOGO_URL} 
                  alt="Naruto Character" 
                  className="w-full h-full object-cover rounded-full border-4 border-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.5)]"
                />
                {/* Chakra spirals overlay */}
                 <div className="absolute inset-0 rounded-full border-t-4 border-orange-400 animate-spin opacity-50" style={{animationDuration: '3s'}}></div>
                 <div className="absolute -inset-4 rounded-full border-b-4 border-red-600 animate-spin opacity-30" style={{animationDuration: '5s', animationDirection: 'reverse'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
