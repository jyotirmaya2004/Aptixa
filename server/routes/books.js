const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const BOOKS_FILE = path.join(__dirname, '../data/books.json');
const DATA_DIR = path.join(__dirname, '../data');

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

// Helper to resolve and load questions for a chapter from its referenced JSON file
function loadChapterQuestions(chapter) {
  if (Array.isArray(chapter.questions) && chapter.questions.length > 0) {
    return chapter.questions;
  }

  const relFile = chapter.file || chapter.json_file || chapter.reference;
  if (!relFile) return [];

  const possiblePaths = [
    path.join(DATA_DIR, relFile),
    path.join(DATA_DIR, 'rs_agrawal', path.basename(relFile)),
    path.join(DATA_DIR, 'arun_sharma', path.basename(relFile))
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsed = JSON.parse(fileContent);
        if (Array.isArray(parsed)) return parsed;
        if (parsed && Array.isArray(parsed.questions)) return parsed.questions;
        if (parsed && parsed.exercise && Array.isArray(parsed.exercise.questions)) return parsed.exercise.questions;
      } catch (e) {
        console.error(`Error reading chapter file at ${filePath}:`, e);
      }
    }
  }

  return [];
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
          question_count: ch.question_count || 0,
          description: ch.description || '',
          file: ch.file || null
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
    const chapterObj = (book.chapters || []).find(c => 
      c.id === chapterId || 
      c.chapter_number === parseInt(chapterId) ||
      normalizeTitle(c.title) === normParam ||
      (c.id && c.id.includes(chapterId)) ||
      (chapterId && chapterId.includes(c.id))
    );
    if (!chapterObj) return res.status(404).json({ error: `Chapter "${chapterId}" not found in ${book.title}` });

    const questions = loadChapterQuestions(chapterObj);

    const chapterWithQuestions = {
      id: chapterObj.id,
      chapter_number: chapterObj.chapter_number,
      title: chapterObj.title,
      question_count: chapterObj.question_count || questions.length,
      description: chapterObj.description || '',
      file: chapterObj.file || null,
      questions
    };

    res.json({
      bookId: book.id,
      bookTitle: book.title,
      author: book.author,
      chapter: chapterWithQuestions
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

    // Determine subfolder and file name
    const bookFolder = bookId.includes('rs-aggarwal') ? 'rs_agrawal' : (bookId.includes('arun-sharma') ? 'arun_sharma' : 'chapters');
    const folderPath = path.join(DATA_DIR, bookFolder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const fileName = `${normTitle ? normTitle.replace(/\s+/g, '_') : chapterId}.json`;
    const relFilePath = `${bookFolder}/${fileName}`;
    const fullFilePath = path.join(folderPath, fileName);

    // Save individual chapter JSON file
    const chapterFileData = {
      id: chapterId,
      book_id: targetBook.id,
      chapter_number: chapterNum,
      title: rawChapterTitle,
      question_count: payload.question_count || payload.questions.length,
      description: payload.description || `Extracted questions for ${rawChapterTitle}`,
      questions: payload.questions
    };

    fs.writeFileSync(fullFilePath, JSON.stringify(chapterFileData, null, 2), 'utf8');

    // Create chapter reference entry for books.json
    const newChapterMeta = {
      id: chapterId,
      chapter_number: chapterNum,
      title: rawChapterTitle,
      question_count: payload.question_count || payload.questions.length,
      description: payload.description || `Extracted questions for ${rawChapterTitle}`,
      file: relFilePath
    };

    // Find existing chapter by ID, Chapter Number, or Normalized Title
    const existingIndex = targetBook.chapters.findIndex(c => {
      if (c.id === chapterId) return true;
      if (c.chapter_number && c.chapter_number === chapterNum) return true;
      if (normalizeTitle(c.title) === normTitle) return true;
      return false;
    });

    if (existingIndex >= 0) {
      targetBook.chapters[existingIndex] = newChapterMeta;
    } else {
      targetBook.chapters.push(newChapterMeta);
    }

    saveBooks(books);

    res.json({
      message: `Successfully uploaded ${payload.questions.length} questions to "${rawChapterTitle}" under "${bookTitle}"!`,
      bookId: targetBook.id,
      chapterId: newChapterMeta.id,
      file: relFilePath,
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
    const targetBook = books.find(b => b.id === bookId);
    if (!targetBook) return res.status(404).json({ error: 'Book not found' });

    // Optionally delete chapter files
    (targetBook.chapters || []).forEach(ch => {
      if (ch.file) {
        const filePath = path.join(DATA_DIR, ch.file);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    });

    books = books.filter(b => b.id !== bookId);
    saveBooks(books);
    res.json({ message: 'Book and chapter files deleted successfully' });
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

    const targetChapter = (book.chapters || []).find(c => c.id === chapterId);
    if (!targetChapter) return res.status(404).json({ error: 'Chapter not found' });

    if (targetChapter.file) {
      const filePath = path.join(DATA_DIR, targetChapter.file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    book.chapters = (book.chapters || []).filter(c => c.id !== chapterId);
    saveBooks(books);
    res.json({ message: 'Chapter deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete chapter: ' + err.message });
  }
});

module.exports = router;

