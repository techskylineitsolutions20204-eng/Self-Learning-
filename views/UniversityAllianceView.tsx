
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Building, Award, CheckCircle, 
  ArrowRight, Users, Rocket, Cpu, ShieldCheck, 
  Globe, Briefcase, Zap, Star
} from 'lucide-react';
import { TECHSKYLINE_INFO } from '../constants';

const UniversityAllianceView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20 p-8 max-w-7xl mx-auto space-y-20 animate-in fade-in duration-500">
      {/* Page Header */}
      <header className="relative py-20 bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[3rem] p-12 overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1 bg-white/10 rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
            <GraduationCap size={14} /> Global University Alliances
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
            Empower Your <span className="text-indigo-300">Students</span> <br /> with 2026 Skills
          </h1>
          <p className="text-xl text-indigo-100 font-medium">
            TechSkyline collaborates with placement cells and faculty to integrate our industry projects directly into the academic timeline.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="px-8 py-4 bg-white text-indigo-950 rounded-2xl font-bold hover:scale-105 transition-all">Start Collaboration</button>
            <button className="px-8 py-4 bg-indigo-900/40 text-white rounded-2xl font-bold border border-white/20 hover:bg-indigo-900/60 transition-all">Download Brochure</button>
          </div>
        </div>
        {/* Decor */}
        <Building className="absolute -bottom-20 -right-20 w-96 h-96 text-white/5 -rotate-12" />
      </header>

      {/* Institutional Alliances Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatItem title="Placement Uplift" value="3.2x" desc="Average increase in high-package recruitment for partner campuses." icon={Rocket} />
        <StatItem title="Certification Tier" value="IITM" desc="Direct access to IITM Pravartak specialized faculty workshops." icon={Award} />
        <StatItem title="Learning Cost" value="Free" desc="100% free learning hubs for all students in partner institutions." icon={Star} />
      </div>

      {/* The Ecosystem Roadmap for Universities */}
      <section className="space-y-12">
        <h2 className="text-3xl font-black text-white text-center uppercase tracking-tighter">Campus Transformation Framework</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-slate-800/40 border border-slate-700 p-10 rounded-[2.5rem] space-y-8">
             <div className="flex items-center gap-4 border-l-4 border-indigo-600 pl-6">
                <div className="w-12 h-12 bg-indigo-600/10 text-indigo-400 rounded-xl flex items-center justify-center"><Building size={24} /></div>
                <h3 className="text-2xl font-bold text-white">Institutional Integration</h3>
             </div>
             <p className="text-slate-400 font-medium">We bridge academia and industry through a multi-dimensional ecosystem, providing students with production-level skills and institutions with high placement rates.</p>
             <ul className="space-y-4">
                <CheckItem text="Dedicated Learning Hub within campus network." />
                <CheckItem text="Faculty orientation on 2026 AI standard workloads." />
                <CheckItem text="Quarterly progress reporting to college management." />
                <CheckItem text="ISO Certified quality audit for all tracks." />
             </ul>
          </div>

          <div className="bg-slate-800/40 border border-slate-700 p-10 rounded-[2.5rem] space-y-8">
             <div className="flex items-center gap-4 border-l-4 border-indigo-600 pl-6">
                <div className="w-12 h-12 bg-indigo-600/10 text-indigo-400 rounded-xl flex items-center justify-center"><Award size={24} /></div>
                <h3 className="text-2xl font-bold text-white">The IITM Pravartak Advantage</h3>
             </div>
             <div className="p-6 bg-indigo-600/10 rounded-2xl border border-indigo-600/20">
                <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Core Partnership</h4>
                <p className="text-sm text-slate-300 leading-relaxed italic">"Experience a 2-day campus immersion at IIT Madras Research Park. Students interact with world-class faculty and gain hands-on expertise in Neural Orchestration and Agentic workflows."</p>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
                   <p className="text-xs font-bold text-white mb-1">Dual Certification</p>
                   <p className="text-[10px] text-slate-500">IITM & TechSkyline</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
                   <p className="text-xs font-bold text-white mb-1">Expert Faculty</p>
                   <p className="text-[10px] text-slate-500">Specialized Mentors</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Global Hiring Partners Grid */}
      <section className="bg-slate-800/20 border border-slate-700/50 rounded-[3rem] p-12 text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-indigo-400 text-sm font-bold uppercase tracking-widest">Connect with our Network</h2>
          <h3 className="text-4xl font-black text-white">400+ Hiring Partners Worldwide</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">From Silicon Valley startups to Fortune 500 giants, our students are architecting solutions in global production environments.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
           {/* Placeholders for partner logos */}
           <div className="w-32 h-12 bg-slate-800 rounded-lg"></div>
           <div className="w-32 h-12 bg-slate-800 rounded-lg"></div>
           <div className="w-32 h-12 bg-slate-800 rounded-lg"></div>
           <div className="w-32 h-12 bg-slate-800 rounded-lg"></div>
           <div className="w-32 h-12 bg-slate-800 rounded-lg"></div>
        </div>
        <div className="pt-10">
          <button className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all">Join the Partnership Program</button>
        </div>
      </section>
    </div>
  );
};

const StatItem = ({ title, value, desc, icon: Icon }: { title: string, value: string, desc: string, icon: any }) => (
  <div className="p-8 bg-slate-800/40 border border-slate-700 rounded-[2rem] space-y-6 flex flex-col items-center text-center">
    <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-400">
      <Icon size={32} />
    </div>
    <div className="space-y-2">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</p>
      <p className="text-5xl font-black text-white tracking-tighter">{value}</p>
    </div>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const CheckItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-3 text-sm font-bold text-slate-300">
    <CheckCircle size={18} className="text-emerald-500" />
    {text}
  </li>
);

export default UniversityAllianceView;
