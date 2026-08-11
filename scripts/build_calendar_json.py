import json
import os

data = {
  "book": "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  "chapter_number": 22,
  "chapter": "Calendar",
  "book_page_range": "821–823",
  "objective_questions": 18,
  "key_explanation_from_book": {
    "odd_days": "The chapter uses odd days: the remainder when the total number of days is divided by 7. Odd days determine the weekday shift.",
    "ordinary_year": "An ordinary year has 365 days = 52 weeks + 1 odd day.",
    "leap_year": "A leap year has 366 days = 52 weeks + 2 odd days.",
    "leap_year_rule": "A year divisible by 4 is generally a leap year, except century years; a century year is a leap year only when divisible by 400.",
    "century_odd_days": "The chapter uses the fact that a century can contribute 5, 6 or 0 odd days depending on the century structure.",
    "same_calendar": "Two years have the same calendar when their starting weekday and leap/non-leap status align.",
    "weekday_cycle": "Weekdays repeat every 7 days; therefore a date shifted by a multiple of 7 days falls on the same weekday."
  },
  "exercise": {
    "title": "Objective Type Questions",
    "question_count": 18,
    "questions": [
      {
        "id": "calendar-001",
        "chapter": "Calendar",
        "question_number": 1,
        "question": "January 1, 2007 was Monday. What day of the week lies on Jan. 1, 2008?",
        "options": {
          "a": "Monday",
          "b": "Tuesday",
          "c": "Wednesday",
          "d": "Sunday"
        },
        "correct_option": "b",
        "answer": "Tuesday"
      },
      {
        "id": "calendar-002",
        "chapter": "Calendar",
        "question_number": 2,
        "question": "January 1, 2008 is Tuesday. What day of the week lies on Jan. 1, 2009?",
        "options": {
          "a": "Monday",
          "b": "Wednesday",
          "c": "Thursday",
          "d": "Sunday"
        },
        "correct_option": "c",
        "answer": "Thursday"
      },
      {
        "id": "calendar-003",
        "chapter": "Calendar",
        "question_number": 3,
        "question": "On 8th Dec, 2007 Saturday falls. What day of the week was it on 8th Dec. 2006?",
        "options": {
          "a": "Sunday",
          "b": "Thursday",
          "c": "Tuesday",
          "d": "Friday"
        },
        "correct_option": "d",
        "answer": "Friday"
      },
      {
        "id": "calendar-004",
        "chapter": "Calendar",
        "question_number": 4,
        "question": "On 6th March, 2005 Monday falls. What was the day of the week on 6th March, 2004?",
        "options": {
          "a": "Sunday",
          "b": "Saturday",
          "c": "Tuesday",
          "d": "Wednesday"
        },
        "correct_option": "b",
        "answer": "Saturday"
      },
      {
        "id": "calendar-005",
        "chapter": "Calendar",
        "question_number": 5,
        "question": "The calendar for the year 2007 will be the same for the year:",
        "options": {
          "a": "2014",
          "b": "2016",
          "c": "2017",
          "d": "2018"
        },
        "correct_option": "d",
        "answer": "2018"
      },
      {
        "id": "calendar-006",
        "chapter": "Calendar",
        "question_number": 6,
        "question": "On what dates of April, 2001 did Wednesday fall?",
        "options": {
          "a": "1st, 8th, 15th, 22nd, 29th",
          "b": "2nd, 9th, 16th, 23rd, 30th",
          "c": "3rd, 10th, 17th, 24th",
          "d": "4th, 11th, 18th, 25th"
        },
        "correct_option": "d",
        "answer": "4th, 11th, 18th, 25th"
      },
      {
        "id": "calendar-007",
        "chapter": "Calendar",
        "question_number": 7,
        "question": "What was the day of the week on 17th June, 1998?",
        "options": {
          "a": "Monday",
          "b": "Tuesday",
          "c": "Wednesday",
          "d": "Thursday"
        },
        "correct_option": "c",
        "answer": "Wednesday"
      },
      {
        "id": "calendar-008",
        "chapter": "Calendar",
        "question_number": 8,
        "question": "What was the day of the week on 28th May, 2006?",
        "options": {
          "a": "Thursday",
          "b": "Friday",
          "c": "Saturday",
          "d": "Sunday"
        },
        "correct_option": "d",
        "answer": "Sunday"
      },
      {
        "id": "calendar-009",
        "chapter": "Calendar",
        "question_number": 9,
        "question": "What will be the day of the week on 15th August, 2010?",
        "options": {
          "a": "Sunday",
          "b": "Monday",
          "c": "Tuesday",
          "d": "Friday"
        },
        "correct_option": "a",
        "answer": "Sunday"
      },
      {
        "id": "calendar-010",
        "chapter": "Calendar",
        "question_number": 10,
        "question": "Today is Monday. After 61 days, it will be",
        "options": {
          "a": "Wednesday",
          "b": "Saturday",
          "c": "Tuesday",
          "d": "Thursday"
        },
        "correct_option": "b",
        "answer": "Saturday"
      },
      {
        "id": "calendar-011",
        "chapter": "Calendar",
        "question_number": 11,
        "question": "The last day of a century cannot be",
        "options": {
          "a": "Monday",
          "b": "Wednesday",
          "c": "Tuesday",
          "d": "Friday"
        },
        "correct_option": "c",
        "answer": "Tuesday"
      },
      {
        "id": "calendar-012",
        "chapter": "Calendar",
        "question_number": 12,
        "question": "Which of the following is not a leap year?",
        "options": {
          "a": "700",
          "b": "800",
          "c": "1200",
          "d": "2000"
        },
        "correct_option": "a",
        "answer": "700"
      },
      {
        "id": "calendar-013",
        "chapter": "Calendar",
        "question_number": 13,
        "question": "How many days are there in x weeks x days?",
        "options": {
          "a": "7x^2",
          "b": "8x",
          "c": "14x",
          "d": "7"
        },
        "correct_option": "b",
        "answer": "8x"
      },
      {
        "id": "calendar-014",
        "chapter": "Calendar",
        "question_number": 14,
        "question": "It was Sunday on Jan 1, 2006. What was the day of the week on Jan 1, 2010?",
        "options": {
          "a": "Sunday",
          "b": "Saturday",
          "c": "Friday",
          "d": "Wednesday"
        },
        "correct_option": "c",
        "answer": "Friday"
      },
      {
        "id": "calendar-015",
        "chapter": "Calendar",
        "question_number": 15,
        "question": "On 8th Feb, 2005 it was Tuesday. What was the day of the week on 8th Feb, 2004?",
        "options": {
          "a": "Tuesday",
          "b": "Monday",
          "c": "Sunday",
          "d": "Wednesday"
        },
        "correct_option": "c",
        "answer": "Sunday"
      },
      {
        "id": "calendar-016",
        "chapter": "Calendar",
        "question_number": 16,
        "question": "For a certain month, the dates of three of the Sundays are even numbers. Then, the 15th of that month falls on a [SSC—CGL (Tier I) Exam, 2012]",
        "options": {
          "a": "Thursday",
          "b": "Friday",
          "c": "Saturday",
          "d": "Sunday"
        },
        "correct_option": "c",
        "answer": "Saturday"
      },
      {
        "id": "calendar-017",
        "chapter": "Calendar",
        "question_number": 17,
        "question": "What was the day of the week on 15 August, 1947? [DMRC— Customer Relationship Assistant (CRA) Exam, 2016]",
        "options": {
          "a": "Saturday",
          "b": "Friday",
          "c": "Thursday",
          "d": "Wednesday"
        },
        "correct_option": "b",
        "answer": "Friday"
      },
      {
        "id": "calendar-018",
        "chapter": "Calendar",
        "question_number": 18,
        "question": "The calendar for the year 2009 will be the same as that of the year [DMRC— Customer Relationship Assistant (CRA) Exam, 2016]",
        "options": {
          "a": "2013",
          "b": "2014",
          "c": "2015",
          "d": "2014"
        },
        "correct_option": "c",
        "answer": "2015"
      }
    ]
  },
  "verification": {
    "questions_extracted": "18/18",
    "answer_keys_extracted": "18/18",
    "missing_questions": [],
    "duplicate_question_numbers": [],
    "missing_answer_keys": [],
    "answer_option_mismatches": [],
    "empty_questions": [],
    "empty_correct_answers": [],
    "source_note": "The source page contains Questions 1–18 and their printed answer key. Chapter 23 (Clocks) follows immediately after Chapter 22.",
    "source_format_note": "The source's fraction/math layout was normalized only where necessary for JSON readability; question wording and options were otherwise preserved."
  }
}

out_path = "/home/jyoti/Project/PLACEMENT/server/data/rs_agrawal/calendar.json"
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully generated Calendar chapter JSON with {len(data['exercise']['questions'])} questions!")
