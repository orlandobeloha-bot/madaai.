import React, { useState } from 'react';
import {
  X,
  Settings,
  Server,
  Key,
  Sliders,
  RotateCcw,
  Check,
  ShieldCheck,
  Volume2,
} from 'lucide-react';
import { AppSettings, Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { DEFAULT_SETTINGS } from '../utils/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSaveSettings: (settings: AppSettings) => void;
  currentLanguage: Language;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [formData, setFormData] = useState<AppSettings>({ ...settings });
  const [showSavedToast, setShowSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setFormData({ ...DEFAULT_SETTINGS });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                {t.settings}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {t.customApiTitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto py-4 space-y-4">
          {/* Security notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
            <p className="leading-relaxed">{t.apiKeyNote}</p>
          </div>

          {/* API URL Config */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
              <Server className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t.apiUrlLabel}</span>
            </label>
            <input
              type="text"
              value={formData.apiUrl}
              onChange={(e) => setFormData({ ...formData, apiUrl: e.target.value })}
              placeholder="/api/chat"
              className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {currentLanguage === 'mg'
                ? 'Adiresy mpizara andefasana ny hafatra (default: /api/chat na Cloudflare Worker URL).'
                : 'URL du point de terminaison du serveur de chat (/api/chat par défaut).'}
            </p>
          </div>

          {/* Custom API Key for OpenRouter / custom proxy */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
              <Key className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.apiKeyLabel}</span>
            </label>
            <input
              type="password"
              value={formData.customApiKey}
              onChange={(e) => setFormData({ ...formData, customApiKey: e.target.value })}
              placeholder={t.apiKeyPlaceholder}
              className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {currentLanguage === 'mg'
                ? 'Raha manana kaonty OpenRouter ianao dia azonao ampidirina eto ny fanalahidinao.'
                : 'Facultatif : Renseignez votre propre clé OpenRouter pour débloquer tous les modèles tiers.'}
            </p>
          </div>

          {/* Malagasy Tone Selector */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
              <Sliders className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>
                {currentLanguage === 'mg'
                  ? 'Fombam-pitenenana Malagasy'
                  : currentLanguage === 'fr'
                  ? 'Tonalité de réponse en malgache'
                  : 'Malagasy Tone & Style'}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'official', label: currentLanguage === 'mg' ? 'Ofisialy' : 'Formel' },
                { id: 'casual', label: currentLanguage === 'mg' ? 'Tsotra' : 'Naturel' },
                { id: 'youth', label: currentLanguage === 'mg' ? 'Tanora' : 'Moderne' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      malagasyTone: item.id as 'official' | 'casual' | 'youth',
                    })
                  }
                  className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                    formData.malagasyTone === item.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Speech Audio Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                  {currentLanguage === 'mg'
                    ? 'Famakiana amin’ny feo (Audio)'
                    : 'Synthèse vocale (Lecture audio)'}
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {currentLanguage === 'mg'
                    ? 'Mampandeha ny bokotra famakiana ny valin-teny'
                    : 'Active le bouton de lecture à voix haute'}
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={formData.speechEnabled}
              onChange={(e) => setFormData({ ...formData, speechEnabled: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
            />
          </div>

          {/* Custom System Instruction */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
              {currentLanguage === 'mg'
                ? 'Torolàlana fanampiny ho an’ny AI'
                : 'Instructions système personnalisées'}
            </label>
            <textarea
              rows={2}
              value={formData.customSystemInstruction}
              onChange={(e) =>
                setFormData({ ...formData, customSystemInstruction: e.target.value })
              }
              placeholder={
                currentLanguage === 'mg'
                  ? 'Ohatra: Valio fohy foana, na asio ohatra kaody Python foana...'
                  : 'Ex: Toujours synthétiser en 3 points...'
              }
              className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetDefaults}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                {showSavedToast ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>{t.savedSuccessfully}</span>
                  </>
                ) : (
                  <span>{t.save}</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
