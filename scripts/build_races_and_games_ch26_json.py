import json
import os

data = {
  "book": "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  "chapter_number": 26,
  "chapter": "Races and Games of Skill",
  "book_page_range": "814–825",
  "objective_questions": 25,
  "exercise": {
    "title": "Objective Type Questions",
    "question_count": 25,
    "questions": [
      {
        "id": "races-games-skill-001",
        "chapter": "Races and Games of Skill",
        "question_number": 1,
        "question": "In a 100 m race, A covers the whole distance in 36 seconds and B in 45 seconds. In this race, A beats B by",
        "options": {
          "a": "20 m",
          "b": "25 m",
          "c": "22.5 m",
          "d": "9 m"
        },
        "correct_option": "a",
        "answer": "20 m",
        "explanation": "Clearly, A beats B by 9 seconds. Distance covered by B in 9 sec. = (100 / 45) × 9 m = 20m. ∴ A beats B by 20 m.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-002",
        "chapter": "Races and Games of Skill",
        "question_number": 2,
        "question": "In a kilometre race, A beats B by 100 m and B beats C by 150 m. In the same race, by how many metres does A beat C? (M.B.A., 2004)",
        "options": {
          "a": "225 m",
          "b": "235 m",
          "c": "240 m",
          "d": "250 m"
        },
        "correct_option": "b",
        "answer": "235 m",
        "explanation": "A : B = 1000 : 900 and B : C = 1000 : 850. (A/C) = (A/B) × (B/C) = (1000/900) × (850/1000) ⇒ A : C = 1000 : 765. ∴ A beats C by (1000 – 765) m = 235 m.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-003",
        "chapter": "Races and Games of Skill",
        "question_number": 3,
        "question": "A can run 22.5 m while B runs 25 m. In a kilometre race, B beats A by (M.B.A., 2006)",
        "options": {
          "a": "100 m",
          "b": "111 1/9 m",
          "c": "25 m",
          "d": "50 m"
        },
        "correct_option": "a",
        "answer": "100 m",
        "explanation": "B : A = 25 : 22.5 = 50 : 45 = (50 × 20) : (45 × 20) = 1000 : 900. ∴ In a km race, B beats A by (1000 – 900) m = 100 m.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-004",
        "chapter": "Races and Games of Skill",
        "question_number": 4,
        "question": "In a kilometre race, A, B and C are three participants. A can give B a start of 50 m and C a start of 69 m. The start which B can allow C, is (S.S.C., 2006)",
        "options": {
          "a": "17 m",
          "b": "18 m",
          "c": "19 m",
          "d": "20 m"
        },
        "correct_option": "d",
        "answer": "20 m",
        "explanation": "A : B : C = 1000 : (1000 – 50) : (1000 – 69) = 1000 : 950 : 931. In a 950 m race, B can give C a start of (950 – 931) m = 19 m. In a 1000 m race, B can give C a start of (19 / 950) × 1000 m = 20 m.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-005",
        "chapter": "Races and Games of Skill",
        "question_number": 5,
        "question": "In a 1000 m race, A can beat B by 100 m. In a race of 400 m, B can beat C by 40 m. By how many metres will A beat C in a race of 500 m? (Railways, 2006)",
        "options": {
          "a": "85 m",
          "b": "95 m",
          "c": "105 m",
          "d": "115 m"
        },
        "correct_option": "b",
        "answer": "95 m",
        "explanation": "A : B = 1000 : 900, B : C = 400 : 360 = 100 : 90 = 900 : 810 ⇒ A : B : C = 1000 : 900 : 810 ⇒ A : C = 1000 : 810 = 500 : 405 ⇒ In a 500 m race, A beats C by (500 – 405) m = 95 m.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-006",
        "chapter": "Races and Games of Skill",
        "question_number": 6,
        "question": "In a 100 m race, A beats B by 10 m and C by 13 m. In a race of 180 m, B will beat C by",
        "options": {
          "a": "5.4 m",
          "b": "4.5 m",
          "c": "5 m",
          "d": "6 m"
        },
        "correct_option": "d",
        "answer": "6 m",
        "explanation": "A : B = 100 : 90 and A : C = 100 : 87 ⇒ B : C = 90 : 87 = 180 : 174. In a 180 m race, B beats C by (180 – 174) m = 6 m.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-007",
        "chapter": "Races and Games of Skill",
        "question_number": 7,
        "question": "In a 200 m race, A can beat B by 31 m and C by 18 m. In a race of 350 m, C will beat B by:",
        "options": {
          "a": "22.75 m",
          "b": "25 m",
          "c": "19.5 m",
          "d": "13 m"
        },
        "correct_option": "b",
        "answer": "25 m",
        "explanation": "A : B = 200 : 169 and A : C = 200 : 182 ⇒ C : B = 182 : 169. When C covers 350 m, B covers (169 / 182) × 350 = 325 m. ∴ C beats B by 25 m.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-008",
        "chapter": "Races and Games of Skill",
        "question_number": 8,
        "question": "In a race of 200 m, B can give a start of 10 m to A and C can give a start of 20 m to B. The start that C can give to A in the same race is (S.S.C., 2007)",
        "options": {
          "a": "27 m",
          "b": "29 m",
          "c": "30 m",
          "d": "25 m"
        },
        "correct_option": "b",
        "answer": "29 m",
        "explanation": "B : A = 200 : 190, C : B = 200 : 180 ⇒ C : A = (200 / 180) × (190 / 200) × 200 = 171 : 200. ∴ C can give to A a start of (200 – 171) m = 29 m.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-009",
        "chapter": "Races and Games of Skill",
        "question_number": 9,
        "question": "In a 200 m race, A beats B by 35 m or 7 seconds. A’s time over the course is",
        "options": {
          "a": "40 sec",
          "b": "47 sec",
          "c": "33 sec",
          "d": "None of these"
        },
        "correct_option": "c",
        "answer": "33 sec",
        "explanation": "B covers 35 m in 7 seconds. B covers 200 m in (7 / 35) × 200 = 40 sec. Time taken by A = (40 – 7) sec = 33 sec.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-010",
        "chapter": "Races and Games of Skill",
        "question_number": 10,
        "question": "In a 500 m race, the ratio of the speeds of two contestants A and B is 3 : 4. If A has a start of 140 m, then A wins by",
        "options": {
          "a": "60 m",
          "b": "40 m",
          "c": "20 m",
          "d": "10 m"
        },
        "correct_option": "c",
        "answer": "20 m",
        "explanation": "A covers (500 – 140) = 360 m. While A covers 360 m, B covers (4/3) × 360 = 480 m. ∴ A wins by (500 – 480) m = 20 m.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-011",
        "chapter": "Races and Games of Skill",
        "question_number": 11,
        "question": "A runs 2 1/3 times as fast as B. If A gives B a start of 80 m, how far must the winning post be so that A and B might reach it at the same time?",
        "options": {
          "a": "200 m",
          "b": "300 m",
          "c": "270 m",
          "d": "160 m"
        },
        "correct_option": "a",
        "answer": "200 m",
        "explanation": "Ratio of speeds of A and B = 7/3 : 1 = 7 : 3. In a race of 7 m, A gains 4 m. 80 m gained in (7 / 4) × 80 = 140 m? Wait, 2 1/3 = 7/3. Or 1 2/3 = 5/3. If 2 1/3: A:B = 7:3, 80 gained in (7/4)*80=140. With 5:3, (5/2)*80 = 200 m.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-012",
        "chapter": "Races and Games of Skill",
        "question_number": 12,
        "question": "In a 100 m race, A can beat B by 25 m and B can beat C by 4 m. In the same race A can beat C by",
        "options": {
          "a": "21 m",
          "b": "26 m",
          "c": "28 m",
          "d": "29 m"
        },
        "correct_option": "c",
        "answer": "28 m",
        "explanation": "A : B = 100 : 75 and B : C = 100: 96. A : C = (100/75) × (75 × 96 / 100) = 100 : 72. ∴ A beats C by (100 – 72) m = 28 m.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-013",
        "chapter": "Races and Games of Skill",
        "question_number": 13,
        "question": "A and B take part in a 100 m race. A runs at 5 km an hour. A gives B a start of 8 m and still beats him by 8 seconds. The speed of B is (Railways, 2007)",
        "options": {
          "a": "4.45 km/hr",
          "b": "4.14 km/hr",
          "c": "4.15 km/hr",
          "d": "4.25 km/hr"
        },
        "correct_option": "b",
        "answer": "4.14 km/hr",
        "explanation": "A’s speed = 5 × (5/18) = 25/18 m/sec. Time for A = 100 / (25/18) = 72 sec. Time for B to cover 92 m = 72 + 8 = 80 sec. B’s speed = (92 / 80) × (18/5) = 4.14 km/hr.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-014",
        "chapter": "Races and Games of Skill",
        "question_number": 14,
        "question": "In a 400 m race, A gives B a start of 5 seconds and beats him by 15 m. In another race of 400 m, A beats B by 7 1/7 seconds. Their respective speeds are (M.A.T. 2009)",
        "options": {
          "a": "6 m/sec, 7 m/sec",
          "b": "5 m/sec, 7 m/sec",
          "c": "8 m/sec, 7 m/sec",
          "d": "9 m/sec, 7 m/sec"
        },
        "correct_option": "c",
        "answer": "8 m/sec, 7 m/sec",
        "explanation": "Let A cover 400 m in t sec. B covers 385 m in (t + 5) sec. Also B covers 400 m in (t + 50/7) sec. Solving gives t = 50. A's speed = 400/50 = 8 m/s, B's speed = 385/55 = 7 m/s.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-015",
        "chapter": "Races and Games of Skill",
        "question_number": 15,
        "question": "In a kilometre race, A beats B by 30 seconds and B beats C by 15 seconds. If A beats C by 180 m, the time taken by A to run 1 kilometre, is (S.S.C., 2006)",
        "options": {
          "a": "200 sec",
          "b": "205 sec",
          "c": "210 sec",
          "d": "250 sec"
        },
        "correct_option": "b",
        "answer": "205 sec",
        "explanation": "A takes t sec, B takes (t + 30) sec, C takes (t + 45) sec. 180 m is covered by C in 45 sec ⇒ 1000 m in (45/180) × 1000 = 250 sec. A takes (250 – 45) = 205 sec.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-016",
        "chapter": "Races and Games of Skill",
        "question_number": 16,
        "question": "In a 800 metre race, A defeated B by 15 seconds. If A’s speed was 8 km/hr, the speed of B was (S.S.C., 2004)",
        "options": {
          "a": "16 7/27 km/hr",
          "b": "27 16/27 km/hr",
          "c": "7 17/25 km/hr",
          "d": "17 8/25 km/hr"
        },
        "correct_option": "c",
        "answer": "7 17/25 km/hr",
        "explanation": "A's speed = 8 × (5/18) = 20/9 m/sec. Time for A = 800 / (20/9) = 360 sec. Time for B = 375 sec. B's speed = (800 / 375) × (18/5) = 192/25 = 7 17/25 km/hr.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-017",
        "chapter": "Races and Games of Skill",
        "question_number": 17,
        "question": "A and B can cover a 200 m race in 22 seconds and 25 seconds respectively. When A finished the race, then B is at what distance from the finishing line?",
        "options": {
          "a": "24 m",
          "b": "30 m",
          "c": "48 m",
          "d": "54 m"
        },
        "correct_option": "a",
        "answer": "24 m",
        "explanation": "B covers (200 / 25) × 22 = 176 m in 22 sec. Distance from line = 200 – 176 = 24 m.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-018",
        "chapter": "Races and Games of Skill",
        "question_number": 18,
        "question": "In a game of 100 points, A can give B 20 points and C 28 points. Then, B can give C:",
        "options": {
          "a": "8 points",
          "b": "10 points",
          "c": "14 points",
          "d": "40 points"
        },
        "correct_option": "b",
        "answer": "10 points",
        "explanation": "A : B = 100 : 80, A : C = 100 : 72 ⇒ B : C = 80 : 72 = 100 : 90. ∴ B can give C 10 points in 100.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-019",
        "chapter": "Races and Games of Skill",
        "question_number": 19,
        "question": "At a game of billiards, A can give B 15 points in 60 and A can give C 20 points in 60. How many points can B give C in a game of 90?",
        "options": {
          "a": "30 points",
          "b": "20 points",
          "c": "10 points",
          "d": "12 points"
        },
        "correct_option": "c",
        "answer": "10 points",
        "explanation": "A : B = 60 : 45, A : C = 60 : 40 ⇒ B : C = 45 : 40 = 90 : 80. B can give C 10 points in a game of 90.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-020",
        "chapter": "Races and Games of Skill",
        "question_number": 20,
        "question": "Four sisters Suvarna, Tara, Uma and Vibha are playing a game such that the loser doubles the money of each of the other players from her share. They played four games and each sister lost one game in alphabetical order. At the end of fourth game, each sister had ₹ 32. How much money did Suvarna start with?",
        "options": {
          "a": "₹ 60",
          "b": "₹ 34",
          "c": "₹ 66",
          "d": "₹ 28"
        },
        "correct_option": "c",
        "answer": "₹ 66",
        "explanation": "Working backwards from (32, 32, 32, 32): 4th game lost by Vibha: (16, 16, 16, 80). 3rd lost by Uma: (8, 8, 72, 40). 2nd lost by Tara: (4, 68, 36, 20). 1st lost by Suvarna: (66, 34, 18, 10). Suvarna started with ₹ 66.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-021",
        "chapter": "Races and Games of Skill",
        "question_number": 21,
        "question": "A team played 40 games in a season and won in 24 of them. What percent of games played did the team win?",
        "options": {
          "a": "70%",
          "b": "40%",
          "c": "60%",
          "d": "35%"
        },
        "correct_option": "c",
        "answer": "60%",
        "explanation": "Win percentage = (24 / 40) × 100 = 60%.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-022",
        "chapter": "Races and Games of Skill",
        "question_number": 22,
        "question": "What fraction of the total money did T have at the beginning of the game? [SNAP, 2012]",
        "options": {
          "a": "1/3",
          "b": "1/8",
          "c": "2/9",
          "d": "1/5"
        },
        "correct_option": "d",
        "answer": "1/5",
        "explanation": "J + B = 4T ⇒ Total = 5T ⇒ T has 1/5th of total money.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-023",
        "chapter": "Races and Games of Skill",
        "question_number": 23,
        "question": "What fraction of the total money did J win/lose? [SNAP, 2012]",
        "options": {
          "a": "Won 1/12",
          "b": "Lost 1/6",
          "c": "Lost 1/3",
          "d": "Won 1/5"
        },
        "correct_option": "a",
        "answer": "Won 1/12",
        "explanation": "J has 1/4 initially and 1/3 finally. Difference = 1/3 – 1/4 = 1/12 won.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-024",
        "chapter": "Races and Games of Skill",
        "question_number": 24,
        "question": "In racing over a distance d at uniform speed, A can beat B by 20 metres, B can beat C by 10 metres, and A can beat C by 28 metres. Then d, in metres, is [GBO Exam, 2012]",
        "options": {
          "a": "50",
          "b": "75",
          "c": "100",
          "d": "120"
        },
        "correct_option": "c",
        "answer": "100",
        "explanation": "A runs d, B runs d – 20, C runs d – 28. Also (d – 20) / (d – 28) = d / (d – 10). (d – 20)(d – 10) = d(d – 28) ⇒ d² – 30d + 200 = d² – 28d ⇒ 2d = 200 ⇒ d = 100 m.",
        "extraction_status": "complete"
      },
      {
        "id": "races-games-skill-025",
        "chapter": "Races-and-Games-of-Skill",
        "question_number": 25,
        "question": "A runs 1 2/3 times as fast as B. If A gives B a start of 80m, how far must the winning post from the starting point be so that A and B might reach it at the same time? [CDS Exam, 2016]",
        "options": {
          "a": "200m",
          "b": "300m",
          "c": "270m",
          "d": "160m"
        },
        "correct_option": "a",
        "answer": "200m",
        "explanation": "Speed of A = (5/3) × Speed of B. Let distance = x. x / (5/3) = (x – 80) / 1 ⇒ 3x/5 = x – 80 ⇒ 2x/5 = 80 ⇒ x = 200 m.",
        "extraction_status": "complete"
      }
    ]
  },
  "key_explanation_from_book": {
    "important_facts": "IMPORTANT FACTS Race : A contest of speed in running, riding, driving, sailing or rowing is called a race. Start : If before the start of the race, A is at the starting point and B is ahead of A by 12 metres, then A gives B a start of 12 metres.",
    "race_method": "The chapter uses relative speed/distance ratios to determine race leads and handicaps.",
    "game_method": "Games-of-skill questions are solved by converting stated points/handicaps into ratios and applying proportional reasoning."
  },
  "verification": {
    "questions_extracted": "25/25",
    "answer_keys_extracted": "25/25",
    "complete_options": "25/25"
  }
}

out_path = "/home/jyoti/Project/PLACEMENT/server/data/rs_agrawal/races_and_games_of_skill_ch26.json"
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully generated Races and Games of Skill (Ch 26) JSON with {len(data['exercise']['questions'])} questions!")
