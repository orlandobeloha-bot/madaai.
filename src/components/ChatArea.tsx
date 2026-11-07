import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  RotateCw,
  Volume2,
  VolumeX,
  AlertCircle,
  User,
  Share2,
} from 'lucide-react';
import { Conversation, Language, Message } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ChatAreaProps {
  conversation: Conversation | null;
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onRegenerate: () => void;
  currentLanguage: Language;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  conversation,
  isLoading,
  onSendMessage,
  onRegenerate,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages, isLoading]);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const handleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean text of markdown characters for cleaner speech
    const cleanText = text
      .replace(/```[\s\S]*?```/g, 'Code block omitted.')
      .replace(/[*#`_~]/g, '')
      .slice(0, 500); // limit sample

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (currentLanguage === 'mg') {
      // If Malagasy is not natively installed in browser TTS, fall back to French/Italian acoustic mapping or general
      utterance.lang = 'fr-FR';
    } else if (currentLanguage === 'fr') {
      utterance.lang = 'fr-FR';
    } else {
      utterance.lang = 'en-US';
    }

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleShare = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MadaAI Response',
          text: text.slice(0, 500),
        });
      } catch {
        // Ignored
      }
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  const messages = conversation?.messages || [];

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-6 max-w-4xl w-full mx-auto">
      {/* Empty conversation welcome state */}
      {messages.length === 0 ? (
        <div className="py-12 sm:py-16 text-center max-w-xl mx-auto space-y-6 animate-in fade-in zoom-in-95">
          <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 text-white shadow-xl shadow-emerald-500/25">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {t.appName}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md mx-auto">
              {t.subTagline}
            </p>
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="pt-4 text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 text-center">
              {t.suggestionTitle}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {t.promptSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onSendMessage(item.prompt)}
                  className="p-3.5 rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 text-left hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer group"
                >
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 mb-1.5">
                    {item.category}
                  </span>
                  <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {item.prompt}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Conversation Message Bubbles */
        messages.map((message: Message, index: number) => {
          const isUser = message.role === 'user';
          const isLast = index === messages.length - 1;

          return (
            <div
              key={message.id || index}
              className={`flex gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200 ${
                isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* AI Avatar */}
              {!isUser && (
                <div className="relative shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Message Bubble Container */}
              <div
                className={`group relative max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-xs transition-colors ${
                  isUser
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-tr-xs'
                    : message.error
                    ? 'bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200 rounded-tl-xs'
                    : 'bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-tl-xs'
                }`}
              >
                {/* Header tag for AI message */}
                {!isUser && !message.error && (
                  <div className="flex items-center gap-2 mb-2 pb-1 border-b border-neutral-100 dark:border-neutral-800/80 text-[11px] text-neutral-500 dark:text-neutral-400">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">MadaAI</span>
                    {message.model && (
                      <span className="px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[10px]">
                        {message.model}
                      </span>
                    )}
                  </div>
                )}

                {/* Error Banner */}
                {message.error && (
                  <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-red-600 dark:text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>{t.errorGeneric}</span>
                  </div>
                )}

                {/* Body Content */}
                {isUser ? (
                  <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words font-normal">
                    {message.content}
                  </p>
                ) : (
                  <MarkdownRenderer content={message.content} />
                )}

                {/* AI Footer Actions: Copy, Read Aloud, Regenerate */}
                {!isUser && !message.error && (
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-neutral-400 dark:text-neutral-500">
                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(message.id, message.content)}
                      className="flex items-center gap-1 text-[11px] hover:text-neutral-900 dark:hover:text-white px-1.5 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                      title={t.copyText}
                    >
                      {copiedId === message.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500 font-medium">{t.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{t.copyText}</span>
                        </>
                      )}
                    </button>

                    {/* Speech / Read Aloud Button */}
                    <button
                      onClick={() => handleSpeak(message.id, message.content)}
                      className="flex items-center gap-1 text-[11px] hover:text-neutral-900 dark:hover:text-white px-1.5 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                      title={speakingId === message.id ? t.stop : t.readAloud}
                    >
                      {speakingId === message.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                          <span className="text-emerald-500 font-medium">{t.speaking}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{t.readAloud}</span>
                        </>
                      )}
                    </button>

                    {/* Regenerate (only on last AI message) */}
                    {isLast && (
                      <button
                        onClick={onRegenerate}
                        disabled={isLoading}
                        className="flex items-center gap-1 text-[11px] hover:text-neutral-900 dark:hover:text-white px-1.5 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
                        title={t.regenerate}
                      >
                        <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                        <span>{t.regenerate}</span>
                      </button>
                    )}

                    {/* Mobile Share */}
                    <button
                      onClick={() => handleShare(message.content)}
                      className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 ml-auto cursor-pointer"
                      title="Share"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })
      )}

      {/* Loading Animation Indicator */}
      {isLoading && (
        <div className="flex gap-3 sm:gap-4 animate-in fade-in duration-200">
          <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 animate-spin text-white" />
          </div>

          <div className="rounded-2xl rounded-tl-xs px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-bounce" />
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 italic font-medium">
              {t.thinking}
            </span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
