// Scorecard & Accuracy Persistent Storage (localStorage + Cookie Fallback)

const STORAGE_KEY = 'aptixa_attempts_v1';
const COOKIE_KEY = 'aptixa_attempts_cookie';

/**
 * Set a persistent cookie (valid for 365 days)
 */
function setCookie(name, value, days = 365) {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch (err) {
    console.warn('Cookie save warning:', err);
  }
}

/**
 * Get cookie value by name
 */
function getCookie(name) {
  try {
    const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return matches ? decodeURIComponent(matches[1]) : null;
  } catch (err) {
    return null;
  }
}

/**
 * Retrieve all persistent quiz attempts from localStorage or Cookie fallback
 */
export function getStoredAttempts() {
  try {
    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData) {
      const parsed = JSON.parse(localData);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('localStorage read error, checking cookie fallback:', err);
  }

  // Cookie fallback
  try {
    const cookieData = getCookie(COOKIE_KEY);
    if (cookieData) {
      const parsed = JSON.parse(cookieData);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('Cookie read error:', err);
  }

  return [];
}

/**
 * Save a new quiz attempt to both localStorage and Cookie
 */
export function saveAttempt(newAttempt) {
  const currentAttempts = getStoredAttempts();
  const attemptRecord = {
    id: newAttempt.id || `att_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    category: newAttempt.category || 'quantitative',
    mode: newAttempt.mode || 'exam',
    score: Number(newAttempt.score) || 0,
    totalQuestions: Number(newAttempt.totalQuestions) || 1,
    percentage: Math.round(((Number(newAttempt.score) || 0) / (Number(newAttempt.totalQuestions) || 1)) * 100),
    timeSpentSeconds: Number(newAttempt.timeSpentSeconds) || 0,
    date: newAttempt.date || new Date().toISOString(),
  };

  const updatedAttempts = [attemptRecord, ...currentAttempts];

  // Save to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAttempts));
  } catch (err) {
    console.warn('localStorage save warning:', err);
  }

  // Save to persistent cookie (keep last 30 attempts in cookie to fit header limits)
  try {
    const compactForCookie = updatedAttempts.slice(0, 30);
    setCookie(COOKIE_KEY, JSON.stringify(compactForCookie), 365);
  } catch (err) {
    console.warn('Cookie save warning:', err);
  }

  return computeStatsFromAttempts(updatedAttempts);
}

/**
 * Compute aggregated analytics from attempts history
 */
export function computeStatsFromAttempts(attempts = []) {
  if (!attempts || !attempts.length) {
    return {
      totalAttempts: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      overallAccuracy: 0,
      averageScore: 0,
      categoryStats: {
        quantitative: { correct: 0, total: 0 },
        logical:      { correct: 0, total: 0 },
        verbal:       { correct: 0, total: 0 },
        dsa:          { correct: 0, total: 0 },
      },
      recentAttempts: [],
    };
  }

  let totalQuestionsAnswered = 0;
  let totalCorrectAnswers = 0;
  const categoryStats = {
    quantitative: { correct: 0, total: 0 },
    logical:      { correct: 0, total: 0 },
    verbal:       { correct: 0, total: 0 },
    dsa:          { correct: 0, total: 0 },
  };

  attempts.forEach(a => {
    const qCount = Number(a.totalQuestions) || 0;
    const sCount = Number(a.score) || 0;

    totalQuestionsAnswered += qCount;
    totalCorrectAnswers += sCount;

    const catKey = a.category || 'quantitative';
    if (!categoryStats[catKey]) {
      categoryStats[catKey] = { correct: 0, total: 0 };
    }
    categoryStats[catKey].correct += sCount;
    categoryStats[catKey].total += qCount;
  });

  const overallAccuracy = totalQuestionsAnswered > 0 
    ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100) 
    : 0;

  return {
    totalAttempts: attempts.length,
    totalQuestionsAnswered,
    totalCorrectAnswers,
    overallAccuracy,
    averageScore: Math.round(totalCorrectAnswers / attempts.length),
    categoryStats,
    recentAttempts: attempts.sort((a, b) => new Date(b.date) - new Date(a.date)),
  };
}

/**
 * Clear all saved attempts from localStorage and cookies
 */
export function clearStoredAttempts() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = `${COOKIE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  } catch (err) {
    console.warn('Clear attempts error:', err);
  }
}
