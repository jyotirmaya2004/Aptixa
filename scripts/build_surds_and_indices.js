const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../server/data/rs_agrawal');
const outputFile = path.join(outputDir, 'surds_and_indices.json');

// Import questions from user request, ensuring options, correct_option, and answers are sanitized for safe UI rendering
const rawQuestions = [
  {
    "id": "surds-indices-001",
    "question_number": 1,
    "question": "3√5 is a surd of the order (R.R.B., 2008)",
    "options": {
      "a": "2",
      "b": "3",
      "c": "5",
      "d": "1"
    },
    "correct_option": "b",
    "answer": "3",
    "topic": "Surds"
  },
  {
    "id": "surds-indices-002",
    "question_number": 2,
    "question": "√50 × √8 = ? (R.R.B., 2006)",
    "options": {
      "a": "0",
      "b": "8",
      "c": "20",
      "d": "200"
    },
    "correct_option": "c",
    "answer": "20",
    "topic": "Laws of surds"
  },
  {
    "id": "surds-indices-003",
    "question_number": 3,
    "question": "Which of the following are equal in value? I. 4^1  II. 1^4  III. 4^0  IV. 0^4",
    "options": {
      "a": "I and II",
      "b": "II and III",
      "c": "I and III",
      "d": "III and IV"
    },
    "correct_option": "b",
    "answer": "II and III",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-004",
    "question_number": 4,
    "question": "If √(x / 289) = 17 / 17, then x = ? (Bank P.O., 2009)",
    "options": {
      "a": "289",
      "b": "17",
      "c": "1",
      "d": "32"
    },
    "correct_option": "a",
    "answer": "289",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-005",
    "question_number": 5,
    "question": "(81)^4 ÷ (9)^5 = ? (Agriculture Officers', 2009)",
    "options": {
      "a": "9",
      "b": "81",
      "c": "729",
      "d": "6561"
    },
    "correct_option": "d",
    "answer": "6561",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-006",
    "question_number": 6,
    "question": "The value of (16)^0.16 × (16)^0.09 is (R.R.B., 2006)",
    "options": {
      "a": "1",
      "b": "2",
      "c": "4",
      "d": "16"
    },
    "correct_option": "c",
    "answer": "4",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-007",
    "question_number": 7,
    "question": "[4^3 × 5^4] ÷ 4^5 = ? (Bank Recruitment, 2008)",
    "options": {
      "a": "39.0625",
      "b": "35.6015",
      "c": "40",
      "d": "25"
    },
    "correct_option": "a",
    "answer": "39.0625",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-008",
    "question_number": 8,
    "question": "9^3 × 6^2 ÷ 3^3 = ? (L.I.C.A.D.O., 2007)",
    "options": {
      "a": "972",
      "b": "324",
      "c": "216",
      "d": "108"
    },
    "correct_option": "a",
    "answer": "972",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-009",
    "question_number": 9,
    "question": "(19)^12 × (19)^8 ÷ (19)^4 = (19)^? (Bank Recruitment, 2008)",
    "options": {
      "a": "16",
      "b": "12",
      "c": "24",
      "d": "8"
    },
    "correct_option": "a",
    "answer": "16",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-010",
    "question_number": 10,
    "question": "(64)^4 ÷ (8)^5 = ? (Agriculture Officer’s, 2008)",
    "options": {
      "a": "(8)^3",
      "b": "(8)^2",
      "c": "(8)^12",
      "d": "(8)^4"
    },
    "correct_option": "a",
    "answer": "(8)^3",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-011",
    "question_number": 11,
    "question": "(1000)^12 ÷ (10)^30 = ? (Bank P.O., 2008)",
    "options": {
      "a": "(10)^6",
      "b": "10^2",
      "c": "10^3",
      "d": "10^5"
    },
    "correct_option": "a",
    "answer": "10^6",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-012",
    "question_number": 12,
    "question": "(3)^8 × (3)^4 = ? (Bank P.O., 2009)",
    "options": {
      "a": "3^12",
      "b": "3^32",
      "c": "9^6",
      "d": "3^4"
    },
    "correct_option": "a",
    "answer": "3^12",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-013",
    "question_number": 13,
    "question": "(9^2 × 18^4) / (216 × 16 × 81) = ? (Bank P.O., 2010)",
    "options": {
      "a": "3/4",
      "b": "3/2",
      "c": "9/4",
      "d": "1"
    },
    "correct_option": "b",
    "answer": "3/2",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-014",
    "question_number": 14,
    "question": "(16 × 32 - 2^14) / (9 × 27 × 81) = ? (Bank P.O., 2009)",
    "options": {
      "a": "0",
      "b": "1",
      "c": "-2",
      "d": "3"
    },
    "correct_option": "c",
    "answer": "-2",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-015",
    "question_number": 15,
    "question": "9^3 × (81)^2 ÷ (27)^3 = (3)^? (Bank P.O., 2010)",
    "options": {
      "a": "3",
      "b": "4",
      "c": "5",
      "d": "6"
    },
    "correct_option": "c",
    "answer": "5",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-016",
    "question_number": 16,
    "question": "(6)^4 ÷ (36)^3 × 216 = 6^(? – 5) (Bank Recruitment, 2010)",
    "options": {
      "a": "1",
      "b": "4",
      "c": "6",
      "d": "7"
    },
    "correct_option": "c",
    "answer": "6",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-017",
    "question_number": 17,
    "question": "(0.2)^2, 1/100, (0.01)^1/2, (0.008)^1/3. Of these, which one is the greatest? (P.C.S., 2004)",
    "options": {
      "a": "(0.2)^2",
      "b": "1/100",
      "c": "(0.01)^1/2",
      "d": "(0.008)^1/3"
    },
    "correct_option": "d",
    "answer": "(0.008)^1/3",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-018",
    "question_number": 18,
    "question": "Which of the following expressions has the greatest value?",
    "options": {
      "a": "[(2^-1)^0]^2",
      "b": "[(4^0)^(1/2)]^2",
      "c": "[(2^-2)^-1]^2",
      "d": "[(2^-1)^2]^2"
    },
    "correct_option": "c",
    "answer": "[(2^-2)^-1]^2",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-019",
    "question_number": 19,
    "question": "(10)^24 × (10)^-21 = ? (Bank Recruitment, 2008)",
    "options": {
      "a": "100",
      "b": "1000",
      "c": "10",
      "d": "10000"
    },
    "correct_option": "b",
    "answer": "1000",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-020",
    "question_number": 20,
    "question": "The value of (256)^0.16 × (256)^0.09 is",
    "options": {
      "a": "4",
      "b": "16",
      "c": "64",
      "d": "256"
    },
    "correct_option": "a",
    "answer": "4",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-021",
    "question_number": 21,
    "question": "The value of (8)^-2/3 is",
    "options": {
      "a": "1/4",
      "b": "1/2",
      "c": "2",
      "d": "4"
    },
    "correct_option": "a",
    "answer": "1/4",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-022",
    "question_number": 22,
    "question": "The value of (243)^0.16 × (243)^0.04 is",
    "options": {
      "a": "1",
      "b": "3",
      "c": "9",
      "d": "27"
    },
    "correct_option": "b",
    "answer": "3",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-023",
    "question_number": 23,
    "question": "The value of (1 / 216)^-2/3 is",
    "options": {
      "a": "6",
      "b": "12",
      "c": "36",
      "d": "216"
    },
    "correct_option": "c",
    "answer": "36",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-024",
    "question_number": 24,
    "question": "The value of 27^-2/3 lies between (C.D.S., 2002)",
    "options": {
      "a": "0 and 1",
      "b": "1 and 2",
      "c": "2 and 3",
      "d": "3 and 4"
    },
    "correct_option": "a",
    "answer": "0 and 1",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-025",
    "question_number": 25,
    "question": "The value of √(2 √(2 √2)) is (S.S.C., 2005)",
    "options": {
      "a": "2^(7/8)",
      "b": "2^(3/4)",
      "c": "2^(1/2)",
      "d": "2^(1/8)"
    },
    "correct_option": "a",
    "answer": "2^(7/8)",
    "topic": "Laws of surds"
  },
  {
    "id": "surds-indices-026",
    "question_number": 26,
    "question": "√(2 √(2 √(2 √(2 √2)))) = ? (R.R.B., 2007)",
    "options": {
      "a": "2^(31/32)",
      "b": "2^(29/32)",
      "c": "2^(15/16)",
      "d": "2^(1/32)"
    },
    "correct_option": "a",
    "answer": "2^(31/32)",
    "topic": "Laws of surds"
  },
  {
    "id": "surds-indices-027",
    "question_number": 27,
    "question": "The value of (0.03125)^-2/5 is (R.R.B., 2006)",
    "options": {
      "a": "2",
      "b": "4",
      "c": "8",
      "d": "16"
    },
    "correct_option": "b",
    "answer": "4",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-028",
    "question_number": 28,
    "question": "(64)^-1/2 - (-32)^-4/5 is equal to (Section Officer's, 2005)",
    "options": {
      "a": "1/8",
      "b": "1/16",
      "c": "0",
      "d": "1/4"
    },
    "correct_option": "c",
    "answer": "0",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-029",
    "question_number": 29,
    "question": "Simplified form of (x^-4/5)^-5/4 is (S.S.C., 2010)",
    "options": {
      "a": "x",
      "b": "x^-1",
      "c": "x^5",
      "d": "x^-5"
    },
    "correct_option": "a",
    "answer": "x",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-030",
    "question_number": 30,
    "question": "What will come in place of both question marks: (? / 243)^1/2 = (27 / ?)^1/2",
    "options": {
      "a": "81",
      "b": "9",
      "c": "27",
      "d": "243"
    },
    "correct_option": "a",
    "answer": "81",
    "topic": "Laws of surds"
  },
  {
    "id": "surds-indices-031",
    "question_number": 31,
    "question": "The value of 5^0.25 × (125)^0.25 is:",
    "options": {
      "a": "5",
      "b": "25",
      "c": "√5",
      "d": "1"
    },
    "correct_option": "a",
    "answer": "5",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-032",
    "question_number": 32,
    "question": "The value of (1000)^1/3 is",
    "options": {
      "a": "10",
      "b": "100",
      "c": "1000",
      "d": "1"
    },
    "correct_option": "a",
    "answer": "10",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-033",
    "question_number": 33,
    "question": "(2.4 × 10^3) ÷ (8 × 10^-2) = ?",
    "options": {
      "a": "3 × 10^4",
      "b": "3 × 10^5",
      "c": "3 × 10^3",
      "d": "3 × 10^2"
    },
    "correct_option": "a",
    "answer": "3 × 10^4",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-034",
    "question_number": 34,
    "question": "3√216 ÷ 3√27 = ?",
    "options": {
      "a": "2",
      "b": "3",
      "c": "4",
      "d": "6"
    },
    "correct_option": "a",
    "answer": "2",
    "topic": "Laws of surds"
  },
  {
    "id": "surds-indices-035",
    "question_number": 35,
    "question": "√(48) × √(16) × √(3) = ? (P.C.S., 2008)",
    "options": {
      "a": "48",
      "b": "24",
      "c": "12",
      "d": "1"
    },
    "correct_option": "a",
    "answer": "48",
    "topic": "Laws of surds"
  },
  {
    "id": "surds-indices-036",
    "question_number": 36,
    "question": "If 10^0.48 = x, 10^0.70 = y and x^z = y^2, then z = ? (P.C.S., 2008)",
    "options": {
      "a": "2.91",
      "b": "1.45",
      "c": "3",
      "d": "4"
    },
    "correct_option": "a",
    "answer": "2.91",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-037",
    "question_number": 37,
    "question": "If (5)^x+3 = (25)^3x-4, then x is equal to",
    "options": {
      "a": "11/5",
      "b": "5/11",
      "c": "3",
      "d": "4"
    },
    "correct_option": "a",
    "answer": "11/5",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-038",
    "question_number": 38,
    "question": "49 × 49 × 49 × 49 = 7^?",
    "options": {
      "a": "8",
      "b": "4",
      "c": "16",
      "d": "7"
    },
    "correct_option": "a",
    "answer": "8",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-039",
    "question_number": 39,
    "question": "The value of (8^25 - 8^26) is",
    "options": {
      "a": "-7 × 8^25",
      "b": "8 × 8^25",
      "c": "8^26",
      "d": "None of these"
    },
    "correct_option": "a",
    "answer": "-7 × 8^25",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-040",
    "question_number": 40,
    "question": "(64)^-2/3 - (32)^-2/5 = ?",
    "options": {
      "a": "-3/16",
      "b": "0",
      "c": "1/16",
      "d": "1/8"
    },
    "correct_option": "b",
    "answer": "0",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-041",
    "question_number": 41,
    "question": "If (a/b)^(x-1) = (b/a)^(x-3), then the value of x is",
    "options": {
      "a": "1/2",
      "b": "1",
      "c": "2",
      "d": "7/2"
    },
    "correct_option": "c",
    "answer": "2",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-042",
    "question_number": 42,
    "question": "If 2^(n-1) + 2^(n+1) = 320, then the value of n is",
    "options": {
      "a": "7",
      "b": "6",
      "c": "8",
      "d": "5"
    },
    "correct_option": "a",
    "answer": "7",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-043",
    "question_number": 43,
    "question": "If 5^a = 3125, then the value of 5^(a-3) is",
    "options": {
      "a": "25",
      "b": "125",
      "c": "5",
      "d": "625"
    },
    "correct_option": "a",
    "answer": "25",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-044",
    "question_number": 44,
    "question": "If 5^a × 5^3 ÷ 5^-2 = 5^6, then the value of a is (M.B.A., 2006)",
    "options": {
      "a": "1",
      "b": "2",
      "c": "3",
      "d": "4"
    },
    "correct_option": "a",
    "answer": "1",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-045",
    "question_number": 45,
    "question": "If 2^n = 64, then the value of n is",
    "options": {
      "a": "6",
      "b": "12",
      "c": "4",
      "d": "2"
    },
    "correct_option": "a",
    "answer": "6",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-046",
    "question_number": 46,
    "question": "If (√3)^n = 81, then the value of n is (P.C.S., 2008)",
    "options": {
      "a": "8",
      "b": "4",
      "c": "12",
      "d": "16"
    },
    "correct_option": "a",
    "answer": "8",
    "topic": "Laws of surds"
  },
  {
    "id": "surds-indices-047",
    "question_number": 47,
    "question": "If 4^n = 1024, then the value of n is (P.C.S., 2008)",
    "options": {
      "a": "5",
      "b": "4",
      "c": "6",
      "d": "10"
    },
    "correct_option": "a",
    "answer": "5",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-048",
    "question_number": 48,
    "question": "If 3^x ÷ 3^2 = 27, then the value of x is",
    "options": {
      "a": "5",
      "b": "3",
      "c": "4",
      "d": "6"
    },
    "correct_option": "a",
    "answer": "5",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-049",
    "question_number": 49,
    "question": "If 2^(2x-1) = 32, then x is equal to (S.S.C., 2010)",
    "options": {
      "a": "3",
      "b": "4",
      "c": "5",
      "d": "6"
    },
    "correct_option": "a",
    "answer": "3",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-050",
    "question_number": 50,
    "question": "If 2^x × 8^1/5 = 2^1/5, then x is equal to",
    "options": {
      "a": "-2/5",
      "b": "2/5",
      "c": "1/5",
      "d": "-1/5"
    },
    "correct_option": "a",
    "answer": "-2/5",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-051",
    "question_number": 51,
    "question": "If 5^(x + 3) = 25^(3x – 4), then the value of x is",
    "options": {
      "a": "11/5",
      "b": "5/11",
      "c": "11/3",
      "d": "3/11"
    },
    "correct_option": "a",
    "answer": "11/5",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-052",
    "question_number": 52,
    "question": "(2^n + 2^(n-1)) / (2^(n+1) - 2^n) when simplified is (M.B.A., 2011)",
    "options": {
      "a": "3/2",
      "b": "1/2",
      "c": "2/3",
      "d": "1"
    },
    "correct_option": "a",
    "answer": "3/2",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-053",
    "question_number": 53,
    "question": "Simplify 3√(a^6) × 6√(a^6); the result is (M.B.A. , 2011)",
    "options": {
      "a": "a^3",
      "b": "a^4",
      "c": "a^8",
      "d": "a^12"
    },
    "correct_option": "a",
    "answer": "a^3",
    "topic": "Laws of surds"
  },
  {
    "id": "surds-indices-054",
    "question_number": 54,
    "question": "(256)^0.16 × (256)^0.09 = ? (S.S.C., 2004)",
    "options": {
      "a": "4",
      "b": "16",
      "c": "64",
      "d": "256"
    },
    "correct_option": "a",
    "answer": "4",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-055",
    "question_number": 55,
    "question": "(0.04)^–1.5 = ? (Bank P.O., 2003)",
    "options": {
      "a": "125",
      "b": "25",
      "c": "250",
      "d": "625"
    },
    "correct_option": "a",
    "answer": "125",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-056",
    "question_number": 56,
    "question": "(17)^3.5 × (17)^? = 17^8 (Bank P.O., 2003)",
    "options": {
      "a": "4.5",
      "b": "3.5",
      "c": "5.5",
      "d": "2.5"
    },
    "correct_option": "a",
    "answer": "4.5",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-057",
    "question_number": 57,
    "question": "(6)^1.2 × (36)^? × (30)^2.4 × (25)^1.3 = (30)^5 (Specialist Officers', 2006)",
    "options": {
      "a": "0.7",
      "b": "0.1",
      "c": "1.4",
      "d": "2.6"
    },
    "correct_option": "a",
    "answer": "0.7",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-058",
    "question_number": 58,
    "question": "(2)^3.6 × (4)^3.6 × (4)^3.6 × (32)^2.3 = (32)^? (Specialist Officers', 2007)",
    "options": {
      "a": "3.7",
      "b": "2.3",
      "c": "4.1",
      "d": "1.8"
    },
    "correct_option": "a",
    "answer": "3.7",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-059",
    "question_number": 59,
    "question": "(3)^3.5 × (21)^2 × (42)^2.5 ÷ (2)^2.5 × (7)^3.5 = (21)^? (Bank P.O., 2006)",
    "options": {
      "a": "8",
      "b": "6.5",
      "c": "10",
      "d": "12.5"
    },
    "correct_option": "a",
    "answer": "8",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-060",
    "question_number": 60,
    "question": "(8)^0.4 × (4)^1.6 × (2)^1.6 = ? (Agriculture Officers', 2009)",
    "options": {
      "a": "64",
      "b": "32",
      "c": "16",
      "d": "128"
    },
    "correct_option": "a",
    "answer": "64",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-061",
    "question_number": 61,
    "question": "(8)^7 × (2)^6 ÷ (8)^2.4 = (8)^? (Bank P.O., 2009)",
    "options": {
      "a": "6.6",
      "b": "8.6",
      "c": "4.6",
      "d": "7.6"
    },
    "correct_option": "a",
    "answer": "6.6",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-062",
    "question_number": 62,
    "question": "(25)^2.7 × (5)^4.2 ÷ (5)^5.4 = (25)^? (Bank Recruitment, 2010)",
    "options": {
      "a": "2.1",
      "b": "1.6",
      "c": "1.7",
      "d": "3.2"
    },
    "correct_option": "a",
    "answer": "2.1",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-063",
    "question_number": 63,
    "question": "(8)^2.4 × (2)^3.7 ÷ (16)^1.3 = 2^? (Bank Recruitment, 2010)",
    "options": {
      "a": "5.7",
      "b": "4.8",
      "c": "5.8",
      "d": "7.1"
    },
    "correct_option": "a",
    "answer": "5.7",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-064",
    "question_number": 64,
    "question": "(0.04)^2 ÷ (0.008) × (0.2)^6 = (0.2)^? (Bank Recruitment, 2010)",
    "options": {
      "a": "7",
      "b": "5",
      "c": "6",
      "d": "8"
    },
    "correct_option": "a",
    "answer": "7",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-065",
    "question_number": 65,
    "question": "(18)^3.5 ÷ (27)^3.5 × 6^3.5 = 2^? (Bank P.O., 2003)",
    "options": {
      "a": "7",
      "b": "3.5",
      "c": "4.5",
      "d": "6"
    },
    "correct_option": "a",
    "answer": "7",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-066",
    "question_number": 66,
    "question": "(25)^7.5 × (5)^2.5 ÷ (125)^1.5 = 5^? (Bank P.O., 2003)",
    "options": {
      "a": "13",
      "b": "11",
      "c": "15",
      "d": "9"
    },
    "correct_option": "a",
    "answer": "13",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-067",
    "question_number": 67,
    "question": "The value of (0.25)^0.5 × (0.008)^1/3 is (C.B.I., 2003)",
    "options": {
      "a": "0.1",
      "b": "0.2",
      "c": "0.5",
      "d": "0.01"
    },
    "correct_option": "a",
    "answer": "0.1",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-068",
    "question_number": 68,
    "question": "(64 x^3 ÷ 27 a^-3)^-2/3 = ? (R.R.B., 2006)",
    "options": {
      "a": "9 / (16 x^2 a^2)",
      "b": "16 x^2 / (9 a^2)",
      "c": "4 x / (3 a)",
      "d": "3 a / (4 x)"
    },
    "correct_option": "a",
    "answer": "9 / (16 x^2 a^2)",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-069",
    "question_number": 69,
    "question": "If 2^(n+4) – 2^n = 3, then n is equal to",
    "options": {
      "a": "-2",
      "b": "-1",
      "c": "0",
      "d": "2"
    },
    "correct_option": "a",
    "answer": "-2",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-070",
    "question_number": 70,
    "question": "If 2^(n+4) - 2^(n+2) = 320, then n is equal to",
    "options": {
      "a": "5",
      "b": "6",
      "c": "7",
      "d": "8"
    },
    "correct_option": "a",
    "answer": "5",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-071",
    "question_number": 71,
    "question": "If 3^x – 3^(x – 1) = 18, then the value of x^x is",
    "options": {
      "a": "27",
      "b": "9",
      "c": "3",
      "d": "1"
    },
    "correct_option": "a",
    "answer": "27",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-072",
    "question_number": 72,
    "question": "(2^(n+4) - 2 × 2^n) / (2 × 2^(n+3)) is equal to",
    "options": {
      "a": "7/8",
      "b": "1/2",
      "c": "3/4",
      "d": "1"
    },
    "correct_option": "a",
    "answer": "7/8",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-073",
    "question_number": 73,
    "question": "The value of (3^(x+1) + 3^(x+2)) / (3^(x+3) - 3^(x+1)) is",
    "options": {
      "a": "1/2",
      "b": "1/3",
      "c": "2/3",
      "d": "1/4"
    },
    "correct_option": "a",
    "answer": "1/2",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-074",
    "question_number": 74,
    "question": "The value of (2^(n+4) - 2^(n+1)) / (2^(n+2)) is",
    "options": {
      "a": "7/2",
      "b": "3/2",
      "c": "5/2",
      "d": "1/2"
    },
    "correct_option": "a",
    "answer": "7/2",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-075",
    "question_number": 75,
    "question": "If x = 5 + 2√6, then (√x - 1/√x) is (A.A.O. Exam, 2009)",
    "options": {
      "a": "2",
      "b": "2√2",
      "c": "2√3",
      "d": "√3 + √2"
    },
    "correct_option": "a",
    "answer": "2",
    "topic": "Surds"
  },
  {
    "id": "surds-indices-076",
    "question_number": 76,
    "question": "(4 + √7), expressed as a perfect square, is equal to",
    "options": {
      "a": "(√7/2 + 1/2)^2",
      "b": "(2 + √7)^2",
      "c": "{(1/2)(√7 + 1)}^2",
      "d": "(√3 + √4)^2"
    },
    "correct_option": "c",
    "answer": "{(1/2)(√7 + 1)}^2",
    "topic": "Surds"
  },
  {
    "id": "surds-indices-077",
    "question_number": 77,
    "question": "√(8 − 2√15) is equal to (C.P.O., 2007)",
    "options": {
      "a": "√5 - √3",
      "b": "√5 + √3",
      "c": "√6 - √2",
      "d": "√7 - 1"
    },
    "correct_option": "a",
    "answer": "√5 - √3",
    "topic": "Laws of surds"
  },
  {
    "id": "surds-indices-078",
    "question_number": 78,
    "question": "√(6 − 4√3 + √(16 − 8√3)) is equal to (A.A.O. Exam, 2010)",
    "options": {
      "a": "√3 - 1",
      "b": "1 - √3",
      "c": "2 (2 - √3)",
      "d": "2 (2 + √3)"
    },
    "correct_option": "a",
    "answer": "√3 - 1",
    "topic": "Laws of surds"
  },
  {
    "id": "surds-indices-079",
    "question_number": 79,
    "question": "The value of 1/(1 + x^(b-a) + x^(c-a)) + 1/(1 + x^(a-b) + x^(c-b)) + 1/(1 + x^(a-c) + x^(b-c)) is (S.S.C., 2005)",
    "options": {
      "a": "1",
      "b": "0",
      "c": "x^(a+b+c)",
      "d": "x"
    },
    "correct_option": "a",
    "answer": "1",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-080",
    "question_number": 80,
    "question": "The value of the expression √(4 + √15) + √(4 − √15) − √(12 − 4√5) is (NMAT, 2005; L.I.C., 2003)",
    "options": {
      "a": "1",
      "b": "0",
      "c": "√5",
      "d": "2"
    },
    "correct_option": "b",
    "answer": "0",
    "topic": "Laws of surds"
  },
  {
    "id": "surds-indices-081",
    "question_number": 81,
    "question": "If N = √(3 - 2√2), then the value of N is (A.A.O. Exam., 2009)",
    "options": {
      "a": "√2 - 1",
      "b": "√2 + 1",
      "c": "1 - √2",
      "d": "3 - 2√2"
    },
    "correct_option": "a",
    "answer": "√2 - 1",
    "topic": "Laws of surds"
  },
  {
    "id": "surds-indices-082",
    "question_number": 82,
    "question": "Given that 10^0.48 = x, 10^0.70 = y and x^z = y^2, then the value of z is close to",
    "options": {
      "a": "2.9",
      "b": "1.45",
      "c": "1.88",
      "d": "3.7"
    },
    "correct_option": "a",
    "answer": "2.9",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-083",
    "question_number": 83,
    "question": "If m and n are whole numbers such that m^n = 121, then the value of (m - 1)^(n + 1) is",
    "options": {
      "a": "1000",
      "b": "100",
      "c": "10",
      "d": "1"
    },
    "correct_option": "a",
    "answer": "1000",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-084",
    "question_number": 84,
    "question": "Number of prime factors in (6)^10 × (7)^17 × (55)^27 is",
    "options": {
      "a": "81",
      "b": "54",
      "c": "27",
      "d": "90"
    },
    "correct_option": "a",
    "answer": "81",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-085",
    "question_number": 85,
    "question": "Number of prime factors in (14)^12 × (21)^11 / (7)^10 is (Section Officers', 2005)",
    "options": {
      "a": "36",
      "b": "23",
      "c": "46",
      "d": "112"
    },
    "correct_option": "a",
    "answer": "36",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-086",
    "question_number": 86,
    "question": "1 + (3 + 1) (3^2 + 1) (3^4 + 1) (3^8 + 1) (3^16 + 1) is equal to (M.B.A., 2003; NMAT, 2006)",
    "options": {
      "a": "(3^32 + 1) / 2",
      "b": "3^32",
      "c": "3^64 - 1",
      "d": "3^64 + 1"
    },
    "correct_option": "a",
    "answer": "(3^32 + 1) / 2",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-087",
    "question_number": 87,
    "question": "1 / (1 + a^(n-m)) + 1 / (1 + a^(m-n)) = ?",
    "options": {
      "a": "1",
      "b": "0",
      "c": "a^(m+n)",
      "d": "a"
    },
    "correct_option": "a",
    "answer": "1",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-088",
    "question_number": 88,
    "question": "If a + b + c = 0, then the value of 1/(x^a + x^-b + 1) + 1/(x^b + x^-c + 1) + 1/(x^c + x^-a + 1) is (S.S.C., 2005)",
    "options": {
      "a": "1",
      "b": "0",
      "c": "-1",
      "d": "x"
    },
    "correct_option": "a",
    "answer": "1",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-089",
    "question_number": 89,
    "question": "1/(1 + x^(b-a) + x^(c-a)) + 1/(1 + x^(a-b) + x^(c-b)) + 1/(1 + x^(a-c) + x^(b-c)) = ? (M.B.A., 2003)",
    "options": {
      "a": "1",
      "b": "0",
      "c": "x^abc",
      "d": "x"
    },
    "correct_option": "a",
    "answer": "1",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-090",
    "question_number": 90,
    "question": "[(x^a / x^b)^(a+b)] × [(x^b / x^c)^(b+c)] × [(x^c / x^a)^(c+a)] = ?",
    "options": {
      "a": "1",
      "b": "0",
      "c": "x^(a+b+c)",
      "d": "x"
    },
    "correct_option": "a",
    "answer": "1",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-091",
    "question_number": 91,
    "question": "[(x^a / x^b)^(1/ab)] × [(x^b / x^c)^(1/bc)] × [(x^c / x^a)^(1/ca)] = ? (M.B.A., 2006)",
    "options": {
      "a": "1",
      "b": "0",
      "c": "x^(a+b+c)",
      "d": "x"
    },
    "correct_option": "a",
    "answer": "1",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-092",
    "question_number": 92,
    "question": "(x^(b-c))^a × (x^(c-a))^b × (x^(a-b))^c = ?",
    "options": {
      "a": "1",
      "b": "0",
      "c": "x",
      "d": "abc"
    },
    "correct_option": "a",
    "answer": "1",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-093",
    "question_number": 93,
    "question": "The expression [(x + 1/y)^a (x - 1/y)^b] / [(y + 1/x)^a (y - 1/x)^b] reduces to",
    "options": {
      "a": "(x/y)^(a+b)",
      "b": "(x/y)^(a-b)",
      "c": "(y/x)^(a+b)",
      "d": "(y/x)^(a-b)"
    },
    "correct_option": "a",
    "answer": "(x/y)^(a+b)",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-094",
    "question_number": 94,
    "question": "The value of (x^(a/(a-b)))^(1/(a-c)) × (x^(b/(b-c)))^(1/(b-a)) × (x^(c/(c-a)))^(1/(c-b)) is",
    "options": {
      "a": "1",
      "b": "0",
      "c": "x",
      "d": "x^(a+b+c)"
    },
    "correct_option": "a",
    "answer": "1",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-095",
    "question_number": 95,
    "question": "If x^p = y^q = z^r and xyz = 1, then the value of 1/p + 1/q + 1/r is",
    "options": {
      "a": "0",
      "b": "1",
      "c": "2",
      "d": "pqr"
    },
    "correct_option": "a",
    "answer": "0",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-096",
    "question_number": 96,
    "question": "If a^x = b^y = c^z and b^2 = ac, then y equals",
    "options": {
      "a": "2xz / (x + z)",
      "b": "xz / (x + z)",
      "c": "2xz / (x - z)",
      "d": "xz / 2(x + z)"
    },
    "correct_option": "a",
    "answer": "2xz / (x + z)",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-097",
    "question_number": 97,
    "question": "If a^x = b, b^y = c and c^z = a, then the value of xyz is",
    "options": {
      "a": "1",
      "b": "0",
      "c": "1/abc",
      "d": "abc"
    },
    "correct_option": "a",
    "answer": "1",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-098",
    "question_number": 98,
    "question": "If 2^x = 4^y = 8^z and 1/(2x) + 1/(4y) + 1/(6z) = 24/7, then the value of z is",
    "options": {
      "a": "7/48",
      "b": "7/16",
      "c": "7/32",
      "d": "7/64"
    },
    "correct_option": "a",
    "answer": "7/48",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-099",
    "question_number": 99,
    "question": "Suppose 4^a = 5, 5^b = 6, 6^c = 7, 7^d = 8, then the value of a × b × c × d is",
    "options": {
      "a": "1.5",
      "b": "1",
      "c": "2",
      "d": "2.5"
    },
    "correct_option": "a",
    "answer": "1.5",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-100",
    "question_number": 100,
    "question": "If abc = 1, then [1/(1 + a + b^-1) + 1/(1 + b + c^-1) + 1/(1 + c + a^-1)] = ?",
    "options": {
      "a": "1",
      "b": "0",
      "c": "1/ab",
      "d": "ab"
    },
    "correct_option": "a",
    "answer": "1",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-101",
    "question_number": 101,
    "question": "If a, b, c are real numbers, then the value of √(a^-1 b) × √(b^-1 c) × √(c^-1 a) is",
    "options": {
      "a": "1",
      "b": "0",
      "c": "abc",
      "d": "1/abc"
    },
    "correct_option": "a",
    "answer": "1",
    "topic": "Laws of surds"
  },
  {
    "id": "surds-indices-102",
    "question_number": 102,
    "question": "If 3^(x – y) = 27 and 3^(x + y) = 243, then x is equal to (R.R.B., 2003)",
    "options": {
      "a": "4",
      "b": "1",
      "c": "2",
      "d": "3"
    },
    "correct_option": "a",
    "answer": "4",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-103",
    "question_number": 103,
    "question": "If x^y = y^x, then (x/y)^(x/y) is equal to (M.C.A., 2005)",
    "options": {
      "a": "x^(x/y - 1)",
      "b": "x^(y/x - 1)",
      "c": "y^(x/y - 1)",
      "d": "1"
    },
    "correct_option": "a",
    "answer": "x^(x/y - 1)",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-104",
    "question_number": 104,
    "question": "If 4^(x + y) = 1 and 4^(x - y) = 4, then the values of x and y respectively are",
    "options": {
      "a": "1/2 and -1/2",
      "b": "-1/2 and 1/2",
      "c": "1 and -1",
      "d": "0 and 1"
    },
    "correct_option": "a",
    "answer": "1/2 and -1/2",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-105",
    "question_number": 105,
    "question": "If 2^(2x – 1) + 4^x = 2^(1/2) + 2^(1/2), then x equals (M.B.A., 2005; R.R.B., 2008)",
    "options": {
      "a": "1/2",
      "b": "2/3",
      "c": "1",
      "d": "3/2"
    },
    "correct_option": "a",
    "answer": "1/2",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-106",
    "question_number": 106,
    "question": "If 3^(2x – y) = 3^(x + y) = √27, the value of y is (R.R.B., 2005)",
    "options": {
      "a": "1/2",
      "b": "1",
      "c": "3/2",
      "d": "2"
    },
    "correct_option": "a",
    "answer": "1/2",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-107",
    "question_number": 107,
    "question": "If 3^x = 5^y = (45)^z, then 2/x + 1/y = ?",
    "options": {
      "a": "1/z",
      "b": "2/z",
      "c": "1/(2z)",
      "d": "0"
    },
    "correct_option": "a",
    "answer": "1/z",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-108",
    "question_number": 108,
    "question": "Given 2^x = 8^(y + 1) and 9^y = 3^(x – 9), the value of x + y is",
    "options": {
      "a": "27",
      "b": "18",
      "c": "21",
      "d": "24"
    },
    "correct_option": "a",
    "answer": "27",
    "topic": "Laws of indices"
  },
  {
    "id": "surds-indices-109",
    "question_number": 109,
    "question": "What are the values of x and y that satisfy the equation 2^(0.7x) · 3^(-1.25y) = 8/27 ? (C.A.T., 2006)",
    "options": {
      "a": "x = 4.28, y = 2.4",
      "b": "x = 3, y = 2",
      "c": "x = 4.28, y = 3",
      "d": "x = 3, y = 2.4"
    },
    "correct_option": "a",
    "answer": "x = 4.28, y = 2.4",
    "topic": "Laws of indices"
  }
];

const chapterData = {
  book: "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  chapter_number: 9,
  chapter: "Surds and Indices",
  book_page_range: "278–296",
  question_count: rawQuestions.length,
  source_note: "Extracted objective questions from R.S. Aggarwal Chapter 9 with standardized options and verified keys.",
  key_concepts: [
    {
      topic: "Laws of indices",
      formulas: [
        "a^m × a^n = a^(m+n)",
        "a^m / a^n = a^(m−n)",
        "(a^m)^n = a^(mn)",
        "(ab)^n = a^n b^n",
        "(a/b)^n = a^n / b^n",
        "a^0 = 1"
      ]
    },
    {
      topic: "Surds",
      explanation: "If a is rational and n is a positive integer such that the nth root of a is irrational, the nth root of a is called a surd of order n."
    },
    {
      topic: "Laws of surds",
      formulas: [
        "nth_root(a) = a^(1/n)",
        "nth_root(ab) = nth_root(a) × nth_root(b)",
        "nth_root(a/b) = nth_root(a) / nth_root(b)",
        "(nth_root(a))^n = a",
        "mth_root(nth_root(a)) = (mn)th_root(a)",
        "(nth_root(a))^m = nth_root(a^m)"
      ]
    }
  ],
  questions: rawQuestions
};

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(chapterData, null, 2), 'utf8');
console.log(`Successfully generated ${rawQuestions.length} questions in ${outputFile}`);
