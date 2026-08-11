import React, { useState } from 'react';
import { 
  Lightbulb, Calculator, Sparkles, Search, BookOpen, Clock, 
  Check, Copy, Filter 
} from 'lucide-react';
import { MATHEMATICAL_FORMULAS } from '../data/mathematicalFormulas';
import FormulaSvgDiagram from './FormulaSvgDiagram';

export default function TipsAndFormulas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyFormula = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFormulas = MATHEMATICAL_FORMULAS.filter(f => {
    const matchesDomain = selectedDomain === 'all' || f.category === selectedDomain;
    const matchesSearch = searchTerm === '' || 
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      f.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.formula.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
      
      {/* Top Banner */}
      <div className="glass-card" style={{ padding: '32px', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: 'var(--radius-xs)', background: 'var(--info-bg)', border: '1px solid rgba(59,130,246,0.25)', fontSize: '0.78rem', fontWeight: '700', color: 'var(--info)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <Sparkles size={13} /> Mathematical Mastery Hub
          </div>
          <h2 style={{ fontSize: '1.9rem', marginBottom: '10px', fontWeight: '800' }}>
            Mathematical Formulas &amp; Visual Shortcuts
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '0' }}>
            Comprehensive reference of mathematical formulas, geometric equations, algebraic identities, probability theorems, and competitive shortcuts with visual SVG representations.
          </p>
        </div>
      </div>

      {/* Formula Bank Section with Search & Domain Filters */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} color="var(--accent-primary)" /> Mathematical Formulas &amp; Rules Bank
        </h3>

        {/* Search & Domain Filter Controls */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', width: '100%', maxWidth: '520px' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0 10px' }}>
            <Search size={15} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search by topic, equation or formula name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', border: 'none', background: 'transparent', fontSize: '0.85rem', outline: 'none' }}
            />
          </div>

          <select
            value={selectedDomain}
            onChange={e => setSelectedDomain(e.target.value)}
            style={{ padding: '8px 12px', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}
          >
            <option value="all">All Domains</option>
            <option value="quantitative">Quantitative Aptitude</option>
            <option value="logical">Logical &amp; Clocks</option>
            <option value="technical">CS, Calculus &amp; Matrices</option>
          </select>
        </div>
      </div>

      {/* Formula Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredFormulas.map(item => (
          <div key={item.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {item.topic}
                </span>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleCopyFormula(item.id, item.formula)}
                  title="Copy formula text"
                  style={{ padding: '4px' }}
                >
                  {copiedId === item.id ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                </button>
              </div>

              <h4 style={{ fontSize: '1.02rem', fontWeight: '700', marginBottom: '10px' }}>{item.title}</h4>

              {/* Visual SVG Diagram for the Formula */}
              <div style={{ marginBottom: '12px' }}>
                <FormulaSvgDiagram type={item.svg} title={item.title} />
              </div>

              {/* Highlighted Formula Block */}
              <div style={{
                padding: '12px 14px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem',
                fontWeight: '700',
                color: 'var(--accent-primary)',
                marginBottom: '12px',
                textAlign: 'center',
                wordBreak: 'break-word'
              }}>
                {item.formula}
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '12px' }}>
                {item.description}
              </p>
            </div>

            <div style={{ padding: '8px 10px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-color)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              💡 <strong>Shortcut Trick:</strong> {item.shortcut}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
