
import React, { useState, useEffect } from 'react';
import { generateKyogreMeme } from '../services/gemini';
import { CONFIG, RANDOM_PROMPTS } from '../constants';

const MemeGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  const statusMessages = [
    "DESCENDING TO THE ABYSS...",
    "CHANNELING PRIMAL ENERGY...",
    "CALCULATING TECTONIC SHIFTS...",
    "FORGING OCEANIC VISUALS...",
    "STABILIZING THE SINGULARITY...",
    "EMERGING FROM THE DEPTHS..."
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      let i = 0;
      setStatus(statusMessages[0]);
      interval = setInterval(() => {
        i = (i + 1) % statusMessages.length;
        setStatus(statusMessages[i]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const imageUrl = await generateKyogreMeme(finalPrompt);
      setResult(imageUrl);
    } catch (err: any) {
      console.error("MemeForge Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = () => {
    const random = RANDOM_PROMPTS[Math.floor(Math.random() * RANDOM_PROMPTS.length)];
    setPrompt(random);
    handleGenerate(random);
  };

  return (
    <section id="meme" className="py-24 bg-black relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase italic">
              DEEP SEA <span className="text-red-600">FORGE</span>
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-red-900"></div>
              <p className="text-slate-500 uppercase text-[10px] tracking-[0.5em] font-bold">Protocol v2.5 Stable</p>
              <div className="h-[1px] w-12 bg-red-900"></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Input Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-950 p-6 border border-red-900/30 shadow-2xl">
                <label className="block text-[10px] uppercase font-black tracking-widest text-red-600 mb-4">Command Input</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your vision for the King..."
                  className="w-full h-32 bg-black border border-red-900/20 p-4 focus:border-red-600 outline-none text-white transition-all text-sm font-mono resize-none"
                />
                
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button 
                    onClick={() => handleGenerate()}
                    disabled={loading || !prompt.trim()}
                    className="col-span-1 bg-red-600 hover:bg-red-700 disabled:bg-slate-900 text-white font-black py-4 transition-all uppercase tracking-tighter text-sm flex items-center justify-center gap-2"
                  >
                    {loading ? "PROCESS..." : "EXECUTE"}
                  </button>
                  <button 
                    onClick={handleRandom}
                    disabled={loading}
                    className="col-span-1 bg-white hover:bg-red-500 text-black hover:text-white font-black py-4 transition-all uppercase tracking-tighter text-sm"
                  >
                    RANDOMIZE
                  </button>
                </div>
              </div>

              {/* Console Output */}
              <div className="bg-black border border-slate-900 p-4 font-mono text-[10px] text-slate-500 uppercase h-40 overflow-hidden relative">
                <div className="space-y-1">
                  <div className="text-green-900">&gt; INITIALIZING KYOGRE_META_ENGINE...</div>
                  <div className="text-green-900">&gt; ENVIRONMENT_VAR: {process.env.API_KEY ? "DETECTED" : "NULL"}</div>
                  <div className="text-green-900">&gt; SEEDED PROMPT DESCRIPTION LOADED</div>
                  {loading && <div className="text-red-600 animate-pulse">&gt; STATUS: {status}</div>}
                  {error && <div className="text-red-500">&gt; ERROR: {error}</div>}
                  {result && <div className="text-blue-500">&gt; SUCCESS: ASSET_RENDERED_OK</div>}
                  {!loading && !result && !error && <div className="animate-pulse">&gt; WAITING_FOR_USER_INPUT...</div>}
                </div>
                <div className="absolute bottom-2 right-2 text-[8px] opacity-20">SYSTEM_CORE_44.0</div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-7">
              <div className="relative aspect-square bg-slate-950 border border-red-900/40 overflow-hidden flex items-center justify-center shadow-[0_0_60px_rgba(239,68,68,0.05)]">
                {loading ? (
                  <div className="text-center z-20">
                    <div className="w-20 h-20 border-t-4 border-red-600 border-r-4 border-r-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="font-special text-red-600 uppercase tracking-[0.4em] text-xs animate-pulse">{status}</p>
                  </div>
                ) : result ? (
                  <div className="w-full h-full relative group">
                    <img src={result} alt="Generated Kyogre Art" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                       <button 
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = result;
                          link.download = `kyogre-${Date.now()}.png`;
                          link.click();
                        }}
                        className="bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 font-black text-xs uppercase tracking-widest transition-all shadow-2xl"
                      >
                        DOWNLOAD ARTIFACT
                      </button>
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center p-12 max-w-sm">
                    <div className="text-red-600 font-black text-4xl mb-4">!!</div>
                    <p className="text-slate-400 text-xs font-mono uppercase leading-relaxed mb-6">{error}</p>
                    <button 
                      onClick={() => handleGenerate()} 
                      className="text-red-600 underline text-[10px] font-black uppercase tracking-[0.2em] hover:text-white"
                    >
                      TRY_RE-SYNC_PROTOCOL
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-12 opacity-30 select-none group">
                    <img src={CONFIG.LOGO_URL} className="w-32 h-32 mx-auto mb-8 grayscale brightness-50 contrast-125 group-hover:grayscale-0 transition-all duration-500" alt="Ref" />
                    <p className="uppercase font-black text-[10px] tracking-[0.6em]">Awaiting Creation</p>
                  </div>
                )}
                
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600/30"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600/30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemeGenerator;
