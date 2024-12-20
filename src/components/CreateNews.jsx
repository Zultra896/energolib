import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/createNews.module.css'

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
    <div className={styles.container}>
      <div className={styles.main}>
        <button className={styles.logoutButton} onClick={() => navigate("/admin")}>
            Назад
        </button>

        <form onSubmit={handleSubmit} autoComplete="off" 
        className={styles.form}>
           <h2>Создание новость</h2>
        
            <label htmlFor="title">Заголовок
            <input
              id="title"
              type="text"
              value={title}
              className={styles["input-field"]}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoComplete="off" // Отключаем автозаполнение
            />
            </label>
            
          
        
            <label htmlFor="text">Текст новости
            <textarea
              id="text"
              value={text}
              className={styles["textarea-field"]}
              onChange={(e) => setText(e.target.value)}
              required
              autoComplete="off" // Отключаем автозаполнение
            />
            </label>
            
          
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className={styles.button}>Создать новость</button>
        </form>
      </div>      
    </div>
  );
}

export default CreateNews;
