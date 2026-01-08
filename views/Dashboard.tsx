
import React, { useState, useEffect } from 'react';
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
  Zap,
  Star,
  Compass,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { UserProgress, CareerTrack, Certificate } from '../types';
import { MODULES, LABS, INTERNSHIP_ROADMAP, CORE_SKILLS } from '../constants';
import { gemini } from '../geminiService';

const Dashboard: React.FC<{ progress: UserProgress, onIssueCert: (cert: Certificate) => void }> = ({ progress, onIssueCert }) => {
  const navigate = useNavigate();
  const [aiRec, setAiRec] = useState<string>('Generating adaptive pathway...');
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    gemini.getAdaptiveRecommendation(progress).then(setAiRec);
  }, [progress]);

  const totalCredits = MODULES
    .filter(m => progress.completedModules.includes(m.id))
    .reduce((sum, m) => sum + m.credits, 0);

  const handleClaimCertificate = () => {
    setClaiming(true);
    setTimeout(() => {
      const newCert: Certificate = {
        id: `TS-AI-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        userId: 'student-01',
        name: 'TechSkyline Learner',
        track: progress.track,
        skills: Object.keys(progress.skills).filter(k => progress.skills[k] > 50),
        projectTitle: 'Enterprise AI Strategy Prototype',
        issuedAt: new Date().toISOString(),
        verificationUrl: `${window.location.origin}/verify/`
      };
      onIssueCert(newCert);
      setClaiming(false);
      navigate(`/verify/${newCert.id}`);
    }, 2000);
  };

  const isEligibleForCert = progress.completedModules.length === MODULES.length;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider">
            <Compass size={16} /> {progress.track} Track
          </div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Hi, {progress.role === 'student' ? 'Scholar' : 'Architect'} <span className="text-indigo-500">_</span>
          </h2>
          {progress.organization && (
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <GraduationCap size={16} className="text-indigo-400" /> {progress.organization.name}
              <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px] font-bold text-slate-500 uppercase">{progress.organization.type}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl flex items-center gap-2">
            <ShieldCheck size={18} />
            <span className="font-bold">{totalCredits.toFixed(1)} Credits</span>
          </div>
          <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center gap-2">
            <Star size={18} />
            <span className="font-bold">{progress.xp.toLocaleString()} XP</span>
          </div>
        </div>
      </header>

      {/* Adaptive Spotlight Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl shadow-indigo-900/40">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 bg-white/10 rounded-full text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm border border-white/20">
              <Sparkles size={14} className="mr-2" /> AI Path Recommendation
            </div>
            <h3 className="text-3xl font-bold leading-tight">Your next evolution is ready.</h3>
            <p className="text-indigo-100 text-lg leading-relaxed font-medium">
              "{aiRec}"
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/lab/lab-prompt')}
                className="px-8 py-3 bg-white text-indigo-600 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
              >
                Launch Next Lab
              </button>
              <button className="px-8 py-3 bg-indigo-900/30 text-white rounded-2xl font-bold border border-white/10 hover:bg-indigo-900/50 transition-all">
                View Roadmap
              </button>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
             <div className="w-64 h-64 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 animate-float">
                <Zap size={80} className="text-white drop-shadow-2xl" />
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Academic Radar */}
        <div className="lg:col-span-1 bg-slate-800/40 border border-slate-700/50 rounded-[2rem] p-8 flex flex-col items-center backdrop-blur-sm">
          <h3 className="text-sm font-bold text-slate-300 mb-8 flex items-center gap-2">
            <GraduationCap size={18} className="text-indigo-400" /> Academic Standing
          </h3>
          <SkillRadar skills={progress.skills} />
          
          <div className="mt-8 w-full p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50">
            <div className="flex justify-between items-center mb-2">
               <span className="text-xs font-bold text-slate-500 uppercase">Degree Progress</span>
               <span className="text-xs font-black text-indigo-400">{Math.round((totalCredits / 10) * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-500" style={{ width: `${(totalCredits / 10) * 100}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-600 mt-2 text-center italic">10 Credits required for Track Graduation</p>
          </div>
        </div>

        {/* Certificates & Achievements */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold flex items-center gap-2">
                   <ShieldCheck size={20} className="text-emerald-400" /> Verified Certificates
                 </h3>
                 <span className="text-xs font-bold text-slate-500 uppercase">{progress.certificates.length} Issued</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {progress.certificates.map(cid => (
                    <div key={cid} onClick={() => navigate(`/verify/${cid}`)} className="p-4 bg-slate-900 border border-slate-700 rounded-2xl hover:border-indigo-500 transition-all cursor-pointer group">
                       <div className="flex justify-between items-start mb-2">
                          <Award className="text-indigo-400" size={20} />
                          <ExternalLink size={14} className="text-slate-600 group-hover:text-white" />
                       </div>
                       <p className="text-xs font-bold text-white mb-1">{progress.track} Professional</p>
                       <p className="text-[10px] text-slate-500 font-mono">{cid}</p>
                    </div>
                 ))}
                 
                 {isEligibleForCert && progress.certificates.length === 0 && (
                    <button 
                      onClick={handleClaimCertificate}
                      disabled={claiming}
                      className="col-span-full py-8 bg-indigo-600/10 border-2 border-dashed border-indigo-600/30 rounded-2xl text-center hover:bg-indigo-600/20 transition-all"
                    >
                       {claiming ? (
                         <div className="flex flex-col items-center gap-2">
                            <Clock className="animate-spin" />
                            <span className="text-sm font-bold">Verifying Academic Integrity...</span>
                         </div>
                       ) : (
                         <div className="flex flex-col items-center gap-2">
                            <Trophy className="text-yellow-400" size={32} />
                            <span className="text-sm font-bold">Claim Track Certificate</span>
                            <span className="text-[10px] text-indigo-400">Publicly Verifiable on Blockchain</span>
                         </div>
                       )}
                    </button>
                 )}
                 
                 {!isEligibleForCert && (
                    <div className="col-span-full p-6 text-center text-slate-600 border border-dashed border-slate-700 rounded-2xl">
                       <p className="text-xs italic">Complete all modules to unlock your graduation certificate.</p>
                    </div>
                 )}
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-slate-800/40 border border-slate-700 rounded-2xl">
                 <h4 className="text-sm font-bold text-slate-400 uppercase mb-4">Top Skills</h4>
                 <div className="flex flex-wrap gap-2">
                    {Object.entries(progress.skills).sort((a,b) => b[1] - a[1]).slice(0, 3).map(([s,v]) => (
                       <div key={s} className="px-3 py-1 bg-slate-900 rounded-lg border border-slate-700 flex flex-col">
                          <span className="text-[10px] font-bold text-indigo-400">{s}</span>
                          <span className="text-xs font-black text-white">{v}%</span>
                       </div>
                    ))}
                 </div>
              </div>
              <div className="p-6 bg-slate-800/40 border border-slate-700 rounded-2xl">
                 <h4 className="text-sm font-bold text-slate-400 uppercase mb-4">Internship Goal</h4>
                 <div className="flex items-center gap-4">
                    <div className="flex-1">
                       <p className="text-xs text-white font-bold">Week 2: Advanced Agents</p>
                       <p className="text-[10px] text-slate-500">2 modules remaining</p>
                    </div>
                    <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
                       <FlaskConical size={20} />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const SkillRadar: React.FC<{ skills: Record<string, number> }> = ({ skills }) => {
  const points = CORE_SKILLS.map((skill, i) => {
    const angle = (i / CORE_SKILLS.length) * Math.PI * 2 - Math.PI / 2;
    const value = Math.max(0.1, (skills[skill] || 0) / 100);
    const r = 90 * value;
    return { x: 100 + Math.cos(angle) * r, y: 100 + Math.sin(angle) * r };
  });

  const path = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')} Z`;

  return (
    <div className="relative w-56 h-56 group">
      <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-18 scale-110 transition-transform">
        {[0.2, 0.4, 0.6, 0.8, 1].map((lvl) => (
          <polygon 
            key={lvl}
            points={CORE_SKILLS.map((_, i) => {
              const angle = (i / CORE_SKILLS.length) * Math.PI * 2 - Math.PI / 2;
              const r = 90 * lvl;
              return `${100 + Math.cos(angle) * r},${100 + Math.sin(angle) * r}`;
            }).join(' ')}
            className="fill-none stroke-slate-700/50"
            strokeWidth="0.5"
          />
        ))}
        <path d={path} className="fill-indigo-500/30 stroke-indigo-400 transition-all duration-1000" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      {CORE_SKILLS.map((skill: string, i: number) => {
        const angle = (i / CORE_SKILLS.length) * Math.PI * 2 - Math.PI / 2;
        // Calculation of label positions
        const labelX = 100 + Math.cos(angle) * 115;
        const labelY = 100 + Math.sin(angle) * 115;
        
        // Final position adjustments decoupled from template strings to resolve arithmetic operation errors
        const topPos = labelY - 6;
        const leftPos = labelX - 28;

        return (
          <span 
            key={skill} 
            className="absolute text-[8px] font-black text-slate-500 text-center w-14 leading-tight uppercase transition-colors" 
            style={{ 
              top: `${topPos}px`, 
              left: `${leftPos}px` 
            }}
          >
            {skill}
          </span>
        );
      })}
    </div>
  );
};

export default Dashboard;
