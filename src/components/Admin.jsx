import styles from '../css/admin.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [news, setNews] = useState([]);
    const [activeTab, setActiveTab] = useState(''); // 'books' или 'news'
    const [currentNewsPage, setCurrentNewsPage] = useState(1); // Текущая страница для новостей
    const [currentBooksPage, setCurrentBooksPage] = useState(1); // Текущая страница для книг
    const newsPerPage = 6; // Количество новостей на странице
    const booksPerPage = 4; // Количество книг на странице

    // Функции для загрузки данных
    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Ошибка загрузки книг:', error);
        }
    };

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/news');
            setNews(response.data);
        } catch (error) {
            console.error('Ошибка загрузки новостей:', error);
        }
    };

    // Функции для удаления
    const deleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/books/${id}`);
            fetchBooks(); // Обновляем список книг
        } catch (error) {
            console.error('Ошибка удаления книги:', error);
        }
    };

    const deleteNews = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/news/${id}`);
            fetchNews(); // Обновляем список новостей
        } catch (error) {
            console.error('Ошибка удаления новости:', error);
        }
    };

    // Обработчик для переключения вкладок
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentNewsPage(1); // Сбрасываем страницу новостей
        setCurrentBooksPage(1); // Сбрасываем страницу книг
        if (tab === 'books') fetchBooks();
        if (tab === 'news') fetchNews();
    };

    // Пагинация новостей
    const indexOfLastNews = currentNewsPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

    // Пагинация книг
    const indexOfLastBook = currentBooksPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const handleNewsPageClick = (page) => {
        setCurrentNewsPage(page);
    };

    const handleBooksPageClick = (page) => {
        setCurrentBooksPage(page);
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <button onClick={() => navigate("/user")} className={styles.logoutButton}>
                    Выйти
                </button>
                <h1 className={styles.h}>Административная панель</h1>
                <div>
                    <div className={styles.btnBlock}>
                        <button className={styles.btn} onClick={() => handleTabChange('news')}>Новости</button>
                        <button className={styles.btn} onClick={() => navigate('/admin/news')}>Создать новость</button>
                    </div>
                    <div className={styles.btnBlock}>
                        <button className={styles.btn} onClick={() => handleTabChange('books')}>Книги</button>
                        <button className={styles.btn} onClick={() => navigate('/admin/book')}>Создать книгу</button>
                    </div>
                </div>
                <div>
                    {activeTab === 'news' && (
                        <div>
                            <h2 className={styles.h}>Список новостей</h2>
                            {currentNews.map((item) => (
                                <div key={item.id} className={styles.itemNews}>
                                    <p>{item.title}</p>
                                    <p>{new Date(item.date).toLocaleString('ru-RU', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    }).replace(',', '')}</p>
                                    <p>{item.author_name}</p>
                                    <button className={styles.btnDelnews} onClick={() => deleteNews(item.id)}>Удалить</button>
                                </div>
                            ))}
                            {news.length > newsPerPage && (
                                <div className={styles.pageList}>
                                    <button
                                        className={styles.pageBtn}
                                        disabled={currentNewsPage === 1}
                                        onClick={() => handleNewsPageClick(currentNewsPage - 1)}
                                    >
                                        &lt;
                                    </button>
                                    {[...Array(Math.ceil(news.length / newsPerPage))].map((_, index) => (
                                        <button
                                            key={index}
                                            className={`${styles.pageBtn} ${currentNewsPage === index + 1 ? styles.active : ''}`}
                                            onClick={() => handleNewsPageClick(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        className={styles.pageBtn}
                                        disabled={currentNewsPage === Math.ceil(news.length / newsPerPage)}
                                        onClick={() => handleNewsPageClick(currentNewsPage + 1)}
                                    >
                                        &gt;
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === 'books' && (
                        <div>
                            <h2>Список книг</h2>
                            {currentBooks.map((book) => (
                                <div key={book.id} className={styles.item}>
                                    <img src={book.img_url} alt={book.title} className={styles.image} />
                                    <p>{book.title}</p>
                                    <p>Специальность: {book.specialty}</p>
                                    <button className={styles.btnDel} onClick={() => deleteBook(book.id)}>Удалить</button>
                                </div>
                            ))}
                            {books.length > booksPerPage && (
                                <div className={styles.pageList}>
                                    <button
                                        className={styles.pageBtn}
                                        disabled={currentBooksPage === 1}
                                        onClick={() => handleBooksPageClick(currentBooksPage - 1)}
                                    >
                                        &lt;
                                    </button>
                                    {[...Array(Math.ceil(books.length / booksPerPage))].map((_, index) => (
                                        <button
                                            key={index}
                                            className={`${styles.pageBtn} ${currentBooksPage === index + 1 ? styles.active : ''}`}
                                            onClick={() => handleBooksPageClick(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        className={styles.pageBtn}
                                        disabled={currentBooksPage === Math.ceil(books.length / booksPerPage)}
                                        onClick={() => handleBooksPageClick(currentBooksPage + 1)}
                                    >
                                        &gt;
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Admin;
