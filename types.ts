
export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
}

export interface Lab {
  id: string;
  title: string;
  overview: string;
  systemPrompt: string;
  initialPrompt: string;
  challenges: string[];
}

export interface UserProgress {
  completedModules: string[];
  completedLabs: string[];
  internshipStage: number;
}
