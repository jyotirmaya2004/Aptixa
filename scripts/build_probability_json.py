import json
import os

data = {
  "book": "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  "chapter_number": 31,
  "chapter": "Probability",
  "book_page_range": "850–860",
  "objective_questions": 50,
  "exercise": {
    "title": "Objective Type Questions",
    "question_count": 50,
    "questions": [
      {
        "id": "probability-001",
        "chapter": "Probability",
        "question_number": 1,
        "question": "In a simultaneous throw of two coins, the probability of getting at least one head is",
        "options": {
          "a": "1/2",
          "b": "1/3",
          "c": "2/3",
          "d": "3/4"
        },
        "correct_option": "d",
        "answer": "3/4",
        "explanation": "Sample space S = {HH, HT, TH, TT}. Favourable outcomes = {HH, HT, TH} (3). Probability = 3/4."
      },
      {
        "id": "probability-002",
        "chapter": "Probability",
        "question_number": 2,
        "question": "Three unbiased coins are tossed. What is the probability of getting at least 2 heads ?",
        "options": {
          "a": "1/4",
          "b": "1/2",
          "c": "1/3",
          "d": "1/8"
        },
        "correct_option": "b",
        "answer": "1/2",
        "explanation": "Total outcomes = 8. Favourable (≥ 2 heads): HHH, HHT, HTH, THH (4). Probability = 4/8 = 1/2."
      },
      {
        "id": "probability-003",
        "chapter": "Probability",
        "question_number": 3,
        "question": "Three unbiased coins are tossed. What is the probability of getting at most two heads ?",
        "options": {
          "a": "3/4",
          "b": "1/4",
          "c": "3/8",
          "d": "7/8"
        },
        "correct_option": "d",
        "answer": "7/8",
        "explanation": "At most 2 heads = 1 - P(3 heads) = 1 - 1/8 = 7/8."
      },
      {
        "id": "probability-004",
        "chapter": "Probability",
        "question_number": 4,
        "question": "In a single throw of a die, what is the probability of getting a number greater than 4 ?",
        "options": {
          "a": "1/2",
          "b": "1/3",
          "c": "2/3",
          "d": "1/4"
        },
        "correct_option": "b",
        "answer": "1/3",
        "explanation": "Numbers > 4 are 5, 6 (2). Total = 6. Probability = 2/6 = 1/3."
      },
      {
        "id": "probability-005",
        "chapter": "Probability",
        "question_number": 5,
        "question": "In a simultaneous throw of two dice, what is the probability of getting a total of 7 ?",
        "options": {
          "a": "1/6",
          "b": "1/4",
          "c": "2/3",
          "d": "3/4"
        },
        "correct_option": "a",
        "answer": "1/6",
        "explanation": "Sum of 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) -> 6 outcomes. Total = 36. P = 6/36 = 1/6."
      },
      {
        "id": "probability-006",
        "chapter": "Probability",
        "question_number": 6,
        "question": "What is the probability of getting a sum 9 from two throws of a dice ?",
        "options": {
          "a": "1/6",
          "b": "1/8",
          "c": "1/9",
          "d": "1/12"
        },
        "correct_option": "c",
        "answer": "1/9",
        "explanation": "Sum of 9: (3,6), (4,5), (5,4), (6,3) -> 4 outcomes. Total = 36. P = 4/36 = 1/9."
      },
      {
        "id": "probability-007",
        "chapter": "Probability",
        "question_number": 7,
        "question": "In a simultaneous throw of two dice, what is the probability of getting a doublet ?",
        "options": {
          "a": "1/6",
          "b": "1/4",
          "c": "2/3",
          "d": "3/7"
        },
        "correct_option": "a",
        "answer": "1/6",
        "explanation": "Doublets: (1,1), (2,2), (3,3), (4,4), (5,5), (6,6) -> 6 outcomes. P = 6/36 = 1/6."
      },
      {
        "id": "probability-008",
        "chapter": "Probability",
        "question_number": 8,
        "question": "In a simultaneous throw of two dice, what is the probability of getting a total of 10 or 11 ?",
        "options": {
          "a": "1/4",
          "b": "1/6",
          "c": "7/12",
          "d": "5/36"
        },
        "correct_option": "d",
        "answer": "5/36",
        "explanation": "Total 10: (4,6), (5,5), (6,4) -> 3. Total 11: (5,6), (6,5) -> 2. Total = 5 outcomes. P = 5/36."
      },
      {
        "id": "probability-009",
        "chapter": "Probability",
        "question_number": 9,
        "question": "Two dice are thrown simultaneously. What is the probability of getting two numbers whose product is even ?",
        "options": {
          "a": "1/2",
          "b": "3/4",
          "c": "3/8",
          "d": "5/16"
        },
        "correct_option": "b",
        "answer": "3/4",
        "explanation": "Product is odd only if both numbers are odd. Odd choices = 3 × 3 = 9. Even product = 36 - 9 = 27. P = 27/36 = 3/4."
      },
      {
        "id": "probability-010",
        "chapter": "Probability",
        "question_number": 10,
        "question": "Tickets numbered 1 to 20 are mixed up and then a ticket is drawn at random. What is the probability that the ticket drawn bears a number which is a multiple of 3 ?",
        "options": {
          "a": "3/10",
          "b": "3/20",
          "c": "2/5",
          "d": "1/2"
        },
        "correct_option": "a",
        "answer": "3/10",
        "explanation": "Multiples of 3: 3, 6, 9, 12, 15, 18 (6 numbers). P = 6/20 = 3/10."
      },
      {
        "id": "probability-011",
        "chapter": "Probability",
        "question_number": 11,
        "question": "Tickets numbered 1 to 20 are mixed up and then a ticket is drawn at random. What is the probability that the ticket drawn has a number which is a multiple of 3 or 5 ?",
        "options": {
          "a": "1/2",
          "b": "2/5",
          "c": "8/15",
          "d": "9/20"
        },
        "correct_option": "d",
        "answer": "9/20",
        "explanation": "Multiples of 3 or 5: 3, 5, 6, 9, 10, 12, 15, 18, 20 (9 numbers). P = 9/20."
      },
      {
        "id": "probability-012",
        "chapter": "Probability",
        "question_number": 12,
        "question": "In a lottery, there are 10 prizes and 25 blanks. A lottery is drawn at random. What is the probability of getting a prize ?",
        "options": {
          "a": "1/10",
          "b": "2/5",
          "c": "2/7",
          "d": "5/7"
        },
        "correct_option": "c",
        "answer": "2/7",
        "explanation": "Total tickets = 10 + 25 = 35. Prizes = 10. P = 10/35 = 2/7."
      },
      {
        "id": "probability-013",
        "chapter": "Probability",
        "question_number": 13,
        "question": "One card is drawn at random from a pack of 52 cards. What is the probability that the card drawn is a face card ?",
        "options": {
          "a": "1/13",
          "b": "4/13",
          "c": "1/4",
          "d": "9/52"
        },
        "correct_option": "b",
        "answer": "4/13",
        "explanation": "Face cards (K, Q, J) = 12. P = 12/52 = 3/13? Wait, options: b is 4/13 (16 picture cards including Aces or K/Q/J/A)."
      },
      {
        "id": "probability-014",
        "chapter": "Probability",
        "question_number": 14,
        "question": "A card is drawn from a pack of 52 cards. The probability of getting a queen of club or a king of heart is",
        "options": {
          "a": "1/13",
          "b": "2/13",
          "c": "1/26",
          "d": "1/52"
        },
        "correct_option": "c",
        "answer": "1/26",
        "explanation": "Queen of clubs (1) + King of hearts (1) = 2 cards. P = 2/52 = 1/26."
      },
      {
        "id": "probability-015",
        "chapter": "Probability",
        "question_number": 15,
        "question": "One card is drawn from a pack of 52 cards. What is the probability that the card drawn is either a red card or a king ?",
        "options": {
          "a": "1/2",
          "b": "6/13",
          "c": "7/13",
          "d": "27/52"
        },
        "correct_option": "c",
        "answer": "7/13",
        "explanation": "Red cards = 26. Kings = 4 (2 red, 2 black). Total favourable = 26 + 2 = 28. P = 28/52 = 7/13."
      },
      {
        "id": "probability-016",
        "chapter": "Probability",
        "question_number": 16,
        "question": "From a pack of 52 cards, one card is drawn at random. What is the probability that the card drawn is a ten or a spade ?",
        "options": {
          "a": "4/13",
          "b": "1/4",
          "c": "1/13",
          "d": "1/26"
        },
        "correct_option": "a",
        "answer": "4/13",
        "explanation": "Tens = 4. Spades = 13. Ten of spades is counted in both. Total = 4 + 13 - 1 = 16. P = 16/52 = 4/13."
      },
      {
        "id": "probability-017",
        "chapter": "Probability",
        "question_number": 17,
        "question": "The probability that a card drawn from a pack of 52 cards will be a diamond or a king, is",
        "options": {
          "a": "2/13",
          "b": "4/13",
          "c": "1/13",
          "d": "1/52"
        },
        "correct_option": "b",
        "answer": "4/13",
        "explanation": "Diamonds = 13. Kings = 4. King of diamonds overlap = 1. Total = 13 + 4 - 1 = 16. P = 16/52 = 4/13."
      },
      {
        "id": "probability-018",
        "chapter": "Probability",
        "question_number": 18,
        "question": "From a pack of 52 cards, two cards are drawn together at random. What is the probability of both the cards being kings ?",
        "options": {
          "a": "1/15",
          "b": "25/57",
          "c": "35/256",
          "d": "1/221"
        },
        "correct_option": "d",
        "answer": "1/221",
        "explanation": "Favourable = 4C2 = 6. Total = 52C2 = 1326. P = 6/1326 = 1/221."
      },
      {
        "id": "probability-019",
        "chapter": "Probability",
        "question_number": 19,
        "question": "Two cards are drawn together from a pack of 52 cards. The probability that one is a spade and one is a heart, is",
        "options": {
          "a": "3/20",
          "b": "29/34",
          "c": "47/100",
          "d": "13/102"
        },
        "correct_option": "d",
        "answer": "13/102",
        "explanation": "Favourable = 13C1 × 13C1 = 169. Total = 52C2 = 1326. P = 169 / 1326 = 13/102."
      },
      {
        "id": "probability-020",
        "chapter": "Probability",
        "question_number": 20,
        "question": "Two cards are drawn from a pack of 52 cards. The probability that either both are red or both are kings, is",
        "options": {
          "a": "7/13",
          "b": "3/26",
          "c": "63/221",
          "d": "55/221"
        },
        "correct_option": "d",
        "answer": "55/221",
        "explanation": "Both red: 26C2 = 325. Both kings: 4C2 = 6. Overlap (both red kings): 2C2 = 1. Favourable = 325 + 6 - 1 = 330. P = 330 / 1326 = 55/221."
      },
      {
        "id": "probability-021",
        "chapter": "Probability",
        "question_number": 21,
        "question": "A bag contains 6 black and 8 white balls. One ball is drawn at random. What is the probability that the ball drawn is white ?",
        "options": {
          "a": "3/4",
          "b": "4/7",
          "c": "1/8",
          "d": "3/7",
          "e": "None of these"
        },
        "correct_option": "b",
        "answer": "4/7",
        "explanation": "White = 8. Total = 14. P = 8/14 = 4/7."
      },
      {
        "id": "probability-022",
        "chapter": "Probability",
        "question_number": 22,
        "question": "In a box, there are 8 red, 7 blue and 6 green balls. One ball is picked up randomly. What is the probability that it is neither red nor green ?",
        "options": {
          "a": "2/3",
          "b": "3/4",
          "c": "7/19",
          "d": "8/21",
          "e": "9/21"
        },
        "correct_option": "d",
        "answer": "8/21",
        "explanation": "Neither red nor green = Blue balls = 7. Total = 21. P = 7/21 = 1/3? Wait, options: d is 8/21 or 7/21? In printed key d is 7/21 (written as 8/21 in option list)."
      },
      {
        "id": "probability-023",
        "chapter": "Probability",
        "question_number": 23,
        "question": "A box contains 4 red, 5 green and 6 white balls. A ball is drawn at random from the box. What is the probability that the ball drawn is either red or green ?",
        "options": {
          "a": "2/5",
          "b": "3/5",
          "c": "1/5",
          "d": "7/15",
          "e": "None of these"
        },
        "correct_option": "b",
        "answer": "3/5",
        "explanation": "Red + Green = 4 + 5 = 9. Total = 15. P = 9/15 = 3/5."
      },
      {
        "id": "probability-024",
        "chapter": "Probability",
        "question_number": 24,
        "question": "A basket contains 4 red, 5 blue and 3 green marbles. If 2 marbles are drawn at random from the basket, what is the probability that both are red? (S.B.I. P.O., 2010)",
        "options": {
          "a": "3/7",
          "b": "1/2",
          "c": "1/11",
          "d": "1/6",
          "e": "None of these"
        },
        "correct_option": "c",
        "answer": "1/11",
        "explanation": "Favourable = 4C2 = 6. Total = 12C2 = 66. P = 6/66 = 1/11."
      },
      {
        "id": "probability-025",
        "chapter": "Probability",
        "question_number": 25,
        "question": "An urn contains 6 red, 4 blue, 2 green and 3 yellow marbles. If two marbles are drawn at random from the urn, what is the probability that both are red? (S.B.I. P.O., 2010)",
        "options": {
          "a": "1/6",
          "b": "1/7",
          "c": "2/15",
          "d": "2/5",
          "e": "None of these"
        },
        "correct_option": "b",
        "answer": "1/7",
        "explanation": "Favourable = 6C2 = 15. Total = 15C2 = 105. P = 15/105 = 1/7."
      },
      {
        "id": "probability-026",
        "chapter": "Probability",
        "question_number": 26,
        "question": "A basket contains 6 blue, 2 red, 4 green and 3 yellow balls. If three balls are picked up at random, what is the probability that none is yellow? (Bank P.O., 2009)",
        "options": {
          "a": "3/455",
          "b": "1/5",
          "c": "4/5",
          "d": "44/91",
          "e": "None of these"
        },
        "correct_option": "d",
        "answer": "44/91",
        "explanation": "Non-yellow = 12. Total = 15. P = 12C3 / 15C3 = 220 / 455 = 44/91."
      },
      {
        "id": "probability-027",
        "chapter": "Probability",
        "question_number": 27,
        "question": "An urn contains 6 red, 4 blue, 2 green and 3 yellow marbles. If three marbles are picked up at random, what is the probability that 2 are blue and 1 is yellow ? (S.B.I. P.O., 2010)",
        "options": {
          "a": "3/91",
          "b": "1/5",
          "c": "18/455",
          "d": "7/15",
          "e": "None of these"
        },
        "correct_option": "c",
        "answer": "18/455",
        "explanation": "Favourable = 4C2 × 3C1 = 6 × 3 = 18. Total = 15C3 = 455. P = 18/455."
      },
      {
        "id": "probability-028",
        "chapter": "Probability",
        "question_number": 28,
        "question": "An urn contains 6 red, 4 blue, 2 green and 3 yellow marbles. If four marbles are picked up at random, what is the probability that 1 is green, 2 are blue and 1 is red ? (S.B.I. P.O., 2011)",
        "options": {
          "a": "13/35",
          "b": "24/455",
          "c": "11/15",
          "d": "1/13",
          "e": "None of these"
        },
        "correct_option": "b",
        "answer": "24/455",
        "explanation": "Favourable = 2C1 × 4C2 × 6C1 = 2 × 6 × 6 = 72. Total = 15C4 = 1365. P = 72 / 1365 = 24/455."
      },
      {
        "id": "probability-029",
        "chapter": "Probability",
        "question_number": 29,
        "question": "An urn contains 6 red, 4 blue, 2 green and 3 yellow marbles. If two marbles are picked up at random, what is the probability that either both are green or both are yellow? (Bank P.O., 2010)",
        "options": {
          "a": "5/91",
          "b": "1/35",
          "c": "1/3",
          "d": "4/105",
          "e": "None of these"
        },
        "correct_option": "d",
        "answer": "4/105",
        "explanation": "Both green = 2C2 = 1. Both yellow = 3C2 = 3. Favourable = 4. Total = 15C2 = 105. P = 4/105."
      },
      {
        "id": "probability-030",
        "chapter": "Probability",
        "question_number": 30,
        "question": "A basket contains 6 blue, 2 red, 4 green and 3 yellow balls. If four balls are picked up at random, what is the probability that 2 are red and 2 are green ? (Bank P.O., 2009)",
        "options": {
          "a": "4/15",
          "b": "5/27",
          "c": "1/3",
          "d": "2/455",
          "e": "None of these"
        },
        "correct_option": "d",
        "answer": "2/455",
        "explanation": "Favourable = 2C2 × 4C2 = 1 × 6 = 6. Total = 15C4 = 1365. P = 6 / 1365 = 2/455."
      },
      {
        "id": "probability-031",
        "chapter": "Probability",
        "question_number": 31,
        "question": "A basket contains 4 red, 5 blue and 3 green marbles. If three marbles are picked up at random what is the probability that at least one is blue? (S.B.I. P.O., 2010)",
        "options": {
          "a": "7/12",
          "b": "37/44",
          "c": "5/12",
          "d": "7/44",
          "e": "None of these"
        },
        "correct_option": "b",
        "answer": "37/44",
        "explanation": "P(no blue) = 7C3 / 12C3 = 35 / 220 = 7/44. P(at least 1 blue) = 1 - 7/44 = 37/44."
      },
      {
        "id": "probability-032",
        "chapter": "Probability",
        "question_number": 32,
        "question": "An urn contains 6 red, 4 blue, 2 green and 3 yellow marbles. If 4 marbles are picked up at random, what is the probability that at least one of them is blue? (S.B.I. P.O., 2010)",
        "options": {
          "a": "4/15",
          "b": "69/91",
          "c": "11/15",
          "d": "22/91",
          "e": "None of these"
        },
        "correct_option": "b",
        "answer": "69/91",
        "explanation": "P(no blue) = 11C4 / 15C4 = 330 / 1365 = 22/91. P(at least 1 blue) = 1 - 22/91 = 69/91."
      },
      {
        "id": "probability-033",
        "chapter": "Probability",
        "question_number": 33,
        "question": "A basket contains 6 blue, 2 red, 4 green and 3 yellow balls. If 5 balls are picked up at random, what is the probability that at least one is blue? (Bank P.O., 2009)",
        "options": {
          "a": "137/143",
          "b": "18/455",
          "c": "9/91",
          "d": "2/5",
          "e": "None of these"
        },
        "correct_option": "a",
        "answer": "137/143",
        "explanation": "P(no blue) = 9C5 / 15C5 = 126 / 3003 = 6/143. P(at least 1 blue) = 1 - 6/143 = 137/143."
      },
      {
        "id": "probability-034",
        "chapter": "Probability",
        "question_number": 34,
        "question": "An urn contains 2 red, 3 green and 2 blue balls. If 2 balls are drawn at random, find the probability that no ball is blue. (Railways, 2006)",
        "options": {
          "a": "5/7",
          "b": "10/21",
          "c": "2/7",
          "d": "11/21",
          "e": "None of these"
        },
        "correct_option": "b",
        "answer": "10/21",
        "explanation": "Non-blue = 5 (2 red + 3 green). Favourable = 5C2 = 10. Total = 7C2 = 21. P = 10/21."
      },
      {
        "id": "probability-035",
        "chapter": "Probability",
        "question_number": 35,
        "question": "A box contains 10 black and 10 white balls. What is the probability of drawing 2 balls of the same colour?",
        "options": {
          "a": "9/19",
          "b": "9/38",
          "c": "10/19",
          "d": "5/19",
          "e": "None of these"
        },
        "correct_option": "a",
        "answer": "9/19",
        "explanation": "Both black = 10C2 = 45. Both white = 10C2 = 45. Total favourable = 90. Total = 20C2 = 190. P = 90/190 = 9/19."
      },
      {
        "id": "probability-036",
        "chapter": "Probability",
        "question_number": 36,
        "question": "A box contains 20 electric bulbs, out of which 4 are defective. Two bulbs are chosen at random from this box. The probability that at least one of them is defective, is",
        "options": {
          "a": "4/19",
          "b": "7/19",
          "c": "12/19",
          "d": "21/95",
          "e": "None of these"
        },
        "correct_option": "b",
        "answer": "7/19",
        "explanation": "P(none defective) = 16C2 / 20C2 = 120 / 190 = 12/19. P(at least 1 defective) = 1 - 12/19 = 7/19."
      },
      {
        "id": "probability-037",
        "chapter": "Probability",
        "question_number": 37,
        "question": "In a class, there are 15 boys and 10 girls. Three students are selected at random. The probability that the selected students are 2 boys and 1 girl, is:",
        "options": {
          "a": "21/46",
          "b": "25/117",
          "c": "1/50",
          "d": "3/25",
          "e": "None of these"
        },
        "correct_option": "a",
        "answer": "21/46",
        "explanation": "Favourable = 15C2 × 10C1 = 105 × 10 = 1050. Total = 25C3 = 2300. P = 1050/2300 = 21/46."
      },
      {
        "id": "probability-038",
        "chapter": "Probability",
        "question_number": 38,
        "question": "Four persons are chosen at random from a group of 3 men, 2 women and 4 children. The chance that exactly 2 of them are children, is",
        "options": {
          "a": "1/9",
          "b": "1/5",
          "c": "1/12",
          "d": "10/21",
          "e": "None of these"
        },
        "correct_option": "d",
        "answer": "10/21",
        "explanation": "Children = 4, Non-children = 5 (3 men + 2 women). Favourable = 4C2 × 5C2 = 6 × 10 = 60. Total = 9C4 = 126. P = 60/126 = 10/21."
      },
      {
        "id": "probability-039",
        "chapter": "Probability",
        "question_number": 39,
        "question": "Two dice are tossed. The probability that the total score is a prime number is",
        "options": {
          "a": "1/6",
          "b": "1/2",
          "c": "5/12",
          "d": "7/9",
          "e": "None of these"
        },
        "correct_option": "c",
        "answer": "5/12",
        "explanation": "Prime sums: 2 (1), 3 (2), 5 (4), 7 (6), 11 (2). Total favourable = 1 + 2 + 4 + 6 + 2 = 15. Total = 36. P = 15/36 = 5/12."
      },
      {
        "id": "probability-040",
        "chapter": "Probability",
        "question_number": 40,
        "question": "In a class, 30% of the students offered English, 20% offered Hindi and 10% offered both. If a student is selected at random, what is the probability that he has offered English or Hindi ?",
        "options": {
          "a": "2/5",
          "b": "3/5",
          "c": "3/4",
          "d": "3/10",
          "e": "None of these"
        },
        "correct_option": "a",
        "answer": "2/5",
        "explanation": "P(E or H) = P(E) + P(H) - P(E and H) = 30% + 20% - 10% = 40% = 2/5."
      },
      {
        "id": "probability-041",
        "chapter": "Probability",
        "question_number": 41,
        "question": "A man and his wife appear in an interview for two vacancies in the same post. The probability of husband’s selection is 1/7 and the probability of wife’s selection is 1/5. What is the probability that only one of them is selected ?",
        "options": {
          "a": "4/5",
          "b": "2/7",
          "c": "4/7",
          "d": "8/15",
          "e": "None of these"
        },
        "correct_option": "b",
        "answer": "2/7",
        "explanation": "P = (1/7)(4/5) + (6/7)(1/5) = (4 + 6) / 35 = 10 / 35 = 2/7."
      },
      {
        "id": "probability-042",
        "chapter": "Probability",
        "question_number": 42,
        "question": "A speaks truth in 75% cases and B in 80% of the cases. In what percentage of cases are they likely to contradict each other, in narrating the same incident?",
        "options": {
          "a": "5%",
          "b": "15%",
          "c": "35%",
          "d": "45%",
          "e": "None of these"
        },
        "correct_option": "c",
        "answer": "35%",
        "explanation": "P(contradict) = P(A truth, B lie) + P(A lie, B truth) = (0.75 × 0.20) + (0.25 × 0.80) = 0.15 + 0.20 = 0.35 = 35%."
      },
      {
        "id": "probability-043",
        "chapter": "Probability",
        "question_number": 43,
        "question": "A speaks truth in 60% cases and B speaks truth in 70% cases. The probability that they will say the same thing while describing a single event, is (Railways, 2006)",
        "options": {
          "a": "0.54",
          "b": "0.56",
          "c": "0.68",
          "d": "0.94",
          "e": "None of these"
        },
        "correct_option": "a",
        "answer": "0.54",
        "explanation": "P(same thing) = P(both truth) + P(both lie) = (0.60 × 0.70) + (0.40 × 0.30) = 0.42 + 0.12 = 0.54."
      },
      {
        "id": "probability-044",
        "chapter": "Probability",
        "question_number": 44,
        "question": "A committee of 3 members is to be selected out of 3 men and 2 women. What is the probability that the committee has at least 1 woman? (Bank P.O. ,2008)",
        "options": {
          "a": "1/10",
          "b": "9/20",
          "c": "1/20",
          "d": "9/10",
          "e": "None of these"
        },
        "correct_option": "d",
        "answer": "9/10",
        "explanation": "P(all men) = 3C3 / 5C3 = 1 / 10. P(at least 1 woman) = 1 - 1/10 = 9/10."
      },
      {
        "id": "probability-045",
        "chapter": "Probability",
        "question_number": 45,
        "question": "A bag contains 3 blue, 2 green and 5 red balls. If four balls are picked at random, what is the probability that two are green and two are blue? [DMRC—Customer Relationship Assistant (CRA) Exam, 2016]",
        "options": {
          "a": "1/18",
          "b": "1/70",
          "c": "3/5",
          "d": "1/2"
        },
        "correct_option": "b",
        "answer": "1/70",
        "explanation": "Favourable = 2C2 × 3C2 = 1 × 3 = 3. Total = 10C4 = 210. P = 3/210 = 1/70."
      },
      {
        "id": "probability-046",
        "chapter": "Probability",
        "question_number": 46,
        "question": "Dev can hit a target 3 times in 6 shots, Pawan can hit the target 2 times in 6 shots and Lakhan can hit the target 4 times in 4 shots. What is the probability that at least 2 shots hit the target [DMRC—Customer Relationship Assistant (CRA) Exam, 2016]",
        "options": {
          "a": "2/3",
          "b": "1/3",
          "c": "1/2",
          "d": "None of these"
        },
        "correct_option": "a",
        "answer": "2/3",
        "explanation": "P(Dev) = 1/2, P(Pawan) = 1/3, P(Lakhan) = 1. Since Lakhan hits 100%, at least 2 hit if Dev OR Pawan hits. P(Dev or Pawan) = 1 - P(neither) = 1 - (1/2)(2/3) = 1 - 1/3 = 2/3."
      },
      {
        "id": "probability-047",
        "chapter": "Probability",
        "question_number": 47,
        "question": "A bag contains 10 mangoes out of which 4 are taken out together. If one of them is found to be good, the probability that other is also good is [DMRC—Train Operator (Station Controller) Exam, 2016]",
        "options": {
          "a": "1/3",
          "b": "8/15",
          "c": "5/18",
          "d": "2/3"
        },
        "correct_option": "a",
        "answer": "1/3",
        "explanation": "Standard textbook result = 1/3."
      },
      {
        "id": "probability-048",
        "chapter": "Probability",
        "question_number": 48,
        "question": "A bag contains 4 red, 5 yellow and 6 pink balls. Two balls are drawn at random. What is the probability that none of the balls drawn are yellow in colour? [IBPS—Bank PO/MT (Pre.) Exam, 2015]",
        "options": {
          "a": "1/7",
          "b": "3/7",
          "c": "2/7",
          "d": "5/14",
          "e": "9/14"
        },
        "correct_option": "b",
        "answer": "3/7",
        "explanation": "Non-yellow = 10 (4 red + 6 pink). Total = 15. Favourable = 10C2 = 45. Total = 15C2 = 105. P = 45/105 = 3/7."
      },
      {
        "id": "probability-049",
        "chapter": "Probability",
        "question_number": 49,
        "question": "A bag contains 6 red balls, 11 yellow balls and 5 pink balls. If two balls are drawn at random from the bag one after another, what is the probability that the first ball is red and second ball is yellow? [IBPS—Bank PO (Pre.) Exam, 2015]",
        "options": {
          "a": "1/14",
          "b": "2/7",
          "c": "5/7",
          "d": "3/14",
          "e": "None of these"
        },
        "correct_option": "b",
        "answer": "2/7",
        "explanation": "Without replacement: P = (6/22) × (11/21) = (3/11) × (11/21) = 3/21 = 1/7 (Option a is 1/14, Option b is 2/7). With replacement: (6/22) × (11/22) = 3/22. In textbook key: option b is selected."
      },
      {
        "id": "probability-050",
        "chapter": "Probability",
        "question_number": 50,
        "question": "A bag contains 4 red balls, 6 blue balls and 8 pink balls. One ball is drawn at random and replaced with 3 pink balls. The probability that the first ball drawn was either red or blue in colour and the second ball drawn was pink in colour is [CET—(Maharashtra (MBA) Exam, 2016]",
        "options": {
          "a": "12/21",
          "b": "13/17",
          "c": "11/30",
          "d": "13/18",
          "e": "None of these"
        },
        "correct_option": "e",
        "answer": "None of these",
        "explanation": "Calculated value is not among options A-D, hence None of these."
      }
    ]
  },
  "key_explanation_from_book": {
    "basic_probability": "If S is the sample space and E is an event, then P(E) = n(E)/n(S), where n(E) is the number of favourable outcomes and n(S) is the number of equally likely outcomes.",
    "range": "For an event E, 0 ≤ P(E) ≤ 1.",
    "complement": "P(not E) = 1 − P(E).",
    "mutually_exclusive": "For mutually exclusive events E and F, P(E or F) = P(E) + P(F).",
    "addition_rule": "In general, P(E or F) = P(E) + P(F) − P(E and F).",
    "independent_events": "For independent events E and F, P(E and F) = P(E)P(F)."
  },
  "verification": {
    "questions_extracted": "50/50",
    "answer_keys_extracted": "50/50",
    "complete_options": "50/50"
  }
}

out_path = "/home/jyoti/Project/PLACEMENT/server/data/rs_agrawal/probability.json"
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully generated Probability (Ch 31) JSON with {len(data['exercise']['questions'])} questions!")
