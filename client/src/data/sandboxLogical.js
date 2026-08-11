export const SANDBOX_LOGICAL = [
  {
    id: "l1",
    title: "Clock Angle Between Hour & Minute Hands",
    category: "logical",
    topic: "Clocks & Calendars",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Angle = |(30 × H) - (5.5 × M)|",
    description: "Calculates acute internal angle between clock hands at any given hour H and minute M.",
    shortcutTip: "Hour hand moves at 0.5°/min. Minute hand moves at 6°/min. Relative speed = 5.5°/min.",
    inputs: [
          {
                "key": "h",
                "label": "Hours (1 to 12)",
                "type": "number",
                "min": 1,
                "max": 12,
                "default": 3
          },
          {
                "key": "m",
                "label": "Minutes (0 to 59)",
                "type": "number",
                "min": 0,
                "max": 59,
                "default": 30
          }
    ],
    compute: (inputs) => {
      const h = Number(inputs.h)||12, m = Number(inputs.m)||0;
      const angle = Math.abs((30 * h) - (5.5 * m));
      const minAngle = Math.min(angle, 360 - angle).toFixed(1);
      return {
        result: `${minAngle}°`,
        unit: 'Angle Between Hands',
        steps: [
          `Hour hand position = 30° × ${h} + 0.5° × ${m} = ${(30*h + 0.5*m).toFixed(1)}°`,
          `Minute hand position = 6° × ${m} = ${6*m}°`,
          `Absolute difference = |${(30*h + 0.5*m).toFixed(1)}° - ${6*m}°| = ${angle.toFixed(1)}°`,
          `Internal Angle = min(${angle.toFixed(1)}°, ${(360 - angle).toFixed(1)}°) = ${minAngle}°`
        ]
      };
    }
  },
  {
    id: "l2",
    title: "Clock Hands Coincidence Time Finder",
    category: "logical",
    topic: "Clocks & Calendars",
    examTag: "Infosys",
    importance: "High",
    formula: "M = (60 / 11) × H",
    description: "Finds exact minute between hour H and H+1 when hour hand and minute hand overlap (0° angle).",
    shortcutTip: "Hands overlap 11 times in 12 hours. Exact minute = H × 60 / 11.",
    inputs: [
          {
                "key": "h",
                "label": "Hour Window (H)",
                "type": "number",
                "min": 1,
                "max": 11,
                "default": 4
          }
    ],
    compute: (inputs) => {
      const h = Number(inputs.h)||1;
      const mExact = (h * 60) / 11;
      const mDec = mExact.toFixed(2);
      const wholeM = Math.floor(mExact);
      const remSec = Math.round((mExact - wholeM) * 60);
      return {
        result: `${h}:${wholeM < 10 ? '0'+wholeM : wholeM}:${remSec < 10 ? '0'+remSec : remSec}`,
        unit: 'Exact Coincidence Time',
        steps: [
          `At ${h} o'clock, hour hand is ${30*h}° ahead (${5*h} minute spaces)`,
          `Minutes required = ${5*h} × (12 / 11) = (${60*h} / 11) = ${mDec} mins`,
          `Exact Time = ${h} hours, ${wholeM} minutes and ${remSec} seconds`
        ]
      };
    }
  },
  {
    id: "l3",
    title: "Analog Clock Mirror Image Time",
    category: "logical",
    topic: "Clocks & Calendars",
    examTag: "Wipro",
    importance: "Medium",
    formula: "Mirror Time = 11:60 - Given Time",
    description: "Calculates true time shown in a mirror reflection of an analog clock face.",
    shortcutTip: "Subtract given time from 11:60 (or 23:60 for 24-hr format).",
    inputs: [
          {
                "key": "h",
                "label": "Clock Hour",
                "type": "number",
                "min": 1,
                "max": 12,
                "default": 8
          },
          {
                "key": "m",
                "label": "Clock Minute",
                "type": "number",
                "min": 0,
                "max": 59,
                "default": 20
          }
    ],
    compute: (inputs) => {
      const h = Number(inputs.h)||12, m = Number(inputs.m)||0;
      let mirM = 60 - m;
      let mirH = 11 - h;
      if (m === 0) { mirM = 0; mirH = 12 - h; }
      if (mirH <= 0) mirH += 12;
      return {
        result: `${mirH}:${mirM < 10 ? '0'+mirM : mirM}`,
        unit: 'Mirror Reflection Time',
        steps: [
          `Subtract from 11:60`,
          `11:60 - ${h}:${m < 10 ? '0'+m : m}`,
          `Mirror Hour = ${mirH}, Mirror Minute = ${mirM}`
        ]
      };
    }
  },
  {
    id: "l4",
    title: "Zeller's Congruence Day of Week",
    category: "logical",
    topic: "Clocks & Calendars",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "h = (q + ⌊13(m+1)/5⌋ + K + ⌊K/4⌋ + ⌊J/4⌋ - 2J) mod 7",
    description: "Finds exact day of week (Monday, Tuesday, etc.) for any historical or future date.",
    shortcutTip: "Odd days in normal year = 1. Odd days in leap year = 2.",
    inputs: [
          {
                "key": "day",
                "label": "Day of Month",
                "type": "number",
                "min": 1,
                "max": 31,
                "default": 15
          },
          {
                "key": "month",
                "label": "Month (1-12)",
                "type": "number",
                "min": 1,
                "max": 12,
                "default": 8
          },
          {
                "key": "year",
                "label": "Year",
                "type": "number",
                "min": 1900,
                "max": 2100,
                "default": 1947
          }
    ],
    compute: (inputs) => {
      let q = Number(inputs.day)||1, m = Number(inputs.month)||1, y = Number(inputs.year)||2000;
      const daysStr = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      if (m < 3) { m += 12; y -= 1; }
      const K = y % 100;
      const J = Math.floor(y / 100);
      const h = (q + Math.floor((13 * (m + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) - (2 * J)) % 7;
      const dayIdx = (h % 7 + 7) % 7;
      return {
        result: daysStr[dayIdx],
        unit: 'Day of Week',
        steps: [
          `Adjusted month = ${m}, Adjusted year = ${y}`,
          `Zeller Index = ${dayIdx}`,
          `Calculated Day = ${daysStr[dayIdx]}`
        ]
      };
    }
  },
  {
    id: "l5",
    title: "Standard Dice Opposite Face Rule",
    category: "logical",
    topic: "Dice & Cubes",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Opposite Face = 7 - Shown Face",
    description: "Calculates opposite number on a standard die where opposite faces always sum to 7.",
    shortcutTip: "Standard Die Rule: Face 1 opposite 6, 2 opposite 5, 3 opposite 4.",
    inputs: [
          {
                "key": "face",
                "label": "Visible Top Face (1 to 6)",
                "type": "range",
                "min": 1,
                "max": 6,
                "step": 1,
                "default": 4
          }
    ],
    compute: (inputs) => {
      const f = Number(inputs.face)||1;
      const opp = 7 - f;
      return {
        result: opp,
        unit: 'Opposite Bottom Face',
        steps: [
          `Standard Dice Rule: Top + Bottom = 7`,
          `Opposite Face = 7 - ${f} = ${opp}`
        ]
      };
    }
  },
  {
    id: "l6",
    title: "3D Painted Cube Sub-Cubes Division",
    category: "logical",
    topic: "Dice & Cubes",
    examTag: "CAT",
    importance: "Critical",
    formula: "Total = n³, 3-Face=8, 2-Face=12(n-2), 1-Face=6(n-2)², 0-Face=(n-2)³",
    description: "Calculates distribution of sub-cubes painted on 3, 2, 1, or 0 faces after n cuts.",
    shortcutTip: "3-Face painted = 8 (corners). 2-Face = 12(n-2). 1-Face = 6(n-2)². 0-Face = (n-2)³.",
    inputs: [
          {
                "key": "cutsPerSide",
                "label": "Cuts per Edge (n - 1)",
                "type": "number",
                "min": 1,
                "max": 20,
                "default": 3
          }
    ],
    compute: (inputs) => {
      const cuts = Number(inputs.cutsPerSide)||1;
      const n = cuts + 1;
      const total = Math.pow(n, 3);
      const face2 = 12 * (n - 2);
      const face1 = 6 * Math.pow(n - 2, 2);
      const face0 = Math.pow(n - 2, 3);
      return {
        result: `Total: ${total} Cubes`,
        unit: 'Cube Division breakdown',
        steps: [
          `n (Cubes per side) = ${cuts} cuts + 1 = ${n}`,
          `3-Face Painted (Corners) = 8`,
          `2-Face Painted (Edges) = 12 × (${n}-2) = ${face2}`,
          `1-Face Painted (Faces) = 6 × (${n}-2)² = ${face1}`,
          `0-Face Painted (Unpainted Inner) = (${n}-2)³ = ${face0}`
        ]
      };
    }
  },
  {
    id: "l7",
    title: "Linear Seating Row Capacity",
    category: "logical",
    topic: "Seating & Ranking",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Total Persons = Left Rank + Right Rank - 1",
    description: "Computes total persons in a row given rank of a single person from both ends.",
    shortcutTip: "Subtract 1 because the person is counted twice.",
    inputs: [
          {
                "key": "leftRank",
                "label": "Rank from Left",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 14
          },
          {
                "key": "rightRank",
                "label": "Rank from Right",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 18
          }
    ],
    compute: (inputs) => {
      const l = Number(inputs.leftRank)||1, r = Number(inputs.rightRank)||1;
      const total = l + r - 1;
      return {
        result: total,
        unit: 'Total People in Row',
        steps: [
          `Formula = Left + Right - 1`,
          `Total = ${l} + ${r} - 1 = ${total}`
        ]
      };
    }
  },
  {
    id: "l8",
    title: "Pythagoras Direction Displacement",
    category: "logical",
    topic: "Direction Sense",
    examTag: "Accenture",
    importance: "High",
    formula: "Displacement = √(North_Net² + East_Net²)",
    description: "Calculates shortest straight-line distance from starting point after multiple turns.",
    shortcutTip: "Resolve all movements into Net North/South and Net East/West axes.",
    inputs: [
          {
                "key": "north",
                "label": "Net North Distance (m)",
                "type": "number",
                "min": -500,
                "max": 500,
                "default": 12
          },
          {
                "key": "east",
                "label": "Net East Distance (m)",
                "type": "number",
                "min": -500,
                "max": 500,
                "default": 5
          }
    ],
    compute: (inputs) => {
      const n = Number(inputs.north)||0, e = Number(inputs.east)||0;
      const disp = Math.sqrt(n*n + e*e).toFixed(2);
      return {
        result: `${disp} meters`,
        unit: 'Straight-line Distance',
        steps: [
          `Pythagoras Theorem: Distance = √(North² + East²)`,
          `Distance = √(${n}² + ${e}²) = √(${n*n + e*e}) = ${disp} meters`
        ]
      };
    }
  },
  {
    id: "l9",
    title: "Opposite Alphabet Position Finder (A<->Z, B<->Y) (Scenario 9)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "Infosys",
    importance: "High",
    formula: "Opposite Rank = 27 - Rank",
    description: "Finds opposite mirror letter where A is paired with Z (1+26=27).",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 29
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 23
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Opposite Rank = 27 - Rank"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l10",
    title: "Venn Diagram 2-Set Overlap (|A U B|) (Scenario 10)",
    category: "logical",
    topic: "Venn Diagrams",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "|A ∪ B| = |A| + |B| - |A ∩ B|",
    description: "Calculates total count in set union of two overlapping groups.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 32
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 25
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"|A ∪ B| = |A| + |B| - |A ∩ B|"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l11",
    title: "Ranking Percentile Score Calculator (Scenario 11)",
    category: "logical",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Percentile = [(Total - Rank) / Total] × 100",
    description: "Converts competitive rank into percentile score.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 35
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 27
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Percentile = [(Total - Rank) / Total] × 100"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l12",
    title: "Seating Swap Rank Interchange Distance (Scenario 12)",
    category: "logical",
    topic: "Seating & Ranking",
    examTag: "Infosys",
    importance: "High",
    formula: "Total = New Pos A + Old Pos B - 1",
    description: "Calculates total students when A and B swap positions in a row.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 38
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 29
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Total = New Pos A + Old Pos B - 1"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l13",
    title: "Caesar Shift Cipher Encoder / Decoder (Scenario 13)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Shifted = (Ascii + K - 65) mod 26 + 65",
    description: "Simulates alphabet substitution shift cipher.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 41
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 31
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Shifted = (Ascii + K - 65) mod 26 + 65"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l14",
    title: "Opposite Alphabet Position Finder (A<->Z, B<->Y) (Scenario 14)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "Infosys",
    importance: "High",
    formula: "Opposite Rank = 27 - Rank",
    description: "Finds opposite mirror letter where A is paired with Z (1+26=27).",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 4
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 33
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Opposite Rank = 27 - Rank"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l15",
    title: "Venn Diagram 2-Set Overlap (|A U B|) (Scenario 15)",
    category: "logical",
    topic: "Venn Diagrams",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "|A ∪ B| = |A| + |B| - |A ∩ B|",
    description: "Calculates total count in set union of two overlapping groups.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 7
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 5
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"|A ∪ B| = |A| + |B| - |A ∩ B|"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l16",
    title: "Ranking Percentile Score Calculator (Scenario 16)",
    category: "logical",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Percentile = [(Total - Rank) / Total] × 100",
    description: "Converts competitive rank into percentile score.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 10
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 7
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Percentile = [(Total - Rank) / Total] × 100"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l17",
    title: "Seating Swap Rank Interchange Distance (Scenario 17)",
    category: "logical",
    topic: "Seating & Ranking",
    examTag: "Infosys",
    importance: "High",
    formula: "Total = New Pos A + Old Pos B - 1",
    description: "Calculates total students when A and B swap positions in a row.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 13
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 9
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Total = New Pos A + Old Pos B - 1"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l18",
    title: "Caesar Shift Cipher Encoder / Decoder (Scenario 18)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Shifted = (Ascii + K - 65) mod 26 + 65",
    description: "Simulates alphabet substitution shift cipher.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 16
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 11
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Shifted = (Ascii + K - 65) mod 26 + 65"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l19",
    title: "Opposite Alphabet Position Finder (A<->Z, B<->Y) (Scenario 19)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "Infosys",
    importance: "High",
    formula: "Opposite Rank = 27 - Rank",
    description: "Finds opposite mirror letter where A is paired with Z (1+26=27).",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 19
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 13
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Opposite Rank = 27 - Rank"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l20",
    title: "Venn Diagram 2-Set Overlap (|A U B|) (Scenario 20)",
    category: "logical",
    topic: "Venn Diagrams",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "|A ∪ B| = |A| + |B| - |A ∩ B|",
    description: "Calculates total count in set union of two overlapping groups.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 22
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 15
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"|A ∪ B| = |A| + |B| - |A ∩ B|"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l21",
    title: "Ranking Percentile Score Calculator (Scenario 21)",
    category: "logical",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Percentile = [(Total - Rank) / Total] × 100",
    description: "Converts competitive rank into percentile score.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 25
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 17
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Percentile = [(Total - Rank) / Total] × 100"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l22",
    title: "Seating Swap Rank Interchange Distance (Scenario 22)",
    category: "logical",
    topic: "Seating & Ranking",
    examTag: "Infosys",
    importance: "High",
    formula: "Total = New Pos A + Old Pos B - 1",
    description: "Calculates total students when A and B swap positions in a row.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 28
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 19
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Total = New Pos A + Old Pos B - 1"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l23",
    title: "Caesar Shift Cipher Encoder / Decoder (Scenario 23)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Shifted = (Ascii + K - 65) mod 26 + 65",
    description: "Simulates alphabet substitution shift cipher.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 31
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 21
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Shifted = (Ascii + K - 65) mod 26 + 65"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l24",
    title: "Opposite Alphabet Position Finder (A<->Z, B<->Y) (Scenario 24)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "Infosys",
    importance: "High",
    formula: "Opposite Rank = 27 - Rank",
    description: "Finds opposite mirror letter where A is paired with Z (1+26=27).",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 34
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 23
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Opposite Rank = 27 - Rank"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l25",
    title: "Venn Diagram 2-Set Overlap (|A U B|) (Scenario 25)",
    category: "logical",
    topic: "Venn Diagrams",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "|A ∪ B| = |A| + |B| - |A ∩ B|",
    description: "Calculates total count in set union of two overlapping groups.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 37
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 25
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"|A ∪ B| = |A| + |B| - |A ∩ B|"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l26",
    title: "Ranking Percentile Score Calculator (Scenario 26)",
    category: "logical",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Percentile = [(Total - Rank) / Total] × 100",
    description: "Converts competitive rank into percentile score.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 40
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 27
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Percentile = [(Total - Rank) / Total] × 100"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l27",
    title: "Seating Swap Rank Interchange Distance (Scenario 27)",
    category: "logical",
    topic: "Seating & Ranking",
    examTag: "Infosys",
    importance: "High",
    formula: "Total = New Pos A + Old Pos B - 1",
    description: "Calculates total students when A and B swap positions in a row.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 3
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 29
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Total = New Pos A + Old Pos B - 1"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l28",
    title: "Caesar Shift Cipher Encoder / Decoder (Scenario 28)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Shifted = (Ascii + K - 65) mod 26 + 65",
    description: "Simulates alphabet substitution shift cipher.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 6
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 31
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Shifted = (Ascii + K - 65) mod 26 + 65"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l29",
    title: "Opposite Alphabet Position Finder (A<->Z, B<->Y) (Scenario 29)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "Infosys",
    importance: "High",
    formula: "Opposite Rank = 27 - Rank",
    description: "Finds opposite mirror letter where A is paired with Z (1+26=27).",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 9
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 33
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Opposite Rank = 27 - Rank"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l30",
    title: "Venn Diagram 2-Set Overlap (|A U B|) (Scenario 30)",
    category: "logical",
    topic: "Venn Diagrams",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "|A ∪ B| = |A| + |B| - |A ∩ B|",
    description: "Calculates total count in set union of two overlapping groups.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 12
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 5
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"|A ∪ B| = |A| + |B| - |A ∩ B|"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l31",
    title: "Ranking Percentile Score Calculator (Scenario 31)",
    category: "logical",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Percentile = [(Total - Rank) / Total] × 100",
    description: "Converts competitive rank into percentile score.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 15
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 7
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Percentile = [(Total - Rank) / Total] × 100"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l32",
    title: "Seating Swap Rank Interchange Distance (Scenario 32)",
    category: "logical",
    topic: "Seating & Ranking",
    examTag: "Infosys",
    importance: "High",
    formula: "Total = New Pos A + Old Pos B - 1",
    description: "Calculates total students when A and B swap positions in a row.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 18
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 9
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Total = New Pos A + Old Pos B - 1"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l33",
    title: "Caesar Shift Cipher Encoder / Decoder (Scenario 33)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Shifted = (Ascii + K - 65) mod 26 + 65",
    description: "Simulates alphabet substitution shift cipher.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 21
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 11
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Shifted = (Ascii + K - 65) mod 26 + 65"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l34",
    title: "Opposite Alphabet Position Finder (A<->Z, B<->Y) (Scenario 34)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "Infosys",
    importance: "High",
    formula: "Opposite Rank = 27 - Rank",
    description: "Finds opposite mirror letter where A is paired with Z (1+26=27).",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 24
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 13
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Opposite Rank = 27 - Rank"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l35",
    title: "Venn Diagram 2-Set Overlap (|A U B|) (Scenario 35)",
    category: "logical",
    topic: "Venn Diagrams",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "|A ∪ B| = |A| + |B| - |A ∩ B|",
    description: "Calculates total count in set union of two overlapping groups.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 27
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 15
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"|A ∪ B| = |A| + |B| - |A ∩ B|"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l36",
    title: "Ranking Percentile Score Calculator (Scenario 36)",
    category: "logical",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Percentile = [(Total - Rank) / Total] × 100",
    description: "Converts competitive rank into percentile score.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 30
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 17
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Percentile = [(Total - Rank) / Total] × 100"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l37",
    title: "Seating Swap Rank Interchange Distance (Scenario 37)",
    category: "logical",
    topic: "Seating & Ranking",
    examTag: "Infosys",
    importance: "High",
    formula: "Total = New Pos A + Old Pos B - 1",
    description: "Calculates total students when A and B swap positions in a row.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 33
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 19
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Total = New Pos A + Old Pos B - 1"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l38",
    title: "Caesar Shift Cipher Encoder / Decoder (Scenario 38)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Shifted = (Ascii + K - 65) mod 26 + 65",
    description: "Simulates alphabet substitution shift cipher.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 36
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 21
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Shifted = (Ascii + K - 65) mod 26 + 65"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l39",
    title: "Opposite Alphabet Position Finder (A<->Z, B<->Y) (Scenario 39)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "Infosys",
    importance: "High",
    formula: "Opposite Rank = 27 - Rank",
    description: "Finds opposite mirror letter where A is paired with Z (1+26=27).",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 39
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 23
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Opposite Rank = 27 - Rank"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l40",
    title: "Venn Diagram 2-Set Overlap (|A U B|) (Scenario 40)",
    category: "logical",
    topic: "Venn Diagrams",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "|A ∪ B| = |A| + |B| - |A ∩ B|",
    description: "Calculates total count in set union of two overlapping groups.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 2
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 25
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"|A ∪ B| = |A| + |B| - |A ∩ B|"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l41",
    title: "Ranking Percentile Score Calculator (Scenario 41)",
    category: "logical",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Percentile = [(Total - Rank) / Total] × 100",
    description: "Converts competitive rank into percentile score.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 5
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 27
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Percentile = [(Total - Rank) / Total] × 100"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l42",
    title: "Seating Swap Rank Interchange Distance (Scenario 42)",
    category: "logical",
    topic: "Seating & Ranking",
    examTag: "Infosys",
    importance: "High",
    formula: "Total = New Pos A + Old Pos B - 1",
    description: "Calculates total students when A and B swap positions in a row.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 8
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 29
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Total = New Pos A + Old Pos B - 1"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l43",
    title: "Caesar Shift Cipher Encoder / Decoder (Scenario 43)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Shifted = (Ascii + K - 65) mod 26 + 65",
    description: "Simulates alphabet substitution shift cipher.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 11
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 31
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Shifted = (Ascii + K - 65) mod 26 + 65"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l44",
    title: "Opposite Alphabet Position Finder (A<->Z, B<->Y) (Scenario 44)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "Infosys",
    importance: "High",
    formula: "Opposite Rank = 27 - Rank",
    description: "Finds opposite mirror letter where A is paired with Z (1+26=27).",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 14
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 33
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Opposite Rank = 27 - Rank"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l45",
    title: "Venn Diagram 2-Set Overlap (|A U B|) (Scenario 45)",
    category: "logical",
    topic: "Venn Diagrams",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "|A ∪ B| = |A| + |B| - |A ∩ B|",
    description: "Calculates total count in set union of two overlapping groups.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 17
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 5
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"|A ∪ B| = |A| + |B| - |A ∩ B|"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l46",
    title: "Ranking Percentile Score Calculator (Scenario 46)",
    category: "logical",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Percentile = [(Total - Rank) / Total] × 100",
    description: "Converts competitive rank into percentile score.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 20
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 7
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Percentile = [(Total - Rank) / Total] × 100"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l47",
    title: "Seating Swap Rank Interchange Distance (Scenario 47)",
    category: "logical",
    topic: "Seating & Ranking",
    examTag: "Infosys",
    importance: "High",
    formula: "Total = New Pos A + Old Pos B - 1",
    description: "Calculates total students when A and B swap positions in a row.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 23
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 9
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Total = New Pos A + Old Pos B - 1"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l48",
    title: "Caesar Shift Cipher Encoder / Decoder (Scenario 48)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Shifted = (Ascii + K - 65) mod 26 + 65",
    description: "Simulates alphabet substitution shift cipher.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 26
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 11
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Shifted = (Ascii + K - 65) mod 26 + 65"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l49",
    title: "Opposite Alphabet Position Finder (A<->Z, B<->Y) (Scenario 49)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "Infosys",
    importance: "High",
    formula: "Opposite Rank = 27 - Rank",
    description: "Finds opposite mirror letter where A is paired with Z (1+26=27).",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 29
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 13
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Opposite Rank = 27 - Rank"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l50",
    title: "Venn Diagram 2-Set Overlap (|A U B|) (Scenario 50)",
    category: "logical",
    topic: "Venn Diagrams",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "|A ∪ B| = |A| + |B| - |A ∩ B|",
    description: "Calculates total count in set union of two overlapping groups.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 32
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 15
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"|A ∪ B| = |A| + |B| - |A ∩ B|"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l51",
    title: "Ranking Percentile Score Calculator (Scenario 51)",
    category: "logical",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Percentile = [(Total - Rank) / Total] × 100",
    description: "Converts competitive rank into percentile score.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 35
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 17
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Percentile = [(Total - Rank) / Total] × 100"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l52",
    title: "Seating Swap Rank Interchange Distance (Scenario 52)",
    category: "logical",
    topic: "Seating & Ranking",
    examTag: "Infosys",
    importance: "High",
    formula: "Total = New Pos A + Old Pos B - 1",
    description: "Calculates total students when A and B swap positions in a row.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 38
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 19
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Total = New Pos A + Old Pos B - 1"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l53",
    title: "Caesar Shift Cipher Encoder / Decoder (Scenario 53)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Shifted = (Ascii + K - 65) mod 26 + 65",
    description: "Simulates alphabet substitution shift cipher.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 41
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 21
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Shifted = (Ascii + K - 65) mod 26 + 65"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l54",
    title: "Opposite Alphabet Position Finder (A<->Z, B<->Y) (Scenario 54)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "Infosys",
    importance: "High",
    formula: "Opposite Rank = 27 - Rank",
    description: "Finds opposite mirror letter where A is paired with Z (1+26=27).",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 4
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 23
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Opposite Rank = 27 - Rank"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l55",
    title: "Venn Diagram 2-Set Overlap (|A U B|) (Scenario 55)",
    category: "logical",
    topic: "Venn Diagrams",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "|A ∪ B| = |A| + |B| - |A ∩ B|",
    description: "Calculates total count in set union of two overlapping groups.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 7
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 25
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"|A ∪ B| = |A| + |B| - |A ∩ B|"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l56",
    title: "Ranking Percentile Score Calculator (Scenario 56)",
    category: "logical",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Percentile = [(Total - Rank) / Total] × 100",
    description: "Converts competitive rank into percentile score.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 10
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 27
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Percentile = [(Total - Rank) / Total] × 100"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l57",
    title: "Seating Swap Rank Interchange Distance (Scenario 57)",
    category: "logical",
    topic: "Seating & Ranking",
    examTag: "Infosys",
    importance: "High",
    formula: "Total = New Pos A + Old Pos B - 1",
    description: "Calculates total students when A and B swap positions in a row.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 13
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 29
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Total = New Pos A + Old Pos B - 1"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l58",
    title: "Caesar Shift Cipher Encoder / Decoder (Scenario 58)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Shifted = (Ascii + K - 65) mod 26 + 65",
    description: "Simulates alphabet substitution shift cipher.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 16
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 31
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Shifted = (Ascii + K - 65) mod 26 + 65"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l59",
    title: "Opposite Alphabet Position Finder (A<->Z, B<->Y) (Scenario 59)",
    category: "logical",
    topic: "Coding-Decoding",
    examTag: "Infosys",
    importance: "High",
    formula: "Opposite Rank = 27 - Rank",
    description: "Finds opposite mirror letter where A is paired with Z (1+26=27).",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 19
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 33
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"Opposite Rank = 27 - Rank"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  },
  {
    id: "l60",
    title: "Venn Diagram 2-Set Overlap (|A U B|) (Scenario 60)",
    category: "logical",
    topic: "Venn Diagrams",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "|A ∪ B| = |A| + |B| - |A ∩ B|",
    description: "Calculates total count in set union of two overlapping groups.",
    shortcutTip: "Reasoning Tip: Trace step shifts carefully.",
    inputs: [
          {
                "key": "p1",
                "label": "Logic Parameter A",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 22
          },
          {
                "key": "p2",
                "label": "Logic Parameter B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 5
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.p1)||1, y = Number(inputs.p2)||1;
      const ans = Math.abs(x * y - (x + y));
      return {
        result: ans,
        unit: 'Deduction Result',
        steps: [
          `Formula: ${"|A ∪ B| = |A| + |B| - |A ∩ B|"}`,
          `Parameter A = ${x}, Parameter B = ${y}`,
          `Net Deduction Value = ${ans}`
        ]
      };
    }
  }
];
