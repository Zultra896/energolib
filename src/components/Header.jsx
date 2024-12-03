import headerStyles from '../css/header.module.css'
import Search from '../components/Search.jsx'
import BtnSing from '../components/BtnSing.jsx'
import logoIcon from '../img/logo.svg'
import BurgerMenu from './BurgerMenu.jsx'
import { Link } from 'react-router-dom'


function header() {
  return (
     <header className={headerStyles.header}>
            <div className={headerStyles.header__container}>
            <Link className={headerStyles.header__logo} to="/">
              <img src={logoIcon} alt="" />
              <p className={headerStyles.header__logoTitle}>EnergoLib</p>
            </Link>
           <Search />
           <div className={headerStyles.header__items}>
            <BtnSing />
            <BurgerMenu />
           </div>
            </div>
     </header>
  )
}

export default header