
import React from 'react';
import { CONFIG } from '../constants';

const HowToBuy: React.FC = () => {
  const steps = [
    {
      title: "GET PHANTOM",
      description: "Download Phantom wallet. It's the cozy home for your future $FLUFFIN."
    },
    {
      title: "GET SOL",
      description: "Load up on SOL. You'll need it to swap for the fluffiest token on chain."
    },
    {
      title: "GO TO PUMP.FUN",
      description: "Head over to Pump.fun and find the $FLUFFIN page using our CA."
    },
    {
      title: "BECOME FLUFFY",
      description: "Swap SOL for $FLUFFIN. Welcome to the White Whale's extended family."
    }
  ];

  return (
    <section id="buy" className="py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-16 reveal">
          HOW TO <span className="text-cyan-400">ADOPT</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-group">
          {steps.map((step, index) => (
            <div key={index} className="reveal-child bg-blue-950/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 relative group hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <div className="text-6xl font-black text-cyan-500/10 absolute top-4 right-4 z-0 group-hover:text-cyan-500/20 transition-colors">
                {index + 1}
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 text-white uppercase">{step.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed font-semibold">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center reveal">
          <a 
            href={CONFIG.PUMP_FUN_URL} 
            className="inline-block bg-cyan-500 text-black px-12 py-5 font-black text-xl rounded-full hover:bg-cyan-400 transition-all uppercase tracking-widest shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-110 hover:shadow-[0_0_50px_rgba(34,211,238,0.6)]"
          >
            ADOPT ON PUMP.FUN
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowToBuy;
