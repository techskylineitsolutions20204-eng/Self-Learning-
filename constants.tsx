
import { Module, Lab, CareerTrack, TrackCategory } from './types';

export const TECHSKYLINE_INFO = {
  est: '2024',
  version: 'v2026',
  director: 'Abhinav Joseph',
  contacts: {
    whatsapp: '+91 81062 43684',
    usa: '+1 (408) 614-0468',
    email: 'techskylineitsolutions20204@gmail.com'
  },
  activeTracks: 20,
  locations: ['Silicon Valley, USA', 'Hyderabad, India']
};

export const MASTERY_MATRIX: TrackCategory[] = [
  {
    title: 'Agentic & Gen AI',
    demand: 'Critical',
    icon: 'Sparkles',
    items: ['Agentic AI Workflows', 'Generative AI Engineering', 'Multi-Agent Systems', 'Neural Orchestration']
  },
  {
    title: 'SAP S/4HANA Ecosystem',
    demand: 'High',
    icon: 'Layers',
    items: ['SAP H/4 HANA', 'SAP Ariba Procurement', 'SAP IBP & OBP', 'Enterprise Workflows']
  },
  {
    title: 'Oracle & Project Ctrl',
    demand: 'Global',
    icon: 'Target',
    items: ['Oracle Primavera Unifier', 'Oracle P6 Professional', 'Workday HCM', 'Resource Mgmt']
  },
  {
    title: 'Infrastructure & Security',
    demand: 'High',
    icon: 'Shield',
    items: ['AWS & Azure DevOps', 'Google Cloud Security', 'Cyber Security Ops', 'Edge 5G']
  },
  {
    title: 'Automation & Robotics',
    demand: 'Extreme',
    icon: 'Cpu',
    items: ['RPA Workflows', 'Industrial Robotics', 'IOT Integration', 'Neural Control']
  },
  {
    title: 'Strategic Analytics',
    demand: 'Critical',
    icon: 'BarChart',
    items: ['Power BI Analytics', 'Tableau Reporting', 'Scrum Master', 'Product Mgmt']
  }
];

export const TRACK_DETAILS = {
  'AI & Data Intelligence': ['AI with Data Science', 'Foundation of AI', 'AI Automation', 'Python for AI', 'Neural Networks', 'Predictive Modeling'],
  'Enterprise ERP & Cloud': ['SAP S/4HANA', 'SAP Ariba', 'SAP IBP & OBP', 'Workday HCM', 'AWS Cloud Architecture', 'Azure DevOps'],
  'Oracle & Analytics': ['Oracle Primavera Unifier', 'Oracle P6 Professional', 'Tableau Analytics', 'Power BI Reporting', 'Strategic SQL', 'Big Data Hub'],
  'Emerging Tech & Security': ['IOT & Edge 5G', 'RPA & Robotics', 'Google Cloud Security', 'Cyber Security Ops', 'Scrum Master', 'Product Management']
};

export const TRACK_RECOMMENDATIONS: Record<string, string[]> = {
  'Data Analyst': ['data-ai', 'ai-basics'],
  'AI Engineer': ['ai-agents', 'prompt-engineering'],
  'Prompt Specialist': ['prompt-engineering', 'ai-basics'],
  'SAP Specialist': ['use-cases']
};

export const MODULES: Module[] = [
  {
    id: 'ai-basics',
    title: 'Module 1: AI Basics',
    order: 1,
    description: 'Understanding the fundamentals of Generative AI and LLMs.',
    skills: ['GenAI Fundamentals', 'LLM Architecture'],
    credits: 1.0,
    content: `
      ## What is Generative AI?
      Generative AI refers to a category of artificial intelligence that can create new content, such as text, images, audio, and video. Unlike traditional AI that analyzes existing data, GenAI uses deep learning models to generate original outputs based on training data patterns.

      ### Key Concepts:
      - **Large Language Models (LLMs):** AI trained on massive text datasets.
      - **Neural Networks:** The underlying architecture mimicking human brain neurons.
      - **Training vs Inference:** Learning from data vs. making predictions.
    `
  }
];

export const LABS: Lab[] = [
  {
    id: 'lab-prompt',
    title: 'Prompt Engineering - Live Practice',
    overview: 'Learn by editing and running prompts in real time. Experiment with different roles and constraints.',
    systemPrompt: 'You are a professional AI trainer.',
    initialPrompt: 'Explain Generative AI to a beginner.\nProvide 3 real-world examples.',
    challenges: [
      'Change the audience to "working professionals"',
      'Add output in bullet points',
      'Limit output to 150 words'
    ]
  }
];

export const INTERNSHIP_ROADMAP = [
  { week: 1, title: 'AI Basics + Prompt Labs', status: 'Core' },
  { week: 2, title: 'Agent Design Labs', status: 'Advanced' },
  { week: 3, title: 'Industry Use-Case Study', status: 'Specialization' },
  { week: 4, title: 'Final AI Project & Demo', status: 'Certification' }
];

export const CORE_SKILLS = [
  'Prompt Design',
  'Agentic Logic',
  'Data Literacy',
  'Enterprise Strategy',
  'Ethics & Compliance'
];
