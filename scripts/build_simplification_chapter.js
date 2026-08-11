const fs = require('fs');
const path = require('path');

const key_explanation = {
  "title": "Key explanation from the book",
  "topics": [
    {
      "topic": "BODMAS Rule",
      "explanation": "The chapter defines BODMAS as Bracket, Of, Division, Multiplication, Addition and Subtraction. Brackets are handled first in the order ( ), { }, [ ], followed by the remaining operations in that sequence."
    },
    {
      "topic": "Modulus",
      "explanation": "The modulus of a positive real number is the number itself; for a negative real number, its negative is taken, giving a non-negative result."
    },
    {
      "topic": "Vinculum / Bar",
      "explanation": "When an expression contains a vinculum (bar), simplify the expression under the bar before applying the BODMAS rule."
    },
    {
      "topic": "Algebraic identities",
      "explanation": "The book lists identities for squares, difference of squares, cubes and sums/differences of cubes, (a+b+c)², and a³+b³+c³−3abc. These are used as shortcuts when simplifying expressions."
    },
    {
      "topic": "Set-counting formulae",
      "explanation": "For two sets A and B, the chapter gives relationships among A−B, B−A, A∩B and A∪B, including n(A∪B)=n(A)+n(B)−n(A∩B)."
    }
  ]
};

// We will construct the questions array cleanly
const questions = [];

// Helper to add clean question
function addQ(num, qText, opts, corr, ans) {
  const idStr = `simplification-${String(num).padStart(3, '0')}`;
  questions.push({
    id: idStr,
    chapter: "Simplification",
    question_number: num,
    question: qText.trim(),
    options: opts,
    correct_option: corr.toLowerCase(),
    answer: String(ans).trim()
  });
}

// 1 - 20
addQ(1, "What is 304 times 141? (Bank Recruitment, 2009)", { a: "39640", b: "38760", c: "42864", d: "45942", e: "None of these" }, "c", "42864");
addQ(2, "If A + B = 96 and A is half of B, then the value of A will be:", { a: "22", b: "32", c: "48", d: "64", e: "None of these" }, "b", "32");
addQ(3, "1888 ÷ 32 ÷ 8 = ? (Bank P.O., 2008)", { a: "7.375", b: "9.485", c: "29.5", d: "472", e: "None of these" }, "a", "7.375");
addQ(4, "– 76 × 33 + 221 = ? (NABARD, 2009)", { a: "– 2287", b: "2287", c: "– 19304", d: "19304", e: "None of these" }, "a", "– 2287");
addQ(5, "4848 ÷ 24 × 11 – 222 = ? (Bank P.O., 2010)", { a: "200", b: "2444", c: "2000", d: "31158", e: "None of these" }, "c", "2000");
addQ(6, "(425 × 4000) ÷ 16000 × 12 = ? (Bank Recruitment, 2009)", { a: "8.85", b: "925", c: "1275", d: "1700", e: "None of these" }, "c", "1275");
addQ(7, "[(84)² ÷ 28 × 12] ÷ 24 = 7 × ? (Bank P.O., 2009)", { a: "15", b: "17", c: "19", d: "21", e: "None of these" }, "e", "None of these");
addQ(8, "(98764 + 89881 + 99763 + 66342) ÷ (1186 + ? + 1040 + 1870) = 55 (Bank Recruitment, 2008)", { a: "2254", b: "2354", c: "2368", d: "2404", e: "None of these" }, "b", "2354");
addQ(9, "1148 ÷ 28 × 1408 ÷ 32 = ? (S.B.I.P.O., 2008)", { a: "1800", b: "1804", c: "1814", d: "1822", e: "None of these" }, "b", "1804");
addQ(10, "– 224 + (– 314) × (– 9) = ?", { a: "– 547", b: "– 2602", c: "547", d: "2602", e: "None of these" }, "d", "2602");
addQ(11, "853 + ? ÷ 17 = 1000", { a: "2482", b: "2499", c: "2516", d: "16147", e: "None of these" }, "b", "2499");
addQ(12, "(? – 968) ÷ 79 × 4 = 512 (Bank Recruitment, 2007)", { a: "10185", b: "10190", c: "11075", d: "11080", e: "None of these" }, "d", "11080");
addQ(13, "[(125)² ÷ 50 × 20] ÷ 25 = ?", { a: "11", b: "100", c: "150", d: "250", e: "None of these" }, "d", "250");
addQ(14, "999 × 99 × 9 ÷ 99 ÷ 9 ÷ 3 = ? (Bank P.O., 2009)", { a: "99", b: "111", c: "333", d: "999", e: "None of these" }, "c", "333");
addQ(15, "If a, b, c, ........., x, y, z are 26 natural numbers, then the value of (x – a)(x – b)(x – c).........(x – y)(x – z) is:", { a: "0", b: "1", c: "13", d: "26" }, "a", "0");
addQ(16, "Simplify: 1 - [1 - {1 - (1 - 1 - 1)}]", { a: "0", b: "1", c: "2", d: "3" }, "a", "0");
addQ(17, "What mathematical operation should come at the place of '?' in the equation: 2 ? 6 – 12 ÷ 4 + 2 = 11.", { a: "+", b: "–", c: "×", d: "÷" }, "c", "×");
addQ(18, "If 45 – [28 – {37 – (15 – *)}] = 58, then * is equal to:", { a: "– 29", b: "– 19", c: "19", d: "29" }, "c", "19");
addQ(19, "Solve for ?: (343/216) × (49/16) ÷ (81/?) = 7/6 (Bank P.O., 2010)", { a: "7/6", b: "6/7", c: "8/7", d: "6", e: "None of these" }, "a", "7/6");
addQ(20, "The value of x in the equation (11/3) ÷ (4/7) × (2/5) × x = 5 is: (P.C.S., 2008)", { a: "21", b: "27", c: "35", d: "42" }, "a", "21");

// 21 - 40
addQ(21, "(18 × 14 - 6 × 8) / (488 ÷ 4 - 20) = ? (L.I.C.A.D.O., 2007)", { a: "1/2", b: "3/4", c: "2", d: "4", e: "None of these" }, "c", "2");
addQ(22, "(5 + 5 + 5 + 5) / 5 ÷ (7 + 7 + 7 + 7) / 7 = ?", { a: "1/7", b: "3/7", c: "5/7", d: "13/14" }, "c", "5/7");
addQ(23, "(3/4 + 2/3) / (4/3 + 2/3 × 3/4) = ?", { a: "7/36", b: "11/18", c: "3/2", d: "9/4" }, "c", "3/2");
addQ(24, "(4 + 4 × 18 - 6 - 8) / (123 × 6 - 146 × 5) = ?", { a: "1", b: "2", c: "6.65", d: "7.75" }, "d", "7.75");
addQ(25, "(180 × 15 - 12 × 20) / (140 × 8 + 2 × 55) = ?", { a: "1/7", b: "4/5", c: "2", d: "4", e: "None of these" }, "c", "2");
addQ(26, "Evaluate: (8 - |5 - (-3)|) / (2|5 - 3| - |5 - 8| × 3)", { a: "2", b: "3", c: "4", d: "5" }, "d", "5");
addQ(27, "Given that (1² + 2² + 3² + ..... + 10²) = 385, the value of (2² + 4² + 6² + ..... + 20²) is equal to: (M.B.A., 2006)", { a: "770", b: "1155", c: "1540", d: "(385)²" }, "c", "1540");
addQ(28, "1 1/4 + 1 1/3 - 4 1/2 = ? (Bank Recruitment, 2010)", { a: "-1 1/12", b: "11/12", c: "-11/12", d: "1 1/12", e: "None of these" }, "c", "-11/12");
addQ(29, "4 3/7 - 1 3/14 + 3/28 = ? (Bank P.O., 2010)", { a: "3 1/28", b: "1 3/14", c: "3 3/14", d: "1 3/28", e: "None of these" }, "a", "3 1/28");
addQ(30, "3 3/4 - 1 1/5 + 5 1/8 = ? (Bank Recruitment, 2010)", { a: "7 27/40", b: "7 3/40", c: "5 9/8", d: "7 10/8", e: "None of these" }, "a", "7 27/40");
addQ(31, "12 1/3 + 10 5/6 - 7 2/3 - 1 4/7 = ? (Bank P.O., 2008)", { a: "13 11/14", b: "11 13/14", c: "13 13/14", d: "11 14/13", e: "None of these" }, "c", "13 13/14");
addQ(32, "6 9/13 - 4 4/11 + 2 2/5 = ? (Bank P.O., 2006)", { a: "4 596/715", b: "4 521/715", c: "9 324/715", d: "9 386/715", e: "None of these" }, "b", "4 521/715");
addQ(33, "1 + 1/2 + 1/4 + 1/7 + 1/14 + 1/28 is equal to:", { a: "2", b: "2.5", c: "3", d: "3.5" }, "a", "2");
addQ(34, "1 / (1 + 1 / (3 + 1 / (2 + 1/4))) is equal to:", { a: "7/14", b: "12/49", c: "1 4/12", d: "None of these" }, "d", "None of these");
addQ(35, "5/6 - 8/9 - 5/3 = ?", { a: "2/3", b: "3/2", c: "17/18", d: "3" }, "c", "17/18");
addQ(36, "If x + 1 / (1 + 1 / (3 + 1/2)) = 2, then x = ?", { a: "5/18", b: "6/19", c: "18/5", d: "24/11" }, "b", "6/19");
addQ(37, "(532 × 432) / (648 × 588) = ? (L.I.C.A.D.O., 2007)", { a: "2/21", b: "38/63", c: "21/64", d: "19/21", e: "None of these" }, "b", "38/63");
addQ(38, "10 2/11 × 1 17/36 × 1 1/7 × 6 = ?", { a: "397 6/5", b: "1 397/2", c: "1193 6/5", d: "1 1193/2", e: "None of these" }, "d", "1 1193/2");
addQ(39, "3/7 of 455 + 5/8 of 456 = ? (Bank Recruitment, 2009)", { a: "448", b: "464", c: "476", d: "480", e: "None of these" }, "d", "480");
addQ(40, "3/5 of 4/7 of 5/9 of 21/24 of 504 = ?", { a: "63", b: "69", c: "96", d: "109", e: "None of these" }, "e", "None of these");

// 41 - 60
addQ(41, "5 1/6 × 2 1/3 + 6 1/3 × 5 1/2 = ?", { a: "1 112/3", b: "2 116/3", c: "240", d: "663", e: "None of these" }, "e", "None of these");
addQ(42, "4/5 ÷ 2 4/5 = ? (Bank Recruitment, 2009)", { a: "3/4", b: "5/7", c: "5/8", d: "7/11", e: "None of these" }, "a", "3/4");
addQ(43, "1 1/4 + 5/9 × 1 5/8 ÷ 6 1/2 = ? (Bank P.O., 2009)", { a: "17", b: "27", c: "18", d: "42", e: "None of these" }, "e", "None of these");
addQ(44, "(225/836) × (152/245) ÷ (43/77) = ? (Bank Recruitment, 2009)", { a: "6/49", b: "6/11", c: "3/28", d: "1/7", e: "None of these" }, "c", "3/28");
addQ(45, "2 2/5 - 1 1/15 ÷ 4 8/81 = ?", { a: "9/119", b: "9/113", c: "8 2/13", d: "2 3/19", e: "None of these" }, "e", "None of these");
addQ(46, "(3/1480) × (6/4) ÷ (18/37) = ?", { a: "7 11/12", b: "4 11/5", c: "5 12/12", d: "4 12/5", e: "None of these" }, "d", "4 12/5");
addQ(47, "(3/2) × (11/5) ÷ (25/44) × (11/5) ÷ (33/15) = ?", { a: "1/2", b: "2/3", c: "126/125", d: "101 5/125", e: "None of these" }, "e", "None of these");
addQ(48, "If 3 2/5 × y/x = 10 7/10, then the values of x and y respectively, would be:", { a: "3, 4", b: "5, 7", c: "4, 3", d: "4, 4" }, "d", "4, 4");
addQ(49, "1 + 1/2 ÷ 1 + 2/3 ÷ 1 + 1/3 is equal to:", { a: "4 1/5", b: "1 2/4", c: "1 4/5", d: "1 5/4" }, "a", "4 1/5");
addQ(50, "Simplify: (10 1/8 of 12/15) ÷ (35/36 of 20/49):", { a: "5 17/12", b: "8 17/17", c: "3 20/25", d: "103 20/250" }, "d", "103 20/250");
addQ(51, "When (1/2 - 1/4 + 1/5 - 1/6) is divided by (2/5 - 5/9 + 3/5 - 7/18), the result is:", { a: "3/10", b: "10/3", c: "– 2", d: "1/110" }, "a", "3/10");
addQ(52, "Simplify: (2/5 - 5/9 + 3/5 - 7/18) ÷ (1/2 - 1/4 + 1/5 - 1/6):", { a: "1 2/18", b: "1 3/6", c: "3 3/10", d: "1 5/10" }, "d", "1 5/10");
addQ(53, "Which of the following can be used to compute 1/2 × 34 4/4?", { a: "1/2 × (30 + 4) + 4/4", b: "1/2 × (34 + 40)", c: "1/2 × 30 + 4 × 4", d: "1/2 × [34 × (30 + 4) + (4 × 4)]" }, "d", "1/2 × [34 × (30 + 4) + (4 × 4)]");
addQ(54, "3/5 of 168 × 15/549 ÷ 5/9 + 235/8 = ?", { a: "107", b: "174", c: "189", d: "296", e: "None of these" }, "a", "107");
addQ(55, "Find the value of * in: (2 1/3 ÷ 2 1/7) × * = (1 1/7 × 1 3/4) ÷ 3 1/6 (S.S.C., 2002)", { a: "0.006", b: "1/6", c: "0.6", d: "6" }, "d", "6");
addQ(56, "2 2/3 ÷ 5/5 × 5/6 = ?", { a: "2", b: "3", c: "4", d: "None of these" }, "a", "2");
addQ(57, "Supply the two missing figures in order indicated by x and y in 1 3/y × x/5 = 4 20/21 (IGNOU, 2003)", { a: "3, 1", b: "3, 3", c: "4, 1", d: "5, 3" }, "b", "3, 3");
addQ(58, "The difference of 3 1/16 and its reciprocal is equal to: (M.A.T., 2002)", { a: "1 1/18", b: "4/3", c: "15/16", d: "None of these" }, "d", "None of these");
addQ(59, "How many 1/8 s are there in 37 1/2?", { a: "300", b: "400", c: "500", d: "Cannot be determined" }, "a", "300");
addQ(60, "Let a = (4 ÷ 3) ÷ 3 ÷ 4, b = 4 ÷ (3 ÷ 3) ÷ 4, c = 4 ÷ 3 ÷ (3 ÷ 4). The maximum value among the above three is: (I.A.M., 2007)", { a: "a", b: "b", c: "c", d: "All equal" }, "c", "c");

// 61 - 80
addQ(61, "If I = 3 ÷ 4/5 ÷ 6, II = 3 ÷ [(4 ÷ 5) ÷ 6], III = [3 ÷ (4 ÷ 5)] ÷ 6, IV = 3 ÷ 4 ÷ (5 ÷ 6), then: (A.A.O., 2009)", { a: "I and II are equal", b: "I and III are equal", c: "I and IV are equal", d: "All are equal" }, "c", "I and IV are equal");
addQ(62, "The value of (5/7 of 1 6/13) ÷ (5/7 of 1 4/13) is:", { a: "20/169", b: "1", c: "5/4", d: "119/1180" }, "c", "5/4");
addQ(63, "3 4/3 ÷ 2 2/3 ÷ 1 1/12 = ?", { a: "39/48", b: "1 1/4", c: "169/144", d: "None of these" }, "d", "None of these");
addQ(64, "The value of (2/5 of 3/4) ÷ (1 1/6 of 2/3) × 3 1/2 is:", { a: "1/2", b: "2/3", c: "1", d: "2" }, "d", "2");
addQ(65, "(4335/289) ÷ (7 1/8 of 4/528) = ?", { a: "1", b: "2", c: "8", d: "None of these" }, "b", "2");
addQ(66, "(1 2/3 - 1 1/3 ÷ 1 5/7) ÷ (3 1/3 + 3 3/5 ÷ 3 5/7) = ?", { a: "1 1/2", b: "1 2/3", c: "1 3/4", d: "None of these" }, "d", "None of these");
addQ(67, "2/9 of 3/11 of 7/9 of 1 1/7 of 3 3/5 = ? (S.S.C., 2002)", { a: "5/4", b: "8", c: "32 8/81", d: "9" }, "b", "8");
addQ(68, "(5/6 ÷ 6/7 × 8/9) ÷ (3/5 of 3/4 + 1/3 × 7/9) = ?", { a: "7/6", b: "6/7", c: "1", d: "None of these" }, "b", "6/7");
addQ(69, "The value of (1 1/3 - 1/2 of 3 1/4) ÷ (2 1/3 + 1 1/2) is:", { a: "7/18", b: "49/54", c: "2/3", d: "1/6" }, "c", "2/3");
addQ(70, "A student was asked to solve the fraction (1 3/4 - 4/5 of 5/6) / (2 1/3 + 1/4 of 4/5) and his answer was 1/4. By how much was his answer wrong?", { a: "1", b: "1/55", c: "1/220", d: "None of these" }, "d", "None of these");
addQ(71, "(1 2/3 - 1/6) / (1 1/3 + 1 1/2) is equal to:", { a: "1/63", b: "23/40", c: "23/55", d: "23/63" }, "d", "23/63");
addQ(72, "Find the value of (1 3/4 - 1/3) / (2 1/3 + 1/4):", { a: "3/20", b: "4/21", c: "8/21", d: "13/21" }, "b", "4/21");
addQ(73, "If (1 1/2 of 3 1/4) ÷ (2 1/2 of 2 1/3) × (2 1/2 - 1/3) is simplified, we get: (R.R.B., 2006)", { a: "1/2", b: "7/8", c: "5/18", d: "3/2" }, "c", "5/18");
addQ(74, "The value of (5 2/3 - 2 1/5) ÷ (2 1/2 - 1 7/9) is: (I.I.F.T., 2005)", { a: "3/4", b: "24/25", c: "1", d: "1 1/24" }, "d", "1 1/24");
addQ(75, "{5 2/3 of (2 1/5 ÷ 2 1/2)} ÷ 7/116 = ? (M.C.A., 2005)", { a: "1 1/3", b: "13 2/49", c: "7/116", d: "3 2/5" }, "c", "7/116");
addQ(76, "The simplified value of (1/3 ÷ 1/3 × 1/3) / (1/3 ÷ 1/3 of 1/3) - 1/9 is:", { a: "1", b: "1/2", c: "7/9", d: "5/12" }, "d", "5/12");
addQ(77, "The value of (1/2 ÷ 1/2 of 1/2) / (1/2 + 1/2 of 1/2) is:", { a: "0", b: "1/9", c: "1/3", d: "1" }, "a", "0");
addQ(78, "(4/5 of 3/4) / (5/6 of 4/5) + (1 1/3 ÷ 1 4/5) is equal to:", { a: "1", b: "1 1/3", c: "2 2/3", d: "3 1/4" }, "c", "2 2/3");
addQ(79, "0.6 × 1 1/3 ÷ (1 1/2 + 1/3) = ?", { a: "1/6", b: "7 2/12", c: "1 15/2", d: "1 21/2" }, "c", "1 15/2");
addQ(80, "(1 3/4 + 1 1/2) ÷ (2 1/5 - 1 1/3) = ?", { a: "1 4/3", b: "1 4/2", c: "2 4/3", d: "None of these" }, "a", "1 4/3");

// 81 - 100
addQ(81, "Which of the following pairs of fractions adds up to a number greater than 5?", { a: "5/3, 3/4", b: "7/11, 3/5", c: "11/8, 4/3", d: "13/11, 5/6" }, "c", "11/8, 4/3");
addQ(82, "(3/4 - 1/2 + 1/6) ÷ (1/7 - 5/2 + 0.5) is equal to:", { a: "19/184", b: "61 2/84", c: "23 2/84", d: "47 2/84" }, "c", "23 2/84");
addQ(83, "If [p] means the greatest integer less than or equal to p, then [1 1/4] - [3 1/4] + [4 1/4] is equal to:", { a: "4", b: "5", c: "6", d: "7" }, "c", "6");
addQ(84, "If x = – 3, then x³ – x² – x will be equal to: (U.P.G.I.C., 2009)", { a: "– 33", b: "– 27", c: "15", d: "54" }, "a", "– 33");
addQ(85, "Let R = gS – 4, when S = 8 and R = 16. If S = 10, then R is equal to:", { a: "11", b: "14", c: "20", d: "21" }, "d", "21");
addQ(86, "If x = 5, y = 3 and z = 2, then (x - y) / (x + y + z) = ?", { a: "1/6", b: "1/30", c: "1", d: "5" }, "a", "1/6");
addQ(87, "If a = 7, b = 5, then the value of a³ – b³ + 3a²b is:", { a: "218", b: "307", c: "735", d: "953" }, "d", "953");
addQ(88, "– 7m – [3n – {8m – (4n – 10m)}] simplifies to: (R.R.B., 2006)", { a: "11m – 5n", b: "11m – 7n", c: "11n – 7m", d: "13n – 11m" }, "b", "11m – 7n");
addQ(89, "If a + 2b = 6 and ab = 4, then what is 2/a + 1/b ? (M.B.A., 2006)", { a: "1/2", b: "1/3", c: "3/2", d: "2", e: "5/2" }, "c", "3/2");
addQ(90, "If a/3 = b/4 = c/7, the value of (a + b + c) ÷ c is:", { a: "1/7", b: "1/2", c: "2", d: "7" }, "c", "2");
addQ(91, "The value of 2a³ – [3a³ + 4b³ – {2a³ + (– 7a³)} + 5a³ – 7b³] is: (Teacher's Exam, 2007)", { a: "– 11a³ + 3b³", b: "7b³ + 3a³", c: "11a³ – 3b³", d: "– (11a³ + 3b³)" }, "a", "– 11a³ + 3b³");
addQ(92, "If x/a = y/b = z/c, then 1/(1+a) + 1/(1+b) + 1/(1+c) is equal to:", { a: "2", b: "3", c: "6", d: "x + y + z" }, "a", "2");
addQ(93, "If y = (x + 3)², then (– 2x – 6)² is equal to:", { a: "– 4y²", b: "– 2y²", c: "– 4y", d: "2y", e: "4y" }, "e", "4y");
addQ(94, "Which among the following is the correct expansion of (x + a)(x + b)? (R.R.B., 2007)", { a: "x² + abx + ab", b: "x² – (a + b)x + ab", c: "x² + (a + b)x + ab", d: "x² + (a – b)x + ab" }, "c", "x² + (a + b)x + ab");
addQ(95, "The simplified form of 1 / (x + 1) + 1 / (x + 4) is:", { a: "(2x + 5) / (x² + 5x + 4)", b: "(x + 5) / (x² + 5x + 4)", c: "1 / (x² + 5x + 4)", d: "1 / (x + 5)" }, "a", "(2x + 5) / (x² + 5x + 4)");
addQ(96, "If (a – b) is 6 more than (c + d) and (a + b) is 3 less than (c – d), then (a – c) is:", { a: "0.5", b: "1", c: "1.5", d: "None of these" }, "c", "1.5");
addQ(97, "If 3a + 2b = 4, then (3a - 2b) / (a + b) = ? (M.B.A., 2007)", { a: "– 1", b: "3", c: "5", d: "6" }, "b", "3");
addQ(98, "If x/6 = y/5, then the value of (x² - y²) / (x² + y²) is equal to:", { a: "11/61", b: "2/7", c: "3/7", d: "4/7" }, "a", "11/61");
addQ(99, "If x/y = 5/4, then the value of (x² - y²) / (x² + y²) is: (R.R.B., 2006)", { a: "10/9", b: "5/4", c: "9/41", d: "5/3" }, "c", "9/41");
addQ(100, "If (x - y) / (x + y) = 6/14, the value of (x² - y²) / (x² + y²) is:", { a: "13/19", b: "15/19", c: "1", d: "1 1/19" }, "c", "1");

// 101 - 120
addQ(101, "If a/b = 4/5 and b/c = 15/16, then (c² - a²) / (c² + a²) is: (M.B.A., 2007)", { a: "1/7", b: "7/25", c: "3/4", d: "None of these" }, "b", "7/25");
addQ(102, "If x = 1 – q and y = 2q + 1, then for what value of q, x is equal to y?", { a: "– 1", b: "0", c: "1/2", d: "2" }, "b", "0");
addQ(103, "Find x if x/5 − x/6 = 4.", { a: "−120", b: "−100", c: "100", d: "120" }, "d", "120");
addQ(104, "If 4x + 5y = 83 and 3x/2y = 21/22, then y - x = ?", { a: "3", b: "4", c: "7", d: "11" }, "b", "4");
addQ(105, "If x = a + b and y = a - b, then (x² + y²) / xy is equal to:", { a: "2(a² + b²) / (a² - b²)", b: "(a² + b²) / (a² - b²)", c: "2", d: "a² + b²" }, "a", "2(a² + b²) / (a² - b²)");
addQ(106, "If a/b = 1/3, b/c = 2, c/d = 1/2, d/e = 3 and e/f = 1/4, then what is the value of abc / def? (C.A.T., 2006)", { a: "1/4", b: "3/4", c: "3/8", d: "27/4", e: "27/8" }, "c", "3/8");
addQ(107, "If m/n = 3/4 and r/t = 9/14, the value of (mr - nt) / (mr + nt) is: (M.B.A. 2011)", { a: "– 5/2", b: "– 11/14", c: "– 1/4", d: "11/14" }, "b", "– 11/14");
addQ(108, "If a + 1/b = 1 and b + 1/c = 1, then c + 1/a is equal to: (S.S.C., 2007)", { a: "0", b: "1/2", c: "1", d: "2" }, "c", "1");
addQ(109, "If x + 1/y = 1 and y + 1/z = 1, then what is the value of xyz?", { a: "– 1", b: "0", c: "1/2", d: "1" }, "a", "– 1");
addQ(110, "If x/(y+z) = y/(z+x) = z/(x+y) = a, then find a if x + y + z ≠ 0. (M.A.T., 2005)", { a: "3/1", b: "1/4", c: "1/2", d: "1/8" }, "c", "1/2");
addQ(111, "If a/(b+c) = b/(c+a) = c/(a+b) = K, then the value of K is:", { a: "± 1/2", b: "1 or – 1/2", c: "– 1", d: "1/2" }, "d", "1/2");
addQ(112, "If a – 8 = b, then determine the value of |a – b| – |b – a|.", { a: "0", b: "2", c: "4", d: "16" }, "a", "0");
addQ(113, "If x = a + 1/a and y = a - 1/a, then:", { a: "x is equal to y", b: "x is equal to y only if a < 1", c: "x is greater than y", d: "x is greater than y only if a < 1", e: "y is greater than x only if a < 1" }, "c", "x is greater than y");
addQ(114, "If 0 < a < 1, then the value of a + 1/a is:", { a: "less than 2", b: "greater than 2", c: "less than 4", d: "greater than 4" }, "b", "greater than 2");
addQ(115, "If x/a + y/b = 1 and y/b + z/c = 1, then x/a + z/c will be equal to:", { a: "0", b: "b/y", c: "1", d: "y/b" }, "c", "1");
addQ(116, "If a, b, c are integers; a² + b² = 45 and b² + c² = 40, then the values of a, b and c respectively are:", { a: "2, 6, 3", b: "3, 2, 6", c: "5, 4, 3", d: "None of these" }, "d", "None of these");
addQ(117, "If x + y = 15 and xy = 56, then what is the value of x² + y²? (L.I.C.A.D.O., 2007)", { a: "110", b: "113", c: "121", d: "Cannot be determined", e: "None of these" }, "b", "113");
addQ(118, "If (a – b) = 4 and ab = 2, then (a² + b²) = ?", { a: "18", b: "20", c: "25", d: "None of these" }, "b", "20");
addQ(119, "If a = bc and c = a – b, then the value of a is: (R.R.B., 2008)", { a: "b² – 1", b: "b / (b - 1)", c: "(1 - b)/b", d: "None of these" }, "b", "b / (b - 1)");
addQ(120, "If a + b + c = 0, find the value of a²/(a² - bc) + b²/(b² - ca) + c²/(c² - ab): (M.A.T., 2005)", { a: "0", b: "1", c: "2", d: "4" }, "c", "2");

// 121 - 140
addQ(121, "If (x - y)² / (x + y)² = 2, then (x² + y²) / xy is equal to:", { a: "2/8", b: "2a⁴ + 4 / a", c: "2/4", d: "6" }, "d", "6");
addQ(122, "If 3x + 7 = x² + P = 7x + 5, what is the value of P?", { a: "1/2", b: "18 1/4", c: "18 1/2", d: "Cannot be determined" }, "b", "18 1/4");
addQ(123, "If (a + b)/(a - b) = 3, then find the value of (a² + b²)/(a² - b²):", { a: "2/7", b: "5/9", c: "10/7", d: "5/4" }, "d", "5/4");
addQ(124, "If (2a + 3b)(2c – 3d) = (2a – 3b)(2c + 3d), then:", { a: "a/b = c/d", b: "a/c = d/b", c: "a/d = b/c", d: "b/c = a/d" }, "a", "a/b = c/d");
addQ(125, "If (a + b + 2c + 3d)(a – b – 2c + 3d) = (a – b + 2c – 3d)(a + b – 2c – 3d), then 2bc is equal to:", { a: "3/2", b: "3/2 ad", c: "3ad", d: "a²d²" }, "c", "3ad");
addQ(126, "The expression [(x + y)² + (x - y)²] / (x² + y²) is equal to:", { a: "– 1", b: "x – y", c: "2", d: "x + y" }, "c", "2");
addQ(127, "(a² - b² - c² - 2bc) is equivalent to:", { a: "(a - b + c)(a + b + c)", b: "(a - b - c)(a + b + c)", c: "(a - b - c)(a + b - c)", d: "(a + b - c)(a - b - c)" }, "c", "(a - b - c)(a + b - c)");
addQ(128, "If x + y + z = 0, then x² + xy + y² equals:", { a: "y² + yz + z²", b: "y² – yz + z²", c: "z² – zx + x²", d: "z² + zx + x²" }, "d", "z² + zx + x²");
addQ(129, "If a + b + c = 2s, then the value of (s – a)² + (s – b)² + (s – c)² + s² will be:", { a: "s² – a² – b² – c²", b: "s² + a² + b² + c²", c: "a² + b² + c²", d: "4s² – a² – b² – c²" }, "c", "a² + b² + c²");
addQ(130, "If (x + y)² – z² = 4, (y + z)² – x² = 9, (z + x)² – y² = 36, what is/are the value(s) of x + y + z?", { a: "0", b: "± 1", c: "± 3", d: "± 7" }, "d", "± 7");
addQ(131, "If a + b = 2c, then the value of a/(a - c) + b/(b - c) is:", { a: "1/2", b: "1", c: "2", d: "3" }, "c", "2");
addQ(132, "x/(x - 1) + (x + 1)/x = ?", { a: "1", b: "2", c: "3", d: "(2x² - 1) / (x² - x)" }, "d", "(2x² - 1) / (x² - x)");
addQ(133, "The value of (a² + b²) / (a - b)² - 2ab / (a - b)² is: (R.R.B., 2006)", { a: "(a + b)/(a - b)", b: "2ab/(a - b)", c: "1", d: "None of these" }, "c", "1");
addQ(134, "If ab + bc + ca = 0, then what is the value of 1/(a² - bc) + 1/(b² - ca) + 1/(c² - ab)?", { a: "0", b: "1", c: "3", d: "a + b + c" }, "a", "0");
addQ(135, "How many boxes are required for filling 15 kg of sweet if each box is filled with 250 grams of sweet? (Bank Recruitment, 2010)", { a: "30", b: "70", c: "80", d: "120", e: "None of these" }, "e", "None of these");
addQ(136, "The bus fare for one person is ₹ 420 from Agra to Aligarh and the train fare between the same places for one person is equal to three-fourths the bus fare for two persons between the same places. What is the total fare paid by 3 persons travelling by bus and 4 persons travelling by train between the two places? (Bank P.O., 2010)", { a: "₹ 3360", b: "₹ 3406", c: "₹ 3440", d: "₹ 3460", e: "None of these" }, "e", "None of these");
addQ(137, "The cost of 6 pens and 3 pencils is ₹ 84. One-third of the cost of one pen is equal to the cost of one pencil. What is the total cost of 4 pens and 5 pencils? (Bank Recruitment, 2010)", { a: "₹ 66", b: "₹ 68", c: "₹ 72", d: "₹ 78", e: "None of these" }, "b", "₹ 68");
addQ(138, "If an amount of ₹ 4,36,563 is distributed equally amongst 69 persons, how much amount would each person get? (Bank Recruitment, 2009)", { a: "₹ 5876", b: "₹ 5943", c: "₹ 6148", d: "₹ 6327", e: "None of these" }, "d", "₹ 6327");
addQ(139, "32 shirt pieces of 120 cm each can be cut from a reel of cloth. After cutting these pieces 80 cm of cloth remains. What is the length of reel of cloth in metres? (Bank Recruitment, 2009)", { a: "38.70 metres", b: "39.20 metres", c: "3870 metres", d: "3920 metres", e: "None of these" }, "b", "39.20 metres");
addQ(140, "A canteen requires 798 bananas for a week. Total how many bananas did it require for the months of January, February and March 2008? (Bank Recruitment, 2008)", { a: "10277", b: "10374", c: "10480", d: "10586", e: "None of these" }, "b", "10374");

// 141 - 160
addQ(141, "Ram has ₹ 6 more than Mohan and ₹ 9 more than Sohan. All the three have ₹ 33 in all. Ram has a share of: (R.R.B., 2006)", { a: "₹ 7", b: "₹ 10", c: "₹ 13", d: "₹ 16" }, "d", "₹ 16");
addQ(142, "What is the maximum number of half-pint bottles of cream that can be filled with a 4-gallon can of cream? (2pt. = 1qt. and 4qt. = 1gal.) (Campus Recruitment, 2010)", { a: "16", b: "24", c: "30", d: "64" }, "d", "64");
addQ(143, "The sum of the weights of A and B is 80 kg. Half of the weight of A is equal to 5/6 times the weight of B. Find the weight of B.", { a: "20 kg", b: "30 kg", c: "40 kg", d: "60 kg" }, "b", "30 kg");
addQ(144, "a is greater than b by 2 and b is greater than c by 10. If a + b + c = 130, then (b + c) − a = ?", { a: "34", b: "38", c: "42", d: "44", e: "None of these" }, "a", "34");
addQ(145, "The price of item X rises by ₹ 40 per year and that of item Y by ₹ 15 per year. If the price of item X and Y in the year 2002 was ₹ 420 and ₹ 630 respectively, in which year the price of item X will be ₹ 40 more than the price of item Y?", { a: "2010", b: "2011", c: "2012", d: "2013" }, "c", "2012");
addQ(146, "How many pieces of 85 cm length can be cut from a rod 42.5 metres long?", { a: "30", b: "40", c: "60", d: "None of these" }, "d", "None of these");
addQ(147, "On Sports Day, if 30 children were made to stand in a column, then 16 columns could be formed. If 24 children were made to stand in a column, then how many columns could be formed?", { a: "20", b: "22", c: "29", d: "45" }, "a", "20");
addQ(148, "The number of students in each section of a school is 24. After admitting new students, three new sections were started. Now, the total number of sections is 16 and there are 21 students in each section. The number of new students admitted is:", { a: "14", b: "24", c: "48", d: "114" }, "b", "24");
addQ(149, "A man earns ₹ 20 on the first day and spends ₹ 15 on the next day. He again earns ₹ 20 on the third day and spends ₹ 15 on the fourth day. If he continues to save like this, how soon will he have ₹ 60 in hand? (M.A.T., 2006)", { a: "On 17th day", b: "On 27th day", c: "On 30th day", d: "On 40th day" }, "a", "On 17th day");
addQ(150, "A car company sold 150 cars in a special 6-day sale. Each day, the company sold 6 more than the previous day. How many cars were sold on the 6th day?", { a: "35", b: "40", c: "50", d: "60", e: "70" }, "b", "40");
addQ(151, "A group of 1200 persons consisting of captains and soldiers is travelling in a train. If for every 15 soldiers there is one captain, then the number of captains in the group is:", { a: "70", b: "75", c: "80", d: "82" }, "b", "75");
addQ(152, "It costs ₹ x each to make the first thousand copies of a compact disc and ₹ y to make each subsequent copy. If z is greater than 1000, how much will it cost to make z copies of the compact disc?", { a: "zx – zy", b: "1000x + yz", c: "1000(x – y) + yz", d: "1000(z – y) + xz" }, "c", "1000(x – y) + yz");
addQ(153, "The total monthly salary of 4 men and 2 women is ₹ 46,000. If a woman earns ₹ 500 more than a man, what is the monthly salary of a woman?", { a: "₹ 6500", b: "₹ 7500", c: "₹ 8000", d: "₹ 9000" }, "c", "₹ 8000");
addQ(154, "A pineapple costs ₹ 7 each. A watermelon costs ₹ 5 each. X spends ₹ 38 on these fruits. The number of pineapples purchased is:", { a: "2", b: "3", c: "4", d: "Data inadequate" }, "c", "4");
addQ(155, "Water boils at 212°F or 100°C and melts at 32°F or 0°C. If the temperature of a particular day is 35°C, it is equivalent to:", { a: "85°F", b: "90°F", c: "95°F", d: "99°F" }, "c", "95°F");
addQ(156, "74 is divided into two parts so that 5 times one part and 11 times the other part are together equal to 454. The parts are: (R.R.B., 2006)", { a: "14, 60", b: "60, 14", c: "30, 44", d: "44, 30" }, "b", "60, 14");
addQ(157, "A sink contains exactly 12 litres of water. If water is drained from the sink until it holds exactly 6 litres of water less than the quantity drained away, then how many litres of water were drained away? (M.A.T., 2006)", { a: "2", b: "3", c: "6", d: "9" }, "d", "9");
addQ(158, "A family has several children. Each boy in the family has as many sisters as brothers and each girl has twice as many brothers as sisters. How many brothers and sisters are there? (SNAP, 2005)", { a: "4 brothers, 3 sisters", b: "4 brothers, 4 sisters", c: "3 brothers, 4 sisters", d: "Cannot say" }, "a", "4 brothers, 3 sisters");
addQ(159, "If 1 Japanese Yen = 0.01 US Dollars, 100 US Dollars = 5000 Indian Rupees (INR), how many Japanese Yens are 100 INR? (JMET, 2008)", { a: "20", b: "200", c: "500", d: "2000" }, "b", "200");
addQ(160, "12 buckets of water fill a tank when the capacity of each bucket is 13.5 litres. How many buckets will be needed to fill the same tank, if the capacity of each bucket is 9 litres?", { a: "8", b: "15", c: "16", d: "18" }, "d", "18");

// 161 - 180
addQ(161, "1 + 1 / (1 + 1 / (1 + 1/3)) ÷ 1 4/7 is equal to: (M.B.A., 2007)", { a: "1", b: "1 1/3", c: "1 1/4", d: "1/17" }, "a", "1");
addQ(162, "13/48 is equal to: (C.P.O., 2006)", { a: "1 / (3 + 1 / (1 + 1/16))", b: "1 / (2 + 1 / (1 + 1/8))", c: "1 / (3 + 1 / (1 + 1 / (1 + 1/8)))", d: "1 / (3 + 1 / (1 + 1 / (2 + 1/4)))" }, "d", "1 / (3 + 1 / (1 + 1 / (2 + 1/4)))");
addQ(163, "Find the value of 1 / (3 + 1 / (2 - 1/4)) + 1 / (2 + 1 / (3 - 1/2)):", { a: "13/7", b: "15/7", c: "11/21", d: "17/28" }, "b", "15/7");
addQ(164, "If x = 1 + 1 / (1 + 1 / (1 + 1/4)), then the value of 2x + 7/4 is:", { a: "12/17", b: "13/17", c: "18/17", d: "21/17" }, "d", "21/17");
addQ(165, "The simplified value of (1 - 1/2)(1 - 1/3)(1 - 1/4)...(1 - 1/n) is:", { a: "1/7", b: "3/7", c: "1", d: "8/7" }, "c", "1");
addQ(166, "0.393939... is simplified to:", { a: "2", b: "4", c: "6", d: "8" }, "b", "4");
addQ(167, "Simplify: 1 / (2 + 1 / (3 + 1/8))", { a: "1/3", b: "2", c: "6", d: "None of these" }, "d", "None of these");
addQ(168, "Simplify: 1 / (2 + 1 / (3 + 1 / (1 + 1/4))):", { a: "11/13", b: "13/15", c: "13/11", d: "15/13" }, "b", "13/15");
addQ(169, "If x = 2 + 1 / (2 + 1/2), then x is equal to:", { a: "4/7", b: "12/5", c: "4/9", d: "None of these" }, "b", "12/5");
addQ(170, "If 37/13 = 2 + 1 / (x + 1 / (y + 1/z)), where x, y, z are natural numbers, then x, y, z are:", { a: "1, 2, 5", b: "1, 5, 2", c: "5, 2, 11", d: "11, 2, 5" }, "b", "1, 5, 2");
addQ(171, "Let x = 1 / (1 + 1 / (1 + 1 / (1 + ... ∞))). Which of the following is correct?", { a: "x² + x + 1 = 0", b: "x² – x + 1 = 0", c: "x² + x – 1 = 0", d: "x² – x – 1 = 0" }, "d", "x² – x – 1 = 0");
addQ(172, "Let P = 1 / (1 + 1/2 + 1/3 + ... + 1/10) and Q = 1 / (1 + 1/2 + 1/3 + ... + 1/10). Then P + Q when calculated gives:", { a: "1", b: "2", c: "3", d: "4" }, "a", "1");
addQ(173, "1 / (10 + 1 / (10 + 1 / (10 + 1/10))) simplifies to:", { a: "20/101", b: "90/101", c: "100/101", d: "101/100" }, "a", "20/101");
addQ(174, "Which of the following values of x and y satisfy the following equations? I. 3x + y = 19 II. x – y = 9", { a: "– 7, – 2", b: "– 7, 2", c: "7, – 2", d: "7, 2" }, "c", "7, – 2");
addQ(175, "If 4x = p(x + 3) + q(x – 1) is an identity, then the values of p and q are: (I.A.M., 2007)", { a: "1, – 3", b: "1, 3", c: "1, 1", d: "3, 1" }, "b", "1, 3");
addQ(176, "If x = y = 2z and xyz = 256, then x = ? (Campus Recruitment, 2005)", { a: "2", b: "4", c: "8", d: "None of these" }, "c", "8");
addQ(177, "If 3y + 9x = 54 and 28x / 13 = 140y / 39, then what is the value of y – x? (Bank P.O., 2009)", { a: "– 2", b: "– 1", c: "1", d: "2", e: "None of these" }, "a", "– 2");
addQ(178, "If 3x + 7y = 75 and 5x – 5y = 25, then what is the value of x + y? (Bank P.O., 2007)", { a: "14", b: "15", c: "16", d: "17", e: "None of these" }, "d", "17");
addQ(179, "If a + b = 5 and 3a + 2b = 20, then (3a + b) will be:", { a: "10", b: "15", c: "20", d: "25" }, "d", "25");
addQ(180, "If 2p + 3q = 18 and 2p – q = 2, then 2p + q = ?", { a: "6", b: "7", c: "10", d: "20" }, "c", "10");

// 181 - 200
addQ(181, "If 2x + y = 5 and 3x – 4y = 2, then the value of 2xy is:", { a: "4", b: "6", c: "8", d: "10" }, "a", "4");
addQ(182, "If (3x - y)/(x + y) = 5/7, then what is the value of 2xy?", { a: "3", b: "4", c: "6", d: "9", e: "None of these" }, "a", "3");
addQ(183, "If 4x + 3y = 18xy and 2x – 5y + 4xy = 0, then the values of x and y will be respectively:", { a: "–1/2 and –1/3", b: "–1 and –3", c: "1/2 and 1/3", d: "1/4 and 1/3" }, "c", "1/2 and 1/3");
addQ(184, "If 2x + y = 17; y + 2z = 15 and x + y = 9, then what is the value of 4x + 3y + z?", { a: "41", b: "43", c: "45", d: "55", e: "None of these" }, "e", "None of these");
addQ(185, "If 3x – 4y + z = 7; 2x – z + 3y = 19; x + 2y + 2z = 24, then what is the value of z?", { a: "4", b: "5", c: "6", d: "8" }, "b", "5");
addQ(186, "If 2x + y = 15, 2y + z = 25 and 2z + x = 26, what is the value of z?", { a: "4", b: "7", c: "9", d: "11" }, "d", "11");
addQ(187, "If 2x + 3y = 31, y – z = 4 and x + 2z = 11, then what is the value of x + y + z?", { a: "12", b: "13", c: "15", d: "16" }, "c", "15");
addQ(188, "The price of 10 chairs is equal to that of 4 tables. The price of 15 chairs and 2 tables together is ₹ 4000. The total price of 12 chairs and 3 tables is:", { a: "₹ 3500", b: "₹ 3750", c: "₹ 3840", d: "₹ 3900" }, "d", "₹ 3900");
addQ(189, "If two jeans and three shirts cost ₹ 4000 and three jeans and two shirts cost ₹ 3500, how much does a jean cost? (P.C.S., 2009)", { a: "₹ 500", b: "₹ 1000", c: "₹ 1500", d: "₹ 2000" }, "a", "₹ 500");
addQ(190, "Cost of 8 pens and 4 pencils is ₹ 176 and the cost of 2 pens and 2 pencils is ₹ 48. What is the cost of one pen? (Bank P.O., 2009)", { a: "₹ 12", b: "₹ 14", c: "₹ 16", d: "₹ 18", e: "None of these" }, "e", "None of these");
addQ(191, "The cost of two dozen apples and three dozen bananas is ₹ 136. The cost of 5 dozen bananas and one dozen apples is ₹ 110. What is the price of one dozen bananas? (Bank Recruitment, 2009)", { a: "₹ 16", b: "₹ 18", c: "₹ 20", d: "₹ 24", e: "None of these" }, "e", "None of these");
addQ(192, "The cost of one pencil, two pens and four erasers is ₹ 22 while the cost of five pencils, four pens and two erasers is ₹ 32. How much will three pencils, three pens and three erasers cost? (Campus Recruitment, 2010)", { a: "₹ 21", b: "₹ 24", c: "₹ 27", d: "₹ 30" }, "c", "₹ 27");
addQ(193, "Ram Singh goes to Pushkar Mela with ₹ 10000 to buy exactly 100 animals. He finds that cows are sold at ₹ 1000, horses at ₹ 300 and chicken at ₹ 50. How many chicken should he buy to meet his target of 100 animals? (SNAP, 2005)", { a: "88", b: "90", c: "92", d: "94" }, "d", "94");
addQ(194, "3 men and 4 boys can earn ₹ 756 in 7 days. 11 men and 13 boys can earn ₹ 3008 in 8 days. In what time will 7 men with 9 boys earn ₹ 2480? (P.C.S., 2006)", { a: "8 days", b: "9 days", c: "10 days", d: "11 days" }, "c", "10 days");
addQ(195, "At a fast food restaurant, Brian can buy 3 burgers, 7 shakes and 1 order of fries for ₹ 120. It costs ₹ 164.50 for 4 burgers, 10 shakes and 1 order of fries. How much would it cost for 1 burger, 1 shake and 1 fries?", { a: "₹ 21", b: "₹ 31", c: "₹ 41", d: "Cannot be determined" }, "b", "₹ 31");
addQ(196, "If 2x² + 12x + 18 = 0, what is the value of x? (Bank P.O., 2006)", { a: "– 3", b: "– 2", c: "2", d: "3", e: "More than one answer" }, "a", "– 3");
addQ(197, "If x² – 7x = – 12, what is the value of x? (C.E.T., 2006)", { a: "– 3 or – 4", b: "3 or 4", c: "3 or – 4", d: "Cannot be determined", e: "None of these" }, "b", "3 or 4");
addQ(198, "The roots of the equation 2x² – 11x + 15 = 0 are: (Campus Recruitment, 2008)", { a: "5/2, 3", b: "3/2, 5", c: "– 5/2, – 3", d: "None of these" }, "a", "5/2, 3");
addQ(199, "The value of (1 - 1/2)(1 - 1/3)(1 - 1/4)...(1 - 1/m) is: (P.C.S., 2008)", { a: "1", b: "1/m", c: "2/m", d: "1 / (m(m - 1))" }, "b", "1/m");
addQ(200, "The expression (1 + 1/3)(1 + 1/4)(1 + 1/5)...(1 + 1/n) simplifies to: (M.B.A. 2006, 2008)", { a: "(n + 1)/3", b: "(n + 1)/n", c: "3/n", d: "1/3n" }, "a", "(n + 1)/3");

// 201 - 220
addQ(201, "When simplified, the product (2 - 1/3)(2 - 3/5)(2 - 5/7)...(2 - 997/999) is equal to: (R.R.B., 2007)", { a: "5/999", b: "1001/999", c: "1/1001", d: "1001/3" }, "d", "1001/3");
addQ(202, "(1 - 1/3)(1 - 1/4)(1 - 1/5)...(1 - 1/n) = ?", { a: "1/5", b: "1/6", c: "1/7", d: "None of these" }, "c", "1/7");
addQ(203, "The value of (1 - 1/3²)(1 - 1/4²)(1 - 1/5²)...(1 - 1/12²) is:", { a: "11/20", b: "13/15", c: "13/18", d: "15/16", e: "None of these" }, "c", "13/18");
addQ(204, "What is the value of 1/(2² - 1) + 1/(4² - 1) + 1/(6² - 1) + ... + 1/(20² - 1)?", { a: "9/19", b: "10/19", c: "10/21", d: "11/21" }, "c", "10/21");
addQ(205, "Find the sum: 1/2 + 1/6 + 1/12 + 1/20 + 1/30 + 1/42 + 1/56 + 1/72 + 1/90 + 1/110 + 1/132:", { a: "7/8", b: "11/12", c: "15/16", d: "17/18" }, "b", "11/12");
addQ(206, "The sum of the first 35 terms of the series 1/2 - 1/3 - 1/4 + 1/2 - 1/3 - 1/4 + ... is:", { a: "– 1/2", b: "– 1/4", c: "1/4", d: "None of these" }, "b", "– 1/4");
addQ(207, "1/2 + 11 1/2 + 111 1/2 + 1111 1/2 is equal to: (S.S.C., 2010)", { a: "617", b: "618", c: "1234 1/2", d: "1236" }, "d", "1236");
addQ(208, "999 993/1000 × 7 is equal to: (C.P.O., 2007)", { a: "7 6633/1000", b: "7 6993/1000", c: "6999 951/1000", d: "7 7000/1000" }, "c", "6999 951/1000");
addQ(209, "The value of 999 995/999 × 999 is:", { a: "990809", b: "998996", c: "998999", d: "999824" }, "b", "998996");
addQ(210, "999 1/7 + 999 2/7 + 999 3/7 + 999 4/7 + 999 5/7 + 999 6/7 is simplified to:", { a: "2997", b: "5979", c: "5994", d: "5997" }, "d", "5997");
addQ(211, "The value of 998 2/17 + 998 3/17 + 998 5/17 + 998 8/17 + 998 16/17 is: (I.A.M., 2007)", { a: "4990", b: "4992", c: "9998", d: "10000" }, "b", "4992");
addQ(212, "The simplest value of 1/(1×2) + 1/(2×3) + 1/(3×4) + ... + 1/(9×10) is: (P.C.S., 2008)", { a: "1/10", b: "9/10", c: "1", d: "10" }, "b", "9/10");
addQ(213, "1/(1×4) + 1/(4×7) + 1/(7×10) + 1/(10×13) + 1/(13×16) is equal to: (S.S.C., 2007)", { a: "1/3", b: "3/8", c: "5/16", d: "41/7280" }, "c", "5/16");
addQ(214, "When simplified, the sum 1/2 + 1/6 + 1/12 + 1/20 + 1/30 + ... + 1/(n(n+1)) is equal to: (S.S.C., 2006)", { a: "1/n", b: "1/(n+1)", c: "n/(n+1)", d: "2/(n(n+1))" }, "c", "n/(n+1)");
addQ(215, "The value of 1 + 1/(3×4) + 1/(3×4²) + 1/(3×4³) is:", { a: "121/108", b: "3/2", c: "31/2", d: "None of these" }, "a", "121/108");
addQ(216, "1/(1×2×3) + 1/(2×3×4) + 1/(3×4×5) + 1/(4×5×6) is equal to:", { a: "7/30", b: "11/30", c: "13/30", d: "17/30" }, "a", "7/30");
addQ(217, "The value of 3/(1²×2²) + 5/(2²×3²) + 7/(3²×4²) + ... + 19/(9²×10²) is: (S.S.C., 2004)", { a: "1/100", b: "99/100", c: "1", d: "101/100" }, "b", "99/100");
addQ(218, "The sum of the first 99 terms of the series 3/4 + 5/36 + 7/144 + 9/400 + ... is:", { a: "99/100", b: "999/1000", c: "9999/10000", d: "1" }, "c", "9999/10000");
addQ(219, "Mayank, Mirza, Little and Jaspal bought a motorbike for ₹ 60000. Mayank paid 1/2 of the sum paid by others, Mirza paid 1/3 of the sum paid by others and Little paid 1/4 of the sum paid by others. How much did Jaspal pay?", { a: "₹ 13000", b: "₹ 15000", c: "₹ 17000", d: "None of these" }, "a", "₹ 13000");
addQ(220, "Income of a company doubles after every one year. If the initial income was ₹ 4 lakhs, what would be the income after 5 years? (Bank P.O., 2003)", { a: "₹ 1.24 crores", b: "₹ 1.28 crores", c: "₹ 2.52 crores", d: "₹ 2.56 crores", e: "None of these" }, "b", "₹ 1.28 crores");

// 221 - 240
addQ(221, "Breeding of a certain species of insects doubles everyday. There was 1 insect in the jar on 1/2/2007, and the jar was full on 28/2/2007. On which date of February was the jar quarter-full? (P.C.S., 2008)", { a: "7", b: "14", c: "26", d: "None of these" }, "c", "26");
addQ(222, "The flowers in a basket double every minute and the basket gets full in one hour. In how much time was the basket 1/32 full?", { a: "12 minutes", b: "32 minutes", c: "45 minutes", d: "55 minutes" }, "d", "55 minutes");
addQ(223, "A man's investment doubles in every 5 years. If he invested ₹ 5000 in each of the years 1990, 1995, 2000 and 2005, then what was the total amount received by him in 2010?", { a: "₹ 30000", b: "₹ 70000", c: "₹ 140000", d: "₹ 150000" }, "d", "₹ 150000");
addQ(224, "After measuring 120 metres of a rope, it was discovered that the measuring rod was 3 cm longer. The true length of the rope measured is: (S.S.C., 2007)", { a: "116 m 40 cm", b: "121 m 20 cm", c: "123 m", d: "123 m 60 cm" }, "d", "123 m 60 cm");
addQ(225, "Smita was asked to multiply a number by 36. She multiplied it by 63 instead and got an answer 3834 more than the correct one. What was the number? (Bank P.O., 2008)", { a: "126", b: "142", c: "148", d: "152", e: "None of these" }, "b", "142");
addQ(226, "A boy multiplied 423 by a number and obtained 65589 as his answer. If both the fives in the answer are wrong and all other figures are correct, the correct answer is:", { a: "60489", b: "61189", c: "62189", d: "62389" }, "a", "60489");
addQ(227, "A candidate was asked to find 7/8 of a positive number. He found 7/18 of the same by mistake. If his answer was 770 less than the correct one, then the original number was: (Campus Recruitment, 2010)", { a: "1260", b: "1548", c: "6160", d: "None of these" }, "d", "None of these");
addQ(228, "A student was asked to divide a number by 17/8. Instead, he multiplied it by 17/8 and got 225 more than expected. What was the expected answer?", { a: "64", b: "126", c: "136", d: "None of these" }, "a", "64");
addQ(229, "One student is asked to divide half a number by 6 and the other half by 4 and add them. Instead, he divides the number by 5. If the answer is 4 short of correct answer, the number is: (M.B.A., 2008)", { a: "320", b: "360", c: "400", d: "480" }, "d", "480");
addQ(230, "If 2 3/9 is subtracted from 1 9/9 and the difference is multiplied by 450, what is the final answer? (Bank P.O., 2009)", { a: "2045", b: "2250", c: "2540", d: "Cannot be determined", e: "None of these" }, "e", "None of these");
addQ(231, "By how much is 3/4 of 968 less than 7/8 of 1008? (Bank P.O., 2010)", { a: "146", b: "154", c: "158", d: "165", e: "None of these" }, "e", "None of these");
addQ(232, "If x = 10 - y, where y is a positive integer which increases in value, then x: (P.C.S., 2009)", { a: "first increases then decreases", b: "decreases in value", c: "increases in value", d: "first decreases then increases" }, "c", "increases in value");
addQ(233, "The difference between 3/4 of 4/5 of a number and 1/2 of 6/5 of the same number is 648. What is the number? (Bank P.O., 2009)", { a: "1110", b: "1215", c: "1325", d: "1440", e: "None of these" }, "b", "1215");
addQ(234, "Which number gives the same result when added to 1 1/2 and when multiplied by 1 1/2?", { a: "1", b: "3", c: "5", d: "7" }, "b", "3");
addQ(235, "5/12 of which sum is equal to 3 3/4 of ₹ 100?", { a: "₹ 750", b: "₹ 800", c: "₹ 900", d: "₹ 1000" }, "c", "₹ 900");
addQ(236, "3/8 is what part of 1/12?", { a: "3/7", b: "1/12", c: "4/3", d: "None of these" }, "d", "None of these");
addQ(237, "The smallest fraction which should be subtracted from the sum of 3 1/4, 2 1/2, 5 7/12, 4 1/3 and 2 3/4 to make the result a whole number is:", { a: "5/12", b: "7/12", c: "1/2", d: "7" }, "a", "5/12");
addQ(238, "What fraction should be added to the sum of 3/4, 4/5 and 7/8 to make the result a whole number? (M.B.A., 2006)", { a: "1/40", b: "2/40", c: "3/40", d: "4/40" }, "c", "3/40");
addQ(239, "If x is a positive number, then which of the following fractions has the greatest value?", { a: "x / x", b: "(x + 1) / x", c: "(x + 1) / (x + 2)", d: "(x + 2) / (x + 3)" }, "c", "(x + 1) / (x + 2)");
addQ(240, "By how much does 6 / (6/7) exceed (6/7) / 8?", { a: "1 6/8", b: "3 6/4", c: "3 7/4", d: "6 27/28" }, "b", "3 6/4");

// 241 - 260
addQ(241, "If 4/5 of an estate be worth ₹ 16,800, then the value of 3/7 of the estate is:", { a: "₹ 9000", b: "₹ 21,000", c: "₹ 72,000", d: "₹ 90,000" }, "a", "₹ 9000");
addQ(242, "Two-fifth of one-fourth of three-seventh of a number is 15. What is half of that number?", { a: "94", b: "96", c: "188", d: "196", e: "None of these" }, "e", "None of these");
addQ(243, "What fraction of an hour is a second?", { a: "1/24", b: "1/60", c: "1/120", d: "1/3600" }, "d", "1/3600");
addQ(244, "When a ball bounces, it rises to 3/4 of the height from which it fell. If dropped from 32 m, how high will it rise at the 3rd bounce?", { a: "13 m", b: "13 1/2 m", c: "14 1/2 m", d: "None of these" }, "b", "13 1/2 m");
addQ(245, "Sanket earns twice as much in March as in each of the other months. What part of his annual earnings was earned in March?", { a: "1/7", b: "1/6", c: "2/11", d: "2/13" }, "d", "2/13");
addQ(246, "If one-third of a tank holds 80 litres of water, then half of the tank holds:", { a: "80/3 litres", b: "100 litres", c: "120 litres", d: "240 litres" }, "c", "120 litres");
addQ(247, "A person travels 3.5 km from A to B: 2 1/3 km on bicycle, 1 1/6 km on scooter and rest on foot. What portion is covered on foot?", { a: "3/19", b: "4/11", c: "4/21", d: "5/6" }, "c", "4/21");
addQ(248, "What fraction of 4/7 must be added to itself to make the sum 1 1/14?", { a: "1/2", b: "4/7", c: "7/8", d: "15/14" }, "c", "7/8");
addQ(249, "Express 2 1/3 of 3/4 of ₹ 25.20 as a fraction of 1 1/2 of ₹ 36.", { a: "5/8", b: "5/42", c: "7/90", d: "11/90" }, "c", "7/90");
addQ(250, "A 70 cm wire is cut into two pieces such that one piece is 2/5 as long as the other. How long is the shorter piece?", { a: "10 cm", b: "14 cm", c: "20 cm", d: "28 cm" }, "c", "20 cm");
addQ(251, "A amount is distributed among A, B and C. A gets 3/16 and B gets 1/4 of whole. If C gets ₹ 81, then B gets:", { a: "₹ 30", b: "₹ 32", c: "₹ 36", d: "₹ 40" }, "c", "₹ 36");
addQ(252, "1/10 of a pole is red, 1/20 white, 1/30 blue, 1/40 black, 1/50 violet, 1/60 yellow and rest is green (12.08 m). Length of pole is: (S.S.C., 2004)", { a: "16 m", b: "18 m", c: "20 m", d: "30 m" }, "a", "16 m");
addQ(253, "If we multiply a fraction by itself and divide product by its reciprocal, we get 18 26/27. The original fraction is:", { a: "8/27", b: "1 1/3", c: "2 2/3", d: "None of these" }, "c", "2 2/3");
addQ(254, "Marks out of 50 are converted to 10 for assessment. Highest was 47 and lowest was 14. The difference between max and min assessment score is:", { a: "3.3", b: "4.8", c: "6.6", d: "7.4" }, "c", "6.6");
addQ(255, "One-third of Rahul's NSC savings equals half of his PPF savings. If total savings is ₹ 1,50,000, how much is in PPF?", { a: "₹ 30,000", b: "₹ 50,000", c: "₹ 60,000", d: "₹ 90,000" }, "c", "₹ 60,000");
addQ(256, "In a family, father took 1/4 of the cake and had 3 times as much as each other member. Total number of family members is:", { a: "3", b: "7", c: "10", d: "12" }, "c", "10");
addQ(257, "A waiter's tips were 5/4 of his salary. What fraction of his total income came from tips?", { a: "4/9", b: "5/4", c: "5/8", d: "5/9" }, "d", "5/9");
addQ(258, "₹ 1360 is divided among A, B and C such that A gets 2/3 of B, and B gets 1/4 of C. B's share is: (M.A.T., 2002)", { a: "₹ 120", b: "₹ 160", c: "₹ 240", d: "₹ 300" }, "c", "₹ 240");
addQ(259, "Three friends had dinner. Amita paid 2/3 of Veena's share, Veena paid 1/2 of Tanya's share. What fraction of total bill did Veena pay? (SNAP, 2005)", { a: "1/3", b: "3/11", c: "12/31", d: "5/8" }, "b", "3/11");
addQ(260, "1/4 of a tank holds 135 litres of water. What part of the tank is full if it contains 180 litres?", { a: "1/6", b: "1/3", c: "2/3", d: "2/5" }, "b", "1/3");

// 261 - 280
addQ(261, "A tank is 2/5 full. Adding 16 litres makes it 6/7 full. The capacity of the tank is:", { a: "28 litres", b: "32 litres", c: "35 litres", d: "42 litres" }, "c", "35 litres");
addQ(262, "A drum of kerosene is 3/4 full. Drawing 30 litres leaves it 7/12 full. Capacity of drum is: (S.S.C., 2010)", { a: "120 litres", b: "135 litres", c: "150 litres", d: "180 litres" }, "d", "180 litres");
addQ(263, "A tin of oil was 5/8 full. Taking 10 bottles out and pouring 8 in leaves it 3/5 full. How many bottles can it contain?", { a: "20", b: "30", c: "40", d: "80" }, "d", "80");
addQ(264, "1 m on object is represented by 10 cm on map. Representative fraction (R.F.) is:", { a: "1/10", b: "1/20", c: "1/100", d: "None of these" }, "a", "1/10");
addQ(265, "100 sq. cm on map represents 49 sq. km on field. R.F. of scale is:", { a: "1/10000", b: "1/20000", c: "1/49000", d: "1/70000" }, "d", "1/70000");
addQ(266, "A bucket fills 4 large or 7 small bottles. What fraction is left in large bottle when full large bottle fills empty small bottle?", { a: "2/7", b: "3/7", c: "4/7", d: "5/7" }, "b", "3/7");
addQ(267, "25 buckets fill a tank. How many buckets needed if capacity of bucket is reduced to two-fifth of present?", { a: "10", b: "35", c: "62 1/2", d: "Cannot be determined", e: "None of these" }, "c", "62 1/2");
addQ(268, "Engine runs 12 hours on 4/5 full tank. How long will it run when 1/3 full? (Campus Recruitment, 2009)", { a: "Less than 2 hours", b: "2 hours", c: "3 hours", d: "4 hours", e: "5 hours" }, "e", "5 hours");
addQ(269, "A tree grows 3/5 as fast as the beside tree. In 4 years combined growth is 8 feet. How much does shorter tree grow in 2 years? (Campus Recruitment, 2008)", { a: "Less than 2 feet", b: "2 feet", c: "1 1/2 feet", d: "3 feet", e: "More than 3 feet" }, "a", "Less than 2 feet");
addQ(270, "Car filled with 4.5 gallons for round trip. Going takes 1/4 more than coming. Fuel consumed coming back is: (Campus Recruitment, 2009)", { a: "Less than 2 gallons", b: "2 gallons", c: "1 1/2 gallons", d: "3 gallons", e: "More than 3 gallons" }, "b", "2 gallons");
addQ(271, "Lowest night temp is 1/3 more than 1/2 of highest day temp. Sum of lowest and highest is 100 degrees. Lowest temp is: (Campus Recruitment, 2010)", { a: "30 degrees", b: "40 degrees", c: "36 degrees", d: "None of these" }, "b", "40 degrees");
addQ(272, "18 boys are over 160 cm tall, forming 3/4 of boys. Total boys is 2/3 of total students. Number of girls in class is:", { a: "6", b: "12", c: "18", d: "24" }, "b", "12");
addQ(273, "Peter gave 1/4 of money to Michael. Michael gave 1/2 of that to Sam. Difference between Peter's remainder and Sam's amount is ₹ 500. Michael received:", { a: "₹ 100", b: "₹ 200", c: "₹ 400", d: "Data inadequate", e: "None of these" }, "b", "₹ 200");
addQ(274, "A takes 1/3 of sweets, B takes 2/5 of remainder, C and D share rest equally. Fraction of sweets C gets is:", { a: "1/4", b: "1/5", c: "1/6", d: "1/17" }, "b", "1/5");
addQ(275, "Rita travelled 1200 km by air forming 2/5 of journey. 1/3 by car and rest by train. Distance by train: (R.R.B., 2006)", { a: "480 km", b: "800 km", c: "1600 km", d: "1800 km" }, "b", "800 km");
addQ(276, "A man spends 1/4 of income on food, 1/5 on rent and remaining ₹ 231 on others. Total income is:", { a: "₹ 400", b: "₹ 410", c: "₹ 420", d: "₹ 460" }, "c", "₹ 420");
addQ(277, "Boy read 3/8 of book on day 1, 4/5 of remainder on day 2. If 30 pages unread, total pages in book: (XAT, 2006)", { a: "240", b: "300", c: "600", d: "None of these" }, "a", "240");
addQ(278, "1/5 of girls and 1/8 of boys participated in fete. What fraction of total students took part?", { a: "2/13", b: "13/40", c: "Data inadequate", d: "None of these" }, "a", "2/13");
addQ(279, "1/5 of attendees were French men. French women were 2/3 greater than French men. Fraction of people not French is: (M.B.A., 2003)", { a: "1/5", b: "2/5", c: "2/3", d: "7/15" }, "d", "7/15");
addQ(280, "3/5 of students are girls. 2/9 of girls and 1/4 of boys absent. What fraction of total students is present?", { a: "17/25", b: "18/49", c: "23/30", d: "23/36" }, "c", "23/30");

// 281 - 298
addQ(281, "1/3 of boys and 1/2 of girls participated. Participating students is 300 (100 boys). Total students in college is:", { a: "500", b: "600", c: "700", d: "800" }, "c", "700");
addQ(282, "Candidate needs 3/4 of votes to win. After counting 2/3 of votes, he has 5/6 of what he needs. What part of remaining votes does he still need? (M.A.T., 2008)", { a: "1/8", b: "3/8", c: "1/10", d: "1/4" }, "b", "3/8");
addQ(283, "A fires 5 shots to B's 3. A kills once in 3 shots, B kills once in 2. When B has missed 27 times, A has killed:", { a: "30 birds", b: "60 birds", c: "72 birds", d: "90 birds" }, "a", "30 birds");
addQ(284, "2 of 3 shirts need collar alteration, 3 of 4 sleeve, 4 of 5 body. Total alterations required for 60 shirts:", { a: "24", b: "123", c: "133", d: "143" }, "c", "133");
addQ(285, "Sum of 3 fractions is 2 11/24. Largest ÷ smallest is 7/6 which is 1/3 more than middle. Fractions are:", { a: "3/4, 2/5, 5/7", b: "7/8, 5/6, 3/4", c: "7/9, 2/3, 3/5", d: "None of these" }, "b", "7/8, 5/6, 3/4");
addQ(286, "1/4 hats brown. Sold 2/3 of hats including 4/5 of brown hats. What fraction of unsold hats were brown? (Campus Recruitment, 2010)", { a: "1/60", b: "1/15", c: "3/20", d: "3/5", e: "3/4" }, "c", "3/20");
addQ(287, "Equal water in 2 empty jars fills 1/4 of one and 1/3 of other. Pouring smaller into larger fills what fraction of larger jar? (M.A.T., 2005)", { a: "1/2", b: "2/3", c: "3/4", d: "2/7" }, "a", "1/2");
addQ(288, "Spends 1/4 of income on food and 1/3 less than that on education. What fraction spent on food and education?", { a: "2/7", b: "1/2", c: "5/12", d: "7/12" }, "c", "5/12");
addQ(289, "7300 troops in 4 battalions such that 1/2 of 1st = 2/3 of 2nd = 3/4 of 3rd = 4/5 of 4th. Men in 2nd battalion: (M.A.T., 2008)", { a: "1500", b: "1600", c: "1800", d: "2400" }, "c", "1800");
addQ(290, "After reading 3/5 homework on Monday, Sanjay read 1/3 of remainder on Tuesday. What fraction left for Wednesday?", { a: "1/5", b: "1/15", c: "2/15", d: "4/15" }, "d", "4/15");
addQ(291, "Highest score in inning was 3/11 of total and next highest 3/11 of remainder. If scores differ by 9, total score was:", { a: "110", b: "121", c: "132", d: "143" }, "b", "121");
addQ(292, "Mechanics paid twice sales people. Custodial workers paid 1/3 mechanics. What fraction of custodial wages are sales people paid? (M.B.A., 2006)", { a: "1/3", b: "1/2", c: "2/3", d: "3/2", e: "4/3" }, "d", "3/2");
addQ(293, "Ganeshi's income is twice Jassi's. 2/3 of Jassi's income equals Sukhvinder's. Sukhvinder's annual income is ₹ 2.34 lakhs. Ganeshi's monthly income: (Bank Recruitment, 2010)", { a: "₹ 14625", b: "₹ 29250", c: "₹ 28230", d: "₹ 58500", e: "None of these" }, "d", "₹ 58500");
addQ(294, "36 kg rice cost ₹ 1044 last year and 24 kg costs ₹ 768 this year. Difference in cost per kg between last year and this year: (Bank Recruitment, 2008)", { a: "₹ 3", b: "₹ 4", c: "₹ 5", d: "₹ 6", e: "None of these" }, "a", "₹ 3");
addQ(295, "Cost of 12 belts and 30 wallets is ₹ 8940. Cost of 4 belts and 10 wallets is: (Bank Recruitment, 2009)", { a: "₹ 2780", b: "₹ 2870", c: "₹ 2890", d: "₹ 2980", e: "None of these" }, "d", "₹ 2980");
addQ(296, "Cost of 5 pendants and 8 chains is ₹ 1,45,785. Cost of 15 pendants and 24 chains: (Bank P.O., 2009)", { a: "₹ 3,25,285", b: "₹ 4,39,355", c: "₹ 5,50,000", d: "Cannot be determined", e: "None of these" }, "e", "None of these");
addQ(297, "Cost of 21 tables and 35 chairs is ₹ 41825. Cost of 9 tables and 15 chairs is:", { a: "₹ 17775", b: "₹ 17925", c: "₹ 18075", d: "₹ 18725", e: "None of these" }, "b", "₹ 17925");
addQ(298, "13 kg sugar costs ₹ 195, 17 kg rice ₹ 544, 21 kg wheat ₹ 336. Total cost of 21 kg sugar, 26 kg rice and 19 kg wheat: (M.A.T., 2009)", { a: "₹ 1306", b: "₹ 1451", c: "₹ 1500", d: "₹ 1636" }, "b", "₹ 1451");

const chapterObj = {
  book: "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  chapter: "Simplification",
  question_count: questions.length,
  key_explanation: key_explanation,
  questions: questions
};

const targetPath = path.join(__dirname, '../server/data/rs_agrawal/simplification.json');
fs.writeFileSync(targetPath, JSON.stringify(chapterObj, null, 2), 'utf8');

console.log(`Successfully generated ${questions.length} questions in ${targetPath}`);
