const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../server/data/rs_agrawal/percentage.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let errors = 0;
let warnings = 0;

console.log(`--- Auditing ${data.chapter} (${data.question_count} expected, ${data.questions.length} found) ---`);

if (data.questions.length !== 390) {
  console.error(`ERROR: Expected 390 questions, found ${data.questions.length}`);
  errors++;
}

const seenNumbers = new Set();
const seenIds = new Set();

data.questions.forEach((q, idx) => {
  const qNum = idx + 1;
  if (q.question_number !== qNum) {
    console.error(`ERROR: Q${qNum} has question_number ${q.question_number}`);
    errors++;
  }
  if (seenNumbers.has(q.question_number)) {
    console.error(`ERROR: Duplicate question_number ${q.question_number}`);
    errors++;
  }
  seenNumbers.add(q.question_number);

  if (seenIds.has(q.id)) {
    console.error(`ERROR: Duplicate question id ${q.id}`);
    errors++;
  }
  seenIds.add(q.id);

  if (!q.question || q.question.trim().length === 0) {
    console.error(`ERROR: Q${qNum} has empty question text`);
    errors++;
  }
  if (!q.options || Object.keys(q.options).length < 2) {
    console.error(`ERROR: Q${qNum} has insufficient options (${Object.keys(q.options || {}).length})`);
    errors++;
  }
  if (!q.correct_option || !q.options[q.correct_option]) {
    console.error(`ERROR: Q${qNum} has invalid correct_option '${q.correct_option}'`);
    errors++;
  }
  if (!q.answer) {
    console.error(`ERROR: Q${qNum} missing answer text`);
    errors++;
  }
});

if (errors === 0) {
  console.log(`PASSED: 100% data integrity verified for ${data.chapter}! (${data.questions.length} questions, ${warnings} warnings)`);
} else {
  console.error(`FAILED: Found ${errors} errors during validation.`);
  process.exit(1);
}
