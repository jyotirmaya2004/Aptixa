import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryCard from './components/CategoryCard';
import QuizRunner from './components/QuizRunner';
import QuizResult from './components/QuizResult';
import PerformanceStats from './components/PerformanceStats';
import QuizConfigModal from './components/QuizConfigModal';
import ThemeCustomizerModal from './components/ThemeCustomizerModal';
import TipsAndFormulas from './components/TipsAndFormulas';
import BooksSection from './components/BooksSection';
import InteractiveSandbox from './components/InteractiveSandbox';
import LeetCode500Section from './components/LeetCode500Section';

import { fetchCategories, fetchQuestions, submitQuizAttempt, fetchStats } from './utils/api';
import { getStoredAttempts, saveAttempt, computeStatsFromAttempts } from './utils/scoreStorage';
import { DSA_500_PROBLEMS } from './data/dsa500Data';
import { SANDBOX_DATABASE } from './data/sandboxData';
import {
  Zap, CheckCircle, Clock, ChevronRight, RefreshCw,
  ShieldOff, Lightbulb, BookOpen, Sparkles, Code2
} from 'lucide-react';

// ── Helper: build quiz questions from static client data ──────────────────────
function buildStaticQuestions(categoryId, config) {
  let list = [];

  if (categoryId === 'dsa') {
    list = DSA_500_PROBLEMS.map((item, idx) => {
      const correct = item.timeComplexity || 'O(N)';
      return {
        id: item.id || `dsa-${idx}`,
        question: `${item.title}: What is the optimal time complexity for this problem?`,
        options: [
          `${correct} — Optimal solution`,
          'O(N²) — Brute force nested loops',
          'O(log N) — Binary search / divide & conquer',
          'O(1) — Constant space trick',
        ],
        correctOption: 0,
        topic: item.category || 'DSA',
        difficulty: item.difficulty || 'Medium',
        explanation: item.solutionPython
          ? `Optimal approach:\n${item.solutionPython.slice(0, 400)}`
          : `The optimal time complexity is ${correct}. See the DSA Hub for full code.`,
      };
    });
  } else {
    const targetCat =
      categoryId === 'quantitative' ? 'quantitative'
      : categoryId === 'logical' ? 'logical'
      : categoryId === 'verbal' ? 'verbal'
      : 'quantitative';

    const filtered = SANDBOX_DATABASE.filter(q => q.category === targetCat);
    const source = filtered.length ? filtered : SANDBOX_DATABASE;

    list = source.map((q, idx) => {
      const correctText = q.formula || q.shortcutTip || 'Standard formula approach';
      return {
        id: q.id || `${targetCat}-${idx}`,
        question: `${q.title}: ${q.description || 'Choose the correct approach for solving this problem.'}`,
        options: [
          correctText.slice(0, 120),
          'Inverse ratio method',
          'Simple arithmetic mean',
          'Logarithmic approximation',
        ],
        correctOption: 0,
        topic: q.topic || targetCat,
        difficulty: q.importance === 'Critical' ? 'Hard' : q.importance === 'High' ? 'Medium' : 'Easy',
        explanation: q.shortcutTip || q.description || 'Standard placement exam approach.',
        hint: q.formula || undefined,
      };
    });
  }

  if (config?.shuffle !== false) {
    list = [...list].sort(() => 0.5 - Math.random());
  }

  return list.slice(0, config?.limit || 10);
}

export default function App() {
  // Appearance & Customization State — persisted in localStorage
  const [theme, setTheme]       = useState(() => localStorage.getItem('aptixa-theme')    || 'dark');
  const [accent, setAccent]     = useState(() => localStorage.getItem('aptixa-accent')   || 'blue');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('aptixa-font-size') || 'medium');
  const [showPreferences, setShowPreferences] = useState(false);

  // App Navigation & Data State
  const [currentTab, setCurrentTab] = useState('categories');
  const [categories, setCategories] = useState([]);
  const [stats, setStats]           = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');

  // Active Quiz Config & Execution State
  const [configCategory, setConfigCategory]       = useState(null);
  const [configDefaultMode, setConfigDefaultMode] = useState('exam');
  const [activeQuiz, setActiveQuiz]               = useState(null);
  const [quizResult, setQuizResult]               = useState(null);

  // Sync Preferences to Document + persist to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-accent', accent);
    document.documentElement.setAttribute('data-font-size', fontSize);
    localStorage.setItem('aptixa-theme', theme);
    localStorage.setItem('aptixa-accent', accent);
    localStorage.setItem('aptixa-font-size', fontSize);
  }, [theme, accent, fontSize]);

  // Static fallback categories (no backend needed)
  const DEFAULT_CATEGORIES = [
    {
      id: 'quantitative',
      title: 'Quantitative Aptitude',
      description: 'Comprehensive Problem Sets with Step-by-Step Solutions',
      questionCount: SANDBOX_DATABASE.filter(q => q.category === 'quantitative').length,
      icon: 'Zap',
      topics: ['Number System', 'HCF & LCM', 'Percentages', 'Profit & Loss', 'Time & Work'],
    },
    {
      id: 'logical',
      title: 'Logical Reasoning',
      description: 'Analytical Puzzles, Coding-Decoding & Pattern Series',
      questionCount: SANDBOX_DATABASE.filter(q => q.category === 'logical').length,
      icon: 'CheckCircle',
      topics: ['Coding-Decoding', 'Blood Relations', 'Seating Arrangement', 'Syllogism'],
    },
    {
      id: 'verbal',
      title: 'Verbal Ability',
      description: 'Grammar Rules, Vocabulary & Reading Comprehension',
      questionCount: SANDBOX_DATABASE.filter(q => q.category === 'verbal').length || 30,
      icon: 'Clock',
      topics: ['Reading Comprehension', 'Sentence Correction', 'Synonyms', 'Antonyms'],
    },
    {
      id: 'dsa',
      title: 'DSA Placement Hub',
      description: `${DSA_500_PROBLEMS.length} High-Frequency LeetCode Questions with Python Solutions`,
      questionCount: DSA_500_PROBLEMS.length,
      icon: 'Code2',
      topics: ['Arrays', 'Two Pointers', 'Sliding Window', 'Binary Search', 'Linked List', 'Trees', 'DP', 'Graphs'],
    },
  ];

  // ── Data Loading with Persistent Storage ──────────────────────────────────────
  const loadData = async () => {
    try {
      setLoading(true);
      setError('');

      const localAttempts = getStoredAttempts();
      const localStats = computeStatsFromAttempts(localAttempts);

      let cats = DEFAULT_CATEGORIES;
      let st = localStats;

      try {
        const [fetchedCats, fetchedSt] = await Promise.all([fetchCategories(), fetchStats()]);
        if (fetchedCats && fetchedCats.length) cats = fetchedCats;
        if (fetchedSt && fetchedSt.totalAttempts > 0) {
          st = fetchedSt;
        }
      } catch (_) {
        // Backend offline — rely on persistent local storage & cookies
      }

      setCategories(cats);
      setStats(st);
    } catch (err) {
      console.warn('Backend offline — loading persistent local scorecard & accuracy history.');
      const localAttempts = getStoredAttempts();
      setCategories(DEFAULT_CATEGORIES);
      setStats(computeStatsFromAttempts(localAttempts));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Quiz Config Modal ─────────────────────────────────────────────────────────
  const handleOpenQuizConfig = (category, defaultMode = 'exam') => {
    setConfigCategory(category);
    setConfigDefaultMode(defaultMode);
  };

  // ── Launch Customized Quiz ────────────────────────────────────────────────────
  const handleStartQuiz = async (categoryId, config) => {
    try {
      setLoading(true);
      setConfigCategory(null);

      let qs = [];
      try {
        qs = await fetchQuestions({
          category: categoryId,
          limit: config.limit || 10,
          difficulty: config.difficulty || 'all',
          shuffle: config.shuffle !== false,
        });
      } catch (_) {
        qs = [];
      }

      if (!qs || !qs.length) {
        qs = buildStaticQuestions(categoryId, config);
      }

      setActiveQuiz({
        categoryId,
        mode: config.mode || 'exam',
        timerPerQuestion: config.timerPerQuestion || 90,
        questions: qs,
      });
      setCurrentTab('quiz');
    } catch (err) {
      alert('Failed to launch quiz: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Complete Quiz & Persist Scorecard ──────────────────────────────────────────
  const handleCompleteQuiz = async ({ userAnswers, timeSpentSeconds, mode }) => {
    if (!activeQuiz) return;
    setLoading(true);
    try {
      let res;
      try {
        res = await submitQuizAttempt({
          category: activeQuiz.categoryId,
          mode,
          totalQuestions: activeQuiz.questions.length,
          userAnswers,
          timeSpentSeconds,
        });
      } catch (_) {
        let score = 0;
        const breakdown = activeQuiz.questions.map(q => {
          const selectedOpt = userAnswers[q.id];
          const isCorrect   = selectedOpt === q.correctOption;
          if (isCorrect) score++;
          return { questionId: q.id, selectedOpt, isCorrect };
        });
        res = {
          score,
          totalQuestions: activeQuiz.questions.length,
          percentage: Math.round((score / activeQuiz.questions.length) * 100),
          timeSpentSeconds,
          mode,
          breakdown,
        };
      }

      // Persist attempt to localStorage + Cookie fallback
      const updatedStats = saveAttempt({
        category: activeQuiz.categoryId,
        mode,
        score: res.score,
        totalQuestions: res.totalQuestions,
        timeSpentSeconds,
        date: new Date().toISOString()
      });

      // Update state for real-time header accuracy & analytics view
      setStats(updatedStats);

      setQuizResult({ result: res, questions: activeQuiz.questions });
      setCurrentTab('result');
    } catch (err) {
      alert('Submit failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTitle = (id) =>
    categories.find(c => c.id === id)?.title || 'Aptitude Practice';

  const handleSetTab = (tab) => {
    if (tab === 'categories') setActiveQuiz(null);
    setCurrentTab(tab);
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Sticky Responsive Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleSetTab}
        theme={theme}
        toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        stats={stats}
        onOpenPreferences={() => setShowPreferences(true)}
      />

      {/* Main Content */}
      <main style={{ flexGrow: 1, paddingBottom: '60px' }}>

        {/* Loading Spinner */}
        {loading && (
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            minHeight: '60vh', gap: '14px'
          }}>
            <RefreshCw size={32} color="var(--accent-primary)"
              style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Loading APTIXA…
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div style={{
            background: 'var(--danger-bg)', borderBottom: '1px solid var(--danger-border)',
            color: 'var(--danger)', padding: '12px 16px', fontSize: '0.86rem',
            textAlign: 'center', fontWeight: '600'
          }}>
            {error}
          </div>
        )}

        {!loading && (
          <>
            {/* Assessment Domains / Home Tab */}
            {currentTab === 'categories' && (
              <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
                
                {/* Hero Banner */}
                <div className="glass-card" style={{
                  padding: '36px 32px', marginBottom: '36px',
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(124,58,237,0.08) 100%)',
                  border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{ maxWidth: '720px' }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '4px 12px', borderRadius: 'var(--radius-xs)',
                      background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
                      fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-primary)',
                      marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px'
                    }}>
                      <Sparkles size={13} /> Placement Preparation Engine
                    </div>
                    <h1 style={{ fontSize: '2.1rem', lineHeight: '1.2', marginBottom: '12px', fontWeight: '800' }}>
                      Master Aptitude &amp; DSA Solvers
                    </h1>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
                      Practice with full-length timed tests, analyze domain accuracy metrics, explore 500+ LeetCode problems with Python solutions, and master formulas with visual diagrams.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleSetTab('leetcode500')}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <Code2 size={18} /> Explore DSA 500 Hub
                      </button>
                      <button
                        className="btn btn-outline"
                        onClick={() => handleSetTab('tips')}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <Lightbulb size={18} /> Formula Bank
                      </button>
                    </div>
                  </div>
                </div>

                {/* Categories Grid */}
                <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', fontWeight: '700' }}>
                  Select Assessment Domain
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '20px'
                }}>
                  {categories.map(cat => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      onStartQuiz={handleOpenQuizConfig}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* DSA 500 Questions Hub */}
            {currentTab === 'leetcode500' && (
              <LeetCode500Section
                onStartPractice={(problem) => {
                  setActiveQuiz({
                    categoryId: 'dsa',
                    mode: 'practice',
                    timerPerQuestion: 120,
                    questions: buildStaticQuestions('dsa', { limit: 5 }),
                  });
                  setCurrentTab('quiz');
                }}
              />
            )}

            {/* Live Interactive Sandbox */}
            {currentTab === 'sandbox' && (
              <InteractiveSandbox
                onLaunchTopicQuiz={(catId) => {
                  handleOpenQuizConfig(categories.find(c => c.id === catId) || DEFAULT_CATEGORIES[0]);
                }}
              />
            )}

            {/* Popular Books Section */}
            {currentTab === 'books' && <BooksSection />}

            {/* Tips & Formulas Bank */}
            {currentTab === 'tips' && <TipsAndFormulas />}

            {/* Performance Analytics & Persistent History Scorecard */}
            {currentTab === 'stats' && (
              <PerformanceStats stats={stats} />
            )}

            {/* Active Quiz Runner */}
            {currentTab === 'quiz' && activeQuiz && (
              <QuizRunner
                categoryId={activeQuiz.categoryId}
                categoryTitle={getCategoryTitle(activeQuiz.categoryId)}
                mode={activeQuiz.mode}
                timerPerQuestion={activeQuiz.timerPerQuestion}
                questions={activeQuiz.questions}
                onComplete={handleCompleteQuiz}
                onCancel={() => handleSetTab('categories')}
              />
            )}

            {/* Quiz Result View */}
            {currentTab === 'result' && quizResult && (
              <QuizResult
                result={quizResult.result}
                questions={quizResult.questions}
                categoryTitle={getCategoryTitle(activeQuiz?.categoryId)}
                onRetake={() => {
                  if (activeQuiz) {
                    handleStartQuiz(activeQuiz.categoryId, {
                      mode: activeQuiz.mode,
                      limit: activeQuiz.questions.length,
                    });
                  } else {
                    handleSetTab('categories');
                  }
                }}
                onHome={() => handleSetTab('categories')}
              />
            )}
          </>
        )}
      </main>

      {/* Quiz Config Modal */}
      {configCategory && (
        <QuizConfigModal
          category={configCategory}
          defaultMode={configDefaultMode}
          onClose={() => setConfigCategory(null)}
          onStartQuiz={handleStartQuiz}
        />
      )}

      {/* Theme & Customization Modal */}
      {showPreferences && (
        <ThemeCustomizerModal
          theme={theme}
          setTheme={setTheme}
          accent={accent}
          setAccent={setAccent}
          fontSize={fontSize}
          setFontSize={setFontSize}
          onClose={() => setShowPreferences(false)}
        />
      )}

    </div>
  );
}
