
import React from 'react';
import { CONFIG } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative bg-transparent border-y border-red-900/20">
      <div className="container mx-auto px-4">
        {/* Banner at top as requested */}
        <div className="mb-16 rounded-sm border border-red-900/50 overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.2)] bg-black/40 backdrop-blur-sm">
          <img 
            src={CONFIG.BANNER_URL} 
            alt="Burn Whale Community Banner" 
            className="w-full h-auto object-cover max-h-[400px]"
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-white uppercase leading-none text-center">
            THE DEFIANT <br /><span className="text-red-600">INCINERATOR</span>
          </h2>
          
          <div className="space-y-10 text-lg text-slate-400 leading-relaxed text-center">
            <p className="text-xl text-white drop-shadow-md">
              <span className="text-red-600 font-black">$BurnWhale</span> is rewriting the rules of the whale meta. While others accumulate, we incinerate. 
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-slate-950/60 backdrop-blur-md p-8 border border-red-900/30 hover:border-red-600 transition-all shadow-xl">
                <h3 className="font-special text-2xl text-white mb-4 uppercase italic tracking-tighter flex items-center gap-3">
                  <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-xs not-italic shadow-[0_0_15px_rgba(239,68,68,0.6)]">20%</span>
                  Genesis Burn
                </h3>
                <p className="text-sm">The developer took a stand from the first second, burning 20% of the total supply. This massive deflationary act set the stage for an unstoppable rise. The fire was lit early, and it's only getting hotter.</p>
              </div>
              
              <div className="bg-slate-950/60 backdrop-blur-md p-8 border border-red-900/30 hover:border-red-600 transition-all shadow-xl">
                <h3 className="font-special text-2xl text-white mb-4 uppercase italic tracking-tighter flex items-center gap-3">
                  <span className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-xs not-italic shadow-[0_0_15px_rgba(255,255,255,0.4)]">🔥</span>
                  Eternal Buybacks
                </h3>
                <p className="text-sm">We don't just sit on tokens. The protocol actively buys back and burns supply, constantly reducing the number of whales in the ocean until only the strongest remain. Every dip is a chance for the furnace to consume more.</p>
              </div>
            </div>

            <p className="italic text-sm text-slate-500 uppercase tracking-widest pt-8 animate-pulse">
              "In the sea of fire, only the deflationary survive."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
