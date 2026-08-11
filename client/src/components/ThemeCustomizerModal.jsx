import React from 'react';
import { Palette, Sun, Moon, Type, Check, X } from 'lucide-react';

export default function ThemeCustomizerModal({
  theme,
  setTheme,
  accent,
  setAccent,
  fontSize,
  setFontSize,
  onClose
}) {
  const accents = [
    { id: 'blue', label: 'Cobalt Blue', color: '#2563eb' },
    { id: 'emerald', label: 'Emerald Green', color: '#059669' },
    { id: 'purple', label: 'Violet Purple', color: '#7c3aed' },
    { id: 'crimson', label: 'Crimson Red', color: '#dc2626' },
    { id: 'amber', label: 'Amber Gold', color: '#d97706' },
  ];

  const fontSizes = [
    { id: 'small', label: 'Compact' },
    { id: 'medium', label: 'Standard' },
    { id: 'large', label: 'Large (High Contrast)' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" style={{ padding: '28px', maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: 'var(--radius-sm)',
              background: 'var(--accent-primary)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Palette size={20} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Platform Preferences & Styling</h3>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={18} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* Theme Mode */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Interface Appearance Theme
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setTheme('dark')}
                style={{ justifyContent: 'center' }}
              >
                <Moon size={16} /> Dark Mode
              </button>
              <button
                className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setTheme('light')}
                style={{ justifyContent: 'center' }}
              >
                <Sun size={16} /> Light Mode
              </button>
            </div>
          </div>

          {/* Accent Color Presets */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Accent Color Palette
            </label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {accents.map(item => (
                <div
                  key={item.id}
                  onClick={() => setAccent(item.id)}
                  title={item.label}
                  className={`color-swatch ${accent === item.id ? 'active' : ''}`}
                  style={{
                    background: item.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  {accent === item.id && <Check size={14} color="#ffffff" />}
                </div>
              ))}
            </div>
          </div>

          {/* Font Size Modifier */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Quiz Problem Typography Size
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {fontSizes.map(item => (
                <button
                  key={item.id}
                  className={`btn btn-sm ${fontSize === item.id ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setFontSize(item.id)}
                  style={{ flexGrow: 1 }}
                >
                  <Type size={14} /> {item.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
          <button className="btn btn-primary" onClick={onClose}>
            Apply Preferences
          </button>
        </div>

      </div>
    </div>
  );
}
