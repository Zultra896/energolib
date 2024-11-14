import headerStyles from '../css/header.module.css'
import Search from '../components/Search.jsx'
import BtnSing from '../components/BtnSing.jsx'
import logoIcon from '../img/logo.svg'
import burgerIcon1 from '../img/burgerIcon1.svg'

function header() {
  return (
     <header className={headerStyles.header}>
            <div className={headerStyles.header__container}>
            <div className={headerStyles.header__logo}>
              <img src={logoIcon} alt="" />
              <p className={headerStyles.header__logoTitle}>EnergoLib</p>
            </div>
           <Search />
           <div className={headerStyles.header__items}>
            <BtnSing />
            <img src={burgerIcon1} alt="" />
           </div>
            </div>
     </header>
  )
}

export default header