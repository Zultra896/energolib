import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/book.module.css';
import { useLanguage } from '../components/LanguageContext';
import { AuthContext } from '../components/AuthContext.jsx';
import AuthModal from '../components/AuthModal'; // Импорт вашего модального окна

function Book() {
  const { isAuthenticated} = useContext(AuthContext);
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { language } = useLanguage();
  const [showAuthModal, setShowAuthModal] = useState(false); // Состояние для показа модального окна

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/book/${id}`);
        setBook(data);
      } catch (error) {
        console.error('Ошибка загрузки книги:', error);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return <p>Загрузка...</p>;
  }

  const handleButtonClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true); // Показываем модальное окно
      return;
    }

    // Открываем ссылку книги, если пользователь авторизован
    if (book && book.link) {
      window.open(book.link);
    } else {
      alert('Ссылка на книгу не найдена!');
    }
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.banner}></div>
      <div className={styles.block1}>
        <img className={styles.poster} src={book.img_url} alt={book.title} />
        <button className={styles.btn} onClick={handleButtonClick}>
          {language === 'ru' ? 'Начать читать' : 'Оқып бастау'}
        </button>
        {showAuthModal && <AuthModal onClose={closeAuthModal} />}
        <div className={styles.infoBlock}>
          <div className={styles.infoP}>
            <p className={styles.argument}>
              {language === 'ru' ? 'Тип' : 'Типі'}
            </p>
            <p className={styles.value}>{book.type}</p>
          </div>
          <div className={styles.infoP}>
            <p className={styles.argument}>
              {language === 'ru' ? 'Год' : 'Жыл'}
            </p>
            <p className={styles.value}>{book.year}</p>
          </div>
          <div className={styles.infoP}>
            <p className={styles.argument}>Автор</p>
            <p className={styles.value}>{book.author}</p>
          </div>
        </div>
      </div>
      <div className={styles.block2}>
        <h1 className={styles.title}>{book.title}</h1>
        <div className={styles.line}>
          <h2 className={styles.lineI}>
            {language === 'ru' ? 'Информация' : 'Мәлімет'}
          </h2>
          <div className={styles.resp}></div>
          {/* <div className={styles.respP}></div> */}
        </div>
        <p className={styles.description}>{book.description}</p>
      </div>
    </div>
  );
}

export default Book;
