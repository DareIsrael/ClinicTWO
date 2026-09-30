'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('clinic_lang');
    if (savedLang && ['en', 'fr', 'de', 'es'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang) => {
    if (['en', 'fr', 'de', 'es'].includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem('clinic_lang', lang);
    }
  };

  const t = (key) => {
    const langDict = translations[language] || translations.en;
    if (langDict && key in langDict) return langDict[key];
    if (translations.en && key in translations.en) return translations.en[key];
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return fallback default if rendered outside provider
    return {
      language: 'en',
      setLanguage: () => {},
      t: (key) => (key in translations.en ? translations.en[key] : key)
    };
  }
  return context;
}
