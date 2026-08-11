import json
import os

data = {
  "book": "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  "chapter_number": 39,
  "chapter": "Line Graphs",
  "book_page_range": "937–950",
  "objective_questions": 28,
  "exercise": {
    "title": "Objective Questions",
    "question_count": 28,
    "questions": [
      {
        "id": "line-graphs-001",
        "chapter": "Line Graphs",
        "question_number": 1,
        "question": "What is the ratio of the number of students appearing for the Aptitude Test from Town B to that from Town A?",
        "options": {
          "a": "3 : 4",
          "b": "13 : 16",
          "c": "11 : 16",
          "d": "2 : 3",
          "e": "None of these"
        },
        "correct_option": "b",
        "answer": "13 : 16",
        "explanation": "Ratio = Students from Town B : Students from Town A = 13 : 16."
      },
      {
        "id": "line-graphs-002",
        "chapter": "Line Graphs",
        "question_number": 2,
        "question": "What is the average number of students appearing for the Aptitude Test from all the towns together ?",
        "options": {
          "a": "33500",
          "b": "3350",
          "c": "17500",
          "d": "33.5",
          "e": "None of these"
        },
        "correct_option": "a",
        "answer": "33500",
        "explanation": "Average = Sum of students from all towns / 5 = 33500."
      },
      {
        "id": "line-graphs-003",
        "chapter": "Line Graphs",
        "question_number": 3,
        "question": "The number of students appearing for the Aptitude Test from Town E is approximately what percent of the total number of students appearing for the Aptitude Test from all the towns together ?",
        "options": {
          "a": "15%",
          "b": "17%",
          "c": "19%",
          "d": "21%",
          "e": "23%"
        },
        "correct_option": "d",
        "answer": "21%",
        "explanation": "Percentage = (Town E students / Total students) × 100 ≈ 21%."
      },
      {
        "id": "line-graphs-004",
        "chapter": "Line Graphs",
        "question_number": 4,
        "question": "What is the ratio of the number of students appearing for the Aptitude Test from Towns C and D together to the number of students appearing for the Aptitude Test from Towns A, D and E together?",
        "options": {
          "a": "11 : 13",
          "b": "20 : 43",
          "c": "20 : 47",
          "d": "37 : 20",
          "e": "None of these"
        },
        "correct_option": "e",
        "answer": "None of these",
        "explanation": "Calculated ratio does not match options (a)-(d)."
      },
      {
        "id": "line-graphs-005",
        "chapter": "Line Graphs",
        "question_number": 5,
        "question": "The number of students appearing for the Aptitude Test from Town D is approximately what percentage of the number of students appearing for the Aptitude Test from Town C ?",
        "options": {
          "a": "243%",
          "b": "413%",
          "c": "134%",
          "d": "341%",
          "e": "143%"
        },
        "correct_option": "a",
        "answer": "243%",
        "explanation": "Percentage = (Town D students / Town C students) × 100 ≈ 243%."
      },
      {
        "id": "line-graphs-006",
        "chapter": "Line Graphs",
        "question_number": 6,
        "question": "What is the approximate percentage increase in the production of Company A from 2009 to 2010 ?",
        "options": {
          "a": "18%",
          "b": "38%",
          "c": "23%",
          "d": "27%",
          "e": "32%"
        },
        "correct_option": "a",
        "answer": "18%",
        "explanation": "% Increase = [(Production 2010 - Production 2009) / Production 2009] × 100 ≈ 18%."
      },
      {
        "id": "line-graphs-007",
        "chapter": "Line Graphs",
        "question_number": 7,
        "question": "The sales of Company A in the year 2009 was approximately what percent of its production in the same year?",
        "options": {
          "a": "65%",
          "b": "73%",
          "c": "79%",
          "d": "83%",
          "e": "69%"
        },
        "correct_option": "b",
        "answer": "73%",
        "explanation": "Percentage = (Sales 2009 / Production 2009) × 100 ≈ 73%."
      },
      {
        "id": "line-graphs-008",
        "chapter": "Line Graphs",
        "question_number": 8,
        "question": "What is the average production of Company B (in tonnes) from the year 2006 to the year 2011 ?",
        "options": {
          "a": "574",
          "b": "649",
          "c": "675",
          "d": "593",
          "e": "618"
        },
        "correct_option": "c",
        "answer": "675",
        "explanation": "Average production of Company B (2006-2011) = 675 tonnes."
      },
      {
        "id": "line-graphs-009",
        "chapter": "Line Graphs",
        "question_number": 9,
        "question": "What is the ratio of the total production of Company A to the total sales of Company A ?",
        "options": {
          "a": "81 : 64",
          "b": "64 : 55",
          "c": "71 : 81",
          "d": "71 : 55",
          "e": "81 : 55"
        },
        "correct_option": "e",
        "answer": "81 : 55",
        "explanation": "Ratio of Total Production(A) : Total Sales(A) = 81 : 55."
      },
      {
        "id": "line-graphs-010",
        "chapter": "Line Graphs",
        "question_number": 10,
        "question": "What is the ratio of production of Company B in the year 2006 to production of Company B in the year 2008 ?",
        "options": {
          "a": "2 : 5",
          "b": "4 : 5",
          "c": "3 : 4",
          "d": "3 : 5",
          "e": "1 : 4"
        },
        "correct_option": "c",
        "answer": "3 : 4",
        "explanation": "Ratio = Production(B, 2006) : Production(B, 2008) = 3 : 4."
      },
      {
        "id": "line-graphs-011",
        "chapter": "Line Graphs",
        "question_number": 11,
        "question": "If the profit earned in 2006 by Company B was ₹ 812500, what was the total income of the company in that year ?",
        "options": {
          "a": "₹ 1250000",
          "b": "₹ 2062500",
          "c": "₹ 1650000",
          "d": "₹ 1825000",
          "e": "None of these"
        },
        "correct_option": "b",
        "answer": "₹ 2062500",
        "explanation": "Income = Investment + Profit = ₹ 2062500."
      },
      {
        "id": "line-graphs-012",
        "chapter": "Line Graphs",
        "question_number": 12,
        "question": "If the amounts invested by the two companies in 2005 were equal, what was the ratio of the total income of Company A to that of B in 2005 ?",
        "options": {
          "a": "31 : 33",
          "b": "33 : 31",
          "c": "34 : 31",
          "d": "14 : 11",
          "e": "None of these"
        },
        "correct_option": "c",
        "answer": "34 : 31",
        "explanation": "Income Ratio A : B = (100 + %Profit A) : (100 + %Profit B) = 34 : 31."
      },
      {
        "id": "line-graphs-013",
        "chapter": "Line Graphs",
        "question_number": 13,
        "question": "If the total amount invested by the two companies in 2009 was ₹ 27 lakh, while the amount invested by Company B was 50% of the amount invested by Company A, what was the total profit earned by the two companies together ?",
        "options": {
          "a": "₹ 21.15 lakh",
          "b": "₹ 20.70 lakh",
          "c": "₹ 18.70 lakh",
          "d": "₹ 20.15 lakh",
          "e": "None of these"
        },
        "correct_option": "b",
        "answer": "₹ 20.70 lakh",
        "explanation": "Total profit earned by A and B together in 2009 = ₹ 20.70 lakh."
      },
      {
        "id": "line-graphs-014",
        "chapter": "Line Graphs",
        "question_number": 14,
        "question": "If the income of Company A in 2007 and that in 2008 were equal and the amount invested in 2007 was ₹ 12 lakh, what was the amount invested in 2008 ?",
        "options": {
          "a": "₹ 1087500",
          "b": "₹ 1085700",
          "c": "₹ 1245000",
          "d": "₹ 1285000",
          "e": "None of these"
        },
        "correct_option": "a",
        "answer": "₹ 1087500",
        "explanation": "Investment in 2008 = ₹ 1087500."
      },
      {
        "id": "line-graphs-015",
        "chapter": "Line Graphs",
        "question_number": 15,
        "question": "If the amount of profit earned by Company A in 2006 was ₹ 10.12 lakh, what was the total investment ?",
        "options": {
          "a": "₹ 13.8 lakh",
          "b": "₹ 14.9 lakh",
          "c": "₹ 15.4 lakh",
          "d": "₹ 14.2 lakh",
          "e": "None of these"
        },
        "correct_option": "e",
        "answer": "None of these",
        "explanation": "Calculated investment does not match options (a)-(d)."
      },
      {
        "id": "line-graphs-016",
        "chapter": "Line Graphs",
        "question_number": 16,
        "question": "If the amount invested by Company B in 2004 is ₹ 12 lakh and income of 2004 is equal to the investment in 2005, what is the amount of profit earned in 2005 by Company B ?",
        "options": {
          "a": "₹ 6.6 lakh",
          "b": "₹ 18.6 lakh",
          "c": "₹ 10.23 lakh",
          "d": "₹ 9.6 lakh",
          "e": "None of these"
        },
        "correct_option": "c",
        "answer": "₹ 10.23 lakh",
        "explanation": "Profit earned in 2005 by Company B = ₹ 10.23 lakh."
      },
      {
        "id": "line-graphs-017",
        "chapter": "Line Graphs",
        "question_number": 17,
        "question": "If the investments of Company A in 2007 and 2008 were equal, what is the difference between the profits earned in the two years if the income in 2008 was ₹ 24 lakh ?",
        "options": {
          "a": "₹ 2.25 lakh",
          "b": "₹ 3.6 lakh",
          "c": "₹ 1.8 lakh",
          "d": "₹ 2.6 lakh",
          "e": "None of these"
        },
        "correct_option": "a",
        "answer": "₹ 2.25 lakh",
        "explanation": "Difference between profits in 2007 and 2008 = ₹ 2.25 lakh."
      },
      {
        "id": "line-graphs-018",
        "chapter": "Line Graphs",
        "question_number": 18,
        "question": "If each of the companies A and B invested ₹ 25 lakh in 2010, what was the average profit earned by the two companies ?",
        "options": {
          "a": "₹ 18 lakh",
          "b": "₹ 22.5 lakh",
          "c": "₹ 17.5 lakh",
          "d": "₹ 20 lakh",
          "e": "None of these"
        },
        "correct_option": "d",
        "answer": "₹ 20 lakh",
        "explanation": "Average profit = ₹ 20 lakh."
      },
      {
        "id": "line-graphs-019",
        "chapter": "Line Graphs",
        "question_number": 19,
        "question": "What was the ratio between the number of girls enrolled in School C in the year 2011 and the total number of girls enrolled in School A and School B together in the same year ?",
        "options": {
          "a": "11 : 3",
          "b": "3 : 11",
          "c": "4 : 11",
          "d": "4 : 7",
          "e": "None of these"
        },
        "correct_option": "c",
        "answer": "4 : 11",
        "explanation": "Ratio = Girls C (2011) : Girls (A+B, 2011) = 4 : 11."
      },
      {
        "id": "line-graphs-020",
        "chapter": "Line Graphs",
        "question_number": 20,
        "question": "In which school was the difference between the number of girls enrolled in the years 2012 and 2008 minimum ?",
        "options": {
          "a": "Only School A",
          "b": "Only School B",
          "c": "Only School C",
          "d": "Both School A and School B",
          "e": "Both School A and School C"
        },
        "correct_option": "d",
        "answer": "Both School A and School B",
        "explanation": "Difference was minimum in both School A and School B."
      },
      {
        "id": "line-graphs-021",
        "chapter": "Line Graphs",
        "question_number": 21,
        "question": "What was the approximate average number of girls enrolled in the year 2010 in all the three schools together ?",
        "options": {
          "a": "20800",
          "b": "2300",
          "c": "20000",
          "d": "22500",
          "e": "21600"
        },
        "correct_option": "a",
        "answer": "20800",
        "explanation": "Average girls enrolled in 2010 across three schools ≈ 20800."
      },
      {
        "id": "line-graphs-022",
        "chapter": "Line Graphs",
        "question_number": 22,
        "question": "Total number of girls enrolled in all the three schools in the year 2008 was what percentage of the number of girls enrolled in School C in the year 2011 ?",
        "options": {
          "a": "44.4%",
          "b": "225%",
          "c": "165%",
          "d": "240%",
          "e": "None of these"
        },
        "correct_option": "b",
        "answer": "225%",
        "explanation": "Percentage = (Total 2008 / Girls C 2011) × 100 = 225%."
      },
      {
        "id": "line-graphs-023",
        "chapter": "Line Graphs",
        "question_number": 23,
        "question": "In which year was the total number of girls enrolled in all the three schools together second highest ?",
        "options": {
          "a": "2009",
          "b": "2010",
          "c": "2011",
          "d": "2012",
          "e": "None of these"
        },
        "correct_option": "d",
        "answer": "2012",
        "explanation": "Calculating total girls enrolled per year reveals 2012 as second highest."
      },
      {
        "id": "line-graphs-024",
        "chapter": "Line Graphs",
        "question_number": 24,
        "question": "Average annual exports during the given period for Company Y is approximately what percent of the average annual exports for Company Z ?",
        "options": {
          "a": "87.12%",
          "b": "89.64%",
          "c": "91.21%",
          "d": "93.33%",
          "e": "95.15%"
        },
        "correct_option": "d",
        "answer": "93.33%",
        "explanation": "Percentage = (Average Y / Average Z) × 100 ≈ 93.33%."
      },
      {
        "id": "line-graphs-025",
        "chapter": "Line Graphs",
        "question_number": 25,
        "question": "In how many of the given years, were the exports from Company Z more than the average annual exports over the given years ?",
        "options": {
          "a": "2",
          "b": "3",
          "c": "4",
          "d": "5",
          "e": "6"
        },
        "correct_option": "c",
        "answer": "4",
        "explanation": "Company Z exports exceeded its overall average in 4 of the given years."
      },
      {
        "id": "line-graphs-026",
        "chapter": "Line Graphs",
        "question_number": 26,
        "question": "What was the difference between the average exports of the three companies in 2003 and the average exports in 2008 ?",
        "options": {
          "a": "₹ 5 crores",
          "b": "₹ 10 crores",
          "c": "₹ 7.5 crores",
          "d": "₹ 15 crores",
          "e": "None of these"
        },
        "correct_option": "c",
        "answer": "₹ 7.5 crores",
        "explanation": "Difference between average exports in 2003 and 2008 = ₹ 7.5 crores."
      },
      {
        "id": "line-graphs-027",
        "chapter": "Line Graphs",
        "question_number": 27,
        "question": "In which year was the difference between the exports from Companies X and Y the minimum ?",
        "options": {
          "a": "2004",
          "b": "2005",
          "c": "2006",
          "d": "2007",
          "e": "None of these"
        },
        "correct_option": "c",
        "answer": "2006",
        "explanation": "In 2006, exports from X and Y were closest."
      },
      {
        "id": "line-graphs-028",
        "chapter": "Line Graphs",
        "question_number": 28,
        "question": "For which of the following pairs of years the total exports from the three companies together are equal ?",
        "options": {
          "a": "2005 and 2008",
          "b": "2006 and 2008",
          "c": "2007 and 2008",
          "d": "2005 and 2006",
          "e": "2003 and 2004"
        },
        "correct_option": "d",
        "answer": "2005 and 2006",
        "explanation": "Total exports from X, Y and Z together are equal in 2005 and 2006."
      }
    ]
  },
  "key_explanation_from_book": {
    "line_graph": "A line graph represents numerical data by plotting values against a horizontal axis and joining successive points with lines.",
    "reading_method": [
      "Identify the years/categories on the horizontal axis and the measured quantity on the vertical axis.",
      "Read the exact values represented by the plotted points."
    ]
  },
  "verification": {
    "questions_extracted": "28/28",
    "answer_keys_extracted": "28/28",
    "complete_options": "28/28"
  }
}

out_path = "/home/jyoti/Project/PLACEMENT/server/data/rs_agrawal/line_graphs.json"
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully generated Line Graphs (Ch 39) JSON with {len(data['exercise']['questions'])} questions!")
