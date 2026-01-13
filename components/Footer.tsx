
import React from 'react';
import { CONFIG } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-20 border-t-4 border-orange-600">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center gap-4">
            <img src={CONFIG.LOGO_URL} alt="Naruto Small" className="w-12 h-12 rounded-full border-2 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
            <span className="font-special text-3xl font-black tracking-tight uppercase text-white">
              $NARUTO
            </span>
          </div>

          <div className="flex gap-10 items-center">
            <a 
              href={CONFIG.X_COMMUNITY} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-orange-500 transition-colors"
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
              className="text-orange-500 hover:text-white transition-all font-black text-xl uppercase tracking-widest font-special"
            >
              PUMP
            </a>
          </div>

          <div className="max-w-xl text-neutral-600 text-[10px] leading-relaxed uppercase tracking-wider font-bold">
            Disclaimer: $NARUTO is a community tribute token. We are not affiliated with Masashi Kishimoto, Shueisha, or Pierrot. This is for fans, by fans.
          </div>

          <div className="text-orange-800 font-special tracking-[0.3em] text-[10px] uppercase pt-10">
            &copy; 2026 KONOHAGAKURE. WILL OF FIRE.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
