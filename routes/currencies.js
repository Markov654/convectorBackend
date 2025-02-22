// routes/currencies.js
const express = require('express');
const router = express.Router();

// Може да се използва обект за съхранение на валути и техните стойности
const currencies = {
  USD: 'Щатски долар',
  EUR: 'Евро',
  BGN: 'Български лев',
  GBP: 'Британска лира',
  JPY: 'Японска йена'
};

// Маршрут за показване на всички валути
router.get('/', (req, res) => {
  res.json(currencies);
});

// Маршрут за показване на валута по код
router.get('/:currencyCode', (req, res) => {
  const currencyCode = req.params.currencyCode.toUpperCase();

  if (currencies[currencyCode]) {
    res.json({
      code: currencyCode,
      name: currencies[currencyCode]
    });
  } else {
    res.status(404).send('Валутата не е намерена');
  }
});

module.exports = router;
