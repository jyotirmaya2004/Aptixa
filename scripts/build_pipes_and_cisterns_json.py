import json
import os

key_concepts = [
  {
    "topic": "Inlet and Outlet",
    "formula": "Inlet: A pipe connected with a tank/cistern that fills it.\nOutlet: A pipe connected with a tank/cistern that empties it."
  },
  {
    "topic": "Single Pipe Work Rate",
    "formula": "If an inlet fills a tank in x hours, 1/x of the tank is filled per hour.\nIf an outlet empties a tank in y hours, 1/y of the tank is emptied per hour."
  },
  {
    "topic": "Net Filling and Emptying Rate",
    "formula": "If an inlet fills in x hours and an outlet empties in y hours (y > x):\nNet work done per hour = (1/x - 1/y).\nIf outlet is faster (x > y):\nNet emptying rate per hour = (1/y - 1/x)."
  },
  {
    "topic": "Pipe Diameter Relation",
    "formula": "The volume flow rate of a pipe is proportional to the square of its radius/diameter (d²). Time required is inversely proportional to d²."
  }
]

questions = [
  {
    "id": "pipes-and-cisterns-001",
    "chapter": "Pipes and Cisterns",
    "question_number": 1,
    "question": "In 1 minute, 3/7 of a bucket is filled. The rest of the bucket can be filled in (R.R.B., 2006)",
    "options": {
      "a": "7/3 minutes",
      "b": "7/4 minutes",
      "c": "4/3 minutes",
      "d": "None of these"
    },
    "correct_option": "c",
    "answer": "4/3 minutes",
    "book_page": 510,
    "topic": "Basic Filling Fraction"
  },
  {
    "id": "pipes-and-cisterns-002",
    "chapter": "Pipes and Cisterns",
    "question_number": 2,
    "question": "The petrol tank of an automobile can hold g litres. If a litres was removed when the tank was full, what part of the full tank was removed? (Campus Recruitment, 2008)",
    "options": {
      "a": "g – a",
      "b": "g / a",
      "c": "a / g",
      "d": "(g - a) / a",
      "e": "(g - a) / g"
    },
    "correct_option": "c",
    "answer": "a / g",
    "book_page": 510,
    "topic": "Volume Ratio"
  },
  {
    "id": "pipes-and-cisterns-003",
    "chapter": "Pipes and Cisterns",
    "question_number": 3,
    "question": "Water is continuously supplied from a reservoir to a locality at the steady rate of 10,000 litres per hour. When delivery exceeds demand the excess water is stored in a tank. If the demand for 8 consecutive three-hour periods is 10000, 10000, 45000, 25000, 40000, 15000, 60000 and 35000 litres respectively, what will be the minimum capacity required of the water tank (in thousand litres) to meet the demand and avoid any wastage? (Campus Recruitment, 2004)",
    "options": {
      "a": "10",
      "b": "30",
      "c": "40",
      "d": "50"
    },
    "correct_option": "c",
    "answer": "40",
    "book_page": 511,
    "topic": "Reservoir Minimum Capacity"
  },
  {
    "id": "pipes-and-cisterns-004",
    "chapter": "Pipes and Cisterns",
    "question_number": 4,
    "question": "Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both the pipes are used together, how long will it take to fill the tank? (M.A.T., 2003; C.P.O., 2003)",
    "options": {
      "a": "12 minutes",
      "b": "15 minutes",
      "c": "25 minutes",
      "d": "50 minutes"
    },
    "correct_option": "a",
    "answer": "12 minutes",
    "book_page": 511,
    "topic": "Two Inlets Filling Together"
  },
  {
    "id": "pipes-and-cisterns-005",
    "chapter": "Pipes and Cisterns",
    "question_number": 5,
    "question": "A pipe can fill a tank in x hours and another pipe can empty it in y (y > x) hours. If both the pipes are open, in how many hours will the tank be filled? (S.S.C., 2007)",
    "options": {
      "a": "(x – y) hours",
      "b": "(y – x) hours",
      "c": "xy / (x - y) hours",
      "d": "xy / (y - x) hours"
    },
    "correct_option": "d",
    "answer": "xy / (y - x) hours",
    "book_page": 511,
    "topic": "Inlet and Outlet Formula"
  },
  {
    "id": "pipes-and-cisterns-006",
    "chapter": "Pipes and Cisterns",
    "question_number": 6,
    "question": "A tap can completely fill a water tank in 8 hours. The water tank has a hole in it through which the water leaks out. The leakage will cause the full water tank to get empty in 12 hours. How much time will it take for the tap to fill the tank completely with the hole? (R.B.I., 2004)",
    "options": {
      "a": "16 hours",
      "b": "18 hours",
      "c": "24 hours",
      "d": "None of these"
    },
    "correct_option": "c",
    "answer": "24 hours",
    "book_page": 512,
    "topic": "Inlet with Leakage"
  },
  {
    "id": "pipes-and-cisterns-007",
    "chapter": "Pipes and Cisterns",
    "question_number": 7,
    "question": "A tap can fill a tank in 48 minutes whereas another tap can empty it in 2 hours. If both the taps are opened at 11 : 40 A.M, then the tank will be filled at (JMET, 2004)",
    "options": {
      "a": "12 : 40 P.M.",
      "b": "1 : 00 P.M.",
      "c": "1 : 20 P.M.",
      "d": "1 : 30 P.M."
    },
    "correct_option": "b",
    "answer": "1 : 00 P.M.",
    "book_page": 512,
    "topic": "Clock Time Calculation"
  },
  {
    "id": "pipes-and-cisterns-008",
    "chapter": "Pipes and Cisterns",
    "question_number": 8,
    "question": "A tank with capacity T litres is empty. If water flows into the tank from pipe X at the rate of x litres per minute and water is pumped out by Y at the rate of y litres per minute and x > y, then in how many minutes will the tank be filled? (M.B.A., 2002)",
    "options": {
      "a": "60T / (x - y)",
      "b": "(T - x)y",
      "c": "T / (x - y)",
      "d": "T / (y - x)"
    },
    "correct_option": "c",
    "answer": "T / (x - y)",
    "book_page": 512,
    "topic": "Net Flow Rate Formula"
  },
  {
    "id": "pipes-and-cisterns-009",
    "chapter": "Pipes and Cisterns",
    "question_number": 9,
    "question": "Pipes A and B can fill a tank in 20 hours and 30 hours respectively and pipe C can empty the full tank in 40 hours. If all the pipes are opened together, how much time will be needed to make the tank full? (D.E.T. Exam, 2004)",
    "options": {
      "a": "10 3/7 hours",
      "b": "12 4/5 hours",
      "c": "17 1/7 hours",
      "d": "19 1/4 hours"
    },
    "correct_option": "c",
    "answer": "17 1/7 hours",
    "book_page": 513,
    "topic": "Two Inlets and One Outlet"
  },
  {
    "id": "pipes-and-cisterns-010",
    "chapter": "Pipes and Cisterns",
    "question_number": 10,
    "question": "A pipe can fill a tank in 3 hours. There are two outlet pipes from the tank which can empty it in 7 and 10 hours respectively. If all the three pipes are opened simultaneously, then the tank will be filled in (M.B.A., 2002)",
    "options": {
      "a": "8 hours",
      "b": "9 hours",
      "c": "10 hours",
      "d": "11 hours"
    },
    "correct_option": "d",
    "answer": "11 hours",
    "book_page": 513,
    "topic": "One Inlet and Two Outlets"
  },
  {
    "id": "pipes-and-cisterns-011",
    "chapter": "Pipes and Cisterns",
    "question_number": 11,
    "question": "In what time would a cistern be filled by three pipes whose diameters are 1 cm, 1 1/3 cm and 2 cm running together, when the largest alone will fill it in 61 minutes, the amount of water flowing in by each pipe, being proportional to the square of its diameter? (Railways, 2006)",
    "options": {
      "a": "25 minutes",
      "b": "30 minutes",
      "c": "36 minutes",
      "d": "40 minutes"
    },
    "correct_option": "c",
    "answer": "36 minutes",
    "book_page": 513,
    "topic": "Pipe Diameter Square Proportion"
  },
  {
    "id": "pipes-and-cisterns-012",
    "chapter": "Pipes and Cisterns",
    "question_number": 12,
    "question": "A tap can fill a tank in 6 hours. After half the tank is filled, three more similar taps are opened. What is the total time taken to fill the tank completely?",
    "options": {
      "a": "3 hrs 15 min",
      "b": "3 hrs 45 min",
      "c": "4 hrs",
      "d": "4 hrs 15 min"
    },
    "correct_option": "b",
    "answer": "3 hrs 45 min",
    "book_page": 514,
    "topic": "Opening Additional Taps"
  },
  {
    "id": "pipes-and-cisterns-013",
    "chapter": "Pipes and Cisterns",
    "question_number": 13,
    "question": "A cistern has two pipes. One can fill it with water in 8 hours and other can empty it in 5 hours. In how many hours will the cistern be emptied if both the pipes are opened together when 3/4 of the cistern is already full of water?",
    "options": {
      "a": "3 1/3 hours",
      "b": "6 hours",
      "c": "10 hours",
      "d": "13 1/3 hours"
    },
    "correct_option": "c",
    "answer": "10 hours",
    "book_page": 514,
    "topic": "Emptying Partially Filled Tank"
  },
  {
    "id": "pipes-and-cisterns-014",
    "chapter": "Pipes and Cisterns",
    "question_number": 14,
    "question": "A vessel has three pipes connected to it, two to supply liquid and one to draw liquid. The first alone can fill the vessel in 4 1/2 hours, the second in 3 hours and the third can empty it in 1 1/2 hours. If all the pipes are opened simultaneously when the vessel is half full, how soon will it be emptied? (M.B.A., 2007)",
    "options": {
      "a": "4 1/2 hours",
      "b": "5 1/2 hours",
      "c": "6 1/2 hours",
      "d": "None of these"
    },
    "correct_option": "a",
    "answer": "4 1/2 hours",
    "book_page": 514,
    "topic": "Emptying Half Full Tank"
  },
  {
    "id": "pipes-and-cisterns-015",
    "chapter": "Pipes and Cisterns",
    "question_number": 15,
    "question": "Two pipes A and B can separately fill a cistern in 60 minutes and 75 minutes respectively. There is a third pipe in the bottom of the cistern to empty it. If all the three pipes are simultaneously opened then the cistern is full in 50 minutes. In how much time, the third pipe alone can empty the cistern?",
    "options": {
      "a": "90 min",
      "b": "100 min",
      "c": "110 min",
      "d": "120 min"
    },
    "correct_option": "b",
    "answer": "100 min",
    "book_page": 514,
    "topic": "Finding Unknown Outlet Rate"
  },
  {
    "id": "pipes-and-cisterns-016",
    "chapter": "Pipes and Cisterns",
    "question_number": 16,
    "question": "Eight pipes are fitted to a water tank. Some of these are water pipes to fill the tank and the remaining are waste pipes used to empty the tank. Each water pipe can fill the tank in 12 hours and each waste pipe can empty it in 36 hours. On opening all the pipes an empty tank is filled in 3 hours. The number of waste pipes is",
    "options": {
      "a": "2",
      "b": "3",
      "c": "4",
      "d": "5"
    },
    "correct_option": "b",
    "answer": "3",
    "book_page": 515,
    "topic": "Multiple Filling and Waste Pipes"
  },
  {
    "id": "pipes-and-cisterns-017",
    "chapter": "Pipes and Cisterns",
    "question_number": 17,
    "question": "A pump can fill a tank with water in 2 hours. Because of a leak, it took 2 1/3 hours to fill the tank. The leak can drain all the water of the tank in (C.P.O., 2006; S.S.C., 2002)",
    "options": {
      "a": "4 1/3 hours",
      "b": "7 hours",
      "c": "8 hours",
      "d": "14 hours"
    },
    "correct_option": "d",
    "answer": "14 hours",
    "book_page": 515,
    "topic": "Leak Emptying Time"
  },
  {
    "id": "pipes-and-cisterns-018",
    "chapter": "Pipes and Cisterns",
    "question_number": 18,
    "question": "Two taps A and B can fill a tank in 5 hours and 20 hours respectively. If both the taps are open then due to a leakage, it took 30 minutes more to fill the tank. If the tank is full, how long will it take for the leakage alone to empty the tank?",
    "options": {
      "a": "4 1/2 hrs",
      "b": "9 hrs",
      "c": "18 hrs",
      "d": "36 hrs"
    },
    "correct_option": "d",
    "answer": "36 hrs",
    "book_page": 515,
    "topic": "Leak Delay Calculation"
  },
  {
    "id": "pipes-and-cisterns-019",
    "chapter": "Pipes and Cisterns",
    "question_number": 19,
    "question": "Three pipes A, B and C can fill a tank from empty to full in 30 minutes, 20 minutes and 10 minutes respectively. When the tank is empty, all the three pipes are opened. A, B and C discharge chemical solutions P, Q and R respectively. What is the proportion of solution R in the liquid in the tank after 3 minutes? (D.M.R.C., 2003)",
    "options": {
      "a": "5/11",
      "b": "6/11",
      "c": "7/11",
      "d": "8/11"
    },
    "correct_option": "b",
    "answer": "6/11",
    "book_page": 515,
    "topic": "Chemical Solutions Proportion"
  },
  {
    "id": "pipes-and-cisterns-020",
    "chapter": "Pipes and Cisterns",
    "question_number": 20,
    "question": "Two pipes A and B together can fill a cistern in 4 hours. Had they been opened separately, then B would have taken 6 hours more than A to fill the cistern. How much time will be taken by A alone to fill the cistern?",
    "options": {
      "a": "1 hr",
      "b": "2 hrs",
      "c": "6 hrs",
      "d": "8 hrs"
    },
    "correct_option": "c",
    "answer": "6 hrs",
    "book_page": 516,
    "topic": "Quadratic Time Difference"
  },
  {
    "id": "pipes-and-cisterns-021",
    "chapter": "Pipes and Cisterns",
    "question_number": 21,
    "question": "One pipe can fill a tank three times as fast as another pipe. If together the two pipes can fill the tank in 36 minutes, then the slower pipe alone will be able to fill the tank in (C.B.I., 2003)",
    "options": {
      "a": "81 min",
      "b": "108 min",
      "c": "144 min",
      "d": "192 min"
    },
    "correct_option": "c",
    "answer": "144 min",
    "book_page": 516,
    "topic": "Pipe Speed Multiples"
  },
  {
    "id": "pipes-and-cisterns-022",
    "chapter": "Pipes and Cisterns",
    "question_number": 22,
    "question": "A tank is filled in 5 hours by three pipes A, B and C. The pipe C is twice as fast as B and B is twice as fast as A. How much time will pipe A alone take to fill the tank?",
    "options": {
      "a": "20 hrs",
      "b": "25 hrs",
      "c": "35 hrs",
      "d": "Cannot be determined",
      "e": "None of these"
    },
    "correct_option": "c",
    "answer": "35 hrs",
    "book_page": 516,
    "topic": "Relative Speed Ratios"
  },
  {
    "id": "pipes-and-cisterns-023",
    "chapter": "Pipes and Cisterns",
    "question_number": 23,
    "question": "A swimming pool is filled by three pipes with uniform flow. The first two pipes operating simultaneously fill the pool in the same time during which the pool is filled by the third pipe alone. The second pipe fills the pool 5 hours faster than the first pipe and 4 hours slower than the third pipe. The time required by the first pipe is (M.B.A., 2002; M.A.T., 2006)",
    "options": {
      "a": "6 hrs",
      "b": "10 hrs",
      "c": "15 hrs",
      "d": "30 hrs"
    },
    "correct_option": "c",
    "answer": "15 hrs",
    "book_page": 516,
    "topic": "Swimming Pool Filling Time"
  },
  {
    "id": "pipes-and-cisterns-024",
    "chapter": "Pipes and Cisterns",
    "question_number": 24,
    "question": "12 buckets of water fill a tank when the capacity of each bucket is 13.5 litres. How many buckets will be needed to fill the same tank, if the capacity of each bucket is 9 litres?",
    "options": {
      "a": "8",
      "b": "15",
      "c": "16",
      "d": "18"
    },
    "correct_option": "d",
    "answer": "18",
    "book_page": 516,
    "topic": "Bucket Capacity Inverse Proportion"
  },
  {
    "id": "pipes-and-cisterns-025",
    "chapter": "Pipes and Cisterns",
    "question_number": 25,
    "question": "Bucket P has thrice the capacity as bucket Q. It takes 60 turns for bucket P to fill the empty drum. How many turns will it take for both the buckets P and Q, having each turn together to fill the empty drum?",
    "options": {
      "a": "30",
      "b": "40",
      "c": "45",
      "d": "90"
    },
    "correct_option": "c",
    "answer": "45",
    "book_page": 517,
    "topic": "Buckets Capacity Ratio Turns"
  },
  {
    "id": "pipes-and-cisterns-026",
    "chapter": "Pipes and Cisterns",
    "question_number": 26,
    "question": "Two pipes A and B can fill a tank in 12 minutes and 15 minutes respectively. If both the pipes are opened simultaneously and pipe A is closed after 3 minutes, then how much more time will it take to fill the tank by pipe B? (C.D.S., 2002; Bank P.O., 2006)",
    "options": {
      "a": "7 min 15 sec",
      "b": "7 min 45 sec",
      "c": "8 min 5 sec",
      "d": "8 min 15 sec"
    },
    "correct_option": "d",
    "answer": "8 min 15 sec",
    "book_page": 517,
    "topic": "Pipe Turned Off Intermediate"
  },
  {
    "id": "pipes-and-cisterns-027",
    "chapter": "Pipes and Cisterns",
    "question_number": 27,
    "question": "Two pipes A and B can fill a tank in 15 minutes and 20 minutes respectively. Both the pipes are opened together but after 4 minutes, pipe A is turned off. What is the total time required to fill the tank?",
    "options": {
      "a": "10 min 20 sec",
      "b": "11 min 45 sec",
      "c": "12 min 30 sec",
      "d": "14 min 40 sec"
    },
    "correct_option": "d",
    "answer": "14 min 40 sec",
    "book_page": 517,
    "topic": "Total Time After Closure"
  },
  {
    "id": "pipes-and-cisterns-028",
    "chapter": "Pipes and Cisterns",
    "question_number": 28,
    "question": "Two pipes A and B can fill a tank in 15 hours and 20 hours respectively while a third pipe C can empty the full tank in 25 hours. All the three pipes are opened in the beginning. After 10 hours, C is closed. In how much time will the tank be full?",
    "options": {
      "a": "12 hrs",
      "b": "13 hrs",
      "c": "16 hrs",
      "d": "18 hrs"
    },
    "correct_option": "a",
    "answer": "12 hrs",
    "book_page": 517,
    "topic": "Outlet Pipe Closure"
  },
  {
    "id": "pipes-and-cisterns-029",
    "chapter": "Pipes and Cisterns",
    "question_number": 29,
    "question": "A large tanker can be filled by two pipes A and B in 60 minutes and 40 minutes respectively. How many minutes will it take to fill the tanker from empty state if B is used for half the time and A and B fill it together for the other half? (D.M.R.C., 2003)",
    "options": {
      "a": "15 min",
      "b": "20 min",
      "c": "27.5 min",
      "d": "30 min"
    },
    "correct_option": "d",
    "answer": "30 min",
    "book_page": 518,
    "topic": "Half-time Usage Split"
  },
  {
    "id": "pipes-and-cisterns-030",
    "chapter": "Pipes and Cisterns",
    "question_number": 30,
    "question": "Two pipes A and B can fill a cistern in 12 minutes and 15 minutes respectively while a third pipe C can empty the full cistern in 6 minutes. A and B are kept open for 5 minutes in the beginning and then C is also opened. In what time is the cistern emptied? (M.A.T., 2005)",
    "options": {
      "a": "30 min",
      "b": "33 min",
      "c": "37 1/2 min",
      "d": "45 min"
    },
    "correct_option": "d",
    "answer": "45 min",
    "book_page": 518,
    "topic": "Delayed Outlet Opening"
  },
  {
    "id": "pipes-and-cisterns-031",
    "chapter": "Pipes and Cisterns",
    "question_number": 31,
    "question": "Two pipes A and B can fill a tank in 20 and 30 hours respectively. Both the pipes are opened to fill the tank but when the tank is one-third full, a leak develops in the tank through which one-third water supplied by both the pipes goes out. The total time taken to fill the tank is (M.A.T., 2006)",
    "options": {
      "a": "12 hours",
      "b": "14 hours",
      "c": "16 hours",
      "d": "18 hours"
    },
    "correct_option": "c",
    "answer": "16 hours",
    "book_page": 518,
    "topic": "Leak Developing at One-Third"
  },
  {
    "id": "pipes-and-cisterns-032",
    "chapter": "Pipes and Cisterns",
    "question_number": 32,
    "question": "Four pipes can fill a reservoir in 15, 20, 30 and 60 hours respectively. The first pipe was opened at 8 a.m, second at 9 a.m., third at 10 a.m. and fourth at 11 a.m. When will the reservoir be full?",
    "options": {
      "a": "1 p.m.",
      "b": "2 p.m.",
      "c": "2.30 p.m.",
      "d": "3 p.m."
    },
    "correct_option": "d",
    "answer": "3 p.m.",
    "book_page": 518,
    "topic": "Sequential Hourly Pipe Openings"
  },
  {
    "id": "pipes-and-cisterns-033",
    "chapter": "Pipes and Cisterns",
    "question_number": 33,
    "question": "Two pipes can fill a tank with water in 15 and 12 hours respectively and a third pipe can empty it in 4 hours. If the pipes be opened in order at 8, 9 and 11 a.m. respectively, the tank will be emptied at (S.S.C., 2005)",
    "options": {
      "a": "11 : 40 a.m.",
      "b": "12 : 40 p.m.",
      "c": "1 : 40 p.m.",
      "d": "2 : 40 p.m."
    },
    "correct_option": "d",
    "answer": "2 : 40 p.m.",
    "book_page": 519,
    "topic": "Staggered Inlet and Outlet Times"
  },
  {
    "id": "pipes-and-cisterns-034",
    "chapter": "Pipes and Cisterns",
    "question_number": 34,
    "question": "Tap A fills a tank in 4 hours whereas tap B empties the full tank in 24 hours. A and B are opened alternately for 1 hour each. Every 2 hours the level of water is found to increase by 0.5 m. The depth of the tank is",
    "options": {
      "a": "2.4 m",
      "b": "4.8 m",
      "c": "6.4 m",
      "d": "24 m"
    },
    "correct_option": "a",
    "answer": "2.4 m",
    "book_page": 519,
    "topic": "Alternate Hour Water Level"
  },
  {
    "id": "pipes-and-cisterns-035",
    "chapter": "Pipes and Cisterns",
    "question_number": 35,
    "question": "Two pipes A and B can fill a tank in 6 hours and 4 hours respectively. If they are opened on alternate hours and if pipe A is opened first, in how many hours, the tank shall be full? (Campus Recruitment, 2003)",
    "options": {
      "a": "4",
      "b": "4 1/2",
      "c": "5",
      "d": "5 1/2"
    },
    "correct_option": "c",
    "answer": "5",
    "book_page": 519,
    "topic": "Alternate Hour Inlets"
  },
  {
    "id": "pipes-and-cisterns-036",
    "chapter": "Pipes and Cisterns",
    "question_number": 36,
    "question": "Three taps A, B and C can fill a tank in 12, 15 and 20 hours respectively. If A is open all the time and B and C are open for one hour each alternately, the tank will be full in",
    "options": {
      "a": "6 hrs",
      "b": "6 2/3 hrs",
      "c": "7 hrs",
      "d": "7 1/2 hrs"
    },
    "correct_option": "c",
    "answer": "7 hrs",
    "book_page": 519,
    "topic": "Continuous plus Alternate Taps"
  },
  {
    "id": "pipes-and-cisterns-037",
    "chapter": "Pipes and Cisterns",
    "question_number": 37,
    "question": "Pipe A can fill a tank in 10 hours. Pipe B can fill the same tank in 15 hours. Pipe C can empty the full tank in 20 hours. Pipes A, B and C are opened alternatively for one hour each. If A is opened first, then how many hours will they take to fill the empty tank? (M.B.A., 2004)",
    "options": {
      "a": "24 hrs",
      "b": "24 2/3 hrs",
      "c": "25 hrs",
      "d": "26 hrs"
    },
    "correct_option": "b",
    "answer": "24 2/3 hrs",
    "book_page": 520,
    "topic": "Three Pipes Alternate Hours"
  },
  {
    "id": "pipes-and-cisterns-038",
    "chapter": "Pipes and Cisterns",
    "question_number": 38,
    "question": "A booster pump can be used for filling as well as for emptying a tank. The capacity of the tank is 2400 m³. The emptying capacity of the tank is 10 m³ per minute higher than its filling capacity and the pump needs 8 minutes lesser to empty the tank than it needs to fill it. What is the filling capacity of the pump?",
    "options": {
      "a": "50 m³/min",
      "b": "60 m³/min",
      "c": "72 m³/min",
      "d": "None of these"
    },
    "correct_option": "a",
    "answer": "50 m³/min",
    "book_page": 520,
    "topic": "Booster Pump Capacity Rate"
  },
  {
    "id": "pipes-and-cisterns-039",
    "chapter": "Pipes and Cisterns",
    "question_number": 39,
    "question": "A leak in the bottom of a tank can empty the full tank in 8 hours. An inlet pipe fills water at the rate of 6 litres a minute. When the tank is full, the inlet is opened and due to the leak, the tank is empty in 12 hours. How many litres does the tank hold? (M.A.T., 2005)",
    "options": {
      "a": "7580",
      "b": "7960",
      "c": "8290",
      "d": "8640"
    },
    "correct_option": "d",
    "answer": "8640",
    "book_page": 520,
    "topic": "Tank Capacity from Flow Rate"
  },
  {
    "id": "pipes-and-cisterns-040",
    "chapter": "Pipes and Cisterns",
    "question_number": 40,
    "question": "Two pipes can fill a tank in 20 and 24 minutes respectively and a waste pipe can empty 3 gallons per minute. All the three pipes working together can fill the tank in 15 minutes. The capacity of the tank is :",
    "options": {
      "a": "60 gallons",
      "b": "100 gallons",
      "c": "120 gallons",
      "d": "180 gallons"
    },
    "correct_option": "c",
    "answer": "120 gallons",
    "book_page": 521,
    "topic": "Gallons Capacity Calculation"
  },
  {
    "id": "pipes-and-cisterns-041",
    "chapter": "Pipes and Cisterns",
    "question_number": 41,
    "question": "Two pipes A and B can fill a cistern in 37 1/2 minutes and 45 minutes respectively. Both the pipes are opened. The cistern will be filled in just half an hour, if the pipe B is turned off after (S.S.C., 2004)",
    "options": {
      "a": "5 min",
      "b": "9 min",
      "c": "10 min",
      "d": "15 min"
    },
    "correct_option": "b",
    "answer": "9 min",
    "book_page": 521,
    "topic": "Cut-off Time for Half Hour Finish"
  },
  {
    "id": "pipes-and-cisterns-042",
    "chapter": "Pipes and Cisterns",
    "question_number": 42,
    "question": "A cistern can be filled by two pipes filling separately in 12 and 16 minutes separately. Both the pipes are opened together for a certain time but being clogged, only 7/8 of the full quantity of water flows through the former and only 5/6 through the latter pipe. The obstructions, however, being suddenly removed, the cistern is filled in 3 minutes from that moment. How long was it before the full flow began? (M.A.T., 2006)",
    "options": {
      "a": "2 1/2 min",
      "b": "3 1/2 min",
      "c": "4 1/2 min",
      "d": "5 1/2 min"
    },
    "correct_option": "c",
    "answer": "4 1/2 min",
    "book_page": 521,
    "topic": "Clogged Pipe Partial Flow"
  },
  {
    "id": "pipes-and-cisterns-043",
    "chapter": "Pipes and Cisterns",
    "question_number": 43,
    "question": "Three pipes can fill a reservoir in 10, 15 and 20 hours respectively. If the three taps are opened one after another in the given order, with a certain fixed time gap between them, the reservoir fills in 5 hours. The time gap is",
    "options": {
      "a": "15 min",
      "b": "30 min",
      "c": "45 min",
      "d": "1 hr"
    },
    "correct_option": "b",
    "answer": "30 min",
    "book_page": 522,
    "topic": "Equal Time Gap Opening"
  },
  {
    "id": "pipes-and-cisterns-044",
    "chapter": "Pipes and Cisterns",
    "question_number": 44,
    "question": "Three pipes A, B and C can fill a tank in 6 hours. After working at it together for 2 hours, C is closed and A and B can fill the remaining part in 7 hours. The number of hours taken by C alone to fill the tank is (L.I.C.A.A.O., 2003)",
    "options": {
      "a": "10",
      "b": "12",
      "c": "14",
      "d": "16"
    },
    "correct_option": "c",
    "answer": "14",
    "book_page": 522,
    "topic": "C Closed After 2 Hours"
  },
  {
    "id": "pipes-and-cisterns-045",
    "chapter": "Pipes and Cisterns",
    "question_number": 45,
    "question": "A bath can be filled by the cold water pipe in 10 minutes and by the hot water pipe in 15 minutes. A person leaves the bathroom after turning on both the pipes. He returns just when the bath should have been full. Finding however, the waste pipe was open, he closes it. In 4 minutes more, the bath is full. In what time will the waste water pipe empty it?",
    "options": {
      "a": "6 minutes",
      "b": "8 minutes",
      "c": "9 minutes",
      "d": "None of these"
    },
    "correct_option": "c",
    "answer": "9 minutes",
    "book_page": 522,
    "topic": "Accidental Open Waste Pipe"
  },
  {
    "id": "pipes-and-cisterns-046",
    "chapter": "Pipes and Cisterns",
    "question_number": 46,
    "question": "A large fresh water reservoir is fitted with two types of feeder pipes – hot water pipes and cold water pipes. Six cold water pipes alone can fill the reservoir in 12 hours. 3 cold water pipes and 9 hot water pipes together can fill the reservoir in 8 hours. How long will 5 hot water pipes alone take to fill the reservoir?",
    "options": {
      "a": "18 hrs 36 min",
      "b": "20 hrs 45 min",
      "c": "21 hrs 36 min",
      "d": "None of these"
    },
    "correct_option": "c",
    "answer": "21 hrs 36 min",
    "book_page": 523,
    "topic": "Hot and Cold Feeder Pipes"
  },
  {
    "id": "pipes-and-cisterns-047",
    "chapter": "Pipes and Cisterns",
    "question_number": 47,
    "question": "A town is supplied with water from a big overhead tank which is fed with a constant volume of water regularly. When the tank is full, if 32000 gallons are used daily, the supply fails in 50 days. However, if 37000 gallons are used daily, the supply lasts for 40 days only. How much water can be used daily without the supply ever failing?",
    "options": {
      "a": "12000 gallons",
      "b": "15000 gallons",
      "c": "18000 gallons",
      "d": "20000 gallons"
    },
    "correct_option": "a",
    "answer": "12000 gallons",
    "book_page": 523,
    "topic": "Constant Inflow Rate Town Supply"
  },
  {
    "id": "pipes-and-cisterns-048",
    "chapter": "Pipes and Cisterns",
    "question_number": 48,
    "question": "Water flows through a cylindrical pipe of internal diameter 7 cm at the rate of 5 m/s. The time, in minutes, the pipe would take to fill an empty rectangular tank 4m × 3m × 2.31m is [CDS, 2016]",
    "options": {
      "a": "28",
      "b": "24",
      "c": "20",
      "d": "12"
    },
    "correct_option": "b",
    "answer": "24",
    "book_page": 524,
    "topic": "Flow Rate via Cylindrical Pipe"
  },
  {
    "id": "pipes-and-cisterns-049",
    "chapter": "Pipes and Cisterns",
    "question_number": 49,
    "question": "An outlet pipe can empty a cistern in 3 hours. In what time will it empty 2/3 part of the cistern? [DMRC—Customer Relationship Assistant (CRA) Exam, 2016]",
    "options": {
      "a": "3 hours",
      "b": "5 hours",
      "c": "2 hours",
      "d": "4 hours"
    },
    "correct_option": "c",
    "answer": "2 hours",
    "book_page": 524,
    "topic": "Fractional Emptying Time"
  },
  {
    "id": "pipes-and-cisterns-050",
    "chapter": "Pipes and Cisterns",
    "question_number": 50,
    "question": "Two pipes A and B can fill a tank in 24h and 30 h respectively. If both the pipes are opened simultaneously in the empty tank, how much time will be taken by them to fill it? [UPSSC—Lower Subordinate (Pre.) Exam, 2016]",
    "options": {
      "a": "13h 20 min",
      "b": "12h 10min",
      "c": "14h",
      "d": "10h 5min"
    },
    "correct_option": "a",
    "answer": "13h 20 min",
    "book_page": 524,
    "topic": "Simple Combined Inlets Time"
  },
  {
    "id": "pipes-and-cisterns-051",
    "chapter": "Pipes and Cisterns",
    "question_number": 51,
    "question": "A tank is 7 metre long and 4 metre wide. At what speed should water run through a pipe 5 cm broad and 4 cm deep so that in 6 hours and 18 minutes water level in the tank rise by 4.5 metre? [DMRC—Train Operator (Station Controller) Exam, 2016]",
    "options": {
      "a": "10 km/hr.",
      "b": "12 km/hr.",
      "c": "8 km/hr.",
      "d": "None of these"
    },
    "correct_option": "a",
    "answer": "10 km/hr.",
    "book_page": 525,
    "topic": "Pipe Flow Speed for Level Rise"
  },
  {
    "id": "pipes-and-cisterns-052",
    "chapter": "Pipes and Cisterns",
    "question_number": 52,
    "question": "Two pipes A and B can fill a tank in 18 hrs and 6 hrs respectively. If both the pipes are opened simultaneously, how much time will be taken to fill the tank? [Indian Railway Gr. ‘D’ Exam, 2014]",
    "options": {
      "a": "4 1/2 hrs",
      "b": "7 hrs",
      "c": "6 hrs",
      "d": "10 hrs"
    },
    "correct_option": "a",
    "answer": "4 1/2 hrs",
    "book_page": 525,
    "topic": "Combined Pipe Time"
  },
  {
    "id": "pipes-and-cisterns-053",
    "chapter": "Pipes and Cisterns",
    "question_number": 53,
    "question": "Two pipes can fill a tank in 12 hours and 16 hours respectively. A third pipe can empty the tank in 30 hours. If all the three pipes are opened and function simultaneously, in how much time the tank will be full? (in hours) [United India Insurance (UIICL) Assistant (Online) Exam, 2015]",
    "options": {
      "a": "10 4/9 hours",
      "b": "9 1/2 hours",
      "c": "8 8/9 hours",
      "d": "7 2/9 hours"
    },
    "correct_option": "c",
    "answer": "8 8/9 hours",
    "book_page": 525,
    "topic": "Simultaneous Inlets and Outlet"
  },
  {
    "id": "pipes-and-cisterns-054",
    "chapter": "Pipes and Cisterns",
    "question_number": 54,
    "question": "A tank has two outlets A and B, which together take 6h to empty a full tank when they are opened simultaneously. The tank was initially half-full and both the outlets were opened. After an hour, an inlet pipe ‘X’ was also opened. If the inlet alone can fill an empty tank in 4h, how much time will it now take to fill the tank completely? (in hours) [CET—Maharashtra (MBA) Exam, 2016]",
    "options": {
      "a": "8",
      "b": "7",
      "c": "8 1/2",
      "d": "9"
    },
    "correct_option": "d",
    "answer": "9",
    "book_page": 525,
    "topic": "Outlets plus Late Inlet Addition"
  }
]

chapter_data = {
  "book": "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  "chapter_number": 16,
  "chapter": "Pipes and Cisterns",
  "book_page_range": "510–525",
  "question_count": 54,
  "total_questions": 54,
  "key_concepts": key_concepts,
  "questions": questions
}

server_path = "/home/jyoti/Project/PLACEMENT/server/data/rs_agrawal/pipes_and_cisterns.json"
client_path = "/home/jyoti/Project/PLACEMENT/client/public/data/rs_agrawal/pipes_and_cisterns.json"

os.makedirs(os.path.dirname(server_path), exist_ok=True)
os.makedirs(os.path.dirname(client_path), exist_ok=True)

with open(server_path, "w", encoding="utf-8") as f:
    json.dump(chapter_data, f, indent=2, ensure_ascii=False)

with open(client_path, "w", encoding="utf-8") as f:
    json.dump(chapter_data, f, indent=2, ensure_ascii=False)

print(f"Successfully generated Pipes and Cisterns chapter JSON with {len(questions)} questions!")
