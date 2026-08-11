import React from 'react';
import { Flame, Target, Trophy, Award, BarChart2, CheckCircle2, ChevronRight } from 'lucide-react';

export default function HeaderStatsPopover({ stats, onClose, onNavigateAnalytics }) {
  if (!stats) return null;

  const totalAnswered = stats.totalQuestionsAnswered || 0;
  const accuracy = stats.overallAccuracy || 0;
  const streakDays = 5; // Live streak mock
  const dailyTarget = 10;
  const dailyProgress = Math.min(totalAnswered % dailyTarget, dailyTarget);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 1999, background: 'transparent'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute', top: '64px', right: '16px',
          width: '320px', background: 'var(--bg-card)',
          border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
          boxShadow: '0 16px 36px rgba(0,0,0,0.3)', padding: '18px',
          animation: 'slideDown 0.15s ease-out', zIndex: 2000
        }}
      >
        {/* Title Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '0.95rem' }}>
            <Trophy size={18} color="var(--warning)" />
            <span>Placement Practice Stats</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: '#22c55e', background: 'rgba(34,197,94,0.15)', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
            LIVE
          </span>
        </div>

        {/* Streak & Daily Goal Container */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
          <div style={{
            padding: '10px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
            borderRadius: 'var(--radius-xs)', textAlign: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#f59e0b', fontWeight: '800', fontSize: '1.1rem' }}>
              <Flame size={18} /> {streakDays} Days
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>Current Streak</div>
          </div>

          <div style={{
            padding: '10px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
            borderRadius: 'var(--radius-xs)', textAlign: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#3b82f6', fontWeight: '800', fontSize: '1.1rem' }}>
              <Target size={18} /> {accuracy}%
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>Accuracy Rate</div>
          </div>
        </div>

        {/* Daily Goal Bar */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            <span>Daily Goal ({dailyProgress}/{dailyTarget})</span>
            <span>{Math.round((dailyProgress / dailyTarget) * 100)}%</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(dailyProgress / dailyTarget) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), #a855f7)', borderRadius: '3px' }} />
          </div>
        </div>

        {/* Total Questions Counter */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)',
          fontSize: '0.82rem', marginBottom: '14px', border: '1px solid var(--border-color)'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
            <CheckCircle2 size={15} color="#22c55e" /> Total Questions Solved:
          </span>
          <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{totalAnswered}</strong>
        </div>

        {/* CTA to Full Analytics */}
        <button
          onClick={() => {
            onNavigateAnalytics();
            onClose();
          }}
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', gap: '6px' }}
        >
          <BarChart2 size={15} /> View Full Analytics Dashboard <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
