import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/newsContainer.module.css";
import bookIcon from "../img/bookIcon.svg";
import { useLanguage } from "../components/LanguageContext";

const NewsContainer = () => {
  const [news, setNews] = useState([]); // Состояние для новостей
  const [currentPage, setCurrentPage] = useState(1); // Состояние для текущей страницы
  const newsPerPage = 4; // Количество новостей на странице
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/news') // Адрес вашего API
      .then((response) => response.json())
      .then((data) => {
        setNews(data); // Сохраняем новости в состоянии
      })
      .catch((error) => {
        console.error('Ошибка при получении новостей:', error);
      });
  }, []);

  const handleNewsClick = (id) => {
    navigate(`/InfoNews/${id}`);
  };

  // Вычисляем индексы новостей для текущей страницы
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  // Обработчик клика по кнопке страницы
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const { language } = useLanguage();

  return (
    <div className={styles.newsContainer}>
      <div className={styles.headerBlock}>
        <img src={bookIcon} alt="" className={styles.bookIcon} />
        <h1 className={styles.newsTitle}>
          {language === "ru"? "Новости" : "Жаңалыктар"}
        </h1>
      </div>
      <div className={styles.newsList}>
        {currentNews.map((newsItem) => (
          <div
            key={newsItem.id}
            className={styles.newsContent}
            onClick={() => handleNewsClick(newsItem.id)}
          >
            <h2>{newsItem.title}</h2>
            <p>{newsItem.text}</p>
            <p>{new Date(newsItem.date).toLocaleString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }).replace(',', '')}</p>
          </div>
        ))}
      </div>
      {news.length > newsPerPage && (
        <div className={styles.pageList}>
          <button
            className={styles.pageBtn}
            disabled={currentPage === 1}
            onClick={() => handlePageClick(currentPage - 1)}
          >
            &lt;
          </button>
          {[...Array(Math.ceil(news.length / newsPerPage))].map((_, index) => (
            <button
              key={index}
              className={`${styles.pageBtn} ${currentPage === index + 1 ? styles.active : ""}`}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={styles.pageBtn}
            disabled={currentPage === Math.ceil(news.length / newsPerPage)}
            onClick={() => handlePageClick(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsContainer;
