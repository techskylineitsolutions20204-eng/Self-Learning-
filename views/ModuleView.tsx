
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MODULES } from '../constants';
import { gemini } from '../geminiService';
import { QuizQuestion } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Volume2, 
  Sparkles, 
  BrainCircuit, 
  X,
  Loader2,
  Check
} from 'lucide-react';

const ModuleView: React.FC<{ onComplete: (id: string, skills: Record<string, number>) => void }> = ({ onComplete }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const module = MODULES.find(m => m.id === id);

  const [isRead, setIsRead] = useState(false);
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsRead(false);
    setSummary('');
    setQuiz(null);
    setQuizMode(false);
  }, [id]);

  if (!module) return <div className="p-8 text-center">Module not found.</div>;

  const nextModule = MODULES.find(m => m.order === module.order + 1);
  const prevModule = MODULES.find(m => m.order === module.order - 1);

  const handleComplete = () => {
    const skillUpdates = module.skills.reduce((acc, skill) => ({ ...acc, [skill]: 20 }), {});
    onComplete(module.id, skillUpdates);
    setIsRead(true);
  };

  const generateSummary = async () => {
    setLoadingSummary(true);
    const text = await gemini.generateSummary(module.content);
    setSummary(text);
    setLoadingSummary(false);
  };

  const startQuiz = async () => {
    setLoadingQuiz(true);
    const questions = await gemini.generateQuiz(module.content);
    setQuiz(questions);
    setQuizMode(true);
    setLoadingQuiz(false);
    setScore(0);
    setCurrentQuestion(0);
  };

  const handleAnswer = (idx: number) => {
    if (quiz && idx === quiz[currentQuestion].correctAnswer) {
      setScore(s => s + 1);
    }
    if (quiz && currentQuestion < quiz.length - 1) {
      setCurrentQuestion(q => q + 1);
    } else {
      setQuizMode(false);
      if (score >= 2) handleComplete();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8 pb-32">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/dashboard')} className="flex items-center text-slate-400 hover:text-white transition-colors">
          <ChevronLeft size={18} className="mr-1" />
          Curriculum
        </button>
        <div className="flex gap-2">
          <button 
            onClick={() => gemini.speak(module.content)}
            className="p-2 bg-slate-800 text-slate-400 hover:text-indigo-400 rounded-lg transition-all"
            title="Read Aloud"
          >
            <Volume2 size={18} />
          </button>
          <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-400/10 px-3 py-2 rounded-lg border border-indigo-400/20">
            Step {module.order}
          </div>
        </div>
      </div>

      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold text-white">{module.title}</h1>
        <div className="flex flex-wrap gap-2">
          {module.skills.map(s => <span key={s} className="px-2 py-1 bg-indigo-600/20 text-indigo-400 rounded-md text-[10px] font-bold uppercase border border-indigo-600/30">{s}</span>)}
        </div>
      </header>

      {/* AI Assistant Buttons */}
      <div className="flex gap-4">
        <button 
          onClick={generateSummary}
          disabled={loadingSummary}
          className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-sm font-semibold transition-all disabled:opacity-50"
        >
          {loadingSummary ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} className="text-indigo-400" />}
          AI Summary
        </button>
        <button 
          onClick={startQuiz}
          disabled={loadingQuiz}
          className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-sm font-semibold transition-all disabled:opacity-50"
        >
          {loadingQuiz ? <Loader2 size={16} className="animate-spin" /> : <BrainCircuit size={16} className="text-pink-400" />}
          Assess Mastery
        </button>
      </div>

      {summary && (
        <div className="p-6 bg-indigo-600/10 border border-indigo-600/30 rounded-3xl animate-in slide-in-from-top-4">
           <div className="flex justify-between mb-4">
             <h4 className="text-sm font-bold flex items-center"><Sparkles size={16} className="mr-2 text-indigo-400" /> AI Takeaways</h4>
             <button onClick={() => setSummary('')}><X size={14} /></button>
           </div>
           <p className="text-sm text-slate-300 leading-relaxed italic">{summary}</p>
        </div>
      )}

      {/* Quiz Modal */}
      {quizMode && quiz && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span>Question {currentQuestion + 1} of {quiz.length}</span>
              <span>Score: {score}</span>
            </div>
            <h3 className="text-xl font-bold text-white leading-tight">{quiz[currentQuestion].question}</h3>
            <div className="space-y-3">
              {quiz[currentQuestion].options.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full p-4 text-left bg-slate-800 hover:bg-indigo-600 hover:text-white border border-slate-700 rounded-xl transition-all text-sm font-medium"
                >
                  {opt}
                </button>
              ))}
            </div>
            <button onClick={() => setQuizMode(false)} className="w-full text-center text-xs text-slate-500 hover:text-white py-2">Cancel Quiz</button>
          </div>
        </div>
      )}

      <article className="prose prose-invert prose-indigo max-w-none bg-slate-800/30 border border-slate-700 p-8 rounded-3xl shadow-inner">
        <div className="text-slate-300 leading-relaxed space-y-6">
          <div className="markdown-content space-y-6">
            {module.content.split('\n').map((line, i) => {
              if (line.trim().startsWith('##')) return <h2 key={i} className="text-2xl font-bold text-white pt-4">{line.replace('##', '')}</h2>;
              if (line.trim().startsWith('###')) return <h3 key={i} className="text-xl font-bold text-indigo-400 pt-2">{line.replace('###', '')}</h3>;
              if (line.trim().startsWith('-')) return <li key={i} className="ml-4 list-disc text-slate-400">{line.replace('-', '')}</li>;
              return line.trim() ? <p key={i} className="text-slate-300">{line}</p> : null;
            })}
          </div>
        </div>
      </article>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 border-t border-slate-800">
        <div className="flex space-x-4">
          {prevModule && (
            <button onClick={() => navigate(`/module/${prevModule.id}`)} className="px-4 py-2 text-slate-400 hover:text-white flex items-center">
              <ChevronLeft size={18} className="mr-1" /> Previous
            </button>
          )}
        </div>

        {!isRead ? (
          <button 
            onClick={handleComplete}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20"
          >
            Mark as Understood
            <CheckCircle size={20} className="ml-2" />
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-emerald-500 font-bold flex items-center text-sm"><Check size={18} className="mr-1"/> Mastery Verified</span>
            {nextModule && (
              <button 
                onClick={() => navigate(`/module/${nextModule.id}`)}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold"
              >
                Next Step
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleView;
