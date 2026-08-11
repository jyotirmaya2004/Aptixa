import React from 'react';

export default function QuestionPalette({ questions, currentIndex, userAnswers, flaggedQuestions, onSelectQuestion }) {
  const answered  = Object.keys(userAnswers).length;
  const flagCount = flaggedQuestions.size;

  return (
    <div className="glass-card" style={{ padding: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>Question Sheet</h4>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {answered}/{questions.length}
        </span>
      </div>

      {/* Summary counters */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '14px' }}>
        {[
          { label: 'Answered',   count: answered,                    color: 'var(--success)' },
          { label: 'Flagged',    count: flagCount,                   color: 'var(--warning)' },
          { label: 'Unanswered', count: questions.length - answered, color: 'var(--text-muted)' },
        ].map(({ label, count, color }) => (
          <div key={label} style={{
            padding: '8px 10px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.15rem', fontWeight: '800', color }}>{count}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '6px',
        maxHeight: '280px', overflowY: 'auto', paddingRight: '2px',
        marginBottom: '16px'
      }}>
        {questions.map((q, idx) => {
          const isCurrent  = idx === currentIndex;
          const isAnswered = userAnswers[q.id] !== undefined;
          const isFlagged  = flaggedQuestions.has(q.id);

          let bg      = 'var(--bg-secondary)';
          let border  = '1px solid var(--border-color)';
          let color   = 'var(--text-muted)';
          let weight  = '500';

          if (isCurrent)  { bg = 'var(--accent-primary)'; border = '1px solid var(--accent-primary)'; color = '#fff'; weight = '700'; }
          else if (isFlagged)  { bg = 'var(--warning-bg)'; border = '1px solid var(--warning-border)'; color = 'var(--warning)'; }
          else if (isAnswered) { bg = 'var(--success-bg)'; border = '1px solid var(--success-border)'; color = 'var(--success)'; }

          return (
            <button
              key={q.id}
              onClick={() => onSelectQuestion(idx)}
              style={{
                padding: '6px 0', borderRadius: 'var(--radius-sm)',
                background: bg, border, color,
                fontWeight: weight, fontSize: '0.8rem',
                cursor: 'pointer', position: 'relative',
                transition: 'all var(--transition-fast)'
              }}
            >
              {idx + 1}
              {isFlagged && !isCurrent && (
                <div style={{
                  position: 'absolute', top: '2px', right: '2px',
                  width: '5px', height: '5px',
                  borderRadius: '50%', background: 'var(--warning)'
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.74rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
        {[
          { color: 'var(--accent-primary)', label: 'Current' },
          { color: 'var(--success)',         label: 'Answered' },
          { color: 'var(--warning)',         label: 'Flagged' },
          { color: 'var(--border-color)',    label: 'Unanswered' },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: color, flexShrink: 0 }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
