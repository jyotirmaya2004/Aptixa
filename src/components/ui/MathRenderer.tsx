import React, { useMemo } from 'react';
import katex from 'katex';

export interface MathRendererProps {
  text: string;
  className?: string;
  inline?: boolean;
}

/**
 * Normalizes natural mathematical symbols into valid LaTeX syntax
 */
function naturalMathToLatex(expr: string): string {
  let s = expr.trim();

  // Mixed fractions: 2 1/6 -> 2\frac{1}{6}
  s = s.replace(/\b(\d+)\s+(\d+)\/(\d+)\b/g, '$1\\frac{$2}{$3}');

  // Simple numeric fractions: 4/9 -> \frac{4}{9}
  s = s.replace(/\b(\d+)\/(\d+)\b/g, '\\frac{$1}{$2}');

  // Square root with parentheses: √(x / (3 - x)) -> \sqrt{\frac{x}{3-x}}
  s = s.replace(/√\(([^)]+)\)/g, (_match, inner) => {
    const frac = inner.replace(/\s*\/\s*/g, '}{');
    if (frac !== inner) return `\\sqrt{\\frac{${frac}}}`;
    return `\\sqrt{${inner}}`;
  });

  // Square root of single alphanumeric token: √50 -> \sqrt{50}, √2 -> \sqrt{2}
  s = s.replace(/√([0-9a-zA-Z]+)/g, '\\sqrt{$1}');

  // Multi-digit or single superscripts: 13²⁰⁰³ -> 13^{2003}, 10³ -> 10^{3}
  s = s.replace(/([0-9a-zA-Z]+)([²³⁴⁵⁰¹]+)/g, (_match, base, sup) => {
    const digitMap: Record<string, string> = {
      '⁰': '0',
      '¹': '1',
      '²': '2',
      '³': '3',
      '⁴': '4',
      '⁵': '5',
    };
    const converted = (sup as string)
      .split('')
      .map((c) => digitMap[c] || c)
      .join('');
    return `${base}^{${converted}}`;
  });

  // Individual unicode superscripts
  s = s
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/⁴/g, '^4')
    .replace(/⁵/g, '^5')
    .replace(/⁰/g, '^0')
    .replace(/¹/g, '^1');

  // Subscripts
  s = s.replace(/₁/g, '_1').replace(/₂/g, '_2').replace(/₃/g, '_3');

  // Mathematical operators & Greek symbols
  s = s
    .replace(/×/g, '\\times ')
    .replace(/÷/g, '\\div ')
    .replace(/≠/g, '\\neq ')
    .replace(/≤/g, '\\le ')
    .replace(/≥/g, '\\ge ')
    .replace(/±/g, '\\pm ')
    .replace(/π/g, '\\pi ')
    .replace(/–/g, '-');

  return s;
}

/**
 * Determines if an entire string is a standalone mathematical expression
 */
function isStandaloneMath(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;

  // Fraction like 4/9 or mixed 2 1/6
  if (/^\d+\s+\d+\/\d+$/.test(trimmed) || /^\d+\/\d+$/.test(trimmed)) {
    return true;
  }

  // Pure root like √50 or √2
  if (/^√[0-9a-zA-Z]+(\s*[×÷+\-–*/]\s*√[0-9a-zA-Z]+)*(\s*=\s*\?)?$/.test(trimmed)) {
    return true;
  }

  // Pure polynomial or equation: 10³x + 10²y + 10z + w or a² – b² = 19
  if (
    /^[0-9a-zA-Z\s+\-–*/×÷=≠≤≥±√^²³⁴⁵⁰¹().,:?]+$/.test(trimmed) &&
    /[=+\-–*×÷√^²³⁴⁵_]/.test(trimmed) &&
    !/\b(is|the|are|which|following|number|digits|then|what|when|from|value|greater|less|both|divisible|cannot|equal|true|false|and|or|of)\b/i.test(
      trimmed
    )
  ) {
    return true;
  }

  return false;
}

/**
 * Renders mathematical expressions, formulas, and mixed mathematical text
 * using KaTeX with textbook-quality typography and zero layout shifts.
 */
export function MathRenderer({ text, className = '', inline = true }: MathRendererProps) {
  const renderedHtml = useMemo(() => {
    if (!text) return '';

    try {
      // 1. Explicit LaTeX syntax ($...$ or $$...$$)
      if (text.includes('$')) {
        return text.replace(/\$\$([^$]+)\$\$/g, (_m, expr) => {
          try {
            return katex.renderToString(expr, { throwOnError: false, displayMode: true });
          } catch {
            return expr;
          }
        }).replace(/\$([^$]+)\$/g, (_m, expr) => {
          try {
            return katex.renderToString(expr, { throwOnError: false, displayMode: false });
          } catch {
            return expr;
          }
        });
      }

      // 2. Standalone math expression (e.g. option choices, standalone equations)
      if (isStandaloneMath(text)) {
        const latex = naturalMathToLatex(text);
        return katex.renderToString(latex, { throwOnError: false, displayMode: !inline });
      }

      // 3. Mixed text: identify inline equations, roots, powers, and fractions within sentence
      // Matches equations (e.g. a² + b² = 19), roots (√2), and standalone fractions (4/9)
      const mathPattern =
        /([a-zA-Z0-9²³⁴⁵¹⁰()√+\-–×÷/=≠≤≥]+\s*=\s*[a-zA-Z0-9²³⁴⁵¹⁰()√+\-–×÷/.,:?]+|√\([^)]{2,}\)|√[0-9a-zA-Z]+|\b\d+\s+\d+\/\d+\b|\b\d+\/\d+\b|[a-zA-Z0-9]+[²³⁴⁵⁰¹]+)/g;

      return text.replace(mathPattern, (match) => {
        // Skip pure english words
        if (/^[a-zA-Z]+$/.test(match)) return match;

        try {
          const latex = naturalMathToLatex(match);
          return katex.renderToString(latex, { throwOnError: false, displayMode: false });
        } catch {
          return match;
        }
      });
    } catch {
      return text;
    }
  }, [text, inline]);

  if (!renderedHtml) {
    return null;
  }

  return (
    <span
      className={className}
      aria-label={text}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
