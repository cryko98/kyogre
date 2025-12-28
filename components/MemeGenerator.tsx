
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
    "DIVING TO THE ABYSS...",
    "CONCENTRATING WATER PRESSURE...",
    "STIRRING THE TECTONIC PLATES...",
    "FORGING OCEANIC ARTIFACTS...",
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
      }, 2500);
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
      console.error("Meme Generator UI Error:", err);
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
    <section id="meme" className="py-24 bg-black relative border-y border-red-900/10">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase italic">
              SEA KING <span className="text-red-600 text-shadow-glow">FORGE</span>
            </h2>
            <p className="text-slate-500 uppercase text-[10px] tracking-[0.6em] font-bold">LEGENDARY ARTIFACT GENERATOR v2.0</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-950 p-6 border border-red-900/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
                <label className="block text-[10px] uppercase font-black tracking-widest text-red-600 mb-4">Command Terminal</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g. Kyogre awakening in a city of diamonds..."
                  className="w-full h-32 bg-black border border-red-900/20 p-4 focus:border-red-600 outline-none text-white transition-all text-sm font-mono resize-none placeholder:text-slate-800"
                />
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button 
                    onClick={() => handleGenerate()}
                    disabled={loading || !prompt.trim()}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-slate-900 text-white font-black py-4 transition-all uppercase tracking-tighter text-sm flex items-center justify-center gap-2"
                  >
                    {loading ? "PROCESSING..." : "EXECUTE"}
                  </button>
                  <button 
                    onClick={handleRandom}
                    disabled={loading}
                    className="bg-white hover:bg-red-500 text-black hover:text-white font-black py-4 transition-all uppercase tracking-tighter text-sm"
                  >
                    RANDOMIZE
                  </button>
                </div>
              </div>

              {/* Console Logs */}
              <div className="bg-black border border-slate-900 p-4 font-mono text-[10px] text-slate-500 uppercase h-44 overflow-hidden relative">
                <div className="space-y-1">
                  <div className="text-green-900">&gt; INITIALIZING KYOGRE_META_ENGINE...</div>
                  <div className="text-green-900">&gt; CONNECTION: ESTABLISHED_ENCRYPTED</div>
                  <div className="text-green-900">&gt; SEEDED ASSET DESCRIPTION: OK</div>
                  {loading && <div className="text-red-600 animate-pulse">&gt; STATUS: {status}</div>}
                  {error && <div className="text-red-500">&gt; FATAL: {error}</div>}
                  {result && <div className="text-blue-500">&gt; SUCCESS: ASSET_SYNCED_COMPLETED</div>}
                  {!loading && !result && !error && <div className="animate-pulse">&gt; WAITING_FOR_OPERATOR_COMMAND...</div>}
                </div>
              </div>
            </div>

            {/* Display Panel */}
            <div className="lg:col-span-7">
              <div className="relative aspect-square bg-slate-950 border border-red-900/40 overflow-hidden flex items-center justify-center shadow-[0_0_80px_rgba(239,68,68,0.08)] group">
                {loading ? (
                  <div className="text-center z-20">
                    <div className="w-24 h-24 border-t-4 border-red-600 border-r-4 border-r-transparent rounded-full animate-spin mx-auto mb-8"></div>
                    <p className="font-special text-red-600 uppercase tracking-[0.5em] text-xs animate-pulse">{status}</p>
                  </div>
                ) : result ? (
                  <div className="w-full h-full relative group">
                    <img src={result} alt="Kyogre Artifact" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-12">
                       <button 
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = result;
                          link.download = `kyogre-artifact-${Date.now()}.png`;
                          link.click();
                        }}
                        className="bg-white text-black hover:bg-red-600 hover:text-white px-8 py-4 font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl"
                      >
                        EXTRACT ARTIFACT
                      </button>
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center p-12 max-w-sm">
                    <div className="text-red-600 font-black text-6xl mb-6">!!</div>
                    <p className="text-slate-500 text-xs font-mono uppercase leading-relaxed mb-8">{error}</p>
                    <button 
                      onClick={() => handleGenerate()} 
                      className="text-red-600 underline text-[10px] font-black uppercase tracking-widest hover:text-white"
                    >
                      RE-ENGAGE PROTOCOL
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-12 opacity-30 select-none group">
                    <img src={CONFIG.LOGO_URL} className="w-40 h-40 mx-auto mb-10 grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="Artifact Frame" />
                    <p className="uppercase font-black text-[10px] tracking-[0.8em]">Awaiting Creation</p>
                  </div>
                )}
                
                {/* Visual Anchors */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-red-600/40"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-red-600/40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemeGenerator;
