import React from 'react';
import { BarChart2, CheckCircle2, Clock, Target } from 'lucide-react';
import { formatTime } from '../utils/timer';

const CAT_NAMES = {
  quantitative: 'Quantitative Aptitude',
  logical:      'Logical Reasoning',
  verbal:       'Verbal Ability',
  di:           'Data Interpretation',
  technical:    'CS & Tech Aptitude',
};

const CAT_COLORS = {
  quantitative: '#2563eb',
  logical:      '#7c3aed',
  verbal:       '#db2777',
  di:           '#059669',
  technical:    '#d97706',
};

export default function PerformanceStats({ stats }) {
  if (!stats) return (
    <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Loading analytics...</div>
  );

  const { totalAttempts, totalQuestionsAnswered, overallAccuracy, categoryStats, recentAttempts } = stats;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <BarChart2 size={22} color="var(--accent-primary)" /> Performance Analytics
      </h2>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'Overall Accuracy', value: `${overallAccuracy}%`, icon: Target,        color: 'var(--accent-primary)' },
          { label: 'Questions Solved', value: totalQuestionsAnswered, icon: CheckCircle2, color: 'var(--success)' },
          { label: 'Tests Completed',  value: totalAttempts,          icon: Clock,         color: 'var(--warning)' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-card" style={{ padding: '22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: 'var(--radius-sm)',
              background: `${color}18`, border: `1px solid ${color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Icon size={24} color={color} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
              <div className="stat-number">{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Strength Bars */}
      <div className="glass-card" style={{ padding: '26px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '20px' }}>Domain Accuracy Breakdown</h3>
        {Object.keys(categoryStats || {}).length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Complete a quiz to view domain analytics.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(categoryStats).map(([key, data]) => {
              const pct   = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
              const color = CAT_COLORS[key] || 'var(--accent-primary)';
              return (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.87rem', fontWeight: '600' }}>
                    <span>{CAT_NAMES[key] || key}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{data.correct}/{data.total} &nbsp;·&nbsp; <strong style={{ color }}>{pct}%</strong></span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Attempts Table */}
      <div className="glass-card" style={{ padding: '26px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '18px' }}>Recent Attempt Log</h3>
        {(!recentAttempts || recentAttempts.length === 0) ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No test logs yet. Take your first quiz!</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="formal-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Domain</th>
                  <th>Mode</th>
                  <th>Score</th>
                  <th>Accuracy</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {recentAttempts.map(a => (
                  <tr key={a.id}>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                      {new Date(a.date).toLocaleDateString()} {new Date(a.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td style={{ fontWeight: '600' }}>{CAT_NAMES[a.category] || 'All Domains'}</td>
                    <td>
                      <span className={`badge ${a.mode === 'exam' ? 'badge-hard' : 'badge-easy'}`}>{a.mode}</span>
                    </td>
                    <td style={{ fontWeight: '700' }}>{a.score}/{a.totalQuestions}</td>
                    <td>
                      <span style={{
                        padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.82rem', fontWeight: '700',
                        background: a.percentage >= 70 ? 'var(--success-bg)' : 'var(--warning-bg)',
                        color: a.percentage >= 70 ? 'var(--success)' : 'var(--warning)',
                        border: `1px solid ${a.percentage >= 70 ? 'var(--success-border)' : 'var(--warning-border)'}`,
                      }}>
                        {a.percentage}%
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.83rem' }}>
                      {formatTime(a.timeSpentSeconds)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
