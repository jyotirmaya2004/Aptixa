import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, BarChart3, Grid, ShieldCheck, Zap, Palette, Lightbulb, 
  BookOpen, Menu, X, ChevronRight, Sparkles, Code2, Search, Command, Flame,
  Download
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
    { id: 'categories',  label: 'Assessment Domains', icon: Grid },
    { id: 'leetcode500', label: 'DSA',                 icon: Code2 },
    { id: 'sandbox',     label: 'Live Sandbox',        icon: Sparkles },
    { id: 'books',       label: 'Popular Books',       icon: BookOpen },
    { id: 'tips',        label: 'Tips & Formulas',     icon: Lightbulb },
    { id: 'stats',       label: 'Analytics',           icon: BarChart3 },
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
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert('To install APTIXA as an app:\n\n1. Open Google Chrome menu (⋮)\n2. Tap "Add to Home screen" or "Install App"');
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
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky', top: 0, zIndex: 1000,
      padding: '0 16px',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div className="header-content" style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '58px', gap: '12px'
      }}>

        {/* Brand Logo & Name */}
        <div
          onClick={() => handleTabClick('categories')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}
        >
          <img
            src="/logo.png"
            alt="APTIXA Logo"
            style={{
              width: '46px', height: '46px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 8px rgba(37,99,235,0.4))'
            }}
          />
          <div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem', fontWeight: '800',
              letterSpacing: '-0.5px',
              lineHeight: 1
            }}>
              <span className="gradient-text">APTIXA</span>
            </span>
            <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.3px', marginTop: '2px' }}>
              Placement &amp; Skill Hub
            </div>
          </div>
        </div>

        {/* Interactive Command Palette Search Input Button */}
        <button
          onClick={() => setSearchModalOpen(true)}
          className="header-search-btn"
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '6px 14px', background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)',
            color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.82rem',
            transition: 'all 0.15s ease', maxWidth: '240px', flex: 1
          }}
        >
          <Search size={14} color="var(--accent-primary)" />
          <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Search solvers &amp; DSA...</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '2px', padding: '2px 5px',
            borderRadius: '3px', background: 'var(--bg-card)', border: '1px solid var(--border-color)',
            fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-muted)'
          }}>
            <Command size={10} /> K
          </span>
        </button>

        {/* Desktop Navigation Tabs */}
        <nav className="desktop-header-nav" style={{
          display: 'flex', alignItems: 'center', gap: '2px',
          background: 'var(--bg-secondary)',
          padding: '3px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-color)',
        }}>
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-tab ${currentTab === id ? 'active' : ''}`}
              onClick={() => handleTabClick(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', borderRadius: 'var(--radius-xs)',
                fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer',
                border: 'none', background: currentTab === id ? 'var(--bg-card)' : 'transparent',
                color: currentTab === id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                boxShadow: currentTab === id ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={14} color={currentTab === id ? 'var(--accent-primary)' : 'var(--text-muted)'} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Right Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          
          {/* Chrome Mobile / Desktop Install Shortcut Button */}
          <button
            className="btn btn-primary btn-sm"
            onClick={handleInstallApp}
            title="Install APTIXA App & Shortcut"
            style={{
              padding: '6px 10px',
              fontSize: '0.78rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontWeight: '700'
            }}
          >
            <Download size={13} />
            <span className="desktop-only">Install App</span>
          </button>

          {/* Interactive Stats Dropdown Pill */}
          {stats && (
            <button
              onClick={() => setStatsPopoverOpen(prev => !prev)}
              className="desktop-stats-badge"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '5px 12px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem', color: 'var(--text-secondary)',
                cursor: 'pointer', transition: 'all 0.15s ease'
              }}
            >
              <span style={{ color: 'var(--warning)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={13} color="#f59e0b" /> {stats.overallAccuracy ?? 0}%
              </span>
              <span style={{ color: 'var(--border-color)' }}>│</span>
              <span>{stats.totalQuestionsAnswered ?? 0} Solved</span>
            </button>
          )}

          {/* Preferences Modal Trigger */}
          <button
            className="btn btn-outline btn-sm"
            onClick={onOpenPreferences}
            title="Customization Preferences"
            style={{ padding: '6px' }}
          >
            <Palette size={15} color="var(--accent-primary)" />
          </button>

          {/* Theme Quick Toggle */}
          <button
            className="btn btn-outline btn-sm"
            onClick={toggleTheme}
            title="Toggle Light/Dark Theme"
            style={{ padding: '6px', gap: '4px' }}
          >
            {theme === 'dark'
              ? <Sun size={15} color="#f59e0b" />
              : <Moon size={15} color="#1e40af" />
            }
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-hamburger-btn btn btn-outline btn-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{ padding: '6px' }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
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

            {/* Mobile Install App Button */}
            <button
              onClick={handleInstallApp}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', borderRadius: 'var(--radius-sm)',
                background: 'var(--info-bg)', color: 'var(--info)',
                border: '1px solid rgba(59,130,246,0.3)',
                fontWeight: '700', fontSize: '0.92rem',
                cursor: 'pointer', textAlign: 'left', marginTop: '4px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Download size={18} />
                <span>Install APTIXA Android Shortcut</span>
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
