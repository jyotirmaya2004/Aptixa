import React, { useState, useEffect, useRef } from 'react';
import {
  Mic, MicOff, Volume2, VolumeX, RotateCcw, CheckCircle2, AlertCircle,
  Sparkles, BookOpen, MessageSquare, Award, ArrowRight, Play, RefreshCw,
  Sliders, ShieldCheck, Flame, Bookmark, BookmarkCheck, ChevronRight, HelpCircle, Layers,
  Star, Volume1, Headphones, Zap, Compass, Check
} from 'lucide-react';

import spokenEnglishPayload from '../data/spokenEnglishData.json';

// ── Offline Stored CEFR Sentences Data (Free & Local) ─────────────────────────────────
const CEFR_SENTENCES = spokenEnglishPayload.sentences || [];

// ── AI Conversation Scenarios ────────────────────────────────────────────────
const ROLEPLAY_SCENARIOS = [
  {
    id: 'scenario-1',
    title: 'Software Engineer HR Interview',
    role: 'Senior Hiring Manager',
    initialPrompt: "Welcome to the interview! Could you please introduce yourself and mention your primary technical strengths?",
    suggestedKeywords: ["computer science", "problem solving", "full-stack", "team player"],
    sampleResponses: [
      "Hello, I am a final-year computer science student passionate about full-stack web development and algorithm optimization.",
      "Thank you for having me. My core technical strengths lie in JavaScript, Python, data structures, and database management."
    ]
  },
  {
    id: 'scenario-2',
    title: 'Campus Project Group Discussion',
    role: 'Team Lead',
    initialPrompt: "We need to choose the database architecture for our final project. What is your opinion between SQL and NoSQL?",
    suggestedKeywords: ["relational database", "scalability", "ACID compliance", "schema flexibility"],
    sampleResponses: [
      "I recommend PostgreSQL because relational databases ensure ACID compliance and structured data consistency for user accounts.",
      "MongoDB would be ideal if we plan to scale rapidly with unstructured JSON documents and dynamic schemas."
    ]
  },
  {
    id: 'scenario-3',
    title: 'Campus Placement GD (Group Discussion)',
    role: 'GD Moderator',
    initialPrompt: "The topic for today's discussion is: 'Is Artificial Intelligence replacing human jobs or enhancing productivity?' Please share your perspective.",
    suggestedKeywords: ["automation", "enhancement", "reskilling", "innovation"],
    sampleResponses: [
      "In my view, AI acts as a force multiplier that automates repetitive tasks, allowing professionals to focus on creative problem-solving.",
      "While AI automates legacy workflows, it simultaneously creates new engineering roles in AI governance and prompt engineering."
    ]
  }
];

export default function SpokenEnglishSection() {
  // ── Section State ──────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('sentences'); // 'sentences' | 'dictation' | 'scenarios' | 'saved'
  const [activeLevelFilter, setActiveLevelFilter] = useState('All'); // 'All' | 'Beginner A2' | 'Intermediate B1' | 'Advanced B2' | 'Advanced C1' | 'Advanced C2'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAccent, setSelectedAccent] = useState('en-US'); // 'en-US' | 'en-GB' | 'en-IN'
  const [speechRate, setSpeechRate] = useState(1.0); // 0.75 | 1.0 | 1.25
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Gamification State (Persisted in localStorage)
  const [xpPoints, setXpPoints] = useState(() => {
    return parseInt(localStorage.getItem('aptixa-english-xp') || '125', 10);
  });
  const [streakCount, setStreakCount] = useState(() => {
    return parseInt(localStorage.getItem('aptixa-english-streak') || '3', 10);
  });

  // Recording & Evaluation State
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [manualText, setManualText] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [weakSentences, setWeakSentences] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('aptixa-spoken-english-weak-bank') || '[]');
    } catch (_) { return []; }
  });

  // Scenario Mode State
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([
    { sender: 'ai', text: ROLEPLAY_SCENARIOS[0].initialPrompt }
  ]);
  const [scenarioInput, setScenarioInput] = useState('');
  const [scenarioEval, setScenarioEval] = useState(null);

  // Speech Recognition Ref
  const recognitionRef = useRef(null);

  // Filtered Sentences
  const filteredSentences = activeLevelFilter === 'All'
    ? CEFR_SENTENCES
    : CEFR_SENTENCES.filter(s => s.level.toLowerCase().includes(activeLevelFilter.toLowerCase().split(' ')[0]));

  const currentSentence = filteredSentences[currentIndex % (filteredSentences.length || 1)] || CEFR_SENTENCES[0];
  const currentScenario = ROLEPLAY_SCENARIOS[activeScenarioIndex];

  // ── TTS Engine ─────────────────────────────────────────────────────────────
  const speakText = (textToSpeak) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-Speech is not supported in your browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = speechRate;
    utterance.lang = selectedAccent;

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang === selectedAccent || v.lang.startsWith(selectedAccent.split('-')[0]));
    if (matchedVoice) utterance.voice = matchedVoice;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  // ── STT Engine (Speech Recognition) ───────────────────────────────────────
  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Web Speech STT API is not supported in this browser. You can type your spoken sentence manually below to evaluate!");
      setIsRecording(false);
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = selectedAccent;

      rec.onstart = () => {
        setIsRecording(true);
        setTranscript('');
      };

      rec.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        setManualText(currentTranscript);
      };

      rec.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (err) {
      console.warn("Failed to start speech recognition:", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_) {}
    }
    setIsRecording(false);
  };

  // ── Sentence Evaluation Engine ─────────────────────────────────────────────
  const evaluateSentence = (userSpeech) => {
    if (!userSpeech || !userSpeech.trim()) {
      alert("Please record audio or type a spoken sentence first.");
      return;
    }

    const expectedClean = currentSentence.text.toLowerCase().replace(/[^\w\s]/g, '');
    const userClean     = userSpeech.toLowerCase().replace(/[^\w\s]/g, '');

    const expectedTokens = expectedClean.split(/\s+/).filter(Boolean);
    const userTokens     = userClean.split(/\s+/).filter(Boolean);

    let matches = 0;
    const diff = [];
    const userTokenSet = new Set(userTokens);

    expectedTokens.forEach((eTok) => {
      if (userTokenSet.has(eTok)) {
        matches++;
        diff.push({ word: eTok, status: 'correct' });
      } else {
        diff.push({ word: eTok, status: 'missing' });
      }
    });

    const expectedTokenSet = new Set(expectedTokens);
    userTokens.forEach((uTok) => {
      if (!expectedTokenSet.has(uTok)) {
        diff.push({ word: uTok, status: 'extra' });
      }
    });

    const accuracyScore = Math.max(0, Math.round((matches / expectedTokens.length) * 100));

    let grammarScore = 100;
    const grammarNotes = [];

    currentSentence.targetWords.forEach(tw => {
      const twClean = tw.toLowerCase();
      if (!userClean.includes(twClean)) {
        grammarScore -= 15;
        grammarNotes.push(`Missed target grammar phrase: "${tw}"`);
      }
    });
    grammarScore = Math.max(40, grammarScore);

    const fluencyScore     = Math.min(100, Math.max(60, accuracyScore + (userTokens.length >= expectedTokens.length ? 10 : -10)));
    const pronunciationScore = Math.min(100, Math.max(50, accuracyScore + 5));
    const overallScore     = Math.round((accuracyScore * 0.4) + (grammarScore * 0.3) + (pronunciationScore * 0.2) + (fluencyScore * 0.1));

    const evalResult = {
      overallScore,
      accuracyScore,
      grammarScore,
      fluencyScore,
      pronunciationScore,
      diff,
      grammarNotes,
      spokenText: userSpeech,
      expectedText: currentSentence.text,
      timestamp: new Date().toLocaleTimeString()
    };

    setEvaluation(evalResult);

    // Award +25 XP
    const newXp = xpPoints + 25;
    setXpPoints(newXp);
    localStorage.setItem('aptixa-english-xp', newXp.toString());

    if (overallScore < 80) {
      if (!weakSentences.some(s => s.id === currentSentence.id)) {
        const updatedWeak = [...weakSentences, currentSentence];
        setWeakSentences(updatedWeak);
        localStorage.setItem('aptixa-spoken-english-weak-bank', JSON.stringify(updatedWeak));
      }
    }
  };

  const submitScenarioTurn = () => {
    const textToEval = scenarioInput || transcript;
    if (!textToEval.trim()) return;

    const userMsg = { sender: 'user', text: textToEval };
    const textClean = textToEval.toLowerCase();

    const matchedKws = currentScenario.suggestedKeywords.filter(kw => textClean.includes(kw.toLowerCase()));
    const score = Math.min(100, Math.round(50 + (matchedKws.length * 15) + (textToEval.split(' ').length * 2)));

    let aiReply = "That is a well-structured response! Your answer demonstrates clarity and professional tone.";
    if (matchedKws.length === 0) {
      aiReply = `Good effort! To make your answer stronger in an interview, try incorporating technical keywords such as: ${currentScenario.suggestedKeywords.join(', ')}.`;
    }

    const aiMsg = { sender: 'ai', text: aiReply };

    setConversationHistory(prev => [...prev, userMsg, aiMsg]);
    setScenarioEval({
      score,
      matchedKws,
      feedback: score >= 80 ? 'Excellent professional response!' : 'Solid answer. Add domain terminology to improve fluency score.'
    });
    setScenarioInput('');
    setTranscript('');
  };

  const handleToggleBookmark = (sen) => {
    const exists = weakSentences.some(s => s.id === sen.id);
    let updated;
    if (exists) {
      updated = weakSentences.filter(s => s.id !== sen.id);
    } else {
      updated = [...weakSentences, sen];
    }
    setWeakSentences(updated);
    localStorage.setItem('aptixa-spoken-english-weak-bank', JSON.stringify(updated));
  };

  const progressPercent = Math.round(((currentIndex + 1) / (filteredSentences.length || 1)) * 100);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px 60px' }}>

      {/* ── Top Gamified Header Bar (Duolingo Style) ─────────────────────────── */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)', padding: '16px 24px', marginBottom: '24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
          }}>
            <Headphones size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Spoken English Learning Lab
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Master Pronunciation, Listening &amp; Interview Speaking
            </div>
          </div>
        </div>

        {/* XP & Streak Counters */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
            background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: 'var(--radius-md)', color: '#f59e0b', fontWeight: 700, fontSize: '0.88rem'
          }}>
            <Flame size={18} fill="#f59e0b" /> {streakCount} Day Streak
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
            background: 'rgba(124, 58, 237, 0.12)', border: '1px solid rgba(124, 58, 237, 0.25)',
            borderRadius: 'var(--radius-md)', color: '#8b5cf6', fontWeight: 700, fontSize: '0.88rem'
          }}>
            <Star size={18} fill="#8b5cf6" /> {xpPoints} XP
          </div>
        </div>
      </div>

      {/* ── Mode Selection Pills Bar ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        {[
          { id: 'sentences', label: '🎯 Speaking & Pronunciation', icon: Volume2 },
          { id: 'dictation', label: '🎧 Listening Dictation', icon: BookOpen },
          { id: 'scenarios', label: '💬 AI Interview Roleplay', icon: MessageSquare },
          { id: 'saved', label: `🔖 Saved Weak Sentences (${weakSentences.length})`, icon: Bookmark }
        ].map(t => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => { setActiveTab(t.id); setEvaluation(null); }}
              style={{
                padding: '10px 18px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                fontWeight: 700,
                border: isActive ? 'none' : '1px solid var(--border-color)',
                background: isActive ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 12px rgba(37,99,235,0.25)' : 'none'
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ── TAB 1 & 2: SPEAKING & DICTATION LESSON CARDS ─────────────────────── */}
      {(activeTab === 'sentences' || activeTab === 'dictation') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Level Filter Pills & Progress Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => { setActiveLevelFilter(lvl); setCurrentIndex(0); setEvaluation(null); }}
                  style={{
                    padding: '5px 12px', borderRadius: 'var(--radius-xs)', fontSize: '0.8rem', fontWeight: 600,
                    border: activeLevelFilter === lvl ? 'none' : '1px solid var(--border-color)',
                    background: activeLevelFilter === lvl ? 'var(--text-primary)' : 'var(--bg-secondary)',
                    color: activeLevelFilter === lvl ? 'var(--bg-card)' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Lesson Step Progress */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '220px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                Step {currentIndex + 1} / {filteredSentences.length}
              </div>
              <div style={{ flexGrow: 1, height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #2563eb, #10b981)', transition: 'width 0.3s ease' }} />
              </div>
            </div>
          </div>

          {/* Main Interactive Card */}
          <div className="glass-card" style={{ padding: '32px 28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            
            {/* Topic Badges */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="badge badge-info" style={{ fontSize: '0.8rem', fontWeight: 700 }}>{currentSentence.level}</span>
                <span className="badge badge-warning" style={{ fontSize: '0.8rem', fontWeight: 700 }}>{currentSentence.topic}</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Accent:
                  <select
                    value={selectedAccent}
                    onChange={(e) => setSelectedAccent(e.target.value)}
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '2px 6px', fontSize: '0.8rem', outline: 'none' }}
                  >
                    <option value="en-US">🇺🇸 US</option>
                    <option value="en-GB">🇬🇧 UK</option>
                    <option value="en-IN">🇮🇳 Indian</option>
                  </select>
                </div>

                <button
                  onClick={() => handleToggleBookmark(currentSentence)}
                  title="Save to Weak Sentences Retry Bank"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: weakSentences.some(s => s.id === currentSentence.id) ? '#8b5cf6' : 'var(--text-muted)' }}
                >
                  {weakSentences.some(s => s.id === currentSentence.id) ? <BookmarkCheck size={22} /> : <Bookmark size={22} />}
                </button>
              </div>
            </div>

            {/* Big Readable Sentence Display */}
            <div style={{
              background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)', padding: '28px 24px', marginBottom: '24px', textAlign: 'center'
            }}>
              {activeTab === 'dictation' ? (
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    🎧 Dictation Mode: Listen to the audio &amp; speak what you hear!
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    (Sentence text is hidden to train active listening comprehension)
                  </p>
                </div>
              ) : (
                <div>
                  <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: '1.5', margin: 0, letterSpacing: '-0.01em' }}>
                    "{currentSentence.text}"
                  </h2>
                </div>
              )}

              {/* TTS Listen Controls */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
                <button
                  onClick={() => speakText(currentSentence.text)}
                  style={{
                    padding: '12px 24px', borderRadius: 'var(--radius-md)',
                    background: 'var(--accent-primary)', color: '#ffffff', border: 'none',
                    fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
                    transition: 'transform 0.1s ease'
                  }}
                >
                  <Volume2 size={20} className={isPlayingAudio ? 'spin' : ''} />
                  {isPlayingAudio ? 'Playing Pronunciation...' : 'Listen to Target Audio'}
                </button>
              </div>
            </div>

            {/* Grammar & Collocation Helper Card */}
            {activeTab !== 'dictation' && (
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '24px', fontSize: '0.86rem' }}>
                <div style={{ flex: '1', minWidth: '260px', background: 'rgba(59, 130, 246, 0.08)', padding: '10px 14px', borderRadius: 'var(--radius-xs)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                  <strong style={{ color: 'var(--accent-primary)' }}>💡 Grammar Rule:</strong> {currentSentence.hint}
                </div>
                <div style={{ flex: '1', minWidth: '260px', background: 'rgba(16, 185, 129, 0.08)', padding: '10px 14px', borderRadius: 'var(--radius-xs)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <strong style={{ color: '#10b981' }}>🔗 Key Collocations:</strong> {currentSentence.collocations.join(' • ')}
                </div>
              </div>
            )}

            {/* Speech Recorder & Controls */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    style={{
                      width: '60px', height: '60px', borderRadius: '50%',
                      background: isRecording ? '#ef4444' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                      color: '#ffffff', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: isRecording ? '0 0 20px rgba(239, 68, 68, 0.6)' : '0 6px 18px rgba(37,99,235,0.35)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isRecording ? <MicOff size={26} /> : <Mic size={26} />}
                  </button>

                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {isRecording ? '🔴 Listening... Speak clearly now' : 'Click Big Mic Button to Record Speech'}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      STT Engine evaluates accuracy, spoken grammar, and pronunciation.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => evaluateSentence(manualText || transcript)}
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px' }}
                  >
                    <CheckCircle2 size={18} /> Evaluate My Speech
                  </button>
                  <button
                    onClick={() => {
                      setTranscript('');
                      setManualText('');
                      setEvaluation(null);
                      setCurrentIndex((currentIndex + 1) % filteredSentences.length);
                    }}
                    className="btn btn-secondary"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    Next Lesson <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Editable Speech Transcript */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Recorded Speech Transcript (or type manually):
                </div>
                <textarea
                  rows={2}
                  value={manualText || transcript}
                  onChange={(e) => setManualText(e.target.value)}
                  placeholder="Your spoken words will appear here live when recording..."
                  style={{
                    width: '100%', background: 'transparent', border: 'none', outline: 'none',
                    color: 'var(--text-primary)', fontSize: '0.95rem', resize: 'vertical'
                  }}
                />
              </div>
            </div>

            {/* Evaluation Scorecard & Word-by-Word Audio Pronouncer */}
            {evaluation && (
              <div style={{
                marginTop: '28px', padding: '24px', background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Speech Evaluation Scorecard</span>
                    <h3 style={{ margin: '4px 0 0 0', fontSize: '1.5rem', fontWeight: 800, color: evaluation.overallScore >= 80 ? '#10b981' : evaluation.overallScore >= 60 ? '#f59e0b' : '#ef4444' }}>
                      Overall Score: {evaluation.overallScore} / 100 (+25 XP Earned! ⭐)
                    </h3>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <div style={{ background: 'var(--bg-card)', padding: '8px 14px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Accuracy</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{evaluation.accuracyScore}%</div>
                    </div>
                    <div style={{ background: 'var(--bg-card)', padding: '8px 14px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Grammar</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#10b981' }}>{evaluation.grammarScore}%</div>
                    </div>
                    <div style={{ background: 'var(--bg-card)', padding: '8px 14px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Fluency</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#8b5cf6' }}>{evaluation.fluencyScore}%</div>
                    </div>
                  </div>
                </div>

                {/* Interactive Word Pronunciation Helper */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                    Word-by-Word Diff (Click any word tile to hear native pronunciation! 🔊):
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '14px', background: 'var(--bg-card)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-color)' }}>
                    {evaluation.diff.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => speakText(item.word)}
                        title={`Click to listen to "${item.word}" pronunciation`}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.88rem',
                          fontWeight: 700,
                          border: 'none',
                          cursor: 'pointer',
                          background: item.status === 'correct' ? 'rgba(16, 185, 129, 0.15)' : item.status === 'missing' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                          color: item.status === 'correct' ? '#10b981' : item.status === 'missing' ? '#ef4444' : '#f59e0b',
                          textDecoration: item.status === 'missing' ? 'line-through' : 'none',
                          display: 'inline-flex', alignItems: 'center', gap: '4px'
                        }}
                      >
                        <Volume1 size={13} /> {item.word} {item.status === 'missing' && '(missing)'} {item.status === 'extra' && '(extra)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grammar Warnings */}
                {evaluation.grammarNotes.length > 0 && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.08)', padding: '12px 16px', borderRadius: 'var(--radius-xs)', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.85rem', color: '#ef4444' }}>
                    <strong>⚠️ Spoken Grammar Alerts:</strong>
                    <ul style={{ margin: '4px 0 0 18px', padding: 0 }}>
                      {evaluation.grammarNotes.map((note, i) => (
                        <li key={i}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* ── TAB 3: AI SCENARIO ROLEPLAY ────────────────────────────────────────── */}
      {activeTab === 'scenarios' && (
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px' }}>
          
          <div className="glass-card" style={{ padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="var(--accent-primary)" /> Select Interview Scenario
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {ROLEPLAY_SCENARIOS.map((sc, i) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    setActiveScenarioIndex(i);
                    setConversationHistory([{ sender: 'ai', text: sc.initialPrompt }]);
                    setScenarioEval(null);
                  }}
                  style={{
                    padding: '14px', borderRadius: 'var(--radius-md)', textAlign: 'left',
                    background: activeScenarioIndex === i ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-secondary)',
                    border: activeScenarioIndex === i ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {sc.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Role: {sc.role}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', minHeight: '500px' }}>
            
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '18px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{currentScenario.title}</h2>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Recommended Interview Terminology: {currentScenario.suggestedKeywords.join(' • ')}
              </div>
            </div>

            <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {conversationHistory.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    background: msg.sender === 'user' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                    color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                    border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                    fontSize: '0.92rem', lineHeight: '1.5'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, opacity: 0.8, marginBottom: '4px' }}>
                    {msg.sender === 'user' ? 'You (Candidate)' : currentScenario.role}
                  </div>
                  {msg.text}
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  style={{
                    padding: '10px 16px', borderRadius: 'var(--radius-md)',
                    background: isRecording ? '#ef4444' : 'var(--accent-primary)',
                    color: '#ffffff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700
                  }}
                >
                  <Mic size={18} /> {isRecording ? 'Stop' : 'Speak'}
                </button>

                <input
                  type="text"
                  value={scenarioInput || transcript}
                  onChange={(e) => setScenarioInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitScenarioTurn()}
                  placeholder="Type or record your response..."
                  style={{
                    flexGrow: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)', padding: '10px 14px', color: 'var(--text-primary)', outline: 'none'
                  }}
                />

                <button
                  onClick={submitScenarioTurn}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  Send <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── TAB 4: WEAK SENTENCES RETRY BANK ──────────────────────────────────── */}
      {activeTab === 'saved' && (
        <div className="glass-card" style={{ padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bookmark color="#8b5cf6" size={24} /> Weak Sentences Retry Bank
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '24px' }}>
            Sentences saved automatically when evaluation accuracy drops below 80%. Practice them repeatedly to achieve mastery.
          </p>

          {weakSentences.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              No weak sentences saved yet! Perfect your speech on the practice tabs.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {weakSentences.map((sen, idx) => (
                <div
                  key={sen.id}
                  style={{
                    background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                      <span className="badge badge-warning" style={{ fontSize: '0.75rem' }}>{sen.topic}</span>
                      <span className="badge badge-info" style={{ fontSize: '0.75rem' }}>{sen.level}</span>
                    </div>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)' }}>"{sen.text}"</h4>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => speakText(sen.text)}
                      className="btn btn-secondary btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Volume2 size={15} /> Listen
                    </button>
                    <button
                      onClick={() => handleToggleBookmark(sen)}
                      className="btn btn-secondary btn-sm"
                      style={{ color: '#ef4444' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
