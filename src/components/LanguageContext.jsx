import React, { createContext, useState, useContext } from "react";

// Создаем контекст
const LanguageContext = createContext();

// Провайдер для управления языком
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ru"); // ru по умолчанию

  const toggleLanguage = (lang) => {
    setLanguage(lang); // Устанавливаем выбранный язык
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Хук для использования контекста
export const useLanguage = () => useContext(LanguageContext);
