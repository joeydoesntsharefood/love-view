import React, { createContext, useState, useContext, useEffect } from 'react';
import { en } from '../locales/en';
import { pt } from '../locales/pt';

type Translations = {
  [key: string]: string | Translations;
};

const I18nContext = createContext({
  lang: 'en',
  t: (key: string) => key,
  setLanguage: (lang: string) => {}
});

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<string>('en');
  const [languageData, setLanguageData] = useState<Translations>({});

  useEffect(() => {
    const language = lang === 'en' ? en : pt;
    setLanguageData(language);
  }, [lang]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let translation: any = languageData;

    for (let i = 0; i < keys.length; i++) {
      translation = translation[keys[i]];
      if (!translation) {
        return key;
      }
    }

    return translation;
  };

  return (
    <I18nContext.Provider value={{ lang, t, setLanguage: setLang }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
