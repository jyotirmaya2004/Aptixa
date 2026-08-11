import React from 'react';

export default function FormulaSvgDiagram({ type, title }) {
  if (!type || type === 'none') {
    return null;
  }

  const accentColor = 'var(--accent-primary, #3b82f6)';
  const secondaryColor = 'var(--text-muted, #94a3b8)';
  const highlightColor = '#f59e0b';
  const strokeWidth = 2;

  switch (type) {
    case 'triangle':
      return (
        <svg width="100%" height="84" viewBox="0 0 160 84" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <polygon points="25,72 135,72 25,12" fill="rgba(59,130,246,0.12)" stroke={accentColor} strokeWidth={strokeWidth} />
          <line x1="25" y1="62" x2="35" y2="62" stroke={accentColor} strokeWidth={1.5} />
          <line x1="35" y1="62" x2="35" y2="72" stroke={accentColor} strokeWidth={1.5} />
          <text x="14" y="46" fill={secondaryColor} fontSize="10" fontWeight="bold">a (height)</text>
          <text x="70" y="81" fill={secondaryColor} fontSize="10" fontWeight="bold">b (base)</text>
          <text x="82" y="38" fill={highlightColor} fontSize="10" fontWeight="bold">c (hypotenuse)</text>
        </svg>
      );

    case 'circle':
      return (
        <svg width="100%" height="84" viewBox="0 0 160 84" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <circle cx="80" cy="42" r="32" fill="rgba(59,130,246,0.1)" stroke={accentColor} strokeWidth={strokeWidth} />
          <line x1="80" y1="42" x2="112" y2="42" stroke={highlightColor} strokeWidth={2} strokeDasharray="3,3" />
          <circle cx="80" cy="42" r="3" fill={accentColor} />
          <text x="92" y="37" fill={highlightColor} fontSize="10" fontWeight="bold">r</text>
          <path d="M 80 42 L 112 42 A 32 32 0 0 0 102.6 19.4 Z" fill="rgba(245,158,11,0.3)" />
          <text x="84" y="32" fill={highlightColor} fontSize="9">θ</text>
        </svg>
      );

    case 'quadrilateral':
      return (
        <svg width="100%" height="84" viewBox="0 0 160 84" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <polygon points="40,18 120,18 140,68 20,68" fill="rgba(59,130,246,0.12)" stroke={accentColor} strokeWidth={strokeWidth} />
          <line x1="40" y1="18" x2="40" y2="68" stroke={highlightColor} strokeWidth={1.5} strokeDasharray="3,3" />
          <text x="75" y="14" fill={accentColor} fontSize="10" fontWeight="bold">a</text>
          <text x="75" y="80" fill={accentColor} fontSize="10" fontWeight="bold">b</text>
          <text x="44" y="46" fill={highlightColor} fontSize="10" fontWeight="bold">h</text>
        </svg>
      );

    case 'polygon':
      return (
        <svg width="100%" height="84" viewBox="0 0 160 84" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <polygon points="80,12 118,32 118,70 80,80 42,70 42,32" fill="rgba(59,130,246,0.12)" stroke={accentColor} strokeWidth={strokeWidth} />
          <text x="72" y="48" fill={highlightColor} fontSize="10" fontWeight="bold">n-gon</text>
        </svg>
      );

    case 'cube':
      return (
        <svg width="100%" height="84" viewBox="0 0 160 84" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <rect x="42" y="28" width="42" height="42" fill="none" stroke={accentColor} strokeWidth={1.5} />
          <rect x="58" y="12" width="42" height="42" fill="none" stroke={highlightColor} strokeWidth={1.5} />
          <line x1="42" y1="28" x2="58" y2="12" stroke={secondaryColor} strokeWidth={1.5} />
          <line x1="84" y1="28" x2="100" y2="12" stroke={secondaryColor} strokeWidth={1.5} />
          <line x1="42" y1="70" x2="58" y2="54" stroke={secondaryColor} strokeWidth={1.5} />
          <line x1="84" y1="70" x2="100" y2="54" stroke={secondaryColor} strokeWidth={1.5} />
          <text x="106" y="38" fill={secondaryColor} fontSize="10">Edge (a)</text>
        </svg>
      );

    case 'cylinder':
      return (
        <svg width="100%" height="84" viewBox="0 0 160 84" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <ellipse cx="80" cy="22" rx="30" ry="10" fill="rgba(59,130,246,0.15)" stroke={accentColor} strokeWidth={1.5} />
          <line x1="50" y1="22" x2="50" y2="62" stroke={accentColor} strokeWidth={1.5} />
          <line x1="110" y1="22" x2="110" y2="62" stroke={accentColor} strokeWidth={1.5} />
          <ellipse cx="80" cy="62" rx="30" ry="10" fill="rgba(59,130,246,0.15)" stroke={accentColor} strokeWidth={1.5} />
          <line x1="80" y1="22" x2="110" y2="22" stroke={highlightColor} strokeWidth={1.5} strokeDasharray="2,2" />
          <text x="90" y="18" fill={highlightColor} fontSize="9">r</text>
          <text x="116" y="44" fill={secondaryColor} fontSize="9">h</text>
        </svg>
      );

    case 'cone':
      return (
        <svg width="100%" height="84" viewBox="0 0 160 84" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <ellipse cx="80" cy="68" rx="30" ry="10" fill="rgba(59,130,246,0.15)" stroke={accentColor} strokeWidth={1.5} />
          <line x1="50" y1="68" x2="80" y2="16" stroke={accentColor} strokeWidth={1.5} />
          <line x1="110" y1="68" x2="80" y2="16" stroke={accentColor} strokeWidth={1.5} />
          <line x1="80" y1="16" x2="80" y2="68" stroke={highlightColor} strokeWidth={1.5} strokeDasharray="2,2" />
          <text x="84" y="44" fill={highlightColor} fontSize="9">h</text>
          <text x="98" y="40" fill={secondaryColor} fontSize="9">l</text>
        </svg>
      );

    case 'sphere':
      return (
        <svg width="100%" height="84" viewBox="0 0 160 84" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <circle cx="80" cy="42" r="30" fill="rgba(59,130,246,0.12)" stroke={accentColor} strokeWidth={1.5} />
          <ellipse cx="80" cy="42" rx="30" ry="8" fill="none" stroke={highlightColor} strokeWidth={1.5} strokeDasharray="3,3" />
          <line x1="80" y1="42" x2="110" y2="42" stroke={highlightColor} strokeWidth={2} />
          <text x="92" y="38" fill={highlightColor} fontSize="10" fontWeight="bold">r</text>
        </svg>
      );

    case 'coordinate':
      return (
        <svg width="100%" height="84" viewBox="0 0 160 84" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <line x1="20" y1="70" x2="140" y2="70" stroke={secondaryColor} strokeWidth={1.5} />
          <line x1="30" y1="10" x2="30" y2="75" stroke={secondaryColor} strokeWidth={1.5} />
          <circle cx="45" cy="55" r="3.5" fill={accentColor} />
          <circle cx="120" cy="20" r="3.5" fill={highlightColor} />
          <line x1="45" y1="55" x2="120" y2="20" stroke={accentColor} strokeWidth={2} />
          <text x="35" y="66" fill={secondaryColor} fontSize="8">P1(x1,y1)</text>
          <text x="100" y="16" fill={highlightColor} fontSize="8">P2(x2,y2)</text>
        </svg>
      );

    case 'trig':
      return (
        <svg width="100%" height="84" viewBox="0 0 160 84" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <polygon points="30,70 130,70 130,20" fill="rgba(59,130,246,0.12)" stroke={accentColor} strokeWidth={1.5} />
          <path d="M 50 70 A 20 20 0 0 0 45 60" fill="none" stroke={highlightColor} strokeWidth={2} />
          <text x="54" y="66" fill={highlightColor} fontSize="10" fontWeight="bold">θ</text>
          <text x="134" y="45" fill={accentColor} fontSize="9">Height</text>
          <text x="70" y="80" fill={secondaryColor} fontSize="9">Distance</text>
        </svg>
      );

    case 'venn':
      return (
        <svg width="100%" height="84" viewBox="0 0 160 84" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <circle cx="65" cy="42" r="28" fill="rgba(59,130,246,0.3)" stroke={accentColor} strokeWidth={1.5} />
          <circle cx="95" cy="42" r="28" fill="rgba(245,158,11,0.3)" stroke={highlightColor} strokeWidth={1.5} />
          <text x="50" y="46" fill={accentColor} fontSize="11" fontWeight="bold">A</text>
          <text x="105" y="46" fill={highlightColor} fontSize="11" fontWeight="bold">B</text>
          <text x="74" y="46" fill="#fff" fontSize="9" fontWeight="bold">A∩B</text>
        </svg>
      );

    case 'clock':
      return (
        <svg width="100%" height="84" viewBox="0 0 160 84" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <circle cx="80" cy="42" r="30" fill="rgba(59,130,246,0.1)" stroke={accentColor} strokeWidth={2} />
          <line x1="80" y1="42" x2="80" y2="24" stroke={highlightColor} strokeWidth={2.5} strokeLinecap="round" />
          <line x1="80" y1="42" x2="98" y2="42" stroke={accentColor} strokeWidth={2} strokeLinecap="round" />
          <circle cx="80" cy="42" r="3" fill="#fff" />
          <text x="76" y="20" fill={secondaryColor} fontSize="8">12</text>
          <text x="112" y="45" fill={secondaryColor} fontSize="8">3</text>
          <text x="78" y="70" fill={secondaryColor} fontSize="8">6</text>
        </svg>
      );

    case 'matrix':
      return (
        <svg width="100%" height="84" viewBox="0 0 160 84" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xs)', padding: '6px' }}>
          <path d="M 45 20 L 35 20 L 35 64 L 45 64" fill="none" stroke={accentColor} strokeWidth={2} />
          <path d="M 115 20 L 125 20 L 125 64 L 115 64" fill="none" stroke={accentColor} strokeWidth={2} />
          <text x="50" y="37" fill={accentColor} fontSize="13" fontWeight="bold">a</text>
          <text x="95" y="37" fill={highlightColor} fontSize="13" fontWeight="bold">b</text>
          <text x="50" y="57" fill={highlightColor} fontSize="13" fontWeight="bold">c</text>
          <text x="95" y="57" fill={accentColor} fontSize="13" fontWeight="bold">d</text>
        </svg>
      );

    default:
      return null;
  }
}
