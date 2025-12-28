
import React from 'react';
import { CONFIG } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative bg-black border-y border-red-900/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-white uppercase leading-none">
              A LEGENDARY <br /><span className="text-red-600">RUNNER</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-400 leading-relaxed font-light">
              <p>
                As the master of the hydrosphere, <span className="text-white font-semibold">$KYOGRE</span> is more than a memecoin. It is a symbol of absolute dominance. On Solana, where speed and power define the winner, Kyogre emerges as the apex predator of the current <span className="text-red-500 font-bold uppercase tracking-tighter italic">Whale & Pokémon Meta</span>.
              </p>
              <div className="glass-card p-6 border-l-4 border-l-red-600">
                <h3 className="font-special text-xl text-white mb-2 uppercase italic tracking-tighter">Oceanic Accumulation</h3>
                <p className="text-sm">The whale meta is reaching critical mass. Large holders are looking for narratives that command respect and fear. Kyogre is the ultimate vessel for this movement.</p>
              </div>
              <div className="glass-card p-6 border-l-4 border-l-white">
                <h3 className="font-special text-xl text-white mb-2 uppercase italic tracking-tighter">Gotta Catch the Multipliers</h3>
                <p className="text-sm">Pokémon culture is deeply rooted in the Solana ecosystem. We are tapping into a global fanbase and a multi-generational narrative that refuses to die. This is the king of the meta.</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
             <div className="relative group">
                <div className="absolute inset-0 bg-red-600 blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity"></div>
                <img 
                  src="https://pbs.twimg.com/media/G9RUs1tWkAAHNeJ?format=jpg&name=large" 
                  alt="Kyogre Legendary Power" 
                  className="rounded-sm border border-red-900/50 relative z-10 shadow-2xl transition-all duration-1000 h-[500px] w-full object-cover"
                />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
