import React from 'react';
import styles from '../css/AuthModal.module.css';
import { useLanguage } from '../components/LanguageContext';

const AuthModal = ({ onClose }) => {
  const { language } = useLanguage();
    
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p>
        {language === 'ru' ? 
            'Пожалуйста, авторизуйтесь, чтобы начать читать.' 
            :
            'Оқуды бастау үшін жүйеге кіріңіз.'}
        </p>
        <button className={styles.closeBtn} onClick={onClose}>
            {language === 'ru' ? 'Закрыть' : 'Жабу'}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
