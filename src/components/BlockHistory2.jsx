import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardAuthors from '../components/CardAuthors.jsx';
import styles from '../css/blockHistory2.module.css';

function BlockHistory2() {
    const navigate = useNavigate();
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/persons/random6') // новый URL для 6 персон
            .then(response => response.json())
            .then(data => setAuthors(data))
            .catch(error => console.error('Ошибка загрузки данных:', error));
    }, []);

    return (
        <div className={styles.historyBlock}>
            <h1 className={styles.title}>История писателей</h1>
            <div className={styles.cardBlock}>
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
            <button className={styles.btn} onClick={() => navigate('/persons')}>
                Все истории
            </button>
        </div>
    );
}

export default BlockHistory2;
