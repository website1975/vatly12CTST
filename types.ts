export enum ContentTab {
  THEORY = 'theory',
  SIMULATION = 'simulation',
  QUIZ = 'quiz',
  CHAT = 'chat'
}

export interface Lesson {
  id: string;
  title: string;
  chapter: string;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index 0-3
  explanation: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface SimulationData {
  title: string;
  description: string;
  scenario: string;
  imageUrl: string;
}