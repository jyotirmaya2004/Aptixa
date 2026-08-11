import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, BarChart3, Grid, ShieldCheck, Zap, Palette, 
  BookOpen, Menu, X, ChevronRight, Sparkles, Code2, Search, Command, Flame,
  Download, Newspaper, Mic
} from 'lucide-react';
import HeaderSearchModal from './HeaderSearchModal';
import HeaderStatsPopover from './HeaderStatsPopover';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  theme, 
  toggleTheme, 
  stats,
  onOpenPreferences,
  onNavigateToItem
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [statsPopoverOpen, setStatsPopoverOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const tabs = [
    { id: 'categories',     label: 'Assessment Domains', icon: Grid },
    { id: 'spoken_english', label: 'Spoken English',     icon: Mic },
    { id: 'current_affairs',label: 'Current Affairs',    icon: Newspaper },
    { id: 'leetcode500',    label: 'DSA',                icon: Code2 },
    { id: 'sandbox',        label: 'Live Sandbox',       icon: Sparkles },
    { id: 'books',          label: 'Popular Books',      icon: BookOpen },
    { id: 'stats',          label: 'Analytics',          icon: BarChart3 },
  ];

  // Hotkey listener & PWA beforeinstallprompt listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallApp = async () => {
    setMobileMenuOpen(false);
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert('To add APTIXA to your Home Screen:\n\n1. Tap the Chrome menu (⋮) at top-right\n2. Select "Add to Home screen" or "Install app"');
    }
  };

  const handleTabClick = (tabId) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  const handleSearchResultSelect = (result) => {
    if (result.tab) {
      setCurrentTab(result.tab);
    }
    if (onNavigateToItem) {
      onNavigateToItem(result);
    }
  };

  return (
    <header style={{
      background: 'rgba(var(--bg-card-rgb, 15, 23, 42), 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky', top: 0, zIndex: 1000,
      padding: '0 20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
    }}>
      <div className="header-content" style={{
        maxWidth: '1300px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '62px', gap: '16px'
      }}>

        {/* Brand Logo & Name */}
        <div
          onClick={() => handleTabClick('categories')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}
        >
          <div style={{
            width: '40px', height: '40px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(37,99,235,0.35)'
          }}>
            <img
              src="/logo.png"
              alt="APTIXA"
              onError={(e) => { e.target.style.display = 'none'; }}
              style={{ width: '28px', height: '28px', objectFit: 'contain' }}
            />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem', fontWeight: '800',
              letterSpacing: '-0.5px',
              lineHeight: 1,
              display: 'block'
            }}>
              <span className="gradient-text">APTIXA</span>
            </span>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.4px', marginTop: '1px', textTransform: 'uppercase' }}>
              Skill &amp; Learning Hub
            </div>
          </div>
        </div>

        {/* Interactive Command Palette Search Input Button */}
        <button
          onClick={() => setSearchModalOpen(true)}
          className="header-search-btn"
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '7px 14px', background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)', borderRadius: '20px',
            color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.82rem',
            transition: 'all 0.2s ease', maxWidth: '220px', flex: 1
          }}
        >
          <Search size={14} color="var(--accent-primary)" />
          <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Search topic or question...</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '2px', padding: '2px 6px',
            borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-color)',
            fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)'
          }}>
            <Command size={10} /> K
          </span>
        </button>

        {/* Desktop Navigation Tabs */}
        <nav className="desktop-header-nav" style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          background: 'var(--bg-secondary)',
          padding: '4px',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
        }}>
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = currentTab === id;
            return (
              <button
                key={id}
                className={`nav-tab ${isActive ? 'active' : ''}`}
                onClick={() => handleTabClick(id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '6px 14px', borderRadius: '18px',
                  fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer',
                  border: 'none',
                  background: isActive ? 'var(--accent-primary)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  boxShadow: isActive ? '0 3px 10px rgba(37,99,235,0.3)' : 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={15} color={isActive ? '#ffffff' : 'var(--text-muted)'} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          
          {/* Interactive Stats Dropdown Pill */}
          {stats && (
            <button
              onClick={() => setStatsPopoverOpen(prev => !prev)}
              className="desktop-stats-badge"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '6px 12px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                fontSize: '0.78rem', color: 'var(--text-secondary)',
                cursor: 'pointer', transition: 'all 0.15s ease'
              }}
            >
              <span style={{ color: '#f59e0b', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={14} fill="#f59e0b" color="#f59e0b" /> {stats.overallAccuracy ?? 0}%
              </span>
              <span style={{ color: 'var(--border-color)' }}>│</span>
              <span style={{ fontWeight: 600 }}>{stats.totalQuestionsAnswered ?? 0} Solved</span>
            </button>
          )}

          {/* Preferences Modal Trigger */}
          <button
            className="btn btn-outline btn-sm"
            onClick={onOpenPreferences}
            title="Customization Preferences"
            style={{ padding: '7px', borderRadius: '50%' }}
          >
            <Palette size={16} color="var(--accent-primary)" />
          </button>

          {/* Theme Quick Toggle */}
          <button
            className="btn btn-outline btn-sm"
            onClick={toggleTheme}
            title="Toggle Light/Dark Theme"
            style={{ padding: '7px', borderRadius: '50%' }}
          >
            {theme === 'dark'
              ? <Sun size={16} color="#f59e0b" />
              : <Moon size={16} color="#1e40af" />
            }
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-hamburger-btn btn btn-outline btn-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{ padding: '7px', borderRadius: '8px' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-drawer-menu"
          style={{
            position: 'absolute', top: '58px', left: 0, right: 0,
            background: 'var(--bg-card)',
            borderBottom: '2px solid var(--accent-primary)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
            padding: '16px', zIndex: 999,
            animation: 'slideUp 0.2s ease-out'
          }}
        >
          <div style={{ display: 'grid', gap: '8px' }}>
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleTabClick(id)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', borderRadius: 'var(--radius-sm)',
                  background: currentTab === id ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                  color: currentTab === id ? '#fff' : 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  fontWeight: '600', fontSize: '0.92rem',
                  cursor: 'pointer', textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} />
                  <span>{label}</span>
                </div>
                <ChevronRight size={16} opacity={0.6} />
              </button>
            ))}

            {/* Mobile-Only Install App & Add Shortcut Option in Hamburger List */}
            <button
              onClick={handleInstallApp}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', borderRadius: 'var(--radius-sm)',
                background: 'var(--info-bg)', color: 'var(--info)',
                border: '1px solid rgba(59,130,246,0.3)',
                fontWeight: '700', fontSize: '0.92rem',
                cursor: 'pointer', textAlign: 'left', marginTop: '6px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Download size={18} />
                <span>Install App &amp; Shortcut</span>
              </div>
              <ChevronRight size={16} opacity={0.6} />
            </button>
          </div>
        </div>
      )}

      {/* Global Command Palette Search Modal */}
      <HeaderSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectResult={handleSearchResultSelect}
      />

      {/* Stats Popover Card */}
      {statsPopoverOpen && (
        <HeaderStatsPopover
          stats={stats}
          onClose={() => setStatsPopoverOpen(false)}
          onNavigateAnalytics={() => setCurrentTab('stats')}
        />
      )}

    </header>
  );
}
