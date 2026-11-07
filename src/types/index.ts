export type Language = 'mg' | 'fr' | 'en';

export type Theme = 'light' | 'dark';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  model?: string;
  provider?: string;
  error?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  model: string;
  language: Language;
}

export interface AIModel {
  id: string;
  name: string;
  provider: 'Google' | 'OpenRouter' | 'Custom';
  badge: string;
  tag: string;
  description: {
    mg: string;
    fr: string;
    en: string;
  };
  supportsStreaming?: boolean;
  isOpenRouter?: boolean;
  isFree?: boolean;
}

export interface AppSettings {
  apiUrl: string;
  customApiKey: string;
  customSystemInstruction: string;
  temperature: number;
  malagasyTone: 'official' | 'casual' | 'youth';
  speechEnabled: boolean;
}
