import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

type Language = 'fr' | 'en' | 'wo' | 'sr' | 'es';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: { code: Language; name: string; flag: string }[];
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    welcome: 'Bienvenue sur DiscoverSenegal',
    login: 'Connexion',
    register: 'Inscription',
    dashboard: 'Tableau de bord',
    profile: 'Profil',
    guides: 'Guides',
    events: 'Événements',
    history: 'Histoire & Culture',
    security: 'Sécurité',
    map: 'Carte',
    logout: 'Déconnexion',
    tourist: 'Touriste',
    local: 'Local',
    guide: 'Guide',
    organizer: 'Organisateur',
    admin: 'Administrateur',
    security_agent: 'Agent de sécurité'
  },
  en: {
    welcome: 'Welcome to DiscoverSenegal',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    profile: 'Profile',
    guides: 'Guides',
    events: 'Events',
    history: 'History & Culture',
    security: 'Security',
    map: 'Map',
    logout: 'Logout',
    tourist: 'Tourist',
    local: 'Local',
    guide: 'Guide',
    organizer: 'Organizer',
    admin: 'Administrator',
    security_agent: 'Security Agent'
  },
  wo: {
    welcome: 'Dalal ak DiscoverSenegal',
    login: 'Dugg',
    register: 'Andal',
    dashboard: 'Plateau',
    profile: 'Profil',
    guides: 'Guides',
    events: 'Xamle yi',
    history: 'Taariix ak Aadama',
    security: 'Sécurité',
    map: 'Karte',
    logout: 'Génn',
    tourist: 'Tourist',
    local: 'Mbokk mi',
    guide: 'Guide',
    organizer: 'Organisateur',
    admin: 'Administrateur',
    security_agent: 'Agent sécurité'
  },
  sr: {
    welcome: 'Dalal ak DiscoverSenegal',
    login: 'Dugg',
    register: 'Andal',
    dashboard: 'Plateau',
    profile: 'Profil',
    guides: 'Guides',
    events: 'Xamle yi',
    history: 'Taariix ak Aadama',
    security: 'Sécurité',
    map: 'Karte',
    logout: 'Génn',
    tourist: 'Tourist',
    local: 'Mbokk mi',
    guide: 'Guide',
    organizer: 'Organisateur',
    admin: 'Administrateur',
    security_agent: 'Agent sécurité'
  },
  es: {
    welcome: 'Bienvenido a DiscoverSenegal',
    login: 'Iniciar sesión',
    register: 'Registrarse',
    dashboard: 'Panel',
    profile: 'Perfil',
    guides: 'Guías',
    events: 'Eventos',
    history: 'Historia y Cultura',
    security: 'Seguridad',
    map: 'Mapa',
    logout: 'Cerrar sesión',
    tourist: 'Turista',
    local: 'Local',
    guide: 'Guía',
    organizer: 'Organizador',
    admin: 'Administrador',
    security_agent: 'Agente de seguridad'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fr');

  const availableLanguages = useMemo(() => [
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'wo' as Language, name: 'Wolof', flag: '🇸🇳' },
    { code: 'sr' as Language, name: 'Sérère', flag: '🇸🇳' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' }
  ], []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('discoversenegal_language') as Language;
    if (savedLanguage && availableLanguages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('discoversenegal_language', lang);
  };

  const t = useMemo(() => (key: string): string => {
    return translations[currentLanguage][key] || key;
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};
