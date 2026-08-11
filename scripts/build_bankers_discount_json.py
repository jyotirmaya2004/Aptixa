import json
import os

data = {
  "book": "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  "chapter_number": 33,
  "chapter": "Banker's Discount",
  "book_page_range": "866–868",
  "objective_questions": 13,
  "exercise": {
    "title": "Objective Type Questions",
    "question_count": 13,
    "questions": [
      {
        "id": "bankers-discount-001",
        "chapter": "Banker's Discount",
        "question_number": 1,
        "question": "The true discount on a bill of ₹ 540 is ₹ 90. The banker’s discount is",
        "options": {
          "a": "₹ 60",
          "b": "₹ 108",
          "c": "₹ 110",
          "d": "₹ 112"
        },
        "correct_option": "b",
        "answer": "₹ 108",
        "explanation": "PW = Amount - TD = 540 - 90 = 450. BD = SI on Amount = (Amount / PW) × TD = (540 / 450) × 90 = ₹ 108."
      },
      {
        "id": "bankers-discount-002",
        "chapter": "Banker's Discount",
        "question_number": 2,
        "question": "The present worth of a certain bill due sometime hence is ₹ 800 and the true discount is ₹ 36. The banker’s discount is",
        "options": {
          "a": "₹ 37",
          "b": "₹ 37.62",
          "c": "₹ 34.38",
          "d": "₹ 38.98"
        },
        "correct_option": "b",
        "answer": "₹ 37.62",
        "explanation": "Amount = PW + TD = 800 + 36 = 836. BD = (836 / 800) × 36 = ₹ 37.62."
      },
      {
        "id": "bankers-discount-003",
        "chapter": "Banker's Discount",
        "question_number": 3,
        "question": "The present worth of a certain sum due sometime hence is ₹ 1600 and the true discount is ₹ 160. The banker’s gain is",
        "options": {
          "a": "₹ 20",
          "b": "₹ 24",
          "c": "₹ 16",
          "d": "₹ 12"
        },
        "correct_option": "c",
        "answer": "₹ 16",
        "explanation": "BG = (TD)^2 / PW = (160)^2 / 1600 = 25600 / 1600 = ₹ 16."
      },
      {
        "id": "bankers-discount-004",
        "chapter": "Banker's Discount",
        "question_number": 4,
        "question": "The banker’s gain of a certain sum due 2 years hence at 10% per annum is ₹ 24. The present worth is",
        "options": {
          "a": "₹ 480",
          "b": "₹ 520",
          "c": "₹ 600",
          "d": "₹ 960"
        },
        "correct_option": "c",
        "answer": "₹ 600",
        "explanation": "BG = SI on TD. TD = (24 × 100) / (10 × 2) = 120. PW = (TD × 100) / (R × T) = (120 × 100) / (10 × 2) = ₹ 600."
      },
      {
        "id": "bankers-discount-005",
        "chapter": "Banker's Discount",
        "question_number": 5,
        "question": "The banker’s gain on a bill due 1 year hence at 12% per annum is ₹ 6. The true discount is",
        "options": {
          "a": "₹ 72",
          "b": "₹ 36",
          "c": "₹ 54",
          "d": "₹ 50"
        },
        "correct_option": "d",
        "answer": "₹ 50",
        "explanation": "BG = SI on TD. TD = (BG × 100) / (R × T) = (6 × 100) / (12 × 1) = ₹ 50."
      },
      {
        "id": "bankers-discount-006",
        "chapter": "Banker's Discount",
        "question_number": 6,
        "question": "The banker’s discount on a bill due 4 months hence at 15% is ₹ 420. The true discount is",
        "options": {
          "a": "₹ 400",
          "b": "₹ 360",
          "c": "₹ 480",
          "d": "₹ 320"
        },
        "correct_option": "a",
        "answer": "₹ 400",
        "explanation": "R × T = 15 × (4/12) = 5%. TD = (BD × 100) / (100 + R × T) = (420 × 100) / 105 = ₹ 400."
      },
      {
        "id": "bankers-discount-007",
        "chapter": "Banker's Discount",
        "question_number": 7,
        "question": "The banker’s gain on a sum due 3 years hence at 12% per annum is ₹ 270. The banker’s discount is",
        "options": {
          "a": "₹ 960",
          "b": "₹ 840",
          "c": "₹ 1020",
          "d": "₹ 760"
        },
        "correct_option": "c",
        "answer": "₹ 1020",
        "explanation": "R × T = 36%. TD = (270 × 100) / 36 = 750. BD = TD + BG = 750 + 270 = ₹ 1020."
      },
      {
        "id": "bankers-discount-008",
        "chapter": "Banker's Discount",
        "question_number": 8,
        "question": "The present worth of a sum due sometime hence is ₹ 576 and the banker’s gain is ₹ 16. The true discount is",
        "options": {
          "a": "₹ 36",
          "b": "₹ 72",
          "c": "₹ 48",
          "d": "₹ 96"
        },
        "correct_option": "d",
        "answer": "₹ 96",
        "explanation": "BG = (TD)^2 / PW => (TD)^2 = 16 × 576 => TD = 4 × 24 = ₹ 96."
      },
      {
        "id": "bankers-discount-009",
        "chapter": "Banker's Discount",
        "question_number": 9,
        "question": "The banker’s discount on ₹ 1600 at 15% per annum is the same as true discount on ₹ 1680 for the same time and at the same rate. The time is",
        "options": {
          "a": "3 months",
          "b": "4 months",
          "c": "6 months",
          "d": "8 months"
        },
        "correct_option": "b",
        "answer": "4 months",
        "explanation": "BD on 1600 = TD on 1680 => PW of 1680 is 1600. R × T = (80 / 1600) × 100 = 5%. Since R = 15%, T = 5/15 = 1/3 yr = 4 months."
      },
      {
        "id": "bankers-discount-010",
        "chapter": "Banker's Discount",
        "question_number": 10,
        "question": "The banker’s discount on a sum of money for 1 1/2 years is ₹ 558 and the true discount on the same sum for 2 years is ₹ 600. The rate percent is",
        "options": {
          "a": "10%",
          "b": "13%",
          "c": "12%",
          "d": "15%"
        },
        "correct_option": "c",
        "answer": "12%",
        "explanation": "BD for 2 yrs = 558 × (2 / 1.5) = 744. BD - TD = 744 - 600 = 144. Rate = (BG × 100) / (TD × T) = (144 × 100) / (600 × 2) = 12%."
      },
      {
        "id": "bankers-discount-011",
        "chapter": "Banker's Discount",
        "question_number": 11,
        "question": "The banker’s discount of a certain sum of money is ₹ 72 and the true discount on the same sum for the same time is ₹ 60. The sum due is",
        "options": {
          "a": "₹ 360",
          "b": "₹ 432",
          "c": "₹ 540",
          "d": "₹ 1080"
        },
        "correct_option": "a",
        "answer": "₹ 360",
        "explanation": "Sum due = (BD × TD) / (BD - TD) = (72 × 60) / 12 = ₹ 360."
      },
      {
        "id": "bankers-discount-012",
        "chapter": "Banker's Discount",
        "question_number": 12,
        "question": "The banker’s discount on a certain sum due 2 years hence is 11/10 of the true discount. The rate percent is (M.A.T., 2005)",
        "options": {
          "a": "11%",
          "b": "10%",
          "c": "5%",
          "d": "5.5%"
        },
        "correct_option": "c",
        "answer": "5%",
        "explanation": "BD = 11/10 TD => BG = 1/10 TD. R × T = (BG / TD) × 100 = 10%. With T = 2, R = 5%."
      },
      {
        "id": "bankers-discount-013",
        "chapter": "Banker's Discount",
        "question_number": 13,
        "question": "The banker’s gain on a certain sum due 1 1/2 years hence is 3/25 of the banker’s discount. The rate percent is :",
        "options": {
          "a": "9 1/5 %",
          "b": "9 1/9 %",
          "c": "8 1/8 %",
          "d": "6 1/6 %"
        },
        "correct_option": "b",
        "answer": "9 1/9 %",
        "explanation": "BG/BD = 3/25 => TD/BD = 22/25. R × T = (BG / TD) × 100 = (3/22) × 100 = 150/11 %. Rate = 150/(11 × 1.5) = 100/11 = 9 1/9 %."
      }
    ]
  },
  "key_explanation_from_book": {
    "bankers_discount": "Banker's Discount (B.D.) is the simple interest on the face value of a bill for the unexpired time at the banker's rate.",
    "present_worth": "Present Worth (P.W.) is the amount that becomes the face value at the given rate for the unexpired time.",
    "true_discount": "True Discount (T.D.) is the difference between the amount due and its present worth.",
    "bankers_gain": "Banker's Gain (B.G.) = Banker's Discount − True Discount.",
    "core_relation": "Sum due = (BD × TD) / (BD − TD)."
  },
  "verification": {
    "questions_extracted": "13/13",
    "answer_keys_extracted": "13/13",
    "complete_options": "13/13"
  }
}

out_path = "/home/jyoti/Project/PLACEMENT/server/data/rs_agrawal/bankers_discount.json"
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully generated Banker's Discount (Ch 33) JSON with {len(data['exercise']['questions'])} questions!")
