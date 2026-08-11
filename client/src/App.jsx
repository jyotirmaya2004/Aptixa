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
import { Zap, CheckCircle, Clock, ChevronRight, RefreshCw, ShieldOff, Sliders, Lightbulb, BookOpen, Sparkles, Code2 } from 'lucide-react';

export default function App() {
  // Appearance & Customization State
  const [theme, setTheme] = useState('dark');
  const [accent, setAccent] = useState('blue');
  const [fontSize, setFontSize] = useState('medium');
  const [showPreferences, setShowPreferences] = useState(false);

  // App Navigation & Data State
  const [currentTab, setCurrentTab] = useState('categories');
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Active Quiz Config & Execution State
  const [configCategory, setConfigCategory] = useState(null);
  const [configDefaultMode, setConfigDefaultMode] = useState('exam');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  // Admin Auth State
  const [adminAuthed, setAdminAuthed] = useState(false);

  // Sync Preferences to Document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-accent', accent);
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [theme, accent, fontSize]);

  const DEFAULT_CATEGORIES = [
    { id: 'dsa', title: 'DSA Placement Hub', description: '525 High-Frequency LeetCode Questions with Python Solutions', questionCount: 525, icon: 'Code2', topics: ['Arrays', 'Two Pointers', 'Sliding Window', 'Binary Search', 'Linked List', 'Trees', 'DP', 'Graphs'] },
    { id: 'quantitative', title: 'Quantitative Aptitude', description: 'Comprehensive Problem Sets with Step-by-Step Solutions', questionCount: 40, icon: 'Zap', topics: ['Number System', 'HCF & LCM', 'Percentages', 'Profit & Loss', 'Time & Work'] },
    { id: 'logical', title: 'Logical Reasoning', description: 'Analytical Puzzles, Coding-Decoding & Pattern Series', questionCount: 30, icon: 'CheckCircle', topics: ['Coding-Decoding', 'Blood Relations', 'Seating Arrangement', 'Syllogism'] },
    { id: 'verbal', title: 'Verbal Ability', description: 'Grammar Rules, Vocabulary & Reading Comprehension', questionCount: 30, icon: 'Clock', topics: ['Reading Comprehension', 'Sentence Correction', 'Synonyms', 'Antonyms'] }
  ];

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [cats, st] = await Promise.all([fetchCategories(), fetchStats()]);
      setCategories(cats);
      setStats(st);
      setLoading(false);
    } catch (err) {
      console.warn('Backend server unconfigured or offline. Running in local Vercel mode.');
      setCategories(DEFAULT_CATEGORIES);
      setStats({
        totalAttempts: 0,
        averageScore: 0,
        recentAttempts: []
      });
      setError('');
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // Open Quiz Parameter Configuration Modal
  const handleOpenQuizConfig = (category, defaultMode = 'exam') => {
    setConfigCategory(category);
    setConfigDefaultMode(defaultMode);
  };

function getStaticQuestions(categoryId, config) {
  let list = [];
  if (categoryId === 'dsa') {
    list = DSA_500_PROBLEMS.map((item, idx) => ({
      id: item.id || `dsa-${idx}`,
      question: `${item.title} — ${item.problem ? item.problem.slice(0, 180) : item.title}...`,
      options: {
        a: `Optimal Complexity: ${item.timeComplexity || 'O(N)'}`,
        b: `Brute Force: O(N²)`,
        c: `Logarithmic: O(log N)`,
        d: `Constant: O(1)`
      },
      correct_option: 'a',
      explanation: `Python Solution Code:\n${item.solutionPython || 'See DSA Hub for complete code'}`
    }));
  } else {
    const categoryFilterMap = {
      quantitative: 'quantitative',
      logical: 'logical',
      verbal: 'verbal'
    };
    const targetCat = categoryFilterMap[categoryId] || 'quantitative';
    const filtered = SANDBOX_DATABASE.filter(q => q.category === targetCat);
    list = filtered.map((q, idx) => ({
      id: q.id || `${targetCat}-${idx}`,
      question: `${q.title}: ${q.description || 'Solve the following problem using standard formulas.'}`,
      options: {
        a: q.formula || 'Formula Option A',
        b: 'Option B',
        c: 'Option C',
        d: 'Option D'
      },
      correct_option: 'a',
      explanation: q.shortcutTip || q.description || 'Standard solution steps.'
    }));
  }

  if (!list.length) {
    list = SANDBOX_DATABASE.slice(0, 10).map((q, idx) => ({
      id: `gen-${idx}`,
      question: `${q.title}: ${q.description}`,
      options: { a: q.formula || 'Option A', b: 'Option B', c: 'Option C', d: 'Option D' },
      correct_option: 'a',
      explanation: q.shortcutTip || 'Standard solution'
    }));
  }

  if (config?.shuffle !== false) {
    list = [...list].sort(() => 0.5 - Math.random());
  }

  return list.slice(0, config?.limit || 10);
}

// Launch Customized Quiz
const handleStartQuiz = async (categoryId, config) => {
  try {
    setLoading(true);
    setConfigCategory(null); // Close modal

    let qs = [];
    try {
      qs = await fetchQuestions({
        category: categoryId,
        limit: config.limit || 10,
        difficulty: config.difficulty || 'all',
        shuffle: config.shuffle !== false
      });
    } catch (e) {
      console.warn('Backend unconfigured/offline. Launching quiz with local client questions.');
      qs = getStaticQuestions(categoryId, config);
    }

    if (!qs?.length) {
      qs = getStaticQuestions(categoryId, config);
    }

    setActiveQuiz({
      categoryId,
      mode: config.mode || 'exam',
      timerPerQuestion: config.timerPerQuestion || 90,
      questions: qs
    });

    setCurrentTab('quiz');
    setLoading(false);
  } catch (err) {
    alert('Failed to launch quiz: ' + err.message);
    setLoading(false);
  }
};

const handleCompleteQuiz = async ({ userAnswers, timeSpentSeconds, mode }) => {
  if (!activeQuiz) return;
  try {
    setLoading(true);
    let res;
    try {
      res = await submitQuizAttempt({
        category: activeQuiz.categoryId,
        mode,
        totalQuestions: activeQuiz.questions.length,
        userAnswers,
        timeSpentSeconds
      });
    } catch (e) {
      console.warn('Backend unconfigured. Evaluating score locally.');
      let score = 0;
      activeQuiz.questions.forEach(q => {
        if (userAnswers[q.id]?.toLowerCase() === q.correct_option?.toLowerCase()) {
          score++;
        }
      });
      res = {
        score,
        totalQuestions: activeQuiz.questions.length,
        percentage: Math.round((score / activeQuiz.questions.length) * 100),
        timeSpentSeconds
      };
    }

    setQuizResult({ result: res, questions: activeQuiz.questions });
    setCurrentTab('result');
    loadData();
    setLoading(false);
  } catch (err) {
    alert('Submit failed: ' + err.message);
    setLoading(false);
  }
};

  const getCategoryTitle = (id) => categories.find(c => c.id === id)?.title || 'Aptitude Practice';

  const handleSetTab = (tab) => {
    if (tab !== 'admin') setAdminAuthed(false);
    if (tab === 'categories') setActiveQuiz(null);
    setCurrentTab(tab);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Responsive Sticky Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleSetTab}
        theme={theme}
        toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        stats={stats}
        onOpenPreferences={() => setShowPreferences(true)}
      />

      {/* Main Responsive Body */}
      <main style={{ flexGrow: 1, paddingBottom: '60px' }}>

        {/* Loading Spinner */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '14px' }}>
            <RefreshCw size={30} color="var(--accent-primary)" style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Loading APTIXA Platform...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Error Notification */}
        {!loading && error && (
          <div style={{ maxWidth: '680px', margin: '48px auto', padding: '24px', background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <ShieldOff size={30} color="var(--danger)" style={{ marginBottom: '10px' }} />
            <p style={{ color: 'var(--danger)', fontWeight: '600', marginBottom: '14px' }}>{error}</p>
            <button className="btn btn-outline" onClick={loadData}><RefreshCw size={15} /> Retry</button>
          </div>
        )}

        {/* ── View 1: Assessment Domains ── */}
        {!loading && !error && currentTab === 'categories' && (
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>

            {/* Hero Container */}
            <div className="glass-card hero-container" style={{ padding: '36px 32px', marginBottom: '32px' }}>
              <div style={{ maxWidth: '780px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: 'var(--radius-xs)', background: 'var(--info-bg)', border: '1px solid rgba(59,130,246,0.25)', fontSize: '0.78rem', fontWeight: '700', color: 'var(--info)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <Zap size={12} /> APTIXA Assessment Engine
                </div>
                <h2 style={{ fontSize: '2rem', marginBottom: '12px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                  Master Placement &amp; Competitive Exams
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '22px' }}>
                  Standardized assessment portal covering Quantitative Aptitude, Logical Reasoning, Verbal Ability, Data Interpretation, and CS/Technical Core. Practice from top reference books or customize mock exams.
                </p>
                
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button className="btn btn-primary" onClick={() => setCurrentTab('sandbox')}>
                    <Sparkles size={16} /> 220 Live Interactive Solvers
                  </button>
                  <button className="btn btn-outline" onClick={() => setCurrentTab('leetcode500')}>
                    <Code2 size={16} /> 500 DSA Solvers
                  </button>
                  <button className="btn btn-outline" onClick={() => setCurrentTab('books')}>
                    <BookOpen size={16} /> Explore Books
                  </button>
                  <button className="btn btn-outline" onClick={() => setCurrentTab('tips')}>
                    <Lightbulb size={16} /> Formulas &amp; Exam Tips
                  </button>
                </div>

              </div>
            </div>

            {/* Responsive Domain Grid */}
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Select Exam Domain
              <ChevronRight size={16} color="var(--text-muted)" />
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {categories.map(cat => (
                <CategoryCard key={cat.id} category={cat} onOpenConfig={handleOpenQuizConfig} />
              ))}
            </div>
          </div>
        )}

        {/* ── View 2: 500 LeetCode DSA Preparation ── */}
        {!loading && currentTab === 'leetcode500' && (
          <LeetCode500Section />
        )}

        {/* ── View 3: Live Interactive Sandbox Hub ── */}
        {!loading && currentTab === 'sandbox' && (
          <InteractiveSandbox />
        )}

        {/* ── View 3: Popular Books Repository ── */}
        {!loading && currentTab === 'books' && (
          <BooksSection />
        )}

        {/* ── View 3: Exam Tips & Formulas ── */}
        {!loading && currentTab === 'tips' && (
          <TipsAndFormulas />
        )}

        {/* ── View 4: Interactive Quiz Runner ── */}
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

        {/* ── View 5: Diagnostic Result Scorecard ── */}
        {!loading && currentTab === 'result' && quizResult && (
          <QuizResult
            result={quizResult.result}
            questions={quizResult.questions}
            onRetake={() => handleStartQuiz(activeQuiz.categoryId, {
              mode: activeQuiz.mode,
              limit: activeQuiz.questions.length,
              timerPerQuestion: activeQuiz.timerPerQuestion
            })}
            onBackHome={() => setCurrentTab('categories')}
          />
        )}

        {/* ── View 6: Analytics Audit Dashboard ── */}
        {!loading && currentTab === 'stats' && (
          <PerformanceStats stats={stats} />
        )}

      </main>

      {/* Quiz Parameter Configuration Modal */}
      {configCategory && (
        <QuizConfigModal
          category={configCategory}
          defaultMode={configDefaultMode}
          onClose={() => setConfigCategory(null)}
          onStartQuiz={handleStartQuiz}
        />
      )}

      {/* Theme & Platform Customization Preferences Modal */}
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
