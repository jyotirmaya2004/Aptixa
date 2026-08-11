import React, { useState } from 'react';
import { 
  Lightbulb, Calculator, Sparkles, Search, BookOpen, Clock, 
  CheckCircle2, Copy, Check, Zap, HelpCircle, ArrowRight, RefreshCw, Filter 
} from 'lucide-react';

const FORMULA_DATABASE = [
  // Quantitative Aptitude
  {
    id: 'f1',
    category: 'quantitative',
    topic: 'Time & Work',
    title: 'Combined Work Formula (2 Workers)',
    formula: 'Total Time = (A × B) / (A + B)',
    description: 'If person A completes work in A days and person B in B days, together they complete it in (A × B)/(A + B) days.',
    shortcut: 'Work done in 1 day = (1/A) + (1/B). Multiply by total days worked.',
    interactiveCalc: 'time_work'
  },
  {
    id: 'f2',
    category: 'quantitative',
    topic: 'Speed & Distance',
    title: 'Average Speed (Equal Distance)',
    formula: 'Avg Speed = (2 × S1 × S2) / (S1 + S2)',
    description: 'When traveling equal distances at speeds S1 and S2, the average speed for the whole journey is the harmonic mean.',
    shortcut: 'Do NOT take simple arithmetic mean (S1+S2)/2 unless time taken is equal!',
    interactiveCalc: 'avg_speed'
  },
  {
    id: 'f3',
    category: 'quantitative',
    topic: 'Speed & Distance',
    title: 'Relative Speed Formula',
    formula: 'Same Dir = S1 - S2 | Opp Dir = S1 + S2',
    description: 'When two objects move in opposite directions, relative speed is S1 + S2. In same direction, relative speed is |S1 - S2|.',
    shortcut: 'To convert km/h to m/s, multiply by 5/18. To convert m/s to km/h, multiply by 18/5.',
    interactiveCalc: null
  },
  {
    id: 'f4',
    category: 'quantitative',
    topic: 'Profit & Loss',
    title: 'Profit & Loss Percentages',
    formula: 'Profit % = (Profit / CP) × 100 | Loss % = (Loss / CP) × 100',
    description: 'Profit = Selling Price (SP) - Cost Price (CP). Loss = Cost Price (CP) - Selling Price (SP). Always calculated on CP.',
    shortcut: 'SP = CP × (100 + Profit%) / 100. Discount is always applied on Marked Price (MP).',
    interactiveCalc: 'profit_loss'
  },
  {
    id: 'f5',
    category: 'quantitative',
    topic: 'Interest & Finance',
    title: 'Simple & Compound Interest',
    formula: 'SI = (P × R × T) / 100 | CI = P(1 + R/100)^T - P',
    description: 'P = Principal, R = Annual Rate %, T = Time in years.',
    shortcut: 'Difference between CI and SI for 2 years = P × (R / 100)²',
    interactiveCalc: 'interest'
  },
  {
    id: 'f6',
    category: 'quantitative',
    topic: 'Permutations & Combinations',
    title: 'nPr and nCr Formulas',
    formula: 'nPr = n! / (n - r)! | nCr = n! / [r! × (n - r)!]',
    description: 'Permutation (nPr) is used when ORDER matters. Combination (nCr) is used when SELECTION matters.',
    shortcut: 'nCr = nC(n-r). E.g., 10C8 = 10C2 = (10 × 9) / (2 × 1) = 45.',
    interactiveCalc: null
  },
  {
    id: 'f7',
    category: 'quantitative',
    topic: 'Probability',
    title: 'Probability Rule',
    formula: 'P(E) = Favorable Outcomes / Total Outcomes',
    description: '0 ≤ P(E) ≤ 1. Sum of all probabilities in a sample space is always 1. P(Not E) = 1 - P(E).',
    shortcut: 'When rolling 2 dice, total outcomes = 36. Sum of 7 has highest probability (6/36 = 1/6).',
    interactiveCalc: null
  },
  {
    id: 'f8',
    category: 'quantitative',
    topic: 'Mensuration (Geometry)',
    title: '2D & 3D Area & Volume Rules',
    formula: 'Circle Area = πr² | Cylinder Vol = πr²h | Sphere Vol = (4/3)πr³',
    description: 'Perimeter of Circle (Circumference) = 2πr. Diagonal of Square = a√2. Diagonal of Cube = a√3.',
    shortcut: 'If side of square increases by x%, Area increases by (2x + x²/100)%.',
    interactiveCalc: null
  },

  // Logical Reasoning Tricks
  {
    id: 'f9',
    category: 'logical',
    topic: 'Clocks & Calendars',
    title: 'Angle Between Clock Hands',
    formula: 'Angle = |(30 × H) - (5.5 × M)|',
    description: 'Where H is hours (1 to 12) and M is minutes (0 to 59).',
    shortcut: 'Hour hand moves at 0.5° per minute. Minute hand moves at 6° per minute.',
    interactiveCalc: 'clock_angle'
  },
  {
    id: 'f10',
    category: 'logical',
    topic: 'Syllogisms',
    title: 'Venn Diagram Rules',
    formula: 'All A are B → A ⊂ B | No A is B → A ∩ B = ∅',
    description: 'Draw minimal overlapping diagrams. Check if conclusion holds in ALL possible valid diagrams.',
    shortcut: 'From "Some A are B", you CANNOT conclude "Some A are not B".',
    interactiveCalc: null
  },
  {
    id: 'f11',
    category: 'logical',
    topic: 'Seating Arrangement',
    title: 'Circular & Linear Positions',
    formula: 'Circular (n people) = (n - 1)! arrangements',
    description: 'Facing Center: Left is clockwise, Right is anti-clockwise. Facing Outside: Left is anti-clockwise, Right is clockwise.',
    shortcut: 'Always start drawing seating arrangement from a person whose position is fixed relative to others.',
    interactiveCalc: null
  },

  // Technical & CS Core
  {
    id: 'f12',
    category: 'technical',
    topic: 'Algorithms & Complexity',
    title: 'Big-O Complexity Order',
    formula: 'O(1) < O(log N) < O(N) < O(N log N) < O(N²) < O(2ⁿ)',
    description: 'Binary Search: O(log N). Merge/Quick Sort: O(N log N). Nested Loops: O(N²).',
    shortcut: 'If input N ≤ 10⁵, an O(N log N) or O(N) algorithm will pass within 1 second execution limit.',
    interactiveCalc: null
  }
];

const EXAM_STRATEGIES = [
  {
    title: '🎯 Option Elimination Technique',
    tag: 'Time Saver',
    description: 'Before solving complex calculations, look at unit digits, odd/even parity, or estimation to eliminate 2 obviously wrong options immediately.',
    example: 'Q: What is 48 × 42? Options: (A) 2016 (B) 2014 (C) 1986 (D) 2112. Last digits 8 × 2 = 16 (ends in 6). Eliminates (B) and (D)! 50 × 40 = 2000, so 2016 is exact.'
  },
  {
    title: '⚡ The 10-Second Ratio Method',
    tag: 'Aptitude Hack',
    description: 'For Mixture & Allegations or Time & Distance, convert percentages into simplified ratios (e.g., 25% = 1/4, 16.66% = 1/6) to avoid heavy decimal division.',
    example: '20% increase means multiplier is 6/5. 20% decrease means multiplier is 4/5.'
  },
  {
    title: '⏱️ The 2-Pass Exam Strategy',
    tag: 'Exam Management',
    description: 'Pass 1 (0-30 mins): Solve all easy questions in under 45 seconds. Pass 2 (30-60 mins): Attempt flagged medium/hard questions using formula shortcuts.',
    example: 'Never get stuck on a single question for > 2 minutes. Flag it and move forward!'
  },
  {
    title: '🔍 Reverse Plug-in Strategy',
    tag: 'Verification',
    description: 'When solving quadratic equations or age problems, plug the 4 options back into the question statement to see which one satisfies all given conditions.',
    example: 'For age problems, test Option B or C first to quickly narrow down higher or lower values.'
  }
];

export default function TipsAndFormulas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  // Interactive Calculators State
  const [calcInputs, setCalcInputs] = useState({
    timeA: 12, timeB: 18,
    speed1: 60, speed2: 40,
    cp: 800, sp: 1000,
    clockH: 3, clockM: 30
  });

  const handleCopyFormula = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFormulas = FORMULA_DATABASE.filter(f => {
    const matchesDomain = selectedDomain === 'all' || f.category === selectedDomain;
    const matchesSearch = searchTerm === '' || 
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      f.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.formula.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  // Calculate live Interactive Formulas
  const combinedTime = ((calcInputs.timeA * calcInputs.timeB) / (calcInputs.timeA + calcInputs.timeB)).toFixed(2);
  const avgSpeed = ((2 * calcInputs.speed1 * calcInputs.speed2) / (calcInputs.speed1 + calcInputs.speed2)).toFixed(2);
  const profitAmt = calcInputs.sp - calcInputs.cp;
  const profitPct = calcInputs.cp > 0 ? ((profitAmt / calcInputs.cp) * 100).toFixed(2) : 0;
  const clockAngle = Math.abs((30 * calcInputs.clockH) - (5.5 * calcInputs.clockM));
  const minClockAngle = Math.min(clockAngle, 360 - clockAngle).toFixed(1);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
      
      {/* Top Banner */}
      <div className="glass-card" style={{ padding: '32px', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: 'var(--radius-xs)', background: 'var(--info-bg)', border: '1px solid rgba(59,130,246,0.25)', fontSize: '0.78rem', fontWeight: '700', color: 'var(--info)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <Sparkles size={13} /> Aptitude & Competitive Mastery Hub
          </div>
          <h2 style={{ fontSize: '1.9rem', marginBottom: '10px', fontWeight: '800' }}>
            Formula Reference Cheatsheet & Exam Shortcuts
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
            Master core mathematical formulas, rapid problem-solving shortcuts, and interactive calculators to solve placement examination questions in half the time.
          </p>
        </div>
      </div>

      {/* Interactive Exam Strategies Section */}
      <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Zap size={20} color="var(--warning)" /> Interactive Exam Solving Strategies
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '36px' }}>
        {EXAM_STRATEGIES.map((strat, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '22px', borderLeft: '4px solid var(--accent-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{strat.title}</h4>
              <span className="badge badge-info">{strat.tag}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '12px' }}>
              {strat.description}
            </p>
            <div style={{ padding: '10px 12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <strong style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '4px' }}>Practical Example:</strong>
              {strat.example}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Math Calculators Sandbox */}
      <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Calculator size={20} color="var(--accent-primary)" /> Live Interactive Formula Sandbox
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '36px' }}>
        
        {/* Time & Work Live Calc */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', color: 'var(--accent-primary)' }}>
            ⏱️ Combined Time & Work Sandbox
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Person A Days</label>
              <input
                type="number"
                value={calcInputs.timeA}
                onChange={e => setCalcInputs({ ...calcInputs, timeA: Number(e.target.value) || 1 })}
                style={{ width: '100%', padding: '6px 10px', fontSize: '0.88rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Person B Days</label>
              <input
                type="number"
                value={calcInputs.timeB}
                onChange={e => setCalcInputs({ ...calcInputs, timeB: Number(e.target.value) || 1 })}
                style={{ width: '100%', padding: '6px 10px', fontSize: '0.88rem' }}
              />
            </div>
          </div>
          <div style={{ padding: '10px', background: 'var(--success-bg)', border: '1px solid var(--success-border)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--success)', fontWeight: '600' }}>Together Time: </span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--success)' }}>{combinedTime} Days</strong>
          </div>
        </div>

        {/* Avg Speed Live Calc */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', color: 'var(--accent-primary)' }}>
            🏎️ Harmonic Average Speed Sandbox
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Speed 1 (km/h)</label>
              <input
                type="number"
                value={calcInputs.speed1}
                onChange={e => setCalcInputs({ ...calcInputs, speed1: Number(e.target.value) || 1 })}
                style={{ width: '100%', padding: '6px 10px', fontSize: '0.88rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Speed 2 (km/h)</label>
              <input
                type="number"
                value={calcInputs.speed2}
                onChange={e => setCalcInputs({ ...calcInputs, speed2: Number(e.target.value) || 1 })}
                style={{ width: '100%', padding: '6px 10px', fontSize: '0.88rem' }}
              />
            </div>
          </div>
          <div style={{ padding: '10px', background: 'var(--info-bg)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--info)', fontWeight: '600' }}>Harmonic Avg Speed: </span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--info)' }}>{avgSpeed} km/h</strong>
          </div>
        </div>

        {/* Profit & Loss Live Calc */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', color: 'var(--accent-primary)' }}>
            📈 Profit & Loss Calculator
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cost Price ($)</label>
              <input
                type="number"
                value={calcInputs.cp}
                onChange={e => setCalcInputs({ ...calcInputs, cp: Number(e.target.value) || 1 })}
                style={{ width: '100%', padding: '6px 10px', fontSize: '0.88rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Selling Price ($)</label>
              <input
                type="number"
                value={calcInputs.sp}
                onChange={e => setCalcInputs({ ...calcInputs, sp: Number(e.target.value) || 1 })}
                style={{ width: '100%', padding: '6px 10px', fontSize: '0.88rem' }}
              />
            </div>
          </div>
          <div style={{ padding: '10px', background: profitAmt >= 0 ? 'var(--success-bg)' : 'var(--danger-bg)', border: `1px solid ${profitAmt >= 0 ? 'var(--success-border)' : 'var(--danger-border)'}`, borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: profitAmt >= 0 ? 'var(--success)' : 'var(--danger)', fontWeight: '600' }}>
              {profitAmt >= 0 ? 'Profit: ' : 'Loss: '}
            </span>
            <strong style={{ fontSize: '1.1rem', color: profitAmt >= 0 ? 'var(--success)' : 'var(--danger)' }}>
              ${Math.abs(profitAmt)} ({profitPct}%)
            </strong>
          </div>
        </div>

        {/* Clock Angle Live Calc */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', color: 'var(--accent-primary)' }}>
            🕒 Clock Hand Angle Calculator
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hours (1-12)</label>
              <input
                type="number"
                min={1} max={12}
                value={calcInputs.clockH}
                onChange={e => setCalcInputs({ ...calcInputs, clockH: Number(e.target.value) || 1 })}
                style={{ width: '100%', padding: '6px 10px', fontSize: '0.88rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Minutes (0-59)</label>
              <input
                type="number"
                min={0} max={59}
                value={calcInputs.clockM}
                onChange={e => setCalcInputs({ ...calcInputs, clockM: Number(e.target.value) || 0 })}
                style={{ width: '100%', padding: '6px 10px', fontSize: '0.88rem' }}
              />
            </div>
          </div>
          <div style={{ padding: '10px', background: 'var(--warning-bg)', border: '1px solid var(--warning-border)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--warning)', fontWeight: '600' }}>Internal Angle: </span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--warning)' }}>{minClockAngle}°</strong>
          </div>
        </div>

      </div>

      {/* Formula Bank Section with Search & Domain Filters */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={20} color="var(--accent-primary)" /> Mathematical Formulas & Rules Bank
        </h3>

        {/* Search & Domain Filter Controls */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0 10px' }}>
            <Search size={15} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search formula..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ padding: '6px 10px', border: 'none', background: 'transparent', fontSize: '0.85rem', outline: 'none' }}
            />
          </div>

          <select
            value={selectedDomain}
            onChange={e => setSelectedDomain(e.target.value)}
            style={{ padding: '6px 12px', fontSize: '0.85rem' }}
          >
            <option value="all">All Domains</option>
            <option value="quantitative">Quantitative Aptitude</option>
            <option value="logical">Logical Reasoning</option>
            <option value="technical">CS & Technical Core</option>
          </select>
        </div>
      </div>

      {/* Formula Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredFormulas.map(item => (
          <div key={item.id} className="glass-card" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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

              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '10px' }}>{item.title}</h4>

              {/* Highlighted Formula Block */}
              <div style={{
                padding: '12px 14px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                fontWeight: '700',
                color: 'var(--accent-primary)',
                marginBottom: '12px',
                textAlign: 'center'
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
