import React, { useState } from "react";
import styles from '../css/burgerMenu.module.css';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Функция переключения состояния меню
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.burgerMenuContainer}>
      {/* Иконка бургер-меню */}
      <div
        className={`${styles.burgerIcon} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu} // Клик по иконке переключает состояние
      >
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      {/* Меню */}
      {isOpen && ( // Меню отображается только если isOpen равно true
        <div className={styles.menu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}><a href="#catalog">Каталог</a></li>
            <li className={styles.menuItem}><a href="#about">О нас</a></li>
            <li className={styles.menuItem}><a href="#news">Новости</a></li>
            <li className={styles.menuItem}><a href="#contact">Обратная связь</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
