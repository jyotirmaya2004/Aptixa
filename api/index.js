const express = require('express');
const cors = require('cors');
const path = require('path');

const categoriesRouter = require('../server/routes/categories');
const questionsRouter = require('../server/routes/questions');
const attemptsRouter = require('../server/routes/attempts');
const booksRouter = require('../server/routes/books');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/categories', categoriesRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/attempts', attemptsRouter);
app.use('/api/books', booksRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = app;
