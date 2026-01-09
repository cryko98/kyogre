
import React from 'react';
import { CONFIG } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative bg-transparent">
      <div className="container mx-auto px-4 reveal">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-12 text-white text-center drop-shadow-lg">
            THE ORIGIN OF <span className="text-cyan-400">FLUFF</span>
          </h2>
          
          <div className="bg-blue-950/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-blue-500/30 shadow-[0_0_50px_rgba(34,211,238,0.1)] transition-all hover:border-cyan-400/50">
            <div className="space-y-8 text-lg text-blue-100 leading-relaxed">
              <p className="text-xl font-bold text-center">
                It started with a transaction. A legend of the chain, <span className="text-cyan-400 font-black">@TheWhiteWhaleV2</span>, sent USDC to a mysterious wallet.
              </p>

              {/* Added Image Section */}
              <div className="relative group overflow-hidden rounded-2xl border-2 border-cyan-500/30 shadow-2xl mx-auto max-w-2xl transform transition-transform duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>
                <img 
                  src="https://pbs.twimg.com/media/G-NwXQsaYAASYAs?format=jpg&name=medium" 
                  alt="Fluffin Origin Story" 
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="bg-cyan-500/80 text-black text-[10px] font-black px-3 py-1 rounded uppercase tracking-widest backdrop-blur-sm">
                    Visual Evidence
                  </span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 my-8">
                 <div className="bg-black/40 p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400 transition-colors shadow-lg">
                    <h3 className="text-2xl font-special text-cyan-300 mb-2">The Gift</h3>
                    <p className="text-sm text-slate-300 font-medium">
                      It wasn't just funds; it was a spark of life. From that interaction, <span className="font-bold text-white">$FLUFFIN</span> was minted into existence.
                    </p>
                 </div>
                 <div className="bg-black/40 p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400 transition-colors shadow-lg">
                    <h3 className="text-2xl font-special text-cyan-300 mb-2">The Creature</h3>
                    <p className="text-sm text-slate-300 font-medium">
                      Not a terrifying beast, but an adorable, fluffy monster. Fluffin represents the fun, chaotic, and community-driven spirit of Solana.
                    </p>
                 </div>
              </div>

              <p className="text-center italic text-cyan-200 font-bold text-lg">
                "The White Whale didn't just move liquidity, he woke up the Fluff."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
