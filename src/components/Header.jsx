import React, { useContext } from 'react';
import headerStyles from '../css/header.module.css';
import Search from '../components/Search.jsx';
import BtnSing from '../components/BtnSing.jsx';
import logoIcon from '../img/logo.svg';
import BurgerMenu from './BurgerMenu.jsx';
import { AuthContext } from './AuthContext.jsx';
import avatar from '../img/user.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

function Header() {

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 378);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 378);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserClick = () => navigate('/user');

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.header__container}>
        <Link className={headerStyles.header__logo} to="/">
          <img src={logoIcon} alt="Logo" />
          <p className={headerStyles.header__logoTitle}>EnergoLib</p>
        </Link>

         {!isSmallScreen && <Search />}

        <div className={headerStyles.header__items}>
          {isAuthenticated && user ? (
            <div className={headerStyles.user} onClick={handleUserClick}>
              <h1 className={headerStyles.user_name}>
                {user.role === 'admin' ? user.name : `${user.first_name} ${user.last_name}`}
              </h1>
              <div className={headerStyles.avatar}>
                <img src={avatar} alt="User Avatar" className={headerStyles.avatarImg} />
              </div>
            </div>
          ) : (
            <BtnSing />
          )}
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
