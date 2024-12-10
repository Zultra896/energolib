import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/book.module.css';

function Book () {
  const { id } = useParams();
  const [book, setBook] = useState(null);

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

  const BookLink = () => {
    if (book && book.link) {
      window.open(book.link,);
    } else {
      alert('Ссылка на книгу не найдена!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.banner}></div>
      <div className={styles.block1}>
        <img className={styles.poster} src={book.img_url} alt={book.title} />
        <button className={styles.btn} onClick={BookLink}>
          Начать читать
        </button>
        <div className={styles.infoBlock}>
          <div className={styles.infoP}>
            <p className={styles.argument}>Тип</p>
            <p className={styles.value}>{book.type}</p>
          </div>
          <div className={styles.infoP}>
            <p className={styles.argument}>Год</p>
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
          <h2 className={styles.lineI}>Информация</h2>
          <div className={styles.resp}></div>
          <div className={styles.respP}></div>
        </div>
        <p className={styles.description}>{book.description}</p>
      </div>
      
      
      
      
    </div>
  );
};

export default Book;
