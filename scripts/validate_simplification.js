const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../server/data/rs_agrawal/simplification.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let errors = 0;
let ocrPattern = /[]/g;

console.log(`Auditing ${data.questions.length} questions in ${file}...`);

data.questions.forEach((q, index) => {
  // Check empty fields
  if (!q.id || !q.chapter || !q.question_number || !q.question || !q.options || !q.correct_option || !q.answer) {
    console.error(`Q${q.question_number} (Index ${index}): Missing required field!`);
    errors++;
  }

  // Check OCR artifacts
  if (ocrPattern.test(q.question)) {
    console.error(`Q${q.question_number}: OCR noise found in question text!`);
    errors++;
  }

  // Check option keys
  const optKeys = Object.keys(q.options);
  if (optKeys.length < 2) {
    console.error(`Q${q.question_number}: Less than 2 options!`);
    errors++;
  }

  for (let k of optKeys) {
    if (ocrPattern.test(q.options[k])) {
      console.error(`Q${q.question_number} Option ${k}: OCR noise found!`);
      errors++;
    }
  }

  if (!q.options[q.correct_option]) {
    console.error(`Q${q.question_number}: correct_option '${q.correct_option}' not found in options keys [${optKeys.join(', ')}]!`);
    errors++;
  }
});

console.log(`Validation finished with ${errors} errors.`);
if (errors === 0) {
  console.log("PASSED: 100% data integrity verified for Chapter 4 Simplification!");
}
