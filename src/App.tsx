import React, { useState, useEffect, useCallback } from 'react';
import { Conversation, Language, Theme, Message, AppSettings } from './types';
import {
  getSavedTheme,
  saveTheme,
  getSavedLanguage,
  saveLanguage,
  getSavedModel,
  saveModel,
  getSavedSettings,
  saveSettings,
  getSavedConversations,
  saveConversations,
  getSavedActiveConvId,
  saveActiveConvId,
  generateId,
  createInitialConversation,
} from './utils/storage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { ChatInput } from './components/ChatInput';
import { SettingsModal } from './components/SettingsModal';
import { LandingPage } from './components/LandingPage';
import { TRANSLATIONS } from './utils/translations';

export default function App() {
  const [theme, setTheme] = useState<Theme>(getSavedTheme);
  const [language, setLanguage] = useState<Language>(getSavedLanguage);
  const [model, setModel] = useState<string>(getSavedModel);
  const [settings, setSettings] = useState<AppSettings>(getSavedSettings);
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = getSavedConversations();
    if (saved.length > 0) return saved;
    const initial = createInitialConversation(getSavedLanguage(), getSavedModel());
    saveConversations([initial]);
    return [initial];
  });
  const [activeConversationId, setActiveConversationId] = useState<string | null>(() => {
    const savedId = getSavedActiveConvId();
    if (savedId) return savedId;
    return conversations[0]?.id || null;
  });

  const [activeView, setActiveView] = useState<'chat' | 'landing'>('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Apply theme class to <html> element
  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  // Persist language changes
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    saveLanguage(newLang);
  };

  // Persist model changes
  const handleModelSelect = (newModel: string) => {
    setModel(newModel);
    saveModel(newModel);
  };

  // Persist settings
  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  // Persist active conversation id
  useEffect(() => {
    saveActiveConvId(activeConversationId);
  }, [activeConversationId]);

  // Current active conversation
  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) || conversations[0] || null;

  // New conversation handler
  const handleNewConversation = useCallback(() => {
    const newConv = createInitialConversation(language, model);
    setConversations((prev) => {
      const updated = [newConv, ...prev];
      saveConversations(updated);
      return updated;
    });
    setActiveConversationId(newConv.id);
    setActiveView('chat');
  }, [language, model]);

  // Delete conversation
  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      saveConversations(filtered);
      if (activeConversationId === id) {
        if (filtered.length > 0) {
          setActiveConversationId(filtered[0].id);
        } else {
          const fresh = createInitialConversation(language, model);
          saveConversations([fresh]);
          setActiveConversationId(fresh.id);
          return [fresh];
        }
      }
      return filtered;
    });
  };

  // Rename conversation
  const handleRenameConversation = (id: string, newTitle: string) => {
    setConversations((prev) => {
      const updated = prev.map((c) =>
        c.id === id ? { ...c, title: newTitle, updatedAt: Date.now() } : c
      );
      saveConversations(updated);
      return updated;
    });
  };

  // Clear all conversations
  const handleClearAllConversations = () => {
    const initial = createInitialConversation(language, model);
    setConversations([initial]);
    saveConversations([initial]);
    setActiveConversationId(initial.id);
  };

  // Send message to AI endpoint
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    let conv = activeConversation;
    if (!conv) {
      conv = createInitialConversation(language, model);
      setConversations([conv]);
      setActiveConversationId(conv.id);
    }

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    // Update conversation title from first user query if still generic
    const isFirstUserMsg = !conv.messages.some((m) => m.role === 'user');
    const updatedTitle = isFirstUserMsg
      ? text.length > 36
        ? `${text.substring(0, 36)}...`
        : text
      : conv.title;

    const newMessages = [...conv.messages, userMessage];

    // Optimistically update conversation state
    setConversations((prev) => {
      const updated = prev.map((c) =>
        c.id === conv.id
          ? {
              ...c,
              title: updatedTitle,
              messages: newMessages,
              updatedAt: Date.now(),
            }
          : c
      );
      saveConversations(updated);
      return updated;
    });

    setIsLoading(true);

    try {
      const targetApiUrl = settings.apiUrl || '/api/chat';

      // Format payload with full history
      const payload = {
        messages: newMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        model,
        language,
        customApiKey: settings.customApiKey || undefined,
        customSystemInstruction: settings.customSystemInstruction || undefined,
      };

      const response = await fetch(targetApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP Error ${response.status}`);
      }

      const data = await response.json();
      const assistantText = data.content || data.reply || data.text || 'No response';

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: assistantText,
        timestamp: Date.now(),
        model: data.model || model,
        provider: data.provider || 'AI',
      };

      setConversations((prev) => {
        const updated = prev.map((c) =>
          c.id === conv.id
            ? {
                ...c,
                messages: [...c.messages, assistantMessage],
                updatedAt: Date.now(),
              }
            : c
        );
        saveConversations(updated);
        return updated;
      });
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content:
          language === 'mg'
            ? `Nisy olana teo am-pandraisana ny valiny: ${err.message || 'Hadalana ara-teknika'}. Azafady andramo indray na jereo ny fikirakirana API.`
            : language === 'fr'
            ? `Une erreur est survenue lors de la communication : ${err.message || 'Erreur technique'}. Veuillez réessayer.`
            : `An error occurred: ${err.message || 'Technical error'}. Please try again or check API settings.`,
        timestamp: Date.now(),
        error: true,
      };

      setConversations((prev) => {
        const updated = prev.map((c) =>
          c.id === conv.id
            ? {
                ...c,
                messages: [...c.messages, errorMessage],
                updatedAt: Date.now(),
              }
            : c
        );
        saveConversations(updated);
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Regenerate last response
  const handleRegenerate = () => {
    if (!activeConversation || isLoading) return;
    const msgs = activeConversation.messages;
    if (msgs.length === 0) return;

    // Find last user message
    const lastUserMsg = [...msgs].reverse().find((m) => m.role === 'user');
    if (!lastUserMsg) return;

    // Remove trailing assistant message if present
    if (msgs[msgs.length - 1].role === 'assistant') {
      const truncated = msgs.slice(0, -1);
      setConversations((prev) => {
        const updated = prev.map((c) =>
          c.id === activeConversation.id ? { ...c, messages: truncated } : c
        );
        saveConversations(updated);
        return updated;
      });
    }

    handleSendMessage(lastUserMsg.content);
  };

  // Start chat with initial prompt from Landing Page
  const handleStartChatWithPrompt = (initialPrompt?: string) => {
    setActiveView('chat');
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans transition-colors overflow-hidden">
      {/* Top Header */}
      <Header
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
        currentTheme={theme}
        onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        currentModel={model}
        onModelSelect={handleModelSelect}
        activeView={activeView}
        onViewChange={setActiveView}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onNewChat={handleNewConversation}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {activeView === 'landing' ? (
          <LandingPage
            onStartChat={handleStartChatWithPrompt}
            currentLanguage={language}
            onLanguageChange={handleLanguageChange}
          />
        ) : (
          <>
            {/* Conversation History Sidebar */}
            <Sidebar
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={(id) => setActiveConversationId(id)}
              onNewConversation={handleNewConversation}
              onDeleteConversation={handleDeleteConversation}
              onRenameConversation={handleRenameConversation}
              onClearAllConversations={handleClearAllConversations}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              currentLanguage={language}
            />

            {/* Chat Conversation Area & Input Bar */}
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-neutral-50 dark:bg-neutral-950">
              <ChatArea
                conversation={activeConversation}
                isLoading={isLoading}
                onSendMessage={handleSendMessage}
                onRegenerate={handleRegenerate}
                currentLanguage={language}
              />

              <ChatInput
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                currentLanguage={language}
              />
            </main>
          </>
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
        currentLanguage={language}
      />
    </div>
  );
}
