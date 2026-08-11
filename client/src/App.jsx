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
import { DSA_500_PROBLEMS } from './data/dsa500Data';
import { SANDBOX_DATABASE } from './data/sandboxData';
import {
  Zap, CheckCircle, Clock, ChevronRight, RefreshCw,
  ShieldOff, Lightbulb, BookOpen, Sparkles, Code2
} from 'lucide-react';

// ── Helper: build quiz questions from static client data ──────────────────────
// QuizRunner expects: { id, question, options: string[], correctOption: number,
//                       topic, difficulty, explanation, hint? }
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

// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  // Appearance & Customization State
  const [theme, setTheme]           = useState('dark');
  const [accent, setAccent]         = useState('blue');
  const [fontSize, setFontSize]     = useState('medium');
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

  // Sync Preferences to Document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-accent', accent);
    document.documentElement.setAttribute('data-font-size', fontSize);
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

  // ── Data Loading ─────────────────────────────────────────────────────────────
  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [cats, st] = await Promise.all([fetchCategories(), fetchStats()]);
      setCategories(cats);
      setStats(st);
    } catch (err) {
      console.warn('Backend offline/unconfigured — running in standalone client mode.');
      setCategories(DEFAULT_CATEGORIES);
      setStats({ totalAttempts: 0, averageScore: 0, recentAttempts: [] });
      setError('');
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
        // backend unavailable — use local data
        qs = [];
      }

      // If backend returned nothing or failed, use static client data
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

  // ── Complete Quiz & Score ─────────────────────────────────────────────────────
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
        // Score locally
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
        {!loading && error && (
          <div style={{
            maxWidth: '680px', margin: '48px auto 0', padding: '24px',
            background: 'var(--danger-bg)', border: '1px solid var(--danger-border)',
            borderRadius: 'var(--radius-md)', textAlign: 'center'
          }}>
            <ShieldOff size={30} color="var(--danger)" style={{ marginBottom: '10px' }} />
            <p style={{ color: 'var(--danger)', fontWeight: '600', marginBottom: '14px' }}>{error}</p>
            <button className="btn btn-outline" onClick={loadData}>
              <RefreshCw size={15} /> Retry
            </button>
          </div>
        )}

        {/* ── Home: Assessment Domains ── */}
        {!loading && !error && currentTab === 'categories' && (
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>

            {/* Hero */}
            <div className="glass-card hero-container"
              style={{ padding: '32px 24px', marginBottom: '28px' }}>
              <div style={{ maxWidth: '760px' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '3px 10px', borderRadius: 'var(--radius-xs)',
                  background: 'var(--info-bg)', border: '1px solid rgba(59,130,246,0.25)',
                  fontSize: '0.75rem', fontWeight: '700', color: 'var(--info)',
                  marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px'
                }}>
                  <Zap size={11} /> APTIXA Assessment Engine
                </div>
                <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', marginBottom: '10px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                  Master Placement &amp; Competitive Exams
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '20px' }}>
                  Standardized assessment portal covering Quantitative Aptitude, Logical Reasoning,
                  Verbal Ability and DSA. Practice from top reference books or take customised mock exams.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button className="btn btn-primary" onClick={() => setCurrentTab('sandbox')}>
                    <Sparkles size={15} /> Live Solvers
                  </button>
                  <button className="btn btn-outline" onClick={() => setCurrentTab('leetcode500')}>
                    <Code2 size={15} /> DSA Hub
                  </button>
                  <button className="btn btn-outline" onClick={() => setCurrentTab('books')}>
                    <BookOpen size={15} /> Books
                  </button>
                  <button className="btn btn-outline" onClick={() => setCurrentTab('tips')}>
                    <Lightbulb size={15} /> Formulas
                  </button>
                </div>
              </div>
            </div>

            {/* Domain Cards Grid */}
            <h3 style={{
              fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-secondary)',
              textTransform: 'uppercase', letterSpacing: '0.6px',
              marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              Select Exam Domain <ChevronRight size={15} color="var(--text-muted)" />
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
              gap: '16px'
            }}>
              {categories.map(cat => (
                <CategoryCard key={cat.id} category={cat} onOpenConfig={handleOpenQuizConfig} />
              ))}
            </div>
          </div>
        )}

        {/* ── DSA Hub ── */}
        {!loading && currentTab === 'leetcode500' && <LeetCode500Section />}

        {/* ── Interactive Sandbox ── */}
        {!loading && currentTab === 'sandbox' && <InteractiveSandbox />}

        {/* ── Books Repository ── */}
        {!loading && currentTab === 'books' && <BooksSection />}

        {/* ── Tips & Formulas ── */}
        {!loading && currentTab === 'tips' && <TipsAndFormulas />}

        {/* ── Performance Stats ── */}
        {!loading && currentTab === 'stats' && <PerformanceStats stats={stats} />}

        {/* ── Quiz Runner ── */}
        {!loading && currentTab === 'quiz' && activeQuiz && (
          <QuizRunner
            questions={activeQuiz.questions}
            mode={activeQuiz.mode}
            timerPerQuestion={activeQuiz.timerPerQuestion}
            categoryTitle={getCategoryTitle(activeQuiz.categoryId)}
            onCompleteQuiz={handleCompleteQuiz}
            onExitQuiz={() => setCurrentTab('categories')}
          />
        )}

        {/* ── Quiz Result Scorecard ── */}
        {!loading && currentTab === 'result' && quizResult && (
          <QuizResult
            result={quizResult.result}
            questions={quizResult.questions}
            onRetake={() => handleStartQuiz(activeQuiz.categoryId, {
              mode: activeQuiz.mode,
              limit: activeQuiz.questions.length,
              timerPerQuestion: activeQuiz.timerPerQuestion,
            })}
            onBackHome={() => setCurrentTab('categories')}
          />
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

      {/* Theme Customizer Modal */}
      {showPreferences && (
        <ThemeCustomizerModal
          theme={theme}      setTheme={setTheme}
          accent={accent}    setAccent={setAccent}
          fontSize={fontSize} setFontSize={setFontSize}
          onClose={() => setShowPreferences(false)}
        />
      )}
    </div>
  );
}
