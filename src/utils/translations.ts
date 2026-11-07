import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  subTagline: string;
  chatTitle: string;
  newChat: string;
  history: string;
  noConversations: string;
  noConversationsSub: string;
  clearHistory: string;
  clearHistoryConfirmTitle: string;
  clearHistoryConfirmText: string;
  clearHistoryConfirmBtn: string;
  cancel: string;
  delete: string;
  deleteConfirm: string;
  rename: string;
  save: string;
  modelSelector: string;
  selectModel: string;
  inputPlaceholder: string;
  send: string;
  stop: string;
  copied: string;
  copyText: string;
  regenerate: string;
  readAloud: string;
  speaking: string;
  thinking: string;
  errorGeneric: string;
  retry: string;
  settings: string;
  landingPage: string;
  backToChat: string;
  features: string;
  about: string;
  faq: string;
  startChatting: string;
  exploreFeatures: string;
  changeLanguage: string;
  themeToggle: string;
  lightMode: string;
  darkMode: string;
  modelGroupGoogle: string;
  modelGroupOpenRouter: string;
  customApiTitle: string;
  customApiDesc: string;
  apiUrlLabel: string;
  apiKeyLabel: string;
  apiKeyPlaceholder: string;
  apiKeyNote: string;
  resetDefaults: string;
  savedSuccessfully: string;
  charCount: string;
  voiceInput: string;
  startListening: string;
  stopListening: string;
  listening: string;
  speechNotSupported: string;
  suggestionTitle: string;
  promptSuggestions: {
    title: string;
    prompt: string;
    category: string;
  }[];
  landing: {
    heroBadge: string;
    heroTitle1: string;
    heroTitleAccent: string;
    heroTitle2: string;
    heroDesc: string;
    ctaPrimary: string;
    ctaSecondary: string;
    statsUsers: string;
    statsUsersLabel: string;
    statsLanguages: string;
    statsLanguagesLabel: string;
    statsLatency: string;
    statsLatencyLabel: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
    feature5Title: string;
    feature5Desc: string;
    feature6Title: string;
    feature6Desc: string;
    interactiveTitle: string;
    interactiveSubtitle: string;
    demoPrompt1: string;
    demoPrompt2: string;
    demoPrompt3: string;
    demoPrompt4: string;
    techTitle: string;
    techDesc: string;
    faqTitle: string;
    faqs: { q: string; a: string }[];
    footerRights: string;
    footerDesc: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  mg: {
    appName: 'MadaAI',
    tagline: 'Fitaovana Marani-tsaina ho an’i Madagasikara',
    subTagline: 'Miresaha amin’ny teny Malagasy, Frantsay, na Anglisy. Haingana, marina, ary maoderina.',
    chatTitle: 'Resaka vaovao',
    newChat: 'Resaka vaovao',
    history: 'Tantaran’ny resaka',
    noConversations: 'Mbola tsy misy resaka voatahiry',
    noConversationsSub: 'Manomboka resaka vaovao eto ambany!',
    clearHistory: 'Fafao ny resaka rehetra',
    clearHistoryConfirmTitle: 'Hamafa ny tantara rehetra?',
    clearHistoryConfirmText: 'Tena te hamafa ny resakao rehetra ve ianao? Tsy azo averina intsony izany rehefa voafafa.',
    clearHistoryConfirmBtn: 'Eny, fafao daholo',
    cancel: 'Aoka ihany',
    delete: 'Fafao',
    deleteConfirm: 'Hamafa ity resaka ity ve?',
    rename: 'Ovao anarana',
    save: 'Tahirizo',
    modelSelector: 'Safidio ny Maodely AI',
    selectModel: 'Safidy maodely',
    inputPlaceholder: 'Manontania an’i MadaAI na manorata hafatra eto...',
    send: 'Alefaso',
    stop: 'Atsaharo',
    copied: 'Voakopika!',
    copyText: 'Adikao ny valiny',
    regenerate: 'Valio indray',
    readAloud: 'Vakio mafy',
    speaking: 'Eo am-pamakiana...',
    thinking: 'Eo am-pandinihana ny valiny i MadaAI...',
    errorGeneric: 'Nisy olana ara-teknika teo am-pandraisana ny valiny. Azafady andramo indray.',
    retry: 'Andramo indray',
    settings: 'Fikirakirana',
    landingPage: 'Pejy fandraisana',
    backToChat: 'Hiditra hiresaka',
    features: 'Tombony sy Fahaizana',
    about: 'Momba an’i MadaAI',
    faq: 'Fanontaniana fandre',
    startChatting: 'Manomboka hiresaka maimaimpoana',
    exploreFeatures: 'Hijery ny fahaizany',
    changeLanguage: 'Hanova fiteny',
    themeToggle: 'Hamboatra ny endrika',
    lightMode: 'Mazava',
    darkMode: 'Maizina',
    modelGroupGoogle: 'Maodely Google Gemini',
    modelGroupOpenRouter: 'Maodely OpenRouter',
    customApiTitle: 'Fikirana API sy Endpoint',
    customApiDesc: 'Azonao atao ny mampiasa ny API an’ny MadaAI amin’ny fomba mahazatra na mampitohy amin’ny OpenRouter / Cloudflare Pages / API manokana.',
    apiUrlLabel: 'Adiresy API (URL Endpoint)',
    apiKeyLabel: 'API Key (Safidy ho an’ny OpenRouter na API manokana)',
    apiKeyPlaceholder: 'sk-or-... na API Key hafa',
    apiKeyNote: 'Tsy aseho na alaina an-tsehatra amin’ny kaody eo aloha ny fanalahidinao. Voaaro tsara.',
    resetDefaults: 'Avereno amin’ny mahazatra',
    savedSuccessfully: 'Voatahiry soa aman-tsara!',
    charCount: 'litera',
    voiceInput: 'Fampidirana am-bava',
    startListening: 'Mitenena',
    stopListening: 'Atsaharo ny fihainoana',
    listening: 'Mihaino anao i MadaAI...',
    speechNotSupported: 'Tsy zakan’ity mpitety tranonkala ity ny fihainoana am-bava.',
    suggestionTitle: 'Hevi-panontaniana azon-dàlana',
    promptSuggestions: [
      {
        title: 'Ohabolana Malagasy',
        prompt: 'Mba omeo ohabolana Malagasy 5 miaraka amin’ny hevitra fonosiny sy lesona azo tsoahina.',
        category: 'Kolontsaina',
      },
      {
        title: 'Fandikana teny',
        prompt: 'Ahoana no fandikana ny hoe "Artificial Intelligence accelerates sustainable local development" amin’ny teny Malagasy madio?',
        category: 'Fiteny',
      },
      {
        title: 'Fianarana kaody (Python)',
        prompt: 'Ampianaro ahy ny fomba fanaovana asa tsotra amin’ny Python ho an’ny olona vao manomboka.',
        category: 'Teknolojia',
      },
      {
        title: 'Hevi-draharaha (Business)',
        prompt: 'Mba omeo hevi-draharaha 3 azo atao tsara eto Madagasikara mampiasa teknolojia nomerika sy renivola antonony.',
        category: 'Fandraharahana',
      },
    ],
    landing: {
      heroBadge: 'Ny AI Maoderina ho an’ny Malagasy Rehetra',
      heroTitle1: 'Ny Faharanitan-tsaina',
      heroTitleAccent: 'Artifisialy Voalohany',
      heroTitle2: 'Mahafehy ny Teny Malagasy',
      heroDesc: 'MadaAI dia sehatra AI haingam-pandeha, maoderina, ary natao manokana ho an’ny mpianatra, mpikaroka, mpandraharaha, ary ny olom-pirenena rehetra eto Madagasikara sy maneran-tany.',
      ctaPrimary: 'Andramo hiresaka dieny izao',
      ctaSecondary: 'Hikaroka ny tombontsoa',
      statsUsers: '3 Fiteny',
      statsUsersLabel: 'Malagasy, Français, English',
      statsLanguages: '100% Maimaimpoana',
      statsLanguagesLabel: 'Tsy misy fandoavam-bola takiana',
      statsLatency: '< 1s',
      statsLatencyLabel: 'Haingam-pandeha amin’ny finday',
      feature1Title: 'Fifehezana ny Teny Malagasy',
      feature1Desc: 'Fahalalana lalina ny ohabolana, ny tantara, ary ny fitsipiky ny teny Malagasy tsy misy fangarony.',
      feature2Title: 'Maodely Maro azo Safidiana',
      feature2Desc: 'Mifidiana eo amin’ny Gemini 3.8 Flash, Gemini Lite, ary maodely OpenRouter toy ny DeepSeek R1 sy Llama 3.3.',
      feature3Title: 'Fiarovana sy Fahatokisana',
      feature3Desc: 'Tsy mivoaka any amin’ny mpitety tranonkala ny fanalahidy. Fiarovana avo lenta amin’ny lafiny backend.',
      feature4Title: 'Mety amin’ny Finday sy Solosaina',
      feature4Desc: 'Drafitra maivana sy haingana na dia malemy aza ny tambajotra 3G/4G.',
      feature5Title: 'Tantaran’ny Resaka ao an-toerana',
      feature5Desc: 'Voatahiry am-pilaminana ao amin’ny fitaovanao ny resakao, azo tohizana amin’ny fotoana rehetra.',
      feature6Title: 'Vonona ho an’ny Cloudflare sy GitHub',
      feature6Desc: 'Afaka apetraka maimaimpoana ao amin’ny Cloudflare Pages na alaina amin’ny GitHub.',
      interactiveTitle: 'Jereo amin’ny maso ny Fahaizan’i MadaAI',
      interactiveSubtitle: 'Tsindrio ny iray amin’ireto ohatra ireto mba hitsapana avy hatrany:',
      demoPrompt1: 'Hazavao amiko ny momba ny Rovan’i Manjakamiadana sy ny lanjany ara-tantara.',
      demoPrompt2: 'Ahoana no fomba fampiasana ny React sy TypeScript ho an’ny tranonkala maoderina?',
      demoPrompt3: 'Dikan-teny ofisialy: taratasy fangatahana asa amin’ny teny frantsay.',
      demoPrompt4: 'Hevitra ho an’ny fambolena lavanila sy ny fanondranana azy.',
      techTitle: 'Teknolojia Matanjaka sy Maoderina',
      techDesc: 'Namboarina tamin’ny alalan’ny React 19, TypeScript, Tailwind CSS, Google Gemini 3.8 SDK, ary OpenRouter integration.',
      faqTitle: 'Fanontaniana Fametraky ny Olona Matetika',
      faqs: [
        {
          q: 'Maimaimpoana tokoa ve ny MadaAI?',
          a: 'Eny, maimaimpoana tanteraka ny fampiasana an’i MadaAI miaraka amin’ny maodely Gemini sy ny maodely maimaimpoana an’ny OpenRouter.',
        },
        {
          q: 'Mahay tsara ny teny Malagasy ve i MadaAI?',
          a: 'Eny! Natao manokana i MadaAI mba hahay handray sy hamaly amin’ny teny Malagasy madio, manaja, ary mahafantatra ny ohabolana sy ny fomba amam-panao malagasy.',
        },
        {
          q: 'Aiza no toerana ametrahana ny angon-drakitro?',
          a: 'Ny tantaran’ny resakao dia voatahiry ao amin’ny fitaovanao ihany (LocalStorage), tsy misy antontan-taratasy miafina alefa amin’ny mpizara.',
        },
        {
          q: 'Ahoana no ahafahako mampiasa OpenRouter?',
          a: 'Azonao atao ny misafidy mivantana ireo maodely OpenRouter ao amin’ny menio safidy maodely, na mampiditra ny API Key manokana anao ao amin’ny Fikirakirana (Settings).',
        },
      ],
      footerRights: 'Zo rehetra voatokana. Namboarina tamin’ny fo ho an’i Madagasikara.',
      footerDesc: 'MadaAI — Sehatra mampiroborobo ny fahaizana nomerika sy ny fampiasana ny AI eto Madagasikara.',
    },
  },
  fr: {
    appName: 'MadaAI',
    tagline: 'L’Intelligence Artificielle Moderne pour Madagascar',
    subTagline: 'Discutez en malgache, français ou anglais. Rapide, précis et élégant.',
    chatTitle: 'Nouvelle conversation',
    newChat: 'Nouvelle conversation',
    history: 'Historique des discussions',
    noConversations: 'Aucune conversation enregistrée',
    noConversationsSub: 'Démarrez une nouvelle discussion ci-dessous !',
    clearHistory: 'Effacer tout l’historique',
    clearHistoryConfirmTitle: 'Supprimer tout l’historique ?',
    clearHistoryConfirmText: 'Êtes-vous sûr de vouloir supprimer toutes vos conversations ? Cette action est irréversible.',
    clearHistoryConfirmBtn: 'Oui, tout supprimer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    deleteConfirm: 'Supprimer cette conversation ?',
    rename: 'Renommer',
    save: 'Enregistrer',
    modelSelector: 'Sélectionner un modèle IA',
    selectModel: 'Modèle',
    inputPlaceholder: 'Posez une question à MadaAI ou écrivez votre message...',
    send: 'Envoyer',
    stop: 'Arrêter',
    copied: 'Copié !',
    copyText: 'Copier la réponse',
    regenerate: 'Régénérer',
    readAloud: 'Lecture vocale',
    speaking: 'Lecture en cours...',
    thinking: 'MadaAI réfléchit...',
    errorGeneric: 'Une erreur est survenue lors de la communication avec l’IA. Veuillez réessayer.',
    retry: 'Réessayer',
    settings: 'Paramètres',
    landingPage: 'Accueil & Présentation',
    backToChat: 'Aller au Chat',
    features: 'Fonctionnalités',
    about: 'À propos',
    faq: 'FAQ',
    startChatting: 'Commencer gratuitement',
    exploreFeatures: 'Découvrir les fonctionnalités',
    changeLanguage: 'Changer de langue',
    themeToggle: 'Changer le thème',
    lightMode: 'Clair',
    darkMode: 'Sombre',
    modelGroupGoogle: 'Modèles Google Gemini',
    modelGroupOpenRouter: 'Modèles OpenRouter',
    customApiTitle: 'Configuration API & Endpoint',
    customApiDesc: 'Utilisez le serveur MadaAI par défaut ou connectez vos propres endpoints OpenRouter / Cloudflare Pages.',
    apiUrlLabel: 'URL du point de terminaison API',
    apiKeyLabel: 'Clé API (Optionnelle pour OpenRouter ou API dédiée)',
    apiKeyPlaceholder: 'sk-or-... ou clé API personnalisée',
    apiKeyNote: 'Vos clés ne sont jamais exposées côté client dans le code source.',
    resetDefaults: 'Réinitialiser par défaut',
    savedSuccessfully: 'Enregistré avec succès !',
    charCount: 'caractères',
    voiceInput: 'Saisie vocale',
    startListening: 'Parler',
    stopListening: 'Arrêter l’écoute',
    listening: 'MadaAI vous écoute...',
    speechNotSupported: 'Reconnaissance vocale non supportée par votre navigateur.',
    suggestionTitle: 'Idées de questions pour démarrer',
    promptSuggestions: [
      {
        title: 'Culture & Proverbes',
        prompt: 'Partagez avec moi 5 proverbes malgaches (Ohabolana) avec leur explication détaillée et leur sagesse.',
        category: 'Culture',
      },
      {
        title: 'Traduction précise',
        prompt: 'Traduisez ce texte en malgache formel et naturel : "L’innovation technologique ouvre de nouveaux horizons pour la jeunesse."',
        category: 'Langue',
      },
      {
        title: 'Apprendre à coder',
        prompt: 'Expliquez-moi le fonctionnement des API REST et écrivez un exemple simple en Python.',
        category: 'Technologie',
      },
      {
        title: 'Idées d’entrepreneuriat',
        prompt: 'Proposez 3 opportunités de création de micro-entreprises innovantes adaptées au marché à Madagascar.',
        category: 'Business',
      },
    ],
    landing: {
      heroBadge: 'L’IA Moderne pour Tous à Madagascar',
      heroTitle1: 'La Première IA',
      heroTitleAccent: 'Trilingue & Puissante',
      heroTitle2: 'Conçue pour Madagascar',
      heroDesc: 'MadaAI est un chatbot intelligent, mobile-first et accessible, conçu pour les étudiants, chercheurs, professionnels et curieux.',
      ctaPrimary: 'Essayer le chat maintenant',
      ctaSecondary: 'En savoir plus',
      statsUsers: '3 Langues',
      statsUsersLabel: 'Malgache, Français, Anglais',
      statsLanguages: '100% Gratuit',
      statsLanguagesLabel: 'Sans carte bancaire ni frais cachés',
      statsLatency: '< 1s',
      statsLatencyLabel: 'Ultra-rapide même en 3G/4G',
      feature1Title: 'Excellence en Langue Malgache',
      feature1Desc: 'Compréhension avancée des nuances culturelles, proverbes ancestraux et vocabulaire local.',
      feature2Title: 'Multi-modèles intelligents',
      feature2Desc: 'Accédez à Gemini 3.8 Flash, Gemini Lite et aux modèles OpenRouter comme DeepSeek R1 et Llama 3.3.',
      feature3Title: 'Sécurité et Confidentialité',
      feature3Desc: 'Gestion sécurisée des requêtes côté serveur. Aucune fuite de clé API dans le frontend.',
      feature4Title: 'Design Mobile-First Réactif',
      feature4Desc: 'Une expérience fluide et intuitive sur smartphone, tablette ou ordinateur portable.',
      feature5Title: 'Historique de conversation local',
      feature5Desc: 'Vos discussions sont sauvegardées sur votre propre appareil pour un accès continu hors ligne.',
      feature6Title: 'Prêt pour Cloudflare Pages & GitHub',
      feature6Desc: 'Architecture propre et standardisée pour un déploiement instantané.',
      interactiveTitle: 'Découvrez la puissance de MadaAI',
      interactiveSubtitle: 'Cliquez sur l’un des exemples pour tester immédiatement :',
      demoPrompt1: 'Racontez-moi l’histoire du Rova de Manjakamiadana et son importance patriotique.',
      demoPrompt2: 'Comment créer un composant React moderne et accessible avec Tailwind CSS ?',
      demoPrompt3: 'Rédigez une lettre de motivation professionnelle pour un stage en développement web.',
      demoPrompt4: 'Quels sont les atouts de la vanille de Madagascar et ses canaux d’exportation ?',
      techTitle: 'Une pile technologique moderne et éprouvée',
      techDesc: 'Construit avec React 19, TypeScript, Tailwind CSS, Google Gemini 3.8 SDK et compatibilité OpenRouter.',
      faqTitle: 'Foire Aux Questions',
      faqs: [
        {
          q: 'MadaAI est-il gratuit ?',
          a: 'Oui, l’utilisation de MadaAI avec les modèles Gemini et les modèles OpenRouter gratuits est 100% sans frais.',
        },
        {
          q: 'Le malgache est-il bien pris en charge ?',
          a: 'Absolument ! MadaAI dispose d’un prompt système enrichi capable d’écrire un malgache fluide, respectueux et riche.',
        },
        {
          q: 'Mes conversations sont-elles privées ?',
          a: 'Oui, l’historique des conversations est stocké uniquement dans le navigateur (LocalStorage) de votre propre appareil.',
        },
        {
          q: 'Puis-je l’utiliser avec ma propre clé OpenRouter ?',
          a: 'Oui, rendez-vous dans les Paramètres pour renseigner votre clé API ou votre URL d’endpoint personnalisée.',
        },
      ],
      footerRights: 'Tous droits réservés. Conçu avec passion pour Madagascar.',
      footerDesc: 'MadaAI — Promouvoir l’innovation numérique et l’accès à l’intelligence artificielle.',
    },
  },
  en: {
    appName: 'MadaAI',
    tagline: 'Modern AI Intelligence for Madagascar & the World',
    subTagline: 'Chat fluently in Malagasy, French, or English. Fast, accurate, and beautifully crafted.',
    chatTitle: 'New Conversation',
    newChat: 'New Conversation',
    history: 'Conversation History',
    noConversations: 'No conversations yet',
    noConversationsSub: 'Start a fresh conversation below!',
    clearHistory: 'Clear all history',
    clearHistoryConfirmTitle: 'Clear entire chat history?',
    clearHistoryConfirmText: 'Are you sure you want to delete all stored conversations? This action cannot be undone.',
    clearHistoryConfirmBtn: 'Yes, clear all',
    cancel: 'Cancel',
    delete: 'Delete',
    deleteConfirm: 'Delete this conversation?',
    rename: 'Rename',
    save: 'Save',
    modelSelector: 'Select AI Model',
    selectModel: 'Model',
    inputPlaceholder: 'Ask MadaAI anything or type a prompt...',
    send: 'Send',
    stop: 'Stop',
    copied: 'Copied!',
    copyText: 'Copy answer',
    regenerate: 'Regenerate',
    readAloud: 'Read Aloud',
    speaking: 'Speaking...',
    thinking: 'MadaAI is thinking...',
    errorGeneric: 'An error occurred while contacting the AI service. Please try again.',
    retry: 'Retry',
    settings: 'Settings',
    landingPage: 'Landing Page',
    backToChat: 'Open Chat App',
    features: 'Features',
    about: 'About',
    faq: 'FAQ',
    startChatting: 'Start Chatting Free',
    exploreFeatures: 'Explore Features',
    changeLanguage: 'Language',
    themeToggle: 'Toggle Theme',
    lightMode: 'Light',
    darkMode: 'Dark',
    modelGroupGoogle: 'Google Gemini Models',
    modelGroupOpenRouter: 'OpenRouter Models',
    customApiTitle: 'API & Endpoint Configuration',
    customApiDesc: 'Use MadaAI’s built-in secure server or connect custom OpenRouter / Cloudflare Pages endpoints.',
    apiUrlLabel: 'API Endpoint URL',
    apiKeyLabel: 'API Key (Optional for OpenRouter or custom API)',
    apiKeyPlaceholder: 'sk-or-... or custom API key',
    apiKeyNote: 'API keys are handled securely and never leaked to frontend client code.',
    resetDefaults: 'Reset to Defaults',
    savedSuccessfully: 'Settings saved successfully!',
    charCount: 'characters',
    voiceInput: 'Voice input',
    startListening: 'Speak',
    stopListening: 'Stop listening',
    listening: 'MadaAI is listening...',
    speechNotSupported: 'Speech recognition is not supported in this browser.',
    suggestionTitle: 'Quick suggestions to try',
    promptSuggestions: [
      {
        title: 'Malagasy Proverbs',
        prompt: 'Please provide 5 traditional Malagasy proverbs (Ohabolana) with their cultural meaning and life lessons.',
        category: 'Culture',
      },
      {
        title: 'Accurate Translation',
        prompt: 'Translate the following into clear, polite Malagasy: "Sustainable technology empowers local communities to thrive."',
        category: 'Language',
      },
      {
        title: 'Coding Mentorship',
        prompt: 'Explain the difference between SQL and NoSQL databases with practical examples in TypeScript.',
        category: 'Technology',
      },
      {
        title: 'Business in Madagascar',
        prompt: 'What are 3 emerging digital business opportunities in Madagascar suited for local entrepreneurs?',
        category: 'Business',
      },
    ],
    landing: {
      heroBadge: 'Modern AI for Madagascar & Global Users',
      heroTitle1: 'Next-Generation',
      heroTitleAccent: 'Multilingual AI Chatbot',
      heroTitle2: 'Native Malagasy Support',
      heroDesc: 'MadaAI delivers high-speed, culturally grounded artificial intelligence. Designed with a mobile-first philosophy for students, researchers, developers, and businesses.',
      ctaPrimary: 'Start Chatting Now',
      ctaSecondary: 'Discover Features',
      statsUsers: '3 Languages',
      statsUsersLabel: 'Malagasy, French, English',
      statsLanguages: '100% Free',
      statsLanguagesLabel: 'No credit card or paid tiers needed',
      statsLatency: '< 1s',
      statsLatencyLabel: 'Optimized for mobile 3G/4G/5G',
      feature1Title: 'Native Malagasy Understanding',
      feature1Desc: 'Deep contextual grasp of Malagasy grammar, traditional proverbs (Ohabolana), and regional nuances.',
      feature2Title: 'Multi-Model Switcher',
      feature2Desc: 'Seamlessly switch between Gemini 3.8 Flash, Gemini Lite, and OpenRouter models like DeepSeek R1 and Llama 3.3.',
      feature3Title: 'Zero Key Exposure & Privacy',
      feature3Desc: 'API keys are strictly managed on the server side with zero client-side credential exposure.',
      feature4Title: 'Mobile-First Responsive Interface',
      feature4Desc: 'Silky smooth mobile drawer, intuitive message bubbles, tactile controls, and dark/light modes.',
      feature5Title: 'Persistent Local History',
      feature5Desc: 'All conversations stay securely on your device with instant search, rename, and clear controls.',
      feature6Title: 'Ready for Cloudflare & GitHub',
      feature6Desc: 'Clean project architecture prepared for one-click deployment on Cloudflare Pages and GitHub.',
      interactiveTitle: 'Experience MadaAI in Action',
      interactiveSubtitle: 'Click any query below to launch directly into the chat interface:',
      demoPrompt1: 'Explain the history and significance of the Rova of Manjakamiadana.',
      demoPrompt2: 'How do you build a responsive full-stack web application in 2026?',
      demoPrompt3: 'Draft a professional business partnership email in French.',
      demoPrompt4: 'What makes Madagascar vanilla unique and what are its market trends?',
      techTitle: 'Built with Modern Web Standards',
      techDesc: 'Powered by React 19, TypeScript, Tailwind CSS, Google Gemini 3.8 SDK, and OpenRouter integration.',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          q: 'Is MadaAI really free to use?',
          a: 'Yes, MadaAI is free to use with Google Gemini and OpenRouter free-tier models.',
        },
        {
          q: 'How good is the Malagasy language output?',
          a: 'MadaAI is specially tuned with Malagasy linguistic prompts, allowing it to generate natural, grammatically correct, and respectful Malagasy text.',
        },
        {
          q: 'Where are my conversations stored?',
          a: 'Your chat history is stored strictly in your browser’s LocalStorage. It remains private to your device.',
        },
        {
          q: 'Can I connect my own OpenRouter API key?',
          a: 'Yes! Open Settings to add your personal OpenRouter API key or a custom endpoint URL at any time.',
        },
      ],
      footerRights: 'All rights reserved. Built with pride for Madagascar.',
      footerDesc: 'MadaAI — Empowering digital literacy and AI accessibility worldwide.',
    },
  },
};

export const AI_MODELS: {
  id: string;
  name: string;
  provider: 'Google' | 'OpenRouter' | 'Custom';
  badge: string;
  tag: string;
  description: { mg: string; fr: string; en: string };
  supportsStreaming?: boolean;
  isOpenRouter?: boolean;
  isFree?: boolean;
}[] = [
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash',
    provider: 'Google',
    badge: 'Maimaimpoana • Haingana',
    tag: 'Recommended',
    description: {
      mg: 'Maodely matanjaka indrindra, haingam-pandeha ary mahay teny Malagasy tsara.',
      fr: 'Modèle puissant et rapide, recommandé pour les tâches courantes et le malgache.',
      en: 'Primary recommended model: rapid reasoning, deep Malagasy knowledge, and low latency.',
    },
    supportsStreaming: true,
    isFree: true,
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash Lite',
    provider: 'Google',
    badge: 'Ultra Fast',
    tag: 'Lightweight',
    description: {
      mg: 'Haingam-pandeha tokoa, mety tsara amin’ny finday sy tambajotra miadana.',
      fr: 'Ultra-rapide et économe, parfait pour smartphones et connexions limitées.',
      en: 'Ultra-fast and lightweight, ideal for mobile devices and quick queries.',
    },
    supportsStreaming: true,
    isFree: true,
  },
  {
    id: 'deepseek/deepseek-r1:free',
    name: 'DeepSeek R1',
    provider: 'OpenRouter',
    badge: 'OpenRouter Free',
    tag: 'Reasoning',
    description: {
      mg: 'Maodely fandinihana lalina (reasoning) amin’ny OpenRouter.',
      fr: 'Modèle de raisonnement avancé accessible via OpenRouter.',
      en: 'High-power reasoning model via OpenRouter API.',
    },
    supportsStreaming: true,
    isOpenRouter: true,
    isFree: true,
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    name: 'Llama 3.3 70B',
    provider: 'OpenRouter',
    badge: 'OpenRouter Free',
    tag: 'Versatile',
    description: {
      mg: 'Maodely goavana an’i Meta, mahay zavatra maro sy fandikana teny.',
      fr: 'Modèle phare de Meta, réputé pour sa polyvalence et ses capacités linguistiques.',
      en: 'Meta flagship open model, excellent at general intelligence and versatile knowledge.',
    },
    supportsStreaming: true,
    isOpenRouter: true,
    isFree: true,
  },
  {
    id: 'mistralai/mistral-7b-instruct:free',
    name: 'Mistral 7B',
    provider: 'OpenRouter',
    badge: 'OpenRouter Free',
    tag: 'Efficient',
    description: {
      mg: 'Maodely kanto amin’ny teny frantsay sy kaody.',
      fr: 'Excellence en langue française, logique et programmation.',
      en: 'Renowned for French language precision, coding, and succinct answers.',
    },
    supportsStreaming: true,
    isOpenRouter: true,
    isFree: true,
  },
];
