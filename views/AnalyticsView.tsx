
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  TrendingUp, 
  Target, 
  Users, 
  ChevronLeft,
  Calendar,
  Layers,
  Search
} from 'lucide-react';
import { UserProgress } from '../types';
import { CORE_SKILLS } from '../constants';

const AnalyticsView: React.FC<{ progress: UserProgress }> = ({ progress }) => {
  const navigate = useNavigate();

  // Fix: Cast Object.values to number[] to resolve 'unknown' arithmetic operation errors in reduce
  const skillValues = Object.values(progress.skills) as number[];
  const totalSkill = skillValues.reduce((a, b) => a + b, 0);
  const avgSkill = Math.round(totalSkill / CORE_SKILLS.length);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-3xl font-bold flex items-center gap-3">
             <BarChart className="text-indigo-500" /> Mastery Insights
          </h2>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-400 flex items-center gap-2">
            <Calendar size={14} /> Last 30 Days
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-all">
            Export JSON
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Global Rank" value="#1,242" trend="+12.5%" icon={Users} color="indigo" />
        <StatCard title="Avg Proficiency" value={`${avgSkill}%`} trend="+5.2%" icon={TrendingUp} color="emerald" />
        <StatCard title="Learning Velocity" value="2.4/wk" trend="+0.4" icon={TrendingUp} color="cyan" />
        <StatCard title="Skill Depth" value="Intermediate" trend="Beginner" icon={Layers} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skill Gap Analysis */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-[2rem] p-8 space-y-6">
           <h3 className="text-lg font-bold flex items-center gap-3">
             <Target size={20} className="text-rose-400" /> Skill Gap Analysis
           </h3>
           <div className="space-y-6">
             {CORE_SKILLS.map(skill => {
               const val = progress.skills[skill] || 0;
               return (
                 <div key={skill} className="space-y-2">
                   <div className="flex justify-between text-xs font-bold text-slate-400">
                     <span>{skill}</span>
                     <span className={val > 50 ? 'text-emerald-400' : 'text-rose-400'}>{val}%</span>
                   </div>
                   <div className="h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                     <div className={`h-full rounded-full transition-all duration-1000 ${val > 50 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]'}`} style={{ width: `${val}%` }}></div>
                   </div>
                 </div>
               );
             })}
           </div>
        </div>

        {/* Prediction Engine */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-[2rem] p-8 space-y-6 flex flex-col">
           <h3 className="text-lg font-bold flex items-center gap-3">
             <TrendingUp size={20} className="text-indigo-400" /> Completion Forecast
           </h3>
           <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 py-10">
              <div className="w-48 h-48 rounded-full border-8 border-slate-900 border-t-indigo-500 flex flex-col items-center justify-center space-y-1 relative">
                <span className="text-4xl font-black text-white">4.2w</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">To AI Mastery</span>
                <div className="absolute inset-4 rounded-full border border-indigo-500/10 animate-ping"></div>
              </div>
              <p className="text-sm text-slate-400 max-w-xs">
                Based on your current learning velocity of <strong>2.4 modules/week</strong>, you are projected to complete the <strong>{progress.track}</strong> track by mid-next month.
              </p>
           </div>
           <button className="w-full py-4 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-bold text-slate-400 hover:text-white transition-all uppercase tracking-widest">
              Accelerate Learning Path
           </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon: Icon, color }: { title: string, value: string, trend: string, icon: any, color: string }) => {
  const colors: any = {
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  };
  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${colors[color]}`}><Icon size={18} /></div>
        <span className={`text-[10px] font-bold ${trend.startsWith('+') ? 'text-emerald-400' : 'text-slate-500'}`}>{trend}</span>
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</p>
        <p className="text-2xl font-black text-white">{value}</p>
      </div>
    </div>
  );
};

export default AnalyticsView;
