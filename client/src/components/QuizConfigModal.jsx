import React, { useState } from 'react';
import { Play, BookCheck, Clock, Shuffle, Sliders, X } from 'lucide-react';

export default function QuizConfigModal({ category, defaultMode, onClose, onStartQuiz }) {
  const [mode, setMode]                     = useState(defaultMode || 'exam');
  const [questionCount, setQuestionCount]   = useState(10);
  const [timerPerQuestion, setTimerPerQuestion] = useState(90);
  const [difficulty, setDifficulty]         = useState('all');
  const [shuffle, setShuffle]               = useState(true);

  const handleLaunch = () => {
    onStartQuiz(category.id, { mode, limit: questionCount, timerPerQuestion, difficulty, shuffle });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content glass-card"
        style={{ padding: '24px' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: 'var(--radius-sm)',
              background: 'var(--accent-primary)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Sliders size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Configure Test Session</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Domain: <strong style={{ color: 'var(--text-secondary)' }}>{category.title}</strong>
              </p>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose} style={{ flexShrink: 0 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Mode Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Select Execution Engine Mode
            </label>
            {/* quiz-mode-btn-group class triggers 1-col on mobile */}
            <div className="quiz-config-grid-2 quiz-mode-btn-group">
              {[
                { id: 'exam', icon: <Play size={15} fill="currentColor" />, label: 'Timed Exam', sub: 'Countdown timer & formal submission' },
                { id: 'practice', icon: <BookCheck size={15} />, label: 'Practice Mode', sub: 'Instant answer reveal & hints' },
              ].map(({ id, icon, label, sub }) => (
                <button
                  key={id}
                  type="button"
                  className={`btn ${mode === id ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setMode(id)}
                  style={{ flexDirection: 'column', gap: '4px', textAlign: 'center', height: 'auto', padding: '12px 10px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '0.88rem' }}>
                    {icon} {label}
                  </div>
                  <span style={{ fontSize: '0.72rem', opacity: 0.8, fontWeight: 'normal', whiteSpace: 'normal', lineHeight: 1.3 }}>
                    {sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Question Count & Difficulty */}
          <div className="quiz-config-grid-2">
            <div>
              <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Question Count
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[5, 10, 15, 20].map(count => (
                  <button
                    key={count}
                    type="button"
                    className={`btn btn-sm question-count-chip ${questionCount === count ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setQuestionCount(count)}
                    style={{ flexGrow: 1, padding: '5px 4px', fontSize: '0.8rem' }}
                  >
                    {count} Qs
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Difficulty Filter
              </label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', fontSize: '0.86rem' }}
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy Only</option>
                <option value="Medium">Medium Only</option>
                <option value="Hard">Hard Only</option>
              </select>
            </div>
          </div>

          {/* Timer & Shuffle */}
          <div className="quiz-config-grid-2">
            <div>
              <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {mode === 'exam' ? 'Time Per Question' : 'Question Ordering'}
              </label>
              {mode === 'exam' ? (
                <select
                  value={timerPerQuestion}
                  onChange={e => setTimerPerQuestion(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '0.86rem' }}
                >
                  <option value={30}>30s — Speed Drill</option>
                  <option value={60}>60s — Standard</option>
                  <option value={90}>90s — Default</option>
                  <option value={120}>120s — Extended</option>
                </select>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.83rem', padding: '8px 0' }}>
                  <Clock size={15} /> Untimed practice mode
                </div>
              )}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Question Order
              </label>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setShuffle(s => !s)}
                style={{
                  width: '100%', justifyContent: 'center',
                  borderColor: shuffle ? 'var(--accent-primary)' : 'var(--border-color)'
                }}
              >
                <Shuffle size={13} color={shuffle ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                {shuffle ? 'Shuffle ON' : 'Fixed Order'}
              </button>
            </div>
          </div>

        </div>

        {/* Action Controls */}
        <div style={{
          display: 'flex', justifyContent: 'flex-end', gap: '10px',
          marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color)',
          flexWrap: 'wrap'
        }}>
          <button className="btn btn-outline" onClick={onClose} style={{ flex: '0 0 auto' }}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleLaunch} style={{ flex: '1 1 auto', minWidth: '160px', justifyContent: 'center' }}>
            <Play size={15} fill="currentColor" /> Launch Test
          </button>
        </div>
      </div>
    </div>
  );
}
