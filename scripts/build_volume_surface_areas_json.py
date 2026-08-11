import json
import os

data = {
  "book": "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  "chapter_number": 25,
  "chapter": "Volume and Surface Areas",
  "book_page_range": "766–813",
  "objective_questions": 16,
  "exercise": {
    "title": "Objective Type Questions / Data Sufficiency",
    "question_count": 16,
    "questions": [
      {
        "id": "volume-surface-areas-001",
        "chapter": "Volume and Surface Areas",
        "question_number": 1,
        "question": "What is the weight of the iron beam? I. The beam is 9 m long, 40 cm wide and 20 cm high. II. Iron weighs 50 kg per cubic metre.",
        "options": {
          "a": "Statement I alone is sufficient; Statement II alone is not sufficient.",
          "b": "Statement II alone is sufficient; Statement I alone is not sufficient.",
          "c": "Either Statement I alone or Statement II alone is sufficient.",
          "d": "Even Statements I and II together are not sufficient.",
          "e": "Statements I and II together are necessary."
        },
        "correct_option": "e",
        "answer": "Statements I and II together are necessary.",
        "explanation": "I. gives l = 9 m, b = 40/100 = 2/5 m and h = 20/100 = 1/5 m. Volume = (9 × 2/5 × 1/5) = 18/25 m³. II. gives weight of iron is 50 kg / m³. Weight = 18/25 × 50 = 36 kg. Thus, both I and II are needed.",
        "extraction_status": "complete"
      },
      {
        "id": "volume-surface-areas-002",
        "chapter": "Volume and Surface Areas",
        "question_number": 2,
        "question": "What is the volume of 32 metre high cylindrical tank? I. The area of its base is 154 m2. II. The diameter of the base is 14 m.",
        "options": {
          "a": "Statement I alone is sufficient; Statement II alone is not sufficient.",
          "b": "Statement II alone is sufficient; Statement I alone is not sufficient.",
          "c": "Either Statement I alone or Statement II alone is sufficient.",
          "d": "Even Statements I and II together are not sufficient.",
          "e": "Statements I and II together are necessary."
        },
        "correct_option": "c",
        "answer": "Either Statement I alone or Statement II alone is sufficient.",
        "explanation": "Given height = 32 m. I gives base area = 154 m². Volume = 154 × 32 = 4928 m³. II gives radius = 7 m. Volume = (22/7) × 7 × 7 × 32 = 4928 m³. Either statement alone is sufficient.",
        "extraction_status": "complete"
      },
      {
        "id": "volume-surface-areas-003",
        "chapter": "Volume and Surface Areas",
        "question_number": 3,
        "question": "What is the volume of a cube? I. The area of each face of the cube is 64 square metres. II. The length of one side of the cube is 8 metres.",
        "options": {
          "a": "Statement I alone is sufficient; Statement II alone is not sufficient.",
          "b": "Statement II alone is sufficient; Statement I alone is not sufficient.",
          "c": "Either Statement I alone or Statement II alone is sufficient.",
          "d": "Even Statements I and II together are not sufficient.",
          "e": "Statements I and II together are necessary."
        },
        "correct_option": "c",
        "answer": "Either Statement I alone or Statement II alone is sufficient.",
        "explanation": "I gives a² = 64 ⇒ a = 8 m ⇒ Volume = 8³ = 512 m³. II gives a = 8 m ⇒ Volume = 512 m³. Either alone gives the answer.",
        "extraction_status": "complete"
      },
      {
        "id": "volume-surface-areas-004",
        "chapter": "Volume and Surface Areas",
        "question_number": 4,
        "question": "How much cardboard will it take to make an open cubical box with no top? I. The area of the bottom of the box is 4 square meters. II. The volume of the box is 8 cubic metres.",
        "options": {
          "a": "Statement I alone is sufficient; Statement II alone is not sufficient.",
          "b": "Statement II alone is sufficient; Statement I alone is not sufficient.",
          "c": "Either Statement I alone or Statement II alone is sufficient.",
          "d": "Even Statements I and II together are not sufficient.",
          "e": "Statements I and II together are necessary."
        },
        "correct_option": "c",
        "answer": "Either Statement I alone or Statement II alone is sufficient.",
        "explanation": "I. a² = 4 ⇒ a = 2. Area needed = 5a² = 20 m². II. a³ = 8 ⇒ a = 2. Area needed = 5a² = 20 m². Either alone is sufficient.",
        "extraction_status": "complete"
      },
      {
        "id": "volume-surface-areas-005",
        "chapter": "Volume and Surface Areas",
        "question_number": 5,
        "question": "What is the total cost of painting the inner surface of an open box at the rate of 50 paise per 100 sq. cm? I. The box is made of wood 3 cm thick. II. The external dimensions of the box are 50 cm, 40 cm and 23 cm.",
        "options": {
          "a": "Statement I alone is sufficient; Statement II alone is not sufficient.",
          "b": "Statement II alone is sufficient; Statement I alone is not sufficient.",
          "c": "Either Statement I alone or Statement II alone is sufficient.",
          "d": "Even Statements I and II together are not sufficient.",
          "e": "Statements I and II together are necessary."
        },
        "correct_option": "e",
        "answer": "Statements I and II together are necessary.",
        "explanation": "Thickness = 3 cm. Internal dimensions are l = 44 cm, b = 34 cm, h = 20 cm. Area = 2(l+b)h + lb = 4616 cm². Cost = (4616/100) × 0.50 = ₹ 23.08. Both I and II are necessary.",
        "extraction_status": "complete"
      },
      {
        "id": "volume-surface-areas-006",
        "chapter": "Volume and Surface Areas",
        "question_number": 6,
        "question": "What is the capacity of a cylindrical tank? I. Radius of the base is half of its height which is 28 metres. II. Area of the base is 616 sq. metres and its height is 28 metres.",
        "options": {
          "a": "Statement I alone is sufficient; Statement II alone is not sufficient.",
          "b": "Statement II alone is sufficient; Statement I alone is not sufficient.",
          "c": "Either Statement I alone or Statement II alone is sufficient.",
          "d": "Even Statements I and II together are not sufficient.",
          "e": "Statements I and II together are necessary."
        },
        "correct_option": "c",
        "answer": "Either Statement I alone or Statement II alone is sufficient.",
        "explanation": "I gives h = 28 m, r = 14 m ⇒ Capacity = πr²h. II gives πr² = 616 m², h = 28 m ⇒ Capacity = 616 × 28 m³. Either alone is sufficient.",
        "extraction_status": "complete"
      },
      {
        "id": "volume-surface-areas-007",
        "chapter": "Volume and Surface Areas",
        "question_number": 7,
        "question": "What is the volume of the cylinder? I. Height is equal to the diameter. II. Perimeter of the base is 352 cm.",
        "options": {
          "a": "Statement I alone is sufficient; Statement II alone is not sufficient.",
          "b": "Statement II alone is sufficient; Statement I alone is not sufficient.",
          "c": "Either Statement I alone or Statement II alone is sufficient.",
          "d": "Even Statements I and II together are not sufficient.",
          "e": "Statements I and II together are necessary."
        },
        "correct_option": "e",
        "answer": "Statements I and II together are necessary.",
        "explanation": "I gives h = 2r. II gives 2πr = 352 ⇒ r = 56 cm. Combined, r = 56 cm and h = 112 cm, so volume can be calculated.",
        "extraction_status": "complete"
      },
      {
        "id": "volume-surface-areas-008",
        "chapter": "Volume and Surface Areas",
        "question_number": 8,
        "question": "What will be the total cost of whitewashing the conical tomb at the rate of 80 paise per square metre? I. The diameter and the slant height of the tomb are 28 m and 50 m. II. The height of the tomb is 48 m and the area of its base is 616 sq. m.",
        "options": {
          "a": "Statement I alone is sufficient; Statement II alone is not sufficient.",
          "b": "Statement II alone is sufficient; Statement I alone is not sufficient.",
          "c": "Either Statement I alone or Statement II alone is sufficient.",
          "d": "Even Statements I and II together are not sufficient.",
          "e": "Statements I and II together are necessary."
        },
        "correct_option": "c",
        "answer": "Either Statement I alone or Statement II alone is sufficient.",
        "explanation": "I gives r = 14 m, l = 50 m ⇒ Curved surface = πrl = 2200 m² ⇒ Cost = ₹ 1760. II gives h = 48 m, πr² = 616 ⇒ r = 14 m ⇒ l = √(r²+h²) ⇒ Curved surface = πrl. Either alone is sufficient.",
        "extraction_status": "complete"
      },
      {
        "id": "volume-surface-areas-009",
        "chapter": "Volume and Surface Areas",
        "question_number": 9,
        "question": "What is the height of a circular cone? I. The area of that cone is equal to the area of a rectangle whose length is 33 cm. II. The area of the base of that cone is 154 sq. cm.",
        "options": {
          "a": "Statement I alone is sufficient; Statement II alone is not sufficient.",
          "b": "Statement II alone is sufficient; Statement I alone is not sufficient.",
          "c": "Either Statement I alone or Statement II alone is sufficient.",
          "d": "Even Statements I and II together are not sufficient.",
          "e": "Statements I and II together are necessary."
        },
        "correct_option": "d",
        "answer": "Even Statements I and II together are not sufficient.",
        "explanation": "II gives r. In I, the breadth of rectangle is not given, so surface area cannot be found. Thus height cannot be determined even with both statements.",
        "extraction_status": "complete"
      },
      {
        "id": "volume-surface-areas-010",
        "chapter": "Volume and Surface Areas",
        "question_number": 10,
        "question": "Is a given rectangular block, a cube? I. At least 2 faces of the rectangular block are squares. II. The volume of the block is 64.",
        "options": {
          "a": "Statement I alone is sufficient; Statement II alone is not sufficient.",
          "b": "Statement II alone is sufficient; Statement I alone is not sufficient.",
          "c": "Either Statement I alone or Statement II alone is sufficient.",
          "d": "Even Statements I and II together are not sufficient.",
          "e": "Statements I and II together are necessary."
        },
        "correct_option": "d",
        "answer": "Even Statements I and II together are not sufficient.",
        "explanation": "I gives two sides equal. II gives lbh = 64. Values could be (4, 4, 4) - cube, or (2, 2, 16) - cuboid. Not sufficient.",
        "extraction_status": "complete"
      },
      {
        "id": "volume-surface-areas-011",
        "chapter": "Volume and Surface Areas",
        "question_number": 11,
        "question": "A spherical ball of given radius x cm is melted and made into a right circular cylinder. What is the height of the cylinder? I. The volume of the cylinder is equal to the volume of the ball. II. The area of the base of the cylinder is given.",
        "options": {
          "a": "Statement I alone is sufficient; Statement II alone is not sufficient.",
          "b": "Statement II alone is sufficient; Statement I alone is not sufficient.",
          "c": "Either Statement I alone or Statement II alone is sufficient.",
          "d": "Even Statements I and II together are not sufficient.",
          "e": "Statements I and II together are necessary."
        },
        "correct_option": "b",
        "answer": "Statement II alone is sufficient; Statement I alone is not sufficient.",
        "explanation": "Statement I is already known from melting properties. Statement II gives base area πr². Since volume of ball = (4/3)πx³ is known, base area × h = (4/3)πx³ gives h. Statement II alone is sufficient.",
        "extraction_status": "complete"
      },
      {
        "id": "volume-surface-areas-012",
        "chapter": "Volume and Surface Areas",
        "question_number": 12,
        "question": "What is the ratio of the volume of the given right circular cone to the one obtained from it? I. The smaller cone is obtained by passing a plane parallel to the base and dividing the original height in the ratio 1 : 2. II. The height and the base of the new cone are one-third those of the original cone.",
        "options": {
          "a": "Statement I alone is sufficient; Statement II alone is not sufficient.",
          "b": "Statement II alone is sufficient; Statement I alone is not sufficient.",
          "c": "Either Statement I alone or Statement II alone is sufficient.",
          "d": "Even Statements I and II together are not sufficient.",
          "e": "Statements I and II together are necessary."
        },
        "correct_option": "c",
        "answer": "Either Statement I alone or Statement II alone is sufficient.",
        "explanation": "I gives ratio of dimensions, allowing volume ratio calculation. II also gives ratio of dimensions (1/3), allowing volume ratio calculation. Either alone is sufficient.",
        "extraction_status": "complete"
      },
      {
        "id": "volume-surface-areas-013",
        "chapter": "Volume and Surface Areas",
        "question_number": 13,
        "question": "What is the capacity of the cylindrical tank? I. The area of the base is 61,600 sq. cm. II. The height of the tank is 1.5 times the radius. III. The circumference of base is 880 cm.",
        "options": {
          "a": "Only I and II",
          "b": "Only II and III",
          "c": "Only I and III",
          "d": "Any two of the three",
          "e": "Only II and either I or III"
        },
        "correct_option": "e",
        "answer": "Only II and either I or III",
        "explanation": "I gives r, III gives r. II gives relation between h and r. Thus II is required along with either I or III.",
        "extraction_status": "complete"
      },
      {
        "id": "volume-surface-areas-014",
        "chapter": "Volume and Surface Areas",
        "question_number": 14,
        "question": "What is the capacity of the cylindrical tank? (Bank. P.O., 2008) I. Radius of the base is half of its height. II. Area of the base is 616 square metres. III. Height of the cylinder is 28 metres.",
        "options": {
          "a": "Only I and II",
          "b": "Only II and III",
          "c": "Only I and III",
          "d": "All I, II and III",
          "e": "Any two of the three"
        },
        "correct_option": "e",
        "answer": "Any two of the three",
        "explanation": "Any two statements provide both radius r and height h needed for capacity = πr²h.",
        "extraction_status": "complete"
      },
      {
        "id": "volume-surface-areas-015",
        "chapter": "Volume and Surface Areas",
        "question_number": 15,
        "question": "A solid metallic cone is melted and recast into a sphere. What is the radius of the sphere? I. The radius of the base of the cone is 2.1 cm. II. The height of the cone is four times the radius of its base. III. The height of the cone is 8.4 cm.",
        "options": {
          "a": "Only I and II",
          "b": "Only II and III",
          "c": "Only I and III",
          "d": "Any two of the three",
          "e": "All I, II and III"
        },
        "correct_option": "d",
        "answer": "Any two of the three",
        "explanation": "Any two statements provide both r and h of the cone, allowing sphere radius R to be calculated from (4/3)πR³ = (1/3)πr²h.",
        "extraction_status": "complete"
      },
      {
        "id": "volume-surface-areas-016",
        "chapter": "Volume and Surface Areas",
        "question_number": 16,
        "question": "What is the total surface area of the cone? I. The area of the base of the cone is 154 cm2. II. The curved surface area of the cone is 550 cm2. III. The volume of the cone is 1232 cm3.",
        "options": {
          "a": "I, and either II or III",
          "b": "II, and either I or III",
          "c": "III, and either I or II",
          "d": "Any two of the three",
          "e": "None of these"
        },
        "correct_option": "a",
        "answer": "I, and either II or III",
        "explanation": "Total surface area = πrl + πr². I gives base area πr² and radius r. Combining I with II (πrl) gives total surface area directly. Combining I with III gives volume (1/3)πr²h, from which h and l can be found.",
        "extraction_status": "complete"
      }
    ]
  },
  "key_explanation_from_book": {
    "cuboid": "Volume = length × breadth × height; total surface area is the sum of the areas of all six faces.",
    "cube": "For a cube of side a, volume = a³ and total surface area = 6a².",
    "cylinder": "Volume = πr²h; curved surface area = 2πrh; total surface area = 2πr(h + r).",
    "cone": "Volume = 1/3 πr²h; curved surface area = πrl; total surface area = πr(l + r), where l is slant height.",
    "sphere": "Volume = 4/3 πr³; surface area = 4πr².",
    "hemisphere": "The chapter uses the corresponding curved and total surface-area/volume formulas for hemispheres.",
    "capacity": "For a tank, capacity is its internal volume; for a cylinder this is πr²h.",
    "recasting": "When a solid is melted and recast without loss, the volume remains unchanged.",
    "data_sufficiency": "Questions 1–12 use the chapter's two-statement sufficiency rules. Questions 13–16 ask which of three statements are necessary to answer the question."
  },
  "verification": {
    "questions_extracted": "16/16",
    "answer_keys_extracted": "16/16",
    "complete_options": "16/16",
    "missing_questions": [],
    "duplicate_question_numbers": [],
    "missing_answer_keys": [],
    "answer_option_mismatches": [],
    "source_format_note": "Mathematical notation, currency symbols, fractions and PDF line breaks were normalized for JSON readability."
  }
}

out_path = "/home/jyoti/Project/PLACEMENT/server/data/rs_agrawal/volume_and_surface_areas.json"
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully generated Volume and Surface Areas chapter JSON with {len(data['exercise']['questions'])} questions!")
