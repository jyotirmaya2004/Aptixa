const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchCategories = async () => {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const fetchQuestions = async (filters = {}) => {
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
  const res = await fetch(`${API_BASE}/attempts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(attemptData)
  });
  if (!res.ok) throw new Error('Failed to submit attempt');
  return res.json();
};

export const fetchStats = async () => {
  const res = await fetch(`${API_BASE}/attempts/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
};

export const createQuestion = async (questionData) => {
  const res = await fetch(`${API_BASE}/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questionData)
  });
  if (!res.ok) throw new Error('Failed to create question');
  return res.json();
};

export const deleteQuestion = async (questionId) => {
  const res = await fetch(`${API_BASE}/questions/${questionId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete question');
  return res.json();
};

// Books API
export const fetchBooks = async () => {
  const res = await fetch(`${API_BASE}/books`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
};

export const fetchBookChapter = async (bookId, chapterId) => {
  const res = await fetch(`${API_BASE}/books/${bookId}/chapters/${chapterId}`);
  if (!res.ok) throw new Error('Failed to fetch chapter');
  return res.json();
};

export const uploadBookChapterJSON = async (jsonData) => {
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
  const res = await fetch(`${API_BASE}/books/${bookId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete book');
  return res.json();
};

export const deleteChapter = async (bookId, chapterId) => {
  const res = await fetch(`${API_BASE}/books/${bookId}/chapters/${chapterId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete chapter');
  return res.json();
};
