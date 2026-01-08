
export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
  skills: string[];
  credits: number;
}

export interface Lab {
  id: string;
  title: string;
  overview: string;
  systemPrompt: string;
  initialPrompt: string;
  challenges: string[];
}

export type UserRole = 'student' | 'professional' | 'enterprise' | 'university';

export type CareerTrack = 
  | 'Data Analyst' 
  | 'AI Engineer' 
  | 'Prompt Specialist' 
  | 'AI Researcher'
  | 'Neural Architect'
  | 'Ethical Hacking AI'
  | 'FinTech AI Strategist'
  | 'Creative GenAI Lead'
  | 'SAP S/4HANA'
  | 'SAP Ariba'
  | 'Oracle Primavera'
  | 'AWS DevOps'
  | 'Cyber Security'
  | 'Robotics & RPA'
  | 'Product Management';

export interface TrackCategory {
  title: string;
  items: string[];
  demand: 'Extreme' | 'Critical' | 'High' | 'Global';
  icon: string;
}

export interface ActivityLog {
  timestamp: string;
  action: string;
  type: 'module' | 'lab' | 'quiz' | 'evaluation';
  id: string;
}

export interface Certificate {
  id: string;
  userId: string;
  name: string;
  track: CareerTrack;
  skills: string[];
  projectTitle: string;
  issuedAt: string;
  verificationUrl: string;
}

export interface UserProgress {
  completedModules: string[];
  completedLabs: string[];
  internshipStage: number;
  xp: number;
  level: number;
  role: UserRole;
  track: CareerTrack;
  skills: Record<string, number>;
  activityLogs: ActivityLog[];
  certificates: string[];
  preferences: {
    accessibility: boolean;
    language: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  };
  organization?: {
    id: string;
    name: string;
    type: 'enterprise' | 'university';
  };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface EvaluationResult {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}
