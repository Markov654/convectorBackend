// Импортирайте Express
const express = require('express');

// Създайте Express приложение
const app = express();

// Създайте основен маршрут
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Стартирайте сървъра
const port = 3000;
app.listen(port, () => {
  console.log(`Сървърът работи на http://localhost:${port}`);
});