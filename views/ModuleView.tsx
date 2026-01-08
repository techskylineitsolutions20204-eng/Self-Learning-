
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { MODULES } from '../constants';
import { ChevronLeft, ChevronRight, CheckCircle, BookOpen } from 'lucide-react';

const ModuleView: React.FC<{ onComplete: (id: string) => void }> = ({ onComplete }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const module = MODULES.find(m => m.id === id);
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsRead(false);
  }, [id]);

  if (!module) return <div className="p-8 text-center">Module not found.</div>;

  const nextModule = MODULES.find(m => m.order === module.order + 1);
  const prevModule = MODULES.find(m => m.order === module.order - 1);

  const handleComplete = () => {
    onComplete(module.id);
    setIsRead(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-10">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to Dashboard
        </button>
        <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-400/10 px-3 py-1 rounded-full border border-indigo-400/20">
          Lesson {module.order} of {MODULES.length}
        </div>
      </div>

      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold text-white">{module.title}</h1>
        <p className="text-xl text-slate-400">{module.description}</p>
      </header>

      <article className="prose prose-invert prose-indigo max-w-none bg-slate-800/30 border border-slate-700 p-8 rounded-3xl">
        <div className="text-slate-300 leading-relaxed space-y-6">
          {/* Using simple div parsing for our internal format, would normally use Markdown */}
          <div className="markdown-content space-y-6">
            {module.content.split('\n').map((line, i) => {
              if (line.startsWith('##')) return <h2 key={i} className="text-2xl font-bold text-indigo-400 pt-4">{line.replace('##', '')}</h2>;
              if (line.startsWith('###')) return <h3 key={i} className="text-xl font-bold text-slate-200 pt-2">{line.replace('###', '')}</h3>;
              if (line.startsWith('-')) return <li key={i} className="ml-4 list-disc text-slate-400">{line.replace('-', '')}</li>;
              return <p key={i} className="text-slate-300">{line}</p>;
            })}
          </div>
        </div>
      </article>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 border-t border-slate-800">
        <div className="flex space-x-4">
          {prevModule && (
            <button 
              onClick={() => navigate(`/module/${prevModule.id}`)}
              className="flex items-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors font-semibold"
            >
              <ChevronLeft size={20} className="mr-2" />
              Previous
            </button>
          )}
        </div>

        {!isRead ? (
          <button 
            onClick={handleComplete}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20"
          >
            Mark as Complete
            <CheckCircle size={20} className="ml-2" />
          </button>
        ) : (
          <div className="flex space-x-4 w-full sm:w-auto">
            {nextModule ? (
              <button 
                onClick={() => navigate(`/module/${nextModule.id}`)}
                className="w-full flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all"
              >
                Next Module
                <ChevronRight size={20} className="ml-2" />
              </button>
            ) : (
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full flex items-center justify-center px-8 py-4 bg-slate-700 text-white rounded-xl font-bold transition-all"
              >
                Finish Journey
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleView;
