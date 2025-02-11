import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardAuthors from '../components/CardAuthors.jsx';
import styles from '../css/blockHistory2.module.css';
import { useLanguage } from "../components/LanguageContext";

function BlockHistory2() {
    const navigate = useNavigate();
    const [authors, setAuthors] = useState([]);

    const { language } = useLanguage();

    useEffect(() => {
        fetch('http://localhost:5000/persons/random6') // новый URL для 6 персон
            .then(response => response.json())
            .then(data => setAuthors(data))
            .catch(error => console.error('Ошибка загрузки данных:', error));
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.historyBlock}>
                <h1 className={styles.title}>{language === 'ru' ? "Великие личности" : "Ұлы тұлғалар"}</h1>
                <div className={styles.cardBlock}>
                    {authors.map((author) => (
                        <CardAuthors
                            key={author.id}
                            id={author.id}
                            photo={author.img_url}
                            quote={language === 'ru' ? author.ru_quote : author.kz_quote}
                            description={
                                language === 'ru' 
                                ? `${author.age} лет со дня рождения великого ${author.ru_name}`
                                : `${author.age} жыл бұрын ұлы ${author.kz_name} дүниеге келді`
                            }                          
                        />
                    ))}
                </div>
                <button className={styles.btn} onClick={() => navigate('/persons')}>
                    {language === 'ru' ? "Все личности" : "Барлық тұлғалар"}
                </button>
            </div>
        </div>
    );
}

export default BlockHistory2;
