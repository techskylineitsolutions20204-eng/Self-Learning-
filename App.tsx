
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FlaskConical, 
  Award, 
  Home, 
  ChevronRight,
  LogOut,
  User as UserIcon,
  Menu,
  X
} from 'lucide-react';
import LandingPage from './views/LandingPage';
import Dashboard from './views/Dashboard';
import ModuleView from './views/ModuleView';
import LabView from './views/LabView';
import { UserProgress } from './types';

const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>({
    completedModules: [],
    completedLabs: [],
    internshipStage: 1,
  });

  const updateProgress = (type: 'module' | 'lab', id: string) => {
    setProgress(prev => ({
      ...prev,
      [type === 'module' ? 'completedModules' : 'completedLabs']: 
        Array.from(new Set([...(type === 'module' ? prev.completedModules : prev.completedLabs), id]))
    }));
  };

  return (
    <HashRouter>
      <div className="flex h-screen overflow-hidden">
        <Sidebar progress={progress} />
        <main className="flex-1 overflow-y-auto bg-slate-900 text-slate-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard progress={progress} />} />
            <Route path="/module/:id" element={<ModuleView onComplete={(id) => updateProgress('module', id)} />} />
            <Route path="/lab/:id" element={<LabView onComplete={(id) => updateProgress('lab', id)} />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

const Sidebar: React.FC<{ progress: UserProgress }> = ({ progress }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isLanding = location.pathname === '/';

  if (isLanding) return null;

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
    const isActive = location.pathname === to || location.pathname.startsWith(to + '/');
    return (
      <Link 
        to={to} 
        onClick={() => setIsOpen(false)}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-indigo-600 rounded-full shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Content */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800 transition-transform duration-300 transform lg:translate-x-0 lg:static ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl">TS</div>
            <h1 className="text-xl font-bold tracking-tight">TechSkyline</h1>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider px-4">Learning</div>
            <NavItem to="/module" icon={BookOpen} label="Modules" />
            <NavItem to="/lab" icon={FlaskConical} label="Labs" />
            <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider px-4">Career</div>
            <NavItem to="/internship" icon={Award} label="Internship Track" />
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800">
            <div className="flex items-center space-x-3 p-2 bg-slate-900/50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                <UserIcon size={16} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">Student Learner</p>
                <p className="text-xs text-slate-500">Free Tier</p>
              </div>
              <Link to="/" className="text-slate-500 hover:text-white transition-colors">
                <LogOut size={16} />
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default App;
