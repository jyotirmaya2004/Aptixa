import json
import os

key_concepts = [
  {
    "topic": "Direct Proportion",
    "formula": "Two quantities are directly proportional when an increase or decrease in one causes the other to increase or decrease to the same extent (e.g. Work ∝ Men, Cost ∝ Articles)."
  },
  {
    "topic": "Indirect Proportion",
    "formula": "Two quantities are indirectly proportional when an increase in one causes a corresponding decrease in the other (e.g. Time ∝ 1/Speed, Days ∝ 1/Men)."
  },
  {
    "topic": "Chain Rule Method",
    "formula": "Identify whether each variable item is in direct or indirect proportion with the target variable to form the chain ratio: (M1 × D1 × H1) / W1 = (M2 × D2 × H2) / W2."
  },
  {
    "topic": "Common Relations",
    "formula": "• More Men → Less Time (Indirect)\n• More Working Hours/Day → Less Days (Indirect)\n• More Work → More Men (Direct)\n• More Efficiency → Less Days (Indirect)"
  }
]

questions = [
  {
    "id": "chain-rule-001",
    "chapter": "Chain Rule",
    "question_number": 1,
    "question": "If the cost of x metres of wire is d rupees, then what is the cost of y metres of wire at the same rate? (M.B.A., 2002)",
    "options": {
      "a": "₹ (xy/d)",
      "b": "₹ (xd)",
      "c": "₹ (yd)",
      "d": "₹ (yd/x)"
    },
    "correct_option": "d",
    "answer": "₹ (yd/x)",
    "book_page": 493,
    "topic": "Direct Proportion"
  },
  {
    "id": "chain-rule-002",
    "chapter": "Chain Rule",
    "question_number": 2,
    "question": "The price of 5.5 dozen pens is ₹ 1287. What is the price of 16 such pens?",
    "options": {
      "a": "₹ 212",
      "b": "₹ 296",
      "c": "₹ 312",
      "d": "₹ 412",
      "e": "None of these"
    },
    "correct_option": "c",
    "answer": "₹ 312",
    "book_page": 493,
    "topic": "Unitary Method"
  },
  {
    "id": "chain-rule-003",
    "chapter": "Chain Rule",
    "question_number": 3,
    "question": "The price of 357 mangoes is ₹ 1517.25. What will be the approximate price of 49 dozens of such mangoes?",
    "options": {
      "a": "₹ 3000",
      "b": "₹ 3500",
      "c": "₹ 4000",
      "d": "₹ 2500"
    },
    "correct_option": "d",
    "answer": "₹ 2500",
    "book_page": 493,
    "topic": "Unitary Method"
  },
  {
    "id": "chain-rule-004",
    "chapter": "Chain Rule",
    "question_number": 4,
    "question": "If a quarter kg of potato costs 60 paise, how many paise will 200 gm cost?",
    "options": {
      "a": "48 paise",
      "b": "54 paise",
      "c": "56 paise",
      "d": "72 paise"
    },
    "correct_option": "a",
    "answer": "48 paise",
    "book_page": 494,
    "topic": "Weight and Cost"
  },
  {
    "id": "chain-rule-005",
    "chapter": "Chain Rule",
    "question_number": 5,
    "question": "If 11.25 m of a uniform iron rod weighs 42.75 kg, what will be the weight of 6 m of the same rod?",
    "options": {
      "a": "22.8 kg",
      "b": "25.6 kg",
      "c": "28 kg",
      "d": "26.5 kg"
    },
    "correct_option": "a",
    "answer": "22.8 kg",
    "book_page": 494,
    "topic": "Length and Weight"
  },
  {
    "id": "chain-rule-006",
    "chapter": "Chain Rule",
    "question_number": 6,
    "question": "On a scale of map, 0.6 cm represents 6.6 km. If the distance between the points on the map is 80.5 cm, the actual distance between these points is:",
    "options": {
      "a": "9 km",
      "b": "72.5 km",
      "c": "190.75 km",
      "d": "885.5 km"
    },
    "correct_option": "d",
    "answer": "885.5 km",
    "book_page": 494,
    "topic": "Map Scale Proportion"
  },
  {
    "id": "chain-rule-007",
    "chapter": "Chain Rule",
    "question_number": 7,
    "question": "An industrial loom weaves 0.128 metres of cloth every second. Approximately, how many seconds will it take for the loom to weave 25 metres of cloth? (M.B.A., 2003)",
    "options": {
      "a": "178",
      "b": "195",
      "c": "204",
      "d": "488"
    },
    "correct_option": "b",
    "answer": "195",
    "book_page": 494,
    "topic": "Rate and Time"
  },
  {
    "id": "chain-rule-008",
    "chapter": "Chain Rule",
    "question_number": 8,
    "question": "A recipe for stew that feeds 4 people calls for 1 1/2 teaspoons of salt. If 3 teaspoons = 1 tablespoon, then how many tablespoons of salt will be needed to make enough stew for 18 people?",
    "options": {
      "a": "2.25",
      "b": "3.25",
      "c": "4.5",
      "d": "6"
    },
    "correct_option": "a",
    "answer": "2.25",
    "book_page": 495,
    "topic": "Recipe Scaling"
  },
  {
    "id": "chain-rule-009",
    "chapter": "Chain Rule",
    "question_number": 9,
    "question": "A snapshot 7 1/2'' × 8 1/2'' is to be enlarged so that the longer dimension is 4''. What will be the dimension of the shorter side? (DMRC, 2003)",
    "options": {
      "a": "3 2/8''",
      "b": "1 2/2''",
      "c": "3''",
      "d": "3 3/8''"
    },
    "correct_option": "c",
    "answer": "3''",
    "book_page": 495,
    "topic": "Dimension Scaling"
  },
  {
    "id": "chain-rule-010",
    "chapter": "Chain Rule",
    "question_number": 10,
    "question": "A canteen requires 651 bananas for a week. Totally, how many bananas will it require for the months of April, May and June? (Bank Recruitment, 2009)",
    "options": {
      "a": "8463",
      "b": "8547",
      "c": "9086",
      "d": "9284",
      "e": "None of these"
    },
    "correct_option": "a",
    "answer": "8463",
    "book_page": 495,
    "topic": "Daily Consumption Rate"
  },
  {
    "id": "chain-rule-011",
    "chapter": "Chain Rule",
    "question_number": 11,
    "question": "If 4/9 of a bucket is filled in 1 minute, the rest of it will be filled in (Hotel Management, 2010)",
    "options": {
      "a": "1 min",
      "b": "9/4 min",
      "c": "5/4 min",
      "d": "4/5 min"
    },
    "correct_option": "c",
    "answer": "5/4 min",
    "book_page": 495,
    "topic": "Filling Rate"
  },
  {
    "id": "chain-rule-012",
    "chapter": "Chain Rule",
    "question_number": 12,
    "question": "On a certain map of India the actual distance of 1450 km between two cities Delhi and Kolkata is shown as 5 cm. What scale is used to draw the map? (A.T.M.A., 2004)",
    "options": {
      "a": "1 : 15 × 10⁶",
      "b": "1 : 20 × 10⁶",
      "c": "1 : 25 × 10⁶",
      "d": "1 : 29 × 10⁶"
    },
    "correct_option": "d",
    "answer": "1 : 29 × 10⁶",
    "book_page": 496,
    "topic": "Map Ratio"
  },
  {
    "id": "chain-rule-013",
    "chapter": "Chain Rule",
    "question_number": 13,
    "question": "A flagstaff 17.5 m high casts a shadow of length 40.25 m. The height of the building, which casts a shadow of length 28.75 m under similar conditions will be (M.B.A., 2002)",
    "options": {
      "a": "10 m",
      "b": "12.5 m",
      "c": "17.5 m",
      "d": "21.25 m"
    },
    "correct_option": "b",
    "answer": "12.5 m",
    "book_page": 496,
    "topic": "Height and Shadow Ratio"
  },
  {
    "id": "chain-rule-014",
    "chapter": "Chain Rule",
    "question_number": 14,
    "question": "A TV tower 36 metres high casts a shadow of 24 metres at a particular time of a day. What is the height of a minar with a three metre high flagstaff atop it, if both of these together cast a shadow of 50 metres at the same time of the day?",
    "options": {
      "a": "64 m",
      "b": "72 m",
      "c": "75 m",
      "d": "None of these"
    },
    "correct_option": "b",
    "answer": "72 m",
    "book_page": 496,
    "topic": "Height and Shadow Ratio"
  },
  {
    "id": "chain-rule-015",
    "chapter": "Chain Rule",
    "question_number": 15,
    "question": "A man completes 5/8 of a job in 10 days. At this rate, how many more days will it take him to finish the job? (M.B.A., 2003)",
    "options": {
      "a": "18",
      "b": "32",
      "c": "48",
      "d": "98",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "32",
    "book_page": 496,
    "topic": "Work Rate and Remaining Time"
  },
  {
    "id": "chain-rule-016",
    "chapter": "Chain Rule",
    "question_number": 16,
    "question": "56 men can complete a piece of work in 24 days. In how many days can 42 men complete the same piece of work? (Bank P.O., 2008)",
    "options": {
      "a": "18",
      "b": "32",
      "c": "48",
      "d": "98",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "32",
    "book_page": 497,
    "topic": "Men and Days Inverse Ratio"
  },
  {
    "id": "chain-rule-017",
    "chapter": "Chain Rule",
    "question_number": 17,
    "question": "30 men can do a piece of work in 16 days. How many men would be required to do the same work in 20 days? (Bank P.O., 2008)",
    "options": {
      "a": "12",
      "b": "24",
      "c": "36",
      "d": "48",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "24",
    "book_page": 497,
    "topic": "Men and Days Inverse Ratio"
  },
  {
    "id": "chain-rule-018",
    "chapter": "Chain Rule",
    "question_number": 18,
    "question": "A group of workers promise to complete a piece of work in 10 days, but five of them do not report for work. If it took the remaining workers 12 days to complete the work, then the number of workers originally hired was",
    "options": {
      "a": "15",
      "b": "25",
      "c": "30",
      "d": "45"
    },
    "correct_option": "c",
    "answer": "30",
    "book_page": 497,
    "topic": "Absent Workers Calculation"
  },
  {
    "id": "chain-rule-019",
    "chapter": "Chain Rule",
    "question_number": 19,
    "question": "A wheel that has 6 cogs is meshed with a larger wheel of 14 cogs. When the smaller wheel has made 21 revolutions, then the number of revolutions made by the larger wheel is",
    "options": {
      "a": "4",
      "b": "9",
      "c": "12",
      "d": "49"
    },
    "correct_option": "b",
    "answer": "9",
    "book_page": 497,
    "topic": "Gear Cogs and Revolutions"
  },
  {
    "id": "chain-rule-020",
    "chapter": "Chain Rule",
    "question_number": 20,
    "question": "In a camp, there is a meal for 120 men or 200 children. If 150 children have taken the meal, how many men will be catered to with the remaining meal?",
    "options": {
      "a": "20",
      "b": "30",
      "c": "40",
      "d": "50"
    },
    "correct_option": "b",
    "answer": "30",
    "book_page": 498,
    "topic": "Meal Equivalence Ratio"
  },
  {
    "id": "chain-rule-021",
    "chapter": "Chain Rule",
    "question_number": 21,
    "question": "The cost of 16 packets of salt, each weighing 900 grams is ₹ 28. What will be the cost of 27 packets, if each packet weighs 1 kg?",
    "options": {
      "a": "₹ 52.50",
      "b": "₹ 56",
      "c": "₹ 58.50",
      "d": "₹ 64.75"
    },
    "correct_option": "a",
    "answer": "₹ 52.50",
    "book_page": 498,
    "topic": "Compound Chain Rule (Packets & Weight)"
  },
  {
    "id": "chain-rule-022",
    "chapter": "Chain Rule",
    "question_number": 22,
    "question": "4 mat-weavers can weave 4 mats in 4 days. At the same rate, how many mats would be woven by 8 mat-weavers in 8 days? (S.S.C., 2004)",
    "options": {
      "a": "4",
      "b": "8",
      "c": "12",
      "d": "16"
    },
    "correct_option": "d",
    "answer": "16",
    "book_page": 498,
    "topic": "Men, Days and Work Output"
  },
  {
    "id": "chain-rule-023",
    "chapter": "Chain Rule",
    "question_number": 23,
    "question": "If 7 maids with 7 mops cleaned 7 floors in 7 hours, how long would it take 3 maids to mop 3 floors with 3 mops? (M.A.T., 2005)",
    "options": {
      "a": "7/3 hours",
      "b": "3 hours",
      "c": "49/3 hours",
      "d": "7 hours"
    },
    "correct_option": "d",
    "answer": "7 hours",
    "book_page": 498,
    "topic": "Chain Rule Riddle"
  },
  {
    "id": "chain-rule-024",
    "chapter": "Chain Rule",
    "question_number": 24,
    "question": "Four gardeners with four grass mowers mow 400 sq. m of ground in 4 hours. How long would it take for eight gardeners with eight grass mowers to mow 800 sq. m of ground? (CLAT, 2010)",
    "options": {
      "a": "4 hours",
      "b": "6 hours",
      "c": "8 hours",
      "d": "12 hours"
    },
    "correct_option": "a",
    "answer": "4 hours",
    "book_page": 499,
    "topic": "Area Mowing Time"
  },
  {
    "id": "chain-rule-025",
    "chapter": "Chain Rule",
    "question_number": 25,
    "question": "Running at the same constant rate, 6 identical machines can produce a total of 180 bottles per hour. How many bottles could 15 such machines produce in 30 minutes? (SNAP, 2010)",
    "options": {
      "a": "225",
      "b": "250",
      "c": "300",
      "d": "350"
    },
    "correct_option": "a",
    "answer": "225",
    "book_page": 499,
    "topic": "Machine Production Rate"
  },
  {
    "id": "chain-rule-026",
    "chapter": "Chain Rule",
    "question_number": 26,
    "question": "If 6 persons working 8 hours a day earn ₹ 8400 per week, then 9 persons working 6 hours a day will earn per week (S.S.C., 2003)",
    "options": {
      "a": "₹ 8400",
      "b": "₹ 9450",
      "c": "₹ 16200",
      "d": "₹ 16800"
    },
    "correct_option": "b",
    "answer": "₹ 9450",
    "book_page": 499,
    "topic": "Earning Rate Chain Rule"
  },
  {
    "id": "chain-rule-027",
    "chapter": "Chain Rule",
    "question_number": 27,
    "question": "If 5 workers can collect 60 kg wheat in 3 days, how many kilograms of wheat will 8 workers collect in 5 days? (Bank P.O., 2007)",
    "options": {
      "a": "80 kg",
      "b": "100 kg",
      "c": "120 kg",
      "d": "160 kg"
    },
    "correct_option": "d",
    "answer": "160 kg",
    "book_page": 499,
    "topic": "Workers and Harvest Collection"
  },
  {
    "id": "chain-rule-028",
    "chapter": "Chain Rule",
    "question_number": 28,
    "question": "50 people consume 350 kg of rice in 30 days. In how many days will 35 people consume 50 kg of rice? (NABARD, 2008)",
    "options": {
      "a": "2 days",
      "b": "3 days",
      "c": "5 days",
      "d": "7 days",
      "e": "None of these"
    },
    "correct_option": "e",
    "answer": "None of these",
    "book_page": 500,
    "topic": "Ration Consumption Days"
  },
  {
    "id": "chain-rule-029",
    "chapter": "Chain Rule",
    "question_number": 29,
    "question": "In a dairy farm, 40 cows eat 40 bags of husk in 40 days. In how many days one cow will eat one bag of husk?",
    "options": {
      "a": "1",
      "b": "1/40",
      "c": "40",
      "d": "80"
    },
    "correct_option": "c",
    "answer": "40",
    "book_page": 500,
    "topic": "Cows and Husk Consumption"
  },
  {
    "id": "chain-rule-030",
    "chapter": "Chain Rule",
    "question_number": 30,
    "question": "Working 8 hours a day, 12 men can do a work in 30 days. Working 4 hours a day, 18 men can do the work in (P.C.S., 2006)",
    "options": {
      "a": "30 days",
      "b": "40 days",
      "c": "45 days",
      "d": "50 days"
    },
    "correct_option": "b",
    "answer": "40 days",
    "book_page": 500,
    "topic": "Hours, Men and Days"
  },
  {
    "id": "chain-rule-031",
    "chapter": "Chain Rule",
    "question_number": 31,
    "question": "12 men working 8 hours per day complete a piece of work in 10 days. To complete the same work in 8 days, working 15 hours a day, the number of men required, is:",
    "options": {
      "a": "4",
      "b": "5",
      "c": "6",
      "d": "8"
    },
    "correct_option": "d",
    "answer": "8",
    "book_page": 500,
    "topic": "Manpower Calculation"
  },
  {
    "id": "chain-rule-032",
    "chapter": "Chain Rule",
    "question_number": 32,
    "question": "5 persons can prepare an admission list in 8 days working 7 hours a day. If 2 persons join them so as to complete the work in 4 days, they need to work per day for (S.S.C., 2004)",
    "options": {
      "a": "8 hours",
      "b": "9 hours",
      "c": "10 hours",
      "d": "12 hours"
    },
    "correct_option": "c",
    "answer": "10 hours",
    "book_page": 501,
    "topic": "Working Hours Adjustment"
  },
  {
    "id": "chain-rule-033",
    "chapter": "Chain Rule",
    "question_number": 33,
    "question": "3 pumps, working 8 hours a day, can empty a tank in 2 days. How many hours a day must 4 pumps work to empty the tank in 1 day?",
    "options": {
      "a": "9",
      "b": "10",
      "c": "11",
      "d": "12"
    },
    "correct_option": "d",
    "answer": "12",
    "book_page": 501,
    "topic": "Pumps Emptying Tank"
  },
  {
    "id": "chain-rule-034",
    "chapter": "Chain Rule",
    "question_number": 34,
    "question": "If 8 men can reap 80 hectares in 24 days, then how many hectares can 36 men reap in 30 days?",
    "options": {
      "a": "350",
      "b": "400",
      "c": "425",
      "d": "450"
    },
    "correct_option": "d",
    "answer": "450",
    "book_page": 501,
    "topic": "Reaping Area Chain Rule"
  },
  {
    "id": "chain-rule-035",
    "chapter": "Chain Rule",
    "question_number": 35,
    "question": "A certain number of persons can dig a trench 100 m long, 50 m broad and 10 m deep in 10 days. The same number of persons can dig another trench 20 m broad and 15 m deep in 30 days. The length of the second trench is",
    "options": {
      "a": "400 m",
      "b": "500 m",
      "c": "800 m",
      "d": "900 m"
    },
    "correct_option": "b",
    "answer": "500 m",
    "book_page": 501,
    "topic": "Trench Volume Chain Rule"
  },
  {
    "id": "chain-rule-036",
    "chapter": "Chain Rule",
    "question_number": 36,
    "question": "If 5 men or 7 women can earn ₹ 5250 per day, how much would 7 men and 13 women earn per day? (S.S.C., 2010)",
    "options": {
      "a": "₹ 11600",
      "b": "₹ 11700",
      "c": "₹ 16100",
      "d": "₹ 17100"
    },
    "correct_option": "d",
    "answer": "₹ 17100",
    "book_page": 502,
    "topic": "Men or Women Earnings"
  },
  {
    "id": "chain-rule-037",
    "chapter": "Chain Rule",
    "question_number": 37,
    "question": "3 men or 6 women can do a piece of work in 20 days. In how many days will 12 men and 8 women do the same work? (P.C.S., 2008)",
    "options": {
      "a": "3 1/2 days",
      "b": "3 3/4 days",
      "c": "4 days",
      "d": "5 days"
    },
    "correct_option": "b",
    "answer": "3 3/4 days",
    "book_page": 502,
    "topic": "Men or Women Work Days"
  },
  {
    "id": "chain-rule-038",
    "chapter": "Chain Rule",
    "question_number": 38,
    "question": "If 5 men or 9 women can do a piece of work in 19 days, then in how many days will 3 men and 6 women do the same work?",
    "options": {
      "a": "12",
      "b": "15",
      "c": "18",
      "d": "21"
    },
    "correct_option": "b",
    "answer": "15",
    "book_page": 502,
    "topic": "Men or Women Work Days"
  },
  {
    "id": "chain-rule-039",
    "chapter": "Chain Rule",
    "question_number": 39,
    "question": "49 pumps can empty a reservoir in 6 1/2 days, working 8 hours a day. If 196 pumps are used for 5 hours each day, then the same work will be completed in",
    "options": {
      "a": "2 days",
      "b": "2 1/2 days",
      "c": "2 3/5 days",
      "d": "3 days"
    },
    "correct_option": "c",
    "answer": "2 3/5 days",
    "book_page": 502,
    "topic": "Pumps and Reservoir Time"
  },
  {
    "id": "chain-rule-040",
    "chapter": "Chain Rule",
    "question_number": 40,
    "question": "30 labourers, working 7 hours a day can finish a piece of work in 18 days. If the labourers work 6 hours a day, then the number of labourers to finish the same piece of work in 30 days, will be:",
    "options": {
      "a": "15",
      "b": "21",
      "c": "22",
      "d": "25"
    },
    "correct_option": "b",
    "answer": "21",
    "book_page": 503,
    "topic": "Labourers Required"
  },
  {
    "id": "chain-rule-041",
    "chapter": "Chain Rule",
    "question_number": 41,
    "question": "If 18 pumps can raise 2170 tonnes of water in 10 days, working 7 hours a day; in how many days will 16 pumps raise 1736 tonnes of water, working 9 hours a day?",
    "options": {
      "a": "6",
      "b": "7",
      "c": "8",
      "d": "9"
    },
    "correct_option": "b",
    "answer": "7",
    "book_page": 503,
    "topic": "Pumps Water Lifting"
  },
  {
    "id": "chain-rule-042",
    "chapter": "Chain Rule",
    "question_number": 42,
    "question": "If 80 lamps can be lighted, 5 hours per day for 10 days for ₹ 21.25, then the number of lamps, which can be lighted 4 hours daily for 30 days, for ₹ 76.50, is",
    "options": {
      "a": "100",
      "b": "120",
      "c": "150",
      "d": "160"
    },
    "correct_option": "b",
    "answer": "120",
    "book_page": 503,
    "topic": "Lamps Lighting Expense"
  },
  {
    "id": "chain-rule-043",
    "chapter": "Chain Rule",
    "question_number": 43,
    "question": "If 12 carpenters, working 6 hours a day, can make 460 chairs in 24 days, how many chairs will 18 carpenters make in 36 days, each working 8 hours a day?",
    "options": {
      "a": "1260",
      "b": "1320",
      "c": "920",
      "d": "1380"
    },
    "correct_option": "d",
    "answer": "1380",
    "book_page": 503,
    "topic": "Carpenters Chair Making"
  },
  {
    "id": "chain-rule-044",
    "chapter": "Chain Rule",
    "question_number": 44,
    "question": "If 5 spiders can catch five flies in five minutes, how many flies can hundred spiders catch in 100 minutes? (SNAP, 2005)",
    "options": {
      "a": "100",
      "b": "500",
      "c": "1000",
      "d": "2000"
    },
    "correct_option": "d",
    "answer": "2000",
    "book_page": 504,
    "topic": "Spiders and Flies Rate"
  },
  {
    "id": "chain-rule-045",
    "chapter": "Chain Rule",
    "question_number": 45,
    "question": "2 persons working 2 hours a day assemble 2 machines in 2 days. The number of machines assembled by 6 persons working 6 hours a day in 6 days is (A.A.O., 2009)",
    "options": {
      "a": "6",
      "b": "18",
      "c": "27",
      "d": "54"
    },
    "correct_option": "d",
    "answer": "54",
    "book_page": 504,
    "topic": "Machine Assembly Output"
  },
  {
    "id": "chain-rule-046",
    "chapter": "Chain Rule",
    "question_number": 46,
    "question": "The work done by a man is double the work done by a woman in the same time. If 10 men can do a piece of work in 8 days, then in how many days that work can be done by 3 men and 4 women?",
    "options": {
      "a": "4",
      "b": "7 3/11",
      "c": "8",
      "d": "16"
    },
    "correct_option": "d",
    "answer": "16",
    "book_page": 504,
    "topic": "Man and Woman Efficiency Ratio"
  },
  {
    "id": "chain-rule-047",
    "chapter": "Chain Rule",
    "question_number": 47,
    "question": "A wall of 100 metres can be built by 7 men or 10 women in 10 days. How many days will 14 men and 20 women take to build a wall of 600 metres?",
    "options": {
      "a": "15",
      "b": "20",
      "c": "25",
      "d": "30"
    },
    "correct_option": "a",
    "answer": "15",
    "book_page": 504,
    "topic": "Wall Construction Chain Rule"
  },
  {
    "id": "chain-rule-048",
    "chapter": "Chain Rule",
    "question_number": 48,
    "question": "If 10 men or 20 boys can make 260 mats in 20 days, then how many mats will be made by 8 men and 4 boys in 20 days? (C.P.O., 2007)",
    "options": {
      "a": "240",
      "b": "260",
      "c": "280",
      "d": "520"
    },
    "correct_option": "b",
    "answer": "260",
    "book_page": 505,
    "topic": "Men or Boys Mat Production"
  },
  {
    "id": "chain-rule-049",
    "chapter": "Chain Rule",
    "question_number": 49,
    "question": "If 600 men dig a 5.5 m wide, 4 m deep and 405 m long canal in half an hour, then how long a canal will 2500 men, working for 6 hours, dig if it is 10 m wide and 8 m deep?",
    "options": {
      "a": "2694 1/3 m",
      "b": "4082 m",
      "c": "5568 3/4 m",
      "d": "6452 m"
    },
    "correct_option": "c",
    "answer": "5568 3/4 m",
    "book_page": 505,
    "topic": "Canal Dimensions & Volume"
  },
  {
    "id": "chain-rule-050",
    "chapter": "Chain Rule",
    "question_number": 50,
    "question": "64 persons can dig a trench 50 m long, 2 m wide and 2 m deep in 5 days, working 12 hours daily. In how many days, working 8 hours daily, will 80 persons dig another trench 75 m long, 4 m wide and 3 m deep?",
    "options": {
      "a": "18",
      "b": "27",
      "c": "36",
      "d": "45"
    },
    "correct_option": "b",
    "answer": "27",
    "book_page": 505,
    "topic": "Trench Excavation Days"
  },
  {
    "id": "chain-rule-051",
    "chapter": "Chain Rule",
    "question_number": 51,
    "question": "21 binders can bind 1400 books in 15 days. How many binders will be required to bind 800 books in 20 days? (Bank P.O., 2009)",
    "options": {
      "a": "7",
      "b": "9",
      "c": "12",
      "d": "14",
      "e": "None of these"
    },
    "correct_option": "b",
    "answer": "9",
    "book_page": 505,
    "topic": "Book Binders Calculation"
  },
  {
    "id": "chain-rule-052",
    "chapter": "Chain Rule",
    "question_number": 52,
    "question": "A certain number of artisans can complete a shoe fabrication consignment in 16 days. 8 additional artisans had to be deployed for the same consignment and together they completed it in 4 days less than the earlier estimate. The number of artisans initially employed was",
    "options": {
      "a": "18",
      "b": "20",
      "c": "24",
      "d": "None of these"
    },
    "correct_option": "c",
    "answer": "24",
    "book_page": 506,
    "topic": "Initial Artisans Calculation"
  },
  {
    "id": "chain-rule-053",
    "chapter": "Chain Rule",
    "question_number": 53,
    "question": "If 9 examiners can examine a certain number of answer books in 12 days, working 5 hours a day; for how many hours a day would 4 examiners have to work in order to examine twice the number of answer books in 30 days?",
    "options": {
      "a": "6",
      "b": "8",
      "c": "9",
      "d": "10"
    },
    "correct_option": "c",
    "answer": "9",
    "book_page": 506,
    "topic": "Answer Books Evaluation"
  },
  {
    "id": "chain-rule-054",
    "chapter": "Chain Rule",
    "question_number": 54,
    "question": "If 17 labourers can dig a ditch 20 m long in 18 days, working 8 hours a day; how many more labourers should be engaged to dig a similar ditch 39 m long in 6 days, each labourer working 9 hours a day?",
    "options": {
      "a": "34",
      "b": "51",
      "c": "68",
      "d": "85"
    },
    "correct_option": "b",
    "answer": "51",
    "book_page": 506,
    "topic": "Additional Labourers Required"
  },
  {
    "id": "chain-rule-055",
    "chapter": "Chain Rule",
    "question_number": 55,
    "question": "20 men complete one-third of a piece of work in 20 days. How many more men should be employed to finish the rest of the work in 25 more days? (G.B.O., 2007)",
    "options": {
      "a": "10",
      "b": "12",
      "c": "15",
      "d": "20"
    },
    "correct_option": "b",
    "answer": "12",
    "book_page": 506,
    "topic": "Fractional Work Completion"
  },
  {
    "id": "chain-rule-056",
    "chapter": "Chain Rule",
    "question_number": 56,
    "question": "A rope makes 70 rounds of the circumference of a cylinder whose radius of the base is 14 cm. How many times can it go round a cylinder with radius 20 cm?",
    "options": {
      "a": "40",
      "b": "49",
      "c": "100",
      "d": "None of these"
    },
    "correct_option": "b",
    "answer": "49",
    "book_page": 507,
    "topic": "Cylinder Circumference Rounds"
  },
  {
    "id": "chain-rule-057",
    "chapter": "Chain Rule",
    "question_number": 57,
    "question": "If x men, working x hours per day, can do x units of work in x days, then y men, working y hours per day would be able to complete how many units of work in y days?",
    "options": {
      "a": "x² / y³",
      "b": "y³ / x²",
      "c": "y² / x³",
      "d": "x³ / y²"
    },
    "correct_option": "b",
    "answer": "y³ / x²",
    "book_page": 507,
    "topic": "Algebraic Chain Rule Formula"
  },
  {
    "id": "chain-rule-058",
    "chapter": "Chain Rule",
    "question_number": 58,
    "question": "A contract is to be completed in 46 days and 117 men were set to work, each working 8 hours a day. After 33 days, 4/7 of the work is completed. How many additional men may be employed so that the work may be completed in time, each man now working 9 hours a day? (M.A.T., 2005)",
    "options": {
      "a": "80",
      "b": "81",
      "c": "82",
      "d": "83"
    },
    "correct_option": "b",
    "answer": "81",
    "book_page": 507,
    "topic": "Contract Completion & Additional Men"
  },
  {
    "id": "chain-rule-059",
    "chapter": "Chain Rule",
    "question_number": 59,
    "question": "The normal dosage of a particular medicine is t tablets per day for each patient. A hospital’s current supply of these tablets will last p patients for d days. If the recommended dosage increases by 20% and the number of patients decreases by one-third, then for how many days will the hospital’s supply last?",
    "options": {
      "a": "5/4 d",
      "b": "4/5 d",
      "c": "4/5 pt",
      "d": "Cannot be determined"
    },
    "correct_option": "a",
    "answer": "5/4 d",
    "book_page": 507,
    "topic": "Medicine Supply Duration"
  },
  {
    "id": "chain-rule-060",
    "chapter": "Chain Rule",
    "question_number": 60,
    "question": "Some persons can do a piece of work in 12 days. Two times the number of such persons will do half of that work in :",
    "options": {
      "a": "6 days",
      "b": "4 days",
      "c": "3 days",
      "d": "12 days"
    },
    "correct_option": "c",
    "answer": "3 days",
    "book_page": 507,
    "topic": "Double Men Half Work"
  },
  {
    "id": "chain-rule-061",
    "chapter": "Chain Rule",
    "question_number": 61,
    "question": "12 persons can do a piece of work in 4 days. How many persons are required to complete 8 times the work in half the time? (S.S.C., 2004)",
    "options": {
      "a": "144",
      "b": "180",
      "c": "190",
      "d": "192"
    },
    "correct_option": "d",
    "answer": "192",
    "book_page": 507,
    "topic": "Multiple Work in Half Time"
  },
  {
    "id": "chain-rule-062",
    "chapter": "Chain Rule",
    "question_number": 62,
    "question": "If 5 engines consume 6 metric tonnes of coal when each is running 9 hours a day, how many metric tonnes of coal will be needed for 8 engines, each running 10 hours a day, it being given that 3 engines of the former type consume as much as 4 engines of the latter type? (M.A.T., 2008)",
    "options": {
      "a": "3 1/8",
      "b": "8",
      "c": "8 8/9",
      "d": "12 6/25"
    },
    "correct_option": "b",
    "answer": "8",
    "book_page": 508,
    "topic": "Engine Consumption Rate"
  },
  {
    "id": "chain-rule-063",
    "chapter": "Chain Rule",
    "question_number": 63,
    "question": "If 9 men working 7 1/2 hours a day can finish a piece of work in 20 days, then how many days will be taken by 12 men, working 6 hours a day to finish the work? It is being given that 2 men of latter type work as much as 3 men of the former type. (L.I.C.A.A.O., 2007)",
    "options": {
      "a": "9 1/2",
      "b": "11",
      "c": "12 1/2",
      "d": "13"
    },
    "correct_option": "c",
    "answer": "12 1/2",
    "book_page": 508,
    "topic": "Comparative Worker Efficiency"
  },
  {
    "id": "chain-rule-064",
    "chapter": "Chain Rule",
    "question_number": 64,
    "question": "If a certain number of workmen can do a piece of work in 25 hours, in how many hours will another set of an equal number of men, do a piece of work, twice as great, supposing that 2 men of the first set can do as much work in an hour, as 3 men of the second set do in an hour?",
    "options": {
      "a": "60",
      "b": "75",
      "c": "90",
      "d": "105"
    },
    "correct_option": "b",
    "answer": "75",
    "book_page": 508,
    "topic": "Workmen Efficiency Ratio"
  },
  {
    "id": "chain-rule-065",
    "chapter": "Chain Rule",
    "question_number": 65,
    "question": "15 men take 21 days of 8 hours each to do a piece of work. How many days of 6 hours each would 21 women take, if 3 women do as much work as 2 men?",
    "options": {
      "a": "18",
      "b": "20",
      "c": "25",
      "d": "30"
    },
    "correct_option": "d",
    "answer": "30",
    "book_page": 508,
    "topic": "Men vs Women Work Rates"
  },
  {
    "id": "chain-rule-066",
    "chapter": "Chain Rule",
    "question_number": 66,
    "question": "A contractor employed 30 men to do a piece of work in 38 days. After 25 days, he employed 5 men more and the work was finished one day earlier. How many days he would have been behind, if he had not employed additional men?",
    "options": {
      "a": "1",
      "b": "1 1/4",
      "c": "3 1/4",
      "d": "1 1/2"
    },
    "correct_option": "a",
    "answer": "1",
    "book_page": 508,
    "topic": "Contractor Schedule Delay"
  },
  {
    "id": "chain-rule-067",
    "chapter": "Chain Rule",
    "question_number": 67,
    "question": "In a barrack of soldiers there was stock of food for 190 days for 4000 soldiers. After 30 days 800 soldiers left the barrack. For how many days shall the left over food last for the remaining soldiers? (P.C.S., 2006)",
    "options": {
      "a": "175 days",
      "b": "200 days",
      "c": "225 days",
      "d": "250 days"
    },
    "correct_option": "b",
    "answer": "200 days",
    "book_page": 508,
    "topic": "Soldiers Barrack Provisions"
  },
  {
    "id": "chain-rule-068",
    "chapter": "Chain Rule",
    "question_number": 68,
    "question": "A garrison of 500 men had provisions for 27 days. After 3 days a reinforcement of 300 men arrived. For how many more days will the remaining food last now? (M.B.A., 2006)",
    "options": {
      "a": "15",
      "b": "16",
      "c": "17 1/2",
      "d": "18"
    },
    "correct_option": "a",
    "answer": "15",
    "book_page": 508,
    "topic": "Garrison Reinforcement Provisions"
  },
  {
    "id": "chain-rule-069",
    "chapter": "Chain Rule",
    "question_number": 69,
    "question": "A garrison had provisions for a certain number of days. After 10 days, 1/5 of the men desert and it is found that the provisions will now last just as long as before. How long was that? (M.B.A., 2003)",
    "options": {
      "a": "15 days",
      "b": "25 days",
      "c": "35 days",
      "d": "50 days"
    },
    "correct_option": "d",
    "answer": "50 days",
    "book_page": 508,
    "topic": "Desertion and Provision Duration"
  },
  {
    "id": "chain-rule-070",
    "chapter": "Chain Rule",
    "question_number": 70,
    "question": "A fort has provisions for 50 days. If after 10 days they are strengthened by 500 men and the food lasts for 35 days longer, the number of men originally in the fort were",
    "options": {
      "a": "2500",
      "b": "3000",
      "c": "3500",
      "d": "4000"
    },
    "correct_option": "c",
    "answer": "3500",
    "book_page": 508,
    "topic": "Original Fort Men Calculation"
  },
  {
    "id": "chain-rule-071",
    "chapter": "Chain Rule",
    "question_number": 71,
    "question": "A garrison of 2000 men has provision of ration for 66 days. At the end of a fortnight, reinforcement arrives and it is found that ration will last only for 20 days more. The strength of the reinforcement is",
    "options": {
      "a": "2000",
      "b": "2200",
      "c": "2600",
      "d": "3200"
    },
    "correct_option": "d",
    "answer": "3200",
    "book_page": 508,
    "topic": "Reinforcement Strength Calculation"
  },
  {
    "id": "chain-rule-072",
    "chapter": "Chain Rule",
    "question_number": 72,
    "question": "A team of workers was employed by a contractor who undertook to finish 360 pieces of an article in a certain number of days. Making four more pieces per day than was planned, they could complete the job a day ahead of schedule. How many days did they take to complete the job? (M.A.T., 2007)",
    "options": {
      "a": "8 days",
      "b": "9 days",
      "c": "10 days",
      "d": "12 days"
    },
    "correct_option": "c",
    "answer": "10 days",
    "book_page": 509,
    "topic": "Production Speed Increase"
  },
  {
    "id": "chain-rule-073",
    "chapter": "Chain Rule",
    "question_number": 73,
    "question": "The work done by a woman in 8 hours is equal to the work done by a man in 6 hours and by a boy in 12 hours. If working 6 hours per day 9 men can complete a work in 6 days, then in how many days can 12 men, 12 women and 12 boys together finish the same work, working 8 hours per day? (M.A.T., 2007)",
    "options": {
      "a": "1 1/2 days",
      "b": "3 days",
      "c": "2 2/3 days",
      "d": "1 1/2 days"
    },
    "correct_option": "a",
    "answer": "1 1/2 days",
    "book_page": 509,
    "topic": "Combined Men Women Boys Rate"
  },
  {
    "id": "chain-rule-074",
    "chapter": "Chain Rule",
    "question_number": 74,
    "question": "12 men and 18 boys, working 7 1/2 hours a day, can do a piece of work in 60 days. If a man works equal to 2 boys, then how many boys will be required to help 21 men to do twice the work in 50 days, working 9 hours a day?",
    "options": {
      "a": "30",
      "b": "42",
      "c": "48",
      "d": "90"
    },
    "correct_option": "b",
    "answer": "42",
    "book_page": 509,
    "topic": "Boys Assistance Calculation"
  },
  {
    "id": "chain-rule-075",
    "chapter": "Chain Rule",
    "question_number": 75,
    "question": "If 3 men or 6 boys can do a piece of work in 10 days, working 7 hours a day; how many days will it take to complete a piece of work twice as large with 6 men and 2 boys working together for 8 hours a day?",
    "options": {
      "a": "6 1/2 days",
      "b": "7 days",
      "c": "8 days",
      "d": "9 1/2 days"
    },
    "correct_option": "b",
    "answer": "7 days",
    "book_page": 509,
    "topic": "Double Work Rate Calculation"
  },
  {
    "id": "chain-rule-076",
    "chapter": "Chain Rule",
    "question_number": 76,
    "question": "2 men and 7 boys can do a piece of work in 14 days; 3 men and 8 boys can do the same in 11 days. Then, 8 men and 6 boys can do three times the amount of this work in :",
    "options": {
      "a": "18 days",
      "b": "21 days",
      "c": "24 days",
      "d": "30 days"
    },
    "correct_option": "b",
    "answer": "21 days",
    "book_page": 509,
    "topic": "Simultaneous Equations for Men and Boys"
  },
  {
    "id": "chain-rule-077",
    "chapter": "Chain Rule",
    "question_number": 77,
    "question": "Large, medium and small ships are used to bring water. 4 large ships carry as much water as 7 small ships, 3 medium ships carry the same amount of water as 2 large ships and 1 small ship. 15 large, 7 medium and 14 small ships, each made 36 journeys and brought a certain quantity of water. In how many journeys would 12 large, 14 medium and 21 small ships bring the same quantity? (M.A.T., 2007)",
    "options": {
      "a": "25",
      "b": "29",
      "c": "32",
      "d": "49"
    },
    "correct_option": "b",
    "answer": "29",
    "book_page": 509,
    "topic": "Ship Capacities Ratio"
  },
  {
    "id": "chain-rule-078",
    "chapter": "Chain Rule",
    "question_number": 78,
    "question": "If 2 m 60 cm cloth is required for one shirt, then the cloth required for 7 shirts is ........ [APTET, 2011]",
    "options": {
      "a": "14 m 80 cm",
      "b": "18 m 20 cm",
      "c": "15 m 20 cm",
      "d": "16 m 80 cm"
    },
    "correct_option": "b",
    "answer": "18 m 20 cm",
    "book_page": 509,
    "topic": "Cloth Length Multiplication"
  },
  {
    "id": "chain-rule-079",
    "chapter": "Chain Rule",
    "question_number": 79,
    "question": "The cost of 4 dozen papers is ₹ 24. The cost of 1 score of papers (in rupees) is ........ [APTET, 2011]",
    "options": {
      "a": "40",
      "b": "20",
      "c": "10",
      "d": "42"
    },
    "correct_option": "c",
    "answer": "10",
    "book_page": 509,
    "topic": "Dozen and Score Conversion"
  },
  {
    "id": "chain-rule-080",
    "chapter": "Chain Rule",
    "question_number": 80,
    "question": "The cost of 8 fans and 14 ovens is ₹ 36,520. What is the cost of 12 fans and 21 ovens? [SBI—Clerk Level, 2012]",
    "options": {
      "a": "₹ 56,800",
      "b": "₹ 54,780",
      "c": "₹ 57,950",
      "d": "Cannot be determined"
    },
    "correct_option": "b",
    "answer": "₹ 54,780",
    "book_page": 509,
    "topic": "Multiple Equations Cost Scaling"
  },
  {
    "id": "chain-rule-081",
    "chapter": "Chain Rule",
    "question_number": 81,
    "question": "The cost of 5 kgs of apples is ₹ 450. The cost of 12 dozen mangoes is ₹ 4,320 and the cost of 4 kgs of oranges is ₹ 240. What is the total cost of 8 kg of apples, 8 dozens of mangoes and 8 kg of oranges? [MAT—2012]",
    "options": {
      "a": "₹ 4,020",
      "b": "₹ 4,080",
      "c": "₹ 4,050",
      "d": "Other than those given as options"
    },
    "correct_option": "b",
    "answer": "₹ 4,080",
    "book_page": 509,
    "topic": "Multi-item Total Cost"
  },
  {
    "id": "chain-rule-082",
    "chapter": "Chain Rule",
    "question_number": 82,
    "question": "The cost of 21 pencils and 9 clippers is ₹ 819. The cost price of 7 pencils and 3 clippers is [DMRC—Train Operator (Station Controller), 2012]",
    "options": {
      "a": "₹ 204",
      "b": "₹ 409",
      "c": "₹ 273",
      "d": "₹ 208"
    },
    "correct_option": "c",
    "answer": "₹ 273",
    "book_page": 509,
    "topic": "Item Ratio Cost Scaling"
  }
]

chapter_data = {
  "book": "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  "chapter_number": 15,
  "chapter": "Chain Rule",
  "book_page_range": "493–509",
  "question_count": 82,
  "total_questions": 82,
  "key_concepts": key_concepts,
  "questions": questions
}

server_path = "/home/jyoti/Project/PLACEMENT/server/data/rs_agrawal/chain_rule.json"
client_path = "/home/jyoti/Project/PLACEMENT/client/public/data/rs_agrawal/chain_rule.json"

os.makedirs(os.path.dirname(server_path), exist_ok=True)
os.makedirs(os.path.dirname(client_path), exist_ok=True)

with open(server_path, "w", encoding="utf-8") as f:
    json.dump(chapter_data, f, indent=2, ensure_ascii=False)

with open(client_path, "w", encoding="utf-8") as f:
    json.dump(chapter_data, f, indent=2, ensure_ascii=False)

print(f"Successfully generated Chain Rule chapter JSON with {len(questions)} questions!")
