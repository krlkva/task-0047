const express = require('express');
const app = express();
const PORT = 3000;

const LOGIN = 'lisakorolkova';  

// Маршрут /DDMMYY
app.get('/:datecode', (req, res) => {
  const datecode = req.params.datecode;
  
  // Получаем текущую дату в формате DDMMYY (без разделителей)
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2); // последние 2 цифры года
  const todayCode = `${day}${month}${year}`;
  
  // Проверяем, совпадает ли маршрут с сегодняшним DDMMYY
  if (datecode !== todayCode) {
    return res.status(404).send('Not Found');
  }
  
  // Формируем дату в формате DD-MM-YYYY
  const fullYear = now.getFullYear();
  const formattedDate = `${day}-${month}-${fullYear}`;
  
  // Ответ в JSON
  res.setHeader('Content-Type', 'application/json');
  res.json({
    date: formattedDate,
    login: LOGIN
  });
});

// Маршрут /api/rv/abc (переворот строки)
app.get('/api/rv/:str', (req, res) => {
  const str = req.params.str;
  
  // Проверка: только строчные латинские буквы, длина >= 1
  const regex = /^[a-z]+$/;
  if (!regex.test(str)) {
    return res.status(400).json({ error: 'Только строчные буквы' });
  }
  
  // Переворачиваем строку
  const reversed = str.split('').reverse().join('');
  res.json({ reversed: reversed });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
