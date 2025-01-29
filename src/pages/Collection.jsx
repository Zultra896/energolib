import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../css/collections.module.css';
import { useParams, useNavigate } from 'react-router-dom';

function Collections() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [collectionBooks, setCollectionBooks] = useState([]);
    const [collectionInfo, setCollectionInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCollectionData = async () => {
            try {
                // Получение информации о коллекции
                const collectionResponse = await axios.get(`http://localhost:5000/collections/${id}`);
                if (collectionResponse.data.success) {
                    setCollectionInfo(collectionResponse.data.data);
                }

                // Получение книг из коллекции
                const booksResponse = await axios.get(`http://localhost:5000/collections/${id}/books`);
                if (booksResponse.data.success) {
                    setCollectionBooks(booksResponse.data.data);
                }
            } catch (error) {
                console.error('Ошибка загрузки данных коллекции:', error);
                setError('Не удалось загрузить данные коллекции.');
            } finally {
                setLoading(false);
            }
        };
        fetchCollectionData();
    }, [id]);

    return (
        <div className={styles.container}>
            {loading && <p className={styles.loading}>Загрузка...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {!loading && !error && collectionInfo && (
                <div className={styles.collectionInfo}>
                    <img
                        src={collectionInfo.img_url}
                        alt={collectionInfo.name}
                        className={styles.collectionImage}
                    />
                    <div className={styles.textDiv}>
                        <h1 className={styles.colTitle}>{collectionInfo.name}</h1>
                        <p className={styles.collectionDescription}>{collectionInfo.description}</p>
                    </div>
                </div>
            )}

            <h2 className={styles.title}>Книги в коллекции</h2>

            {!loading && !error && collectionBooks.length === 0 && (
                <p className={styles.noBooks}>В этой коллекции пока нет книг.</p>
            )}

            {!loading && !error && collectionBooks.length > 0 && (
                <div className={styles.books}>
                    {collectionBooks.map((book) => (
                        <div
                            key={book.id}
                            className={styles.book}
                            onClick={() => navigate(`/book/${book.id}`)}
                        >
                            <div className={styles.blockLang}>{book.language}</div>
                            <img
                                className={styles.bookImg}
                                src={book.img_url}
                                alt={book.title}
                            />
                            <p className={styles.bookTitle}>{book.title}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Collections;
