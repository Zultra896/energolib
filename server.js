const express = require('express');
const mysql = require('mysql2');
// const bcrypt = require('bcryptjs');
const app = express();
const port = 5000;

app.use(express.json());  // Для парсинга JSON тела запроса

const cors = require('cors');
app.use(cors());  // Это разрешит все домены, но лучше настроить разрешенные домены


// Подключение к базе данных MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123123',  // Замените на ваш пароль
  database: 'energolib',
});

db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Подключено к базе данных!');
  }
});

// Эндпоинт для аутентификации пользователя
app.post('/Auth/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM students WHERE email = ?', [email], (err, results) => {
      if (err) {
          console.error('Ошибка запроса:', err);
          return res.status(500).json({ success: false, message: 'Ошибка сервера' });
      }

      if (results.length === 0) {
          return res.status(404).json({ success: false, message: 'Пользователь не найден' });
      }

      const user = results[0];

      if (password === user.password) {
        console.log('User data:', user); // Логируем объект user
        return res.status(200).json({
          success: true,
          email: user.email,
          first_name: user.first_name || 'Не указано', // Если пусто, возвращаем значение по умолчанию
          last_name: user.last_name || 'Не указано',  // Если пусто, возвращаем значение по умолчанию
          message: 'Успешная аутентификация',
      });      
    }  else {
        return res.status(401).json({ success: false, message: 'Неправильный пароль' });
      }
  });
});






// Эндпоинт для фильтрации книг
app.get('/books', (req, res) => {
  const { specialty, title } = req.query;

  let sql = 'SELECT id, img_url, title, specialty FROM booklib WHERE 1=1';
  const params = [];

  if (specialty) {
    const specialties = specialty.split(',');
    sql += ` AND specialty IN (${specialties.map(() => '?').join(',')})`;
    params.push(...specialties);
  }

  if (title) {
    sql += ' AND title LIKE ?';
    params.push(`%${title}%`);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Ошибка запроса:', err);
      return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }

    res.json(results);
  });
});

// Эндпоинт для получения информации о конкретной книге
app.get('/book/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM booklib WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Ошибка запроса:', err);
      return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Книга не найдена' });
    }

    res.json(results[0]);
  });
});






  

app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}`);
});
