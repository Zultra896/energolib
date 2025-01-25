const express = require('express');
const mysql = require('mysql2');
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
  const { specialty, title, language } = req.query;

  let sql = 'SELECT id, img_url, title, specialty, language FROM booklib WHERE 1=1';
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

  if (language) {
    sql += ' AND language = ?';
    params.push(language);
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

// Эндпоинт для удаления книги
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

// Эндпоинт для создания новой книги
app.post('/books', (req, res) => {
  const { title, type, year, author, description, link, specialty, img_url, language } = req.body;

  // Проверяем, что все обязательные поля заполнены
  if (!title || !type || !year || !author || !specialty || !img_url || !language) {
    return res.status(400).json({
      success: false,
      message: 'Пожалуйста, заполните все обязательные поля',
    });
  }

  // Формируем SQL-запрос для добавления книги
  const query = `
    INSERT INTO booklib (title, type, year, author, description, link, specialty, img_url, language)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [title, type, year, author, description, link, specialty, img_url, language];

  // Выполняем запрос к базе данных
  db.query(query, params, (err, result) => {
    if (err) {
      console.error('Ошибка при добавлении книги в базу данных:', err);
      return res.status(500).json({
        success: false,
        message: 'Ошибка сервера при добавлении книги',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Книга успешно добавлена',
      bookId: result.insertId, // ID созданной книги
    });
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


app.post('/news', (req, res) => {
  const { title, text, author_name } = req.body;

  if (!title || !text || !author_name) {
    return res.status(400).json({
      success: false,
      message: 'Пожалуйста, заполните все поля',
    });
  }

  const currentDateTime = new Date();
  const formattedDate = currentDateTime
    .toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(',', ''); // Приводим к формату DD.MM.YY - hh:mm

  const query = `
    INSERT INTO news (title, text, date, author_name)
    VALUES (?, ?, ?, ?)
  `;
  const params = [title, text, formattedDate, author_name];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error('Ошибка добавления новости в базу данных:', err);
      return res.status(500).json({
        success: false,
        message: 'Ошибка сервера при добавлении новости',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Новость успешно добавлена',
      newsId: result.insertId, // ID созданной новости
    });
  });
});






// Эндпоинт для получения всех коллекций
app.get('/collections', (req, res) => {
  db.query('SELECT * FROM collections', (err, results) => {
    if (err) {
      console.error('Ошибка запроса:', err);
      return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
    res.json(results); // Убедитесь, что возвращается JSON
  });
});



// Эндпоинт для создания коллекции
app.post("/collections", async (req, res) => {
  const { name, description, img_url } = req.body;

  if (!name || !description || !img_url) {
      return res.status(400).json({ success: false, message: "Все поля обязательны!" });
  }

  try {
      // SQL-запрос с подготовленными выражениями
      const query = `
          INSERT INTO collections (name, description, img_url)
          VALUES (?, ?, ?)
      `;
      
      // Выполнение запроса с переданными значениями
      const [results] = await db.promise().execute(query, [name, description, img_url]);

      // Проверка на успешное добавление данных в базу
      if (results.affectedRows > 0) {
          res.json({ success: true, message: "Коллекция успешно создана!" });
      } else {
          res.status(500).json({ success: false, message: "Ошибка при создании коллекции!" });
      }
  } catch (error) {
      console.error("Ошибка при создании коллекции:", error);
      res.status(500).json({ success: false, message: "Ошибка сервера!" });
  }
});

// Получение книг в коллекции
app.get('/collections/:id/books', (req, res) => {
  const { id } = req.params;
  db.query(
      'SELECT b.* FROM booklib b JOIN collection_books cb ON b.id = cb.book_id WHERE cb.collection_id = ?',
      [id],
      (err, results) => {
          if (err) {
              console.error('Ошибка запроса:', err);
              return res.status(500).json({ success: false, message: 'Ошибка сервера' });
          }
          res.json({ success: true, data: results });
      }
  );
});

// Получение книг, не входящих в коллекцию
app.get('/collections/:id/available-books', (req, res) => {
  const { id } = req.params;
  db.query(
      'SELECT b.* FROM booklib b WHERE b.id NOT IN (SELECT book_id FROM collection_books WHERE collection_id = ?)',
      [id],
      (err, results) => {
          if (err) {
              console.error('Ошибка запроса:', err);
              return res.status(500).json({ success: false, message: 'Ошибка сервера' });
          }
          res.json({ success: true, data: results });
      }
  );
});

// Добавление книги в коллекцию
app.post('/collections/:id/add-book', (req, res) => {
  const { id } = req.params;
  const { bookId } = req.body;

  db.query(
      'INSERT INTO collection_books (collection_id, book_id) VALUES (?, ?)',
      [id, bookId],
      (err, results) => {
          if (err) {
              console.error('Ошибка добавления книги:', err);
              return res.status(500).json({ success: false, message: 'Ошибка сервера' });
          }
          res.json({ success: true, message: 'Книга успешно добавлена' });
      }
  );
});

// Удаление книги из коллекции
app.delete('/collections/:id/remove-book', (req, res) => {
  const { id } = req.params;
  const { bookId } = req.body;

  db.query(
      'DELETE FROM collection_books WHERE collection_id = ? AND book_id = ?',
      [id, bookId],
      (err, results) => {
          if (err) {
              console.error('Ошибка удаления книги:', err);
              return res.status(500).json({ success: false, message: 'Ошибка сервера' });
          }
          res.json({ success: true, message: 'Книга успешно удалена' });
      }
  );
});




// Эндпоинт для удаления коллекции
app.delete('/collections/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM collections WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Ошибка удаления коллекции:', err);
      return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
    res.json({ success: true, message: 'Коллекция удалена' });
  });
});








  

app.listen(port, () => {
  console.log(`Сервер работает на порту ${port}`);
});
