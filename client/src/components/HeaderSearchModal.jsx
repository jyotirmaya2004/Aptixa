import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, Code2, Grid, BookOpen, ChevronRight, Zap } from 'lucide-react';
import { SANDBOX_DATABASE } from '../data/sandboxData';
import { DSA_500_PROBLEMS } from '../data/dsa500Data';
import { INTERVIEW_QUESTIONS } from '../data/interviewPrepData';

export default function HeaderSearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Search logic across Sandbox Solvers, 500 LeetCode problems, Interview Prep, and Domains
  const searchResults = [];

  if (query.trim().length > 0) {
    const q = query.toLowerCase();

    // 1. Search Interview Questions & HR Guides
    INTERVIEW_QUESTIONS.forEach(iq => {
      if (iq.question.toLowerCase().includes(q) || iq.domain.toLowerCase().includes(q) || iq.keyKeywords.some(k => k.toLowerCase().includes(q))) {
        if (searchResults.length < 15) {
          searchResults.push({
            type: 'interview',
            title: iq.question,
            sub: `${iq.domain} • Interview Q&A`,
            icon: Sparkles,
            color: '#10b981',
            item: iq,
            tab: 'interview'
          });
        }
      }
    });

    // 2. Search 500 LeetCode Problems
    DSA_500_PROBLEMS.forEach(dsa => {
      if (dsa.title.toLowerCase().includes(q) || dsa.category.toLowerCase().includes(q) || dsa.lcNumber.toString().includes(q)) {
        if (searchResults.length < 15) {
          searchResults.push({
            type: 'dsa',
            title: dsa.title,
            sub: `${dsa.category} • ${dsa.difficulty}`,
            icon: Code2,
            color: '#3b82f6',
            item: dsa,
            tab: 'leetcode500'
          });
        }
      }
    });

    // 3. Search Sandbox Solvers
    SANDBOX_DATABASE.forEach(sb => {
      if (sb.title.toLowerCase().includes(q) || sb.category.toLowerCase().includes(q) || sb.examShortcut?.toLowerCase().includes(q)) {
        if (searchResults.length < 15) {
          searchResults.push({
            type: 'sandbox',
            title: sb.title,
            sub: `${sb.category} • Live Calculator`,
            icon: Sparkles,
            color: '#a855f7',
            item: sb,
            tab: 'sandbox'
          });
        }
      }
    });
  }

  const handleItemClick = (res) => {
    onSelectResult(res);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(6px)',
        zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
        paddingTop: '80px', animation: 'fadeIn 0.15s ease-out'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '640px', background: 'var(--bg-card)',
          border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)', overflow: 'hidden'
        }}
      >
        {/* Search Bar Input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)'
        }}>
          <Search size={20} color="var(--accent-primary)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type to search 220+ Solvers, Python DSA, Books, formulas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text-primary)', fontSize: '1.05rem', fontFamily: 'var(--font-heading)'
            }}
          />
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results List */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '12px' }}>
          {query.trim().length === 0 ? (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              <Zap size={24} color="var(--accent-primary)" style={{ marginBottom: '8px' }} />
              <p>Type keywords to search across <strong>220 Live Solvers</strong>, <strong>Python DSA Lab</strong>, and <strong>Placement Books</strong>.</p>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <span style={{ padding: '4px 10px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', fontSize: '0.78rem', border: '1px solid var(--border-color)', cursor: 'pointer' }} onClick={() => setQuery('Clock')}>Clock Angle</span>
                <span style={{ padding: '4px 10px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', fontSize: '0.78rem', border: '1px solid var(--border-color)', cursor: 'pointer' }} onClick={() => setQuery('Two Sum')}>Two Sum</span>
                <span style={{ padding: '4px 10px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', fontSize: '0.78rem', border: '1px solid var(--border-color)', cursor: 'pointer' }} onClick={() => setQuery('CIDR')}>CIDR IPv4</span>
                <span style={{ padding: '4px 10px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', fontSize: '0.78rem', border: '1px solid var(--border-color)', cursor: 'pointer' }} onClick={() => setQuery('Breakeven')}>Breakeven</span>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No matching topic or solver found for "{query}". Try another term!
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '6px' }}>
              {searchResults.map((res, idx) => {
                const Icon = res.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => handleItemClick(res)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 14px', borderRadius: 'var(--radius-xs)',
                      background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                      cursor: 'pointer', transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: 'var(--radius-xs)',
                        background: `${res.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <Icon size={16} color={res.color} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-primary)' }}>{res.title}</div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{res.sub}</div>
                      </div>
                    </div>
                    <ChevronRight size={16} color="var(--text-muted)" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer Hotkey Hint */}
        <div style={{
          padding: '10px 16px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)'
        }}>
          <span>Press <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '3px' }}>ESC</kbd> to exit</span>
          <span>Tip: Navigation automatically opens target tab</span>
        </div>
      </div>
    </div>
  );
}
