const express = require('express');
const cors = require('cors');
const path = require('path');

const categoriesRouter = require('./routes/categories');
const questionsRouter = require('./routes/questions');
const attemptsRouter = require('./routes/attempts');
const booksRouter = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/categories', categoriesRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/attempts', attemptsRouter);
app.use('/api/books', booksRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Placement Aptitude Quiz Server running on http://localhost:${PORT}`);
});
