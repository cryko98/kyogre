
import React from 'react';
import { CONFIG } from '../constants';

const Chart: React.FC = () => {
  return (
    <section id="chart" className="py-24 bg-transparent border-t border-cyan-500/10">
      <div className="container mx-auto px-4 reveal">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-12 uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
          FLUFF <span className="text-cyan-400">CHART</span>
        </h2>
        
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/20 h-[600px] bg-black/40 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
          <iframe 
            src={`https://dexscreener.com/solana/${CONFIG.CA}?embed=1&theme=dark&trades=0&info=0`}
            className="w-full h-full border-none opacity-90 hover:opacity-100 transition-opacity"
            title="Dexscreener Chart"
          ></iframe>
        </div>
        
        <div className="mt-8 flex justify-center gap-4">
           <a 
            href={CONFIG.DEXSCREENER_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 bg-white text-black hover:bg-cyan-400 hover:text-black transition-all font-bold text-xs uppercase tracking-widest shadow-xl rounded-full hover:scale-105"
           >
             LIVE DEXSCREENER
           </a>
        </div>
      </div>
    </section>
  );
};

export default Chart;
