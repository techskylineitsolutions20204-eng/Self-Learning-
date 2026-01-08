
export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
  skills: string[];
}

export interface Lab {
  id: string;
  title: string;
  overview: string;
  systemPrompt: string;
  initialPrompt: string;
  challenges: string[];
}

export type UserRole = 'student' | 'professional' | 'enterprise';

export interface UserProgress {
  completedModules: string[];
  completedLabs: string[];
  internshipStage: number;
  xp: number;
  level: number;
  role: UserRole;
  skills: Record<string, number>; // 0 to 100
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
