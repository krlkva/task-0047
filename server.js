const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Маршрут /DDMMYY
app.get('/:date', (req, res) => {
    const dateParam = req.params.date;
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const yearShort = String(now.getFullYear()).slice(-2);
    const yearFull = now.getFullYear();
    
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
    res.send('Server is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
