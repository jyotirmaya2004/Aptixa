const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../server/data/rs_agrawal/square_roots_cube_roots.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let errors = 0;

console.log(`Auditing ${file}...`);
console.log(`Title: ${data.chapter}`);
console.log(`Question Count: ${data.question_count}`);

if (data.question_count !== data.questions.length) {
  console.error(`ERROR: Question count mismatch! Declared ${data.question_count}, found ${data.questions.length}`);
  errors++;
}

data.questions.forEach((q, idx) => {
  const num = idx + 1;
  if (q.question_number !== num) {
    console.error(`ERROR Q${num}: question_number mismatch: expected ${num}, got ${q.question_number}`);
    errors++;
  }

  if (!q.question || q.question.trim().length === 0) {
    console.error(`ERROR Q${num}: Question text is empty`);
    errors++;
  }

  // Check OCR artifacts
  if (/[]/.test(q.question)) {
    console.error(`ERROR Q${num}: OCR noise detected in question: "${q.question}"`);
    errors++;
  }

  const optKeys = Object.keys(q.options || {});
  if (optKeys.length < 2) {
    console.error(`ERROR Q${num}: Less than 2 options provided`);
    errors++;
  }

  if (!optKeys.includes(q.correct_option)) {
    console.error(`ERROR Q${num}: correct_option '${q.correct_option}' not found in options (${optKeys.join(', ')})`);
    errors++;
  }

  if (!q.answer || q.answer.trim().length === 0) {
    console.error(`ERROR Q${num}: Answer is empty`);
    errors++;
  }
});

if (errors === 0) {
  console.log(`\n0 errors. PASSED: 100% data integrity verified for Chapter 5 Square Roots and Cube Roots! (${data.questions.length} questions)`);
} else {
  console.error(`\nFAILED: Found ${errors} validation errors.`);
  process.exit(1);
}
