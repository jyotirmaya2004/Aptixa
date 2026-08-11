import json
import os

data = {
  "book": "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  "chapter_number": 28,
  "chapter": "Clocks",
  "book_page_range": "826–833",
  "objective_questions": 54,
  "exercise": {
    "title": "Objective Type Questions",
    "question_count": 54,
    "questions": [
      {
        "id": "clocks-001",
        "chapter": "Clocks",
        "question_number": 1,
        "question": "London time is five and a half hours behind Delhi time. What time is it in London if it is 0.2.35 in Delhi? (E.P.F.O.S.S.A., 2004)",
        "options": {
          "a": "07.05",
          "b": "08.05",
          "c": "21.05",
          "d": "21.35"
        },
        "correct_option": "c",
        "answer": "21.05",
        "explanation": "Clealy, time in London is 5 hrs 30 minutes behind 2.35 a.m. which is 9.05 p.m. or 21.05 hrs.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-002",
        "chapter": "Clocks",
        "question_number": 2,
        "question": "A bus leaves at 12.25 noon and reaches destination at 10.45 am. The duration of the journey is (R.R.B., 2005)",
        "options": {
          "a": "22 hrs 20 min",
          "b": "22 hrs 40 min",
          "c": "24 hrs 20 min",
          "d": "24 hrs 40 min"
        },
        "correct_option": "a",
        "answer": "22 hrs 20 min",
        "explanation": "Duration of the journey = (Duration from 12.25 noon to midnight) + (Duration from 12.00 midnight to 10.45 a.m.) = 11 hrs 35 min + 10 hrs 45 min = 22 hrs 20 min.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-003",
        "chapter": "Clocks",
        "question_number": 3,
        "question": "An accurate clock shows 8 o'clock in the morning. Through how many degrees will the hour hand rotate when the clock shows 2 o'clock in the afternoon?",
        "options": {
          "a": "144°",
          "b": "150°",
          "c": "168°",
          "d": "180°"
        },
        "correct_option": "d",
        "answer": "180°",
        "explanation": "Angle traced by the hour hand in 6 hours = (360/12) × 6 = 180°.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-004",
        "chapter": "Clocks",
        "question_number": 4,
        "question": "How many rotations will the hour hand of a clock complete in 72 hours? (Bank Recruitment, 2006)",
        "options": {
          "a": "3",
          "b": "6",
          "c": "9",
          "d": "12"
        },
        "correct_option": "b",
        "answer": "6",
        "explanation": "Number of rotations = 72 / 12 = 6.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-005",
        "chapter": "Clocks",
        "question_number": 5,
        "question": "Through what angle does the minute hand of a clock turn in 5 minutes? (E.S.I.C., 2006)",
        "options": {
          "a": "30°",
          "b": "32°",
          "c": "35°",
          "d": "36°"
        },
        "correct_option": "a",
        "answer": "30°",
        "explanation": "Angle traced by the minute hand in 5 minutes = (360/60) × 5 = 30°.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-006",
        "chapter": "Clocks",
        "question_number": 6,
        "question": "In an accurate clock, in a period of 2 hours 20 minutes the minute hand will move over",
        "options": {
          "a": "140°",
          "b": "320°",
          "c": "520°",
          "d": "840°"
        },
        "correct_option": "d",
        "answer": "840°",
        "explanation": "Angle traced by the minute hand in 2 hrs 20 min, i.e., 140 min = (360/60) × 140 = 840°.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-007",
        "chapter": "Clocks",
        "question_number": 7,
        "question": "A clock is started at noon. By 10 minutes past 5, the hour hand has turned through",
        "options": {
          "a": "145°",
          "b": "150°",
          "c": "155°",
          "d": "160°"
        },
        "correct_option": "c",
        "answer": "155°",
        "explanation": "Angle traced by the hour hand in 5 hrs 10 min, i.e., 31/6 hrs = (360/12) × (31/6) = 155°.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-008",
        "chapter": "Clocks",
        "question_number": 8,
        "question": "At 9 : 38 A.M, through how many degrees the hour hand of a clock moved since noon the previous day? (SNAP, 2004)",
        "options": {
          "a": "323",
          "b": "612",
          "c": "646",
          "d": "649"
        },
        "correct_option": "d",
        "answer": "649",
        "explanation": "Time from 12 noon to 9 : 38 A.M. = 21 hrs 38 min = 649/30 hrs. Angle = (360/12) × (649/30) = 649°.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-009",
        "chapter": "Clocks",
        "question_number": 9,
        "question": "At 3.40, the hour hand and the minute hand of a clock form an angle of (Hotel Management, 2004; Campus Recruitment, 2008)",
        "options": {
          "a": "120°",
          "b": "125°",
          "c": "130°",
          "d": "135°"
        },
        "correct_option": "c",
        "answer": "130°",
        "explanation": "Hour hand angle at 3:40 = (360/12) × (11/3) = 110°. Minute hand angle = (360/60) × 40 = 240°. Angle = 240° - 110° = 130°.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-010",
        "chapter": "Clocks",
        "question_number": 10,
        "question": "The angle between the minute hand and the hour hand of a clock when the time is 8.30, is (R.R.B. 2006)",
        "options": {
          "a": "80°",
          "b": "75°",
          "c": "60°",
          "d": "105°"
        },
        "correct_option": "b",
        "answer": "75°",
        "explanation": "Hour hand angle at 8:30 = (360/12) × (17/2) = 255°. Minute hand angle = (360/60) × 30 = 180°. Angle = 255° - 180° = 75°.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-011",
        "chapter": "Clocks",
        "question_number": 11,
        "question": "The angle between the minute hand and the hour hand of a clock when the time is 4.20, is (P.C.S., 2008)",
        "options": {
          "a": "0°",
          "b": "10°",
          "c": "5°",
          "d": "20°"
        },
        "correct_option": "b",
        "answer": "10°",
        "explanation": "Hour hand angle at 4:20 = (360/12) × (13/3) = 130°. Minute hand angle = (360/60) × 20 = 120°. Angle = 130° - 120° = 10°.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-012",
        "chapter": "Clocks",
        "question_number": 12,
        "question": "At what angle the hands of a clock are inclined at 15 minutes past 5? (L.I.C.A.A.O., 2003)",
        "options": {
          "a": "58 1/2°",
          "b": "64°",
          "c": "67 1/2°",
          "d": "72 1/2°"
        },
        "correct_option": "c",
        "answer": "67 1/2°",
        "explanation": "Hour hand angle at 5:15 = (360/12) × (21/4) = 157 1/2°. Minute hand angle = 90°. Required angle = 157 1/2° - 90° = 67 1/2°.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-013",
        "chapter": "Clocks",
        "question_number": 13,
        "question": "The reflex angle between the hands of a clock at 10.25 is",
        "options": {
          "a": "180°",
          "b": "192 1/2°",
          "c": "195°",
          "d": "197 1/2°"
        },
        "correct_option": "d",
        "answer": "197 1/2°",
        "explanation": "Hour hand angle = 312 1/2°, Minute hand angle = 150°. Angle = 162 1/2°. Reflex angle = 360° - 162 1/2° = 197 1/2°.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-014",
        "chapter": "Clocks",
        "question_number": 14,
        "question": "Match List I with List II (A. 1.10 p.m., B. 2.15 p.m., C. 8.40 p.m.) with angles (1. 20°, 2. 22 1/2°, 3. 24°, 4. 25°, 5. 30°)",
        "options": {
          "a": "4 2 1",
          "b": "4 3 2",
          "c": "5 2 1",
          "d": "4 3 2"
        },
        "correct_option": "a",
        "answer": "4 2 1",
        "explanation": "A (1:10) = 25° (Code 4). B (2:15) = 22 1/2° (Code 2). C (8:40) = 20° (Code 1). Code sequence = 4 2 1.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-015",
        "chapter": "Clocks",
        "question_number": 15,
        "question": "An accurate clock shows the time as 3.00. After the hour hand has moved 135°, the time would be",
        "options": {
          "a": "6.30",
          "b": "7.30",
          "c": "8.00",
          "d": "9.30"
        },
        "correct_option": "b",
        "answer": "7.30",
        "explanation": "135° = 135 / 30 = 4.5 hours. 3.00 + 4.5 hours = 7.30.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-016",
        "chapter": "Clocks",
        "question_number": 16,
        "question": "What is the area of the face of a clock described by its minute hand between 9 a.m. and 9.35 a.m; if the minute hand is 10 cm long? (M.B.A., 2004)",
        "options": {
          "a": "36 2/3 cm2",
          "b": "157 1/7 cm2",
          "c": "183 1/3 cm2",
          "d": "None of these"
        },
        "correct_option": "c",
        "answer": "183 1/3 cm2",
        "explanation": "Angle in 35 min = 210°. Area = (210/360) × (22/7) × 10 × 10 = 550/3 = 183 1/3 cm².",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-017",
        "chapter": "Clocks",
        "question_number": 17,
        "question": "The hands of a clock are 10 cm and 7 cm respectively. The difference between the distance traversed by their extremities in 3 days 5 hours is (M.A.T., 2006)",
        "options": {
          "a": "4552.67 cm",
          "b": "4555.67 cm",
          "c": "4557.67 cm",
          "d": "4559.67 cm"
        },
        "correct_option": "c",
        "answer": "4557.67 cm",
        "explanation": "Rounds by minute hand in 77 hrs = 77. Distance = 77 × 2 × (22/7) × 10 = 4840 cm. Rounds by hour hand = 77/12 = 6 5/12. Distance = (77/12) × 2 × (22/7) × 7 = 282.33 cm. Difference = 4840 - 282.33 = 4557.67 cm.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-018",
        "chapter": "Clocks",
        "question_number": 18,
        "question": "The minute arm of a clock is 10 cm long. The number of minutes taken by the tip of the arm to travel a length of 10 cm is nearly equal to",
        "options": {
          "a": "5",
          "b": "10",
          "c": "15",
          "d": "20"
        },
        "correct_option": "b",
        "answer": "10",
        "explanation": "Circumference = 2 × (22/7) × 10 = 440/7 cm in 60 min. 10 cm is covered in (10 × 60) / (440/7) = 9.54 min ≈ 10 min.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-019",
        "chapter": "Clocks",
        "question_number": 19,
        "question": "At which time number of minutes elapsed since midnight is nine times the number of minutes before noon? (R.R.B., 2006)",
        "options": {
          "a": "8.30 a.m.",
          "b": "6.56 a.m.",
          "c": "9.46 a.m.",
          "d": "10.48 a.m."
        },
        "correct_option": "d",
        "answer": "10.48 a.m.",
        "explanation": "Let time be x min past midnight. x = 9(720 - x) ⇒ 10x = 6480 ⇒ x = 648 min = 10 hrs 48 min = 10.48 a.m.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-020",
        "chapter": "Clocks",
        "question_number": 20,
        "question": "How many times do the hands of a clock coincide in a day?",
        "options": {
          "a": "20",
          "b": "21",
          "c": "22",
          "d": "24"
        },
        "correct_option": "c",
        "answer": "22",
        "explanation": "Hands coincide 11 times in 12 hours, hence 22 times in a day.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-021",
        "chapter": "Clocks",
        "question_number": 21,
        "question": "How many times in a day, the hands of a clock are straight? (I.I.F.T., 2005)",
        "options": {
          "a": "22",
          "b": "24",
          "c": "44",
          "d": "48"
        },
        "correct_option": "c",
        "answer": "44",
        "explanation": "Hands are in a straight line (coincide + opposite) 22 times in 12 hrs, hence 44 times in a day.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-022",
        "chapter": "Clocks",
        "question_number": 22,
        "question": "How many times are the hands of a clock at right angle in a day?",
        "options": {
          "a": "22",
          "b": "24",
          "c": "44",
          "d": "48"
        },
        "correct_option": "c",
        "answer": "44",
        "explanation": "Hands are at right angles 22 times in 12 hours, hence 44 times in a day.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-023",
        "chapter": "Clocks",
        "question_number": 23,
        "question": "How many times in a day, are the hands of a clock in straight line but opposite in direction? (R.R.B., 2003)",
        "options": {
          "a": "20",
          "b": "22",
          "c": "24",
          "d": "48"
        },
        "correct_option": "b",
        "answer": "22",
        "explanation": "Hands are opposite 11 times in 12 hours, hence 22 times in a day.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-024",
        "chapter": "Clocks",
        "question_number": 24,
        "question": "How many times are the hour hand and the minute hand of a clock at right angles during their motion from 1.00 p.m. to 10.00 p.m.? (I.A.S., 2009)",
        "options": {
          "a": "9",
          "b": "10",
          "c": "18",
          "d": "20"
        },
        "correct_option": "c",
        "answer": "18",
        "explanation": "9 hours between 1 p.m. and 10 p.m. Right angles occur twice each hour ⇒ 9 × 2 = 18.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-025",
        "chapter": "Clocks",
        "question_number": 25,
        "question": "A clock gains 5 minutes in one hour. Therefore, the angle traversed by the minute hand in 1 hour is",
        "options": {
          "a": "360°",
          "b": "390°",
          "c": "390.5°",
          "d": "None of these"
        },
        "correct_option": "b",
        "answer": "390°",
        "explanation": "Minute hand traverses 65 minute spaces in 1 hr = (360/60) × 65 = 390°.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-026",
        "chapter": "Clocks",
        "question_number": 26,
        "question": "A clock strikes once at 1 o'clock, twice at 2 o'clock, thrice at 3 o'clock and so on. What is the total number of strikings in a day? (R.R.B., 2006)",
        "options": {
          "a": "136",
          "b": "146",
          "c": "156",
          "d": "166"
        },
        "correct_option": "c",
        "answer": "156",
        "explanation": "Strikings in 12 hrs = 1 + 2 + ... + 12 = 78. In a day (24 hrs) = 78 × 2 = 156.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-027",
        "chapter": "Clocks",
        "question_number": 27,
        "question": "A wall-clock takes 9 seconds in striking at 9 o'clock. The time it will take in striking at 11 o'clock is (C.P.O., 2004)",
        "options": {
          "a": "10 seconds",
          "b": "10.80 seconds",
          "c": "11 seconds",
          "d": "11.25 seconds"
        },
        "correct_option": "d",
        "answer": "11.25 seconds",
        "explanation": "8 intervals in 9 strikes take 9 sec ⇒ 1 interval = 9/8 sec. 10 intervals in 11 strikes take 10 × (9/8) = 11.25 sec.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-028",
        "chapter": "Clocks",
        "question_number": 28,
        "question": "If a clock strikes six times in 5 seconds, the number of strikes in 10 seconds is",
        "options": {
          "a": "8",
          "b": "9",
          "c": "10",
          "d": "11"
        },
        "correct_option": "d",
        "answer": "11",
        "explanation": "5 intervals take 5 sec ⇒ 1 interval per sec. In 10 sec, there are 10 intervals, meaning 11 strikes.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-029",
        "chapter": "Clocks",
        "question_number": 29,
        "question": "In every 30 minutes the time of a watch increases by 3 minutes. After showing the correct time at 5 a.m; what time will the watch show after 6 hours?",
        "options": {
          "a": "10 : 54 a.m.",
          "b": "11 : 30 a.m.",
          "c": "11 : 36 a.m.",
          "d": "11 : 42 a.m."
        },
        "correct_option": "c",
        "answer": "11 : 36 a.m.",
        "explanation": "Gains 6 min per hour. In 6 hours, gains 36 min. Time shown at 11:00 a.m. will be 11:36 a.m.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-030",
        "chapter": "Clocks",
        "question_number": 30,
        "question": "A watch becomes fast by 5 minutes everyday. By what percent does it become fast? (R.R.B., 2006)",
        "options": {
          "a": "5/24 %",
          "b": "1/12 %",
          "c": "5%",
          "d": "50/144 %"
        },
        "correct_option": "d",
        "answer": "50/144 %",
        "explanation": "5 min in 1440 min = (5/1440) × 100 = 50/144 %.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-031",
        "chapter": "Clocks",
        "question_number": 31,
        "question": "A clock goes slow from midnight by 5 minutes at the end of the first hour, by 10 minutes at the end of the second hour, by 15 minutes at the end of the third hour and so on. What will be the time by this clock after 6 hours? (S.S.C., 2002)",
        "options": {
          "a": "5.15 a.m.",
          "b": "5.30 a.m.",
          "c": "6 a.m.",
          "d": "6.30 a.m."
        },
        "correct_option": "b",
        "answer": "5.30 a.m.",
        "explanation": "Time lost in 6 hours = 5 × 6 = 30 min. After 6 hours (6 a.m.), clock shows 5.30 a.m.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-032",
        "chapter": "Clocks",
        "question_number": 32,
        "question": "A watch goes fast by 15 minutes compared to the right time everyday. If it is corrected and set to the standard time at 12 o'clock at noon, which of the following will be the time shown by it at 4 : 00 a.m. in the morning?",
        "options": {
          "a": "3 : 45 a.m.",
          "b": "4 : 10 a.m.",
          "c": "4 : 15 a.m.",
          "d": "4 : 30 a.m."
        },
        "correct_option": "b",
        "answer": "4 : 10 a.m.",
        "explanation": "Duration from 12 noon to 4 a.m. = 16 hours. Gain = (15/24) × 16 = 10 min. Clock shows 4:10 a.m.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-033",
        "chapter": "Clocks",
        "question_number": 33,
        "question": "It is between 3 P.M. and 4 P.M. and the distance between the hour and the minute hand of clock is 18 minute spaces. What time does the clock show? (R.R.B., 2006)",
        "options": {
          "a": "3.12 P.M.",
          "b": "3.27 P.M.",
          "c": "3.31 P.M.",
          "d": "3.36 P.M."
        },
        "correct_option": "d",
        "answer": "3.36 P.M.",
        "explanation": "At 3 o'clock, minute hand is 15 min behind. Minute hand must gain 15 + 18 = 33 min spaces. Time = (60/55) × 33 = 36 min ⇒ 3.36 P.M.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-034",
        "chapter": "Clocks",
        "question_number": 34,
        "question": "At what time between 9 and 10 o’clock are the hands of a clock 23 minute spaces apart?",
        "options": {
          "a": "9 : 18",
          "b": "9 : 23",
          "c": "9 : 24",
          "d": "9 : 26"
        },
        "correct_option": "c",
        "answer": "9 : 24",
        "explanation": "At 9 o'clock, minute hand is 45 min behind. Minute hand must gain 45 - 23 = 22 min spaces. Time = (60/55) × 22 = 24 min ⇒ 9:24.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-035",
        "chapter": "Clocks",
        "question_number": 35,
        "question": "How much does a watch lose per day, if its hands coincide every 64 minutes? (M.B.A. 2004, 05, 06; G.B.O., 2007; Campus Recruitment, 2008, 2010)",
        "options": {
          "a": "32 8/11 min.",
          "b": "36 5/11 min.",
          "c": "90 min.",
          "d": "96 min."
        },
        "correct_option": "a",
        "answer": "32 8/11 min.",
        "explanation": "Hands coincide normally every 65 5/11 min. Loss per 64 min = 16/11 min. Loss in 24 hrs = (16/11) × (24 × 60 / 64) = 360/11 = 32 8/11 min.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-036",
        "chapter": "Clocks",
        "question_number": 36,
        "question": "At what time, in minutes, between 3 o’clock and 4 o’clock, both the needles will coincide each other? (R.R.B., 2002)",
        "options": {
          "a": "11 1/5 past 3",
          "b": "11 4/12 past 3",
          "c": "11 4/13 past 3",
          "d": "16 4/11 past 3"
        },
        "correct_option": "d",
        "answer": "16 4/11 past 3",
        "explanation": "Must gain 15 min spaces. Time = (60/55) × 15 = 180/11 = 16 4/11 min past 3.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-037",
        "chapter": "Clocks",
        "question_number": 37,
        "question": "At what time between 9 and 10 o’clock will the hands of a watch be together?",
        "options": {
          "a": "45 min. past 9",
          "b": "50 min. past 9",
          "c": "49 1/11 min. past 9",
          "d": "48 2/11 min. past 9"
        },
        "correct_option": "c",
        "answer": "49 1/11 min. past 9",
        "explanation": "Must gain 45 min spaces. Time = (60/55) × 45 = 540/11 = 49 1/11 min past 9.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-038",
        "chapter": "Clocks",
        "question_number": 38,
        "question": "At what time between 7 and 8 o’clock will the hands of a clock be in the same straight line but, not together? (A.A.O. Exam., 2003)",
        "options": {
          "a": "5 min. past 7",
          "b": "5 2/11 min. past 7",
          "c": "5 3/11 min. past 7",
          "d": "5 5/11 min. past 7"
        },
        "correct_option": "d",
        "answer": "5 5/11 min. past 7",
        "explanation": "At 7 o'clock, hands are 25 min spaces apart. To be opposite (30 min apart), minute hand must gain 5 min spaces. Time = (60/55) × 5 = 5 5/11 min past 7.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-039",
        "chapter": "Clocks",
        "question_number": 39,
        "question": "At what time between 4 and 5 o’clock will the hands of a watch point in opposite directions?",
        "options": {
          "a": "45 min. past 4",
          "b": "40 min. past 4",
          "c": "50 4/11 min. past 4",
          "d": "54 6/11 min. past 4"
        },
        "correct_option": "d",
        "answer": "54 6/11 min. past 4",
        "explanation": "At 4 o'clock, hands are 20 min spaces apart. To be opposite, minute hand must gain 20 + 30 = 50 min spaces. Time = (60/55) × 50 = 54 6/11 min past 4.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-040",
        "chapter": "Clocks",
        "question_number": 40,
        "question": "At what time between 5.30 and 6 will the hands of a clock be at right angles?",
        "options": {
          "a": "43 5/11 min. past 5",
          "b": "43 7/11 min. past 5",
          "c": "40 min. past 5",
          "d": "45 min. past 5"
        },
        "correct_option": "b",
        "answer": "43 7/11 min. past 5",
        "explanation": "Must gain 25 + 15 = 40 min spaces. Time = (60/55) × 40 = 43 7/11 min past 5.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-041",
        "chapter": "Clocks",
        "question_number": 41,
        "question": "Henry started a trip into the country between 8 A.M. and 9 A.M. when the hands of clock were together. He arrived at his destination between 2 P.M. and 3 P.M. when the hands of the clock were exactly 180° apart. How long did he travel? (SNAP, 2004)",
        "options": {
          "a": "6 hours",
          "b": "7 hours",
          "c": "9 hours",
          "d": "11 hours"
        },
        "correct_option": "a",
        "answer": "6 hours",
        "explanation": "Together between 8 & 9: 43 7/11 min past 8 AM. 180° apart between 2 & 3: 43 7/11 min past 2 PM. Duration = 6 hours.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-042",
        "chapter": "Clocks",
        "question_number": 42,
        "question": "Imagine that your watch was correct at noon, but then it began to lose 30 minutes each hour. It now shows 4 p.m. but it stopped 5 hours ago. What is the correct time now? (M.B.A. 2004)",
        "options": {
          "a": "9.30 p.m.",
          "b": "11 p.m.",
          "c": "1 a.m.",
          "d": "1.30 a.m."
        },
        "correct_option": "c",
        "answer": "1 a.m.",
        "explanation": "Watch runs at half speed. To show 4 hours (4 p.m.), 8 real hours passed ⇒ stopped at 8 p.m. 5 hours ago ⇒ 8 p.m. + 5 hrs = 1 a.m.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-043",
        "chapter": "Clocks",
        "question_number": 43,
        "question": "A mechanical grandfather clock is at present showing 7 hr 40 min 6 sec. Assuming that it loses 4 seconds in every hour, what time will it show after exactly 6 1/2 hours? (M.B.A. 2004)",
        "options": {
          "a": "14 hr 9 min 34 sec",
          "b": "14 hr 9 min 40 sec",
          "c": "14 hr 10 min 6 sec",
          "d": "14 hr 10 min 32 sec"
        },
        "correct_option": "b",
        "answer": "14 hr 9 min 40 sec",
        "explanation": "Loss in 6.5 hrs = 6.5 × 4 = 26 sec. True time after 6.5 hrs = 14 hr 10 min 6 sec. Indicated time = 14 hr 9 min 40 sec.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-044",
        "chapter": "Clocks",
        "question_number": 44,
        "question": "I have two watches with a 12 hour cycle. One of them gains one minute a day and the other loses 1 1/2 minutes per day. If I set them both at the correct time, how long will it be before they again tell the correct time together?",
        "options": {
          "a": "288 days",
          "b": "480 days",
          "c": "720 days",
          "d": "1440 days"
        },
        "correct_option": "d",
        "answer": "1440 days",
        "explanation": "First watch gains 720 min in 720 days. Second watch loses 720 min in 480 days. Both show correct time together after LCM(720, 480) = 1440 days.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-045",
        "chapter": "Clocks",
        "question_number": 45,
        "question": "A watch is 1 minute slow at 1 p.m. on Tuesday and 2 minutes fast at 1 p.m. on Thursday. When did it show the correct time? (M.A.T. 2004)",
        "options": {
          "a": "1.00 a.m. on Wednesday",
          "b": "5.00 a.m. on Wednesday",
          "c": "1.00 p.m. on Wednesday",
          "d": "5.00 p.m. on Wednesday"
        },
        "correct_option": "b",
        "answer": "5.00 a.m. on Wednesday",
        "explanation": "Gains 3 min in 48 hrs ⇒ 1 min in 16 hrs. Correct time = 1 p.m. Tuesday + 16 hrs = 5 a.m. Wednesday.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-046",
        "chapter": "Clocks",
        "question_number": 46,
        "question": "A watch which gains uniformly is 2 minutes low at noon on Monday and is 4 min. 48 sec fast at 2 p.m. on the following Monday. When was it correct?",
        "options": {
          "a": "2 p.m. on Tuesday",
          "b": "2 p.m. on Wednesday",
          "c": "3 p.m. on Thursday",
          "d": "1 p.m. on Friday"
        },
        "correct_option": "b",
        "answer": "2 p.m. on Wednesday",
        "explanation": "Total elapsed time = 170 hrs. Gain = 6 4/5 min = 34/5 min. 2 min gain takes 2 × 170 / (34/5) = 50 hrs. Monday noon + 50 hrs = 2 p.m. Wednesday.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-047",
        "chapter": "Clocks",
        "question_number": 47,
        "question": "A watch which gains 5 seconds in 3 minutes was set right at 7 a.m. In the afternoon of the same day, when the watch indicated quarter past 4 o’clock, the true time is",
        "options": {
          "a": "7 59/12 min. past 3",
          "b": "4 p.m.",
          "c": "7 58/11 min. past 3",
          "d": "3 2/11 min. past 4"
        },
        "correct_option": "b",
        "answer": "4 p.m.",
        "explanation": "Indicated time = 9 hrs 15 min = 37/4 hrs. 3 min 5 sec (37/720 hrs) indicated = 1/20 hrs true. 37/4 hrs indicated = 9 hrs true. 7 a.m. + 9 hrs = 4 p.m.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-048",
        "chapter": "Clocks",
        "question_number": 48,
        "question": "Between 5 and 6, a lady looked at her watch and mistaking the hour hand for the minute hand, she thought that the time was 57 minutes earlier than the correct time. The correct time was (M.B.A. 2003)",
        "options": {
          "a": "12 minutes past 5",
          "b": "24 minutes past 5",
          "c": "36 minutes past 5",
          "d": "48 minutes past 5"
        },
        "correct_option": "b",
        "answer": "24 minutes past 5",
        "explanation": "Minute hand is 60 - 57 = 3 min spaces behind hour hand. Must gain 25 - 3 = 22 min spaces. Time = (60/55) × 22 = 24 min past 5.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-049",
        "chapter": "Clocks",
        "question_number": 49,
        "question": "How much does a watch lose per day if its hands coincide every 64 minutes? [IDBI Bank Executive Officers Exam, 2012]",
        "options": {
          "a": "37 minutes",
          "b": "32 8/11 minutes",
          "c": "31 minutes",
          "d": "None of these"
        },
        "correct_option": "b",
        "answer": "32 8/11 minutes",
        "explanation": "Loss per day = 32 8/11 minutes.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-050",
        "chapter": "Clocks",
        "question_number": 50,
        "question": "Wall clock gains 2 minutes in 12 hours, while a table clock loses 2 minutes every 36 hours. Both are set right at 12 noon on Tuesday. The correct time when both show the same time next would be [SSC—FCI Gr. III Exam, 2012]",
        "options": {
          "a": "12:30 at night, after 130 days",
          "b": "12 noon, after 135 days",
          "c": "1:30 at night, after 130 days",
          "d": "12 midnight after 135 days"
        },
        "correct_option": "b",
        "answer": "12 noon, after 135 days",
        "explanation": "Difference per 36 hrs = 6 + 2 = 8 min. Difference per day = 16/3 min. 720 min difference needed = 720 / (16/3) = 135 days. Time = 12 noon after 135 days.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-051",
        "chapter": "Clocks",
        "question_number": 51,
        "question": "The angle between the hands of a clock when the time is 4 : 25 am is [CLAT, 2016]",
        "options": {
          "a": "13 1/2°",
          "b": "17 1/2°",
          "c": "14 1/2°",
          "d": "12 1/2°"
        },
        "correct_option": "b",
        "answer": "17 1/2°",
        "explanation": "Angle = |30H - 5.5M| = |30(4) - 5.5(25)| = |120 - 137.5| = 17.5°.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-052",
        "chapter": "Clocks",
        "question_number": 52,
        "question": "At 8:30, the hour hand and the minute hand of clock form an angle of [CDS Exam, 2016]",
        "options": {
          "a": "80º",
          "b": "75º",
          "c": "70º",
          "d": "60º"
        },
        "correct_option": "b",
        "answer": "75º",
        "explanation": "Angle = |30(8) - 5.5(30)| = |240 - 165| = 75°.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-053",
        "chapter": "Clocks",
        "question_number": 53,
        "question": "A clock is displaying correct time at 9am on Monday. If the clock loses 12 minutes in 24 hours, then the actual time when the clock indicates 8:30pm on Wednesday of the same week is [DMRC—Customer Relationship Assistant (CRA) Exam, 2016]",
        "options": {
          "a": "8 pm",
          "b": "7 pm",
          "c": "9 pm",
          "d": "8: 59 : 45 pm"
        },
        "correct_option": "c",
        "answer": "9 pm",
        "explanation": "119/5 hrs of this clock = 24 hrs true. Indicated duration = 59.5 hrs = 119/2 hrs. True duration = (119/2) × 24 / (119/5) = 60 hrs. 9 am Monday + 60 hrs = 9 pm Wednesday.",
        "extraction_status": "complete"
      },
      {
        "id": "clocks-054",
        "chapter": "Clocks",
        "question_number": 54,
        "question": "There are two clocks, both set to show 10 pm on 21st January 2010. One clock gains 2 minutes in an hour and the other clock loses 5 minutes in an hour. Then by how many minutes do the two clocks differ at 4 pm on 22nd January 2010? [DMRC—Customer Relationship Assistant (CRA) Exam, 2016]",
        "options": {
          "a": "126 minutes",
          "b": "136 minutes",
          "c": "96 minutes",
          "d": "106 minutes"
        },
        "correct_option": "a",
        "answer": "126 minutes",
        "explanation": "Elapsed time = 18 hrs. Difference = 18 × (2 + 5) = 126 minutes.",
        "extraction_status": "complete"
      }
    ]
  },
  "key_explanation_from_book": {
    "minute_hand": "The minute hand moves 360° in 60 minutes, i.e. 6° per minute.",
    "hour_hand": "The hour hand moves 360° in 12 hours, i.e. 30° per hour or 0.5° per minute.",
    "angle_between_hands": "The angle between the hands is obtained from their angular positions; the smaller angle is normally required unless the question asks for the reflex angle.",
    "coincidence": "The hands coincide at regular intervals of 65 5/11 minutes.",
    "opposite_hands": "The hands are 180° apart at the appropriate relative angular displacement.",
    "gain_loss": "For clocks that gain or lose time, compare the clock's indicated elapsed time with the actual elapsed time to determine the rate of gain/loss."
  },
  "verification": {
    "questions_extracted": "54/54",
    "answer_keys_extracted": "54/54",
    "complete_options": "54/54"
  }
}

out_path = "/home/jyoti/Project/PLACEMENT/server/data/rs_agrawal/clocks_ch28.json"
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully generated Clocks (Ch 28) JSON with {len(data['exercise']['questions'])} questions!")
