
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  BarChart3, 
  Flame, 
  Clock, 
  Trophy,
  BookOpen,
  ChevronRight,
  FlaskConical,
  Award,
  Zap
} from 'lucide-react';
import { UserProgress } from '../types';
import { MODULES, LABS, INTERNSHIP_ROADMAP, CORE_SKILLS } from '../constants';

const Dashboard: React.FC<{ progress: UserProgress }> = ({ progress }) => {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {progress.role === 'student' ? 'Scholar' : 'Architect'}!
          </h2>
          <p className="text-slate-400">Your AI mastery journey is {Math.round((progress.completedModules.length / MODULES.length) * 100)}% complete.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge icon={Flame} color="orange" text="3 Day Streak" />
          <Badge icon={Trophy} color="indigo" text={`${progress.xp} XP`} />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Radar Chart */}
        <div className="lg:col-span-1 bg-slate-800/40 border border-slate-700 rounded-3xl p-6 flex flex-col items-center">
          <h3 className="text-sm font-bold text-slate-300 mb-6 flex items-center">
            <Zap size={16} className="mr-2 text-indigo-400" /> Skill Competency Radar
          </h3>
          <SkillRadar skills={progress.skills} />
        </div>

        {/* Career Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-indigo-600 rounded-3xl p-8 relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-bold">Recommended for You</h3>
              <p className="text-indigo-100 max-w-md">
                {progress.role === 'student' 
                  ? "Finish the 'Prompt Engineering' lab to unlock internship applications."
                  : "We recommend 'AI Agents' for your executive strategy roadmap."}
              </p>
              <button 
                onClick={() => navigate('/lab/lab-prompt')}
                className="px-6 py-2 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:scale-105 transition-all"
              >
                Go to Lab
              </button>
            </div>
            <Zap className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 rotate-12 group-hover:rotate-45 transition-transform" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-6 bg-slate-800/40 border border-slate-700 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Weekly Goal</p>
                  <p className="text-sm font-semibold">Complete 2 Labs</p>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-emerald-500 flex items-center justify-center text-[10px]">
                  50%
                </div>
             </div>
             <div className="p-6 bg-slate-800/40 border border-slate-700 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Career Status</p>
                  <p className="text-sm font-semibold">Tier 1: Explorer</p>
                </div>
                <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
                  <Award size={20} />
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Curated Path */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center">
            <BookOpen className="mr-2 text-indigo-400" size={20} /> Curriculum
          </h3>
          <div className="space-y-3">
            {MODULES.map((mod) => (
              <div 
                key={mod.id} 
                onClick={() => navigate(`/module/${mod.id}`)}
                className="group flex items-center p-4 bg-slate-800/40 hover:bg-slate-700/50 border border-slate-700 rounded-2xl cursor-pointer transition-all"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${progress.completedModules.includes(mod.id) ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}>
                  {progress.completedModules.includes(mod.id) ? <CheckCircle size={20} /> : <Circle size={20} />}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-bold text-slate-200">{mod.title}</h4>
                  <div className="flex gap-2 mt-1">
                    {mod.skills.map(s => <span key={s} className="text-[8px] bg-slate-700 px-1.5 py-0.5 rounded text-slate-400 font-bold">{s}</span>)}
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Mock */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center text-pink-400">
             <Trophy className="mr-2" size={20} /> Global Leaderboard
          </h3>
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden">
             {[
               { name: 'AI_Master_22', xp: '14,200', rank: 1, self: false },
               { name: 'You (Student)', xp: progress.xp.toLocaleString(), rank: 142, self: true },
               { name: 'CyberDoc', xp: '8,900', rank: 3, self: false }
             ].sort((a,b) => a.rank - b.rank).map((u, i) => (
               <div key={i} className={`flex items-center justify-between p-4 ${u.self ? 'bg-indigo-600/10 border-l-4 border-indigo-600' : 'border-b border-slate-700 last:border-0'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold ${i === 0 ? 'text-yellow-400' : 'text-slate-500'}`}>#{u.rank}</span>
                    <span className={`text-sm ${u.self ? 'font-bold text-white' : 'text-slate-300'}`}>{u.name}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{u.xp} XP</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillRadar: React.FC<{ skills: Record<string, number> }> = ({ skills }) => {
  const points = CORE_SKILLS.map((skill, i) => {
    const angle = (i / CORE_SKILLS.length) * Math.PI * 2 - Math.PI / 2;
    const value = (skills[skill] || 0) / 100;
    const r = 80 * value;
    return { x: 100 + Math.cos(angle) * r, y: 100 + Math.sin(angle) * r };
  });

  const path = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')} Z`;

  return (
    <div className="relative w-48 h-48">
      <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-18 scale-110">
        {/* Grids */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((lvl) => (
          <polygon 
            key={lvl}
            points={CORE_SKILLS.map((_, i) => {
              const angle = (i / CORE_SKILLS.length) * Math.PI * 2 - Math.PI / 2;
              const r = 80 * lvl;
              return `${100 + Math.cos(angle) * r},${100 + Math.sin(angle) * r}`;
            }).join(' ')}
            className="fill-none stroke-slate-700"
            strokeWidth="1"
          />
        ))}
        {/* Fill Area */}
        <path d={path} className="fill-indigo-500/30 stroke-indigo-400" strokeWidth="2" />
      </svg>
      {/* Labels */}
      {CORE_SKILLS.map((skill, i) => {
        const angle = (i / CORE_SKILLS.length) * Math.PI * 2 - Math.PI / 2;
        const x = 100 + Math.cos(angle) * 95;
        const y = 100 + Math.sin(angle) * 95;
        return (
          <span key={skill} className="absolute text-[8px] font-bold text-slate-500 text-center w-12" style={{ top: y-4, left: x-24 }}>
            {skill}
          </span>
        );
      })}
    </div>
  );
};

const Badge = ({ icon: Icon, color, text }: { icon: any, color: string, text: string }) => {
  const colors: any = {
    orange: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  };
  return (
    <div className={`flex items-center px-3 py-1 rounded-full text-xs font-bold border ${colors[color]}`}>
      <Icon size={14} className="mr-1.5" />
      {text}
    </div>
  );
};

export default Dashboard;
