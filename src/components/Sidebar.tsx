import React, { useState } from 'react';
import {
  Plus,
  MessageSquare,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  AlertTriangle,
  Github,
  Cloud,
  ChevronLeft,
} from 'lucide-react';
import { Conversation, Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  onClearAllConversations: () => void;
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onRenameConversation,
  onClearAllConversations,
  isOpen,
  onClose,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startRename = (conv: Conversation, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(conv.id);
    setEditingTitle(conv.title);
  };

  const saveRename = (id: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (editingTitle.trim()) {
      onRenameConversation(id, editingTitle.trim());
    }
    setEditingId(null);
  };

  const cancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteConversation(id);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 sm:w-80 bg-neutral-50 dark:bg-neutral-900/95 border-r border-neutral-200 dark:border-neutral-800 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-3.5 border-b border-neutral-200 dark:border-neutral-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {t.history} ({conversations.length})
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 md:hidden cursor-pointer"
              title="Close sidebar"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => {
              onNewConversation();
              if (window.innerWidth < 768) onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-sm shadow-sm shadow-emerald-600/20 active:scale-[0.99] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.newChat}</span>
          </button>

          {/* Search conversations input */}
          {conversations.length > 3 && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentLanguage === 'mg' ? 'Hitady resaka...' : 'Rechercher...'}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          )}
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-10 px-4 text-neutral-400 dark:text-neutral-500">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40 stroke-1" />
              <p className="text-xs font-medium">{t.noConversations}</p>
              <p className="text-[11px] mt-1">{t.noConversationsSub}</p>
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isActive = conv.id === activeConversationId;
              const isEditing = editingId === conv.id;

              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    if (!isEditing) {
                      onSelectConversation(conv.id);
                      if (window.innerWidth < 768) onClose();
                    }
                  }}
                  className={`group relative flex items-center justify-between p-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-950 dark:text-emerald-200 border border-emerald-500/30 font-medium'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <MessageSquare
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-400'
                      }`}
                    />

                    {isEditing ? (
                      <form
                        onSubmit={(e) => saveRename(conv.id, e)}
                        className="flex items-center gap-1 flex-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          className="w-full px-1.5 py-0.5 text-xs bg-white dark:bg-neutral-800 rounded border border-emerald-500 text-neutral-900 dark:text-white focus:outline-hidden"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="p-1 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                          title={t.save}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={cancelRename}
                          className="p-1 hover:text-red-500 cursor-pointer"
                          title={t.cancel}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    ) : (
                      <div className="min-w-0 flex-1">
                        <p className="truncate leading-tight font-medium">{conv.title}</p>
                        <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                          {formatDate(conv.updatedAt)} • {conv.messages.length} msg
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons (Rename & Delete) */}
                  {!isEditing && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => startRename(conv, e)}
                        className="p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/60 rounded cursor-pointer"
                        title={t.rename}
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(conv.id, e)}
                        className="p-1 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded cursor-pointer"
                        title={t.delete}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2 bg-neutral-100/50 dark:bg-neutral-950/40">
          {conversations.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs text-neutral-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearHistory}</span>
            </button>
          )}

          {/* Cloudflare & GitHub Readiness pill */}
          <div className="flex items-center justify-between pt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1">
              <Cloud className="w-3.5 h-3.5 text-amber-500" />
              <span>Cloudflare Pages</span>
            </span>
            <span className="flex items-center gap-1">
              <Github className="w-3.5 h-3.5 text-neutral-400" />
              <span>GitHub Ready</span>
            </span>
          </div>
        </div>
      </aside>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 shadow-2xl">
            <div className="flex items-center gap-3 text-red-500 mb-3">
              <div className="p-2 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                {t.clearHistoryConfirmTitle}
              </h3>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-5">
              {t.clearHistoryConfirmText}
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                onClick={() => {
                  onClearAllConversations();
                  setShowClearConfirm(false);
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                {t.clearHistoryConfirmBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
