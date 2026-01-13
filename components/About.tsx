
import React from 'react';
import { CONFIG } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative bg-transparent">
      <div className="container mx-auto px-4 reveal">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-12 text-white text-center drop-shadow-lg font-special">
            THE LEGEND OF <span className="text-orange-500">THE SHINOBI</span>
          </h2>
          
          <div className="bg-neutral-900/80 backdrop-blur-md rounded-lg p-8 md:p-12 border-l-4 border-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.1)] relative overflow-hidden">
             {/* Background watermark */}
             <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
                <svg width="400" height="400" viewBox="0 0 100 100" fill="#f97316"><circle cx="50" cy="50" r="40" /></svg>
             </div>

            <div className="space-y-8 text-lg text-slate-200 leading-relaxed font-medium">
              <p className="text-2xl font-bold text-center text-orange-400">
                "Dattebayo!"
              </p>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                 <div className="w-full md:w-1/2">
                    <img 
                      src="https://pbs.twimg.com/media/G-jDPofWIAAKS4d?format=jpg&name=900x900" 
                      alt="Naruto Legacy" 
                      className="w-full rounded-lg shadow-[0_0_30px_rgba(249,115,22,0.3)] border border-orange-500/30 hover:grayscale-0 transition-all duration-500"
                    />
                 </div>
                 <div className="w-full md:w-1/2 space-y-4">
                    <p>
                      <strong className="text-orange-500 text-xl">Naruto</strong> is more than just an anime; it is a global cultural phenomenon that defined a generation. First serialized in 1999 by Masashi Kishimoto, the story of the outcast orphan who dreamed of becoming Hokage touched millions of hearts worldwide.
                    </p>
                    <p>
                      With over <span className="text-white font-bold">250 million copies</span> sold and broadcast in over 80 countries, Naruto introduced the world to the Will of Fire. It taught us that hard work beats talent, that bonds are stronger than destiny, and that you should never give up on your dreams.
                    </p>
                 </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                 <div className="bg-black/60 p-6 rounded-sm border-t-2 border-orange-500 hover:bg-orange-900/20 transition-colors">
                    <h3 className="text-xl font-special text-orange-400 mb-2">The Hero</h3>
                    <p className="text-sm text-slate-400">
                      The Jinchūriki of the Nine-Tails who saved the world from eternal slumber.
                    </p>
                 </div>
                 <div className="bg-black/60 p-6 rounded-sm border-t-2 border-orange-500 hover:bg-orange-900/20 transition-colors">
                    <h3 className="text-xl font-special text-orange-400 mb-2">The Rival</h3>
                    <p className="text-sm text-slate-400">
                      Sasuke Uchiha. The shadow to Naruto's light. Their final battle is legendary.
                    </p>
                 </div>
                 <div className="bg-black/60 p-6 rounded-sm border-t-2 border-orange-500 hover:bg-orange-900/20 transition-colors">
                    <h3 className="text-xl font-special text-orange-400 mb-2">The Legacy</h3>
                    <p className="text-sm text-slate-400">
                      From the classic series to Shippuden and Boruto, the flame never dies.
                    </p>
                 </div>
              </div>

              <p className="text-center italic text-orange-200/80 font-bold text-lg pt-4">
                Now, the Seventh Hokage brings his ninja way to the blockchain as $NARUTO.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
