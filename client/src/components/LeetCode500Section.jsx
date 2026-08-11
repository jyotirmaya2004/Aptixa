import React, { useState } from 'react';
import { DSA_500_PROBLEMS, DSA_500_CATEGORIES } from '../data/dsa500Data';
import { 
  Code2, Search, Filter, Check, Copy, Sparkles, BookOpen, 
  ChevronRight, ChevronLeft, List, Cpu, Layers, Tag, Award, CheckCircle2, FileCode
} from 'lucide-react';

export default function LeetCode500Section() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState(DSA_500_PROBLEMS[0]);
  const [copied, setCopied] = useState(false);
  const [showMobileList, setShowMobileList] = useState(false);

  // Filter problems
  const filteredProblems = DSA_500_PROBLEMS.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.lcNumber.toString().includes(searchQuery);
    return matchesCat && matchesDiff && matchesSearch;
  });

  const currentIndex = filteredProblems.findIndex(p => p.id === selectedProblem.id);

  const handlePrevProblem = () => {
    if (currentIndex > 0) {
      setSelectedProblem(filteredProblems[currentIndex - 1]);
    }
  };

  const handleNextProblem = () => {
    if (currentIndex >= 0 && currentIndex < filteredProblems.length - 1) {
      setSelectedProblem(filteredProblems[currentIndex + 1]);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedProblem.pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDifficultyColor = (diff) => {
    if (diff === 'Easy') return { bg: 'rgba(34,197,94,0.12)', text: '#22c55e', border: 'rgba(34,197,94,0.25)' };
    if (diff === 'Medium') return { bg: 'rgba(234,179,8,0.12)', text: '#eab308', border: 'rgba(234,179,8,0.25)' };
    return { bg: 'rgba(239,68,68,0.12)', text: '#ef4444', border: 'rgba(239,68,68,0.25)' };
  };

    // Tokenizer and syntax highlighter for Python Code
  const renderHighlightedPython = (code) => {
    if (!code) return null;
    const lines = code.split('\n');
    return lines.map((line, lineIdx) => {
      if (line.trim().startsWith('#')) {
        return (
          <div key={lineIdx} style={{ display: 'flex', lineHeight: '1.6', minWidth: 0, width: '100%' }}>
            <span style={{ width: '30px', flexShrink: 0, userSelect: 'none', color: '#6272a4', textAlign: 'right', paddingRight: '8px', fontSize: '0.75rem' }}>
              {lineIdx + 1}
            </span>
            <span style={{ color: '#6272a4', fontStyle: 'italic', flex: 1, minWidth: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{line}</span>
          </div>
        );
      }

      const tokenRegex = /(".*?"|'.*?'|#.*$|\b(?:def|class|return|if|else|elif|for|in|while|import|from|and|or|not|is|None|True|False|yield|pass|break|continue)\b|\b(?:self)\b|\b\d+\b|[a-zA-Z_]\w*|[^\s\w])/g;
      let match;
      let lastIndex = 0;
      const elements = [];

      while ((match = tokenRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          elements.push(line.substring(lastIndex, match.index));
        }
        const token = match[0];
        
        if (token.startsWith('#')) {
          elements.push(<span key={match.index} style={{ color: '#6272a4', fontStyle: 'italic' }}>{token}</span>);
        } else if (token.startsWith('"') || token.startsWith("'")) {
          elements.push(<span key={match.index} style={{ color: '#f1fa8c' }}>{token}</span>);
        } else if (['def', 'class', 'return', 'if', 'else', 'elif', 'for', 'in', 'while', 'import', 'from', 'and', 'or', 'not', 'is', 'None', 'True', 'False', 'yield', 'pass', 'break', 'continue'].includes(token)) {
          elements.push(<span key={match.index} style={{ color: '#ff79c6', fontWeight: '700' }}>{token}</span>);
        } else if (token === 'self') {
          elements.push(<span key={match.index} style={{ color: '#ffb86c', fontStyle: 'italic' }}>{token}</span>);
        } else if (/^\d+$/.test(token)) {
          elements.push(<span key={match.index} style={{ color: '#bd93f9' }}>{token}</span>);
        } else if (['len', 'range', 'set', 'dict', 'list', 'int', 'str', 'sum', 'max', 'min', 'enumerate', 'sorted', 'print', 'append', 'pop', 'get', 'add'].includes(token)) {
          elements.push(<span key={match.index} style={{ color: '#50fa7b' }}>{token}</span>);
        } else if (line.substring(0, match.index).trim().endsWith('def') || line.substring(0, match.index).trim().endsWith('class')) {
          elements.push(<span key={match.index} style={{ color: '#8be9fd', fontWeight: '700' }}>{token}</span>);
        } else {
          elements.push(<span key={match.index} style={{ color: '#f8f8f2' }}>{token}</span>);
        }

        lastIndex = tokenRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        elements.push(line.substring(lastIndex));
      }

      return (
        <div key={lineIdx} style={{ display: 'flex', lineHeight: '1.6', minWidth: 0, width: '100%' }}>
          <span style={{ width: '30px', flexShrink: 0, userSelect: 'none', color: '#6272a4', textAlign: 'right', paddingRight: '8px', fontSize: '0.75rem' }}>
            {lineIdx + 1}
          </span>
          <span style={{ flex: 1, minWidth: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{elements}</span>
        </div>
      );
    });
  };

  // Formatter for Algorithmic Strategy eliminating raw markdown asterisks **
  const renderFormattedExplanation = (explanation) => {
    if (!explanation) return null;
    const cleanText = explanation.replace(/\*\*/g, '').trim();
    const lines = cleanText.split('\n').filter(l => l.trim().length > 0);

    return (
      <div style={{ display: 'grid', gap: '12px' }}>
        {lines.map((line, idx) => {
          // Top-level header only if NOT starting with a number like "2."
          const isTitleHeader = !/^\d+\./.test(line.trim()) && (line.includes('Guide') || line.includes('Tips'));

          if (isTitleHeader) {
            return (
              <div key={idx} style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--accent-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--accent-primary)" />
                {line}
              </div>
            );
          }

          const bulletMatch = line.trim().match(/^(\d+)\.\s*(.+)$/);
          if (bulletMatch) {
            const num = bulletMatch[1];
            const content = bulletMatch[2];
            const parts = content.split(':');

            return (
              <div key={idx} style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-color)', fontSize: '0.88rem', color: 'var(--text-secondary)'
              }}>
                <span style={{
                  width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(37,99,235,0.15)',
                  color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.78rem', fontWeight: '800', flexShrink: 0, marginTop: '1px'
                }}>
                  {num}
                </span>
                <div style={{ flex: 1, minWidth: 0, lineHeight: '1.55', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  {parts.length > 1 ? (
                    <>
                      <strong style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{parts[0].trim()}:</strong>{' '}
                      <span>{parts.slice(1).join(':').trim()}</span>
                    </>
                  ) : (
                    <span>{content}</span>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {line}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="leetcode-500-container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '16px' }}>
      
      {/* Mobile Question List Toggle Bar */}
      <div className="mobile-dsa-list-bar">
        <button
          className="btn btn-primary"
          onClick={() => setShowMobileList(!showMobileList)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '8px', padding: '10px 16px', fontSize: '0.9rem', fontWeight: '700', marginBottom: '14px',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <List size={18} /> {showMobileList ? 'Hide Questions List' : `View Questions List (${filteredProblems.length})`}
        </button>
      </div>

      {/* Workspace Grid */}
      <div className="dsa-workspace-grid">
        
        {/* Left Sidebar: Problem Navigation */}
        <div className={`glass-card dsa-problem-sidebar ${showMobileList ? 'mobile-open' : ''}`} style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          
          {/* Search Box */}
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <Search size={15} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by title or # (e.g. 1, Two Sum)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '8px 10px 8px 32px',
                background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-xs)', color: 'var(--text-primary)', fontSize: '0.85rem'
              }}
            />
          </div>

          {/* Difficulty Filters */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
            {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                style={{
                  flex: 1, padding: '4px 8px', fontSize: '0.74rem', fontWeight: '700', borderRadius: 'var(--radius-xs)',
                  background: selectedDifficulty === diff ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                  color: selectedDifficulty === diff ? '#fff' : 'var(--text-secondary)',
                  border: '1px solid var(--border-color)', cursor: 'pointer'
                }}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Category Filter Horizontal Scroll */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '12px' }}>
            {DSA_500_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '4px 10px', fontSize: '0.74rem', borderRadius: 'var(--radius-xs)',
                  background: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                  color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
                  border: '1px solid var(--border-color)', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: '600'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Counter Badge */}
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Showing {filteredProblems.length} Problems</span>
            <span>Category: {selectedCategory}</span>
          </div>

          {/* Problem Items List */}
          <div className="dsa-problem-sidebar-list" style={{ display: 'grid', gap: '8px', maxHeight: '640px', overflowY: 'auto' }}>
            {filteredProblems.map(p => {
              const diffStyle = getDifficultyColor(p.difficulty);
              const isSelected = selectedProblem.id === p.id;

              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProblem(p);
                    setShowMobileList(false);
                  }}
                  style={{
                    padding: '10px 12px', borderRadius: 'var(--radius-xs)', cursor: 'pointer',
                    background: isSelected ? 'rgba(37,99,235,0.12)' : 'var(--bg-secondary)',
                    border: isSelected ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '210px' }}>
                      {p.shortTitle}
                    </span>
                    <span style={{
                      fontSize: '0.68rem', fontWeight: '700', padding: '2px 6px', borderRadius: '4px',
                      background: diffStyle.bg, color: diffStyle.text, border: `1px solid ${diffStyle.border}`
                    }}>
                      {p.difficulty}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    <span>#{p.lcNumber}</span>
                    <span>{p.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Main Details View */}
        <div style={{ display: 'grid', gap: '16px', width: '100%', minWidth: 0 }}>
          
          {/* Main Card */}
          <div className="glass-card dsa-main-card" style={{ padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', width: '100%', boxSizing: 'border-box' }}>
            
            {/* Header Info */}
            <div className="dsa-problem-header-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', wordBreak: 'break-word' }}>{selectedProblem.title}</h3>
                  <span style={{
                    fontSize: '0.78rem', fontWeight: '700', padding: '3px 10px', borderRadius: '4px',
                    ...getDifficultyColor(selectedProblem.difficulty)
                  }}>
                    {selectedProblem.difficulty}
                  </span>
                </div>
                <div className="dsa-problem-meta-row" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '10px 16px' }}>
                  <span>Pattern: <strong style={{ color: 'var(--accent-primary)' }}>{selectedProblem.category}</strong></span>
                  <span>Time: <strong>{selectedProblem.timeComplexity}</strong></span>
                  <span>Space: <strong>{selectedProblem.spaceComplexity}</strong></span>
                </div>
              </div>

              {/* Action Buttons: Prev, Next & Copy Code */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-outline"
                  onClick={handlePrevProblem}
                  disabled={currentIndex <= 0}
                  style={{ opacity: currentIndex <= 0 ? 0.4 : 1, padding: '6px 12px', fontSize: '0.8rem', gap: '4px' }}
                >
                  <ChevronLeft size={15} /> Prev
                </button>

                <button
                  className="btn"
                  onClick={handleNextProblem}
                  disabled={currentIndex >= filteredProblems.length - 1 || currentIndex === -1}
                  style={{
                    opacity: (currentIndex >= filteredProblems.length - 1 || currentIndex === -1) ? 0.4 : 1,
                    padding: '6px 14px', fontSize: '0.8rem', gap: '4px', background: 'var(--accent-primary)', color: '#fff', border: 'none'
                  }}
                >
                  Next Question <ChevronRight size={15} />
                </button>

                <button className="btn btn-outline" onClick={handleCopyCode} style={{ gap: '6px', padding: '6px 12px', fontSize: '0.8rem' }}>
                  {copied ? <Check size={15} color="#22c55e" /> : <Copy size={15} />}
                  {copied ? 'Copied' : 'Copy Solution'}
                </button>
              </div>
            </div>

            {/* Description */}
            <div style={{
              padding: '14px 16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-color)', fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '16px',
              wordBreak: 'break-word', overflowWrap: 'break-word'
            }}>
              {selectedProblem.description}
            </div>

            {/* Sample Test Cases / Input & Output Examples */}
            {selectedProblem.examples && selectedProblem.examples.length > 0 && (
              <div style={{ marginBottom: '18px', display: 'grid', gap: '10px' }}>
                {selectedProblem.examples.map((ex, exIdx) => (
                  <div key={exIdx} style={{
                    padding: '12px 16px', background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-color)', fontSize: '0.86rem',
                    wordBreak: 'break-word', overflowWrap: 'break-word'
                  }}>
                    <div style={{ fontWeight: '800', color: 'var(--accent-primary)', fontSize: '0.78rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Example {exIdx + 1}:
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.83rem', display: 'grid', gap: '4px', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <div style={{ wordBreak: 'break-word' }}><strong style={{ color: 'var(--text-primary)' }}>Input:</strong> <span className="dsa-example-input" style={{ wordBreak: 'break-word' }}>{ex.input}</span></div>
                      <div style={{ wordBreak: 'break-word' }}><strong style={{ color: 'var(--text-primary)' }}>Output:</strong> <span className="dsa-example-output" style={{ wordBreak: 'break-word' }}>{ex.output}</span></div>
                    </div>
                    {ex.explanation && (
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '6px', lineHeight: '1.4', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Explanation:</strong> {ex.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Problem Constraints */}
            {selectedProblem.constraints && selectedProblem.constraints.length > 0 && (
              <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Constraints:
                </span>
                {selectedProblem.constraints.map((c, cIdx) => (
                  <code key={cIdx} className="dsa-constraint-pill">
                    {c}
                  </code>
                ))}
              </div>
            )}

            {/* Company Tags */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Frequently Asked In:
              </span>
              {selectedProblem.companyTags.map(tag => (
                <span key={tag} style={{
                  padding: '3px 8px', borderRadius: 'var(--radius-xs)', background: 'var(--info-bg)',
                  border: '1px solid rgba(59,130,246,0.25)', fontSize: '0.75rem', fontWeight: '700', color: 'var(--info)'
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Colorful IDE Style Code Window */}
            <div style={{
              marginBottom: '20px', borderRadius: 'var(--radius-sm)', overflow: 'hidden',
              border: '1px solid #282a36', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', background: '#282a36'
            }}>
              {/* Window Header */}
              <div className="dsa-code-header-bar" style={{
                padding: '10px 16px', background: '#21222c', borderBottom: '1px solid #191a21',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5555', display: 'inline-block' }}></span>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffb86c', display: 'inline-block' }}></span>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#50fa7b', display: 'inline-block' }}></span>
                  <span style={{ fontSize: '0.78rem', color: '#6272a4', marginLeft: '10px', fontFamily: 'var(--font-mono)' }}>
                    solution.py
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', background: '#383a59', color: '#8be9fd', fontSize: '0.72rem', fontWeight: '700' }}>
                    Python 3.11
                  </span>
                  <button
                    onClick={handleCopyCode}
                    style={{
                      background: 'none', border: 'none', color: copied ? '#50fa7b' : '#f8f8f2',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem'
                    }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* IDE Code Viewport */}
              <pre className="dsa-code-viewport" style={{
                padding: '16px', margin: 0, color: '#f8f8f2',
                fontFamily: 'var(--font-mono)', fontSize: '0.86rem', overflowX: 'auto', maxWidth: '100%', boxSizing: 'border-box'
              }}>
                <code>{renderHighlightedPython(selectedProblem.pythonCode)}</code>
              </pre>
            </div>

            {/* Explanation & Strategy Formatted Cards */}
            <div style={{ padding: '18px', background: 'var(--bg-card)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-color)' }}>
              {renderFormattedExplanation(selectedProblem.explanation)}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
