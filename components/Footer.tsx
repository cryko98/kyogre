
import React from 'react';
import { CONFIG } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-20 border-t border-red-900/30">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center gap-4">
            <img src={CONFIG.LOGO_URL} alt="Kyogre Small" className="w-12 h-12 rounded-full border border-red-600" />
            <span className="font-special text-3xl font-black tracking-tighter uppercase text-white">
              $KYOGRE
            </span>
          </div>

          <div className="flex gap-10 items-center">
            <a 
              href={CONFIG.X_COMMUNITY} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-red-600 transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            <a 
              href={CONFIG.PUMP_FUN_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-600 hover:text-white transition-all font-black text-xl uppercase tracking-widest"
            >
              PUMP
            </a>
          </div>

          <div className="max-w-xl text-slate-600 text-[10px] leading-relaxed uppercase tracking-wider">
            Disclaimer: $KYOGRE is a community-driven memecoin inspired by ancient legendary lore. 
            It has no intrinsic value. It is not an investment vehicle. Beware of high volatility in the abyss.
          </div>

          <div className="text-slate-700 font-special tracking-[0.5em] text-[10px] uppercase pt-10">
            &copy; 2025 THE KING OF THE SEA. POWERED BY PRIMAL FORCE.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
