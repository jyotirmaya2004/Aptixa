import React from 'react';
import { Calculator, Brain, BookOpen, PieChart, Code2, Play, BookCheck } from 'lucide-react';

const iconMap = { Calculator, Brain, BookOpen, PieChart, Code2 };

export default function CategoryCard({ category, onOpenConfig }) {
  const Icon = iconMap[category.icon] || BookOpen;

  const accent = {
    quantitative: '#2563eb',
    logical:      '#7c3aed',
    verbal:       '#db2777',
    di:           '#059669',
    technical:    '#d97706',
  }[category.id] || 'var(--accent-primary)';

  return (
    <div className="domain-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      {/* Accent top strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: accent, borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }} />

      <div>
        {/* Icon + Count */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{
            width: '44px', height: '44px',
            borderRadius: 'var(--radius-sm)',
            background: `${accent}18`,
            border: `1px solid ${accent}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: accent, flexShrink: 0
          }}>
            <Icon size={22} />
          </div>

          <span className="badge badge-info" style={{ color: accent, background: `${accent}15`, borderColor: `${accent}30` }}>
            {category.questionCount} Q's Available
          </span>
        </div>

        <h3 style={{ fontSize: '1.1rem', marginBottom: '7px', fontWeight: '700' }}>{category.title}</h3>
        <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.55', minHeight: '42px' }}>
          {category.description}
        </p>

        {/* Topic chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px' }}>
          {category.topics.slice(0, 4).map((t, i) => (
            <span key={i} style={{
              fontSize: '0.72rem', padding: '2px 8px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-color)',
            }}>
              {t}
            </span>
          ))}
          {category.topics.length > 4 && (
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
              +{category.topics.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onOpenConfig(category, 'exam')}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <Play size={13} fill="currentColor" /> Timed Exam
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onOpenConfig(category, 'practice')}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <BookCheck size={13} /> Practice
        </button>
      </div>
    </div>
  );
}
