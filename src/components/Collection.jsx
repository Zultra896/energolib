import styles from '../css/admin.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import searchIcon from '../img/searchIcon2.svg';

function Collection() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('view'); // 'view' или 'add'
    const [collectionBooks, setCollectionBooks] = useState([]);
    const [availableBooks, setAvailableBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 5;

    // Загрузка книг в коллекции
    const fetchCollectionBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/collections/${id}/books`);
            if (response.data.success) {
                setCollectionBooks(response.data.data);
            }
        } catch (error) {
            console.error('Ошибка загрузки книг в коллекции:', error);
        }
    };

    // Загрузка доступных книг
    const fetchAvailableBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/collections/${id}/available-books`);
            if (response.data.success) {
                setAvailableBooks(response.data.data);
            }
        } catch (error) {
            console.error('Ошибка загрузки доступных книг:', error);
        }
    };

    // Добавление книги в коллекцию
    const addBookToCollection = async (bookId) => {
        try {
            const response = await axios.post(`http://localhost:5000/collections/${id}/add-book`, { bookId });
            if (response.data.success) {
                fetchCollectionBooks();
                fetchAvailableBooks();
            }
        } catch (error) {
            console.error('Ошибка добавления книги в коллекцию:', error);
        }
    };

    // Удаление книги из коллекции
    const removeBookFromCollection = async (bookId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/collections/${id}/remove-book`, {
                data: { bookId },
            });
            if (response.data.success) {
                fetchCollectionBooks();
                fetchAvailableBooks();
            }
        } catch (error) {
            console.error('Ошибка удаления книги из коллекции:', error);
        }
    };

    // Обработчик переключения вкладок
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
        if (tab === 'view') fetchCollectionBooks();
        if (tab === 'add') fetchAvailableBooks();
    };

    // Пагинация
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = activeTab === 'view'
        ? collectionBooks.slice(indexOfFirstBook, indexOfLastBook)
        : availableBooks
              .filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .slice(indexOfFirstBook, indexOfLastBook);

    const totalBooks = activeTab === 'view' ? collectionBooks.length : availableBooks.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase())).length;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (activeTab === 'view') fetchCollectionBooks();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <button onClick={() => navigate("/admin")} className={styles.logoutButton}>
                    Назад
                </button>
                <h1 className={styles.h}>Управление коллекцией</h1>
                
                <div className={styles.btnBlock}>
                    <button className={styles.btn} onClick={() => handleTabChange('view')}>Книги в коллекции</button>
                    <button className={styles.btn} onClick={() => handleTabChange('add')}>Добавить книги</button>
                </div>
                <div>
                    {activeTab === 'view' && (
                        <div>
                            <h2>Книги в коллекции</h2>
                            {currentBooks.map((book) => (
                                <div key={book.id} className={styles.item}>
                                    <img src={book.img_url} alt={book.title} className={styles.image} />
                                    <p>{book.title}</p>
                                    <button className={styles.btnDel} onClick={() => removeBookFromCollection(book.id)}>Удалить</button>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'add' && (
                        <div>
                            <h2>Добавить книги в коллекцию</h2>
                            <label className={styles.searchLabel}>
                                <img src={searchIcon} alt="" />
                                <input
                                    className={styles.searchInput}
                                    type="text"
                                    name="title"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Поиск по названию"
                                />
                            </label>
                            {currentBooks.map((book) => (
                                <div key={book.id} className={styles.item}>
                                    <img src={book.img_url} alt={book.title} className={styles.image} />
                                    <p>{book.title}</p>
                                    <button className={styles.btnAdd} onClick={() => addBookToCollection(book.id)}>Добавить</button>
                                </div>
                            ))}
                        </div>
                    )}
                    {totalBooks > booksPerPage && (
                        <div className={styles.pageList}>
                            <button
                                className={styles.pageBtn}
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                &lt;
                            </button>
                            {[...Array(Math.ceil(totalBooks / booksPerPage))].map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.pageBtn} ${currentPage === index + 1 ? styles.active : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                className={styles.pageBtn}
                                disabled={currentPage === Math.ceil(totalBooks / booksPerPage)}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                &gt;
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Collection;
