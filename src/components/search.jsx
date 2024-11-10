import searchIcon from '../img/searchIcon.svg'

function search() {
  return (
    <div className={styles.search}>
        <button className={styles.search__container}>
            <p></p>
            <img src={searchIcon} alt="" />
        </button>
    </div>
  )
}

export default search