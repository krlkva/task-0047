const express = require('express');
const app = express();

// Функция (UTC+3)
function getMoscowDate() {
    const now = new Date();
    // Прибавляем 3 часа для перехода в московский часовой пояс
    const moscowTime = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    return moscowTime;
}

// Маршрут /DDMMYY
app.get('/:date', (req, res) => {
    const dateParam = req.params.date;
    
    // Проверяем формат 6 цифр
    if (!/^\d{6}$/.test(dateParam)) {
        return res.status(404).json({ error: "Not found" });
    }
    
    // Получаем московскую дату
    const now = getMoscowDate();
    const day = String(now.getUTCDate()).padStart(2, '0');
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const yearShort = String(now.getUTCFullYear()).slice(-2);
    const yearFull = now.getUTCFullYear();
    
    // Ожидаемый формат DDMMYY
    const expected = `${day}${month}${yearShort}`;
    
    if (dateParam === expected) {
        res.json({
            date: `${day}-${month}-${yearFull}`,
            login: "lisakorolkova"
        });
    } else {
        res.status(404).json({ error: "Not found" });
    }
});

// Маршрут /api/rv/abc
app.get('/api/rv/:str', (req, res) => {
    const str = req.params.str;
    
    if (/^[a-z]+$/.test(str) && str.length >= 1) {
        const reversed = str.split('').reverse().join('');
        res.json({ result: reversed });
    } else {
        res.status(400).json({ error: "Only lowercase latin letters allowed" });
    }
});

// Корневой маршрут
app.get('/', (req, res) => {
    res.send('Server is running. Use /210426/ or /api/rv/abc');
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
