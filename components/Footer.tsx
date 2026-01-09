
import React from 'react';
import { CONFIG } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/80 py-20 border-t border-cyan-500/20 backdrop-blur-lg">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center gap-4">
            <img src={CONFIG.LOGO_URL} alt="Fluffin Small" className="w-12 h-12 rounded-full border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
            <span className="font-special text-3xl font-black tracking-tight uppercase text-white">
              $FLUFFIN
            </span>
          </div>

          <div className="flex gap-10 items-center">
            <a 
              href={CONFIG.X_COMMUNITY} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-cyan-400 transition-colors"
              aria-label="X Community"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            <a 
              href={CONFIG.PUMP_FUN_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-white transition-all font-black text-xl uppercase tracking-widest"
            >
              PUMP
            </a>
          </div>

          <div className="max-w-xl text-slate-500 text-[10px] leading-relaxed uppercase tracking-wider font-bold">
            Disclaimer: $FLUFFIN is a community memecoin created when TheWhiteWhaleV2 sent USDC to the wallet. It is for entertainment purposes only.
          </div>

          <div className="text-blue-500 font-special tracking-[0.5em] text-[10px] uppercase pt-10">
            &copy; 2026 FLUFFIN. STAY FLUFFY.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
