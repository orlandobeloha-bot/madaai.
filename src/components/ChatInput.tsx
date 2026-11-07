import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, X, ArrowUp, Mic, MicOff, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  currentLanguage: Language;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const baseInputRef = useRef<string>('');

  // Auto-resize textarea based on input content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        140
      )}px`;
    }
  }, [input]);

  // Check Web Speech API availability on mount
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSpeechSupported(false);
    }
  }, []);

  // Stop speech recognition when component unmounts or language changes
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignored
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  // Toggle Voice Input
  const toggleListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError(t.speechNotSupported);
      setTimeout(() => setSpeechError(null), 4000);
      return;
    }

    if (isListening) {
      stopListening();
      return;
    }

    try {
      setSpeechError(null);
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = true;
      recognition.interimResults = true;

      // Select speech language
      if (currentLanguage === 'mg') {
        recognition.lang = 'mg-MG';
      } else if (currentLanguage === 'fr') {
        recognition.lang = 'fr-FR';
      } else {
        recognition.lang = 'en-US';
      }

      baseInputRef.current = input;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }

        const prefix = baseInputRef.current ? `${baseInputRef.current} ` : '';
        setInput(`${prefix}${transcript}`.trim());
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setSpeechError(
            currentLanguage === 'mg'
              ? 'Tsy nahazo alalana hampiasa ny mikrô. Azafady ekeo ny fahazoan-dàlana.'
              : currentLanguage === 'fr'
              ? 'Accès au microphone refusé. Veuillez autoriser le microphone.'
              : 'Microphone access denied. Please grant permission in your browser.'
          );
        } else if (event.error === 'no-speech') {
          // Ignored
        } else {
          setSpeechError(`Speech error: ${event.error}`);
        }
        setTimeout(() => setSpeechError(null), 5000);
        stopListening();
      };

      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognition.start();
    } catch (err: any) {
      console.error('Failed to start speech recognition:', err);
      setSpeechError(err.message || 'Could not start voice recognition.');
      setTimeout(() => setSpeechError(null), 4000);
      setIsListening(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (isListening) {
      stopListening();
    }

    onSendMessage(input.trim());
    setInput('');
    baseInputRef.current = '';
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const clearInput = () => {
    setInput('');
    baseInputRef.current = '';
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
  };

  return (
    <div className="border-t border-neutral-200/80 dark:border-neutral-800/80 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md p-3 sm:p-4">
      <div className="max-w-4xl mx-auto space-y-2">
        {/* Active Speech Recognition Banner */}
        {isListening && (
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 animate-in fade-in slide-in-from-bottom-1 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              <span className="font-semibold">{t.listening}</span>
              <div className="hidden sm:flex items-center gap-0.5 ml-2">
                <span className="w-1 h-3 rounded-full bg-red-400 animate-pulse [animation-delay:-0.3s]" />
                <span className="w-1 h-4 rounded-full bg-red-500 animate-pulse [animation-delay:-0.15s]" />
                <span className="w-1 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="w-1 h-4 rounded-full bg-red-500 animate-pulse [animation-delay:-0.2s]" />
              </div>
            </div>

            <button
              type="button"
              onClick={stopListening}
              className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium text-[11px] transition-colors cursor-pointer"
            >
              {t.stopListening}
            </button>
          </div>
        )}

        {/* Speech Error Banner */}
        {speechError && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 text-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="flex-1">{speechError}</span>
            <button
              onClick={() => setSpeechError(null)}
              className="p-1 hover:text-amber-950 dark:hover:text-amber-100 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Input Form */}
        <form
          onSubmit={handleSubmit}
          className={`relative flex items-end gap-2 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border p-2 sm:p-2.5 transition-all shadow-xs ${
            isListening
              ? 'border-red-400 dark:border-red-600 ring-2 ring-red-400/20'
              : 'border-neutral-300 dark:border-neutral-800 focus-within:border-emerald-500 dark:focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20'
          }`}
        >
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? t.listening : t.inputPlaceholder}
            disabled={isLoading}
            className="flex-1 max-h-36 min-h-[24px] resize-none bg-transparent text-sm sm:text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden px-2 py-1 leading-relaxed"
          />

          {/* Clear button if text is present */}
          {input.length > 0 && !isLoading && (
            <button
              type="button"
              onClick={clearInput}
              className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors cursor-pointer shrink-0"
              title="Clear text"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Voice Speech Recognition Button */}
          <button
            type="button"
            onClick={toggleListening}
            disabled={isLoading || !isSpeechSupported}
            className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all cursor-pointer shrink-0 active:scale-95 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-sm shadow-red-500/30 animate-pulse'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-neutral-800'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
            title={
              !isSpeechSupported
                ? t.speechNotSupported
                : isListening
                ? t.stopListening
                : t.startListening
            }
            aria-label={t.voiceInput}
          >
            {isListening ? (
              <MicOff className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            ) : (
              <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium shadow-sm shadow-emerald-600/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0 active:scale-95"
            title={t.send}
          >
            {isLoading ? (
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            ) : (
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            )}
          </button>
        </form>

        {/* Input Footer Note & Keyboard Hint */}
        <div className="flex items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500 px-1">
          <span className="hidden sm:inline">
            {currentLanguage === 'mg'
              ? 'Tsarovy: tsindrio ny Enter handefasana, na tsindrio ny mikrô hitenenana'
              : currentLanguage === 'fr'
              ? 'Appuyez sur Entrée pour envoyer ou utilisez le micro'
              : 'Press Enter to send or use the microphone to speak'}
          </span>
          <span className="sm:hidden text-[10px]">MadaAI v1.0 • Multilingual AI</span>
          <div className="flex items-center gap-2">
            {input.length > 0 && (
              <span>
                {input.length} {t.charCount}
              </span>
            )}
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              🇲🇬 Malagasy Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
