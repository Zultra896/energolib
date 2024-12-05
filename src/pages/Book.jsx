import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.img_url} alt={book.title} />
      <p>{book.description}</p>
      <p>Автор: {book.author}</p>
      <p>Год: {book.year}</p>
      <p>
        Ссылка: <a href={book.link} target="_blank" rel="noopener noreferrer">Читать</a>
      </p>
    </div>
  );
};

export default Book;
