
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FlaskConical, 
  Award, 
  ChevronRight,
  LogOut,
  User as UserIcon,
  Menu,
  X,
  MessageSquare,
  Sparkles,
  BarChart,
  Settings,
  ShieldCheck,
  Globe,
  Phone,
  Rocket,
  Search,
  Users,
  Building,
  GraduationCap
} from 'lucide-react';
import LandingPage from './views/LandingPage';
import Dashboard from './views/Dashboard';
import ModuleView from './views/ModuleView';
import LabView from './views/LabView';
import AnalyticsView from './views/AnalyticsView';
import VerificationView from './views/VerificationView';
import UniversityAllianceView from './views/UniversityAllianceView';
import { UserProgress, UserRole, CareerTrack, Certificate } from './types';
import { gemini } from './geminiService';
import { TECHSKYLINE_INFO } from './constants';

const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('techskyline_progress');
    return saved ? JSON.parse(saved) : {
      completedModules: [],
      completedLabs: [],
      internshipStage: 1,
      xp: 0,
      level: 1,
      role: 'student',
      track: 'AI Engineer',
      skills: {
        'Prompt Design': 10,
        'Agentic Logic': 5
      },
      activityLogs: [],
      certificates: [],
      preferences: {
        accessibility: false,
        language: 'en',
        difficulty: 'beginner'
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('techskyline_progress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (type: 'module' | 'lab' | 'quiz' | 'evaluation', id: string, skillUpdates?: Record<string, number>) => {
    setProgress(prev => {
      const newModules = type === 'module' ? Array.from(new Set([...prev.completedModules, id])) : prev.completedModules;
      const newLabs = type === 'lab' ? Array.from(new Set([...prev.completedLabs, id])) : prev.completedLabs;
      const xpGained = type === 'module' ? 100 : (type === 'lab' ? 250 : 50);
      const totalXp = prev.xp + xpGained;
      
      return {
        ...prev,
        completedModules: newModules,
        completedLabs: newLabs,
        xp: totalXp,
        level: Math.floor(totalXp / 1000) + 1,
        activityLogs: [{ timestamp: new Date().toISOString(), action: `Completed ${type}`, type, id }, ...prev.activityLogs].slice(0, 50)
      };
    });
  };

  const issueCertificate = (cert: Certificate) => {
    const savedCerts = JSON.parse(localStorage.getItem('techskyline_certs') || '{}');
    savedCerts[cert.id] = cert;
    localStorage.setItem('techskyline_certs', JSON.stringify(savedCerts));
    setProgress(prev => ({ ...prev, certificates: [...prev.certificates, cert.id] }));
  };

  return (
    <HashRouter>
      <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
        <Sidebar progress={progress} />
        <main className="flex-1 overflow-y-auto relative bg-slate-900">
          <TopNav />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard progress={progress} onIssueCert={issueCertificate} />} />
            <Route path="/module/:id" element={<ModuleView onComplete={(id, skills) => updateProgress('module', id, skills)} progress={progress} />} />
            <Route path="/lab/:id" element={<LabView onComplete={(id) => updateProgress('lab', id)} onEvaluation={(id, skills) => updateProgress('evaluation', id, skills)} />} />
            <Route path="/analytics" element={<AnalyticsView progress={progress} />} />
            <Route path="/verify" element={<VerificationView />} />
            <Route path="/verify/:cid" element={<VerificationView />} />
            <Route path="/university" element={<UniversityAllianceView />} />
          </Routes>
          <AITutor />
        </main>
      </div>
    </HashRouter>
  );
};

const TopNav: React.FC = () => {
  const location = useLocation();
  if (location.pathname === '/' || location.pathname.startsWith('/verify')) return null;

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400" />
          <input className="bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-indigo-600 outline-none w-64" placeholder="Search Matrix..." />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all">Apply Now</button>
      </div>
    </div>
  );
};

const Sidebar: React.FC<{ progress: UserProgress }> = ({ progress }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  if (location.pathname === '/' || location.pathname.startsWith('/verify')) return null;

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
    const isActive = location.pathname.startsWith(to);
    return (
      <Link to={to} onClick={() => setIsOpen(false)} className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
        <Icon size={18} />
        <span className="text-sm font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 hidden lg:flex flex-col p-6">
      <Link to="/" className="flex items-center space-x-3 mb-10">
        <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">TS</div>
        <h1 className="text-lg font-black tracking-tighter">TechSkyline</h1>
      </Link>
      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
        <NavItem to="/dashboard" icon={LayoutDashboard} label="My Dashboard" />
        <div className="pt-4 pb-2 text-[10px] font-bold text-slate-500 uppercase px-4 tracking-widest">Mastery Matrix</div>
        <NavItem to="/module" icon={BookOpen} label="Learning Hub" />
        <NavItem to="/lab" icon={FlaskConical} label="Labs & Projects" />
        <NavItem to="/analytics" icon={BarChart} label="Analytics Hub" />
        <div className="pt-4 pb-2 text-[10px] font-bold text-slate-500 uppercase px-4 tracking-widest">Programs</div>
        <NavItem to="/internship" icon={Rocket} label="Internship Tracks" />
        <NavItem to="/university" icon={GraduationCap} label="Uni Alliances" />
        <NavItem to="/mentorship" icon={Users} label="Mentorship" />
      </nav>
      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">L{progress.level}</div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{progress.track}</p>
              <div className="w-full h-1 bg-slate-700 rounded-full mt-1">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(progress.xp % 1000) / 10}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

const AITutor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);
    const aiResp = await gemini.runPrompt("You are TechSkyline Virtual Mentor. Help students with internship tracks and AI concepts.", userMsg);
    setChat(prev => [...prev, { role: 'ai', text: aiResp }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="p-4 bg-indigo-600 flex items-center justify-between">
            <span className="font-bold flex items-center text-sm"><Sparkles size={16} className="mr-2" /> 2026 Virtual Mentor</span>
            <button onClick={() => setIsOpen(false)}><X size={18} /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {chat.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-3 rounded-2xl max-w-[90%] ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-[10px] text-indigo-400 animate-pulse">Mentor is thinking...</div>}
          </div>
          <div className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your track..." 
              className="flex-1 bg-transparent border-none outline-none text-xs px-2 py-1"
            />
            <button onClick={handleSend} className="p-1 text-indigo-400 bg-indigo-400/10 rounded hover:bg-indigo-400 hover:text-white transition-all">
              <MessageSquare size={16} />
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform text-white">
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

export default App;
