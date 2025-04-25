import React, { createContext, useState, useContext } from 'react';
import enTranslations from '../translations/en';
import faTranslations from '../translations/fa';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fa');
  
  const translations = {
    en: enTranslations,
    fa: faTranslations
  };

  const direction = language === 'fa' ? 'rtl' : 'ltr';

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'fa' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, translations, toggleLanguage, direction }}>
      {children}
    </LanguageContext.Provider>
  );
}; 