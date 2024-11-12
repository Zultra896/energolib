import searchIcon from '../img/searchIcon.svg'
import searchStyles from '../css/search.module.css'

function search() {
  return (
    <div className={searchStyles.search}>
        <div className={searchStyles.search__container}>
            <p className={searchStyles.text}>Поиск</p>
            <img src={searchIcon} alt="" />
        </div>
    </div>
  )
}

export default search
