import styles from '../css/admin.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [news, setNews] = useState([]);
    const [activeTab, setActiveTab] = useState(''); // 'books' или 'news'

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
        if (tab === 'books') fetchBooks();
        if (tab === 'news') fetchNews();
    };

    return (
        <div className={styles.main}>
            <h1>Административная панель</h1>
            <p>Здесь вы можете управлять содержимым сайта</p>
            <div>
                <button onClick={() => handleTabChange('news')}>Новости</button>
                <button onClick={() => handleTabChange('books')}>Книги</button>
                <button onClick={() => navigate('/admin/news')}>Создать новость</button>
                <button onClick={() => navigate('/admin/book')}>Создать книгу</button>
            </div>
            <div>
                {activeTab === 'news' && (
                    <div>
                        <h2>Список новостей</h2>
                        {news.map((item) => (
                            <div key={item.id} className={styles.item}>
                                <p><strong>{item.title}</strong></p>
                                <p>{item.text}</p>
                                <button onClick={() => deleteNews(item.id)}>Удалить</button>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'books' && (
                    <div>
                        <h2>Список книг</h2>
                        {books.map((book) => (
                            <div key={book.id} className={styles.item}>
                                <p><strong>{book.title}</strong></p>
                                <img src={book.img_url} alt={book.title} className={styles.image} />
                                <p>Специальность: {book.specialty}</p>
                                <button onClick={() => deleteBook(book.id)}>Удалить</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;
