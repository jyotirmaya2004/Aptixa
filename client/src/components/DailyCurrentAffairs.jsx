import React, { useState, useEffect } from 'react';
import {
  Newspaper, RefreshCw, Calendar, Sparkles, Search, Bookmark, BookmarkCheck,
  ExternalLink, Filter, ShieldCheck, Zap, Globe, Layers, ArrowUpRight
} from 'lucide-react';
import { fetchDailyCurrentAffairs } from '../utils/api';

export default function DailyCurrentAffairs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('aptixa-news-bookmarks') || '[]');
    } catch (_) {
      return [];
    }
  });
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const loadCurrentAffairs = async (force = false) => {
    try {
      setLoading(true);
      setError('');
      const res = await fetchDailyCurrentAffairs(force);
      setData(res);
    } catch (err) {
      console.error('Failed to load current affairs:', err);
      setError('Failed to fetch daily current affairs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurrentAffairs(false);
  }, []);

  const toggleBookmark = (article) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.id === article.id || b.url === article.url);
      let updated;
      if (exists) {
        updated = prev.filter(b => b.id !== article.id && b.url !== article.url);
      } else {
        updated = [article, ...prev];
      }
      localStorage.setItem('aptixa-news-bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const isBookmarked = (article) => {
    return bookmarks.some(b => b.id === article.id || b.url === article.url);
  };

  const formatRelativeTime = (isoString) => {
    if (!isoString) return 'Today';
    try {
      const diffMs = new Date() - new Date(isoString);
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours <= 0) return 'Just now';
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch (_) {
      return 'Today';
    }
  };

  const categories = ['All', 'Odisha State', 'National India', 'Economy', 'Tech & Science'];

  const rawArticles = showBookmarksOnly ? bookmarks : (data?.articles || []);
  
  const filteredArticles = rawArticles.filter(art => {
    const matchesCat = activeCategory === 'All' || art.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (art.title && art.title.toLowerCase().includes(q)) || 
      (art.description && art.description.toLowerCase().includes(q)) ||
      (art.source && art.source.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  const formattedDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px 60px' }}>
      
      {/* ── Top Header Banner ────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        padding: '28px 24px',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px',
          background: 'var(--accent-primary)', opacity: 0.06, borderRadius: '50%', filter: 'blur(30px)', pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                padding: '4px 10px', background: 'rgba(59, 130, 246, 0.12)', color: 'var(--accent-primary)',
                borderRadius: 'var(--radius-xs)', fontSize: '0.78rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px'
              }}>
                <Calendar size={14} /> {formattedDateStr}
              </span>
              <span style={{
                padding: '4px 10px', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981',
                borderRadius: 'var(--radius-xs)', fontSize: '0.78rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px'
              }}>
                <ShieldCheck size={14} /> Powered by NewsAPI.org
              </span>
            </div>

            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Newspaper color="var(--accent-primary)" size={30} /> Daily Current Affairs
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '6px', marginBottom: 0 }}>
              Curated daily news & general awareness digest for placement interviews and competitive exams. Automatically refreshed daily and cached locally.
            </p>
          </div>

          <button
            onClick={() => loadCurrentAffairs(true)}
            disabled={loading}
            style={{
              padding: '10px 18px',
              background: 'var(--accent-primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            <RefreshCw size={16} className={loading ? 'spin' : ''} />
            {loading ? 'Refreshing API...' : 'Force Refresh News'}
          </button>
        </div>

        {data && (
          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <span><strong>Date Stamp:</strong> {data.lastFetchedDate}</span>
            <span>•</span>
            <span><strong>Articles Loaded:</strong> {data.totalArticles || 0}</span>
            <span>•</span>
            <span><strong>Cache Status:</strong> {data.isSameDayCache ? 'Cached for Today' : 'Live Fetched Today'}</span>
          </div>
        )}
      </div>

      {/* ── Controls: Search & Category Tabs ─────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
        
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '7px 15px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: activeCategory === cat ? 'none' : '1px solid var(--border-color)',
                background: activeCategory === cat ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: activeCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Bookmarks filter */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: '1', justifyContent: 'flex-end', minWidth: '280px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '6px 12px', flex: '1', maxWidth: '300px'
          }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search current affairs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)',
                fontSize: '0.88rem', width: '100%'
              }}
            />
          </div>

          <button
            onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
            style={{
              padding: '7px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              fontWeight: 600,
              border: showBookmarksOnly ? 'none' : '1px solid var(--border-color)',
              background: showBookmarksOnly ? '#8b5cf6' : 'var(--bg-secondary)',
              color: showBookmarksOnly ? '#ffffff' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            {showBookmarksOnly ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            Saved ({bookmarks.length})
          </button>
        </div>
      </div>

      {/* ── Content Grid / Loader ────────────────────────────────────────────── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
          <RefreshCw size={32} className="spin" color="var(--accent-primary)" style={{ marginBottom: '12px' }} />
          <p style={{ fontSize: '1rem', fontWeight: 600 }}>Fetching latest news from NewsAPI.org...</p>
        </div>
      ) : error ? (
        <div style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: '#ef4444', textAlign: 'center' }}>
          <p>{error}</p>
          <button onClick={() => loadCurrentAffairs(true)} style={{ marginTop: '10px', padding: '6px 14px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Retry</button>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <Layers size={40} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>No Articles Found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px' }}>
            {showBookmarksOnly ? 'You have not saved any articles yet.' : 'Try adjusting your category filter or search terms.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {filteredArticles.map(art => (
            <div
              key={art.id || art.url}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              {/* Thumbnail Image */}
              {art.urlToImage ? (
                <div style={{ height: '180px', width: '100%', overflow: 'hidden', position: 'relative', background: 'var(--bg-secondary)' }}>
                  <img
                    src={art.urlToImage}
                    alt={art.title}
                    onError={(e) => { e.target.style.display = 'none'; }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.75)', color: '#fff',
                    padding: '3px 8px', borderRadius: 'var(--radius-xs)', fontSize: '0.72rem', fontWeight: 600, backdropFilter: 'blur(4px)'
                  }}>
                    {art.source}
                  </span>
                </div>
              ) : (
                <div style={{ height: '100px', background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--border-color) 100%)', padding: '12px', display: 'flex', alignItems: 'flex-end' }}>
                  <span style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', padding: '3px 8px', borderRadius: 'var(--radius-xs)', fontSize: '0.72rem', fontWeight: 600 }}>
                    {art.source}
                  </span>
                </div>
              )}

              {/* Card Body */}
              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{art.category || 'General'}</span>
                  <span>{formatRelativeTime(art.publishedAt)}</span>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px', lineHeight: '1.35', flexShrink: 0 }}>
                  {art.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 14px', lineHeight: '1.45', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {art.description}
                </p>

                {/* Exam Key Takeaway Box */}
                <div style={{
                  padding: '8px 10px', background: 'rgba(59, 130, 246, 0.06)', borderRadius: 'var(--radius-xs)',
                  borderLeft: '3px solid var(--accent-primary)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '14px'
                }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Placement Note:</strong> Key topic for interviews & GK rounds.
                </div>

                {/* Card Footer Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                  <button
                    onClick={() => toggleBookmark(art)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer', color: isBookmarked(art) ? '#8b5cf6' : 'var(--text-muted)',
                      display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600
                    }}
                  >
                    {isBookmarked(art) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                    {isBookmarked(art) ? 'Saved' : 'Save'}
                  </button>

                  {art.url && (
                    <a
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--accent-primary)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600,
                        display: 'flex', alignItems: 'center', gap: '4px'
                      }}
                    >
                      Read Full Story <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
