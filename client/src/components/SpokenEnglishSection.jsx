import React, { useState, useRef } from 'react';
import {
  Mic, MicOff, Volume2, ArrowRight, RefreshCw, ChevronRight, Bookmark, BookmarkCheck, Volume1, Shuffle
} from 'lucide-react';

import spokenEnglishPayload from '../data/spokenEnglishData.json';

const SENTENCES = spokenEnglishPayload.sentences || [];

export default function SpokenEnglishSection() {
  const [activeTab, setActiveTab] = useState('sentences'); // 'sentences' | 'dictation' | 'saved'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAccent, setSelectedAccent] = useState('en-US'); // 'en-US' | 'en-GB' | 'en-IN'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Speech & Evaluation State
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [manualText, setManualText] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  
  const [weakSentences, setWeakSentences] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('aptixa-spoken-english-weak-bank') || '[]');
    } catch (_) { return []; }
  });

  const recognitionRef = useRef(null);
  const currentSentence = SENTENCES[currentIndex % (SENTENCES.length || 1)] || SENTENCES[0];

  // ── TTS Audio Speaker ──────────────────────────────────────────────────────
  const speakText = (textToSpeak) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-Speech is not supported in your browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.lang = selectedAccent;

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang === selectedAccent || v.lang.startsWith(selectedAccent.split('-')[0]));
    if (matchedVoice) utterance.voice = matchedVoice;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  // ── STT Microphone Recorder ────────────────────────────────────────────────
  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Web Speech API is not supported in this browser. You can type your spoken sentence manually below to evaluate!");
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

      rec.onerror = () => setIsRecording(false);
      rec.onend = () => setIsRecording(false);

      recognitionRef.current = rec;
      rec.start();
    } catch (err) {
      console.warn("Speech recording error:", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_) {}
    }
    setIsRecording(false);
  };

  // ── Word Diff Alignment Evaluator (NO Scorecard) ───────────────────────────
  const evaluateSpeech = (userSpeech) => {
    if (!userSpeech || !userSpeech.trim()) {
      alert("Please record audio or type a spoken sentence first.");
      return;
    }

    const expectedClean = currentSentence.text.toLowerCase().replace(/[^\w\s]/g, '');
    const userClean     = userSpeech.toLowerCase().replace(/[^\w\s]/g, '');

    const expectedTokens = expectedClean.split(/\s+/).filter(Boolean);
    const userTokens     = userClean.split(/\s+/).filter(Boolean);

    const diff = [];
    const userTokenSet = new Set(userTokens);

    expectedTokens.forEach((eTok) => {
      if (userTokenSet.has(eTok)) {
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

    setEvaluation({
      diff,
      spokenText: userSpeech,
      expectedText: currentSentence.text
    });
  };

  const handleNextSentence = () => {
    setTranscript('');
    setManualText('');
    setEvaluation(null);
    setCurrentIndex((prev) => (prev + 1) % SENTENCES.length);
  };

  const handleRandomSentence = () => {
    setTranscript('');
    setManualText('');
    setEvaluation(null);
    const rand = Math.floor(Math.random() * SENTENCES.length);
    setCurrentIndex(rand);
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

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '16px 12px 60px' }}>

      {/* ── Compact Navigation Tabs ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { id: 'sentences', label: '🗣️ Spoken Practice' },
          { id: 'dictation', label: '🎧 Dictation Practice' },
          { id: 'saved', label: `🔖 Saved Sentences (${weakSentences.length})` }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => { setActiveTab(t.id); setEvaluation(null); }}
            style={{
              padding: '8px 14px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: '700',
              border: activeTab === t.id ? 'none' : '1px solid var(--border-color)',
              background: activeTab === t.id ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              color: activeTab === t.id ? '#ffffff' : 'var(--text-secondary)',
              cursor: 'pointer',
              flex: '1 1 auto',
              textAlign: 'center'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── PRACTICE MODE: SENTENCES / DICTATION ───────────────────────────── */}
      {(activeTab === 'sentences' || activeTab === 'dictation') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Main Mobile Card */}
          <div className="glass-card" style={{ padding: '20px 16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            
            {/* Top Bar Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span className="badge badge-info" style={{ fontSize: '0.75rem', fontWeight: 700 }}>{currentSentence.topic}</span>
                <span className="badge badge-warning" style={{ fontSize: '0.75rem', fontWeight: 700 }}>{currentSentence.level}</span>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <select
                  value={selectedAccent}
                  onChange={(e) => setSelectedAccent(e.target.value)}
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '3px 6px', fontSize: '0.75rem', outline: 'none' }}
                >
                  <option value="en-US">🇺🇸 US</option>
                  <option value="en-GB">🇬🇧 UK</option>
                  <option value="en-IN">🇮🇳 Indian</option>
                </select>

                <button
                  onClick={() => handleToggleBookmark(currentSentence)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: weakSentences.some(s => s.id === currentSentence.id) ? '#8b5cf6' : 'var(--text-muted)', padding: '2px' }}
                >
                  {weakSentences.some(s => s.id === currentSentence.id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                </button>
              </div>
            </div>

            {/* Target Sentence Display */}
            <div style={{
              background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)', padding: '20px 16px', marginBottom: '18px', textAlign: 'center'
            }}>
              {activeTab === 'dictation' ? (
                <div>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    🎧 Listen to the audio and speak what you hear!
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                    (Sentence text is hidden for listening dictation)
                  </p>
                </div>
              ) : (
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: '1.4', margin: 0 }}>
                  "{currentSentence.text}"
                </h2>
              )}

              {/* Listen Audio Button */}
              <button
                onClick={() => speakText(currentSentence.text)}
                style={{
                  marginTop: '14px', padding: '10px 20px', borderRadius: '20px',
                  background: 'var(--accent-primary)', color: '#ffffff', border: 'none',
                  fontWeight: 700, fontSize: '0.86rem', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(37,99,235,0.25)'
                }}
              >
                <Volume2 size={18} className={isPlayingAudio ? 'spin' : ''} />
                {isPlayingAudio ? 'Speaking...' : 'Listen Audio'}
              </button>
            </div>

            {/* Micro Controls & Input */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              
              {/* Mic & Buttons Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  style={{
                    width: '50px', height: '50px', borderRadius: '50%',
                    background: isRecording ? '#ef4444' : 'var(--accent-primary)',
                    color: '#ffffff', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isRecording ? '0 0 16px rgba(239, 68, 68, 0.5)' : '0 4px 12px rgba(37,99,235,0.3)',
                    flexShrink: 0
                  }}
                >
                  {isRecording ? <MicOff size={22} /> : <Mic size={22} />}
                </button>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', flexGrow: 1, justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => evaluateSpeech(manualText || transcript)}
                    className="btn btn-primary btn-sm"
                    style={{ fontWeight: 700 }}
                  >
                    Evaluate Speech
                  </button>

                  <button
                    onClick={handleRandomSentence}
                    className="btn btn-secondary btn-sm"
                    title="Random Sentence"
                    style={{ padding: '6px 10px' }}
                  >
                    <Shuffle size={14} />
                  </button>

                  <button
                    onClick={handleNextSentence}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '6px 10px' }}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>

              </div>

              {/* Textarea Input */}
              <textarea
                rows={2}
                value={manualText || transcript}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="Recorded spoken words appear here live, or type manually..."
                style={{
                  width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)', padding: '10px 12px', color: 'var(--text-primary)',
                  fontSize: '0.9rem', outline: 'none', resize: 'none'
                }}
              />

            </div>

            {/* Speech Word Diff Feedback (NO Scorecard) */}
            {evaluation && (
              <div style={{
                marginTop: '20px', padding: '16px', background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
                  Word Alignment Feedback (Click word to hear pronunciation 🔊):
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {evaluation.diff.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => speakText(item.word)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        background: item.status === 'correct' ? 'rgba(16, 185, 129, 0.15)' : item.status === 'missing' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: item.status === 'correct' ? '#10b981' : item.status === 'missing' ? '#ef4444' : '#f59e0b',
                        textDecoration: item.status === 'missing' ? 'line-through' : 'none',
                        display: 'inline-flex', alignItems: 'center', gap: '4px'
                      }}
                    >
                      <Volume1 size={12} /> {item.word} {item.status === 'missing' && '(missing)'} {item.status === 'extra' && '(extra)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* ── SAVED SENTENCES RETRY BANK ───────────────────────────────────────── */}
      {activeTab === 'saved' && (
        <div className="glass-card" style={{ padding: '20px 16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px' }}>
            🔖 Saved Sentences Bank
          </h3>

          {weakSentences.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              No sentences saved yet! Bookmark sentences while practicing to review them here.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {weakSentences.map((sen) => (
                <div
                  key={sen.id}
                  style={{
                    background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px'
                  }}
                >
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '2px' }}>{sen.topic}</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>"{sen.text}"</div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => speakText(sen.text)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 8px' }}
                    >
                      <Volume2 size={14} /> Listen
                    </button>
                    <button
                      onClick={() => handleToggleBookmark(sen)}
                      className="btn btn-secondary btn-sm"
                      style={{ color: '#ef4444', padding: '4px 8px' }}
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
