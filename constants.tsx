
import { Module, Lab } from './types';

export const MODULES: Module[] = [
  {
    id: 'ai-basics',
    title: 'Module 1: AI Basics',
    order: 1,
    description: 'Understanding the fundamentals of Generative AI and LLMs.',
    skills: ['GenAI Fundamentals', 'LLM Architecture'],
    content: `
      ## What is Generative AI?
      Generative AI refers to a category of artificial intelligence that can create new content, such as text, images, audio, and video. Unlike traditional AI that analyzes existing data, GenAI uses deep learning models to generate original outputs based on training data patterns.

      ### Key Concepts:
      - **Large Language Models (LLMs):** AI trained on massive text datasets.
      - **Neural Networks:** The underlying architecture mimicking human brain neurons.
      - **Training vs Inference:** Learning from data vs. making predictions.
    `
  },
  {
    id: 'prompt-engineering',
    title: 'Module 2: Prompt Engineering',
    order: 2,
    description: 'Mastering the art of instruction design for AI models.',
    skills: ['Prompt Design', 'Context Management'],
    content: `
      ## The Core of Prompting
      Prompt Engineering is the practice of designing instructions that guide AI models to produce accurate, useful outputs.

      ### Components of a Perfect Prompt:
      1. **Role:** Who is the AI? (e.g., "You are an AI trainer")
      2. **Task:** What should it do? (e.g., "Explain Quantum Physics")
      3. **Context:** Background info.
      4. **Constraints:** Length, tone, format.
    `
  },
  {
    id: 'ai-agents',
    title: 'Module 3: AI Agents',
    order: 3,
    description: 'Building autonomous agents that can use tools.',
    skills: ['Agentic Logic', 'Tool Integration'],
    content: `
      ## Autonomous Agents
      An AI Agent is more than just a chatbot. It is a system that can perceive its environment, reason, and take actions to achieve goals.

      ### Capabilities:
      - **Tool Use:** Searching the web, calculating math, or running code.
      - **Memory:** Recalling past interactions to inform current decisions.
      - **Planning:** Breaking complex tasks into smaller, executable steps.
    `
  },
  {
    id: 'data-ai',
    title: 'Module 4: Data & AI',
    order: 4,
    description: 'Analyzing datasets and generating insights with AI.',
    skills: ['Data Literacy', 'Insight Extraction'],
    content: `
      ## AI-Driven Data Analysis
      Modern AI can process CSVs, JSONs, and unstructured text to find correlations humans might miss.

      ### Workflow:
      - Clean messy data using AI instructions.
      - Visualize trends via Python code generation.
      - Summarize massive spreadsheets into executive bullet points.
    `
  },
  {
    id: 'use-cases',
    title: 'Module 5: Industry Use-Cases',
    order: 5,
    description: 'Applying AI to solve real-world business problems.',
    skills: ['Enterprise Strategy', 'Ethics & Compliance'],
    content: `
      ## Enterprise AI
      How industries are transforming:
      - **Healthcare:** Diagnostic assistance and record summarization.
      - **Finance:** Fraud detection and market sentiment analysis.
      - **Legal:** Contract review and precedent research.
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
  },
  {
    id: 'lab-agent',
    title: 'AI Agent Design',
    overview: 'Design an agent with a specific role and set of constraints to help users solve problems.',
    systemPrompt: 'You are a Career Guidance Agent.',
    initialPrompt: 'Recommend a free AI learning path for fresh graduates.\nConstraints:\n- Only free tools\n- No paid certifications',
    challenges: [
      'Make the output a step-by-step roadmap',
      'Add a section for "Top 3 LinkedIn Skills" to add',
      'Assume the user has zero coding background'
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
