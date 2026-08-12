const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, '../data/questions.json');

const getQuestions = () => {
  try {
    const tmpPath = path.join('/tmp', 'questions.json');
    if (fs.existsSync(tmpPath)) {
      return JSON.parse(fs.readFileSync(tmpPath, 'utf8'));
    }
    if (fs.existsSync(questionsPath)) {
      return JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
    }
  } catch (err) {
    console.warn('Error reading questions file:', err);
  }
  return [];
};

const saveQuestions = (questions) => {
  try {
    fs.writeFileSync(questionsPath, JSON.stringify(questions, null, 2), 'utf8');
  } catch (err) {
    try {
      const tmpPath = path.join('/tmp', 'questions.json');
      fs.writeFileSync(tmpPath, JSON.stringify(questions, null, 2), 'utf8');
    } catch (tmpErr) {
      console.warn('Could not save questions to /tmp:', tmpErr);
    }
  }
};

// GET /api/questions - query questions with filtering and shuffle
router.get('/', (req, res) => {
  try {
    let questions = getQuestions();
    const { category, difficulty, search, limit, shuffle } = req.query;

    if (category && category !== 'all') {
      questions = questions.filter(q => q && q.category && q.category.toLowerCase() === category.toLowerCase());
    }

    if (difficulty && difficulty !== 'all') {
      questions = questions.filter(q => q && q.difficulty && q.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (search && search.trim() !== '') {
      const qLower = search.toLowerCase();
      questions = questions.filter(q => 
        q && (
          (q.question && q.question.toLowerCase().includes(qLower)) || 
          (q.topic && q.topic.toLowerCase().includes(qLower))
        )
      );
    }

    if (shuffle === 'true') {
      questions = [...questions].sort(() => 0.5 - Math.random());
    }

    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        questions = questions.slice(0, parsedLimit);
      }
    }

    res.json(questions);
  } catch (error) {
    console.error('Error reading questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// GET /api/questions/:id
router.get('/:id', (req, res) => {
  try {
    const questions = getQuestions();
    const question = questions.find(q => q.id === req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

// POST /api/questions - add new question
router.post('/', (req, res) => {
  try {
    const { category, topic, difficulty, question, options, correctOption, hint, explanation } = req.body;

    if (!category || !question || !options || options.length < 2 || correctOption === undefined) {
      return res.status(400).json({ error: 'Missing required fields for new question' });
    }

    const questions = getQuestions();
    const newQuestion = {
      id: 'q_' + Date.now(),
      category,
      topic: topic || 'General',
      difficulty: difficulty || 'Medium',
      question,
      options,
      correctOption: parseInt(correctOption, 10),
      hint: hint || '',
      explanation: explanation || 'No explanation provided.'
    };

    questions.push(newQuestion);
    saveQuestions(questions);

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error saving new question:', error);
    res.status(500).json({ error: 'Failed to create new question' });
  }
});

// DELETE /api/questions/:id - delete a question
router.delete('/:id', (req, res) => {
  try {
    const questions = getQuestions();
    const filtered = questions.filter(q => q.id !== req.params.id);

    if (filtered.length === questions.length) {
      return res.status(404).json({ error: 'Question not found' });
    }

    saveQuestions(filtered);
    res.json({ message: 'Question deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Failed to delete question' });
  }
});

module.exports = router;
