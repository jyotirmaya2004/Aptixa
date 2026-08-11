import React, { useState, useMemo } from 'react';
import { SANDBOX_DATABASE, SANDBOX_STATS } from '../data/sandboxData';
import { 
  Sparkles, Search, Calculator, Filter, Bookmark, BookmarkCheck, 
  Copy, Check, ChevronDown, ChevronUp, Zap, HelpCircle, Layers,
  ChevronLeft, ChevronRight, RefreshCw, Star
} from 'lucide-react';

// Single Interactive Card Sub-component
function SandboxCard({ item, isBookmarked, onToggleBookmark }) {
  // Initialize state for card inputs using default values
  const [inputs, setInputs] = useState(() => {
    const initial = {};
    item.inputs.forEach(inp => {
      initial[inp.key] = inp.default;
    });
    return initial;
  });

  const [showSteps, setShowSteps] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  // Compute live result on the fly
  const computation = useMemo(() => {
    try {
      return item.compute(inputs);
    } catch (err) {
      return { result: 'Error', unit: '', steps: ['Failed to compute formula'] };
    }
  }, [item, inputs]);

  const handleCopy = () => {
    const textToCopy = `Formula: ${item.formula}\nInputs: ${JSON.stringify(inputs)}\nResult: ${computation.result} ${computation.unit || ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getImportanceColor = (imp) => {
    if (imp === 'Critical') return { bg: 'var(--danger-bg)', color: 'var(--danger)', border: 'var(--danger-border)' };
    if (imp === 'High') return { bg: 'var(--warning-bg)', color: 'var(--warning)', border: 'var(--warning-border)' };
    return { bg: 'var(--info-bg)', color: 'var(--info)', border: 'rgba(59,130,246,0.3)' };
  };

  const impBadge = getImportanceColor(item.importance);

  return (
    <div className="glass-card" style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      position: 'relative',
      borderLeft: `4px solid ${item.category === 'quantitative' ? 'var(--accent-primary)' : item.category === 'logical' ? '#ec4899' : item.category === 'verbal' ? '#f59e0b' : '#10b981'}`
    }}>
      <div>
        {/* Top Badges & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', gap: '8px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: item.category === 'quantitative' ? 'var(--accent-primary)' : item.category === 'logical' ? '#ec4899' : item.category === 'verbal' ? '#f59e0b' : '#10b981',
              background: 'var(--bg-secondary)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-color)'
            }}>
              {item.topic}
            </span>

            <span style={{
              fontSize: '0.7rem',
              fontWeight: '700',
              padding: '2px 6px',
              borderRadius: 'var(--radius-xs)',
              background: impBadge.bg,
              color: impBadge.color,
              border: `1px solid ${impBadge.border}`
            }}>
              {item.importance}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>
              🎯 {item.examTag}
            </span>

            <button
              onClick={() => onToggleBookmark(item.id)}
              className="btn btn-ghost btn-sm"
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
              style={{ padding: '4px' }}
            >
              {isBookmarked ? <BookmarkCheck size={16} color="var(--warning)" /> : <Bookmark size={16} color="var(--text-muted)" />}
            </button>

            <button
              onClick={handleCopy}
              className="btn btn-ghost btn-sm"
              title="Copy Formula & Result"
              style={{ padding: '4px' }}
            >
              {copied ? <Check size={15} color="var(--success)" /> : <Copy size={15} color="var(--text-muted)" />}
            </button>
          </div>
        </div>

        {/* Title */}
        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '8px', lineHeight: '1.3' }}>
          {item.title}
        </h4>

        {/* Formula Banner */}
        <div style={{
          padding: '10px 12px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          fontWeight: '700',
          color: 'var(--accent-primary)',
          marginBottom: '14px',
          textAlign: 'center',
          wordBreak: 'break-word'
        }}>
          {item.formula}
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
          {item.description}
        </p>

        {/* Interactive Controls Inputs */}
        <div style={{
          background: 'var(--bg-glass)',
          padding: '12px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-color)',
          marginBottom: '14px',
          display: 'grid',
          gap: '10px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={12} color="var(--warning)" /> Adjust Inputs Live:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: item.inputs.length > 2 ? '1fr 1fr' : '1fr 1fr', gap: '10px' }}>
            {item.inputs.map(inp => (
              <div key={inp.key}>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '3px', fontWeight: '600' }}>
                  {inp.label}: <strong style={{ color: 'var(--accent-primary)' }}>{inputs[inp.key]}</strong>
                </label>

                {inp.type === 'select' ? (
                  <select
                    value={inputs[inp.key]}
                    onChange={e => handleInputChange(inp.key, e.target.value)}
                    style={{ width: '100%', padding: '5px 8px', fontSize: '0.82rem' }}
                  >
                    {inp.options.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : inp.type === 'range' ? (
                  <input
                    type="range"
                    min={inp.min}
                    max={inp.max}
                    step={inp.step || 1}
                    value={inputs[inp.key]}
                    onChange={e => handleInputChange(inp.key, Number(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                ) : (
                  <input
                    type="number"
                    min={inp.min}
                    max={inp.max}
                    value={inputs[inp.key]}
                    onChange={e => handleInputChange(inp.key, Number(e.target.value))}
                    style={{ width: '100%', padding: '5px 8px', fontSize: '0.82rem' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Result Display */}
      <div>
        <div style={{
          padding: '12px',
          background: 'var(--success-bg)',
          border: '1px solid var(--success-border)',
          borderRadius: 'var(--radius-sm)',
          textAlign: 'center',
          marginBottom: '12px'
        }}>
          <span style={{ fontSize: '0.76rem', color: 'var(--success)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>
            Live Calculated Output
          </span>
          <strong style={{ fontSize: '1.15rem', color: 'var(--success)', fontWeight: '800' }}>
            {computation.result} {computation.unit ? <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>({computation.unit})</span> : ''}
          </strong>
        </div>

        {/* Pro Tip & Derivation Toggle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ padding: '8px 10px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-color)', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
            💡 <strong>Pro Tip:</strong> {item.shortcutTip}
          </div>

          {computation.steps && computation.steps.length > 0 && (
            <div>
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="btn btn-ghost btn-sm"
                style={{ width: '100%', justifyContent: 'space-between', fontSize: '0.78rem', padding: '4px 8px', color: 'var(--accent-primary)' }}
              >
                <span>{showSteps ? 'Hide Step-by-Step Solution' : 'Show Step-by-Step Solution'}</span>
                {showSteps ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {showSteps && (
                <div style={{
                  marginTop: '8px',
                  padding: '10px 12px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.76rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Derivation Steps:</strong>
                  {computation.steps.map((st, idx) => (
                    <div key={idx} style={{ marginBottom: '3px' }}>• {st}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InteractiveSandbox() {
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedExam, setSelectedExam] = useState('all');
  const [selectedImportance, setSelectedImportance] = useState('all');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Bookmarks State in localStorage
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('aptixa_sandbox_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      const updated = prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id];
      try {
        localStorage.setItem('aptixa_sandbox_bookmarks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Filter Database
  const filteredData = useMemo(() => {
    return SANDBOX_DATABASE.filter(item => {
      const matchesDomain = selectedDomain === 'all' || item.category === selectedDomain;
      const matchesExam = selectedExam === 'all' || item.examTag.toLowerCase().includes(selectedExam.toLowerCase());
      const matchesImportance = selectedImportance === 'all' || item.importance.toLowerCase() === selectedImportance.toLowerCase();
      const matchesBookmark = !onlyBookmarks || bookmarks.includes(item.id);
      const matchesSearch = searchTerm === '' ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.examTag.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesDomain && matchesExam && matchesImportance && matchesBookmark && matchesSearch;
    });
  }, [searchTerm, selectedDomain, selectedExam, selectedImportance, onlyBookmarks, bookmarks]);

  // Reset page when filters change
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, safeCurrentPage, pageSize]);

  const handleDomainChange = (dom) => {
    setSelectedDomain(dom);
    setCurrentPage(1);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
      {/* Domain Selection Tabs Bar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
        <button
          onClick={() => handleDomainChange('all')}
          className={`btn btn-sm ${selectedDomain === 'all' ? 'btn-primary' : 'btn-outline'}`}
        >
          All Domains ({SANDBOX_STATS.total})
        </button>
        <button
          onClick={() => handleDomainChange('quantitative')}
          className={`btn btn-sm ${selectedDomain === 'quantitative' ? 'btn-primary' : 'btn-outline'}`}
        >
          Quantitative ({SANDBOX_STATS.quantitative})
        </button>
        <button
          onClick={() => handleDomainChange('logical')}
          className={`btn btn-sm ${selectedDomain === 'logical' ? 'btn-primary' : 'btn-outline'}`}
        >
          Logical Reasoning ({SANDBOX_STATS.logical})
        </button>
        <button
          onClick={() => handleDomainChange('technical')}
          className={`btn btn-sm ${selectedDomain === 'technical' ? 'btn-primary' : 'btn-outline'}`}
        >
          CS & Technical ({SANDBOX_STATS.technical})
        </button>
        {SANDBOX_STATS.verbal > 0 && (
          <button
            onClick={() => handleDomainChange('verbal')}
            className={`btn btn-sm ${selectedDomain === 'verbal' ? 'btn-primary' : 'btn-outline'}`}
          >
            DI & Business Math ({SANDBOX_STATS.verbal})
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0 12px', minWidth: '260px', flexGrow: 1 }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search 200 interactive topics or formulas..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            style={{ padding: '8px 10px', border: 'none', background: 'transparent', fontSize: '0.88rem', outline: 'none', width: '100%' }}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="btn btn-ghost btn-sm" style={{ padding: '2px 6px', fontSize: '0.75rem' }}>✕</button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          
          <select
            value={selectedExam}
            onChange={e => { setSelectedExam(e.target.value); setCurrentPage(1); }}
            style={{ padding: '7px 12px', fontSize: '0.85rem' }}
          >
            <option value="all">All Target Exams</option>
            <option value="TCS NQT">TCS NQT</option>
            <option value="GATE CS">GATE CS</option>
            <option value="CAT">CAT</option>
            <option value="Infosys">Infosys</option>
            <option value="Accenture">Accenture</option>
            <option value="Wipro">Wipro</option>
          </select>

          <select
            value={selectedImportance}
            onChange={e => { setSelectedImportance(e.target.value); setCurrentPage(1); }}
            style={{ padding: '7px 12px', fontSize: '0.85rem' }}
          >
            <option value="all">All Importance</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
          </select>

          <button
            onClick={() => { setOnlyBookmarks(!onlyBookmarks); setCurrentPage(1); }}
            className={`btn btn-sm ${onlyBookmarks ? 'btn-primary' : 'btn-outline'}`}
            style={{ gap: '6px' }}
          >
            <Star size={14} color={onlyBookmarks ? '#fff' : 'var(--warning)'} />
            <span>Saved ({bookmarks.length})</span>
          </button>
        </div>
      </div>

      {/* Pagination & Count Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Showing <strong>{totalItems > 0 ? (safeCurrentPage - 1) * pageSize + 1 : 0}</strong>–<strong>{Math.min(safeCurrentPage * pageSize, totalItems)}</strong> of <strong>{totalItems}</strong> interactive items
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Items per page:</label>
          <select
            value={pageSize}
            onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            style={{ padding: '4px 8px', fontSize: '0.82rem' }}
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>

      {/* Interactive Cards Grid */}
      {paginatedData.length === 0 ? (
        <div className="glass-card" style={{ padding: '48px', textAlign: 'center', margin: '20px 0' }}>
          <Calculator size={36} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No interactive items match your filters</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Try clearing search keywords or selecting a different exam domain filter.
          </p>
          <button
            className="btn btn-outline"
            onClick={() => { setSearchTerm(''); setSelectedDomain('all'); setSelectedExam('all'); setSelectedImportance('all'); setOnlyBookmarks(false); }}
          >
            <RefreshCw size={14} /> Reset All Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {paginatedData.map(item => (
            <SandboxCard
              key={item.id}
              item={item}
              isBookmarked={bookmarks.includes(item.id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls Footer */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={safeCurrentPage === 1}
          >
            <ChevronLeft size={16} /> Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - safeCurrentPage) <= 2)
            .map((p, idx, arr) => {
              const prev = arr[idx - 1];
              return (
                <React.Fragment key={p}>
                  {prev && p - prev > 1 && <span style={{ color: 'var(--text-muted)' }}>...</span>}
                  <button
                    className={`btn btn-sm ${safeCurrentPage === p ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setCurrentPage(p)}
                    style={{ minWidth: '32px' }}
                  >
                    {p}
                  </button>
                </React.Fragment>
              );
            })}

          <button
            className="btn btn-outline btn-sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={safeCurrentPage === totalPages}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}

    </div>
  );
}
