\const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

const port = 5000;

// Настройка EJS как шаблонизатора
app.set('view engine', 'ejs');
app.set('views', './views'); // путь к папке с EJS-шаблонами

// Настройка CORS и body-parser
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Подключение к базе данных MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // замените на ваш пароль
  database: 'messenger'
});

// Подключение к базе данных
db.connect((err) => {
  if (err) {
    console.log('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Подключение к базе данных успешно');
  }
});

// Рендеринг страницы регистрации
app.get('/register', (req, res) => {
  res.render('register');  // рендерим register.ejs
});

// Обработка POST-запроса для регистрации
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Проверка на существующий email
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).send('Ошибка сервера');
    }

    if (results.length > 0) {
      return res.status(400).send('Пользователь с таким email уже существует');
    }

    // Вставка нового пользователя в базу данных
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, password], (err, results) => {
      if (err) {
        return res.status(500).send('Ошибка при регистрации');
      }
      res.status(200).send('Регистрация успешна');
    });
  });
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Сервер работает на http://localhost:${port}`);
});
