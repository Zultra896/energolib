import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import { LanguageProvider } from './components/LanguageContext'; // Импортируем LanguageProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <LanguageProvider> {/* Оборачиваем App в LanguageProvider */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  </React.StrictMode>
);
