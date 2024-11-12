import headerStyles from '../css/header.module.css'
import Search from './Search.jsx'

function header() {
  return (
     <header className={headerStyles.header}>
           <Search />
     </header>
  )
}

export default header