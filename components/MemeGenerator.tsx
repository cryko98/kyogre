
import React, { useState, useEffect } from 'react';
import { generateKyogreMeme } from '../services/gemini';
import { CONFIG, RANDOM_PROMPTS } from '../constants';

const MemeGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [userApiKey, setUserApiKey] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showKeyInput, setShowKeyInput] = useState(true);

  // Load saved API key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('KYOGRE_API_KEY');
    if (savedKey) {
      setUserApiKey(savedKey);
      setShowKeyInput(false);
    }
  }, []);

  const saveKey = () => {
    if (userApiKey.trim()) {
      localStorage.setItem('KYOGRE_API_KEY', userApiKey.trim());
      setShowKeyInput(false);
      setError(null);
    } else {
      setError("Please enter a valid API key.");
    }
  };

  const startGeneration = async (overridePrompt?: string) => {
    const finalPrompt = (overridePrompt || prompt).trim();
    if (!finalPrompt) return;
    
    if (!userApiKey.trim()) {
      setError("AUTHORIZATION REQUIRED: Please enter your Gemini API key.");
      setShowKeyInput(true);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const imageUrl = await generateKyogreMeme(finalPrompt, userApiKey.trim());
      setResult(imageUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = () => {
    const random = RANDOM_PROMPTS[Math.floor(Math.random() * RANDOM_PROMPTS.length)];
    setPrompt(random);
    startGeneration(random);
  };

  return (
    <section id="meme" className="py-20 bg-black border-y border-red-900/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase italic tracking-tighter">
            KYOGRE <span className="text-red-600">PRIMAL</span> FORGE
          </h2>
          <p className="text-slate-500 text-[10px] tracking-[0.4em] uppercase mb-12">Experimental Meme Engine</p>
          
          <div className="bg-slate-950 p-6 md:p-10 border border-red-900/30 shadow-2xl mb-10">
            {/* API Key Management UI */}
            <div className="mb-10 p-6 border border-red-600/20 bg-red-950/5 text-left">
              <div className="flex justify-between items-center mb-4">
                <label className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">Authorized Access (Gemini API Key)</label>
                {!showKeyInput && (
                  <button 
                    onClick={() => setShowKeyInput(true)}
                    className="text-[10px] text-white underline underline-offset-4 hover:text-red-500 transition-colors uppercase font-bold"
                  >
                    Change Key
                  </button>
                )}
              </div>
              
              {showKeyInput ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="password"
                    value={userApiKey}
                    onChange={(e) => setUserApiKey(e.target.value)}
                    placeholder="Enter your API Key here..."
                    className="flex-1 bg-black border border-red-900/50 p-3 text-white text-xs outline-none focus:border-red-600 font-mono"
                  />
                  <button 
                    onClick={saveKey}
                    className="bg-white text-black px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
                  >
                    SAVE KEY
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-black border border-green-900/30 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest">Access Link Established (Key Hidden)</span>
                </div>
              )}
              <p className="mt-3 text-[9px] text-slate-600 uppercase">
                Your key is stored locally in your browser. It is never sent to our servers.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Kyogre holding a golden Solana coin..."
                className="flex-1 bg-black border border-red-900/40 p-4 text-white outline-none focus:border-red-600 font-mono text-sm"
              />
              <div className="flex gap-2">
                <button 
                  onClick={() => startGeneration()}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-800 text-white font-black px-8 py-4 uppercase tracking-tighter transition-all"
                >
                  {loading ? 'FORGING...' : 'GENERATE'}
                </button>
                <button 
                  onClick={handleRandom}
                  disabled={loading}
                  className="bg-white text-black hover:bg-red-500 hover:text-white px-6 py-4 font-black transition-all"
                  title="Random Idea"
                >
                  🎲
                </button>
              </div>
            </div>

            <div className="aspect-square w-full max-w-[500px] mx-auto bg-black border border-red-900/20 flex items-center justify-center relative overflow-hidden group">
              {loading ? (
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-red-500 font-black text-xs uppercase tracking-widest animate-pulse">Summoning the King...</p>
                </div>
              ) : result ? (
                <div className="w-full h-full relative">
                  <img src={result} alt="Generated Kyogre" className="w-full h-full object-cover" />
                  <a 
                    href={result} 
                    download={`kyogre-meme-${Date.now()}.png`}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <span className="bg-white text-black px-8 py-3 font-black uppercase text-xs tracking-widest">Download Image</span>
                  </a>
                </div>
              ) : error ? (
                <div className="p-10 text-center">
                  <div className="text-red-600 font-black text-xl mb-4 uppercase tracking-tighter italic">FORGE ERROR</div>
                  <p className="text-slate-500 text-[11px] uppercase font-mono leading-relaxed max-w-xs mx-auto">{error}</p>
                </div>
              ) : (
                <div className="text-center opacity-20 group-hover:opacity-40 transition-opacity">
                  <img src={CONFIG.LOGO_URL} className="w-24 h-24 mx-auto mb-4 grayscale" alt="Kyogre Placeholder" />
                  <p className="text-[10px] uppercase font-black tracking-[0.4em]">Engine Standby</p>
                </div>
              )}
            </div>
          </div>
          
          <p className="text-slate-600 text-[10px] uppercase tracking-widest font-bold">
            Powered by Gemini 2.5 Flash • Client-Side Execution
          </p>
        </div>
      </div>
    </section>
  );
};

export default MemeGenerator;
