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

    // Сначала ищем пользователя в таблице students
    db.query('SELECT * FROM students WHERE email = ?', [email], (err, studentResults) => {
        if (err) {
            console.error('Ошибка запроса к таблице students:', err);
            return res.status(500).json({ success: false, message: 'Ошибка сервера' });
        }

        if (studentResults.length > 0) {
            const user = studentResults[0];
            // Проверяем пароль
            if (password === user.password) {
                return res.status(200).json({
                    success: true,
                    role: 'student', // Указываем роль
                    email: user.email,
                    first_name: user.first_name || 'Не указано',
                    last_name: user.last_name || 'Не указано',
                    group_name: user.group_name,
                    message: 'Успешная аутентификация (students)',
                });
            } else {
                return res.status(401).json({ success: false, message: 'Неправильный пароль' });
            }
        } else {
            // Если пользователя нет в students, ищем в таблице admins
            db.query('SELECT * FROM admins WHERE email = ?', [email], (err, adminResults) => {
                if (err) {
                    console.error('Ошибка запроса к таблице admins:', err);
                    return res.status(500).json({ success: false, message: 'Ошибка сервера' });
                }

                if (adminResults.length > 0) {
                    const admin = adminResults[0];
                    // Проверяем пароль
                    if (password === admin.password) {
                        return res.status(200).json({
                            success: true,
                            role: 'admin', // Указываем роль
                            email: admin.email,
                            name: admin.name || 'Не указано', // Только name и email
                            message: 'Успешная аутентификация (admins)',
                        });
                    } else {
                        return res.status(401).json({ success: false, message: 'Неправильный пароль' });
                    }
                } else {
                    // Если пользователь не найден ни в одной из таблиц
                    return res.status(404).json({ success: false, message: 'Пользователь не найден' });
                }
            });
        }
    });
});


app.post('/Auth/register', (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  // Проверяем, существует ли уже пользователь с таким email
  db.query('SELECT * FROM students WHERE email = ?', [email], (err, results) => {
      if (err) {
          console.error('Ошибка запроса к базе данных:', err);
          return res.status(500).json({ success: false, message: 'Ошибка сервера' });
      }

      if (results.length > 0) {
          return res.status(400).json({ success: false, message: 'Пользователь с таким email уже существует' });
      }

      // Добавляем нового пользователя в базу данных
      const group_name = 'My Group';  // по умолчанию
      const query = 'INSERT INTO students (first_name, last_name, email, password, group_name) VALUES (?, ?, ?, ?, ?)';
      
      db.query(query, [first_name, last_name, email, password, group_name], (err, result) => {
          if (err) {
              console.error('Ошибка добавления пользователя в базу данных:', err);
              return res.status(500).json({ success: false, message: 'Ошибка при регистрации' });
          }

          res.status(201).json({ success: true, message: 'Пользователь успешно зарегистрирован' });
      });
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

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM booklib WHERE id = ?', [id], (err, result) => {
      if (err) {
          console.error('Ошибка удаления книги:', err);
          return res.status(500).json({ success: false, message: 'Ошибка сервера' });
      }
      res.json({ success: true, message: 'Книга успешно удалена' });
  });
});





// Эндпоинт для получения новостей
app.get('/news', (req, res) => {
  db.query('SELECT id, title, text, date, author_name FROM news ORDER BY date DESC', (err, results) => {
    if (err) {
      console.error('Ошибка запроса:', err);
      return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }

    res.json(results); // Отправляем новости на клиент
  });
});


// Эндпоинт для получения новости по ID
app.get('/news/:id', (req, res) => {
  const { id } = req.params;

  // Запрос к базе данных для получения новости по ID
  db.query('SELECT * FROM news WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Ошибка запроса к базе данных:', err);
      return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Новость не найдена' });
    }

    res.json(results[0]); // Отправляем первую (и единственную) новость
  });
});

app.delete('/news/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM news WHERE id = ?', [id], (err, result) => {
      if (err) {
          console.error('Ошибка удаления новости:', err);
          return res.status(500).json({ success: false, message: 'Ошибка сервера' });
      }
      res.json({ success: true, message: 'Новость успешно удалена' });
  });
});












  

app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}`);
});
