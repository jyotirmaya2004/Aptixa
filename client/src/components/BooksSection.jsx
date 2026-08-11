import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Layers, CheckCircle2, XCircle, Search, ArrowLeft, 
  ChevronRight, ChevronLeft, Bookmark, FileText, Sparkles, RefreshCw, 
  HelpCircle, Eye, Zap, AlertCircle, Award, BarChart3, CheckSquare, Send, RotateCcw, ListFilter
} from 'lucide-react';
import { fetchBooks, fetchBookChapter } from '../utils/api';
import { STATIC_BOOKS } from '../data/booksData';

export default function BooksSection({ onOpenQuizWithQuestions }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [activeChapterData, setActiveChapterData] = useState(null);
  const [chapterLoading, setChapterLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Chapter Practice State (Default to 'paged' single-screen view)
  const [viewMode, setViewMode] = useState('paged'); // 'paged' (1 question per screen) or 'singlePage' (all list)
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswerKey, setShowAnswerKey] = useState({});
  
  // Submit & Evaluation Result State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const loadBooksData = async () => {
    try {
      setLoading(true);
      const data = await fetchBooks();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      console.warn('Using static books fallback for Vercel deployment');
      setBooks(STATIC_BOOKS);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooksData();
  }, []);

  // Keyboard navigation for fast question switching (Left Arrow = Prev, Right Arrow = Next)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeChapterData || viewMode !== 'paged') return;
      const totalQs = activeChapterData.chapter?.questions?.length || 0;

      if (e.key === 'ArrowRight' && currentQIndex < totalQs - 1) {
        setCurrentQIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentQIndex > 0) {
        setCurrentQIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeChapterData, viewMode, currentQIndex]);

  const handleOpenChapter = async (bookId, chapterId) => {
    try {
      setChapterLoading(true);
      const data = await fetchBookChapter(bookId, chapterId);
      setActiveChapterData(data);
      setCurrentQIndex(0);
      setSelectedAnswers({});
      setShowAnswerKey({});
      setIsSubmitted(false);
      setEvaluationResult(null);
      setChapterLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert('Failed to load chapter: ' + err.message);
      setChapterLoading(false);
    }
  };

  const handleOptionClick = (qId, optionKey) => {
    if (isSubmitted) return; // Freeze answers after test submission
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionKey
    }));
  };

  const toggleShowAnswer = (qId) => {
    setShowAnswerKey(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Submit test and calculate chapter performance metrics
  const handleSubmitChapterTest = () => {
    if (!activeChapterData?.chapter?.questions) return;
    const questions = activeChapterData.chapter.questions;
    
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    questions.forEach(q => {
      const userChoice = selectedAnswers[q.id];
      if (!userChoice) {
        unattemptedCount++;
      } else if (userChoice.toLowerCase() === q.correct_option?.toLowerCase()) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const totalQs = questions.length;
    const attemptedCount = correctCount + incorrectCount;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const overallScorePercent = Math.round((correctCount / totalQs) * 100);

    const result = {
      totalQs,
      correctCount,
      incorrectCount,
      unattemptedCount,
      attemptedCount,
      accuracy,
      overallScorePercent
    };

    setEvaluationResult(result);
    setIsSubmitted(true);

    // Reveal all answer keys after submission so student can review
    const allAnswerKeys = {};
    questions.forEach(q => {
      allAnswerKeys[q.id] = true;
    });
    setShowAnswerKey(allAnswerKeys);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeTest = () => {
    setIsSubmitted(false);
    setEvaluationResult(null);
    setSelectedAnswers({});
    setShowAnswerKey({});
    setCurrentQIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.chapters || []).some(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // ── VIEW 3: Interactive Chapter Question Practice Runner & Result Scorecard ──
  if (activeChapterData) {
    const { chapter, bookTitle, author } = activeChapterData;
    const questions = chapter.questions || [];
    const answeredCount = Object.keys(selectedAnswers).length;
    const currentQ = questions[currentQIndex];

    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '8px 8px' }}>
        
        {/* Evaluation Result Summary Scorecard (If Submitted) */}
        {isSubmitted && evaluationResult && (
          <div className="glass-card" style={{ padding: '16px', marginBottom: '14px', borderTop: '5px solid var(--success)', background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} color="var(--success)" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Chapter Evaluation Scorecard</h3>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Performance analysis for <strong>{chapter.title}</strong>
                </p>
              </div>

              <button 
                className="btn btn-outline btn-sm" 
                onClick={handleRetakeTest}
                style={{ gap: '4px', fontSize: '0.78rem' }}
              >
                <RotateCcw size={14} /> Retake Practice
              </button>
            </div>

            {/* KPI Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
              <div style={{ padding: '8px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Overall Score</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--accent-primary)', marginTop: '2px' }}>
                  {evaluationResult.overallScorePercent}%
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{evaluationResult.correctCount} / {evaluationResult.totalQs} Correct</div>
              </div>

              <div style={{ padding: '8px', background: 'var(--success-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--success-border)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--success)', fontWeight: '700', textTransform: 'uppercase' }}>Accuracy</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--success)', marginTop: '2px' }}>
                  {evaluationResult.accuracy}%
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Of Attempted</div>
              </div>

              <div style={{ padding: '8px', background: 'var(--danger-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--danger-border)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--danger)', fontWeight: '700', textTransform: 'uppercase' }}>Incorrect</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--danger)', marginTop: '2px' }}>
                  {evaluationResult.incorrectCount}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Wrong Answers</div>
              </div>

              <div style={{ padding: '8px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Unattempted</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--warning)', marginTop: '2px' }}>
                  {evaluationResult.unattemptedCount}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Skipped Qs</div>
              </div>
            </div>
          </div>
        )}

        {/* ── MODE 1: ULTRA-COMPACT SINGLE SCREEN QUESTION CARD (FITS 100% WITHOUT SCROLLING!) ── */}
        {viewMode === 'paged' && currentQ && (
          <div className="glass-card" style={{ padding: '14px 14px', marginBottom: '12px', boxShadow: 'var(--shadow-md)' }}>
            
            {/* Ultra Compact Top Header Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '6px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => setActiveChapterData(null)}
                  style={{ gap: '3px', padding: '2px 6px', fontSize: '0.75rem' }}
                >
                  <ArrowLeft size={13} /> Back
                </button>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                  {chapter.title}
                </span>
                <span className="badge badge-info" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  Q {currentQIndex + 1} / {questions.length}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Attempted: {answeredCount}/{questions.length}
                </span>

                <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '2px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-color)' }}>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => setViewMode('paged')}
                    style={{ padding: '2px 6px', fontSize: '0.7rem' }}
                  >
                    1 Q
                  </button>
                  <button 
                    className="btn btn-sm btn-ghost"
                    onClick={() => setViewMode('singlePage')}
                    style={{ padding: '2px 6px', fontSize: '0.7rem' }}
                  >
                    All Qs
                  </button>
                </div>
              </div>
            </div>

            {/* Directions / Context if present */}
            {currentQ.context && (
              <div style={{ padding: '6px 10px', background: 'var(--bg-secondary)', borderLeft: '3px solid var(--warning)', borderRadius: 'var(--radius-xs)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                💡 <strong>Directions:</strong> {currentQ.context}
              </div>
            )}

            {/* Question Text */}
            <h3 style={{ fontSize: '0.94rem', fontWeight: '600', lineHeight: '1.4', marginBottom: '12px', wordBreak: 'break-word' }}>
              {currentQ.question}
            </h3>

            {/* Compact Multiple Choice Options Grid */}
            <div style={{ display: 'grid', gap: '6px', marginBottom: '14px' }}>
              {Object.entries(currentQ.options || {}).map(([optKey, optVal]) => {
                const isSelected = selectedAnswers[currentQ.id] === optKey;
                const isAnswerShown = showAnswerKey[currentQ.id];
                const isCorrect = currentQ.correct_option === optKey;

                let borderStyle = '1px solid var(--border-color)';
                let bgStyle = 'var(--bg-secondary)';
                let textColor = 'var(--text-primary)';

                if (isSelected) {
                  borderStyle = '2px solid var(--accent-primary)';
                  bgStyle = 'rgba(37,99,235,0.12)';
                }

                if (isAnswerShown || isSubmitted) {
                  if (isCorrect) {
                    borderStyle = '2px solid var(--success)';
                    bgStyle = 'var(--success-bg)';
                    textColor = 'var(--success)';
                  } else if (isSelected && !isCorrect) {
                    borderStyle = '2px solid var(--danger)';
                    bgStyle = 'var(--danger-bg)';
                    textColor = 'var(--danger)';
                  }
                }

                return (
                  <button
                    key={optKey}
                    disabled={isSubmitted}
                    onClick={() => handleOptionClick(currentQ.id, optKey)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '8px 12px', borderRadius: 'var(--radius-sm)',
                      background: bgStyle, border: borderStyle, color: textColor,
                      cursor: isSubmitted ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.86rem',
                      width: '100%', wordBreak: 'break-word', transition: 'all 0.12s ease'
                    }}
                  >
                    <span style={{
                      width: '22px', height: '22px', borderRadius: '50%',
                      background: isSelected ? 'var(--accent-primary)' : 'var(--bg-card)',
                      color: isSelected ? '#fff' : 'var(--text-secondary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase',
                      border: '1px solid var(--border-color)', flexShrink: 0
                    }}>
                      {optKey}
                    </span>
                    <span style={{ flexGrow: 1, lineHeight: '1.3' }}>{optVal}</span>
                    {(isAnswerShown || isSubmitted) && isCorrect && <CheckCircle2 size={15} color="var(--success)" />}
                    {(isAnswerShown || isSubmitted) && isSelected && !isCorrect && <XCircle size={15} color="var(--danger)" />}
                  </button>
                );
              })}
            </div>

            {/* Solution / Explanation Box */}
            {showAnswerKey[currentQ.id] && (
              <div style={{ marginBottom: '12px', padding: '10px 12px', background: 'var(--success-bg)', border: '1px solid var(--success-border)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontWeight: '700', color: 'var(--success)', marginBottom: '2px', fontSize: '0.82rem' }}>
                  Correct Option: ({currentQ.correct_option?.toUpperCase()}) — {currentQ.answer}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  Question #{currentQ.question_number} (Book Page {currentQ.book_page || 'N/A'}).
                </div>
              </div>
            )}

            {/* COMPACT ACTION BUTTON CONTROL ROW (PROMINENTLY VISIBLE IN THE CENTER OF SCREEN!) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '6px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  className="btn btn-outline btn-sm"
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(i => i - 1)}
                  style={{ gap: '3px', padding: '5px 10px', fontSize: '0.78rem' }}
                >
                  <ChevronLeft size={14} /> Prev
                </button>

                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => toggleShowAnswer(currentQ.id)}
                  style={{ gap: '3px', padding: '5px 10px', fontSize: '0.75rem' }}
                >
                  <Eye size={13} /> {showAnswerKey[currentQ.id] ? 'Hide' : 'Solution'}
                </button>
              </div>

              {/* NEXT QUESTION & SUBMIT TEST BUTTONS */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  className="btn btn-primary btn-sm"
                  disabled={currentQIndex === questions.length - 1}
                  onClick={() => setCurrentQIndex(i => i + 1)}
                  style={{ gap: '4px', fontWeight: '700', padding: '6px 14px', fontSize: '0.82rem', background: 'var(--accent-primary)' }}
                >
                  Next Q <ChevronRight size={15} />
                </button>

                {!isSubmitted && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={handleSubmitChapterTest}
                    style={{ gap: '4px', fontWeight: '700', padding: '6px 14px', fontSize: '0.82rem' }}
                  >
                    <Send size={13} /> Submit Test
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ── MODE 2: ALL QUESTIONS LIST VIEW ── */}
        {viewMode === 'singlePage' && (
          <div style={{ display: 'grid', gap: '14px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => setActiveChapterData(null)}
                style={{ gap: '4px', fontSize: '0.78rem' }}
              >
                <ArrowLeft size={14} /> Back to Chapters
              </button>
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => setViewMode('paged')}
                style={{ gap: '4px', fontSize: '0.75rem' }}
              >
                <Layers size={13} /> Switch to 1-Screen View
              </button>
            </div>

            {questions.map((q, idx) => {
              const isSelected = selectedAnswers[q.id];
              const isAnswerShown = showAnswerKey[q.id];
              const isCorrect = isSelected && isSelected.toLowerCase() === q.correct_option?.toLowerCase();
              const isWrong = isSelected && isSelected.toLowerCase() !== q.correct_option?.toLowerCase();

              return (
                <div 
                  key={q.id || idx} 
                  id={`q-${idx}`}
                  className="glass-card" 
                  style={{ 
                    padding: '14px 14px',
                    borderLeft: isSubmitted ? (isCorrect ? '4px solid var(--success)' : isWrong ? '4px solid var(--danger)' : '4px solid var(--warning)') : '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="badge badge-info" style={{ fontFamily: 'var(--font-mono)' }}>
                        Q.{q.question_number || idx + 1}
                      </span>
                      {isSubmitted && (
                        isCorrect ? (
                          <span className="badge badge-easy">✓ Correct</span>
                        ) : isWrong ? (
                          <span className="badge badge-hard">✗ Incorrect</span>
                        ) : (
                          <span className="badge badge-medium">Skipped</span>
                        )
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '8px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {q.book_page && <span>📖 Book Page: <strong>{q.book_page}</strong></span>}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '0.92rem', fontWeight: '600', lineHeight: '1.4', marginBottom: '10px', wordBreak: 'break-word' }}>
                    {q.question}
                  </h3>

                  <div style={{ display: 'grid', gap: '6px', marginBottom: '10px' }}>
                    {Object.entries(q.options || {}).map(([optKey, optVal]) => {
                      const isOptionSelected = selectedAnswers[q.id] === optKey;
                      const isOptionCorrect = q.correct_option === optKey;

                      let borderStyle = '1px solid var(--border-color)';
                      let bgStyle = 'var(--bg-secondary)';
                      let textColor = 'var(--text-primary)';

                      if (isOptionSelected) {
                        borderStyle = '2px solid var(--accent-primary)';
                        bgStyle = 'rgba(37,99,235,0.12)';
                      }

                      if (isAnswerShown || isSubmitted) {
                        if (isOptionCorrect) {
                          borderStyle = '2px solid var(--success)';
                          bgStyle = 'var(--success-bg)';
                          textColor = 'var(--success)';
                        } else if (isOptionSelected && !isOptionCorrect) {
                          borderStyle = '2px solid var(--danger)';
                          bgStyle = 'var(--danger-bg)';
                          textColor = 'var(--danger)';
                        }
                      }

                      return (
                        <button
                          key={optKey}
                          disabled={isSubmitted}
                          onClick={() => handleOptionClick(q.id, optKey)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '8px 12px', borderRadius: 'var(--radius-sm)',
                            background: bgStyle, border: borderStyle, color: textColor,
                            cursor: isSubmitted ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.85rem',
                            width: '100%', wordBreak: 'break-word'
                          }}
                        >
                          <span style={{
                            width: '22px', height: '22px', borderRadius: '50%',
                            background: isOptionSelected ? 'var(--accent-primary)' : 'var(--bg-card)',
                            color: isOptionSelected ? '#fff' : 'var(--text-secondary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: '700', fontSize: '0.75rem', textTransform: 'uppercase',
                            border: '1px solid var(--border-color)', flexShrink: 0
                          }}>
                            {optKey}
                          </span>
                          <span style={{ flexGrow: 1, lineHeight: '1.3' }}>{optVal}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => toggleShowAnswer(q.id)}
                    style={{ gap: '4px', fontSize: '0.73rem' }}
                  >
                    <Eye size={13} /> {showAnswerKey[q.id] ? 'Hide Key' : 'Reveal Solution'}
                  </button>

                  {showAnswerKey[q.id] && (
                    <div style={{ marginTop: '8px', padding: '8px 10px', background: 'var(--success-bg)', border: '1px solid var(--success-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem' }}>
                      <strong style={{ color: 'var(--success)' }}>Correct: ({q.correct_option?.toUpperCase()}) — {q.answer}</strong>
                    </div>
                  )}
                </div>
              );
            })}

            {!isSubmitted && (
              <div style={{ textAlign: 'center', margin: '16px 0' }}>
                <button 
                  className="btn btn-success btn-md"
                  onClick={handleSubmitChapterTest}
                  style={{ padding: '10px 28px', fontSize: '0.9rem', fontWeight: '800', gap: '6px' }}
                >
                  <Send size={15} /> Submit Chapter Test &amp; View Scorecard
                </button>
              </div>
            )}
          </div>
        )}

        {/* Jump to Question Palette Grid */}
        <div className="glass-card" style={{ padding: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
              Jump to Question
            </h4>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Use ← → Arrow Keys to switch
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(32px, 1fr))', gap: '4px', maxHeight: '120px', overflowY: 'auto' }}>
            {questions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id];
              const isCurrent = currentQIndex === idx && viewMode === 'paged';
              return (
                <button
                  key={q.id || idx}
                  onClick={() => {
                    setCurrentQIndex(idx);
                    if (viewMode === 'singlePage') {
                      const el = document.getElementById(`q-${idx}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  style={{
                    padding: '4px', fontSize: '0.7rem', fontWeight: '700',
                    borderRadius: 'var(--radius-xs)', 
                    border: isCurrent ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    background: isCurrent ? 'var(--accent-primary)' : (isAnswered ? 'var(--info-bg)' : 'var(--bg-secondary)'),
                    color: isCurrent ? '#fff' : (isAnswered ? 'var(--info)' : 'var(--text-primary)'),
                    cursor: 'pointer'
                  }}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // ── VIEW 2: Selected Book Chapters Explorer ──
  if (selectedBook) {
    return (
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 10px' }}>
        
        <button 
          className="btn btn-ghost btn-sm"
          onClick={() => setSelectedBook(null)}
          style={{ gap: '6px', marginBottom: '14px' }}
        >
          <ArrowLeft size={15} /> Back to All Books
        </button>

        {/* Book Header Card */}
        <div className="glass-card" style={{ padding: '20px 16px', marginBottom: '20px', borderLeft: `6px solid ${selectedBook.coverColor || 'var(--accent-primary)'}` }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '2px 8px', borderRadius: 'var(--radius-xs)', background: 'var(--info-bg)', fontSize: '0.72rem', fontWeight: '700', color: 'var(--info)', marginBottom: '8px' }}>
            <BookOpen size={12} /> Popular Standard Reference Book
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '4px', lineHeight: '1.3' }}>
            {selectedBook.title}
          </h2>
          <div style={{ fontSize: '0.86rem', color: 'var(--accent-primary)', fontWeight: '600', marginBottom: '8px' }}>
            By {selectedBook.author}
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.45', maxWidth: '800px' }}>
            {selectedBook.description}
          </p>
        </div>

        {/* Chapters List */}
        {(() => {
          const uniqueChapters = [];
          const seenKeys = new Set();
          (selectedBook.chapters || []).forEach((ch, idx) => {
            const key = ch.id || ch.chapter_number || idx;
            if (!seenKeys.has(key)) {
              seenKeys.add(key);
              uniqueChapters.push(ch);
            }
          });

          return (
            <>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={16} color="var(--accent-primary)" /> Index of Book Chapters ({uniqueChapters.length})
              </h3>

              {chapterLoading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}><RefreshCw size={24} className="spin" /> Loading chapter...</div>
              ) : (
                <div style={{ display: 'grid', gap: '10px' }}>
                  {uniqueChapters.map((ch, idx) => (
                    <div 
                      key={ch.id || idx} 
                      className="glass-card" 
                      style={{ 
                        padding: '14px 16px', 
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                        flexWrap: 'wrap', gap: '10px', transition: 'all 0.2s ease' 
                      }}
                    >
                      <div style={{ flex: '1 1 220px' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '2px' }}>
                          {ch.title}
                        </h4>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          {ch.description || 'Extracted questions and solutions.'}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', justifyContent: 'space-between', maxWidth: '260px' }}>
                        <span className="badge badge-info" style={{ fontSize: '0.73rem' }}>
                          {ch.question_count || ch.questions?.length || 0} Questions
                        </span>

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleOpenChapter(selectedBook.id, ch.id)}
                          style={{ gap: '4px', fontSize: '0.8rem', padding: '6px 12px' }}
                        >
                          Start Practice <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          );
        })()}

      </div>
    );
  }

  // ── VIEW 1: Books Library Grid ──
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 10px' }}>
      
      {/* Top Banner */}
      <div className="glass-card" style={{ padding: '20px 16px', marginBottom: '20px' }}>
        <div style={{ maxWidth: '850px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '2px 8px', borderRadius: 'var(--radius-xs)', background: 'var(--info-bg)', border: '1px solid rgba(59,130,246,0.25)', fontSize: '0.72rem', fontWeight: '700', color: 'var(--info)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <BookOpen size={12} /> Competitive Examination Book Repository
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '6px', fontWeight: '800', lineHeight: '1.3' }}>
            Standard Placement &amp; Competitive Reference Books
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.45', marginBottom: '14px' }}>
            Practice questions extracted directly chapter-by-chapter from standard preparation books (R.S. Aggarwal, Arun Sharma, etc.) with original page citations.
          </p>

          {/* Search bar */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', maxWidth: '480px', width: '100%' }}>
            <Search size={15} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search book title, author, or chapter..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', border: 'none', background: 'transparent', fontSize: '0.86rem', outline: 'none' }}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <RefreshCw size={26} color="var(--accent-primary)" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Loading Book Library...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '16px' }}>
          {filteredBooks.map(book => (
            <div 
              key={book.id} 
              className="glass-card"
              style={{ 
                padding: '16px', 
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                borderTop: `4px solid ${book.coverColor || 'var(--accent-primary)'}` 
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-info" style={{ textTransform: 'uppercase', fontSize: '0.68rem' }}>
                    {book.category}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    📖 {book.chapterCount} Chapters
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '3px', lineHeight: '1.3' }}>
                  {book.title}
                </h3>
                <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--accent-primary)', marginBottom: '8px' }}>
                  By {book.author}
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.45', marginBottom: '12px' }}>
                  {book.description}
                </p>
              </div>

              <div style={{ paddingTop: '10px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                  {book.totalQuestions} Questions
                </span>

                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setSelectedBook(book)}
                  style={{ gap: '4px', padding: '5px 10px', fontSize: '0.78rem' }}
                >
                  Explore Chapters <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
