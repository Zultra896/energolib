import React, { useState, useEffect, useRef } from "react";
import styles from "../css/burgerMenu.module.css";
import { Link } from "react-router-dom";
const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Создаем ссылку на контейнер меню

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
            <Link className={styles.menuLink} to="/catalog">
            <li className={styles.menuItem} >Каталог</li>
            </Link>
            <Link className={styles.menuLink} to="About">
            <li className={styles.menuItem}>О нас</li>
            </Link>
            <Link className={styles.menuLink} to="NewsContainer">
            <li className={styles.menuItem}>Новости</li>
            </Link>
            <Link className={styles.menuLink} to="">
            <li className={styles.menuItem}>Обратная связь</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
