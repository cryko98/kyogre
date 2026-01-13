
import React from 'react';
import { CONFIG } from '../constants';

const Chart: React.FC = () => {
  return (
    <section id="chart" className="py-24 bg-transparent border-t border-orange-900/30">
      <div className="container mx-auto px-4 reveal">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-12 uppercase drop-shadow-[0_0_10px_rgba(249,115,22,0.3)] font-special text-white">
          MARKET <span className="text-orange-500">SCROLL</span>
        </h2>
        
        <div className="rounded-sm overflow-hidden shadow-2xl border-2 border-orange-600/30 h-[600px] bg-black/60 backdrop-blur-sm transition-all hover:border-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]">
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
            className="flex items-center gap-2 px-8 py-3 bg-white text-black hover:bg-orange-500 transition-all font-bold text-xs uppercase tracking-widest shadow-xl rounded-sm hover:scale-105"
           >
             VIEW FULL DATA
           </a>
        </div>
      </div>
    </section>
  );
};

export default Chart;
