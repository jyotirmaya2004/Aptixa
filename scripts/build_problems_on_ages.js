const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../server/data/rs_agrawal');
const outputFile = path.join(outputDir, 'problems_on_ages.json');

const rawQuestions = [
  {
    "id": "problems-on-ages-001",
    "question_number": 1,
    "question": "The ratio of the present ages of a mother and her daughter is 7 : 1. Four years ago, the ratio of their ages was 19 : 1. What will be the mother’s age four years from now? (S.B.I. P.O., 2010)",
    "options": {
      "a": "42 years",
      "b": "38 years",
      "c": "46 years",
      "d": "36 years",
      "e": "None of these"
    },
    "correct_option": "c",
    "answer": "46 years",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-002",
    "question_number": 2,
    "question": "The ages of Nishi and Vinnee are in the ratio 6 : 5 respectively. After 9 years, the ratio of their ages will be 9 : 8. What is the difference in their ages now? (Bank P.O., 2008)",
    "options": {
      "a": "3 years",
      "b": "5 years",
      "c": "7 years",
      "d": "9 years",
      "e": "None of these"
    },
    "correct_option": "a",
    "answer": "3 years",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-003",
    "question_number": 3,
    "question": "The present ages of Amit and his father are in the ratio 2 : 5 respectively. Four years hence, the ratio of their ages becomes 5 : 11 respectively. What was the father’s age five years ago? (Bank P.O., 2009)",
    "options": {
      "a": "30 years",
      "b": "35 years",
      "c": "40 years",
      "d": "45 years",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "35 years",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-004",
    "question_number": 4,
    "question": "The ratio of the ages of a father and his son is 17 : 7 respectively. Six years ago, the ratio of their ages was 3 : 1 respectively. What is the father’s present age? (Bank P.O., 2009)",
    "options": {
      "a": "64 years",
      "b": "51 years",
      "c": "48 years",
      "d": "Cannot be determined",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "51 years",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-005",
    "question_number": 5,
    "question": "The ages of Shakti and Kanti are in the ratio of 8 : 7 respectively. After 10 years, the ratio of their ages will be 13 : 12. What is the difference between their ages? (Bank P.O., 2008)",
    "options": {
      "a": "2 years",
      "b": "4 years",
      "c": "8 years",
      "d": "6 years",
      "e": "None of these"
    },
    "correct_option": "a",
    "answer": "2 years",
    "topic": "Age differences"
  },
  {
    "id": "problems-on-ages-006",
    "question_number": 6,
    "question": "The ages of A and B are in the ratio 6 : 5 and the sum of their ages is 44 years. What will be the ratio of their ages after 8 years? (P.C.S., 2008)",
    "options": {
      "a": "7 : 6",
      "b": "8 : 7",
      "c": "9 : 8",
      "d": "3 : 4"
    },
    "correct_option": "b",
    "answer": "8 : 7",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-007",
    "question_number": 7,
    "question": "Farah got married 8 years ago. Today her age is 2 1/7 times her age at the time of her marriage. At present her daughter's age is one-sixth of her age. What was her daughter’s age 3 years ago? (Bank P.O., 2009)",
    "options": {
      "a": "4 years",
      "b": "3 years",
      "c": "6 years",
      "d": "Cannot be determined",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "3 years",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-008",
    "question_number": 8,
    "question": "The age of a mother today is thrice that of her daughter. After 12 years, the age of the mother will be twice that of her daughter. The present age of the daughter is: (S.S.C., 2006)",
    "options": {
      "a": "12 years",
      "b": "14 years",
      "c": "16 years",
      "d": "18 years"
    },
    "correct_option": "a",
    "answer": "12 years",
    "topic": "Age-based algebraic equations"
  },
  {
    "id": "problems-on-ages-009",
    "question_number": 9,
    "question": "The present age of Mr. Sanyal is three times the age of his son. Six years hence, the ratio of their ages will be 5 : 2. What is the present age of Mr. Sanyal? (L.I.C., 2007)",
    "options": {
      "a": "48 years",
      "b": "50 years",
      "c": "54 years",
      "d": "60 years",
      "e": "None of these"
    },
    "correct_option": "c",
    "answer": "54 years",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-010",
    "question_number": 10,
    "question": "The average of the ages of a man and his daughter is 34 years. If the respective ratio of their ages four years from now is 14 : 5, what is daughter’s present age? (Bank P.O., 2008)",
    "options": {
      "a": "10 years",
      "b": "12 years",
      "c": "18 years",
      "d": "Cannot be determined",
      "e": "None of these"
    },
    "correct_option": "e",
    "answer": "None of these",
    "topic": "Average age"
  },
  {
    "id": "problems-on-ages-011",
    "question_number": 11,
    "question": "Ratio of Rani’s and Komal’s ages is 3 : 5 respectively. Ratio of Komal’s and Pooja’s ages is 2 : 3 respectively. If Rani is two-fifth of Pooja’s age, what is Rani’s age? (Bank P.O., 2009)",
    "options": {
      "a": "10 years",
      "b": "15 years",
      "c": "14 years",
      "d": "Cannot be determined",
      "e": "None of these"
    },
    "correct_option": "d",
    "answer": "Cannot be determined",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-012",
    "question_number": 12,
    "question": "The age of a father 10 years ago was thrice the age of his son. 10 years hence, the father’s age will be twice that of his son. The ratio of their present ages is (P.C.S., 2009)",
    "options": {
      "a": "8 : 5",
      "b": "7 : 3",
      "c": "9 : 5",
      "d": "5 : 2"
    },
    "correct_option": "c",
    "answer": "9 : 5",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-013",
    "question_number": 13,
    "question": "The ratio between the ages of Ram and Mohan is 4 : 5 and that between the ages of Ram and Anil is 5 : 6. If the sum of the ages of the three is 69 years, what is Mohan’s age? (Railways, 2008)",
    "options": {
      "a": "20 years",
      "b": "24 years",
      "c": "25 years",
      "d": "30 years"
    },
    "correct_option": "c",
    "answer": "25 years",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-014",
    "question_number": 14,
    "question": "At present, Suresh’s age is twice the age of his daughter. After 6 years from now, the ratio of the ages of Suresh and his daughter will be 23 : 13. What is the present age of Suresh? (Bank P.O., 2008)",
    "options": {
      "a": "36 years",
      "b": "40 years",
      "c": "46 years",
      "d": "Cannot be determined",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "40 years",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-015",
    "question_number": 15,
    "question": "The difference between the present ages of Arun and Deepak is 14 years. Seven years ago, the ratio of their ages was 5 : 7 respectively. What is Deepak’s present age? (Bank P.O., 2008)",
    "options": {
      "a": "35 years",
      "b": "42 years",
      "c": "49 years",
      "d": "56 years",
      "e": "None of these"
    },
    "correct_option": "d",
    "answer": "56 years",
    "topic": "Age differences"
  },
  {
    "id": "problems-on-ages-016",
    "question_number": 16,
    "question": "Ten years ago, a man was seven times as old as his son. Two years hence, twice his age will be equal to five times the age of his son. What is the present age of the son? (Railways, 2006)",
    "options": {
      "a": "12 years",
      "b": "13 years",
      "c": "14 years",
      "d": "15 years"
    },
    "correct_option": "c",
    "answer": "14 years",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-017",
    "question_number": 17,
    "question": "The ages of Samina and Suhana are in the ratio of 7 : 3 respectively. After 6 years, the ratio of their ages will be 5 : 3. What is the difference in their ages? (Bank P.O., 2008)",
    "options": {
      "a": "6 years",
      "b": "8 years",
      "c": "10 years",
      "d": "12 years",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "8 years",
    "topic": "Age differences"
  },
  {
    "id": "problems-on-ages-018",
    "question_number": 18,
    "question": "The ages of Sulekha and Arunima are in the ratio of 9 : 8 respectively. After 5 years, the ratio of their ages will be 10 : 9. What is the difference in their ages? (Bank P.O., 2008)",
    "options": {
      "a": "4 years",
      "b": "5 years",
      "c": "6 years",
      "d": "7 years",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "5 years",
    "topic": "Age differences"
  },
  {
    "id": "problems-on-ages-019",
    "question_number": 19,
    "question": "The ages of A and B are presently in the ratio of 5 : 6 respectively. Six years hence, this ratio will become 6 : 7 respectively. What was B’s age 5 years ago? (Bank P.O., 2009)",
    "options": {
      "a": "25 years",
      "b": "30 years",
      "c": "31 years",
      "d": "36 years",
      "e": "None of these"
    },
    "correct_option": "c",
    "answer": "31 years",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-020",
    "question_number": 20,
    "question": "The age of the mother today is thrice that of her daughter. After 12 years, the age of the mother will be twice that of her daughter. The age of the daughter today is (S.S.C., 2006)",
    "options": {
      "a": "12 years",
      "b": "14 years",
      "c": "16 years",
      "d": "18 years"
    },
    "correct_option": "a",
    "answer": "12 years",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-021",
    "question_number": 21,
    "question": "The sum of the ages of a daughter and her mother is 56 years. After four years, the age of the mother will be three times that of the daughter. At present their ages are (S.S.C., 2006)",
    "options": {
      "a": "10 years, 46 years",
      "b": "12 years, 44 years",
      "c": "11 years, 45 years",
      "d": "13 years, 43 years"
    },
    "correct_option": "b",
    "answer": "12 years, 44 years",
    "topic": "Age-based algebraic equations"
  },
  {
    "id": "problems-on-ages-022",
    "question_number": 22,
    "question": "The present age of son is half of the present age of his mother. Ten years ago, his mother’s age was thrice the age of her son. What is the present age of the son? (Railways, 2006)",
    "options": {
      "a": "20 years",
      "b": "25 years",
      "c": "30 years",
      "d": "40 years"
    },
    "correct_option": "a",
    "answer": "20 years",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-023",
    "question_number": 23,
    "question": "Ram’s son’s age is 1/3 of Ram’s wife’s age. Ram’s wife’s age is 4/5 of Ram’s age and Ram’s age is 3/5 of Ram’s father’s age. Find the age of Ram’s son, if Ram’s father is 50 years old. (Railways, 2005)",
    "options": {
      "a": "6 years",
      "b": "8 years",
      "c": "10 years",
      "d": "12 years"
    },
    "correct_option": "b",
    "answer": "8 years",
    "topic": "Age-based algebraic equations"
  },
  {
    "id": "problems-on-ages-024",
    "question_number": 24,
    "question": "Ratio between the ages of Subhash, Prasad and Amar is 3 : 6 : 7. If the difference between the ages of Prasad and Amar is 10 years, then what is the difference between the ages of Subhash and Prasad? (Railways, 2006)",
    "options": {
      "a": "5 years",
      "b": "10 years",
      "c": "20 years",
      "d": "30 years"
    },
    "correct_option": "d",
    "answer": "30 years",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-025",
    "question_number": 25,
    "question": "Rajan got married 8 years ago. His present age is 6/5 times his age at the time of his marriage. Rajan’s sister was 10 years younger to him at the time of his marriage. The age of Rajan’s sister is (M.A.T., 2005)",
    "options": {
      "a": "32 years",
      "b": "36 years",
      "c": "38 years",
      "d": "40 years"
    },
    "correct_option": "c",
    "answer": "38 years",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-026",
    "question_number": 26,
    "question": "The ages of two persons differ by 20 years. If 5 years ago, the older one be 5 times as old as the younger one, then their present ages are (M.A.T., 2004)",
    "options": {
      "a": "25 years, 5 years",
      "b": "30 years, 10 years",
      "c": "35 years, 15 years",
      "d": "50 years, 30 years"
    },
    "correct_option": "b",
    "answer": "30 years, 10 years",
    "topic": "Age differences"
  },
  {
    "id": "problems-on-ages-027",
    "question_number": 27,
    "question": "A couple has a son and a daughter. The age of the father is four times that of the son and the age of the daughter is one-third of that of her mother. The wife is 6 years younger to her husband and the sister is 3 years older than her brother. The mother’s age is (P.C.S., 2008)",
    "options": {
      "a": "42 years",
      "b": "48 years",
      "c": "54 years",
      "d": "63 years"
    },
    "correct_option": "c",
    "answer": "54 years",
    "topic": "Age-based algebraic equations"
  },
  {
    "id": "problems-on-ages-028",
    "question_number": 28,
    "question": "The present ages of three persons are in the proportion 4 : 7 : 9. Eight years ago, the sum of their ages was 56 years. The present age of the eldest person is",
    "options": {
      "a": "28 years",
      "b": "36 years",
      "c": "45 years",
      "d": "None of these"
    },
    "correct_option": "b",
    "answer": "36 years",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-029",
    "question_number": 29,
    "question": "In 10 years, A will be twice as old as B was 10 years ago. If A is now 9 years older than B, the present age of B is",
    "options": {
      "a": "19 years",
      "b": "29 years",
      "c": "39 years",
      "d": "49 years",
      "e": "None of these"
    },
    "correct_option": "c",
    "answer": "39 years",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-030",
    "question_number": 30,
    "question": "Reenu’s father was 38 years of age when she was born while her mother was 36 years old when her brother 4 years younger to her was born. What is the difference between the ages of her parents?",
    "options": {
      "a": "2 years",
      "b": "4 years",
      "c": "6 years",
      "d": "8 years",
      "e": "None of these"
    },
    "correct_option": "c",
    "answer": "6 years",
    "topic": "Age differences"
  },
  {
    "id": "problems-on-ages-031",
    "question_number": 31,
    "question": "The sum of the ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?",
    "options": {
      "a": "4 years",
      "b": "6 years",
      "c": "8 years",
      "d": "10 years",
      "e": "None of these"
    },
    "correct_option": "a",
    "answer": "4 years",
    "topic": "Age-based algebraic equations"
  },
  {
    "id": "problems-on-ages-032",
    "question_number": 32,
    "question": "A man was asked to state his age in years. His reply was, “Take my age 3 years hence, multiply it by 3 and then subtract 3 times my age 3 years ago and you will know how old I am.” What is the age of the man? (S.S.C., 2004)",
    "options": {
      "a": "18 years",
      "b": "20 years",
      "c": "24 years",
      "d": "32 years"
    },
    "correct_option": "a",
    "answer": "18 years",
    "topic": "Age-based algebraic equations"
  },
  {
    "id": "problems-on-ages-033",
    "question_number": 33,
    "question": "The sum of the ages of Jayant, Prem and Paras is 93 years. Ten years ago, the ratio of their ages was 2 : 3 : 4. What is the present age of Paras?",
    "options": {
      "a": "24 years",
      "b": "28 years",
      "c": "32 years",
      "d": "34 years",
      "e": "38 years"
    },
    "correct_option": "e",
    "answer": "38 years",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-034",
    "question_number": 34,
    "question": "The sum of the ages of a man and his son is 45 years. Five years ago, the product of their ages was 34. The man’s age is",
    "options": {
      "a": "40 years",
      "b": "45 years",
      "c": "50 years",
      "d": "55 years",
      "e": "None of these"
    },
    "correct_option": "e",
    "answer": "None of these",
    "topic": "Age-based algebraic equations"
  },
  {
    "id": "problems-on-ages-035",
    "question_number": 35,
    "question": "The ratio of a man’s age and his son’s age is 7 : 3 and the product of their ages is 756. The ratio of their ages after 6 years will be",
    "options": {
      "a": "5 : 2",
      "b": "2 : 1",
      "c": "11 : 7",
      "d": "13 : 9",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "2 : 1",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-036",
    "question_number": 36,
    "question": "Sonal is 40 years old and Nitya is 60 years old. How many years ago was the ratio of their ages 3 : 5?",
    "options": {
      "a": "5 years",
      "b": "10 years",
      "c": "20 years",
      "d": "37 years",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "10 years",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-037",
    "question_number": 37,
    "question": "The ratio between the present ages of A and B is 5 : 3 respectively. The ratio between A’s age 4 years ago and B’s age 4 years hence is 1 : 1. What is the ratio between A’s age 4 years hence and B’s age 4 years ago?",
    "options": {
      "a": "1 : 3",
      "b": "3 : 1",
      "c": "2 : 1",
      "d": "4 : 1",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "3 : 1",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-038",
    "question_number": 38,
    "question": "The ratio of the ages of a man and his wife is 4 : 3. After 4 years, this ratio will be 9 : 7. If at the time of their marriage, the ratio of their ages was 5 : 3, then how many years ago were they married?",
    "options": {
      "a": "8 years",
      "b": "10 years",
      "c": "12 years",
      "d": "15 years",
      "e": "None of these"
    },
    "correct_option": "c",
    "answer": "12 years",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-039",
    "question_number": 39,
    "question": "The ratio between the ages of Neelam and Shiny is 5 : 6 respectively. If the ratio between the one-third age of Neelam and half of Shiny’s age is 5 : 9, then what is Shiny’s age? (Bank P.O., 2002)",
    "options": {
      "a": "25 years",
      "b": "30 years",
      "c": "36 years",
      "d": "Cannot be determined",
      "e": "None of these"
    },
    "correct_option": "d",
    "answer": "Cannot be determined",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-040",
    "question_number": 40,
    "question": "18 years ago, a man was three times as old as his son. Now, the man is twice as old as his son. The sum of the present ages of the man and his son is (S.S.C., 2003)",
    "options": {
      "a": "54 years",
      "b": "72 years",
      "c": "105 years",
      "d": "108 years"
    },
    "correct_option": "d",
    "answer": "108 years",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-041",
    "question_number": 41,
    "question": "A man is aged three times more than his son Ronit. After 8 years, he would be two and a half times of Ronit’s age. After further 8 years, how many times would he be of Ronit’s age?",
    "options": {
      "a": "2 times",
      "b": "1 1/2 times",
      "c": "2 1/2 times",
      "d": "3 times"
    },
    "correct_option": "a",
    "answer": "2 times",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-042",
    "question_number": 42,
    "question": "One year ago, Promila was four times as old as her daughter Sakshi. Six years hence, Promila’s age will exceed her daughter’s age by 9 years. The ratio of the present ages of Promila and her daughter is",
    "options": {
      "a": "9 : 2",
      "b": "11 : 3",
      "c": "12 : 5",
      "d": "13 : 4",
      "e": "None of these"
    },
    "correct_option": "d",
    "answer": "13 : 4",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-043",
    "question_number": 43,
    "question": "The age of a man 10 years ago was thrice the age of his son. 10 years hence, the man’s age will be twice the age of his son. The ratio of their present ages is (L.I.C., 2003)",
    "options": {
      "a": "5 : 2",
      "b": "7 : 3",
      "c": "9 : 2",
      "d": "13 : 4"
    },
    "correct_option": "b",
    "answer": "7 : 3",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-044",
    "question_number": 44,
    "question": "Tanya’s grandfather was 8 times older to her 16 years ago. He would be 3 times of her age 8 years from now. 8 years ago, what was the ratio of Tanya’s age to that of her grandfather? (S.S.C., 2003)",
    "options": {
      "a": "1 : 2",
      "b": "1 : 5",
      "c": "3 : 8",
      "d": "None of these"
    },
    "correct_option": "d",
    "answer": "None of these",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-045",
    "question_number": 45,
    "question": "The difference between the ages of two men is 10 years. 15 years ago, the elder one was twice as old as the younger one. The present age of the elder man is",
    "options": {
      "a": "25 years",
      "b": "35 years",
      "c": "45 years",
      "d": "52 years",
      "e": "55 years"
    },
    "correct_option": "b",
    "answer": "35 years",
    "topic": "Age differences"
  },
  {
    "id": "problems-on-ages-046",
    "question_number": 46,
    "question": "6 years ago, the ratio of the ages of Kunal and Sagar was 6 : 5. Four years hence, the ratio of their ages will be 11 : 10. What is Sagar’s age at present? (Bank P.O., 2009)",
    "options": {
      "a": "16 years",
      "b": "18 years",
      "c": "20 years",
      "d": "Cannot be determined",
      "e": "None of these"
    },
    "correct_option": "a",
    "answer": "16 years",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-047",
    "question_number": 47,
    "question": "Sneh’s age is 1/6 of her father’s age. Sneh’s father’s age will be twice of Vimal’s age after 10 years. If Vimal’s 8th birthday was celebrated 2 years ago, then what is Sneh’s present age?",
    "options": {
      "a": "6 2/3 years",
      "b": "10 years",
      "c": "12 years",
      "d": "15 years",
      "e": "None of these"
    },
    "correct_option": "a",
    "answer": "6 2/3 years",
    "topic": "Age-based algebraic equations"
  },
  {
    "id": "problems-on-ages-048",
    "question_number": 48,
    "question": "The ages of Samina and Suhana are in the ratio of 7 : 3 respectively. After 6 years, the ratio of their ages will be 5 : 3. What is the difference in their ages? (Bank P.O., 2008)",
    "options": {
      "a": "6 years",
      "b": "8 years",
      "c": "10 years",
      "d": "12 years",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "8 years",
    "topic": "Age differences"
  },
  {
    "id": "problems-on-ages-049",
    "question_number": 49,
    "question": "The ages of Sulekha and Arunima are in the ratio 9 : 8 respectively. After 5 years, the ratio of their ages will be 10 : 9. What is the difference in their ages? (Bank P.O., 2008)",
    "options": {
      "a": "4 years",
      "b": "5 years",
      "c": "6 years",
      "d": "7 years",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "5 years",
    "topic": "Age differences"
  },
  {
    "id": "problems-on-ages-050",
    "question_number": 50,
    "question": "Three years ago, the ratio of the ages of Amisha and Nimisha was 8 : 9 respectively. 3 years hence, the ratio of their ages will be 11 : 12 respectively. What is the present age of Amisha? (Bank P.O., 2009)",
    "options": {
      "a": "16 years",
      "b": "19 years",
      "c": "21 years",
      "d": "Cannot be determined",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "19 years",
    "topic": "Present, past and future ages"
  },
  {
    "id": "problems-on-ages-051",
    "question_number": 51,
    "question": "If 10 years are subtracted from the present age of Mr. Roy and the remainder divided by 14, then you would get the present age of his grandson Sachin. If Sachin is 9 years younger to Saloni whose age is 14 years, then what is the present age of Mr. Roy?",
    "options": {
      "a": "60 years",
      "b": "70 years",
      "c": "74 years",
      "d": "80 years",
      "e": "None of these"
    },
    "correct_option": "d",
    "answer": "80 years",
    "topic": "Age-based algebraic equations"
  },
  {
    "id": "problems-on-ages-052",
    "question_number": 52,
    "question": "X’s age 3 years ago was three times the present age of Y. At present, Z’s age is twice the age of Y. Also Z is 12 years younger than X. What is the present age of Z? [IBPS—RRB Officer’s Gr. ‘B’ Exam, 2015]",
    "options": {
      "a": "15 year",
      "b": "24 year",
      "c": "12 year",
      "d": "18 year",
      "e": "6 year"
    },
    "correct_option": "d",
    "answer": "18 year",
    "topic": "Age-based algebraic equations"
  },
  {
    "id": "problems-on-ages-053",
    "question_number": 53,
    "question": "Eight year ago, Poorvi’s age was equal to the sum of the present ages of her one son and one daughter. Five years hence, the respective ratio between the ages of her daughter and her son that time will be 7 : 6. If Poorvi’s husband is 7 years elder to her and his present age is three times the present age of their son, what is the present age of the daughter? (in years) [RBI Gr. ‘B’ (Phase I) Exam, 2015]",
    "options": {
      "a": "15 years",
      "b": "23 years",
      "c": "19 years",
      "d": "27 years",
      "e": "13 years"
    },
    "correct_option": "b",
    "answer": "23 years",
    "topic": "Age-based algebraic equations"
  },
  {
    "id": "problems-on-ages-054",
    "question_number": 54,
    "question": "The sum of present ages of a father and his son is 8 years more than the present age of the mother. The mother is 22 years older than the son. What will be the age of the father after 4 years? [United India Insurance Co. Ltd., (UIICL) Assistant (Online) Exam, 2015]",
    "options": {
      "a": "34 years",
      "b": "36 years",
      "c": "40 years",
      "d": "38 years",
      "e": "28 years"
    },
    "correct_option": "a",
    "answer": "34 years",
    "topic": "Age-based algebraic equations"
  },
  {
    "id": "problems-on-ages-055",
    "question_number": 55,
    "question": "Rahul is as much younger than Sagar as he is older than Purav. If the sum of the ages of Purav and Sagar is 66 years, and Sagar’s age is 48 years, then what is Purav’s age? (in years) [NICL—AAO Exam, 2015]",
    "options": {
      "a": "18",
      "b": "cannot be determined",
      "c": "16",
      "d": "20",
      "e": "12"
    },
    "correct_option": "a",
    "answer": "18",
    "topic": "Age-based algebraic equations"
  },
  {
    "id": "problems-on-ages-056",
    "question_number": 56,
    "question": "4 years ago, the ratio of 1/2 of A’s age at that time and four times of B’s age at the time was 5 : 12. Eight years hence, 1/2 of A’s age at that time will be less than B’s age at that time by 2 years. What is B’s present age? [IBPS—RRB Officers Exam, 2015]",
    "options": {
      "a": "10 years",
      "b": "14 years",
      "c": "12 years",
      "d": "5 years",
      "e": "8 years"
    },
    "correct_option": "a",
    "answer": "10 years",
    "topic": "Age ratios"
  },
  {
    "id": "problems-on-ages-057",
    "question_number": 57,
    "question": "Ten years hence, the respective ratio between Simmi’s age and Niti’s age will be 7 : 9. Two years ago, the respective ratio between Simmi’s age and Niti’s age was 1 : 3. If Abhay is 4 years older to his sister Niti, what is Abhay’s present age? (in years) [CET—Maharashtra (MBA) Exam, 2016]",
    "options": {
      "a": "8",
      "b": "4",
      "c": "16",
      "d": "12",
      "e": "20"
    },
    "correct_option": "d",
    "answer": "12",
    "topic": "Age ratios"
  }
];

const chapterData = {
  book: "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  chapter_number: 8,
  chapter: "Problems on Ages",
  book_page_range: "264–277",
  question_count: rawQuestions.length,
  source_note: "Extracted from the uploaded R.S. Aggarwal book. Exercise-A objective questions, options, and the source answer key are retained.",
  key_concepts: [
    "Age ratios",
    "Present, past and future ages",
    "Age differences",
    "Average age",
    "Age-based algebraic equations"
  ],
  questions: rawQuestions
};

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(chapterData, null, 2), 'utf8');
console.log(`Successfully generated ${rawQuestions.length} questions in ${outputFile}`);
