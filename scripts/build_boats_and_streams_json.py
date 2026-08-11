import json
import os

data = {
  "book": "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  "chapter_number": 19,
  "chapter": "Boats and Streams",
  "book_page_range": "600–611",
  "objective_questions": 36,
  "key_explanation_from_book": {
    "definitions": [
      "The direction along the stream is called downstream.",
      "The direction against the stream is called upstream."
    ],
    "basic_formulae": [
      "If boat speed in still water is u km/hr and stream speed is v km/hr, downstream speed = u + v.",
      "If boat speed in still water is u km/hr and stream speed is v km/hr, upstream speed = u − v.",
      "If downstream speed is a km/hr and upstream speed is b km/hr, speed in still water = (a + b)/2.",
      "If downstream speed is a km/hr and upstream speed is b km/hr, speed of the stream = (a − b)/2."
    ],
    "swimming_across_stream": [
      "If a swimmer crosses a stream of width x metres directly across its width, the time taken to cross is the same as the time needed to swim x metres at the swimmer's still-water speed.",
      "The chapter notes that the stream changes the effective distance and velocity but does not change the time taken to cross directly across the river."
    ]
  },
  "exercise": {
    "title": "Objective Type Questions",
    "question_count": 36,
    "questions": [
      {
        "id": "boats-and-streams-001",
        "chapter": "Boats and Streams",
        "question_number": 1,
        "question": "A boat goes 8 km in one hour along the stream and 2 km in one hour against the stream. The speed in km/hr of the stream is (S.S.C., 2005)",
        "options": {
          "a": "2",
          "b": "3",
          "c": "4",
          "d": "5"
        },
        "correct_option": "b",
        "answer": "3"
      },
      {
        "id": "boats-and-streams-002",
        "chapter": "Boats and Streams",
        "question_number": 2,
        "question": "In one hour, a boat goes 11 km along the stream and 5 km against the stream. The speed of the boat in still water (in km/hr) is (B.Ed Entrance, 2009)",
        "options": {
          "a": "3",
          "b": "5",
          "c": "8",
          "d": "9"
        },
        "correct_option": "c",
        "answer": "8"
      },
      {
        "id": "boats-and-streams-003",
        "chapter": "Boats and Streams",
        "question_number": 3,
        "question": "A man rows downstream 32 km and 14 km upstream. If he takes 6 hours to cover each distance, then the velocity (in kmph) of the current is (R.R.B., 2008)",
        "options": {
          "a": "1/2",
          "b": "1",
          "c": "1 1/2",
          "d": "2"
        },
        "correct_option": "c",
        "answer": "1 1/2"
      },
      {
        "id": "boats-and-streams-004",
        "chapter": "Boats and Streams",
        "question_number": 4,
        "question": "A boatman rows 1 km in 5 minutes, along the stream and 6 km in 1 hour against the stream. The speed of the stream is (S.S.C., 2010)",
        "options": {
          "a": "3 kmph",
          "b": "6 kmph",
          "c": "10 kmph",
          "d": "12 kmph"
        },
        "correct_option": "a",
        "answer": "3 kmph"
      },
      {
        "id": "boats-and-streams-005",
        "chapter": "Boats and Streams",
        "question_number": 5,
        "question": "A boat takes half time in moving a certain distance downstream than upstream. What is the ratio between the rate in still water and the rate of current? (R.R.B., 2006)",
        "options": {
          "a": "1 : 2",
          "b": "2 : 1",
          "c": "1 : 3",
          "d": "3 : 1"
        },
        "correct_option": "d",
        "answer": "3 : 1"
      },
      {
        "id": "boats-and-streams-006",
        "chapter": "Boats and Streams",
        "question_number": 6,
        "question": "If a man goes 18 km downstream in 4 hours and returns against the stream in 12 hours, then the speed of the stream in km/hr is (S.S.C., 2008)",
        "options": {
          "a": "1",
          "b": "1.5",
          "c": "1.75",
          "d": "3"
        },
        "correct_option": "b",
        "answer": "1.5"
      },
      {
        "id": "boats-and-streams-007",
        "chapter": "Boats and Streams",
        "question_number": 7,
        "question": "A boatman goes 2 km against the current of the stream in 1 hour and goes 1 km along the current in 10 minutes. How long will it take to go 5 km in stationary water?",
        "options": {
          "a": "40 minutes",
          "b": "1 hour",
          "c": "1 hr 15 min",
          "d": "1 hr 30 min"
        },
        "correct_option": "c",
        "answer": "1 hr 15 min"
      },
      {
        "id": "boats-and-streams-008",
        "chapter": "Boats and Streams",
        "question_number": 8,
        "question": "A man can row 3/4 of a km against the stream in 11 1/4 minutes and returns in 7 1/2 minutes. Find the speed of the man in still water. (M.A.T., 2008)",
        "options": {
          "a": "3 km/hr",
          "b": "4 km/hr",
          "c": "5 km/hr",
          "d": "6 km/hr"
        },
        "correct_option": "c",
        "answer": "5 km/hr"
      },
      {
        "id": "boats-and-streams-009",
        "chapter": "Boats and Streams",
        "question_number": 9,
        "question": "A boat, while going downstream in a river covered a distance of 50 miles at an average speed of 60 miles per hour. While returning, because of the water resistance, it took 1 hour 15 minutes to cover the same distance. What was the average speed during the whole journey? (M.A.T., 2004)",
        "options": {
          "a": "40 mph",
          "b": "48 mph",
          "c": "50 mph",
          "d": "55 mph"
        },
        "correct_option": "b",
        "answer": "48 mph"
      },
      {
        "id": "boats-and-streams-010",
        "chapter": "Boats and Streams",
        "question_number": 10,
        "question": "A man swimming in a stream which flows 1 1/2 km/hr finds that in a given time he can swim twice as far with the stream as he can against it. At what rate does he swim? (M.A.T., 2008)",
        "options": {
          "a": "4 1/2 km/hr",
          "b": "5 1/2 km/hr",
          "c": "7 1/2 km/hr",
          "d": "None of these"
        },
        "correct_option": "a",
        "answer": "4 1/2 km/hr"
      },
      {
        "id": "boats-and-streams-011",
        "chapter": "Boats and Streams",
        "question_number": 11,
        "question": "A boat running upstream takes 8 hours 48 minutes to cover a certain distance, while it takes 4 hours to cover the same distance running downstream. What is the ratio between the speed of the boat and speed of the water current respectively ?",
        "options": {
          "a": "2 : 1",
          "b": "3 : 2",
          "c": "8 : 3",
          "d": "Cannot be determined",
          "e": "None of these"
        },
        "correct_option": "c",
        "answer": "8 : 3"
      },
      {
        "id": "boats-and-streams-012",
        "chapter": "Boats and Streams",
        "question_number": 12,
        "question": "If a boat goes 7 km upstream in 42 minutes and the speed of the stream is 3 kmph, then the speed of the boat in still water is : (Bank Rec., 2010)",
        "options": {
          "a": "4.2 km/hr",
          "b": "9 km/hr",
          "c": "13 km/hr",
          "d": "21 km/hr"
        },
        "correct_option": "c",
        "answer": "13 km/hr"
      },
      {
        "id": "boats-and-streams-013",
        "chapter": "Boats and Streams",
        "question_number": 13,
        "question": "A man’s speed with the current is 15 km / hr and the speed of the current is 2.5 km / hr. The man’s speed against the current is :",
        "options": {
          "a": "8.5 km/hr",
          "b": "9 km/hr",
          "c": "10 km/hr",
          "d": "12.5 km/hr"
        },
        "correct_option": "c",
        "answer": "10 km/hr"
      },
      {
        "id": "boats-and-streams-014",
        "chapter": "Boats and Streams",
        "question_number": 14,
        "question": "If a man rows at the rate of 5 kmph in still water and his rate against the current is 3.5 kmph, then the man’s rate along the current is :",
        "options": {
          "a": "4.25 kmph",
          "b": "6 kmph",
          "c": "6.5 kmph",
          "d": "8.5 kmph"
        },
        "correct_option": "c",
        "answer": "6.5 kmph"
      },
      {
        "id": "boats-and-streams-015",
        "chapter": "Boats and Streams",
        "question_number": 15,
        "question": "A motorboat in still water travels at a speed of 36 km/hr. It goes 56 km upstream in 1 hour 45 minutes. The time taken by it to cover the same distance down the stream will be (C.P.O., 2007)",
        "options": {
          "a": "1 hour 24 minutes",
          "b": "2 hour 21 minutes",
          "c": "2 hour 25 minutes",
          "d": "3 hour"
        },
        "correct_option": "a",
        "answer": "1 hour 24 minutes"
      },
      {
        "id": "boats-and-streams-016",
        "chapter": "Boats and Streams",
        "question_number": 16,
        "question": "Speed of a boat in standing water is 9 kmph and the speed of the stream is 1.5 kmph. A man rows to a place at a distance of 105 km and comes back to the starting point. The total time taken by him is :",
        "options": {
          "a": "16 hours",
          "b": "18 hours",
          "c": "20 hours",
          "d": "24 hours"
        },
        "correct_option": "d",
        "answer": "24 hours"
      },
      {
        "id": "boats-and-streams-017",
        "chapter": "Boats and Streams",
        "question_number": 17,
        "question": "The speed of a boat in still water is 15 km / hr and the rate of current is 3 km / hr. The distance travelled downstream in 12 minutes is :",
        "options": {
          "a": "1.2 km",
          "b": "1.8 km",
          "c": "2.4 km",
          "d": "3.6 km"
        },
        "correct_option": "d",
        "answer": "3.6 km"
      },
      {
        "id": "boats-and-streams-018",
        "chapter": "Boats and Streams",
        "question_number": 18,
        "question": "A man can row at 5 kmph in still water. If the velocity of current is 1 kmph and it takes him 1 hour to row to a place and come back, how far is the place? (S.S.C., 2004)",
        "options": {
          "a": "2.4 km",
          "b": "2.5 km",
          "c": "3 km",
          "d": "3.6 km"
        },
        "correct_option": "a",
        "answer": "2.4 km"
      },
      {
        "id": "boats-and-streams-019",
        "chapter": "Boats and Streams",
        "question_number": 19,
        "question": "A boat takes 19 hours for travelling downstream from point A to point B and coming back to a point C midway between A and B. If the velocity of the stream is 4 kmph and the speed of the boat in still water is 14 kmph, what is the distance between A and B?",
        "options": {
          "a": "160 km",
          "b": "180 km",
          "c": "200 km",
          "d": "220 km"
        },
        "correct_option": "b",
        "answer": "180 km"
      },
      {
        "id": "boats-and-streams-020",
        "chapter": "Boats and Streams",
        "question_number": 20,
        "question": "P, Q and R are three towns on a river which flows uniformly. Q is equidistant from P and R. I row from P to Q and back in 10 hours and I can row from P to R in 4 hours. Compare the speed of my boat in still water with that of the river. (M.A.T., 2005)",
        "options": {
          "a": "4 : 3",
          "b": "5 : 3",
          "c": "6 : 5",
          "d": "7 : 3"
        },
        "correct_option": "b",
        "answer": "5 : 3"
      },
      {
        "id": "boats-and-streams-021",
        "chapter": "Boats and Streams",
        "question_number": 21,
        "question": "A man can row 9 1/3 kmph in still water and finds that it takes him thrice as much time to row up than as to row down the same distance in the river. The speed of the current is :",
        "options": {
          "a": "3 1/3 km/hr",
          "b": "3 1/9 km/hr",
          "c": "4 2/3 km/hr",
          "d": "4 1/2 km/hr"
        },
        "correct_option": "c",
        "answer": "4 2/3 km/hr"
      },
      {
        "id": "boats-and-streams-022",
        "chapter": "Boats and Streams",
        "question_number": 22,
        "question": "A boat takes 8 hours to cover a distance while travelling upstream, whereas while travelling downstream it takes 6 hours. If the speed of the current is 4 kmph, what is the speed of the boat in still water? (Bank P.O., 2006)",
        "options": {
          "a": "12 kmph",
          "b": "16 kmph",
          "c": "28 kmph",
          "d": "Cannot be determined",
          "e": "None of these"
        },
        "correct_option": "c",
        "answer": "28 kmph"
      },
      {
        "id": "boats-and-streams-023",
        "chapter": "Boats and Streams",
        "question_number": 23,
        "question": "A motor boat can travel at 10 km/hr in still water. It travelled 91 km downstream in a river a then returned taking altogether 20 hours. Find the rate of flow of the river. (M.A.T., 2008)",
        "options": {
          "a": "3 km/hr",
          "b": "5 km/hr",
          "c": "6 km/hr",
          "d": "8 km/hr"
        },
        "correct_option": "a",
        "answer": "3 km/hr"
      },
      {
        "id": "boats-and-streams-024",
        "chapter": "Boats and Streams",
        "question_number": 24,
        "question": "The speed of a boat in still water is 10 km / hr. If it can travel 26 km downstream and 14 km upstream in the same time, the speed of the stream is :",
        "options": {
          "a": "2 km/hr",
          "b": "2.5 km/hr",
          "c": "3 km/hr",
          "d": "4 km/hr"
        },
        "correct_option": "c",
        "answer": "3 km/hr"
      },
      {
        "id": "boats-and-streams-025",
        "chapter": "Boats and Streams",
        "question_number": 25,
        "question": "A boat takes 90 minutes less to travel 36 miles downstream than to travel the same distance upstream. If the speed of the boat in still water is 10 mph, the speed of the stream is :",
        "options": {
          "a": "2 mph",
          "b": "2.5 mph",
          "c": "3 mph",
          "d": "4 mph"
        },
        "correct_option": "a",
        "answer": "2 mph"
      },
      {
        "id": "boats-and-streams-026",
        "chapter": "Boats and Streams",
        "question_number": 26,
        "question": "A man rows to a place 48 km distant and back in 14 hours. He finds that he can row 4 km with the stream in the same time as 3 km against the stream. The rate of the stream is : (M.A.T., 2005)",
        "options": {
          "a": "1 km / hr",
          "b": "1.5 km / hr",
          "c": "1.8 km / hr",
          "d": "3.5 km / hr"
        },
        "correct_option": "a",
        "answer": "1 km / hr"
      },
      {
        "id": "boats-and-streams-027",
        "chapter": "Boats and Streams",
        "question_number": 27,
        "question": "A boat covers 24 km upstream and 36 km downstream in 6 hours while it covers 36 km upstream and 24 km downstream in 6 1/2 hours. The velocity of the current is",
        "options": {
          "a": "1 km/hr",
          "b": "1.5 km/hr",
          "c": "2 km/hr",
          "d": "2.5 km/hr"
        },
        "correct_option": "c",
        "answer": "2 km/hr"
      },
      {
        "id": "boats-and-streams-028",
        "chapter": "Boats and Streams",
        "question_number": 28,
        "question": "A boat goes 30 km upstream and 44 km downstream in 10 hours. In 13 hours, it can go 40 km upstream and 55 km downstream. The speed of the boat in still water is (I.I.F.T., 2008)",
        "options": {
          "a": "3 km/hr",
          "b": "4 km/hr",
          "c": "8 km/hr",
          "d": "None of these"
        },
        "correct_option": "c",
        "answer": "8 km/hr"
      },
      {
        "id": "boats-and-streams-029",
        "chapter": "Boats and Streams",
        "question_number": 29,
        "question": "At his usual rowing rate, Rahul can travel 12 miles downstream in a certain river in 6 hours less than it takes him to travel the same distance upstream. But if he could double his usual rowing rate for his 24-mile round trip, the downstream 12 miles would then take only one hour less than the upstream 12 miles. What is the speed of the current in miles per hour ? (M.A.T., 2001)",
        "options": {
          "a": "1 1/3",
          "b": "2 1/3",
          "c": "1 2/3",
          "d": "2 2/3"
        },
        "correct_option": "d",
        "answer": "2 2/3"
      },
      {
        "id": "boats-and-streams-030",
        "chapter": "Boats and Streams",
        "question_number": 30,
        "question": "A man can swim in still water at a rate of 4 km/ hr. The width of the river is 1 km. How long will he take to cross the river straight, if the speed of the current is 3 km/hr? (R.R.B., 2009)",
        "options": {
          "a": "10 min",
          "b": "15 min",
          "c": "18 min",
          "d": "20 min"
        },
        "correct_option": "b",
        "answer": "15 min"
      },
      {
        "id": "boats-and-streams-031",
        "chapter": "Boats and Streams",
        "question_number": 31,
        "question": "A man wishes to cross a river perpendicularly. In still water he takes 4 minutes to cross the river, but in flowing river he takes 5 minutes. If the river is 100 metres wide, the velocity of the flowing water of the river is (M.A.T., 2004)",
        "options": {
          "a": "10 m/min",
          "b": "15 m/min",
          "c": "20 m/min",
          "d": "30 m/min"
        },
        "correct_option": "b",
        "answer": "15 m/min"
      },
      {
        "id": "boats-and-streams-032",
        "chapter": "Boats and Streams",
        "question_number": 32,
        "question": "A man can row upstream at 10 kmph and downstream at 18 kmph. Find the man’s rate in still water? [Indian Railways Gr. ‘D’ Exam, 2014]",
        "options": {
          "a": "14 kmph",
          "b": "4 kmph",
          "c": "12 kmph",
          "d": "10 kmph"
        },
        "correct_option": "a",
        "answer": "14 kmph"
      },
      {
        "id": "boats-and-streams-033",
        "chapter": "Boats and Streams",
        "question_number": 33,
        "question": "A man takes 2.2 times as long to row a distance upstream as to row the same distance downstream. If he can row 55 km downstream in 2 hours 30 minutes, what is the speed of the boat in still water? [IBPS—RRB Officers Gr. ‘B’ Exam, 2015]",
        "options": {
          "a": "40 km/h",
          "b": "8 km/h",
          "c": "16 km/h",
          "d": "24 km/h"
        },
        "correct_option": "c",
        "answer": "16 km/h"
      },
      {
        "id": "boats-and-streams-034",
        "chapter": "Boats and Streams",
        "question_number": 34,
        "question": "Boat A travels downstream from Point X to Point Y in 3 hours less than the time taken by Boat B to travel upstream from Point Y to Point Z. The distance between X and Y is 20 km, which is half of the distance between Y and Z. The speed of Boat B in still water is 10 km/h and the speed of Boat A in still water is equal to the speed of Boat B upstream. What is the speed of Boat A in still water? (Consider the speed of the current to be the same.) [RBI Gr. ‘B’ (Phase I) Exam, 2015]",
        "options": {
          "a": "10 km/h",
          "b": "16 km/h",
          "c": "12 km/h",
          "d": "8 km/h"
        },
        "correct_option": "d",
        "answer": "8 km/h"
      },
      {
        "id": "boats-and-streams-035",
        "chapter": "Boats and Streams",
        "question_number": 35,
        "question": "The speed of the boat in still water is 5 times that of the current, it takes 1.1 hours to row to point B form point A downstream. The distance between point A and point B is 13.2km. How much distance (in km) will it cover in 312 minutes upstream? [IBPS—Bank Spl. Officer (IT) Exam, 2015]",
        "options": {
          "a": "43.2",
          "b": "48",
          "c": "41.6",
          "d": "44.8"
        },
        "correct_option": "c",
        "answer": "41.6"
      },
      {
        "id": "boats-and-streams-036",
        "chapter": "Boats and Streams",
        "question_number": 36,
        "question": "A boat can travel 36 km upstream in 5 hours. If the speed of the stream is 2.4 kmph, how much time (in hours) will it take to travel 78 km downstream?",
        "options": {
          "a": "5",
          "b": "6.5",
          "c": "5.5",
          "d": "8"
        },
        "correct_option": "b",
        "answer": "6.5"
      }
    ]
  },
  "verification": {
    "questions_extracted": "36/36",
    "answer_keys_extracted": "36/36",
    "missing_questions": [],
    "duplicate_question_numbers": [],
    "missing_answer_keys": [],
    "answer_option_mismatches": [],
    "empty_questions": [],
    "empty_correct_answers": [],
    "note": "The chapter has a separate Data Sufficiency exercise beginning with Question 37. This JSON contains the 36 Objective Type Questions, consistent with the previous chapter files.",
    "source_format_note": "Q36 crosses a PDF page boundary; its options were restored from the continuation on the following page."
  }
}

out_path = "/home/jyoti/Project/PLACEMENT/server/data/rs_agrawal/boats_and_streams.json"
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully generated Boats and Streams chapter JSON with {len(data['exercise']['questions'])} questions!")
