import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "../css/burgerMenu.module.css";
import { Link } from 'react-router-dom';
import { useLanguage } from "../components/LanguageContext";
import { AuthContext } from './AuthContext.jsx';

const BurgerMenu = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Создаем ссылку на контейнер меню
  const { language, toggleLanguage } = useLanguage(); // Достаем язык и функцию смены языка

  // Функция переключения состояния меню
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // Закрываем меню
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className={styles.burgerMenuContainer} ref={menuRef}>
      <div
        className={`${styles.burgerIcon} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      >
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      {isOpen && (
        <div className={styles.menu}>
          <ul className={styles.menuList}>
            {isAuthenticated && user ? (
              <Link className={styles.menuLink} to="/user">
                <li className={styles.menuSing}>
                  {language === "ru" ? "Личный кабинет" : "Жеке кабинет"}
                </li>
              </Link>
              ) : (
              <Link className={styles.menuLink} to="/Auth/">
                <li className={styles.menuItem}>
                  {language === "ru" ? "Вход" : "Кіру"}
                </li>
              </Link>
              )
            }
            <Link className={styles.menuLink} to="/">
              <li className={styles.menuItem}>
                {language === "ru" ? "Главная" : "Басты бет"}
              </li>
            </Link>
            <Link className={styles.menuLink} to="/catalog">
              <li className={styles.menuItem}>
                {language === "ru" ? "Каталог" : "Каталог"}
              </li>
            </Link>
            <Link className={styles.menuLink} to="/About">
              <li className={styles.menuItem}>
                {language === "ru" ? "О нас" : "Біз туралы"}
              </li>
            </Link>
            <Link className={styles.menuLink} to="/NewsContainer">
              <li className={styles.menuItem}>
                {language === "ru" ? "Новости" : "Жаңалықтар"}
              </li>
            </Link>
            <Link className={styles.menuLink} to="/Feedback">
              <li className={styles.menuItem}>
                {language === "ru" ? "Обратная связь" : "Кері байланыс"}
              </li>
            </Link>
          </ul>
          {/* Блок переключения языков */}
          <span className={styles.languageSwitcher}>
            <button
              onClick={() => toggleLanguage("ru")}
              className={`${styles.languageButton} ${
                language === "ru" ? styles.active : ""
              }`}
            >
              РУ
            </button>
            <button
              onClick={() => toggleLanguage("kz")}
              className={`${styles.languageButton} ${
                language === "kz" ? styles.active : ""
              }`}
            >
              ҚАЗ
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
