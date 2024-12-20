import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import infoStyles from "../css/infoNews.module.css"
import styles from "../css/newsContainer.module.css";
import userIcon from "../img/user.png"

const InfoNews = () => {
  const { id } = useParams(); // Извлекаем id новости из маршрута
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    // Запрашиваем подробности новости с сервера
    fetch(`http://localhost:5000/news/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNewsItem(data); // Сохраняем данные новости в состояние
      })
      .catch((error) => {
        console.error('Ошибка при получении новости:', error);
      });
  }, [id]); // Повторно выполняем запрос, если id изменяется

  if (!newsItem) return <p>Загрузка...</p>;

  return (
    <div className={infoStyles.container}>
      <div className={infoStyles.containerHead}>
          <h1 className={styles.newsTitle}>{newsItem.title}</h1>
          <div className={infoStyles.containerAuthor}>
              <img className={infoStyles.authorIcon} src={userIcon} alt="" />
              <p className={infoStyles.author}>{newsItem.author_name}</p>
          </div>
      </div>
      <div className={infoStyles.content}>  
      <p className={infoStyles.newsDescription}>{newsItem.text}</p>
      <p className={infoStyles.newsDate}>{new Date(newsItem.date).toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).replace(',', '')}
      </p>
      </div>
    </div>
  );
};

export default InfoNews;
