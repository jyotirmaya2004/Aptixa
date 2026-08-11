const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Only connect to localhost backend when developing locally
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000/api';
  }
  // On Vercel / Production host without VITE_API_URL, use relative /api route (rewritten by vercel.json)
  return '/api';
};

const API_BASE = getApiBase();

export const fetchCategories = async () => {
  if (!API_BASE) throw new Error('No API server configured for production host');
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const fetchQuestions = async (filters = {}) => {
  if (!API_BASE) throw new Error('No API server configured for production host');
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.difficulty) params.append('difficulty', filters.difficulty);
  if (filters.search) params.append('search', filters.search);
  if (filters.limit) params.append('limit', filters.limit);
  if (filters.shuffle) params.append('shuffle', 'true');

  const res = await fetch(`${API_BASE}/questions?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
};

export const submitQuizAttempt = async (attemptData) => {
  if (!API_BASE) throw new Error('No API server configured for production host');
  const res = await fetch(`${API_BASE}/attempts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(attemptData)
  });
  if (!res.ok) throw new Error('Failed to submit attempt');
  return res.json();
};

export const fetchStats = async () => {
  if (!API_BASE) throw new Error('No API server configured for production host');
  const res = await fetch(`${API_BASE}/attempts/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
};

export const createQuestion = async (questionData) => {
  if (!API_BASE) throw new Error('No API server configured for production host');
  const res = await fetch(`${API_BASE}/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questionData)
  });
  if (!res.ok) throw new Error('Failed to create question');
  return res.json();
};

export const deleteQuestion = async (questionId) => {
  if (!API_BASE) throw new Error('No API server configured for production host');
  const res = await fetch(`${API_BASE}/questions/${questionId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete question');
  return res.json();
};

// Books API
export const fetchBooks = async () => {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/books`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API failed, falling back to static CDN data:', e.message);
    }
  }

  // Static Fallback for Vercel / Production static host:
  try {
    const res = await fetch('/data/books.json');
    if (res.ok) {
      const books = await res.json();
      return books.map(b => {
        const totalQs = (b.chapters || []).reduce((sum, ch) => sum + (ch.question_count || 0), 0);
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
    }
  } catch (e) {
    console.warn('Failed to fetch /data/books.json, falling back to STATIC_BOOKS:', e);
  }

  const { STATIC_BOOKS } = await import('../data/booksData');
  return STATIC_BOOKS;
};

export const fetchBookChapter = async (bookId, chapterId) => {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/books/${bookId}/chapters/${chapterId}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend API failed, falling back to static CDN chapter file:', e.message);
    }
  }

  // Static Fallback for Vercel / Production static host:
  let books = [];
  try {
    const booksRes = await fetch('/data/books.json');
    if (booksRes.ok) {
      books = await booksRes.json();
    }
  } catch (e) {
    console.warn('Failed to load /data/books.json:', e);
  }

  if (!books || !books.length) {
    const { STATIC_BOOKS } = await import('../data/booksData');
    books = STATIC_BOOKS;
  }

  const book = books.find(b => b.id === bookId);
  if (!book) throw new Error('Book not found');

  const normParam = (chapterId || '').toLowerCase().replace(/^[0-9]+\.\s*/, '').replace(/[^a-z0-9]+/g, ' ').trim();
  const chapterObj = (book.chapters || []).find(c => 
    c.id === chapterId || 
    c.chapter_number === parseInt(chapterId) ||
    (c.title || '').toLowerCase().replace(/^[0-9]+\.\s*/, '').replace(/[^a-z0-9]+/g, ' ').trim() === normParam ||
    (c.id && c.id.replace(/s$/, '') === chapterId.replace(/s$/, '')) ||
    (c.id && c.id.includes(chapterId)) ||
    (chapterId && chapterId.includes(c.id))
  );

  if (!chapterObj) throw new Error(`Chapter "${chapterId}" not found in ${book.title}`);

  let questions = [];
  if (chapterObj.file) {
    try {
      const chapterRes = await fetch(`/data/${chapterObj.file}`);
      if (chapterRes.ok) {
        const chapterData = await chapterRes.json();
        questions = Array.isArray(chapterData) ? chapterData : (chapterData.questions || []);
      }
    } catch (e) {
      console.warn(`Failed to fetch /data/${chapterObj.file}:`, e);
    }
  }

  if ((!questions || !questions.length) && chapterObj.questions) {
    questions = chapterObj.questions;
  }

  return {
    bookId: book.id,
    bookTitle: book.title,
    author: book.author,
    chapter: {
      id: chapterObj.id,
      chapter_number: chapterObj.chapter_number,
      title: chapterObj.title,
      question_count: chapterObj.question_count || questions.length,
      description: chapterObj.description || '',
      file: chapterObj.file || null,
      questions
    }
  };
};

export const uploadBookChapterJSON = async (jsonData) => {
  if (!API_BASE) throw new Error('No API server configured for production host');
  const res = await fetch(`${API_BASE}/books/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof jsonData === 'string' ? jsonData : JSON.stringify(jsonData)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to upload chapter JSON');
  }
  return res.json();
};

export const deleteBook = async (bookId) => {
  if (!API_BASE) throw new Error('No API server configured for production host');
  const res = await fetch(`${API_BASE}/books/${bookId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete book');
  return res.json();
};

export const deleteChapter = async (bookId, chapterId) => {
  if (!API_BASE) throw new Error('No API server configured for production host');
  const res = await fetch(`${API_BASE}/books/${bookId}/chapters/${chapterId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete chapter');
  return res.json();
};

// ── Aptitude Gold Live API & Offline JSON Database ───────────────────────────
export const APTITUDE_GOLD_ENDPOINTS = {
  random: { name: 'Random Aptitude', endpoint: 'https://aptitude-gold.vercel.app/Random', category: 'quantitative' },
  mixture: { name: 'Mixture & Alligation', endpoint: 'https://aptitude-gold.vercel.app/MixtureAndAlligation', category: 'quantitative' },
  age: { name: 'Problems on Ages', endpoint: 'https://aptitude-gold.vercel.app/Age', category: 'quantitative' },
  permutation: { name: 'Permutation & Combination', endpoint: 'https://aptitude-gold.vercel.app/PermutationAndCombination', category: 'quantitative' },
  profit: { name: 'Profit & Loss', endpoint: 'https://aptitude-gold.vercel.app/ProfitAndLoss', category: 'quantitative' },
  pipes: { name: 'Pipes & Cisterns', endpoint: 'https://aptitude-gold.vercel.app/PipesAndCistern', category: 'quantitative' },
  speed: { name: 'Speed Time Distance', endpoint: 'https://aptitude-gold.vercel.app/SpeedTimeDistance', category: 'quantitative' },
  calendar: { name: 'Calendars', endpoint: 'https://aptitude-gold.vercel.app/Calendar', category: 'logical' },
  simple_interest: { name: 'Simple Interest', endpoint: 'https://aptitude-gold.vercel.app/SimpleInterest', category: 'quantitative' },
};

export const fetchAptitudeGoldQuestion = async (topicKey = 'random') => {
  const config = APTITUDE_GOLD_ENDPOINTS[topicKey] || APTITUDE_GOLD_ENDPOINTS.random;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(config.endpoint, { signal: controller.signal });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      if (data && data.question) {
        const options = Array.isArray(data.options) ? data.options.map(o => String(o).strip ? String(o).strip() : String(o)) : [];
        const answer = String(data.answer || '').trim();
        let correctOption = 0;
        options.forEach((opt, idx) => {
          if (opt === answer || opt.toLowerCase().includes(answer.toLowerCase()) || answer.toLowerCase().includes(opt.toLowerCase())) {
            correctOption = idx;
          }
        });

        return {
          id: `gold-live-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          topic: config.name,
          category: config.category,
          question: data.question,
          options: options.length >= 4 ? options.slice(0, 4) : [...options, 'None of these', 'Cannot be determined'].slice(0, 4),
          correctOption,
          answer: data.answer,
          explanation: data.explanation || '',
          isLive: true
        };
      }
    }
  } catch (err) {
    console.warn(`Aptitude Gold live API fetch failed for ${topicKey}, loading stored JSON fallback:`, err);
  }

  // Offline / Fallback JSON database
  try {
    const jsonRes = await fetch('/data/externalAptitudeQuestions.json');
    if (jsonRes.ok) {
      const payload = await jsonRes.json();
      const topicData = payload.topics?.[topicKey] || payload.topics?.random;
      if (topicData && topicData.questions?.length) {
        const randomQ = topicData.questions[Math.floor(Math.random() * topicData.questions.length)];
        return { ...randomQ, isLive: false };
      }
    }
  } catch (err) {
    console.warn('Failed to load stored externalAptitudeQuestions.json:', err);
  }

  const { default: staticPayload } = await import('../data/externalAptitudeQuestions.json');
  const topicData = staticPayload.topics?.[topicKey] || staticPayload.topics?.random;
  const questions = topicData?.questions || [];
  return questions[Math.floor(Math.random() * questions.length)];
};

export const fetchAptitudeGoldTopicQuestions = async (topicKey = 'random', limit = 10) => {
  const list = [];
  const fetchedIds = new Set();

  for (let i = 0; i < limit; i++) {
    try {
      const q = await fetchAptitudeGoldQuestion(topicKey);
      if (q && !fetchedIds.has(q.question)) {
        fetchedIds.add(q.question);
        list.push(q);
      }
    } catch (_) {}
  }

  if (list.length < limit) {
    try {
      const { default: staticPayload } = await import('../data/externalAptitudeQuestions.json');
      const topicData = staticPayload.topics?.[topicKey] || staticPayload.topics?.random;
      const questions = topicData?.questions || [];
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      for (const q of shuffled) {
        if (list.length >= limit) break;
        if (!fetchedIds.has(q.question)) {
          fetchedIds.add(q.question);
          list.push(q);
        }
      }
    } catch (_) {}
  }

  return list;
};

