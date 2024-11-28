import React, { useContext } from 'react';
import headerStyles from '../css/header.module.css'
import Search from '../components/Search.jsx'
import BtnSing from '../components/BtnSing.jsx'
import logoIcon from '../img/logo.svg'
import BurgerMenu from './BurgerMenu.jsx'
import { AuthContext } from './AuthContext.jsx'
import avatar from '../img/avatar.jpg'


function Header() {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
     <header className={headerStyles.header}>
            <div className={headerStyles.header__container}>
            <div className={headerStyles.header__logo}>
              <img src={logoIcon} alt="" />
              <p className={headerStyles.header__logoTitle}>EnergoLib</p>
            </div>
           <Search />
           <div className={headerStyles.header__items}>
           {isAuthenticated && user ? (
              <div className={headerStyles.user}>
                  <h1 className={headerStyles.user_name}>{user.first_name + " " + user.last_name}</h1>
                  <div className={headerStyles.avatar}>
                    <img src={avatar} alt="Avatar" className={headerStyles.avatarImg} />
                  </div>
              </div>
            ) : (
                <BtnSing />
            )}

            <BurgerMenu />
           </div>
            </div>
     </header>
  )
}

export default Header