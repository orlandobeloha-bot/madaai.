import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  Zap,
  Globe,
  Shield,
  Smartphone,
  Database,
  Cloud,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Heart,
  Bot,
  ExternalLink,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface LandingPageProps {
  onStartChat: (initialPrompt?: string) => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartChat,
  currentLanguage,
  onLanguageChange,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const featureIcons = [
    <Globe key="1" className="w-6 h-6 text-emerald-500" />,
    <Bot key="2" className="w-6 h-6 text-teal-500" />,
    <Shield key="3" className="w-6 h-6 text-emerald-600" />,
    <Smartphone key="4" className="w-6 h-6 text-teal-600" />,
    <Database key="5" className="w-6 h-6 text-emerald-500" />,
    <Cloud key="6" className="w-6 h-6 text-teal-500" />,
  ];

  const features = [
    { title: t.landing.feature1Title, desc: t.landing.feature1Desc },
    { title: t.landing.feature2Title, desc: t.landing.feature2Desc },
    { title: t.landing.feature3Title, desc: t.landing.feature3Desc },
    { title: t.landing.feature4Title, desc: t.landing.feature4Desc },
    { title: t.landing.feature5Title, desc: t.landing.feature5Desc },
    { title: t.landing.feature6Title, desc: t.landing.feature6Desc },
  ];

  const demoPrompts = [
    {
      title: currentLanguage === 'mg' ? 'Tantara & Kolontsaina' : 'Culture & Histoire',
      prompt: t.landing.demoPrompt1,
      tag: 'Madagasikara',
    },
    {
      title: currentLanguage === 'mg' ? 'Kaody & Fandaharana' : 'Développement Web',
      prompt: t.landing.demoPrompt2,
      tag: 'TypeScript / React',
    },
    {
      title: currentLanguage === 'mg' ? 'Fanoratana Taratasy' : 'Rédaction Pro',
      prompt: t.landing.demoPrompt3,
      tag: 'Karama & Asa',
    },
    {
      title: currentLanguage === 'mg' ? 'Fandraharahana Lavanila' : 'Business & Export',
      prompt: t.landing.demoPrompt4,
      tag: 'Fambolena',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300/60 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t.landing.heroBadge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none">
            <span>{t.landing.heroTitle1} </span>
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent">
              {t.landing.heroTitleAccent}
            </span>
            <br />
            <span>{t.landing.heroTitle2}</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            {t.landing.heroDesc}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onStartChat()}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer"
            >
              <span>{t.landing.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#features"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 text-neutral-800 dark:text-neutral-200 font-semibold text-sm transition-all shadow-xs"
            >
              <span>{t.landing.ctaSecondary}</span>
            </a>
          </div>

          {/* Statistics Strip */}
          <div className="pt-10 grid grid-cols-3 gap-3 sm:gap-6 border-t border-neutral-200/80 dark:border-neutral-800/80 max-w-2xl mx-auto">
            <div className="text-center p-3 rounded-2xl bg-white/60 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/60">
              <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {t.landing.statsUsers}
              </p>
              <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {t.landing.statsUsersLabel}
              </p>
            </div>
            <div className="text-center p-3 rounded-2xl bg-white/60 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/60">
              <p className="text-xl sm:text-2xl font-black text-teal-600 dark:text-teal-400">
                {t.landing.statsLanguages}
              </p>
              <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {t.landing.statsLanguagesLabel}
              </p>
            </div>
            <div className="text-center p-3 rounded-2xl bg-white/60 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/60">
              <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {t.landing.statsLatency}
              </p>
              <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {t.landing.statsLatencyLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Prompt Showcase Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-neutral-100/60 dark:bg-neutral-900/50 border-y border-neutral-200/80 dark:border-neutral-800/80">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.landing.interactiveTitle}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {t.landing.interactiveSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {demoPrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onStartChat(item.prompt)}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400">
                      {item.tag}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
                    "{item.prompt}"
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-4 group-hover:translate-x-1 transition-transform">
                  <span>{currentLanguage === 'mg' ? 'Hanontany izao' : 'Tester maintenant'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {t.features}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">
            {currentLanguage === 'mg'
              ? 'Namboarina Manokana ho an’ny Fahombiazanao'
              : 'Conçu Spécifiquement pour Vos Besoins'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs hover:border-emerald-500/40 transition-colors space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                {featureIcons[idx]}
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Architecture & Cloudflare Readiness */}
      <section className="py-14 px-4 sm:px-6 bg-gradient-to-br from-emerald-950/30 via-neutral-900 to-neutral-950 border-y border-neutral-800 text-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Production Ready Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.landing.techTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {t.landing.techDesc}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              {['React 19', 'TypeScript', 'Tailwind CSS', 'Google Gemini 3.8', 'OpenRouter API', 'Cloudflare Pages Functions'].map(
                (badge, bIdx) => (
                  <span
                    key={bIdx}
                    className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-200 text-xs font-mono font-medium border border-neutral-700"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={() => onStartChat()}
              className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-extrabold text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t.startChatting}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {t.faq}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">
            {t.landing.faqTitle}
          </h2>
        </div>

        <div className="space-y-3">
          {t.landing.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-850"
              >
                <span>{faq.q}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0 ml-2" />
                )}
              </button>
              {openFaqIndex === idx && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80">
                  <p className="mt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-10 px-4 sm:px-6 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs">
              M
            </div>
            <span className="font-extrabold text-sm tracking-tight text-neutral-900 dark:text-white">
              MadaAI
            </span>
            <span className="text-neutral-400 text-xs">•</span>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {t.landing.footerDesc}
            </p>
          </div>

          <p className="text-xs text-neutral-400">
            {t.landing.footerRights}
          </p>
        </div>
      </footer>
    </div>
  );
};
