import React from 'react';

export default function FormulaSvgDiagram({ type, title }) {
  const accentColor = 'var(--accent-primary, #3b82f6)';
  const secondaryColor = 'var(--text-muted, #94a3b8)';
  const highlightColor = '#f59e0b';
  const strokeWidth = 2;

  switch (type) {
    case 'triangle':
      return (
        <svg width="100%" height="80" viewBox="0 0 160 80" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <polygon points="20,70 140,70 20,10" fill="rgba(59,130,246,0.12)" stroke={accentColor} strokeWidth={strokeWidth} />
          <line x1="20" y1="60" x2="30" y2="60" stroke={accentColor} strokeWidth={1.5} />
          <line x1="30" y1="60" x2="30" y2="70" stroke={accentColor} strokeWidth={1.5} />
          <text x="12" y="45" fill={secondaryColor} fontSize="10" fontWeight="bold">a</text>
          <text x="75" y="78" fill={secondaryColor} fontSize="10" fontWeight="bold">b</text>
          <text x="85" y="38" fill={highlightColor} fontSize="10" fontWeight="bold">c</text>
        </svg>
      );

    case 'circle':
      return (
        <svg width="100%" height="80" viewBox="0 0 160 80" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <circle cx="80" cy="40" r="32" fill="rgba(59,130,246,0.1)" stroke={accentColor} strokeWidth={strokeWidth} />
          <line x1="80" y1="40" x2="112" y2="40" stroke={highlightColor} strokeWidth={2} strokeDasharray="3,3" />
          <circle cx="80" cy="40" r="3" fill={accentColor} />
          <text x="94" y="35" fill={highlightColor} fontSize="11" fontWeight="bold">r</text>
          <path d="M 80 40 L 112 40 A 32 32 0 0 0 102.6 17.4 Z" fill="rgba(245,158,11,0.25)" />
        </svg>
      );

    case 'speed':
      return (
        <svg width="100%" height="80" viewBox="0 0 160 80" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <line x1="20" y1="50" x2="140" y2="50" stroke={secondaryColor} strokeWidth={2} />
          <circle cx="30" cy="42" r="10" fill={accentColor} />
          <text x="26" y="46" fill="#fff" fontSize="9" fontWeight="bold">S1</text>
          <circle cx="130" cy="42" r="10" fill={highlightColor} />
          <text x="124" y="46" fill="#fff" fontSize="9" fontWeight="bold">S2</text>
          <path d="M 42 42 L 70 42 M 64 38 L 70 42 L 64 46" stroke={accentColor} strokeWidth={2} fill="none" />
          <path d="M 118 42 L 90 42 M 96 38 L 90 42 L 96 46" stroke={highlightColor} strokeWidth={2} fill="none" />
          <text x="68" y="68" fill={secondaryColor} fontSize="10">Distance (D)</text>
        </svg>
      );

    case 'work':
      return (
        <svg width="100%" height="80" viewBox="0 0 160 80" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <rect x="25" y="25" width="40" height="35" rx="4" fill="rgba(59,130,246,0.2)" stroke={accentColor} strokeWidth={1.5} />
          <rect x="95" y="15" width="40" height="45" rx="4" fill="rgba(245,158,11,0.2)" stroke={highlightColor} strokeWidth={1.5} />
          <text x="35" y="45" fill={accentColor} fontSize="11" fontWeight="bold">1/A</text>
          <text x="105" y="42" fill={highlightColor} fontSize="11" fontWeight="bold">1/B</text>
          <text x="73" y="45" fill={secondaryColor} fontSize="14" fontWeight="bold">+</text>
        </svg>
      );

    case 'finance':
      return (
        <svg width="100%" height="80" viewBox="0 0 160 80" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <line x1="20" y1="70" x2="140" y2="70" stroke={secondaryColor} strokeWidth={1.5} />
          <line x1="20" y1="10" x2="20" y2="70" stroke={secondaryColor} strokeWidth={1.5} />
          <path d="M 20 60 Q 70 55 140 15" fill="none" stroke={highlightColor} strokeWidth={2.5} />
          <line x1="20" y1="60" x2="140" y2="40" stroke={accentColor} strokeWidth={1.5} strokeDasharray="3,3" />
          <text x="100" y="25" fill={highlightColor} fontSize="9" fontWeight="bold">CI Curve</text>
          <text x="100" y="52" fill={accentColor} fontSize="9">SI Line</text>
        </svg>
      );

    case 'cube':
      return (
        <svg width="100%" height="80" viewBox="0 0 160 80" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <rect x="40" y="25" width="40" height="40" fill="none" stroke={accentColor} strokeWidth={1.5} />
          <rect x="55" y="10" width="40" height="40" fill="none" stroke={highlightColor} strokeWidth={1.5} />
          <line x1="40" y1="25" x2="55" y2="10" stroke={secondaryColor} strokeWidth={1.5} />
          <line x1="80" y1="25" x2="95" y2="10" stroke={secondaryColor} strokeWidth={1.5} />
          <line x1="40" y1="65" x2="55" y2="50" stroke={secondaryColor} strokeWidth={1.5} />
          <line x1="80" y1="65" x2="95" y2="50" stroke={secondaryColor} strokeWidth={1.5} />
          <text x="102" y="35" fill={secondaryColor} fontSize="10">Edge (a)</text>
        </svg>
      );

    case 'cylinder':
      return (
        <svg width="100%" height="80" viewBox="0 0 160 80" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <ellipse cx="80" cy="20" rx="30" ry="10" fill="rgba(59,130,246,0.15)" stroke={accentColor} strokeWidth={1.5} />
          <line x1="50" y1="20" x2="50" y2="60" stroke={accentColor} strokeWidth={1.5} />
          <line x1="110" y1="20" x2="110" y2="60" stroke={accentColor} strokeWidth={1.5} />
          <ellipse cx="80" cy="60" rx="30" ry="10" fill="rgba(59,130,246,0.15)" stroke={accentColor} strokeWidth={1.5} />
          <line x1="80" y1="20" x2="110" y2="20" stroke={highlightColor} strokeWidth={1.5} strokeDasharray="2,2" />
          <text x="90" y="16" fill={highlightColor} fontSize="9">r</text>
          <text x="116" y="42" fill={secondaryColor} fontSize="9">h</text>
        </svg>
      );

    case 'cone':
      return (
        <svg width="100%" height="80" viewBox="0 0 160 80" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <ellipse cx="80" cy="65" rx="30" ry="10" fill="rgba(59,130,246,0.15)" stroke={accentColor} strokeWidth={1.5} />
          <line x1="50" y1="65" x2="80" y2="15" stroke={accentColor} strokeWidth={1.5} />
          <line x1="110" y1="65" x2="80" y2="15" stroke={accentColor} strokeWidth={1.5} />
          <line x1="80" y1="15" x2="80" y2="65" stroke={highlightColor} strokeWidth={1.5} strokeDasharray="2,2" />
          <text x="84" y="42" fill={highlightColor} fontSize="9">h</text>
          <text x="98" y="38" fill={secondaryColor} fontSize="9">l</text>
        </svg>
      );

    case 'trig':
      return (
        <svg width="100%" height="80" viewBox="0 0 160 80" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <line x1="20" y1="55" x2="140" y2="55" stroke={secondaryColor} strokeWidth={1} />
          <line x1="50" y1="10" x2="50" y2="75" stroke={secondaryColor} strokeWidth={1} />
          <line x1="50" y1="55" x2="110" y2="20" stroke={accentColor} strokeWidth={2} />
          <line x1="110" y1="20" x2="110" y2="55" stroke={highlightColor} strokeWidth={2} />
          <path d="M 65 55 A 15 15 0 0 0 60 46" fill="none" stroke={highlightColor} strokeWidth={1.5} />
          <text x="68" y="50" fill={highlightColor} fontSize="10">θ</text>
          <text x="114" y="40" fill={highlightColor} fontSize="9">sin θ</text>
          <text x="75" y="68" fill={accentColor} fontSize="9">cos θ</text>
        </svg>
      );

    case 'venn':
      return (
        <svg width="100%" height="80" viewBox="0 0 160 80" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <circle cx="65" cy="40" r="28" fill="rgba(59,130,246,0.3)" stroke={accentColor} strokeWidth={1.5} />
          <circle cx="95" cy="40" r="28" fill="rgba(245,158,11,0.3)" stroke={highlightColor} strokeWidth={1.5} />
          <text x="50" y="44" fill={accentColor} fontSize="11" fontWeight="bold">A</text>
          <text x="105" y="44" fill={highlightColor} fontSize="11" fontWeight="bold">B</text>
          <text x="74" y="44" fill="#fff" fontSize="9" fontWeight="bold">A∩B</text>
        </svg>
      );

    case 'clock':
      return (
        <svg width="100%" height="80" viewBox="0 0 160 80" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <circle cx="80" cy="40" r="30" fill="rgba(59,130,246,0.1)" stroke={accentColor} strokeWidth={2} />
          <line x1="80" y1="40" x2="80" y2="22" stroke={highlightColor} strokeWidth={2.5} strokeLinecap="round" />
          <line x1="80" y1="40" x2="98" y2="40" stroke={accentColor} strokeWidth={2} strokeLinecap="round" />
          <circle cx="80" cy="40" r="3" fill="#fff" />
          <text x="76" y="18" fill={secondaryColor} fontSize="8">12</text>
          <text x="112" y="43" fill={secondaryColor} fontSize="8">3</text>
          <text x="78" y="68" fill={secondaryColor} fontSize="8">6</text>
        </svg>
      );

    case 'matrix':
      return (
        <svg width="100%" height="80" viewBox="0 0 160 80" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <path d="M 45 18 L 35 18 L 35 62 L 45 62" fill="none" stroke={accentColor} strokeWidth={2} />
          <path d="M 115 18 L 125 18 L 125 62 L 115 62" fill="none" stroke={accentColor} strokeWidth={2} />
          <text x="50" y="35" fill={accentColor} fontSize="13" fontWeight="bold">a</text>
          <text x="95" y="35" fill={highlightColor} fontSize="13" fontWeight="bold">b</text>
          <text x="50" y="55" fill={highlightColor} fontSize="13" fontWeight="bold">c</text>
          <text x="95" y="55" fill={accentColor} fontSize="13" fontWeight="bold">d</text>
        </svg>
      );

    case 'stats':
    default:
      return (
        <svg width="100%" height="80" viewBox="0 0 160 80" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <line x1="15" y1="70" x2="145" y2="70" stroke={secondaryColor} strokeWidth={1.5} />
          <path d="M 15 70 C 45 70 55 15 80 15 C 105 15 115 70 145 70 Z" fill="rgba(59,130,246,0.15)" stroke={accentColor} strokeWidth={2} />
          <line x1="80" y1="15" x2="80" y2="70" stroke={highlightColor} strokeWidth={1.5} strokeDasharray="3,3" />
          <text x="76" y="12" fill={highlightColor} fontSize="10" fontWeight="bold">μ</text>
          <text x="100" y="45" fill={secondaryColor} fontSize="9">σ</text>
        </svg>
      );
  }
}
