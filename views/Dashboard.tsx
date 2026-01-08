
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
  // Added missing Lucide icons to fix reference errors
  BookOpen,
  ChevronRight,
  FlaskConical,
  Award
} from 'lucide-react';
import { UserProgress } from '../types';
import { MODULES, LABS, INTERNSHIP_ROADMAP } from '../constants';

const Dashboard: React.FC<{ progress: UserProgress }> = ({ progress }) => {
  const navigate = useNavigate();

  const moduleCompletion = (progress.completedModules.length / MODULES.length) * 100;
  const labCompletion = (progress.completedLabs.length / LABS.length) * 100;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Learner!</h2>
          <p className="text-slate-400">Track your progress and continue your AI journey.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-sm font-bold border border-orange-500/20">
            <Flame size={16} className="mr-1" />
            3 Day Streak
          </div>
          <div className="flex items-center bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-sm font-bold border border-indigo-500/20">
            <Trophy size={16} className="mr-1" />
            1,250 XP
          </div>
        </div>
      </header>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Overall Progress" 
          value={`${Math.round((moduleCompletion + labCompletion) / 2)}%`}
          subtitle="Keep going!"
          icon={BarChart3}
          color="indigo"
        />
        <StatCard 
          title="Modules Done" 
          value={`${progress.completedModules.length}/${MODULES.length}`}
          subtitle="Concepts learned"
          icon={CheckCircle}
          color="emerald"
        />
        <StatCard 
          title="Internship Status" 
          value="Stage 1"
          subtitle="AI Basics & Prompting"
          icon={Clock}
          color="cyan"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Learning Modules */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center">
              <BookOpen className="mr-2 text-indigo-400" size={20} />
              Modules
            </h3>
            <span className="text-xs text-slate-500 uppercase font-bold">{progress.completedModules.length} of {MODULES.length} Complete</span>
          </div>
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden divide-y divide-slate-700">
            {MODULES.map((mod) => (
              <div 
                key={mod.id} 
                className="group flex items-center justify-between p-4 hover:bg-slate-700/50 cursor-pointer transition-colors"
                onClick={() => navigate(`/module/${mod.id}`)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${progress.completedModules.includes(mod.id) ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}>
                    {progress.completedModules.includes(mod.id) ? <CheckCircle size={20} /> : <Circle size={20} />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">{mod.title}</h4>
                    <p className="text-xs text-slate-400">{mod.description}</p>
                  </div>
                </div>
                <ChevronRight className="text-slate-600 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" size={20} />
              </div>
            ))}
          </div>
        </div>

        {/* Lab Practice */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center">
              <FlaskConical className="mr-2 text-pink-400" size={20} />
              Live Labs
            </h3>
            <span className="text-xs text-slate-500 uppercase font-bold">{progress.completedLabs.length} of {LABS.length} Complete</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {LABS.map((lab) => (
              <div 
                key={lab.id}
                onClick={() => navigate(`/lab/${lab.id}`)}
                className="p-5 bg-gradient-to-r from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl hover:border-pink-500/50 transition-all cursor-pointer relative group overflow-hidden"
              >
                <div className="flex items-start justify-between relative z-10">
                  <div className="space-y-1">
                    <h4 className="font-bold text-white">{lab.title}</h4>
                    <p className="text-sm text-slate-400 pr-8">{lab.overview}</p>
                  </div>
                  <div className={`p-2 rounded-full ${progress.completedLabs.includes(lab.id) ? 'bg-pink-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    <ArrowRight size={18} />
                  </div>
                </div>
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-pink-600/10 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Internship Track Mapping */}
      <section className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Award className="mr-2 text-cyan-400" size={20} />
          Internship Roadmap
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-5 left-10 right-10 h-0.5 bg-slate-700 z-0"></div>
          
          {INTERNSHIP_ROADMAP.map((step, idx) => (
            <div key={step.week} className="flex flex-col items-center text-center space-y-3 z-10 w-full md:w-1/4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                progress.internshipStage >= step.week 
                  ? 'bg-cyan-500 text-white ring-4 ring-cyan-500/20' 
                  : 'bg-slate-700 text-slate-400 border border-slate-600'
              }`}>
                {idx + 1}
              </div>
              <div>
                <p className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Week {step.week}</p>
                <h4 className="text-sm font-semibold text-slate-200">{step.title}</h4>
                <p className="text-xs text-slate-500">{step.status}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon: Icon, color }: { title: string, value: string, subtitle: string, icon: any, color: string }) => {
  const colors: any = {
    indigo: 'bg-indigo-600 text-indigo-100 ring-indigo-500/20',
    emerald: 'bg-emerald-600 text-emerald-100 ring-emerald-500/20',
    cyan: 'bg-cyan-600 text-cyan-100 ring-cyan-500/20',
  };
  
  return (
    <div className="p-6 bg-slate-800/40 border border-slate-700 rounded-2xl space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon size={18} />
        </div>
      </div>
      <div className="space-y-1">
        <h4 className="text-3xl font-bold text-white">{value}</h4>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default Dashboard;
