import React, { useEffect } from 'react';
import { Award, CheckCircle2, XCircle, Clock, RotateCcw, Home, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatTime } from '../utils/timer';

export default function QuizResult({ result, questions, onRetake, onBackHome }) {
  const [openId, setOpenId] = React.useState(null);

  useEffect(() => {
    if (result?.percentage >= 75) {
      confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 } });
    }
  }, [result]);

  if (!result || !questions) return null;

  const grade = result.percentage >= 90 ? { title: 'Outstanding', color: 'var(--success)' }
    : result.percentage >= 75 ? { title: 'Exam Ready',           color: 'var(--info)' }
    : result.percentage >= 50 ? { title: 'Keep Practising',      color: 'var(--warning)' }
    : { title: 'Needs More Work',                                 color: 'var(--danger)' };

  return (
    <div style={{ maxWidth: '940px', margin: '0 auto', padding: '32px 16px' }}>

      {/* Score Banner */}
      <div className="glass-card" style={{ padding: '36px', textAlign: 'center', marginBottom: '28px' }}>
        {/* Circular Score */}
        <div style={{
          width: '100px', height: '100px', margin: '0 auto 20px',
          borderRadius: '50%',
          border: `4px solid ${grade.color}`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-secondary)',
        }}>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', color: grade.color, lineHeight: 1 }}>{result.percentage}%</span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Score</span>
        </div>

        <h2 style={{ fontSize: '1.6rem', color: grade.color, marginBottom: '4px' }}>{grade.title}</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
          {result.mode === 'exam' ? 'Timed Exam Mode' : 'Practice Mode'} · {result.score}/{result.totalQuestions} Correct
        </p>

        {/* Metric Chips */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          {[
            { label: 'Correct',   value: result.score,                         color: 'var(--success)' },
            { label: 'Incorrect', value: result.totalQuestions - result.score, color: 'var(--danger)'  },
            { label: 'Time',      value: formatTime(result.timeSpentSeconds),  color: 'var(--info)'    },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              padding: '12px 22px', borderRadius: 'var(--radius-md)',
              background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
              textAlign: 'center', minWidth: '100px'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color }}>{value}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="btn btn-primary btn-lg" onClick={onRetake}><RotateCcw size={16} /> Retake</button>
          <button className="btn btn-outline btn-lg" onClick={onBackHome}><Home size={16} /> Home</button>
        </div>
      </div>

      {/* Diagnostic Review */}
      <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', fontWeight: '700' }}>Diagnostic Answer Review</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {questions.map((q, idx) => {
          const bd = result.breakdown?.find(b => b.questionId === q.id);
          const isCorrect = bd?.isCorrect;
          const userOpt   = bd?.selectedOpt;
          const isOpen    = openId === q.id;

          return (
            <div key={q.id} className="glass-card" style={{
              padding: '18px 22px',
              borderColor: isCorrect === true ? 'var(--success-border)' : isCorrect === false ? 'var(--danger-border)' : 'var(--border-color)'
            }}>
              <div onClick={() => setOpenId(isOpen ? null : q.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ flexShrink: 0, marginTop: '2px' }}>
                    {isCorrect === true  && <CheckCircle2 size={20} color="var(--success)" />}
                    {isCorrect === false && <XCircle      size={20} color="var(--danger)" />}
                    {isCorrect === undefined && <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--border-color)' }} />}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.9rem', fontWeight: '600', lineHeight: '1.5' }}>Q{idx + 1}. {q.question}</p>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{q.topic} · {q.difficulty}</span>
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm" style={{ flexShrink: 0 }}>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {isOpen && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                    {q.options.map((opt, oIdx) => {
                      const isCorr = q.correctOption === oIdx;
                      const isUser = userOpt === oIdx;
                      let bg = 'var(--bg-secondary)'; let borderC = 'var(--border-color)'; let clr = 'var(--text-primary)';
                      if (isCorr) { bg = 'var(--success-bg)'; borderC = 'var(--success-border)'; clr = 'var(--success)'; }
                      else if (isUser && !isCorr) { bg = 'var(--danger-bg)'; borderC = 'var(--danger-border)'; clr = 'var(--danger)'; }
                      return (
                        <div key={oIdx} style={{ padding: '9px 12px', borderRadius: 'var(--radius-sm)', background: bg, border: `1px solid ${borderC}`, color: clr, fontSize: '0.84rem', fontWeight: isCorr ? '600' : '400' }}>
                          {String.fromCharCode(65+oIdx)}. {opt}
                          {isCorr && ' ✓'}
                          {isUser && !isCorr && ' (You)'}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ padding: '13px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                    <strong style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '6px' }}>Explanation:</strong>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
