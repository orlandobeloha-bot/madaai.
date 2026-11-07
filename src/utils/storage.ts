import { Conversation, AppSettings, Language, Theme } from '../types';

const CONVERSATIONS_KEY = 'madaai_conversations_v1';
const ACTIVE_CONV_ID_KEY = 'madaai_active_conv_id';
const SETTINGS_KEY = 'madaai_settings_v1';
const THEME_KEY = 'madaai_theme_v1';
const LANGUAGE_KEY = 'madaai_language_v1';
const MODEL_KEY = 'madaai_model_v1';

export const DEFAULT_SETTINGS: AppSettings = {
  apiUrl: '/api/chat',
  customApiKey: '',
  customSystemInstruction: '',
  temperature: 0.7,
  malagasyTone: 'official',
  speechEnabled: true,
};

export const getSavedTheme = (): Theme => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    // Default to system preference or dark
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch {
    // LocalStorage unavailable
  }
  return 'dark';
};

export const saveTheme = (theme: Theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch {
    // Ignore
  }
};

export const getSavedLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved === 'mg' || saved === 'fr' || saved === 'en') return saved;
  } catch {
    // Ignore
  }
  return 'mg'; // Malagasy by default
};

export const saveLanguage = (lang: Language) => {
  try {
    localStorage.setItem(LANGUAGE_KEY, lang);
  } catch {
    // Ignore
  }
};

export const getSavedModel = (): string => {
  try {
    const saved = localStorage.getItem(MODEL_KEY);
    if (saved) return saved;
  } catch {
    // Ignore
  }
  return 'gemini-3.8-flash';
};

export const saveModel = (model: string) => {
  try {
    localStorage.setItem(MODEL_KEY, model);
  } catch {
    // Ignore
  }
};

export const getSavedSettings = (): AppSettings => {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (data) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    }
  } catch {
    // Ignore
  }
  return DEFAULT_SETTINGS;
};

export const saveSettings = (settings: AppSettings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Ignore
  }
};

export const getSavedConversations = (): Conversation[] => {
  try {
    const raw = localStorage.getItem(CONVERSATIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Ignore
  }
  return [];
};

export const saveConversations = (conversations: Conversation[]) => {
  try {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
  } catch {
    // Ignore
  }
};

export const getSavedActiveConvId = (): string | null => {
  try {
    return localStorage.getItem(ACTIVE_CONV_ID_KEY);
  } catch {
    return null;
  }
};

export const saveActiveConvId = (id: string | null) => {
  try {
    if (id) {
      localStorage.setItem(ACTIVE_CONV_ID_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_CONV_ID_KEY);
    }
  } catch {
    // Ignore
  }
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export const createInitialConversation = (lang: Language, model: string): Conversation => {
  const initialWelcomeText: Record<Language, string> = {
    mg: `Manao ahoana tompoko! Faly miarahaba anao eto amin’ny **MadaAI** 🇲🇬.

Izaho dia mpanampy marani-tsaina manokana ho an’i Madagasikara sy izao tontolo izao. Afaka manampy anao amin’ny:
- 📖 **Kolontsaina sy Tantara:** Fahalalana an’i Madagasikara, ohabolana, tantaran’ny fanjakana, ary fomba amam-panao.
- ✍️ **Fanoratana & Fandikana teny:** Fandikana eo amin’ny teny Malagasy, Frantsay, sy Anglisy; fanoratana taratasy ofisialy na tononkalo.
- 💻 **Teknolojia & Kaody:** Fianarana fandaharana (Python, JavaScript, React...), famahana olana ara-kajy mirindra.
- 💼 **Fandraharahana & Fianarana:** Hevitra ho an’ny orinasa, enti-mody, sy fikarohana samihafa.

Inona no tianao horesahintsika na anontaniako anao anio?`,
    fr: `Bonjour et bienvenue sur **MadaAI** 🇲🇬 !

Je suis votre assistant d’intelligence artificielle moderne pour Madagascar et l'international. Je peux vous accompagner sur :
- 🇲🇬 **Culture & Histoire :** Histoire de Madagascar, proverbes malgaches, traditions et patrimoine.
- ✍️ **Rédaction & Traduction :** Traduction instantanée (Malgache ↔ Français ↔ Anglais), lettres professionnelles et synthèses.
- 💻 **Programmation & Technologies :** Python, Web, JavaScript, architectures logicielles et sciences des données.
- 💼 **Entrepreneuriat & Études :** Modèles d'affaires locaux, révisions scolaires et universitaires.

Que souhaitez-vous explorer ou accomplir aujourd'hui ?`,
    en: `Hello and welcome to **MadaAI** 🇲🇬!

I am your modern multilingual AI assistant designed for Madagascar and global minds. Here is how I can assist you:
- 🇲🇬 **Malagasy Heritage & Culture:** Malagasy history, proverbs (ohabolana), customs, and geography.
- ✍️ **Writing & Multilingual Translation:** High-accuracy translation between Malagasy, French, and English.
- 💻 **Software Engineering & Tech:** Code guidance in Python, TypeScript, modern web development, and algorithms.
- 💼 **Business & Learning:** Project planning, brainstorming, and research.

How can I help you today?`,
  };

  const id = generateId();
  const convTitle: Record<Language, string> = {
    mg: 'Fiarahabana voalohany',
    fr: 'Première conversation',
    en: 'Welcome to MadaAI',
  };

  return {
    id,
    title: convTitle[lang],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    model,
    language: lang,
    messages: [
      {
        id: generateId(),
        role: 'assistant',
        content: initialWelcomeText[lang],
        timestamp: Date.now(),
        model,
        provider: 'Google Gemini',
      },
    ],
  };
};
