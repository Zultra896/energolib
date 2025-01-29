import BannerBlockHistory from "./BannerBlockHistory.jsx";
import CardAuthors from "../components/CardAuthors.jsx";
import blockHistoryStyles from "../css/blockHistory.module.css";
import { useNavigate } from 'react-router-dom';

function BlockHistory() {
    const navigate = useNavigate();

    const authors = [
        {
          id: 1,
          photo: 'https://adebiportal.kz/storage/tmp/resize/authors/1200_0_9a092c56b344b668be791a0edfa540e6.jpg',
          quote: '«Безвреден кто в гневе кричит. Бойся того, кто в гневе молчит.»',
          description: '170 лет со дня рождения великого казахского поэта-просветителя Абая',
        },
        {
          id: 2,
          photo: 'https://i0.wp.com/apgazeta.kz/wp-content/uploads/2016/04/048-1-2.jpg',
          quote: '«Стремление служить нации и народу – это не от знаний, а от характера.»',
          description: '155 лет со дня рождения великого казахского деятеля Букейхана.',
        },
        {
            id: 3,
            photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeVYwgK16glXwEyX559hpKJrvpSWuoICrrNw&s',
            quote: '«Испокон веков, что казах наследовал от отца, то переходило к сыну.»',
            description: '155 лет со дня рождения великого казахского педагога Байтұрсынұлы.',
          },
          {
            id: 4,
            photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY0SjAcgCszNNthX5N1iVXgU6CemsAdwaHUQ&s',
            quote: '«Я раб, который днем и ночью из последних сил пока душа не покинет тело будет служить своему дорогому народу.»',
            description: '140 лет со дня рождения великого казахского поэта-писателя Дулатұлы',
          },
      ];

    return (
        <div className={blockHistoryStyles.block}>
            <div className={blockHistoryStyles.blog}>
                <div className={blockHistoryStyles.blockTitle}>
                    <h1 className={blockHistoryStyles.title}>Блог</h1>
                </div>
                <BannerBlockHistory />
                <h3 className={blockHistoryStyles.blogTitle}>
                    
                </h3>
                <p className={blockHistoryStyles.description}>
                
                </p>
                {/* <button className={blockHistoryStyles.btn}>Читать дальше</button> */}
            </div>
            <div className={blockHistoryStyles.historyBlock}>
                <h1 className={blockHistoryStyles.title}>История писателей</h1>
                <div className={blockHistoryStyles.cardBlock}>
                {authors.map((author) => (
        <CardAuthors
          key={author.id}
          photo={author.photo}
          quote={author.quote}
          description={author.description}
        />
      ))}
                </div>
                <button className={blockHistoryStyles.btn} onClick={() => navigate('/persons')}>Все истории</button>
            </div>
        </div>
    )
  }
  
export default BlockHistory