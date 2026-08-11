const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Only connect to localhost backend when developing locally
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000/api';
  }
  // On Vercel / Production host without VITE_API_URL, return null to skip HTTP network calls
  return null;
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
  if (!API_BASE) throw new Error('No API server configured for production host');
  const res = await fetch(`${API_BASE}/books`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
};

export const fetchBookChapter = async (bookId, chapterId) => {
  if (!API_BASE) throw new Error('No API server configured for production host');
  const res = await fetch(`${API_BASE}/books/${bookId}/chapters/${chapterId}`);
  if (!res.ok) throw new Error('Failed to fetch chapter');
  return res.json();
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
