
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
  Sparkles
} from 'lucide-react';
import LandingPage from './views/LandingPage';
import Dashboard from './views/Dashboard';
import ModuleView from './views/ModuleView';
import LabView from './views/LabView';
import { UserProgress, UserRole } from './types';
import { gemini } from './geminiService';

const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>({
    completedModules: [],
    completedLabs: [],
    internshipStage: 1,
    xp: 0,
    level: 1,
    role: 'student',
    skills: {
      'Prompt Design': 10,
      'Agentic Logic': 5,
      'Data Literacy': 0,
      'Enterprise Strategy': 0,
      'Ethics & Compliance': 0
    }
  });

  const updateProgress = (type: 'module' | 'lab', id: string, skillUpdates?: Record<string, number>) => {
    setProgress(prev => {
      const newModules = type === 'module' ? Array.from(new Set([...prev.completedModules, id])) : prev.completedModules;
      const newLabs = type === 'lab' ? Array.from(new Set([...prev.completedLabs, id])) : prev.completedLabs;
      const xpGained = type === 'module' ? 100 : 250;
      const totalXp = prev.xp + xpGained;
      const newLevel = Math.floor(totalXp / 1000) + 1;
      
      const newSkills = { ...prev.skills };
      if (skillUpdates) {
        Object.entries(skillUpdates).forEach(([skill, amount]) => {
          newSkills[skill] = Math.min(100, (newSkills[skill] || 0) + amount);
        });
      }

      return {
        ...prev,
        completedModules: newModules,
        completedLabs: newLabs,
        xp: totalXp,
        level: newLevel,
        skills: newSkills
      };
    });
  };

  const changeRole = (role: UserRole) => setProgress(p => ({ ...p, role }));

  return (
    <HashRouter>
      <div className="flex h-screen overflow-hidden bg-slate-950">
        <Sidebar progress={progress} changeRole={changeRole} />
        <main className="flex-1 overflow-y-auto bg-slate-900 text-slate-100 relative">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard progress={progress} />} />
            <Route path="/module/:id" element={<ModuleView onComplete={(id, skills) => updateProgress('module', id, skills)} />} />
            <Route path="/lab/:id" element={<LabView onComplete={(id) => updateProgress('lab', id)} />} />
          </Routes>
          <AITutor />
        </main>
      </div>
    </HashRouter>
  );
};

const AITutor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const location = useLocation();

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    const context = `The user is currently on the page: ${location.pathname}. Provide a helpful, concise answer about the TechSkyline AI platform or the current module.`;
    const aiResp = await gemini.runPrompt(context, userMsg);
    setChat(prev => [...prev, { role: 'ai', text: aiResp }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="p-4 bg-indigo-600 flex items-center justify-between">
            <span className="font-bold flex items-center"><Sparkles size={16} className="mr-2" /> Omni-Tutor</span>
            <button onClick={() => setIsOpen(false)}><X size={18} /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
            {chat.length === 0 && <p className="text-slate-500 italic">How can I help with your AI journey today?</p>}
            {chat.map((m, i) => (
              <div key={i} className={`p-2 rounded-lg ${m.role === 'user' ? 'bg-slate-800 ml-4' : 'bg-indigo-900/30 mr-4'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-3 bg-slate-800 flex gap-2">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..." 
              className="flex-1 bg-transparent border-none outline-none text-sm"
            />
            <button onClick={handleSend} className="text-indigo-400"><MessageSquare size={18} /></button>
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform text-white"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

const Sidebar: React.FC<{ progress: UserProgress, changeRole: (r: UserRole) => void }> = ({ progress, changeRole }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  if (location.pathname === '/') return null;

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
    const isActive = location.pathname.startsWith(to);
    return (
      <Link to={to} onClick={() => setIsOpen(false)} className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
        <Icon size={18} />
        <span className="text-sm font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-indigo-600 rounded-full shadow-lg">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800 lg:static transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">TS</div>
            <h1 className="text-lg font-bold">TechSkyline</h1>
          </div>
          <nav className="flex-1 space-y-1">
            <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <div className="pt-4 pb-2 text-[10px] font-bold text-slate-500 uppercase px-4">Academy</div>
            <NavItem to="/module" icon={BookOpen} label="Curriculum" />
            <NavItem to="/lab" icon={FlaskConical} label="Live Labs" />
            <NavItem to="/internship" icon={Award} label="Career Track" />
          </nav>
          <div className="mt-auto p-4 bg-slate-900 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs">L{progress.level}</div>
              <div className="flex-1">
                <p className="text-xs font-bold text-white">Mastery Level {progress.level}</p>
                <div className="w-full h-1 bg-slate-700 rounded-full mt-1">
                  <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${(progress.xp % 1000) / 10}%` }}></div>
                </div>
              </div>
            </div>
            <select 
              className="w-full bg-slate-800 border-none text-[10px] p-1.5 rounded outline-none"
              value={progress.role}
              onChange={(e) => changeRole(e.target.value as UserRole)}
            >
              <option value="student">Persona: Student</option>
              <option value="professional">Persona: Professional</option>
            </select>
          </div>
        </div>
      </aside>
    </>
  );
};

export default App;
