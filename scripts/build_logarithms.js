const fs = require('fs');
const path = require('path');

const rawQuestions = [
  {
    "id": "logarithms-001",
    "question_number": 1,
    "question": "The value of log₂ 16 is",
    "options": {
      "a": "1/8",
      "b": "4",
      "c": "8",
      "d": "16"
    },
    "correct_option": "b",
    "answer": "4",
    "topic": "Logarithm basics"
  },
  {
    "id": "logarithms-002",
    "question_number": 2,
    "question": "The value of log₃₄₃ 7 is",
    "options": {
      "a": "1/3",
      "b": "−3",
      "c": "−1/3",
      "d": "3"
    },
    "correct_option": "a",
    "answer": "1/3",
    "topic": "Logarithm basics"
  },
  {
    "id": "logarithms-003",
    "question_number": 3,
    "question": "The value of log₅ [(125 × 625) / 25] is equal to",
    "options": {
      "a": "725",
      "b": "5",
      "c": "3125",
      "d": "6"
    },
    "correct_option": "b",
    "answer": "5",
    "topic": "Logarithm properties"
  },
  {
    "id": "logarithms-004",
    "question_number": 4,
    "question": "The value of log_(√2) 32 is",
    "options": {
      "a": "5/2",
      "b": "5",
      "c": "10",
      "d": "1/10"
    },
    "correct_option": "c",
    "answer": "10",
    "topic": "Base change & surd bases"
  },
  {
    "id": "logarithms-005",
    "question_number": 5,
    "question": "Determine the value of log_(3√2) (1/18).",
    "options": {
      "a": "2",
      "b": "−2",
      "c": "√2",
      "d": "√3"
    },
    "correct_option": "b",
    "answer": "−2",
    "topic": "Surd bases"
  },
  {
    "id": "logarithms-006",
    "question_number": 6,
    "question": "The value of log₁₀ (0.0001) is",
    "options": {
      "a": "1/4",
      "b": "−1/4",
      "c": "−4",
      "d": "4"
    },
    "correct_option": "c",
    "answer": "−4",
    "topic": "Common logarithms"
  },
  {
    "id": "logarithms-007",
    "question_number": 7,
    "question": "The value of log_(0.01) (1000) is",
    "options": {
      "a": "1/3",
      "b": "−1/3",
      "c": "3/2",
      "d": "−3/2"
    },
    "correct_option": "d",
    "answer": "−3/2",
    "topic": "Decimal bases"
  },
  {
    "id": "logarithms-008",
    "question_number": 8,
    "question": "What is the value of [log₁₀ (5 log₁₀ 100)]²?",
    "options": {
      "a": "1",
      "b": "2",
      "c": "10",
      "d": "25"
    },
    "correct_option": "a",
    "answer": "1",
    "topic": "Nested logarithms"
  },
  {
    "id": "logarithms-009",
    "question_number": 9,
    "question": "The logarithm of 0.0625 to the base 2 is",
    "options": {
      "a": "−4",
      "b": "−2",
      "c": "0.25",
      "d": "0.5"
    },
    "correct_option": "a",
    "answer": "−4",
    "topic": "Logarithm basics"
  },
  {
    "id": "logarithms-010",
    "question_number": 10,
    "question": "The logarithm of 0.00001 to the base 0.01 is equal to",
    "options": {
      "a": "−5/2",
      "b": "5/2",
      "c": "3",
      "d": "5"
    },
    "correct_option": "b",
    "answer": "5/2",
    "topic": "Decimal bases"
  },
  {
    "id": "logarithms-011",
    "question_number": 11,
    "question": "If log₃ x = −2, then x is equal to",
    "options": {
      "a": "−9",
      "b": "−6",
      "c": "−8",
      "d": "1/9"
    },
    "correct_option": "d",
    "answer": "1/9",
    "topic": "Solving exponential equations"
  },
  {
    "id": "logarithms-012",
    "question_number": 12,
    "question": "If log₈ x = 2/3, then the value of x is",
    "options": {
      "a": "3/4",
      "b": "4/3",
      "c": "3",
      "d": "4"
    },
    "correct_option": "d",
    "answer": "4",
    "topic": "Solving exponential equations"
  },
  {
    "id": "logarithms-013",
    "question_number": 13,
    "question": "If log₈ p = 2.5 and log₂ q = 5, then",
    "options": {
      "a": "p = q^1.5",
      "b": "p² = q³",
      "c": "p = q⁵",
      "d": "p³ = q"
    },
    "correct_option": "a",
    "answer": "p = q^1.5",
    "topic": "Logarithmic equations"
  },
  {
    "id": "logarithms-014",
    "question_number": 14,
    "question": "If log_x (9/16) = −1/2, then x is equal to",
    "options": {
      "a": "3/4",
      "b": "4/3",
      "c": "81/256",
      "d": "256/81"
    },
    "correct_option": "d",
    "answer": "256/81",
    "topic": "Base evaluation"
  },
  {
    "id": "logarithms-015",
    "question_number": 15,
    "question": "If log_x 4 = 0.4, then the value of x is",
    "options": {
      "a": "1",
      "b": "4",
      "c": "16",
      "d": "32"
    },
    "correct_option": "d",
    "answer": "32",
    "topic": "Base evaluation"
  },
  {
    "id": "logarithms-016",
    "question_number": 16,
    "question": "If log₁₀₀₀₀ x = −1/4, then x is equal to (N.M.A.T., 2006)",
    "options": {
      "a": "1/10",
      "b": "1/100",
      "c": "1/1000",
      "d": "1/10000"
    },
    "correct_option": "a",
    "answer": "1/10",
    "topic": "Common logarithms"
  },
  {
    "id": "logarithms-017",
    "question_number": 17,
    "question": "If log_x 4 = 1/4, then x is equal to",
    "options": {
      "a": "16",
      "b": "64",
      "c": "128",
      "d": "256"
    },
    "correct_option": "d",
    "answer": "256",
    "topic": "Base evaluation"
  },
  {
    "id": "logarithms-018",
    "question_number": 18,
    "question": "If log_x (0.1) = −1/3, then the value of x is",
    "options": {
      "a": "10",
      "b": "100",
      "c": "1000",
      "d": "1/1000"
    },
    "correct_option": "c",
    "answer": "1000",
    "topic": "Base evaluation"
  },
  {
    "id": "logarithms-019",
    "question_number": 19,
    "question": "If log₃₂ x = 0.8, then x is equal to",
    "options": {
      "a": "25.6",
      "b": "16",
      "c": "10",
      "d": "12.8"
    },
    "correct_option": "b",
    "answer": "16",
    "topic": "Exponential representation"
  },
  {
    "id": "logarithms-020",
    "question_number": 20,
    "question": "If log_x y = 100 and log₂ x = 10, then the value of y is",
    "options": {
      "a": "2¹⁰",
      "b": "2¹⁰⁰",
      "c": "2¹⁰⁰⁰",
      "d": "2¹⁰⁰⁰⁰"
    },
    "correct_option": "c",
    "answer": "2¹⁰⁰⁰",
    "topic": "Nested logarithmic equations"
  },
  {
    "id": "logarithms-021",
    "question_number": 21,
    "question": "The value of log_(1/3) 81 is equal to",
    "options": {
      "a": "−27",
      "b": "−4",
      "c": "4",
      "d": "27"
    },
    "correct_option": "b",
    "answer": "−4",
    "topic": "Fractional bases"
  },
  {
    "id": "logarithms-022",
    "question_number": 22,
    "question": "The value of log_(2√3) (1728) is",
    "options": {
      "a": "3",
      "b": "5",
      "c": "6",
      "d": "9"
    },
    "correct_option": "c",
    "answer": "6",
    "topic": "Surd bases"
  },
  {
    "id": "logarithms-023",
    "question_number": 23,
    "question": "log(√8) / log 8 is equal to (M.B.A. 2004, I.A.F., 2002)",
    "options": {
      "a": "1/8",
      "b": "1/4",
      "c": "1/2",
      "d": "2"
    },
    "correct_option": "c",
    "answer": "1/2",
    "topic": "Logarithm ratios"
  },
  {
    "id": "logarithms-024",
    "question_number": 24,
    "question": "Which of the following statements is NOT correct? (M.B.A., 2003)",
    "options": {
      "a": "log₁₀ 10 = 1",
      "b": "log (2 + 3) = log (2 × 3)",
      "c": "log₁₀ 1 = 0",
      "d": "log(1 + 2 + 3) = log 1 + log 2 + log 3"
    },
    "correct_option": "b",
    "answer": "log (2 + 3) = log (2 × 3)",
    "topic": "Logarithm properties"
  },
  {
    "id": "logarithms-025",
    "question_number": 25,
    "question": "The value of (log₁₀ 1000) / (log₁₀ 10) is equal to (C.D.S., 2002)",
    "options": {
      "a": "0",
      "b": "1",
      "c": "2",
      "d": "3"
    },
    "correct_option": "d",
    "answer": "3",
    "topic": "Common logarithms"
  },
  {
    "id": "logarithms-026",
    "question_number": 26,
    "question": "log₁₀ (10 × 10² × 10³ × ... × 10⁹) is",
    "options": {
      "a": "10",
      "b": "20",
      "c": "45",
      "d": "55"
    },
    "correct_option": "c",
    "answer": "45",
    "topic": "Product of powers"
  },
  {
    "id": "logarithms-027",
    "question_number": 27,
    "question": "The value of log₂ (log₅ 625) is:",
    "options": {
      "a": "2",
      "b": "5",
      "c": "10",
      "d": "15"
    },
    "correct_option": "a",
    "answer": "2",
    "topic": "Nested logarithms"
  },
  {
    "id": "logarithms-028",
    "question_number": 28,
    "question": "If log₂ [log₃ (log₂ x)] = 1, then x is equal to: (M.B.A., 2007)",
    "options": {
      "a": "0",
      "b": "12",
      "c": "128",
      "d": "512"
    },
    "correct_option": "d",
    "answer": "512",
    "topic": "Nested logarithmic equations"
  },
  {
    "id": "logarithms-029",
    "question_number": 29,
    "question": "log₁₀ log₁₀ log₁₀ (10^10^10) is equal to",
    "options": {
      "a": "0",
      "b": "1",
      "c": "10",
      "d": "100"
    },
    "correct_option": "b",
    "answer": "1",
    "topic": "Nested logarithms"
  },
  {
    "id": "logarithms-030",
    "question_number": 30,
    "question": "The value of log₂ log₂ log₃ log₃ (27³) is",
    "options": {
      "a": "0",
      "b": "1",
      "c": "2",
      "d": "3"
    },
    "correct_option": "a",
    "answer": "0",
    "topic": "Nested logarithms"
  },
  {
    "id": "logarithms-031",
    "question_number": 31,
    "question": "The value of log₂ [log₂ {log₄ (log₄ 256⁴)}]",
    "options": {
      "a": "0",
      "b": "1",
      "c": "2",
      "d": "4"
    },
    "correct_option": "a",
    "answer": "0",
    "topic": "Nested logarithms"
  },
  {
    "id": "logarithms-032",
    "question_number": 32,
    "question": "If a^x = b^y, then",
    "options": {
      "a": "log a / log b = x / y",
      "b": "log a / log b = y / x",
      "c": "x / y = log b / log a",
      "d": "None of these"
    },
    "correct_option": "c",
    "answer": "x / y = log b / log a",
    "topic": "Exponential relations"
  },
  {
    "id": "logarithms-033",
    "question_number": 33,
    "question": "log 360 is equal to",
    "options": {
      "a": "2 log 2 + 3 log 3",
      "b": "3 log 2 + 2 log 3",
      "c": "3 log 2 + 2 log 3 – log 5",
      "d": "3 log 2 + 2 log 3 + log 5"
    },
    "correct_option": "d",
    "answer": "3 log 2 + 2 log 3 + log 5",
    "topic": "Prime factor expansion"
  },
  {
    "id": "logarithms-034",
    "question_number": 34,
    "question": "log₁₀(26/51) + log₁₀(119/91) − log₁₀(13/32) − log₁₀(64/39) is equal to",
    "options": {
      "a": "0",
      "b": "1",
      "c": "2",
      "d": "3"
    },
    "correct_option": "a",
    "answer": "0",
    "topic": "Logarithm simplification"
  },
  {
    "id": "logarithms-035",
    "question_number": 35,
    "question": "The value of (1/3) log₁₀ 125 − 2 log₁₀ 4 + log₁₀ 32 is",
    "options": {
      "a": "0",
      "b": "4/5",
      "c": "1",
      "d": "2"
    },
    "correct_option": "c",
    "answer": "1",
    "topic": "Logarithm simplification"
  },
  {
    "id": "logarithms-036",
    "question_number": 36,
    "question": "The value of log₁₀(1 + 1/1) + log₁₀(1 + 1/2) + log₁₀(1 + 1/3) + ... up to 99 terms is equal to",
    "options": {
      "a": "0",
      "b": "2",
      "c": "10",
      "d": "100"
    },
    "correct_option": "b",
    "answer": "2",
    "topic": "Telescoping log series"
  },
  {
    "id": "logarithms-037",
    "question_number": 37,
    "question": "What is the value of log(9/14) − log(15/16) + log(35/24)? (I.I.F.T., 2005)",
    "options": {
      "a": "0",
      "b": "1",
      "c": "2",
      "d": "3"
    },
    "correct_option": "a",
    "answer": "0",
    "topic": "Logarithm simplification"
  },
  {
    "id": "logarithms-038",
    "question_number": 38,
    "question": "2 log₁₀ 5 + (1/2) log₁₀ 8 − log₁₀ 4 is equal to (M.B.A., 2002)",
    "options": {
      "a": "2",
      "b": "4",
      "c": "2 + 2 log₁₀ 2",
      "d": "4 − 4 log₁₀ 2"
    },
    "correct_option": "a",
    "answer": "2",
    "topic": "Logarithm simplification"
  },
  {
    "id": "logarithms-039",
    "question_number": 39,
    "question": "The value of log₁₀ 2 + 16 log₁₀(16/15) + 12 log₁₀(25/24) + 7 log₁₀(81/80) is",
    "options": {
      "a": "0",
      "b": "1",
      "c": "2",
      "d": "3"
    },
    "correct_option": "b",
    "answer": "1",
    "topic": "Logarithm expansion"
  },
  {
    "id": "logarithms-040",
    "question_number": 40,
    "question": "If log_a (ab) = x, then log_b (ab) is (M.A.T., 2002)",
    "options": {
      "a": "1/x",
      "b": "x / (x + 1)",
      "c": "x / (x − 1)",
      "d": "x / (x − 1)"
    },
    "correct_option": "c",
    "answer": "x / (x − 1)",
    "topic": "Base change identities"
  },
  {
    "id": "logarithms-041",
    "question_number": 41,
    "question": "If log_a m = x, then log_(1/a) (1/m) equals",
    "options": {
      "a": "1 − x",
      "b": "1/x",
      "c": "−x",
      "d": "x"
    },
    "correct_option": "d",
    "answer": "x",
    "topic": "Base change identities"
  },
  {
    "id": "logarithms-042",
    "question_number": 42,
    "question": "If log₁₀ 2 = a and log₁₀ 3 = b, then log₅ 12 equals (M.B.A., 2010)",
    "options": {
      "a": "(a + b) / (1 + a)",
      "b": "(2a + b) / (1 + a)",
      "c": "(a + 2b) / (1 − a)",
      "d": "(2a + b) / (1 − a)"
    },
    "correct_option": "d",
    "answer": "(2a + b) / (1 − a)",
    "topic": "Expressing in terms of variables"
  },
  {
    "id": "logarithms-043",
    "question_number": 43,
    "question": "If log 2 = x, log 3 = y and log 7 = z, then the value of log (4 2/3) is",
    "options": {
      "a": "(2x + y − z) / 3",
      "b": "(x + 2y + z) / 3",
      "c": "(2x − y + z) / 3",
      "d": "(−2x + y + z) / 3"
    },
    "correct_option": "b",
    "answer": "(x + 2y + z) / 3",
    "topic": "Expressing in terms of variables"
  },
  {
    "id": "logarithms-044",
    "question_number": 44,
    "question": "If log₄ x + log₂ x = 6, then x is equal to",
    "options": {
      "a": "2",
      "b": "4",
      "c": "8",
      "d": "16"
    },
    "correct_option": "d",
    "answer": "16",
    "topic": "Base conversion equations"
  },
  {
    "id": "logarithms-045",
    "question_number": 45,
    "question": "If log₁₀ (x² − 6x + 10) = 0, then the value of x is",
    "options": {
      "a": "1",
      "b": "2",
      "c": "3",
      "d": "4"
    },
    "correct_option": "c",
    "answer": "3",
    "topic": "Quadratic log equations"
  },
  {
    "id": "logarithms-046",
    "question_number": 46,
    "question": "If log₁₀ x + log₁₀ y = 3 and log₁₀ x − log₁₀ y = 1, then x and y are respectively",
    "options": {
      "a": "10 and 100",
      "b": "100 and 10",
      "c": "1000 and 100",
      "d": "100 and 1000"
    },
    "correct_option": "b",
    "answer": "100 and 10",
    "topic": "System of log equations"
  },
  {
    "id": "logarithms-047",
    "question_number": 47,
    "question": "If log₁₀ x + log₁₀ 5 = 2, then x equals",
    "options": {
      "a": "15",
      "b": "20",
      "c": "25",
      "d": "100"
    },
    "correct_option": "b",
    "answer": "20",
    "topic": "Logarithmic equations"
  },
  {
    "id": "logarithms-048",
    "question_number": 48,
    "question": "If log₈ x + log₈ (1/6) = 1/3, then the value of x is",
    "options": {
      "a": "12",
      "b": "16",
      "c": "18",
      "d": "24"
    },
    "correct_option": "a",
    "answer": "12",
    "topic": "Logarithmic equations"
  },
  {
    "id": "logarithms-049",
    "question_number": 49,
    "question": "If log₁₀ 125 + log₁₀ 8 = x, then x is equal to (M.B.A., 2005)",
    "options": {
      "a": "1/3",
      "b": "0.064",
      "c": "−3",
      "d": "3"
    },
    "correct_option": "d",
    "answer": "3",
    "topic": "Product rule"
  },
  {
    "id": "logarithms-050",
    "question_number": 50,
    "question": "The value of (log₉ 27 + log₈ 32) is",
    "options": {
      "a": "7/2",
      "b": "19/6",
      "c": "4",
      "d": "7"
    },
    "correct_option": "b",
    "answer": "19/6",
    "topic": "Logarithm addition"
  },
  {
    "id": "logarithms-051",
    "question_number": 51,
    "question": "(log₅ 3) × (log₃ 625) equals",
    "options": {
      "a": "1",
      "b": "2",
      "c": "3",
      "d": "4"
    },
    "correct_option": "d",
    "answer": "4",
    "topic": "Chain rule of logs"
  },
  {
    "id": "logarithms-052",
    "question_number": 52,
    "question": "(log₅ 5) × (log₄ 9) × (log₃ 2) is equal to",
    "options": {
      "a": "1",
      "b": "3/2",
      "c": "2",
      "d": "5"
    },
    "correct_option": "a",
    "answer": "1",
    "topic": "Chain rule of logs"
  },
  {
    "id": "logarithms-053",
    "question_number": 53,
    "question": "If log₁₂ 27 = a, then log₆ 16 is",
    "options": {
      "a": "(3 − a) / (3 + a)",
      "b": "(3 + a) / (3 − a)",
      "c": "4(3 + a) / (3 − a)",
      "d": "4(3 − a) / (3 + a)"
    },
    "correct_option": "d",
    "answer": "4(3 − a) / (3 + a)",
    "topic": "Base change identities"
  },
  {
    "id": "logarithms-054",
    "question_number": 54,
    "question": "If log₁₀ 5 + log₁₀ (5x + 1) = log₁₀ (x + 5) + 1, then x is equal to",
    "options": {
      "a": "1",
      "b": "3",
      "c": "5",
      "d": "10"
    },
    "correct_option": "b",
    "answer": "3",
    "topic": "Linear log equations"
  },
  {
    "id": "logarithms-055",
    "question_number": 55,
    "question": "If log₅ (x² + x) − log₅ (x + 1) = 2, then the value of x is (M.B.A., 2007)",
    "options": {
      "a": "5",
      "b": "10",
      "c": "25",
      "d": "32"
    },
    "correct_option": "c",
    "answer": "25",
    "topic": "Quotient rule equations"
  },
  {
    "id": "logarithms-056",
    "question_number": 56,
    "question": "(1/2)(log x + log y) will equal log((x + y)/2) if (R.R.B., 2005)",
    "options": {
      "a": "y = 0",
      "b": "x/y = 1",
      "c": "x = y",
      "d": "2y = x"
    },
    "correct_option": "c",
    "answer": "x = y",
    "topic": "Algebraic log identities"
  },
  {
    "id": "logarithms-057",
    "question_number": 57,
    "question": "The value of 1/(log₃ 60) + 1/(log₄ 60) + 1/(log₅ 60) is",
    "options": {
      "a": "0",
      "b": "1",
      "c": "5",
      "d": "60"
    },
    "correct_option": "b",
    "answer": "1",
    "topic": "Reciprocal log property"
  },
  {
    "id": "logarithms-058",
    "question_number": 58,
    "question": "The value of (log₃ 4)(log₄ 5)(log₅ 6)(log₆ 7)(log₇ 8)(log₈ 9) is",
    "options": {
      "a": "2",
      "b": "7",
      "c": "8",
      "d": "33"
    },
    "correct_option": "a",
    "answer": "2",
    "topic": "Chain rule multiplication"
  },
  {
    "id": "logarithms-059",
    "question_number": 59,
    "question": "The value of 16^(log₄ 5) is",
    "options": {
      "a": "5/64",
      "b": "5",
      "c": "16",
      "d": "25"
    },
    "correct_option": "d",
    "answer": "25",
    "topic": "Exponent base property a^(log_a x) = x"
  },
  {
    "id": "logarithms-060",
    "question_number": 60,
    "question": "If log x + log y = log (x + y), then",
    "options": {
      "a": "x = y",
      "b": "xy = 1",
      "c": "y = (x − 1) / x",
      "d": "y = x / (x − 1)"
    },
    "correct_option": "d",
    "answer": "y = x / (x − 1)",
    "topic": "Expressing one variable in terms of another"
  },
  {
    "id": "logarithms-061",
    "question_number": 61,
    "question": "If log(a/b) + log(b/a) = log(a + b), then (M.B.A., 2007)",
    "options": {
      "a": "a + b = 1",
      "b": "a − b = 1",
      "c": "a = b",
      "d": "a² − b² = 1"
    },
    "correct_option": "a",
    "answer": "a + b = 1",
    "topic": "Logarithm addition"
  },
  {
    "id": "logarithms-062",
    "question_number": 62,
    "question": "log(a²/bc) + log(b²/ac) + log(c²/ab) is equal to (M.B.A., 2006)",
    "options": {
      "a": "0",
      "b": "1",
      "c": "2",
      "d": "abc"
    },
    "correct_option": "a",
    "answer": "0",
    "topic": "Symmetric logarithmic identities"
  },
  {
    "id": "logarithms-063",
    "question_number": 63,
    "question": "log_b a × log_c b × log_a c is equal to (Hotel Management, 2010)",
    "options": {
      "a": "a + b + c",
      "b": "abc",
      "c": "0",
      "d": "1"
    },
    "correct_option": "d",
    "answer": "1",
    "topic": "Cyclic base change"
  },
  {
    "id": "logarithms-064",
    "question_number": 64,
    "question": "1/(1 + log_a bc) + 1/(1 + log_b ca) + 1/(1 + log_c ab) is equal to (I.I.F.T., 2005)",
    "options": {
      "a": "1",
      "b": "3/2",
      "c": "2",
      "d": "3"
    },
    "correct_option": "a",
    "answer": "1",
    "topic": "Cyclic reciprocal log identities"
  },
  {
    "id": "logarithms-065",
    "question_number": 65,
    "question": "The value of 1/(1 + log_x(q/p) + log_x(r/p)) + 1/(1 + log_x(r/q) + log_x(p/q)) + 1/(1 + log_x(p/r) + log_x(q/r)) is",
    "options": {
      "a": "0",
      "b": "1",
      "c": "2",
      "d": "3"
    },
    "correct_option": "b",
    "answer": "1",
    "topic": "Cyclic reciprocal log identities"
  },
  {
    "id": "logarithms-066",
    "question_number": 66,
    "question": "If log₁₀ 7 = a, then log₁₀ (1/70) is equal to (C.D.S., 2003)",
    "options": {
      "a": "−(1 + a)",
      "b": "(1 + a)⁻¹",
      "c": "10 a",
      "d": "1 / (10a)"
    },
    "correct_option": "a",
    "answer": "−(1 + a)",
    "topic": "Common logarithms"
  },
  {
    "id": "logarithms-067",
    "question_number": 67,
    "question": "If a = b^x, b = c^y and c = a^z, then the value of xyz is equal to",
    "options": {
      "a": "−1",
      "b": "0",
      "c": "1",
      "d": "abc"
    },
    "correct_option": "c",
    "answer": "1",
    "topic": "Exponential relations"
  },
  {
    "id": "logarithms-068",
    "question_number": 68,
    "question": "If log x − 5 log 3 = −2, then x equals (M.B.A., 2011)",
    "options": {
      "a": "0.8",
      "b": "0.81",
      "c": "1.25",
      "d": "2.43"
    },
    "correct_option": "d",
    "answer": "2.43",
    "topic": "Logarithmic equations"
  },
  {
    "id": "logarithms-069",
    "question_number": 69,
    "question": "If a = b² = c³ = d⁴, then the value of log_a (abcd) would be (M.B.A., 2008)",
    "options": {
      "a": "log_a 1 + log_a 2 + log_a 3 + log_a 4",
      "b": "log_a 24",
      "c": "1 + 1/2 + 1/3 + 1/4",
      "d": "1 + 1/2! + 1/3! + 1/4!"
    },
    "correct_option": "c",
    "answer": "1 + 1/2 + 1/3 + 1/4",
    "topic": "Logarithms of equal powers"
  },
  {
    "id": "logarithms-070",
    "question_number": 70,
    "question": "If log₃ x + log₉ (x²) + log₂₇ (x³) = 9, then x equals (M.B.A., 2010)",
    "options": {
      "a": "3",
      "b": "9",
      "c": "27",
      "d": "None of these"
    },
    "correct_option": "c",
    "answer": "27",
    "topic": "Logarithm base powers"
  },
  {
    "id": "logarithms-071",
    "question_number": 71,
    "question": "If log₇ [log₅ (√(x + 5) + √x)] = 0, what is the value of x? (M.B.A., 2009)",
    "options": {
      "a": "2",
      "b": "3",
      "c": "4",
      "d": "5"
    },
    "correct_option": "c",
    "answer": "4",
    "topic": "Radical logarithmic equations"
  },
  {
    "id": "logarithms-072",
    "question_number": 72,
    "question": "If a = log₈ 225 and b = log₂ 15, then a in terms of b is (M.B.A., 2010)",
    "options": {
      "a": "b / 2",
      "b": "(2/3) b",
      "c": "b",
      "d": "(3/2) b"
    },
    "correct_option": "b",
    "answer": "(2/3) b",
    "topic": "Base change identities"
  },
  {
    "id": "logarithms-073",
    "question_number": 73,
    "question": "If log 27 = 1.431, then the value of log 9 is",
    "options": {
      "a": "0.934",
      "b": "0.945",
      "c": "0.954",
      "d": "0.958"
    },
    "correct_option": "c",
    "answer": "0.954",
    "topic": "Decimal log approximations"
  },
  {
    "id": "logarithms-074",
    "question_number": 74,
    "question": "If log₁₀ 2 = 0.3010, then log₂ 10 is equal to",
    "options": {
      "a": "699 / 301",
      "b": "1000 / 301",
      "c": "0.3010",
      "d": "0.6990"
    },
    "correct_option": "b",
    "answer": "1000 / 301",
    "topic": "Reciprocal log property"
  },
  {
    "id": "logarithms-075",
    "question_number": 75,
    "question": "If log₁₀ 2 = 0.3010, the value of log₁₀ 5 is",
    "options": {
      "a": "0.3241",
      "b": "0.6911",
      "c": "0.6990",
      "d": "0.7525"
    },
    "correct_option": "c",
    "answer": "0.6990",
    "topic": "Log 5 identity (1 - log 2)"
  },
  {
    "id": "logarithms-076",
    "question_number": 76,
    "question": "If log₁₀ 2 = 0.3010, the value of log₁₀ 80 is",
    "options": {
      "a": "1.6020",
      "b": "1.9030",
      "c": "3.9030",
      "d": "None of these"
    },
    "correct_option": "b",
    "answer": "1.9030",
    "topic": "Logarithm addition"
  },
  {
    "id": "logarithms-077",
    "question_number": 77,
    "question": "If log 3 = 0.4771 and (1000)^x = 3, then x equals",
    "options": {
      "a": "0.0159",
      "b": "0.0477",
      "c": "0.159",
      "d": "10"
    },
    "correct_option": "c",
    "answer": "0.159",
    "topic": "Exponential log equations"
  },
  {
    "id": "logarithms-078",
    "question_number": 78,
    "question": "If log₁₀ 2 = 0.3010, the value of log₁₀ 25 is",
    "options": {
      "a": "0.6020",
      "b": "1.2040",
      "c": "1.3980",
      "d": "1.5050"
    },
    "correct_option": "c",
    "answer": "1.3980",
    "topic": "Powers of 5"
  },
  {
    "id": "logarithms-079",
    "question_number": 79,
    "question": "If log₁₀ 20 = 1.3010 and log₁₀ 30 = 1.4771, then log₁₀ 60000 is equal to",
    "options": {
      "a": "0.7781",
      "b": "1.7781",
      "c": "2.7781",
      "d": "4.7781"
    },
    "correct_option": "d",
    "answer": "4.7781",
    "topic": "Logarithm addition"
  },
  {
    "id": "logarithms-080",
    "question_number": 80,
    "question": "If log 2 = 0.3010 and log 3 = 0.4771, the value of log₅ 512 is (M.A.T., 2002)",
    "options": {
      "a": "2.870",
      "b": "2.967",
      "c": "3.876",
      "d": "3.912"
    },
    "correct_option": "c",
    "answer": "3.876",
    "topic": "Base change calculation"
  },
  {
    "id": "logarithms-081",
    "question_number": 81,
    "question": "If log₁₀ 3 = 0.4771 and log₁₀ 7 = 0.8451, then the value of log₁₀ (2 1/3) is equal to",
    "options": {
      "a": "0.368",
      "b": "1.356",
      "c": "0.368",
      "d": "1.477"
    },
    "correct_option": "a",
    "answer": "0.368",
    "topic": "Fractional log evaluation"
  },
  {
    "id": "logarithms-082",
    "question_number": 82,
    "question": "If log₁₀ 2 = 0.3010 and log₁₀ 3 = 0.4771, then the value of log₁₀ 1.5 is",
    "options": {
      "a": "0.1761",
      "b": "0.7116",
      "c": "0.7161",
      "d": "0.7611"
    },
    "correct_option": "a",
    "answer": "0.1761",
    "topic": "Quotient rule"
  },
  {
    "id": "logarithms-083",
    "question_number": 83,
    "question": "If log₁₀ 2 = 0.3010 and log₁₀ 7 = 0.8451, then the value of log₁₀ 2.8 is",
    "options": {
      "a": "0.4471",
      "b": "1.4471",
      "c": "2.4471",
      "d": "None of these"
    },
    "correct_option": "a",
    "answer": "0.4471",
    "topic": "Decimal log evaluation"
  },
  {
    "id": "logarithms-084",
    "question_number": 84,
    "question": "If log (0.57) = −0.244 (bar 1.756), then the value of log 57 + log (0.57)³ + log 0.57 is",
    "options": {
      "a": "0.902",
      "b": "2.146",
      "c": "1.902",
      "d": "1.146"
    },
    "correct_option": "a",
    "answer": "0.902",
    "topic": "Mantissa and characteristic"
  },
  {
    "id": "logarithms-085",
    "question_number": 85,
    "question": "If the logarithm of a number is −3.153, what are characteristic and mantissa?",
    "options": {
      "a": "Characteristic = −4, mantissa = 0.847",
      "b": "Characteristic = −3, mantissa = −0.153",
      "c": "Characteristic = 4, mantissa = −0.847",
      "d": "Characteristic = 3, mantissa = −0.153"
    },
    "correct_option": "a",
    "answer": "Characteristic = −4, mantissa = 0.847",
    "topic": "Characteristic and mantissa"
  },
  {
    "id": "logarithms-086",
    "question_number": 86,
    "question": "If log 2 = 0.30103, the number of digits in 2⁶⁴ is",
    "options": {
      "a": "18",
      "b": "19",
      "c": "20",
      "d": "21"
    },
    "correct_option": "c",
    "answer": "20",
    "topic": "Number of digits in powers"
  },
  {
    "id": "logarithms-087",
    "question_number": 87,
    "question": "If log 2 = 0.30103, the number of digits in 4⁵⁰ is",
    "options": {
      "a": "30",
      "b": "31",
      "c": "100",
      "d": "200"
    },
    "correct_option": "b",
    "answer": "31",
    "topic": "Number of digits in powers"
  },
  {
    "id": "logarithms-088",
    "question_number": 88,
    "question": "If log 2 = 0.30103, then the number of digits in 5²⁰ is",
    "options": {
      "a": "14",
      "b": "16",
      "c": "18",
      "d": "25"
    },
    "correct_option": "a",
    "answer": "14",
    "topic": "Number of digits in powers"
  },
  {
    "id": "logarithms-089",
    "question_number": 89,
    "question": "If log 2 = 0.30103, log 3 = 0.47712, then the number of digits in 6²⁰ is",
    "options": {
      "a": "15",
      "b": "16",
      "c": "17",
      "d": "18"
    },
    "correct_option": "b",
    "answer": "16",
    "topic": "Number of digits in powers"
  },
  {
    "id": "logarithms-090",
    "question_number": 90,
    "question": "The number of digits in 4⁹ × 5¹⁷, when expressed in usual form, is",
    "options": {
      "a": "16",
      "b": "17",
      "c": "18",
      "d": "19"
    },
    "correct_option": "c",
    "answer": "18",
    "topic": "Number of digits in powers"
  },
  {
    "id": "logarithms-091",
    "question_number": 91,
    "question": "If log 3, log(3^x − 2) and log(3^x + 4) are in arithmetic progression, then x is equal to",
    "options": {
      "a": "8/3",
      "b": "log 3^8",
      "c": "log₃ 8",
      "d": "8"
    },
    "correct_option": "c",
    "answer": "log₃ 8",
    "topic": "Logarithms in Arithmetic Progression"
  },
  {
    "id": "logarithms-092",
    "question_number": 92,
    "question": "If log₁₀ a = p and log₁₀ b = q, then what is log₁₀ (a^p b^q) equal to?",
    "options": {
      "a": "p² + q²",
      "b": "p² − q²",
      "c": "p² q²",
      "d": "p² / q²"
    },
    "correct_option": "a",
    "answer": "p² + q²",
    "topic": "Logarithmic identities"
  }
];

const chapterData = {
  book: "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  chapter_number: 10,
  chapter: "Logarithms",
  book_page_range: "297–307",
  question_count: rawQuestions.length,
  key_concepts: [
    {
      topic: "Definition of Logarithm",
      formula: "If a is positive real (a ≠ 1) and a^m = x, then log_a x = m"
    },
    {
      topic: "Laws of Logarithms",
      formulas: [
        "log_a(xy) = log_a x + log_a y",
        "log_a(x/y) = log_a x − log_a y",
        "log_a(x^p) = p log_a x",
        "log_a a = 1, log_a 1 = 0",
        "log_a x = 1 / log_x a",
        "log_a x = log_b x / log_b a",
        "a^(log_a x) = x"
      ]
    },
    {
      topic: "Characteristic and Mantissa",
      explanation: "Characteristic is the integral part of log; Mantissa is the non-negative decimal part."
    }
  ],
  questions: rawQuestions
};

const targetPath = path.join(__dirname, '../server/data/rs_agrawal/logarithms.json');
fs.writeFileSync(targetPath, JSON.stringify(chapterData, null, 2), 'utf8');
console.log(`Successfully generated ${rawQuestions.length} questions in ${targetPath}`);
