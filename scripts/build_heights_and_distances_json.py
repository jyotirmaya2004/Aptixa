import json
import os

data = {
  "book": "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  "chapter_number": 34,
  "chapter": "Heights and Distances",
  "book_page_range": "869–875",
  "objective_questions": 18,
  "exercise": {
    "title": "Objective Type Questions",
    "question_count": 18,
    "questions": [
      {
        "id": "heights-and-distances-001",
        "chapter": "Heights and Distances",
        "question_number": 1,
        "question": "The angle of elevation of the sun, when the length of the shadow of a tree is √3 times the height of the tree, is (R.R.B., 2008)",
        "options": {
          "a": "30°",
          "b": "45°",
          "c": "60°",
          "d": "90°"
        },
        "correct_option": "a",
        "answer": "30°",
        "explanation": "Let height = h. Shadow = h√3. tan θ = h / (h√3) = 1/√3 => θ = 30°."
      },
      {
        "id": "heights-and-distances-002",
        "chapter": "Heights and Distances",
        "question_number": 2,
        "question": "From a point P on a level ground, the angle of elevation of the top of a tower is 30°. If the tower is 100 m high, the distance of point P from the foot of the tower is (R.R.B., 2006)",
        "options": {
          "a": "149 m",
          "b": "156 m",
          "c": "173 m",
          "d": "200 m"
        },
        "correct_option": "c",
        "answer": "173 m",
        "explanation": "tan 30° = 100 / d => 1/√3 = 100 / d => d = 100√3 = 100 × 1.732 = 173.2 m ≈ 173 m."
      },
      {
        "id": "heights-and-distances-003",
        "chapter": "Heights and Distances",
        "question_number": 3,
        "question": "The angle of elevation of a ladder leaning against a wall is 60° and the foot of the ladder is 4.6 m away from the wall. The length of the ladder is :",
        "options": {
          "a": "2.3 m",
          "b": "4.6 m",
          "c": "7.8 m",
          "d": "9.2 m"
        },
        "correct_option": "d",
        "answer": "9.2 m",
        "explanation": "cos 60° = Base / Hypotenuse => 1/2 = 4.6 / L => L = 9.2 m."
      },
      {
        "id": "heights-and-distances-004",
        "chapter": "Heights and Distances",
        "question_number": 4,
        "question": "An observer 1.6 m tall is 20√3 m away from a tower. The angle of elevation from his eye to the top of the tower is 30°. The height of the tower is :",
        "options": {
          "a": "21.6 m",
          "b": "23.2 m",
          "c": "24.72 m",
          "d": "None of these"
        },
        "correct_option": "a",
        "answer": "21.6 m",
        "explanation": "tan 30° = h_above / (20√3) => 1/√3 = h_above / (20√3) => h_above = 20 m. Height = 20 + 1.6 = 21.6 m."
      },
      {
        "id": "heights-and-distances-005",
        "chapter": "Heights and Distances",
        "question_number": 5,
        "question": "Two ships are sailing in the sea on the two sides of a lighthouse. The angles of elevation of the top of the lighthouse as observed from the two ships are 30° and 45° respectively. If the lighthouse is 100 m high, the distance between the two ships is",
        "options": {
          "a": "173 m",
          "b": "200 m",
          "c": "273 m",
          "d": "300 m"
        },
        "correct_option": "c",
        "answer": "273 m",
        "explanation": "d1 = 100 / tan 30° = 100√3 = 173.2 m. d2 = 100 / tan 45° = 100 m. Total distance = 173.2 + 100 = 273.2 m ≈ 273 m."
      },
      {
        "id": "heights-and-distances-006",
        "chapter": "Heights and Distances",
        "question_number": 6,
        "question": "A man standing at a point P is watching the top of a tower, which makes an angle of elevation of 30° with the man’s eye. The man walks some distance towards the tower to watch its top and the angle of elevation becomes 60°. What is the distance between the base of the tower and the point P? (Bank P.O., 2007)",
        "options": {
          "a": "4√3 units",
          "b": "8 units",
          "c": "12 units",
          "d": "Data inadequate",
          "e": "None of these"
        },
        "correct_option": "d",
        "answer": "Data inadequate",
        "explanation": "Neither the height of the tower nor the distance walked is given, so data is inadequate."
      },
      {
        "id": "heights-and-distances-007",
        "chapter": "Heights and Distances",
        "question_number": 7,
        "question": "The angle of elevation of the top of a tower from a certain point is 30°. If the observer moves 20 m towards the tower, the angle of elevation of the top of the tower increases by 15°. The height of the tower is (S.S.C., 2005)",
        "options": {
          "a": "17.3 m",
          "b": "21.9 m",
          "c": "27.3 m",
          "d": "30 m"
        },
        "correct_option": "c",
        "answer": "27.3 m",
        "explanation": "Angles are 30° and 45° (30 + 15). h/tan 30° - h/tan 45° = 20 => h(√3 - 1) = 20 => h = 20 / 0.732 ≈ 27.3 m."
      },
      {
        "id": "heights-and-distances-008",
        "chapter": "Heights and Distances",
        "question_number": 8,
        "question": "A man is watching from the top of a tower a boat speeding away from the tower. The boat makes an angle of depression of 45° with the man’s eye when at a distance of 60 metres from the tower. After 5 seconds, the angle of depression becomes 30°. What is the approximate speed of the boat, assuming that it is running in still water?",
        "options": {
          "a": "32 kmph",
          "b": "36 kmph",
          "c": "38 kmph",
          "d": "40 kmph",
          "e": "42 kmph"
        },
        "correct_option": "a",
        "answer": "32 kmph",
        "explanation": "Tower height h = 60 m. New distance = 60√3 = 103.92 m. Distance in 5 sec = 43.92 m. Speed = (43.92 / 5) × 18/5 ≈ 31.6 kmph ≈ 32 kmph."
      },
      {
        "id": "heights-and-distances-009",
        "chapter": "Heights and Distances",
        "question_number": 9,
        "question": "On the same side of a tower, two objects are located. Observed from the top of the tower, their angles of depression are 45° and 60°. If the height of the tower is 150 m, the distance between the objects is",
        "options": {
          "a": "63.5 m",
          "b": "76.9 m",
          "c": "86.7 m",
          "d": "90 m"
        },
        "correct_option": "a",
        "answer": "63.5 m",
        "explanation": "d1 = 150 / tan 45° = 150 m. d2 = 150 / tan 60° = 150 / 1.732 = 86.6 m. Distance = 150 - 86.6 = 63.4 m ≈ 63.5 m."
      },
      {
        "id": "heights-and-distances-010",
        "chapter": "Heights and Distances",
        "question_number": 10,
        "question": "A man on the top of a vertical observation tower observes a car moving at a uniform speed coming directly towards it. If it takes 12 minutes for the angle of depression to change from 30° to 45°, how soon after this will the car reach the observation tower? (R.R.B., 2008)",
        "options": {
          "a": "14 min. 35 sec.",
          "b": "15 min. 49 sec.",
          "c": "16 min. 23 sec.",
          "d": "18 min. 5 sec."
        },
        "correct_option": "c",
        "answer": "16 min. 23 sec.",
        "explanation": "Distance 30° to 45° = h(√3 - 1). Time = 12 min. Remaining distance = h. Time = 12 / (√3 - 1) = 12 / 0.732 ≈ 16.39 min = 16 min 23 sec."
      },
      {
        "id": "heights-and-distances-011",
        "chapter": "Heights and Distances",
        "question_number": 11,
        "question": "The top of a 15 metre high tower makes an angle of elevation of 60° with the bottom of an electric pole and angle of elevation of 30° with the top of the pole. What is the height of the electric pole? (R.R.B., 2009)",
        "options": {
          "a": "5 metres",
          "b": "8 metres",
          "c": "10 metres",
          "d": "12 metres",
          "e": "None of these"
        },
        "correct_option": "c",
        "answer": "10 metres",
        "explanation": "Base distance d = 15 / tan 60° = 15/√3 = 5√3 m. Height above pole = d × tan 30° = 5√3 × (1/√3) = 5 m. Pole height = 15 - 5 = 10 metres."
      },
      {
        "id": "heights-and-distances-012",
        "chapter": "Heights and Distances",
        "question_number": 12,
        "question": "The angle of depression of a point situated at a distance of 70m from the base of a tower is 60º. The height of the tower is [SSC—CHSL (10+2) Exam, 2015]",
        "options": {
          "a": "35√3 m",
          "b": "70√3 m",
          "c": "(70√3)/3 m",
          "d": "70 m"
        },
        "correct_option": "b",
        "answer": "70√3 m",
        "explanation": "h = d × tan 60° = 70 × √3 = 70√3 m."
      },
      {
        "id": "heights-and-distances-013",
        "chapter": "Heights and Distances",
        "question_number": 13,
        "question": "TF is a tower with F on the ground. The angle of elevation of T from A is xº such that tan x° = 2/5 and AF = 200m. The angle of elevation of T from a nearer point B is yº with BF = 80m. The value of yº is [SSC—CHSL (10+2) Exam, 2015]",
        "options": {
          "a": "75º",
          "b": "45º",
          "c": "60º",
          "d": "30º"
        },
        "correct_option": "b",
        "answer": "45º",
        "explanation": "TF = AF × tan x° = 200 × (2/5) = 80 m. tan y° = TF / BF = 80 / 80 = 1 => y° = 45°."
      },
      {
        "id": "heights-and-distances-014",
        "chapter": "Heights and Distances",
        "question_number": 14,
        "question": "A boy is standing at the top of the tower and another boy is at the ground at some distance from the foot of the tower, then the angle of elevation and depression between the boys when both look at each other will be [CLAT, 2016]",
        "options": {
          "a": "Equal",
          "b": "Angle of elevation will be greater",
          "c": "Cannot be predicted for relation",
          "d": "Angle of depression will be greater"
        },
        "correct_option": "a",
        "answer": "Equal",
        "explanation": "Alternate interior angles between horizontal lines are equal, so angle of elevation = angle of depression."
      },
      {
        "id": "heights-and-distances-015",
        "chapter": "Heights and Distances",
        "question_number": 15,
        "question": "The angles of elevation of the top of a tower from two points P and Q at distances m^2 and n^2 respectively, from the base and in the same straight line with it are complementary. The height of the tower is [CDS, 2016]",
        "options": {
          "a": "(mn)^(1/2)",
          "b": "m n^(1/2)",
          "c": "m^(1/2) n",
          "d": "mn"
        },
        "correct_option": "d",
        "answer": "mn",
        "explanation": "h^2 = d1 × d2 = m^2 × n^2 => h = mn."
      },
      {
        "id": "heights-and-distances-016",
        "chapter": "Heights and Distances",
        "question_number": 16,
        "question": "The angle of elevation of a cloud from a point 200 m above a lake is 30º and the angle of depression of its reflection in the lake is 60º. The height of the cloud is [CDS, 2016]",
        "options": {
          "a": "200 m",
          "b": "300 m",
          "c": "400 m",
          "d": "600 m"
        },
        "correct_option": "c",
        "answer": "400 m",
        "explanation": "Standard formula: H = h(tan 60° + tan 30°) / (tan 60° - tan 30°) = 200(√3 + 1/√3) / (√3 - 1/√3) = 200(4/3) / (2/3) = 400 m. Note: Option c is 400 m."
      },
      {
        "id": "heights-and-distances-017",
        "chapter": "Heights and Distances",
        "question_number": 17,
        "question": "From the top of a tower, the angles of depression of two objects P and Q (situated on the ground on the same side of the tower) separated at a distance of 100(3 - √3) m are 45º and 60º respectively. The height of the tower is [CDS, 2016]",
        "options": {
          "a": "200 m",
          "b": "250 m",
          "c": "300 m",
          "d": "None of these"
        },
        "correct_option": "c",
        "answer": "300 m",
        "explanation": "Distance d = h(1 - 1/√3) = h(√3 - 1)/√3. Given d = 100(3 - √3) = 100√3(√3 - 1). h = 100√3 × √3 = 300 m."
      },
      {
        "id": "heights-and-distances-018",
        "chapter": "Heights and Distances",
        "question_number": 18,
        "question": "If a 30 m ladder is placed against a 15 m wall such that it just reaches the top of the wall, then the elevation of the wall is equal to [DMRC—Customer Relationship Assistant (CRA) Exam, 2016]",
        "options": {
          "a": "45º",
          "b": "30º",
          "c": "60º",
          "d": "50º"
        },
        "correct_option": "b",
        "answer": "30º",
        "explanation": "sin θ = 15 / 30 = 1/2 => θ = 30º. (Option b is 30º)."
      }
    ]
  },
  "key_explanation_from_book": {
    "trigonometric_ratios": [
      "sin θ = Perpendicular / Hypotenuse",
      "cos θ = Base / Hypotenuse",
      "tan θ = Perpendicular / Base"
    ],
    "angle_of_elevation": "Angle between horizontal and line of sight looking up.",
    "angle_of_depression": "Angle between horizontal and line of sight looking down."
  },
  "verification": {
    "questions_extracted": "18/18",
    "answer_keys_extracted": "18/18",
    "complete_options": "18/18"
  }
}

out_path = "/home/jyoti/Project/PLACEMENT/server/data/rs_agrawal/heights_and_distances.json"
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully generated Heights and Distances (Ch 34) JSON with {len(data['exercise']['questions'])} questions!")
