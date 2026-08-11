import React, { useState } from 'react';
import {
  Sparkles, Code2, UserCheck, Building2, Briefcase, Search,
  ChevronDown, ChevronUp, Copy, Check, Star, CheckCircle2,
  HelpCircle, BookOpen, Flame, Award, Lightbulb, ExternalLink
} from 'lucide-react';
import {
  INTERVIEW_DOMAINS,
  COMPANY_PROFILES,
  INTERVIEW_QUESTIONS
} from '../data/interviewPrepData';

export default function InterviewPrepSection() {
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCards, setExpandedCards] = useState({ 'tech-001': true, 'hr-001': true });
  const [copiedId, setCopiedId] = useState(null);
  const [practiceMode, setPracticeMode] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const toggleExpand = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRevealAnswer = (id) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredQuestions = INTERVIEW_QUESTIONS.filter(q => {
    const matchesDomain = selectedDomain === 'all' || q.category === selectedDomain;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.keyKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  const getDomainIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return <Code2 size={16} />;
      case 'UserCheck': return <UserCheck size={16} />;
      case 'Building2': return <Building2 size={16} />;
      case 'Briefcase': return <Briefcase size={16} />;
      default: return <Sparkles size={16} />;
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>

      {/* Hero Header Banner */}
      <div className="glass-card" style={{
        padding: '32px 28px',
        marginBottom: '28px',
        background: 'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(124,58,237,0.12) 50%, rgba(16,185,129,0.08) 100%)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 12px', borderRadius: 'var(--radius-xs)',
            background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
            fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-primary)',
            marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px'
          }}>
            <Award size={14} /> Placement Interview Preparation Engine
          </div>

          <h1 style={{ fontSize: '2.1rem', fontWeight: '800', lineHeight: '1.25', marginBottom: '12px' }}>
            Crack Technical &amp; HR Placement Interviews
          </h1>

          <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '22px' }}>
            Master technical core concepts (OOPs, DBMS, OS, Computer Networks, System Design), behavioral STAR frameworks, and company-specific selection patterns for TCS, Infosys, Accenture, Wipro, and Amazon.
          </p>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              <CheckCircle2 size={16} color="var(--success)" />
              <span>15+ Core Technical Q&amp;A</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              <Star size={16} color="#f59e0b" />
              <span>STAR Method HR Guide</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              <Building2 size={16} color="var(--accent-primary)" />
              <span>5 Top Hiring Company Drives</span>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Navigation & Search Control Bar */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '16px',
        marginBottom: '28px'
      }}>
        {/* Domain Filter Pills */}
        <div style={{
          display: 'flex', gap: '8px', flexWrap: 'wrap',
          background: 'var(--bg-secondary)', padding: '6px',
          borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)'
        }}>
          {INTERVIEW_DOMAINS.map(domain => {
            const isActive = selectedDomain === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 16px', borderRadius: 'var(--radius-sm)',
                  fontSize: '0.86rem', fontWeight: '600', cursor: 'pointer',
                  border: 'none',
                  background: isActive ? 'var(--bg-card)' : 'transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {getDomainIcon(domain.icon)}
                <span>{domain.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Practice Mode Toggle */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by topic, question, or key concept (e.g., OOPs, ACID, STAR, TCS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '10px 14px 10px 40px',
                background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
                fontSize: '0.88rem', outline: 'none'
              }}
            />
          </div>

          <button
            onClick={() => setPracticeMode(!practiceMode)}
            className={`btn ${practiceMode ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
          >
            <Flame size={16} color={practiceMode ? '#fff' : '#f59e0b'} />
            <span>{practiceMode ? 'Exit Practice Mode' : 'Self-Practice Mode'}</span>
          </button>
        </div>
      </div>

      {/* Company Hiring Drives Section (When selected domain is company_patterns or all) */}
      {(selectedDomain === 'all' || selectedDomain === 'company_patterns') && (
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Building2 size={20} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Company Placement Patterns &amp; Interview Tips</h2>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px'
          }}>
            {COMPANY_PROFILES.map((company, idx) => (
              <div key={idx} className="glass-card" style={{
                padding: '20px', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)', background: 'var(--bg-card)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {company.name}
                    </h3>
                    <span style={{
                      padding: '2px 8px', borderRadius: '4px', background: 'var(--accent-bg)',
                      color: 'var(--accent-primary)', fontSize: '0.72rem', fontWeight: '700'
                    }}>
                      Hiring Drive
                    </span>
                  </div>

                  {/* Rounds Breakdown */}
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Selection Rounds:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {company.rounds.map((round, rIdx) => (
                        <div key={rIdx} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: 'var(--accent-primary)', fontWeight: '800' }}>•</span>
                          <span>{round}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Focus Topics */}
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Core Topics Asked:
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {company.focusTopics.map((topic, tIdx) => (
                        <span key={tIdx} style={{
                          padding: '3px 8px', borderRadius: '4px', background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-secondary)'
                        }}>
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Insider Tip */}
                <div style={{
                  padding: '10px 12px', background: 'var(--info-bg)', borderRadius: 'var(--radius-xs)',
                  border: '1px solid rgba(59,130,246,0.2)', fontSize: '0.8rem', color: 'var(--info)',
                  display: 'flex', gap: '8px', alignItems: 'flex-start'
                }}>
                  <Lightbulb size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Insider Tip:</strong> {company.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Questions List */}
      {selectedDomain !== 'company_patterns' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <HelpCircle size={20} color="var(--accent-primary)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                {practiceMode ? 'Self-Practice Mode Questions' : 'High-Frequency Interview Questions'}
              </h2>
            </div>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              Showing {filteredQuestions.length} Questions
            </span>
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1rem', fontWeight: '600' }}>No interview questions found matching "{searchQuery}".</p>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => { setSearchQuery(''); setSelectedDomain('all'); }}
                style={{ marginTop: '12px' }}
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {filteredQuestions.map((q) => {
                const isExpanded = expandedCards[q.id];
                const isRevealed = revealedAnswers[q.id];

                return (
                  <div key={q.id} className="glass-card" style={{
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}>
                    {/* Question Header Bar */}
                    <div
                      onClick={() => toggleExpand(q.id)}
                      style={{
                        padding: '16px 20px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: '14px', background: isExpanded ? 'var(--bg-secondary)' : 'transparent',
                        borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                        <span style={{
                          padding: '4px 10px', borderRadius: '4px',
                          background: q.category === 'hr_behavioral' ? 'rgba(245,158,11,0.12)' : 'var(--accent-bg)',
                          color: q.category === 'hr_behavioral' ? '#f59e0b' : 'var(--accent-primary)',
                          fontSize: '0.74rem', fontWeight: '700', textTransform: 'uppercase'
                        }}>
                          {q.domain}
                        </span>

                        <span style={{
                          padding: '2px 8px', borderRadius: '4px',
                          background: q.difficulty === 'Hard' ? 'var(--danger-bg)' : q.difficulty === 'Medium' ? 'var(--warning-bg)' : 'var(--success-bg)',
                          color: q.difficulty === 'Hard' ? 'var(--danger)' : q.difficulty === 'Medium' ? 'var(--warning)' : 'var(--success)',
                          fontSize: '0.7rem', fontWeight: '700'
                        }}>
                          {q.difficulty}
                        </span>

                        <h3 style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0, flex: 1 }}>
                          {q.question}
                        </h3>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(q.id, `${q.question}\n\nKey Concept:\n${q.summaryAnswer}\n\nFull Answer:\n${q.fullAnswer}`);
                          }}
                          className="btn btn-outline btn-sm"
                          title="Copy Question & Answer"
                          style={{ padding: '6px' }}
                        >
                          {copiedId === q.id ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                        </button>
                        {isExpanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                      </div>
                    </div>

                    {/* Question Content Body */}
                    {isExpanded && (
                      <div style={{ padding: '20px' }}>

                        {/* Practice Mode Toggle / Reveal Button */}
                        {practiceMode && !isRevealed ? (
                          <div style={{
                            padding: '24px', textAlign: 'center', background: 'var(--bg-secondary)',
                            borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-color)'
                          }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                              Practice your answer mentally or speak aloud before checking the model solution!
                            </p>
                            <button
                              onClick={() => toggleRevealAnswer(q.id)}
                              className="btn btn-primary btn-sm"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            >
                              <BookOpen size={14} /> Reveal Model Answer &amp; Keywords
                            </button>
                          </div>
                        ) : (
                          <>
                            {/* Summary Bullet / Key Concept */}
                            <div style={{
                              padding: '12px 16px', borderRadius: 'var(--radius-xs)',
                              background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
                              fontSize: '0.88rem', color: 'var(--accent-primary)', fontWeight: '600',
                              marginBottom: '16px'
                            }}>
                              💡 <strong>Key Takeaway:</strong> {q.summaryAnswer}
                            </div>

                            {/* Full Model Explanation */}
                            <div style={{
                              fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7',
                              whiteSpace: 'pre-line', marginBottom: '16px'
                            }}>
                              {q.fullAnswer}
                            </div>

                            {/* Optional Code Snippet */}
                            {q.codeSnippet && (
                              <div style={{ marginBottom: '16px' }}>
                                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '6px', textTransform: 'uppercase' }}>
                                  Code Implementation Example:
                                </div>
                                <pre style={{
                                  background: 'var(--bg-secondary)', padding: '14px', borderRadius: 'var(--radius-xs)',
                                  border: '1px solid var(--border-color)', color: 'var(--accent-primary)',
                                  fontFamily: 'monospace', fontSize: '0.82rem', overflowX: 'auto'
                                }}>
                                  {q.codeSnippet}
                                </pre>
                              </div>
                            )}

                            {/* Must-Mention Keywords */}
                            <div>
                              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>
                                Essential Keywords to Mention to Interviewer:
                              </div>
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {q.keyKeywords.map((kw, kwIdx) => (
                                  <span key={kwIdx} style={{
                                    padding: '3px 10px', borderRadius: '12px',
                                    background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                                    fontSize: '0.76rem', fontWeight: '600', color: 'var(--text-primary)'
                                  }}>
                                    ✓ {kw}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
