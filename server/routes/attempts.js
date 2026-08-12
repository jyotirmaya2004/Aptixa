const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const attemptsPath = path.join(__dirname, '../data/attempts.json');
const questionsPath = path.join(__dirname, '../data/questions.json');

let inMemoryAttempts = null;

const getAttempts = () => {
  if (inMemoryAttempts) return inMemoryAttempts;
  try {
    const tmpPath = path.join('/tmp', 'attempts.json');
    if (fs.existsSync(tmpPath)) {
      inMemoryAttempts = JSON.parse(fs.readFileSync(tmpPath, 'utf8'));
      return inMemoryAttempts;
    }
    if (fs.existsSync(attemptsPath)) {
      inMemoryAttempts = JSON.parse(fs.readFileSync(attemptsPath, 'utf8'));
      return inMemoryAttempts;
    }
  } catch (err) {
    console.warn('Error reading attempts:', err);
  }
  inMemoryAttempts = [];
  return inMemoryAttempts;
};

const saveAttempts = (attempts) => {
  inMemoryAttempts = attempts;
  try {
    fs.writeFileSync(attemptsPath, JSON.stringify(attempts, null, 2), 'utf8');
  } catch (err) {
    try {
      const tmpPath = path.join('/tmp', 'attempts.json');
      fs.writeFileSync(tmpPath, JSON.stringify(attempts, null, 2), 'utf8');
    } catch (tmpErr) {
      console.warn('Could not save attempts to /tmp:', tmpErr);
    }
  }
};

// POST /api/attempts - Submit quiz results
router.post('/', (req, res) => {
  try {
    const { category, mode, totalQuestions, userAnswers, timeSpentSeconds } = req.body;
    let questions = [];
    try {
      if (fs.existsSync(questionsPath)) {
        questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
      }
    } catch (e) {
      console.warn('Could not read questions file:', e);
    }

    let score = 0;
    const breakdown = [];

    // Evaluate answers
    if (userAnswers && typeof userAnswers === 'object') {
      Object.keys(userAnswers).forEach(qId => {
        const question = questions.find(q => q && q.id === qId);
        if (question) {
          const selectedOpt = userAnswers[qId];
          const isCorrect = selectedOpt === question.correctOption;
          if (isCorrect) score += 1;

          breakdown.push({
            questionId: qId,
            topic: question.topic || 'General',
            category: question.category || 'all',
            isCorrect,
            selectedOpt,
            correctOption: question.correctOption
          });
        }
      });
    }

    const newAttempt = {
      id: 'att_' + Date.now(),
      date: new Date().toISOString(),
      category: category || 'all',
      mode: mode || 'exam',
      totalQuestions: totalQuestions || breakdown.length,
      score,
      percentage: totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0,
      timeSpentSeconds: timeSpentSeconds || 0,
      breakdown
    };

    const attempts = getAttempts();
    attempts.unshift(newAttempt);
    saveAttempts(attempts);

    res.status(201).json(newAttempt);
  } catch (error) {
    console.error('Error recording quiz attempt:', error);
    res.status(500).json({ error: 'Failed to record attempt' });
  }
});

// GET /api/attempts/stats - Get overall stats & category breakdown
router.get('/stats', (req, res) => {
  try {
    const attempts = getAttempts();

    const totalAttempts = attempts.length;
    let totalScore = 0;
    let totalQuestionsAnswered = 0;

    const categoryStats = {};

    attempts.forEach(att => {
      totalScore += att.score || 0;
      totalQuestionsAnswered += att.totalQuestions || 0;

      if (Array.isArray(att.breakdown)) {
        att.breakdown.forEach(item => {
          if (item && item.category) {
            if (!categoryStats[item.category]) {
              categoryStats[item.category] = { total: 0, correct: 0 };
            }
            categoryStats[item.category].total += 1;
            if (item.isCorrect) {
              categoryStats[item.category].correct += 1;
            }
          }
        });
      }
    });

    const overallAccuracy = totalQuestionsAnswered > 0 
      ? Math.round((totalScore / totalQuestionsAnswered) * 100) 
      : 0;

    res.json({
      totalAttempts,
      totalQuestionsAnswered,
      overallAccuracy,
      recentAttempts: attempts.slice(0, 10),
      categoryStats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;
