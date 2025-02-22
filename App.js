const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Настройка на API ключа за валути (замести с твой)
const API_KEY = 'a8edc46fbf6e7d46d96526e3be9f4f30';
const API_URL = 'https://v6.exchangerate-api.com/v6/' + API_KEY + '/latest/';

// Основен маршрут
app.get('/', (req, res) => {
    res.send('Добре дошли в API за конвертиране на валути!');
});

// Маршрут за конвертиране на валута
app.get('/convert', async (req, res) => {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
        return res.status(400).json({ error: 'Необходими са параметри: от, до и количество.' });
    }

    try {
        // Вземи актуалните курсове на валутите
        const response = await axios.get(API_URL + from);
        const rates = response.data.conversion_rates;

        if (!rates[to]) {
            return res.status(400).json({ error: `Не можем да намерим курс за валута ${to}.` });
        }

        // Извърши конверсия
        const convertedAmount = (amount * rates[to]).toFixed(2);

        res.json({
            from,
            to,
            amount,
            convertedAmount,
        });
    } catch (error) {
        res.status(500).json({ error: 'Неуспешно извършена заявка към API.' });
    }
});

// Слушане на порт
app.listen(port, () => {
    console.log(`Сървърът работи на http://localhost:${port}`);
});

