import React, { useState, useEffect, useRef } from 'react';
import {
  Clock, Flag, CheckCircle2, XCircle, ArrowLeft, ArrowRight,
  Send, Bookmark, Lightbulb, ChevronDown, ChevronUp, AlertCircle, HelpCircle, X, SkipForward
} from 'lucide-react';
import QuestionPalette from './QuestionPalette';
import { formatTime, getTimerColor } from '../utils/timer';

export default function QuizRunner({ 
  questions = [], 
  mode = 'practice', 
  categoryTitle = 'Quiz', 
  timerPerQuestion = 90,
  onCompleteQuiz, 
  onComplete,
  onExitQuiz,
  onCancel
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [bookmarked, setBookmarked] = useState(new Set());
  const [openSolutions, setOpenSolutions] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState(null);

  const totalExamSeconds = (questions.length || 1) * timerPerQuestion;
  const [secondsRemaining, setSecondsRemaining] = useState(totalExamSeconds);
  const timerRef = useRef(null);

  const handleExit = () => {
    const exitFn = onExitQuiz || onCancel;
    if (typeof exitFn === 'function') {
      exitFn();
    }
  };

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    setShowSubmitModal(false);
    const spent = totalExamSeconds - secondsRemaining;
    const completeFn = onCompleteQuiz || onComplete;
    if (typeof completeFn === 'function') {
      completeFn({ userAnswers, timeSpentSeconds: spent, mode });
    }
  };

  useEffect(() => {
    if (mode !== 'exam') return;
    timerRef.current = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [mode, questions, timerPerQuestion]);

  const q = questions[currentIndex];
  if (!q) return null;

  const selectOption = (optIdx) => {
    const isCorrect = mode === 'practice' && optIdx === q.correctOption;
    setUserAnswers(prev => ({ ...prev, [q.id]: optIdx }));

    if (mode === 'practice') {
      setSelectedAnimation(isCorrect ? 'correct' : 'incorrect');
      setTimeout(() => setSelectedAnimation(null), 900);
    }
  };

  const toggleFlag = () => {
    setFlagged(prev => {
      const next = new Set(prev);
      next.has(q.id) ? next.delete(q.id) : next.add(q.id);
      return next;
    });
  };

  const toggleBookmark = () => {
    setBookmarked(prev => {
      const next = new Set(prev);
      next.has(q.id) ? next.delete(q.id) : next.add(q.id);
      return next;
    });
  };

  const toggleSolution = (id) => {
    setOpenSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const diffBadge = (d) => d?.toLowerCase() === 'easy' ? 'badge-easy' : d?.toLowerCase() === 'hard' ? 'badge-hard' : 'badge-medium';

  const hasAnswered    = userAnswers[q.id] !== undefined;
  const isPractice     = mode === 'practice';
  const practiceReveal = isPractice && hasAnswered;

  const timerColor = getTimerColor(secondsRemaining, totalExamSeconds);
  const timerPct   = (secondsRemaining / totalExamSeconds) * 100;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 12px' }}>

      {/* Top Bar */}
      <div className="glass-card quiz-topbar" style={{ padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button className="btn btn-outline btn-sm" onClick={handleExit}>
            <ArrowLeft size={15} /> Exit
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{categoryTitle}</h2>
              <span className={`badge ${isPractice ? 'badge-easy' : 'badge-hard'}`}>
                {isPractice ? 'Practice' : 'Timed Exam'}
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Topic: <strong style={{ color: 'var(--text-secondary)' }}>{q.topic}</strong>
            </p>
          </div>
        </div>

        <div className="quiz-topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {mode === 'exam' ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px',
              minWidth: '120px'
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: 'var(--font-mono)', fontWeight: '700',
                fontSize: '1.1rem', color: timerColor
              }}>
                <Clock size={16} />
                {formatTime(secondsRemaining)}
              </div>
              <div style={{ width: '120px', height: '4px', background: 'var(--border-color)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${timerPct}%`, background: timerColor, transition: 'width 1s linear, background 1s linear' }} />
              </div>
            </div>
          ) : (
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {currentIndex + 1} / {questions.length}
            </span>
          )}

          <button className="btn btn-success btn-sm" onClick={() => setShowSubmitModal(true)}>
            <Send size={14} /> Submit Test
          </button>
        </div>
      </div>

      {/* Main Grid: Responsive layout */}
      <div className="quiz-layout" style={{ display: 'grid', gridTemplateColumns: mode === 'exam' ? '1fr 280px' : '1fr', gap: '16px' }}>

        {/* Question Card */}
        <div className="glass-card quiz-question-card" style={{ padding: '24px 20px' }}>
          
          {/* Meta row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                background: 'var(--accent-primary)', color: '#fff',
                fontWeight: '800', padding: '3px 10px',
                borderRadius: 'var(--radius-xs)', fontSize: '0.82rem',
                fontFamily: 'var(--font-heading)'
              }}>
                Q{currentIndex + 1}
              </span>
              <span className={`badge ${diffBadge(q.difficulty)}`}>{q.difficulty}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {q.hint && (
                <button className="btn btn-outline btn-sm" onClick={() => setShowHint(true)}
                  style={{ color: 'var(--warning)', borderColor: 'rgba(245,158,11,0.35)' }}>
                  <Lightbulb size={14} /> Hint
                </button>
              )}
              <button
                className={`btn btn-sm ${bookmarked.has(q.id) ? 'btn-primary' : 'btn-outline'}`}
                onClick={toggleBookmark}
                title="Bookmark"
              >
                <Bookmark size={14} />
              </button>
              {mode === 'exam' && (
                <button
                  className={`btn btn-sm ${flagged.has(q.id) ? 'btn-warning' : 'btn-outline'}`}
                  onClick={toggleFlag}
                >
                  <Flag size={14} /> {flagged.has(q.id) ? 'Flagged' : 'Flag'}
                </button>
              )}
            </div>
          </div>

          {/* Question Statement */}
          <p style={{ fontSize: 'var(--quiz-font-size)', lineHeight: '1.7', marginBottom: '24px', fontWeight: '500', color: 'var(--text-primary)' }}>
            {q.question}
          </p>

          {/* Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {q.options.map((optText, optIdx) => {
              const selected    = userAnswers[q.id] === optIdx;
              const isCorrectOp = q.correctOption === optIdx;

              let extraClass = '';
              if (selected) extraClass = 'selected';
              if (practiceReveal && isCorrectOp) extraClass = 'correct';
              if (practiceReveal && selected && !isCorrectOp) extraClass = 'incorrect';

              return (
                <button
                  key={optIdx}
                  className={`option-btn ${extraClass}`}
                  onClick={() => selectOption(optIdx)}
                  disabled={isPractice && hasAnswered}
                >
                  <span style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    border: selected ? '2px solid currentColor' : '1px solid var(--border-color)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '700', fontSize: '0.82rem',
                    background: selected ? 'currentColor' : 'transparent',
                    flexShrink: 0, position: 'relative'
                  }}>
                    <span style={{ color: selected ? 'var(--bg-card)' : 'var(--text-secondary)' }}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                  </span>
                  <span style={{ flexGrow: 1 }}>{optText}</span>
                  {practiceReveal && isCorrectOp && <CheckCircle2 size={18} />}
                  {practiceReveal && selected && !isCorrectOp && <XCircle size={18} />}
                </button>
              );
            })}
          </div>

          {/* Solution Explanation Drawer */}
          {practiceReveal && (
            <div style={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => toggleSolution(q.id)}
                style={{
                  width: '100%', background: 'var(--bg-secondary)',
                  border: 'none', padding: '12px 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer', color: 'var(--accent-primary)', fontWeight: '600',
                  fontSize: '0.88rem'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HelpCircle size={16} /> Step-by-Step Solution
                </span>
                {openSolutions[q.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openSolutions[q.id] && (
                <div style={{
                  padding: '16px',
                  fontSize: '0.87rem', color: 'var(--text-secondary)',
                  lineHeight: '1.7', whiteSpace: 'pre-line',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <strong style={{ color: 'var(--success)', display: 'block', marginBottom: '8px' }}>
                    ✓ Correct: {String.fromCharCode(65 + q.correctOption)}. {q.options[q.correctOption]}
                  </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="quiz-nav-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', flexWrap: 'wrap', gap: '8px' }}>
            <button
              className="btn btn-outline"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(p => p - 1)}
            >
              <ArrowLeft size={15} /> Previous
            </button>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              {hasAnswered && (
                <button className="btn btn-outline btn-sm" onClick={() => {
                  const n = { ...userAnswers }; delete n[q.id]; setUserAnswers(n);
                }}>
                  Clear
                </button>
              )}

              <button
                className="btn btn-outline btn-warning"
                onClick={() => {
                  if (currentIndex < questions.length - 1) {
                    setCurrentIndex(p => p + 1);
                  } else {
                    const firstUnanswered = questions.findIndex(item => userAnswers[item.id] === undefined);
                    if (firstUnanswered !== -1 && firstUnanswered !== currentIndex) {
                      setCurrentIndex(firstUnanswered);
                    } else {
                      setShowSubmitModal(true);
                    }
                  }
                }}
                style={{ gap: '4px', borderColor: 'var(--warning-border)', color: 'var(--warning)', fontWeight: '600' }}
                title="Skip this question for now"
              >
                Skip <SkipForward size={15} />
              </button>

              {currentIndex < questions.length - 1 ? (
                <button className="btn btn-primary" onClick={() => setCurrentIndex(p => p + 1)}>
                  Next <ArrowRight size={15} />
                </button>
              ) : (
                <button className="btn btn-success" onClick={() => setShowSubmitModal(true)}>
                  Finish <Send size={15} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Palette (Exam mode) */}
        {mode === 'exam' && (
          <QuestionPalette
            questions={questions}
            currentIndex={currentIndex}
            userAnswers={userAnswers}
            flaggedQuestions={flagged}
            onSelectQuestion={setCurrentIndex}
          />
        )}
      </div>

      {/* Hint Modal */}
      {showHint && (
        <div className="modal-overlay" onClick={() => setShowHint(false)}>
          <div className="modal-content glass-card" style={{ padding: '24px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--warning)', fontWeight: '700' }}>
                <Lightbulb size={20} /> Formula Hint
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowHint(false)}><X size={16} /></button>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
              {q.hint || 'No specific hint provided for this question.'}
            </p>
            <button className="btn btn-primary btn-sm" style={{ marginTop: '18px', float: 'right' }} onClick={() => setShowHint(false)}>
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="modal-overlay" onClick={() => setShowSubmitModal(false)}>
          <div className="modal-content glass-card" style={{ padding: '28px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <AlertCircle size={26} color="var(--info)" />
              <h3 style={{ fontSize: '1.2rem' }}>Submit Quiz Attempt?</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '10px' }}>
              You have answered <strong>{Object.keys(userAnswers).length}</strong> out of <strong>{questions.length}</strong> questions.
            </p>
            {flagged.size > 0 && (
              <p style={{ color: 'var(--warning)', fontSize: '0.88rem', marginBottom: '18px' }}>
                ⚑ {flagged.size} question(s) still flagged for review.
              </p>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button className="btn btn-outline" onClick={() => setShowSubmitModal(false)}>Continue Quiz</button>
              <button className="btn btn-success" onClick={handleSubmit}>Confirm Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
