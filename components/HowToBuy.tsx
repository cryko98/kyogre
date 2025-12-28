
import React from 'react';
import { CONFIG } from '../constants';

const HowToBuy: React.FC = () => {
  const steps = [
    {
      title: "FORGE WALLET",
      description: "Get Phantom from your app store. Set up your vault. Secure your recovery phrase like it's a legendary treasure."
    },
    {
      title: "ACQUIRE SOL",
      description: "Buy SOL on an exchange or inside Phantom. This is your fuel to command the tides of $KYOGRE."
    },
    {
      title: "ACCESS PUMP",
      description: "Navigate to Pump.fun. Paste our CA into the search bar. Look for the King of the Sea logo."
    },
    {
      title: "SUMMON $KYOGRE",
      description: "Swap SOL for $KYOGRE. Zero taxes. Pure power. Welcome to the depths."
    }
  ];

  return (
    <section id="buy" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-16 uppercase tracking-tighter">
          CLAIM YOUR <br /><span className="text-red-600 underline decoration-red-900/50 underline-offset-8">POSITION</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div key={index} className="bg-slate-950 p-8 rounded-none border border-red-900/20 relative group hover:border-red-600 transition-all duration-300">
              <div className="text-7xl font-black text-red-900/10 absolute top-4 right-4 z-0 group-hover:text-red-600/20 transition-colors">
                {index + 1}
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-4 uppercase text-white tracking-widest">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href={CONFIG.PUMP_FUN_URL} 
            className="inline-block bg-white text-black px-12 py-5 font-black text-xl hover:bg-red-600 hover:text-white transition-all uppercase tracking-[0.2em]"
          >
            BUY ON PUMP.FUN
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowToBuy;
