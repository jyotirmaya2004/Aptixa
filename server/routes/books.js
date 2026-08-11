const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const BOOKS_FILE = path.join(__dirname, '../data/books.json');

// Helper to normalize chapter titles (removes leading "1. ", punctuation, extra spaces)
function normalizeTitle(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/^[0-9]+\.\s*/, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

// Helper to deduplicate chapter list for a book
function deduplicateChapters(chapters) {
  if (!Array.isArray(chapters)) return [];
  const seen = new Set();
  const result = [];

  for (const ch of chapters) {
    const normKey = ch.id || normalizeTitle(ch.title) || `ch-${ch.chapter_number}`;
    if (!seen.has(normKey)) {
      seen.add(normKey);
      result.push(ch);
    }
  }
  return result.sort((a, b) => (a.chapter_number || 0) - (b.chapter_number || 0));
}

// Helper to read books JSON
function getBooks() {
  if (!fs.existsSync(BOOKS_FILE)) {
    fs.writeFileSync(BOOKS_FILE, '[]', 'utf8');
  }
  const data = fs.readFileSync(BOOKS_FILE, 'utf8');
  const books = JSON.parse(data || '[]');
  
  // Clean up any duplicate chapters across all books
  books.forEach(b => {
    b.chapters = deduplicateChapters(b.chapters);
  });

  return books;
}

// Helper to save books JSON
function saveBooks(books) {
  books.forEach(b => {
    b.chapters = deduplicateChapters(b.chapters);
  });
  fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2), 'utf8');
}

// 1. GET /api/books - Get list of all books
router.get('/', (req, res) => {
  try {
    const books = getBooks();
    const summary = books.map(b => {
      const totalQs = (b.chapters || []).reduce((sum, ch) => sum + (ch.question_count || ch.questions?.length || 0), 0);
      return {
        id: b.id,
        title: b.title,
        author: b.author,
        category: b.category || 'quantitative',
        coverColor: b.coverColor || '#2563eb',
        description: b.description || '',
        chapterCount: b.chapters?.length || 0,
        totalQuestions: totalQs,
        chapters: (b.chapters || []).map(ch => ({
          id: ch.id,
          chapter_number: ch.chapter_number,
          title: ch.title,
          question_count: ch.question_count || ch.questions?.length || 0,
          description: ch.description || ''
        }))
      };
    });
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books: ' + err.message });
  }
});

// 2. GET /api/books/:bookId/chapters/:chapterId - Get specific chapter & questions
router.get('/:bookId/chapters/:chapterId', (req, res) => {
  try {
    const { bookId, chapterId } = req.params;
    const books = getBooks();
    const book = books.find(b => b.id === bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const normParam = normalizeTitle(chapterId);
    const chapter = (book.chapters || []).find(c => 
      c.id === chapterId || 
      c.chapter_number === parseInt(chapterId) ||
      normalizeTitle(c.title) === normParam ||
      (c.id && c.id.includes(chapterId)) ||
      (chapterId && chapterId.includes(c.id))
    );
    if (!chapter) return res.status(404).json({ error: `Chapter "${chapterId}" not found in ${book.title}` });

    res.json({
      bookId: book.id,
      bookTitle: book.title,
      author: book.author,
      chapter
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chapter: ' + err.message });
  }
});

// 3. POST /api/books/upload - Admin Upload Chapter JSON matching User's Schema
router.post('/upload', (req, res) => {
  try {
    const payload = req.body;

    if (!payload.book || !payload.chapter || !Array.isArray(payload.questions)) {
      return res.status(400).json({ 
        error: 'Invalid JSON payload. Must contain "book", "chapter", and a "questions" array.' 
      });
    }

    const books = getBooks();

    // Extract book title and optional author (e.g. "Quantitative Aptitude — R.S. Aggarwal")
    let bookTitle = payload.book;
    let authorName = 'Competitive Exams';
    if (payload.book.includes('—')) {
      const parts = payload.book.split('—');
      bookTitle = parts[0].trim();
      authorName = parts[1].trim();
    } else if (payload.book.includes('-')) {
      const parts = payload.book.split('-');
      bookTitle = parts[0].trim();
      authorName = parts[1].trim();
    }

    const bookId = bookTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    let targetBook = books.find(b => b.id === bookId || b.title.toLowerCase() === bookTitle.toLowerCase());

    if (!targetBook) {
      targetBook = {
        id: bookId,
        title: bookTitle,
        author: authorName,
        category: 'quantitative',
        coverColor: '#2563eb',
        description: `Reference textbook collection for ${bookTitle}`,
        chapters: []
      };
      books.push(targetBook);
    }

    const rawChapterTitle = payload.chapter;
    const normTitle = normalizeTitle(rawChapterTitle);
    const chapterNum = parseInt(rawChapterTitle) || (targetBook.chapters.length + 1);
    const chapterId = 'ch-' + (normTitle ? normTitle.replace(/\s+/g, '-') : `chapter-${chapterNum}`);

    const newChapter = {
      id: chapterId,
      chapter_number: chapterNum,
      title: rawChapterTitle,
      question_count: payload.question_count || payload.questions.length,
      description: payload.description || `Extracted questions for ${rawChapterTitle}`,
      questions: payload.questions
    };

    // Find existing chapter by ID, Chapter Number, or Normalized Title
    const existingIndex = targetBook.chapters.findIndex(c => {
      if (c.id === chapterId) return true;
      if (c.chapter_number && c.chapter_number === chapterNum) return true;
      if (normalizeTitle(c.title) === normTitle) return true;
      return false;
    });

    if (existingIndex >= 0) {
      targetBook.chapters[existingIndex] = newChapter;
    } else {
      targetBook.chapters.push(newChapter);
    }

    saveBooks(books);

    res.json({
      message: `Successfully uploaded ${payload.questions.length} questions to "${rawChapterTitle}" under "${bookTitle}"!`,
      bookId: targetBook.id,
      chapterId: newChapter.id,
      totalQuestionsUploaded: payload.questions.length
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process chapter JSON upload: ' + err.message });
  }
});

// 4. DELETE /api/books/:bookId - Delete entire book
router.delete('/:bookId', (req, res) => {
  try {
    const { bookId } = req.params;
    let books = getBooks();
    const initialLen = books.length;
    books = books.filter(b => b.id !== bookId);
    if (books.length === initialLen) return res.status(404).json({ error: 'Book not found' });

    saveBooks(books);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book: ' + err.message });
  }
});

// 5. DELETE /api/books/:bookId/chapters/:chapterId - Delete specific chapter
router.delete('/:bookId/chapters/:chapterId', (req, res) => {
  try {
    const { bookId, chapterId } = req.params;
    const books = getBooks();
    const book = books.find(b => b.id === bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const initialLen = (book.chapters || []).length;
    book.chapters = (book.chapters || []).filter(c => c.id !== chapterId);

    if (book.chapters.length === initialLen) return res.status(404).json({ error: 'Chapter not found' });

    saveBooks(books);
    res.json({ message: 'Chapter deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete chapter: ' + err.message });
  }
});

module.exports = router;
