import BannerBlockHistory from "./BannerBlockHistory.jsx";
import CardAuthors from "./CardAuthors.jsx";
import blockHistoryStyles from "../css/blockHistory.module.css";

function blockHistory() {
    return (
        <div className={blockHistoryStyles.block}>
            <div className={blockHistoryStyles.blog}>
                <div className={blockHistoryStyles.blockTitle}>
                    <h1 className={blockHistoryStyles.title}>Блог</h1>
                </div>
                <BannerBlockHistory />
                <h3 className={blockHistoryStyles.blogTitle}>
                    Из заключенных в великого утешителя
                </h3>
                <p className={blockHistoryStyles.description}>
                Имя американского писателя О. Генри знает весь мир. У всех в чести его небольшие истории о приключениях благородных жуликов, радостях и заботах простых жителей Нью-Йорка, невероятных совпадениях и парадоксах жизни. Среди этих рассказов есть весёлые и задумчивые, смешные и грустные, но в каждом из них проявляется невероятная наблюдательность автора, его
                </p>
                <button className={blockHistoryStyles.btn}>Читать дальше</button>
            </div>
            <div className={blockHistoryStyles.historyBlock}>
                <h1 className={blockHistoryStyles.title}>История писателей</h1>
                <div className={blockHistoryStyles.cardBlock}>
                    <CardAuthors />
                    <CardAuthors />
                    <CardAuthors />
                    <CardAuthors />
                </div>
                <button className={blockHistoryStyles.btn}>Все истории</button>
            </div>
        </div>
    )
  }
  
export default blockHistory