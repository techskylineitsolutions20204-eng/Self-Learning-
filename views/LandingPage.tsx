
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Target, Rocket } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="inline-flex items-center px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium mb-4 animate-pulse">
          <Zap size={16} className="mr-2" />
          Powered by Gemini 3.0 Pro
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          Master AI with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">TechSkyline</span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The ultimate self-learning platform for enterprise AI, prompt engineering, and autonomous agents. Map your skills to career-ready internship tracks.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button 
            onClick={() => navigate('/dashboard')}
            className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg flex items-center transition-all duration-300 transform hover:scale-105 shadow-xl shadow-indigo-600/25"
          >
            Start Learning Now
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-lg border border-slate-700 transition-all duration-300">
            View Enterprise Plans
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 pt-20 border-t border-slate-800">
          <FeatureCard 
            icon={Target}
            title="Skill-Based Track"
            desc="No exams. Only project-based evaluation and real-world results."
          />
          <FeatureCard 
            icon={Shield}
            title="Certified Expert"
            desc="Earn industry-recognized badges and certificates upon completion."
          />
          <FeatureCard 
            icon={Rocket}
            title="Internship Access"
            desc="Direct path to TechSkyline partner internships for top performers."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl text-left hover:border-indigo-500/50 transition-all group">
    <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
      <Icon size={24} className="text-indigo-400 group-hover:text-white" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
