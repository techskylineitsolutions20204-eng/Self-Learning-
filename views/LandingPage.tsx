
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Sparkles, Shield, Target, Rocket, 
  Phone, Mail, Globe, Award, GraduationCap, 
  Building, CheckCircle, ChevronRight, Cpu, 
  Layers, BarChart, Zap, ChevronDown,
  // Added missing icons
  Search, Users
} from 'lucide-react';
import { TECHSKYLINE_INFO, MASTERY_MATRIX, TRACK_DETAILS } from '../constants';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-indigo-500/30">
      {/* Header / Global Nav */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-indigo-600/20">TS</div>
              <span className="text-xl font-black tracking-tighter">TechSkyline</span>
            </div>
            <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
              <a href="#tracks" className="hover:text-white transition-colors">Internship Tracks</a>
              <a href="#matrix" className="hover:text-white transition-colors">Learning Hub</a>
              <a href="#university" className="hover:text-white transition-colors">Uni Alliances</a>
              <a href="#mentorship" className="hover:text-white transition-colors">Mentorship</a>
            </div>
          </div>
          <button onClick={() => navigate('/dashboard')} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-xl shadow-indigo-600/20 transition-all active:scale-95">
            Apply Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-10 relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-bold animate-fade-in">
            <Sparkles size={16} className="animate-pulse" />
            Ecosystem {TECHSKYLINE_INFO.version} Stability
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter text-white leading-[0.85] mb-6">
            Architecting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500">Next-Gen</span> Leaders
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Bridging academic theory and global production standards through immersive 2026-ready internship ecosystems.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <button 
              onClick={() => navigate('/dashboard')}
              className="group px-12 py-6 bg-white text-slate-950 rounded-[2rem] font-black text-xl flex items-center transition-all duration-300 transform hover:scale-105"
            >
              Start Internship Track
              <ArrowRight size={24} className="ml-4 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-12 py-6 bg-slate-900 hover:bg-slate-800 text-white rounded-[2rem] font-black text-xl border border-slate-800 transition-all">
              Explore Technologies
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-32">
            <StatCard label="College Partners" value="50+" />
            <StatCard label="Free Learning" value="100%" />
            <StatCard label="Certified Hub" value="ISO" />
            <StatCard label="Tracks Active" value="20+" />
          </div>
        </div>

        {/* Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent -z-10 blur-3xl"></div>
      </header>

      {/* University Alliances Section */}
      <section id="university" className="py-32 px-6 border-y border-slate-800/50 bg-slate-900/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-indigo-400 text-sm font-bold uppercase tracking-widest">University Collaboration Program</h2>
              <h3 className="text-5xl font-black text-white leading-tight">Bridge Academia with <br /> Industry Excellence.</h3>
              <p className="text-slate-400 text-lg">TechSkyline IT Solutions partners with leading colleges to provide high-impact internship tracks. 100% Free Learning. Zero Trials. Real Projects.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AdvantageItem 
                icon={Building}
                title="IITM Pravartak Advantage"
                desc="Experience a 2-day campus immersion at IIT Madras Research Park and learn from specialized faculty."
              />
              <AdvantageItem 
                icon={Award}
                title="Dual Certification"
                desc="Earn certifications from IITM Pravartak and TechSkyline, plus Microsoft-branded credentials."
              />
              <AdvantageItem 
                icon={Cpu}
                title="AI-Powered Skills"
                desc="Hands-on expertise in AWS, Azure, GCP, and Azure AI Foundry Agents for modern workloads."
              />
              <AdvantageItem 
                icon={Users}
                title="Job Assist Plus"
                desc="Access opportunities from 400+ hiring partners and AI-powered resume reviews."
              />
            </div>
            <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold flex items-center gap-3">
              Partner With Us <ChevronRight size={18} />
            </button>
          </div>
          <div className="relative group">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[3rem] p-1 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
               <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-xl">
                    <GraduationCap size={48} className="text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white uppercase tracking-tighter">Empowering Students</h4>
                  <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">ISO 9001:2015 Certified</p>
               </div>
            </div>
            <div className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl rotate-12 hidden md:block">
               <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-1">Microsoft Dual Certs</p>
               <div className="flex gap-2">
                 <div className="w-8 h-8 bg-blue-100 rounded"></div>
                 <div className="w-8 h-8 bg-blue-100 rounded"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2026 Tech Mastery Matrix */}
      <section id="matrix" className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">2026 Tech Mastery Matrix</h2>
            <div className="max-w-xl mx-auto relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                className="w-full bg-slate-900 border border-slate-800 rounded-full py-5 px-14 text-white outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all text-sm font-bold"
                placeholder="Search SAP, Oracle, AI, Agentic..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MASTERY_MATRIX.map((cat, i) => (
              <MatrixCard key={i} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Detailed Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 pt-32 pb-10 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-xl shadow-indigo-600/20">TS</div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">TechSkyline <br /><span className="text-indigo-400 text-xs tracking-[0.5em] font-bold">Est. {TECHSKYLINE_INFO.est}</span></h2>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Architecting the next generation of industry leaders through immersive 2026-ready internship ecosystems.
              </p>
              <div className="flex gap-4">
                <div className="p-2.5 bg-slate-900 rounded-xl hover:text-white transition-colors cursor-pointer"><Phone size={18} /></div>
                <div className="p-2.5 bg-slate-900 rounded-xl hover:text-white transition-colors cursor-pointer"><Mail size={18} /></div>
                <div className="p-2.5 bg-slate-900 rounded-xl hover:text-white transition-colors cursor-pointer"><Globe size={18} /></div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black text-white uppercase tracking-widest border-l-2 border-indigo-600 pl-4">AI & Data Intelligence</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                {TRACK_DETAILS['AI & Data Intelligence'].map(item => <li key={item} className="hover:text-indigo-400 transition-colors cursor-pointer">{item}</li>)}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black text-white uppercase tracking-widest border-l-2 border-indigo-600 pl-4">Enterprise ERP & Cloud</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                {TRACK_DETAILS['Enterprise ERP & Cloud'].map(item => <li key={item} className="hover:text-indigo-400 transition-colors cursor-pointer">{item}</li>)}
              </ul>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <h4 className="text-xs font-black text-white uppercase tracking-widest">Global Hub</h4>
                <div className="space-y-4">
                   <div className="flex items-start gap-4">
                      <Phone size={16} className="text-indigo-400 mt-1" />
                      <div>
                        <p className="text-xs font-bold text-white mb-1">WhatsApp Hub</p>
                        <p className="text-sm text-slate-500">{TECHSKYLINE_INFO.contacts.whatsapp}</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <Globe size={16} className="text-indigo-400 mt-1" />
                      <div>
                        <p className="text-xs font-bold text-white mb-1">USA Operations</p>
                        <p className="text-sm text-slate-500">{TECHSKYLINE_INFO.contacts.usa}</p>
                      </div>
                   </div>
                </div>
              </div>
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-2">
                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">System Integrated</p>
                 <p className="text-lg font-black text-white uppercase tracking-tighter">Abhinav Joseph</p>
                 <p className="text-[10px] font-bold text-slate-600 uppercase">Executive Director</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-slate-800 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
            <p>© 2026 TechSkyline IT Solutions. All Rights Reserved.</p>
            <div className="flex flex-wrap justify-center gap-10">
              <span>Silicon Valley, USA</span>
              <span>Hyderabad, India</span>
              <a href="#" className="hover:text-white transition-colors">Privacy & Data</a>
              <a href="#" className="hover:text-white transition-colors">IP Framework</a>
              <a href="#" className="hover:text-white transition-colors">Global Compliance</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const StatCard = ({ label, value }: { label: string, value: string }) => (
  <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[2rem] text-center space-y-2 hover:border-indigo-500/30 transition-all">
    <p className="text-4xl font-black text-white uppercase tracking-tighter">{value}</p>
    <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">{label}</p>
  </div>
);

const AdvantageItem = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex gap-6 group">
    <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xl shadow-indigo-600/5 flex-shrink-0">
      <Icon size={24} />
    </div>
    <div className="space-y-1">
      <h5 className="text-lg font-bold text-white">{title}</h5>
      <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

// Properly type MatrixCard as React.FC to support the 'key' prop during iteration
const MatrixCard: React.FC<{ category: any }> = ({ category }) => {
  const icons: any = { Sparkles, Layers, Target, Shield, Cpu, BarChart };
  const Icon = icons[category.icon];
  
  return (
    <div className="p-10 bg-slate-900/50 border border-slate-800 rounded-[3rem] space-y-8 group hover:border-indigo-500/30 transition-all shadow-2xl">
      <div className="flex justify-between items-start">
        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
          <Icon size={32} />
        </div>
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/20 ${category.demand === 'Extreme' ? 'bg-indigo-600 text-white' : 'text-indigo-400'}`}>
          {category.demand} Demand
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{category.title}</h4>
        <div className="w-12 h-1 bg-indigo-600 rounded-full group-hover:w-full transition-all duration-700"></div>
      </div>

      <ul className="space-y-4">
        {category.items.map((item: string) => (
          <li key={item} className="flex items-center gap-3 text-slate-400 text-sm font-medium hover:text-indigo-400 transition-colors cursor-pointer">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
            {item}
          </li>
        ))}
      </ul>

      <button className="w-full py-4 bg-slate-800 group-hover:bg-indigo-600 text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2">
        View Roadmap <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default LandingPage;
