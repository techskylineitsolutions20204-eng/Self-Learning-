
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  RotateCcw, 
  ChevronLeft, 
  Copy, 
  Check, 
  ExternalLink,
  Info,
  Sparkles,
  Zap,
  Loader2
} from 'lucide-react';
import { LABS } from '../constants';
import { gemini } from '../geminiService';

const LabView: React.FC<{ onComplete: (id: string) => void }> = ({ onComplete }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lab = LABS.find(l => l.id === id);

  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState('');

  useEffect(() => {
    if (lab) {
      setPrompt(lab.initialPrompt);
      setSystemPrompt(lab.systemPrompt);
      setResult('');
    }
  }, [lab]);

  if (!lab) return <div className="p-8 text-center">Lab not found.</div>;

  const handleRun = async () => {
    setIsLoading(true);
    const response = await gemini.runPrompt(systemPrompt, prompt);
    setResult(response);
    setIsLoading(false);
    onComplete(lab.id);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* Lab Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center">
              {lab.title}
              <span className="ml-3 px-2 py-0.5 bg-pink-500/10 text-pink-400 text-[10px] font-bold uppercase rounded border border-pink-500/20">Lab Mode</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => window.open('https://aistudio.google.com/', '_blank')}
            className="hidden md:flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium border border-slate-700 transition-all"
          >
            Open in AI Studio
            <ExternalLink size={14} className="ml-2" />
          </button>
          <button 
            onClick={handleRun}
            disabled={isLoading}
            className="flex items-center px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all"
          >
            {isLoading ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Play size={16} className="mr-2" />}
            Run Prompt
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Editor */}
        <div className="w-full lg:w-1/2 flex flex-col border-r border-slate-800 bg-slate-900/50">
          <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Zap size={14} className="mr-2 text-indigo-400" />
              Prompt Template
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={copyToClipboard}
                className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-700 rounded transition-all"
                title="Copy for AI Studio"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
              <button 
                onClick={() => setPrompt(lab.initialPrompt)}
                className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-700 rounded transition-all"
                title="Reset"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
             <section className="space-y-3">
               <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                 <Sparkles size={14} className="mr-2" /> System Instruction
               </label>
               <input 
                 className="w-full p-3 bg-slate-950/50 border border-slate-800 rounded-xl text-indigo-400 font-medium focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                 value={systemPrompt}
                 onChange={(e) => setSystemPrompt(e.target.value)}
               />
             </section>

             <section className="flex-1 flex flex-col space-y-3">
               <label className="text-xs font-bold text-slate-500 uppercase">User Prompt</label>
               <textarea 
                 className="flex-1 w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-slate-300 font-mono text-sm leading-relaxed resize-none focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                 placeholder="Type your prompt here..."
                 value={prompt}
                 onChange={(e) => setPrompt(e.target.value)}
               />
             </section>

             <section className="p-4 bg-indigo-600/5 border border-indigo-600/10 rounded-2xl space-y-3">
                <h4 className="text-sm font-bold text-indigo-400 flex items-center uppercase tracking-wide">
                  <Info size={14} className="mr-2" /> Learning Challenges
                </h4>
                <ul className="space-y-2">
                  {lab.challenges.map((c, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start">
                      <div className="w-1 h-1 bg-indigo-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      {c}
                    </li>
                  ))}
                </ul>
             </section>
          </div>
        </div>

        {/* Right Side: Output */}
        <div className="w-full lg:w-1/2 flex flex-col bg-slate-950 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Output</h3>
            {isLoading && (
              <div className="flex items-center text-xs text-indigo-400 animate-pulse font-bold">
                Generating response...
              </div>
            )}
          </div>
          
          <div className={`flex-1 overflow-y-auto bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6 transition-all ${!result && !isLoading ? 'flex items-center justify-center text-center' : ''}`}>
            {isLoading ? (
              <div className="space-y-4 w-full">
                <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-slate-800 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse"></div>
              </div>
            ) : result ? (
              <div className="text-slate-300 whitespace-pre-wrap leading-relaxed font-sans prose prose-invert max-w-none">
                {result}
              </div>
            ) : (
              <div className="text-slate-600 space-y-2">
                <div className="mx-auto w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Play size={20} />
                </div>
                <p className="font-medium">No output yet.</p>
                <p className="text-sm max-w-xs">Run your prompt to see the AI generate a response based on your instructions.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabView;
