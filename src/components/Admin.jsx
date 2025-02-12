import styles from '../css/admin.module.css';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import axios from 'axios';
import searchIcon from '../img/searchIcon2.svg';

function Admin() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [news, setNews] = useState([]);
    const [collections, setCollections] = useState([]);
    const [persons, setPersons] = useState([]);

    const [activeTab, setActiveTab] = useState(''); // 'books' или 'news'
    const [currentNewsPage, setCurrentNewsPage] = useState(1); // Текущая страница для новостей
    const [currentBooksPage, setCurrentBooksPage] = useState(1); // Текущая страница для книг
    const newsPerPage = 6; // Количество новостей на странице
    const booksPerPage = 4; // Количество книг на странице

    const [searchQuery, setSearchQuery] = useState('');



    
        // Функции для загрузки данных
    const fetchCollections = async () => {
        try {
            const response = await axios.get('http://localhost:5000/collections');
            setCollections(response.data);
        } catch (error) {
            console.error('Ошибка загрузки коллекций:', error);
        }
    };

    const fetchPersons = async () => {
        try {
            const response = await axios.get('http://localhost:5000/persons');
            setPersons(response.data);
        } catch (error) {
            console.error('Ошибка загрузки персон:', error);
        }
    }



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

    const deleteCollection = async (id) => {
        if (window.confirm("Вы уверены, что хотите удалить эту коллекцию?")) {
            try {
                await axios.delete(`http://localhost:5000/collections/${id}`);
                alert('Коллекция успешно удалена!');
                // Обновляем список коллекций после удаления
                fetchCollections(); 
            } catch (error) {
                console.error('Ошибка при удалении коллекции:', error);
                alert('Не удалось удалить коллекцию. Попробуйте снова.');
            }
        }
    };
    
    const deletePerson = async (id) => {
        if (window.confirm("Вы уверены, что хотите удалить эту личность?")) {
            try {
                await axios.delete(`http://localhost:5000/persons/${id}`);
                alert('Личность успешно удалена!');
                // Обновляем список персон после удаления
                fetchPersons();
            } catch (error) {
                console.error('Ошибка при удалении личности:', error);
                alert('Не удалось удалить личность. Попробуйте снова.');
            }
        } 
    }


    // Обработчик для переключения вкладок
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentNewsPage(1); // Сбрасываем страницу новостей
        setCurrentBooksPage(1); // Сбрасываем страницу книг

        if (tab === 'books') fetchBooks();
        if (tab === 'news') fetchNews();
        if (tab === 'collections') fetchCollections();
        if (tab === 'persons') fetchPersons();
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


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    


    const filteredPersons = persons.filter(person => 
        (person.kz_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
         person.ru_name?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    

    const filteredCollections = collections.filter(collection =>
        collection.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // const filteredBooks = books.filter(book =>
    //     book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     book.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    
    // const filteredNews = news.filter(item =>
    //     item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     item.author_name.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <button onClick={() => navigate("/user")} className={styles.logoutButton}>
                    Выйти
                </button>
                <h1>Административная панель</h1>
                <div>
                    <div className={styles.Block}>
                        <div className={styles.btnBlock}>
                            <button className={styles.btn} onClick={() => handleTabChange('news')}>Новости</button>
                            <button className={styles.btn} onClick={() => navigate('/admin/news')}>Создать новость</button>
                        </div>
                        <div className={styles.btnBlock}>
                            <button className={styles.btn} onClick={() => handleTabChange('books')}>Книги</button>
                            <button className={styles.btn} onClick={() => navigate('/admin/book')}>Создать книгу</button>
                        </div>
                    </div>
                    <div className={styles.Block}>
                        <div className={styles.btnBlock}>
                            <button className={styles.btn} onClick={() => handleTabChange('collections')}>Коллекции</button>
                            <button className={styles.btn} onClick={() => navigate('/admin/collection')}>
                                    Создать коллекцию
                            </button>
                        </div>
                        <div className={styles.btnBlock}>
                            <button className={styles.btn} onClick={() => handleTabChange('persons')}>Персоны</button>
                            <button className={styles.btn} onClick={() => navigate('/admin/person')}>
                                Создать персону
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {activeTab === 'news' && (
                        <div>
                            <h2 className={styles.h}>Список новостей</h2>
                            {currentNews.map((item) => (
                                <div key={item.id} className={styles.itemNews}>
                                    <p
                                        onClick={() => navigate(`/InfoNews/${item.id}`)}
                                        className={styles.title}
                                    >
                                        {item.title}</p>
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
                                    <p 
                                        onClick={() => navigate(`/book/${book.id}`)}
                                        className={styles.title}
                                    >
                                        {book.title}
                                    </p>
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
                    {activeTab === 'collections' && (
                        <div>
                            <h2>Список коллекций</h2>
                            <label className={styles.searchLabel}>
                                <img src={searchIcon} alt="" />
                                <input
                                    className={styles.searchInput}
                                    type="text"
                                    name="title"
                                    placeholder="Поиск по названию"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </label>
                            {filteredCollections.map((collection) => (
                                <div className={styles.itemCol}  key={collection.id}>
                                    <h3>{collection.name}</h3>                                    
                                    <div className={styles.btnBlock}>
                                        <button className={styles.btnCol} onClick={() => navigate(`/admin/collections/${collection.id}`)}>Посмотреть книги</button>
                                        <button className={styles.btnDel} onClick={() => deleteCollection(collection.id)}>Удалить</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'persons' && (
                        <div>
                            <h2>Person List</h2>
                            <label className={styles.searchLabel}>
                                <img src={searchIcon} alt="" />
                                <input
                                    className={styles.searchInput}
                                    type="text"
                                    name="title"
                                    placeholder="Поиск по имени"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </label>
                            <div className={styles.gridPersons}>
                                {filteredPersons.map((person) => (
                                    <div className={styles.itemPerson} key={person.id}>
                                        <div className={styles.photo}>
                                            <img src={person.img_url} alt="" />
                                        </div>
                                        <div>
                                            <h1 className={styles.namePerson}>{person.kz_name}</h1>
                                            <h1 className={styles.namePerson}>{person.ru_name}</h1>
                                        </div>
                                        <div>
                                            <button className={styles.btnPersonEdit} onClick={() => navigate(`/admin/edit/person/${person.id}`)}>Изменить</button>
                                            <button className={styles.btnPersonDel} onClick={() => deletePerson(person.id)}>Удалить</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Admin;
