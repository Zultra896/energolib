import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerBlockHistory from './BannerBlockHistory.jsx';
import CardAuthors from '../components/CardAuthors.jsx';
import blockHistoryStyles from '../css/blockHistory.module.css';

function BlockHistory() {
    const navigate = useNavigate();
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/persons/random') // замените на ваш URL сервера
            .then(response => response.json())
            .then(data => setAuthors(data))
            .catch(error => console.error('Ошибка загрузки данных:', error));
    }, []);

    return (
        <div className={blockHistoryStyles.block}>
            <div className={blockHistoryStyles.blog}>
                <div className={blockHistoryStyles.blockTitle}>
                    <h1 className={blockHistoryStyles.title}>Блог</h1>
                </div>
                <BannerBlockHistory />
            </div>
            <div className={blockHistoryStyles.historyBlock}>
                <h1 className={blockHistoryStyles.title}>История писателей</h1>
                <div className={blockHistoryStyles.cardBlock}>
                    {authors.map((author) => (
                        <CardAuthors
                            key={author.id}
                            id={author.id}
                            photo={author.img_url}
                            quote={author.ru_quote}
                            description={`${author.age} лет со дня рождения великого ${author.ru_name}`}
                        />
                    ))}
                </div>
                <button className={blockHistoryStyles.btn} onClick={() => navigate('/persons')}>Все истории</button>
            </div>
        </div>
    );
}

export default BlockHistory;
