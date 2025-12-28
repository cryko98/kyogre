
import React from 'react';
import { CONFIG } from '../constants';

const Chart: React.FC = () => {
  return (
    <section id="chart" className="py-24 bg-black border-t border-red-900/10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-12 uppercase tracking-tighter">
          TIDAL <span className="text-red-600">CHARTS</span>
        </h2>
        
        <div className="rounded-none overflow-hidden shadow-2xl border border-red-900/20 h-[600px] bg-slate-950">
          <iframe 
            src={`https://dexscreener.com/solana/${CONFIG.CA}?embed=1&theme=dark&trades=0&info=0`}
            className="w-full h-full border-none"
            title="Dexscreener Chart"
          ></iframe>
        </div>
        
        <div className="mt-8 flex justify-center gap-4">
           <a 
            href={CONFIG.DEXSCREENER_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 bg-white text-black hover:bg-red-600 hover:text-white transition-all font-black text-xs uppercase tracking-widest"
           >
             LIVE DEXSCREENER
           </a>
        </div>
      </div>
    </section>
  );
};

export default Chart;
