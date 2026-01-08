
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
  Loader2,
  ShieldCheck,
  Award,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { LABS } from '../constants';
import { gemini } from '../geminiService';
import { EvaluationResult } from '../types';

const LabView: React.FC<{ onComplete: (id: string) => void, onEvaluation: (id: string, skills: Record<string, number>) => void }> = ({ onComplete, onEvaluation }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lab = LABS.find(l => l.id === id);

  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState('');
  
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    if (lab) {
      setPrompt(lab.initialPrompt);
      setSystemPrompt(lab.systemPrompt);
      setResult('');
      setEvaluation(null);
    }
  }, [lab]);

  if (!lab) return <div className="p-8 text-center">Lab not found.</div>;

  const handleRun = async () => {
    setIsLoading(true);
    setEvaluation(null);
    const response = await gemini.runPrompt(systemPrompt, prompt);
    setResult(response);
    setIsLoading(false);
    onComplete(lab.id);
  };

  const handleEvaluate = async () => {
    setEvaluating(true);
    try {
      const evalResult = await gemini.evaluateSubmission(prompt, result);
      setEvaluation(evalResult);
      if (evalResult.score >= 70) {
        onEvaluation(lab.id, { 'Prompt Design': 15, 'Agentic Logic': 10 });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
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
              <span className="ml-3 px-2 py-0.5 bg-pink-500/10 text-pink-400 text-[10px] font-bold uppercase rounded border border-pink-500/20">Evaluation Mode</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => window.open('https://aistudio.google.com/', '_blank')}
            className="hidden md:flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium border border-slate-700 transition-all"
          >
            Google Studio
            <ExternalLink size={14} className="ml-2" />
          </button>
          <button 
            onClick={handleRun}
            disabled={isLoading}
            className="flex items-center px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all"
          >
            {isLoading ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Play size={16} className="mr-2" />}
            Execute
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Editor */}
        <div className="w-full lg:w-1/2 flex flex-col border-r border-slate-800 bg-slate-900/50">
          <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Zap size={14} className="mr-2 text-indigo-400" />
              Editor Workspace
            </div>
            <div className="flex space-x-2">
              <button onClick={copyToClipboard} className="p-1.5 text-slate-500 hover:text-white rounded transition-all">
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
              <button onClick={() => setPrompt(lab.initialPrompt)} className="p-1.5 text-slate-500 hover:text-white rounded transition-all">
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
             <section className="space-y-3">
               <label className="text-xs font-bold text-slate-500 uppercase flex items-center">System Instruction</label>
               <input 
                 className="w-full p-3 bg-slate-950/50 border border-slate-800 rounded-xl text-indigo-400 font-medium focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                 value={systemPrompt}
                 onChange={(e) => setSystemPrompt(e.target.value)}
               />
             </section>

             <section className="flex-1 flex flex-col space-y-3">
               <label className="text-xs font-bold text-slate-500 uppercase">Input Prompt</label>
               <textarea 
                 className="flex-1 w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-slate-300 font-mono text-sm leading-relaxed resize-none focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                 value={prompt}
                 onChange={(e) => setPrompt(e.target.value)}
               />
             </section>

             <section className="p-4 bg-indigo-600/5 border border-indigo-600/10 rounded-2xl space-y-3">
                <h4 className="text-sm font-bold text-indigo-400 flex items-center uppercase tracking-wide">
                  <Info size={14} className="mr-2" /> Challenges
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

        {/* Right Side: Output & Evaluation */}
        <div className="w-full lg:w-1/2 flex flex-col bg-slate-950 overflow-hidden relative">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Execution Response</h3>
             {result && !evaluation && (
               <button 
                onClick={handleEvaluate}
                disabled={evaluating}
                className="px-3 py-1 bg-emerald-600/10 text-emerald-500 text-[10px] font-bold uppercase rounded-lg border border-emerald-500/30 flex items-center gap-1 hover:bg-emerald-600 hover:text-white transition-all"
               >
                 {evaluating ? <Loader2 size={12} className="animate-spin" /> : <ShieldCheck size={12} />}
                 Run Quality Assessment
               </button>
             )}
          </div>
          
          <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
            {/* Main Result */}
            <div className={`p-6 rounded-2xl bg-slate-900/50 border border-slate-800 transition-all ${!result ? 'flex items-center justify-center min-h-[200px]' : ''}`}>
              {isLoading ? (
                <div className="space-y-4 w-full">
                  <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-slate-800 rounded w-5/6 animate-pulse"></div>
                </div>
              ) : result ? (
                <div className="text-slate-300 whitespace-pre-wrap leading-relaxed font-sans text-sm">
                  {result}
                </div>
              ) : (
                <div className="text-center space-y-2">
                   <Play size={32} className="mx-auto text-slate-700" />
                   <p className="text-slate-500 text-sm">Execute to see output</p>
                </div>
              )}
            </div>

            {/* Evaluation Results */}
            {evaluation && (
               <div className="space-y-4 animate-in slide-in-from-right-4">
                  <div className="flex items-center justify-between">
                     <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                        <Award size={18} /> Skill Assessment Result
                     </h4>
                     <div className={`px-3 py-1 rounded-full font-black text-xl ${evaluation.score >= 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {evaluation.score}
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-4 bg-emerald-900/10 border border-emerald-900/30 rounded-2xl">
                        <p className="text-[10px] font-bold text-emerald-500 uppercase mb-2">Strengths</p>
                        <ul className="space-y-1">
                           {evaluation.strengths.map((s,i) => <li key={i} className="text-xs text-slate-300 flex gap-2"><span>•</span> {s}</li>)}
                        </ul>
                     </div>
                     <div className="p-4 bg-indigo-900/10 border border-indigo-900/30 rounded-2xl">
                        <p className="text-[10px] font-bold text-indigo-400 uppercase mb-2">Improvements</p>
                        <ul className="space-y-1">
                           {evaluation.improvements.map((s,i) => <li key={i} className="text-xs text-slate-300 flex gap-2"><span>•</span> {s}</li>)}
                        </ul>
                     </div>
                  </div>
                  
                  <div className="p-4 bg-slate-900 border border-slate-700 rounded-2xl">
                     <p className="text-xs text-slate-400 italic">"{evaluation.feedback}"</p>
                  </div>
                  
                  {evaluation.score >= 70 && (
                    <div className="flex items-center gap-3 p-4 bg-emerald-500 text-white rounded-2xl shadow-xl shadow-emerald-500/20">
                       <CheckCircle size={24} />
                       <div>
                          <p className="text-xs font-bold">Concept Mastered!</p>
                          <p className="text-[10px] opacity-80">Skill points have been added to your profile.</p>
                       </div>
                    </div>
                  )}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabView;
