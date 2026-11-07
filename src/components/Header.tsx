import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Sun,
  Moon,
  Sparkles,
  Settings as SettingsIcon,
  Globe,
  ChevronDown,
  Bot,
  Compass,
  MessageSquare,
  Check,
  Plus,
} from 'lucide-react';
import { Language, Theme } from '../types';
import { TRANSLATIONS, AI_MODELS } from '../utils/translations';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: Theme;
  onThemeToggle: () => void;
  currentModel: string;
  onModelSelect: (modelId: string) => void;
  activeView: 'chat' | 'landing';
  onViewChange: (view: 'chat' | 'landing') => void;
  onOpenSettings: () => void;
  onToggleSidebar: () => void;
  onNewChat: () => void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  currentTheme,
  onThemeToggle,
  currentModel,
  onModelSelect,
  activeView,
  onViewChange,
  onOpenSettings,
  onToggleSidebar,
  onNewChat,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  const selectedModel = AI_MODELS.find((m) => m.id === currentModel) || AI_MODELS[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setIsModelOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/85 dark:bg-neutral-950/85 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Left Section: Sidebar Toggle & Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors md:hidden cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => onViewChange('landing')}
            className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              {/* Madagascar flag colored mini accent dot */}
              <div className="absolute -top-1 -right-1 flex gap-0.5 shadow-xs">
                <span className="w-1.5 h-3 rounded-l-xs bg-white border border-neutral-300 dark:border-neutral-700" />
                <div className="flex flex-col">
                  <span className="w-2.5 h-1.5 bg-red-600 rounded-tr-xs" />
                  <span className="w-2.5 h-1.5 bg-emerald-600 rounded-br-xs" />
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-emerald-100" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                  MadaAI
                </span>
                <span className="hidden xs:inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
                  v1.0
                </span>
              </div>
              <p className="hidden md:block text-[10px] text-neutral-500 dark:text-neutral-400 -mt-0.5">
                {currentLanguage === 'mg' ? 'Faharanitan-tsaina Malagasy' : currentLanguage === 'fr' ? 'IA pour Madagascar' : 'AI for Madagascar'}
              </p>
            </div>
          </button>
        </div>

        {/* Center: Model Selector & View Switcher */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* View Switcher: Chat vs Landing */}
          <div className="flex items-center p-0.5 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-medium">
            <button
              onClick={() => onViewChange('chat')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeView === 'chat'
                  ? 'bg-white dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chat</span>
            </button>
            <button
              onClick={() => onViewChange('landing')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeView === 'landing'
                  ? 'bg-white dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{currentLanguage === 'mg' ? 'Pejy Fandraisana' : currentLanguage === 'fr' ? 'Accueil' : 'Landing'}</span>
            </button>
          </div>

          {/* Model Selector Dropdown */}
          <div className="relative" ref={modelRef}>
            <button
              onClick={() => setIsModelOpen(!isModelOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200/70 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 transition-colors cursor-pointer"
              title={t.selectModel}
            >
              <Bot className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="max-w-[85px] sm:max-w-[140px] truncate font-medium">
                {selectedModel.name.replace(' (OpenRouter)', '')}
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {isModelOpen && (
              <div className="absolute right-0 sm:left-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-200 dark:border-neutral-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-800 mb-1">
                  <div className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                    {t.modelSelector}
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {currentLanguage === 'mg'
                      ? 'Safidio ny maodely AI hovaliana ny fanontanianao'
                      : 'Choisissez le modèle d’IA pour répondre'}
                  </p>
                </div>

                <div className="space-y-1 max-h-80 overflow-y-auto p-1">
                  {AI_MODELS.map((model) => {
                    const isSelected = model.id === currentModel;
                    return (
                      <button
                        key={model.id}
                        onClick={() => {
                          onModelSelect(model.id);
                          setIsModelOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60'
                            : 'hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-semibold text-xs text-neutral-900 dark:text-neutral-100">
                              {model.name}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                              {model.provider}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug line-clamp-2">
                            {model.description[currentLanguage]}
                          </p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: New Chat Quick, Language, Theme, Settings */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* New Chat quick button */}
          <button
            onClick={onNewChat}
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs hover:shadow-emerald-600/20 transition-all cursor-pointer"
            title={t.newChat}
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t.newChat}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer border border-neutral-200/80 dark:border-neutral-800"
              aria-label={t.changeLanguage}
            >
              <Globe className="w-3.5 h-3.5 text-neutral-500" />
              <span className="uppercase font-bold tracking-wider text-[11px]">
                {currentLanguage === 'mg' ? '🇲🇬 MG' : currentLanguage === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-200 dark:border-neutral-800 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={() => {
                    onLanguageChange('mg');
                    setIsLangOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left cursor-pointer ${
                    currentLanguage === 'mg'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🇲🇬</span> Malagasy
                  </span>
                  {currentLanguage === 'mg' && <Check className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => {
                    onLanguageChange('fr');
                    setIsLangOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left cursor-pointer ${
                    currentLanguage === 'fr'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🇫🇷</span> Français
                  </span>
                  {currentLanguage === 'fr' && <Check className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => {
                    onLanguageChange('en');
                    setIsLangOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left cursor-pointer ${
                    currentLanguage === 'en'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🇬🇧</span> English
                  </span>
                  {currentLanguage === 'en' && <Check className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* Dark/Light mode toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer border border-neutral-200/80 dark:border-neutral-800"
            title={currentTheme === 'dark' ? t.lightMode : t.darkMode}
            aria-label={t.themeToggle}
          >
            {currentTheme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-700" />
            )}
          </button>

          {/* Settings button */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer border border-neutral-200/80 dark:border-neutral-800"
            title={t.settings}
            aria-label={t.settings}
          >
            <SettingsIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
