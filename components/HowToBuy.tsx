
import React from 'react';
import { CONFIG } from '../constants';

const HowToBuy: React.FC = () => {
  const steps = [
    {
      title: "SUMMON PHANTOM",
      description: "Download the Phantom wallet scroll. This is your ninja tool pouch."
    },
    {
      title: "GATHER CHAKRA (SOL)",
      description: "Acquire SOL. You need spiritual energy to perform the summoning jutsu."
    },
    {
      title: "ENTER THE ARENA",
      description: "Go to Pump.fun. Find the $NARUTO mission board using our CA."
    },
    {
      title: "BELIEVE IT!",
      description: "Swap SOL for $NARUTO. Join the Hidden Leaf Village community."
    }
  ];

  return (
    <section id="buy" className="py-24 bg-transparent relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-16 reveal font-special text-white">
          THE NINJA <span className="text-orange-500">WAY</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-group">
          {steps.map((step, index) => (
            <div key={index} className="reveal-child bg-neutral-900/60 backdrop-blur-sm p-8 rounded-sm border border-orange-900/30 relative group hover:border-orange-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              <div className="text-6xl font-special text-orange-500/10 absolute top-2 right-4 z-0 group-hover:text-orange-500/20 transition-colors">
                {index + 1}
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 text-orange-400 uppercase font-special tracking-wider">{step.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-semibold">
                  {step.description}
                </p>
              </div>
              {/* Corner decor */}
              <div className="absolute bottom-0 right-0 w-0 h-0 border-t-[20px] border-t-transparent border-r-[20px] border-r-orange-500/50 group-hover:border-r-orange-500 transition-all"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center reveal">
          <a 
            href={CONFIG.PUMP_FUN_URL} 
            className="inline-block bg-orange-600 text-black px-16 py-5 font-black text-xl hover:bg-white transition-all uppercase tracking-widest shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-105 skew-x-[-10deg] border border-orange-400"
          >
            <span className="skew-x-[10deg] inline-block">START MISSION</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowToBuy;
