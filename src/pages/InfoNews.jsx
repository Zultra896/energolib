import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <h1>{newsItem.title}</h1>
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
  );
};

export default InfoNews;
