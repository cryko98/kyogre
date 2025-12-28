
import React, { useState, useEffect } from 'react';
import { generateKyogreMeme } from '../services/gemini';
import { CONFIG, RANDOM_PROMPTS } from '../constants';

// Deklaráljuk az aistudio globális változókat a TypeScript-nek
// Fix: A rendszer már tartalmazhat egy AIStudio típust, ezért azt egészítjük ki és a Window interfészen is a helyes típust és módosítót használjuk.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    readonly aistudio: AIStudio;
  }
}

const MemeGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsKey, setNeedsKey] = useState(false);

  // Ellenőrizzük az indításkor, hogy van-e már kulcs választva
  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setNeedsKey(!hasKey);
      }
    };
    checkKey();
  }, []);

  const handleAuthorize = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setNeedsKey(false); // Feltételezzük a sikert a dokumentáció szerint
      setError(null);
    }
  };

  const startGeneration = async (overridePrompt?: string) => {
    const finalPrompt = overridePrompt || prompt;
    if (!finalPrompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const imageUrl = await generateKyogreMeme(finalPrompt);
      setResult(imageUrl);
    } catch (err: any) {
      if (err.message.includes("AUTH_REQUIRED")) {
        setNeedsKey(true);
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="meme" className="py-20 bg-black border-y border-red-900/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase italic tracking-tighter">
            KYOGRE <span className="text-red-600">PRIMAL</span> FORGE
          </h2>
          <p className="text-slate-500 text-[10px] tracking-[0.4em] uppercase mb-10">Gemini 3 Pro Image Engine Enabled</p>
          
          <div className="bg-slate-950 p-6 md:p-10 border border-red-900/30 shadow-2xl mb-10 relative">
            {/* Kulcs hiba esetén megjelenő overlay */}
            {needsKey && (
              <div className="absolute inset-0 z-30 bg-black/90 flex flex-col items-center justify-center p-6 border border-red-600">
                <div className="text-red-600 font-black text-2xl mb-4">CONNECTION OFFLINE</div>
                <p className="text-slate-400 text-sm mb-8 max-w-sm">Az API kulcsod nem érhető el vagy érvénytelen. Kattints az alábbi gombra az engedélyezéshez.</p>
                <button 
                  onClick={handleAuthorize}
                  className="bg-white text-black font-black px-10 py-4 uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  AUTHORIZE PRIMAL POWER
                </button>
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="mt-4 text-[10px] text-slate-600 underline">Billing documentation</a>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Kyogre rising from a pool of lava with Solana logos..."
                className="flex-1 bg-black border border-red-900/40 p-4 text-white outline-none focus:border-red-600 font-mono text-sm"
              />
              <div className="flex gap-2">
                <button 
                  onClick={() => startGeneration()}
                  disabled={loading || needsKey}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black px-8 py-4 uppercase tracking-tighter transition-all whitespace-nowrap"
                >
                  {loading ? 'FORGING...' : 'EXECUTE'}
                </button>
              </div>
            </div>

            <div className="aspect-square w-full max-w-[500px] mx-auto bg-black border border-red-900/20 flex items-center justify-center relative overflow-hidden group">
              {loading ? (
                <div className="text-center z-20">
                  <div className="w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-red-500 font-black text-xs uppercase tracking-[0.3em] animate-pulse">Consulting the Ancients...</p>
                </div>
              ) : result ? (
                <div className="w-full h-full relative">
                  <img src={result} alt="Generated Kyogre" className="w-full h-full object-cover animate-in fade-in duration-1000" />
                  <a 
                    href={result} 
                    download={`kyogre-${Date.now()}.png`}
                    className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                  >
                    <span className="bg-white text-black px-8 py-3 font-black uppercase text-xs tracking-widest">DOWNLOAD ARTIFACT</span>
                  </a>
                </div>
              ) : error ? (
                <div className="p-10 text-center">
                  <div className="text-red-600 font-black text-xl mb-4">SYSTEM ERROR</div>
                  <p className="text-slate-500 text-[10px] uppercase font-mono leading-relaxed">{error}</p>
                </div>
              ) : (
                <div className="text-center opacity-30 group-hover:opacity-50 transition-opacity">
                  <img src={CONFIG.LOGO_URL} className="w-32 h-32 mx-auto mb-6 grayscale" alt="Placeholder" />
                  <p className="text-[10px] uppercase font-black tracking-[0.6em]">Core Ready</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
             {RANDOM_PROMPTS.slice(0, 3).map((p, i) => (
               <button 
                 key={i} 
                 onClick={() => { setPrompt(p); startGeneration(p); }}
                 className="text-[9px] uppercase font-bold text-slate-700 hover:text-red-500 transition-colors border-b border-transparent hover:border-red-500 pb-1"
               >
                 Scenario {i+1}
               </button>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemeGenerator;
