import cardAuthorsStyles from '../css/cardAuthors.module.css';
import author from '../img/Abay.jpg';

function cardAuthors () {
    return (
        <div className={cardAuthorsStyles.card}>
            <div className={cardAuthorsStyles.photo}>
                <img src={author} alt="" />
            </div>
            <h3 className={cardAuthorsStyles.title}>«Безвреден кто в гневе кричит. Бойся того, кто в гневе молчит.»</h3>
            <p className={cardAuthorsStyles.description}>170 лет со дня рождения великого казахского поэта-просветителя Абая</p>
        </div>
    )
}

export default cardAuthors;