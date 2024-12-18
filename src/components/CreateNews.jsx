import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateNews() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем, заполнены ли все обязательные поля
    if (!title.trim() || !text.trim()) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    // Очищаем сообщение об ошибке перед отправкой
    setError('');

    // Форматируем текст: первая буква заглавная
    const formattedTitle = capitalizeFirstLetter(title);
    const formattedText = capitalizeFirstLetter(text);

    try {
      const response = await axios.post('http://localhost:5000/news', {
        title: formattedTitle,
        text: formattedText,
        author_name: user.name,
      });

      if (response.data.success) {
        setTitle('');
        setText('');
        navigate('/admin'); // Переход на страницу /admin
      } else {
        alert(response.data.message || 'Ошибка создания новости');
      }
    } catch (error) {
      console.error('Ошибка при создании новости:', error);
      alert('Произошла ошибка на сервере');
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div>
        <label htmlFor="title">Заголовок</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoComplete="off" // Отключаем автозаполнение
        />
      </div>
      <div>
        <label htmlFor="text">Текст новости</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          autoComplete="off" // Отключаем автозаполнение
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Создать новость</button>
    </form>
  );
}

export default CreateNews;
