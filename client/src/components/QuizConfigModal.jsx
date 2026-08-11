import React, { useState } from 'react';
import { Settings, Play, BookCheck, Clock, Layers, Shuffle, Sliders, X } from 'lucide-react';

export default function QuizConfigModal({ category, defaultMode, onClose, onStartQuiz }) {
  const [mode, setMode] = useState(defaultMode || 'exam');
  const [questionCount, setQuestionCount] = useState(10);
  const [timerPerQuestion, setTimerPerQuestion] = useState(90);
  const [difficulty, setDifficulty] = useState('all');
  const [shuffle, setShuffle] = useState(true);

  const handleLaunch = () => {
    onStartQuiz(category.id, {
      mode,
      limit: questionCount,
      timerPerQuestion,
      difficulty,
      shuffle
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card modal-content-lg" style={{ padding: '28px' }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: 'var(--radius-sm)',
              background: 'var(--accent-primary)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Sliders size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Configure Test Session</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Domain: <strong style={{ color: 'var(--text-secondary)' }}>{category.title}</strong>
              </p>
            </div>
          </div>

          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* Mode Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Select Execution Engine Mode
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                type="button"
                className={`btn ${mode === 'exam' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setMode('exam')}
                style={{ padding: '14px', flexDirection: 'column', gap: '6px', textAlign: 'center', height: 'auto' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}>
                  <Play size={16} fill="currentColor" /> Timed Exam Mode
                </div>
                <span style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 'normal' }}>
                  Countdown timer, question palette grid, formal exam submission.
                </span>
              </button>

              <button
                type="button"
                className={`btn ${mode === 'practice' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setMode('practice')}
                style={{ padding: '14px', flexDirection: 'column', gap: '6px', textAlign: 'center', height: 'auto' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}>
                  <BookCheck size={16} /> Practice Mode
                </div>
                <span style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 'normal' }}>
                  Instant answer check, step-by-step solution drawers, formula hints.
                </span>
              </button>
            </div>
          </div>

          {/* Question Count & Difficulty */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Question Count
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[5, 10, 15, 20].map(count => (
                  <button
                    key={count}
                    type="button"
                    className={`btn btn-sm ${questionCount === count ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setQuestionCount(count)}
                    style={{ flexGrow: 1 }}
                  >
                    {count} Qs
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Difficulty Filter
              </label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', fontSize: '0.88rem' }}
              >
                <option value="all">All Difficulties (Balanced)</option>
                <option value="Easy">Easy Only</option>
                <option value="Medium">Medium Only</option>
                <option value="Hard">Hard Only</option>
              </select>
            </div>
          </div>

          {/* Timer & Shuffle */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {mode === 'exam' ? (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Time Limit Per Question
                </label>
                <select
                  value={timerPerQuestion}
                  onChange={e => setTimerPerQuestion(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '0.88rem' }}
                >
                  <option value={30}>30 Seconds (Speed Drill)</option>
                  <option value={60}>60 Seconds (Standard Pace)</option>
                  <option value={90}>90 Seconds (Placement Default)</option>
                  <option value={120}>120 Seconds (Extended Deep Dive)</option>
                </select>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <Clock size={16} /> Untimed practice mode active
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Question Ordering
              </label>
              <button
                type="button"
                className={`btn btn-outline btn-sm`}
                onClick={() => setShuffle(s => !s)}
                style={{ width: '100%', justifyContent: 'center', borderColor: shuffle ? 'var(--accent-primary)' : 'var(--border-color)' }}
              >
                <Shuffle size={14} color={shuffle ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                {shuffle ? 'Randomized Shuffle ON' : 'Standard Order OFF'}
              </button>
            </div>
          </div>

        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '28px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleLaunch}>
            <Play size={16} fill="currentColor" /> Launch Customized Test
          </button>
        </div>

      </div>
    </div>
  );
}
