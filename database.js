const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',   // Если не работает, укажи своего пользователя
  password: '28121946',  
  database: 'chime_messenger'
});

connection.connect(err => {
  if (err) {
    console.error('Ошибка подключения к MySQL:', err);
  } else {
    console.log('✅ Подключено к базе данных MySQL');
  }
});

module.exports = connection;
