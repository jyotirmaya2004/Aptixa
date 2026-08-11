const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const categoriesPath = path.join(__dirname, '../data/categories.json');
const questionsPath = path.join(__dirname, '../data/questions.json');

// GET /api/categories - get all categories with question stats
router.get('/', (req, res) => {
  try {
    const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
    const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

    // Count questions per category
    const countMap = {};
    questionsData.forEach(q => {
      countMap[q.category] = (countMap[q.category] || 0) + 1;
    });

    const enrichedCategories = categoriesData.map(cat => ({
      ...cat,
      questionCount: countMap[cat.id] || 0
    }));

    res.json(enrichedCategories);
  } catch (error) {
    console.error('Error reading categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;
