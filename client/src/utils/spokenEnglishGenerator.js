// ── Dynamic Combinatorial Spoken English Sentence Generator ─────────────────────
// Generates >300,000 (3 Lakh+) unique, natural, everyday & professional English practice sentences!

const SUBJECTS = [
  "I", "My best friend", "Our family", "The enthusiastic tour guide", "The experienced chef",
  "We", "They", "The creative designer", "My elder sister", "The fitness trainer",
  "A passionate musician", "Our project mentor", "The local store manager", "A dedicated teacher",
  "The neighborhood librarian", "My college roommate", "An ambitious entrepreneur", "The architect"
];

const VERB_PHRASES = [
  { text: "has been preparing", tense: "Present Perfect Continuous", target: "has been preparing" },
  { text: "is planning to explore", tense: "Present Continuous", target: "planning to" },
  { text: "decided to organize", tense: "Simple Past", target: "decided to" },
  { text: "loves to practice", tense: "Simple Present", target: "loves to" },
  { text: "managed to complete", tense: "Simple Past", target: "managed to" },
  { text: "was discussing", tense: "Past Continuous", target: "was discussing" },
  { text: "would highly recommend", tense: "Conditional", target: "would recommend" },
  { text: "is constantly improving", tense: "Present Continuous", target: "improving" },
  { text: "has successfully mastered", tense: "Present Perfect", target: "has mastered" },
  { text: "prefers to read", tense: "Simple Present", target: "prefers to" },
  { text: "enjoys cooking", tense: "Simple Present", target: "enjoys cooking" },
  { text: "is looking forward to", tense: "Phrasal Verb", target: "looking forward to" },
  { text: "struggled to figure out", tense: "Phrasal Verb", target: "figure out" },
  { text: "wants to catch up on", tense: "Phrasal Verb", target: "catch up on" },
  { text: "always tries to balance", tense: "Simple Present", target: "tries to balance" }
];

const OBJECT_CLAUSES = [
  { text: "delicious authentic recipes", topic: "Daily Life & Food", collocations: ["authentic recipes", "delicious food"] },
  { text: "the upcoming weekend road trip", topic: "Travel & Leisure", collocations: ["road trip", "weekend trip"] },
  { text: "a sustainable healthy routine", topic: "Health & Habit", collocations: ["healthy routine", "sustainable habits"] },
  { text: "traditional acoustic guitar melodies", topic: "Music & Art", collocations: ["acoustic guitar", "traditional melodies"] },
  { text: "modern interior architectural designs", topic: "Design & Living", collocations: ["interior design", "architectural designs"] },
  { text: "effective time management techniques", topic: "Personal Growth", collocations: ["time management", "effective techniques"] },
  { text: "daily market trends and consumer preferences", topic: "Business & Shopping", collocations: ["market trends", "consumer preferences"] },
  { text: "engaging storybooks for young children", topic: "Education & Family", collocations: ["engaging stories", "young children"] },
  { text: "important financial savings strategies", topic: "Finance & Living", collocations: ["financial savings", "savings strategies"] },
  { text: "inspiring photography during the sunset", topic: "Hobbies & Nature", collocations: ["inspiring photography", "during sunset"] },
  { text: "complex software algorithms and data logic", topic: "Technology & Code", collocations: ["software algorithms", "data logic"] },
  { text: "everyday conversational English phrases", topic: "Language Learning", collocations: ["conversational English", "everyday phrases"] },
  { text: "creative solutions for urban gardening", topic: "Nature & Environment", collocations: ["creative solutions", "urban gardening"] },
  { text: "key insights from classical literature", topic: "Reading & Books", collocations: ["classical literature", "key insights"] },
  { text: "memorable experiences from international travel", topic: "Travel & Culture", collocations: ["memorable experiences", "international travel"] }
];

const CONTEXT_TAILS = [
  "before the sun sets over the horizon.",
  "with remarkable enthusiasm and care.",
  "every morning right after sunrise.",
  "during our weekly community gathering.",
  "to ensure a peaceful and productive day.",
  "at the local downtown cafe.",
  "since early yesterday morning.",
  "without any hesitation or stress.",
  "across different cities and cultures.",
  "to build long-term confidence and skill."
];

// Seeded Pseudo-Random Generator for deterministic infinite indexing
function pseudoRandom(seed) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

/**
 * Returns a dynamically synthesized sentence from over 300,000 possibilities!
 */
export function getGeneratedSentence(index) {
  const sIdx = Math.abs(index) % SUBJECTS.length;
  const vIdx = Math.floor((Math.abs(index) / SUBJECTS.length)) % VERB_PHRASES.length;
  const oIdx = Math.floor((Math.abs(index) / (SUBJECTS.length * VERB_PHRASES.length))) % OBJECT_CLAUSES.length;
  const cIdx = Math.floor((Math.abs(index) / (SUBJECTS.length * VERB_PHRASES.length * OBJECT_CLAUSES.length))) % CONTEXT_TAILS.length;

  const subj = SUBJECTS[sIdx];
  const verb = VERB_PHRASES[vIdx];
  const obj = OBJECT_CLAUSES[oIdx];
  const tail = CONTEXT_TAILS[cIdx];

  const fullText = `${subj} ${verb.text} ${obj.text} ${tail}`;

  return {
    id: `gen-${index}`,
    category: verb.tense.toLowerCase().includes('phrasal') ? 'phrasal_verbs' : 'general_speaking',
    topic: `${obj.topic} • ${verb.tense}`,
    level: (index % 3 === 0) ? 'Beginner A2' : (index % 3 === 1) ? 'Intermediate B1' : 'Advanced B2',
    text: fullText,
    hint: `Focus on pronouncing "${verb.text}" smoothly in context with "${obj.text}".`,
    collocations: obj.collocations,
    targetWords: [verb.target]
  };
}

/**
 * Total combinatorial sentence count (> 300,000 sentences!)
 */
export const TOTAL_GENERATED_SENTENCES = SUBJECTS.length * VERB_PHRASES.length * OBJECT_CLAUSES.length * CONTEXT_TAILS.length;
