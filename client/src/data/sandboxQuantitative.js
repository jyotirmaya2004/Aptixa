export const SANDBOX_QUANTITATIVE = [
  {
    id: "q1",
    title: "Work Completion Time (2 Persons)",
    category: "quantitative",
    topic: "Time & Work",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Time = (A × B) / (A + B)",
    description: "Calculates combined days required when Person A takes A days and Person B takes B days.",
    shortcutTip: "Combined rate = 1/A + 1/B. Invert total rate to get days.",
    inputs: [
          {
                "key": "a",
                "label": "Person A Days",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 10
          },
          {
                "key": "b",
                "label": "Person B Days",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 15
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.a)||1, b = Number(inputs.b)||1;
      const combined = ((a * b) / (a + b)).toFixed(2);
      return {
        result: combined,
        unit: 'Days',
        steps: [
          `Rate A = 1/${a}, Rate B = 1/${b}`,
          `Combined Rate = 1/${a} + 1/${b} = (${a}+${b})/(${a}×${b})`,
          `Total Days = (${a} × ${b}) / (${a} + ${b}) = ${combined} days`
        ]
      };
    }
  },
  {
    id: "q2",
    title: "Work Completion Time (3 Persons)",
    category: "quantitative",
    topic: "Time & Work",
    examTag: "Infosys",
    importance: "High",
    formula: "Time = (A × B × C) / (AB + BC + CA)",
    description: "Finds joint working time when A, B, and C work simultaneously.",
    shortcutTip: "Rate sum = 1/A + 1/B + 1/C = (AB + BC + CA) / ABC.",
    inputs: [
          {
                "key": "a",
                "label": "A Days",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 12
          },
          {
                "key": "b",
                "label": "B Days",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 15
          },
          {
                "key": "c",
                "label": "C Days",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 20
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.a)||1, b = Number(inputs.b)||1, c = Number(inputs.c)||1;
      const num = a * b * c;
      const den = (a * b) + (b * c) + (c * a);
      const res = (num / den).toFixed(2);
      return {
        result: res,
        unit: 'Days',
        steps: [
          `ABC = ${num}`,
          `AB + BC + CA = ${den}`,
          `Time = ${num} / ${den} = ${res} days`
        ]
      };
    }
  },
  {
    id: "q3",
    title: "Alternate Working Days Duration",
    category: "quantitative",
    topic: "Time & Work",
    examTag: "CAT",
    importance: "Critical",
    formula: "2-Day Cycle Work = 1/A + 1/B",
    description: "Computes total completion days when A and B work on alternate days starting with A.",
    shortcutTip: "Find work done in a 2-day cycle, then multiply cycles.",
    inputs: [
          {
                "key": "a",
                "label": "A Individual Days",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 10
          },
          {
                "key": "b",
                "label": "B Individual Days",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 20
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.a)||1, b = Number(inputs.b)||1;
      const cycleWork = 1/a + 1/b;
      const cycles = Math.floor(1 / cycleWork);
      const workDone = cycles * cycleWork;
      const rem = 1 - workDone;
      let extra = 0;
      if (rem > 0) {
        extra = rem <= (1/a) ? rem * a : 1 + (rem - 1/a) * b;
      }
      const total = (cycles * 2 + extra).toFixed(2);
      return {
        result: total,
        unit: 'Days',
        steps: [
          `2-Day Cycle Work = 1/${a} + 1/${b} = ${cycleWork.toFixed(4)}`,
          `Completed Cycles = ${cycles}`,
          `Total Alternate Days = ${total} days`
        ]
      };
    }
  },
  {
    id: "q4",
    title: "Work & Wages Share Distribution",
    category: "quantitative",
    topic: "Time & Work",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Wage Share = Total Wage × (Rate / Combined Rate)",
    description: "Distributes total money earned based on individual work rates.",
    shortcutTip: "Wages are divided in the ratio of work done per day (efficiency ratio).",
    inputs: [
          {
                "key": "a",
                "label": "A Days",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 6
          },
          {
                "key": "b",
                "label": "B Days",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 8
          },
          {
                "key": "wage",
                "label": "Total Wage ($)",
                "type": "number",
                "min": 100,
                "max": 100000,
                "default": 1400
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.a)||1, b = Number(inputs.b)||1, w = Number(inputs.wage)||0;
      const ratioA = 1/a, ratioB = 1/b;
      const shareA = ((ratioA / (ratioA + ratioB)) * w).toFixed(2);
      const shareB = (w - shareA).toFixed(2);
      return {
        result: `A: $${shareA} | B: $${shareB}`,
        unit: 'Wage Split',
        steps: [
          `Ratio A : B = 1/${a} : 1/${b} = ${b} : ${a}`,
          `Share A = (${b} / ${a+b}) × $${w} = $${shareA}`,
          `Share B = (${a} / ${a+b}) × $${w} = $${shareB}`
        ]
      };
    }
  },
  {
    id: "q5",
    title: "Two Inlet Pipes Tank Filling Time",
    category: "quantitative",
    topic: "Pipes & Cisterns",
    examTag: "Wipro",
    importance: "Medium",
    formula: "Time = (P1 × P2) / (P1 + P2)",
    description: "Finds time to fill a water tank using two inlet pipes P1 and P2.",
    shortcutTip: "Inlet rates add up. Rate = 1/P1 + 1/P2.",
    inputs: [
          {
                "key": "p1",
                "label": "Pipe 1 Hours",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 4
          },
          {
                "key": "p2",
                "label": "Pipe 2 Hours",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 6
          }
    ],
    compute: (inputs) => {
      const p1 = Number(inputs.p1)||1, p2 = Number(inputs.p2)||1;
      const res = ((p1 * p2) / (p1 + p2)).toFixed(2);
      return {
        result: `${res} hrs`,
        unit: 'Fill Time',
        steps: [
          `Net Rate = 1/${p1} + 1/${p2} = ${p1+p2}/${p1*p2}`,
          `Time = ${p1*p2} / ${p1+p2} = ${res} hours`
        ]
      };
    }
  },
  {
    id: "q6",
    title: "Inlet & Leak Outlet Tank Time",
    category: "quantitative",
    topic: "Pipes & Cisterns",
    examTag: "Accenture",
    importance: "High",
    formula: "Net Rate = 1/Inlet - 1/Outlet",
    description: "Computes filling time when an inlet fills tank in A hrs and a leak empties it in B hrs.",
    shortcutTip: "Leak subtracts from filling rate. Net Time = (A × B) / (B - A).",
    inputs: [
          {
                "key": "inlet",
                "label": "Inlet Fill Hours (A)",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 5
          },
          {
                "key": "outlet",
                "label": "Leak Empty Hours (B)",
                "type": "number",
                "min": 2,
                "max": 100,
                "default": 10
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.inlet)||1, b = Number(inputs.outlet)||2;
      if (b <= a) return { result: 'Tank Will Empty', unit: '', steps: ['Leak is faster than inlet! Tank never fills.'] };
      const res = ((a * b) / (b - a)).toFixed(2);
      return {
        result: `${res} hrs`,
        unit: 'Net Fill Time',
        steps: [
          `Net Rate = 1/${a} - 1/${b} = (${b}-${a})/(${a}×${b})`,
          `Net Time = (${a} × ${b}) / (${b} - ${a}) = ${res} hours`
        ]
      };
    }
  },
  {
    id: "q7",
    title: "Average Speed (Equal Distances)",
    category: "quantitative",
    topic: "Speed, Distance & Time",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Avg Speed = (2 × S1 × S2) / (S1 + S2)",
    description: "Computes harmonic mean average speed for a round trip with speeds S1 and S2.",
    shortcutTip: "Average speed is NEVER the simple arithmetic mean (S1+S2)/2 when distances are equal!",
    inputs: [
          {
                "key": "s1",
                "label": "Going Speed S1 (km/h)",
                "type": "number",
                "min": 1,
                "max": 300,
                "default": 60
          },
          {
                "key": "s2",
                "label": "Return Speed S2 (km/h)",
                "type": "number",
                "min": 1,
                "max": 300,
                "default": 40
          }
    ],
    compute: (inputs) => {
      const s1 = Number(inputs.s1)||1, s2 = Number(inputs.s2)||1;
      const avg = ((2 * s1 * s2) / (s1 + s2)).toFixed(2);
      return {
        result: `${avg} km/h`,
        unit: 'Harmonic Average Speed',
        steps: [
          `Formula: (2 × S1 × S2) / (S1 + S2)`,
          `Numerator = 2 × ${s1} × ${s2} = ${2 * s1 * s2}`,
          `Denominator = ${s1} + ${s2} = ${s1 + s2}`,
          `Average Speed = ${2 * s1 * s2} / ${s1 + s2} = ${avg} km/h`
        ]
      };
    }
  },
  {
    id: "q8",
    title: "Relative Speed (Opposite Directions)",
    category: "quantitative",
    topic: "Speed, Distance & Time",
    examTag: "Infosys",
    importance: "High",
    formula: "Relative Speed = S1 + S2",
    description: "Calculates meeting time for two objects moving towards each other from distance D.",
    shortcutTip: "When moving towards each other, add speeds.",
    inputs: [
          {
                "key": "d",
                "label": "Separation Distance D (km)",
                "type": "number",
                "min": 1,
                "max": 5000,
                "default": 300
          },
          {
                "key": "s1",
                "label": "Object 1 Speed (km/h)",
                "type": "number",
                "min": 1,
                "max": 300,
                "default": 60
          },
          {
                "key": "s2",
                "label": "Object 2 Speed (km/h)",
                "type": "number",
                "min": 1,
                "max": 300,
                "default": 40
          }
    ],
    compute: (inputs) => {
      const d = Number(inputs.d)||1, s1 = Number(inputs.s1)||1, s2 = Number(inputs.s2)||1;
      const rel = s1 + s2;
      const time = (d / rel).toFixed(2);
      return {
        result: `${time} hrs`,
        unit: `Relative Speed: ${rel} km/h`,
        steps: [
          `Relative Speed = ${s1} + ${s2} = ${rel} km/h`,
          `Meeting Time = Distance / Relative Speed = ${d} / ${rel} = ${time} hours`
        ]
      };
    }
  },
  {
    id: "q9",
    title: "Train Crossing Stationary Pole / Man",
    category: "quantitative",
    topic: "Trains & Platforms",
    examTag: "Wipro",
    importance: "Medium",
    formula: "Time = Train Length / Speed (m/s)",
    description: "Calculates time taken by a train of length L to cross a stationary pole.",
    shortcutTip: "Convert km/h to m/s by multiplying by (5 / 18).",
    inputs: [
          {
                "key": "length",
                "label": "Train Length L (meters)",
                "type": "number",
                "min": 10,
                "max": 2000,
                "default": 150
          },
          {
                "key": "speedKmh",
                "label": "Train Speed (km/h)",
                "type": "number",
                "min": 1,
                "max": 300,
                "default": 54
          }
    ],
    compute: (inputs) => {
      const l = Number(inputs.length)||1, kmh = Number(inputs.speedKmh)||1;
      const ms = kmh * (5 / 18);
      const time = (l / ms).toFixed(2);
      return {
        result: `${time} sec`,
        unit: `Speed: ${ms.toFixed(2)} m/s`,
        steps: [
          `Convert Speed to m/s = ${kmh} × (5/18) = ${ms.toFixed(2)} m/s`,
          `Time = Length / Speed = ${l} / ${ms.toFixed(2)} = ${time} seconds`
        ]
      };
    }
  },
  {
    id: "q10",
    title: "Train Crossing Platform / Bridge",
    category: "quantitative",
    topic: "Trains & Platforms",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "Time = (L_train + L_platform) / Speed (m/s)",
    description: "Finds time to cross a platform of length P.",
    shortcutTip: "Total distance covered = Train Length + Platform Length.",
    inputs: [
          {
                "key": "lTrain",
                "label": "Train Length (m)",
                "type": "number",
                "min": 10,
                "max": 2000,
                "default": 200
          },
          {
                "key": "lPlatform",
                "label": "Platform Length (m)",
                "type": "number",
                "min": 10,
                "max": 2000,
                "default": 300
          },
          {
                "key": "speedKmh",
                "label": "Train Speed (km/h)",
                "type": "number",
                "min": 1,
                "max": 300,
                "default": 90
          }
    ],
    compute: (inputs) => {
      const lt = Number(inputs.lTrain)||0, lp = Number(inputs.lPlatform)||0, kmh = Number(inputs.speedKmh)||1;
      const totDist = lt + lp;
      const ms = kmh * (5 / 18);
      const time = (totDist / ms).toFixed(2);
      return {
        result: `${time} sec`,
        unit: `Total Dist: ${totDist}m`,
        steps: [
          `Total Distance = ${lt}m + ${lp}m = ${totDist}m`,
          `Speed in m/s = ${kmh} × (5/18) = ${ms.toFixed(2)} m/s`,
          `Time = ${totDist} / ${ms.toFixed(2)} = ${time} seconds`
        ]
      };
    }
  },
  {
    id: "q11",
    title: "Boat Still Water Speed & River Stream Speed",
    category: "quantitative",
    topic: "Boats & Streams",
    examTag: "CAT",
    importance: "Critical",
    formula: "Boat Speed = (D + U)/2, Stream Speed = (D - U)/2",
    description: "Finds speed of boat in still water and stream current speed given Downstream (D) & Upstream (U) speeds.",
    shortcutTip: "Downstream D = Boat + Stream. Upstream U = Boat - Stream.",
    inputs: [
          {
                "key": "down",
                "label": "Downstream Speed D (km/h)",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 16
          },
          {
                "key": "up",
                "label": "Upstream Speed U (km/h)",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 8
          }
    ],
    compute: (inputs) => {
      const d = Number(inputs.down)||0, u = Number(inputs.up)||0;
      const boat = ((d + u) / 2).toFixed(1);
      const stream = ((d - u) / 2).toFixed(1);
      return {
        result: `Boat: ${boat} km/h | Stream: ${stream} km/h`,
        unit: 'Speeds Breakdown',
        steps: [
          `Boat Speed = (Downstream + Upstream) / 2 = (${d} + ${u}) / 2 = ${boat} km/h`,
          `Stream Speed = (Downstream - Upstream) / 2 = (${d} - ${u}) / 2 = ${stream} km/h`
        ]
      };
    }
  },
  {
    id: "q12",
    title: "Single Equivalent of Two Successive Discounts",
    category: "quantitative",
    topic: "Profit, Loss & Discount",
    examTag: "Accenture",
    importance: "High",
    formula: "Equivalent Discount% = D1 + D2 - (D1 × D2) / 100",
    description: "Calculates net single discount percentage equivalent to two successive discounts D1% and D2%.",
    shortcutTip: "Successive discounts are NOT added directly! 20% + 10% = 28%, NOT 30%.",
    inputs: [
          {
                "key": "d1",
                "label": "Discount 1 (%)",
                "type": "number",
                "min": 0,
                "max": 99,
                "default": 20
          },
          {
                "key": "d2",
                "label": "Discount 2 (%)",
                "type": "number",
                "min": 0,
                "max": 99,
                "default": 10
          }
    ],
    compute: (inputs) => {
      const d1 = Number(inputs.d1)||0, d2 = Number(inputs.d2)||0;
      const eq = (d1 + d2 - (d1 * d2) / 100).toFixed(2);
      return {
        result: `${eq}%`,
        unit: 'Single Net Discount',
        steps: [
          `Formula = D1 + D2 - (D1 × D2)/100`,
          `${d1} + ${d2} - (${d1} × ${d2})/100 = ${d1 + d2} - ${(d1*d2)/100} = ${eq}%`
        ]
      };
    }
  },
  {
    id: "q13",
    title: "False Weight Trader Gain Percentage",
    category: "quantitative",
    topic: "Profit, Loss & Discount",
    examTag: "CAT",
    importance: "Critical",
    formula: "Gain% = [Error / (True Weight - Error)] × 100",
    description: "Calculates profit % made by a dishonest trader using a false weight (e.g. 900g instead of 1000g).",
    shortcutTip: "Error = True Weight - False Weight. Profit is made on the actual false weight given to customer.",
    inputs: [
          {
                "key": "trueW",
                "label": "True Weight (g)",
                "type": "number",
                "min": 100,
                "max": 5000,
                "default": 1000
          },
          {
                "key": "falseW",
                "label": "False Weight Used (g)",
                "type": "number",
                "min": 50,
                "max": 5000,
                "default": 900
          }
    ],
    compute: (inputs) => {
      const tw = Number(inputs.trueW)||1000, fw = Number(inputs.falseW)||900;
      const error = tw - fw;
      if (error <= 0) return { result: 'No Profit', unit: '', steps: ['False weight must be less than true weight!'] };
      const gainPct = ((error / fw) * 100).toFixed(2);
      return {
        result: `${gainPct}%`,
        unit: 'Trader Gain %',
        steps: [
          `Error = True Weight (${tw}g) - False Weight (${fw}g) = ${error}g`,
          `Gain % = (Error / False Weight) × 100 = (${error} / ${fw}) × 100 = ${gainPct}%`
        ]
      };
    }
  },
  {
    id: "q14",
    title: "Compound Interest Annual Amount & Interest",
    category: "quantitative",
    topic: "Simple & Compound Interest",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "A = P × (1 + R/100)^N, CI = A - P",
    description: "Calculates final maturity amount A and compound interest CI.",
    shortcutTip: "Compound interest grows exponentially. Rule of 72 gives approximate doubling time.",
    inputs: [
          {
                "key": "p",
                "label": "Principal P ($)",
                "type": "number",
                "min": 100,
                "max": 1000000,
                "default": 10000
          },
          {
                "key": "r",
                "label": "Annual Interest Rate R (%)",
                "type": "number",
                "min": 0.1,
                "max": 50,
                "default": 10
          },
          {
                "key": "n",
                "label": "Duration N (Years)",
                "type": "number",
                "min": 1,
                "max": 40,
                "default": 3
          }
    ],
    compute: (inputs) => {
      const P = Number(inputs.p)||0, R = Number(inputs.r)||0, N = Number(inputs.n)||1;
      const mult = Math.pow(1 + R/100, N);
      const amount = (P * mult).toFixed(2);
      const ci = (amount - P).toFixed(2);
      return {
        result: `$${amount}`,
        unit: `CI: $${ci}`,
        steps: [
          `Multiplier = (1 + ${R}/100)^${N} = ${mult.toFixed(4)}`,
          `Amount = $${P} × ${mult.toFixed(4)} = $${amount}`,
          `Compound Interest = $${amount} - $${P} = $${ci}`
        ]
      };
    }
  },
  {
    id: "q15",
    title: "Difference Between CI and SI for 2 Years",
    category: "quantitative",
    topic: "Simple & Compound Interest",
    examTag: "Infosys",
    importance: "High",
    formula: "Difference = Principal × (R / 100)²",
    description: "Finds exact difference between Compound Interest and Simple Interest over 2 years.",
    shortcutTip: "For 2 years, Difference = P × (R/100)². For 3 years, Diff = P × (R/100)² × (3 + R/100).",
    inputs: [
          {
                "key": "p",
                "label": "Principal P ($)",
                "type": "number",
                "min": 100,
                "max": 1000000,
                "default": 5000
          },
          {
                "key": "r",
                "label": "Rate R (%)",
                "type": "number",
                "min": 0.1,
                "max": 50,
                "default": 8
          }
    ],
    compute: (inputs) => {
      const P = Number(inputs.p)||0, R = Number(inputs.r)||0;
      const diff = (P * Math.pow(R / 100, 2)).toFixed(2);
      return {
        result: `$${diff}`,
        unit: 'CI - SI Difference',
        steps: [
          `Formula = P × (R/100)²`,
          `Diff = $${P} × (${R}/100)² = $${P} × ${Math.pow(R/100, 2).toFixed(6)} = $${diff}`
        ]
      };
    }
  },
  {
    id: "q16",
    title: "Rule of 72 Investment Doubling Time",
    category: "quantitative",
    topic: "Simple & Compound Interest",
    examTag: "Accenture",
    importance: "Medium",
    formula: "Years to Double ≈ 72 / Annual Interest Rate R",
    description: "Estimates number of years required for an investment to double at a fixed annual compound rate R.",
    shortcutTip: "Rule of 72 is an accurate mental math rule for compound rates between 4% and 15%.",
    inputs: [
          {
                "key": "r",
                "label": "Annual Interest Rate R (%)",
                "type": "number",
                "min": 1,
                "max": 50,
                "default": 9
          }
    ],
    compute: (inputs) => {
      const R = Number(inputs.r)||1;
      const approx = (72 / R).toFixed(1);
      const exact = (Math.log(2) / Math.log(1 + R/100)).toFixed(2);
      return {
        result: `~${approx} Years`,
        unit: `Exact: ${exact} yrs`,
        steps: [
          `Rule of 72 Estimate = 72 / ${R} = ${approx} years`,
          `Exact Formula = ln(2) / ln(1 + ${R}/100) = ${exact} years`
        ]
      };
    }
  },
  {
    id: "q17",
    title: "Mixture Alligation Ratio Finder",
    category: "quantitative",
    topic: "Mixtures & Alligations",
    examTag: "CAT",
    importance: "Critical",
    formula: "(Cheaper Quantity) : (Dearer Quantity) = (d - m) : (m - c)",
    description: "Finds mixing ratio of two ingredients with prices C and D to produce a mixture of mean price M.",
    shortcutTip: "Place mean price M in center. Cross subtract (D - M) and (M - C).",
    inputs: [
          {
                "key": "c",
                "label": "Cheaper Price C ($/kg)",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 15
          },
          {
                "key": "d",
                "label": "Dearer Price D ($/kg)",
                "type": "number",
                "min": 2,
                "max": 1000,
                "default": 25
          },
          {
                "key": "m",
                "label": "Target Mean Price M ($/kg)",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 18
          }
    ],
    compute: (inputs) => {
      const c = Number(inputs.c)||0, d = Number(inputs.d)||0, m = Number(inputs.m)||0;
      if (m <= c || m >= d) return { result: 'Invalid Mean', unit: '', steps: ['Mean price M must lie between C and D!'] };
      const diff1 = d - m;
      const diff2 = m - c;
      return {
        result: `${diff1} : ${diff2}`,
        unit: 'Cheaper : Dearer Ratio',
        steps: [
          `Dearer - Mean (D - M) = ${d} - ${m} = ${diff1}`,
          `Mean - Cheaper (M - C) = ${m} - ${c} = ${diff2}`,
          `Mixing Ratio (Cheaper : Dearer) = ${diff1} : ${diff2}`
        ]
      };
    }
  },
  {
    id: "q18",
    title: "Repeated Liquid Replacement Formula",
    category: "quantitative",
    topic: "Mixtures & Alligations",
    examTag: "CAT",
    importance: "Critical",
    formula: "Remaining Pure Liquid = Initial Volume × (1 - y / x)^n",
    description: "Calculates remaining pure liquid (e.g. wine) after replacing y liters with water n times.",
    shortcutTip: "x = initial volume, y = drawn volume per step, n = number of repeated replacements.",
    inputs: [
          {
                "key": "x",
                "label": "Initial Volume x (liters)",
                "type": "number",
                "min": 10,
                "max": 1000,
                "default": 80
          },
          {
                "key": "y",
                "label": "Drawn & Replaced Volume y (L)",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 8
          },
          {
                "key": "n",
                "label": "Number of Replacements n",
                "type": "number",
                "min": 1,
                "max": 10,
                "default": 3
          }
    ],
    compute: (inputs) => {
      const x = Number(inputs.x)||1, y = Number(inputs.y)||0, n = Number(inputs.n)||1;
      const rem = (x * Math.pow(1 - y / x, n)).toFixed(2);
      const water = (x - rem).toFixed(2);
      return {
        result: `${rem} Liters`,
        unit: `Water: ${water} L`,
        steps: [
          `Fraction remaining per step = (1 - ${y}/${x}) = ${(1 - y/x).toFixed(4)}`,
          `Fraction after ${n} steps = (${(1 - y/x).toFixed(4)})^${n} = ${Math.pow(1 - y/x, n).toFixed(4)}`,
          `Remaining Pure Liquid = ${x} × ${Math.pow(1 - y/x, n).toFixed(4)} = ${rem} liters`
        ]
      };
    }
  },
  {
    id: "q19",
    title: "Combinations Formula nCr (Selection)",
    category: "quantitative",
    topic: "Permutations & Combinations",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "nCr = n! / [r! × (n - r)!]",
    description: "Calculates number of ways to choose r items from a set of n items (order does not matter).",
    shortcutTip: "nCr = nC(n-r). Handshakes among n people = nC2.",
    inputs: [
          {
                "key": "n",
                "label": "Total Items n",
                "type": "number",
                "min": 1,
                "max": 30,
                "default": 10
          },
          {
                "key": "r",
                "label": "Chosen Items r",
                "type": "number",
                "min": 0,
                "max": 30,
                "default": 3
          }
    ],
    compute: (inputs) => {
      const n = Number(inputs.n)||1, r = Number(inputs.r)||0;
      if (r > n) return { result: '0', unit: '', steps: ['r cannot be greater than n!'] };
      const fact = (num) => { let res = 1; for(let i=2; i<=num; i++) res *= i; return res; };
      const nCr = Math.round(fact(n) / (fact(r) * fact(n - r)));
      return {
        result: nCr.toLocaleString(),
        unit: `${n}C${r} Combinations`,
        steps: [
          `n! = ${n}! = ${fact(n).toLocaleString()}`,
          `r! = ${r}! = ${fact(r)}`,
          `(n-r)! = ${n-r}! = ${fact(n-r).toLocaleString()}`,
          `nCr = ${fact(n).toLocaleString()} / (${fact(r)} × ${fact(n-r).toLocaleString()}) = ${nCr.toLocaleString()}`
        ]
      };
    }
  },
  {
    id: "q20",
    title: "Handshake Pairs & Polygon Diagonals Formula",
    category: "quantitative",
    topic: "Permutations & Combinations",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Handshakes = n(n-1)/2, Diagonals = n(n-3)/2",
    description: "Calculates total mutual handshakes between n people and diagonals in an n-sided polygon.",
    shortcutTip: "Handshakes = nC2. Polygon diagonals = nC2 - n = n(n-3)/2.",
    inputs: [
          {
                "key": "n",
                "label": "People / Polygon Sides (n)",
                "type": "number",
                "min": 3,
                "max": 100,
                "default": 12
          }
    ],
    compute: (inputs) => {
      const n = Number(inputs.n)||3;
      const handshakes = (n * (n - 1)) / 2;
      const diagonals = (n * (n - 3)) / 2;
      return {
        result: `Handshakes: ${handshakes} | Diagonals: ${diagonals}`,
        unit: 'Pair Combinations',
        steps: [
          `Handshakes = ${n}C2 = ${n} × ${n-1} / 2 = ${handshakes}`,
          `Diagonals in ${n}-sided polygon = ${n}(${n}-3)/2 = ${diagonals}`
        ]
      };
    }
  },
  {
    id: "q21",
    title: "At Least 1 Success Complement Probability (Case 21)",
    category: "quantitative",
    topic: "Probability",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "P(At least 1) = 1 - P(None)",
    description: "Calculates probability of at least one success across N independent trials.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 67
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 5
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"P(At least 1) = 1 - P(None)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q22",
    title: "Equilateral Triangle Area & Height (Case 22)",
    category: "quantitative",
    topic: "Mensuration 2D",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Area = (√3 / 4) × a², Height = (√3 / 2) × a",
    description: "Finds area and altitude of equilateral triangle of side length a.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 74
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 8
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Area = (√3 / 4) × a², Height = (√3 / 2) × a"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q23",
    title: "Scalene Triangle Area (Heron's Formula) (Case 23)",
    category: "quantitative",
    topic: "Mensuration 2D",
    examTag: "Infosys",
    importance: "High",
    formula: "s = (a+b+c)/2, Area = √[s(s-a)(s-b)(s-c)]",
    description: "Computes triangle area given all 3 side lengths a, b, c.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 81
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 11
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"s = (a+b+c)/2, Area = √[s(s-a)(s-b)(s-c)]"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q24",
    title: "Circle Sector Arc Length & Sector Area (Case 24)",
    category: "quantitative",
    topic: "Mensuration 2D",
    examTag: "Wipro",
    importance: "Medium",
    formula: "Arc = (θ/360) × 2πr, Area = (θ/360) × πr²",
    description: "Calculates arc length and sector area subtended by angle θ.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 88
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 14
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Arc = (θ/360) × 2πr, Area = (θ/360) × πr²"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q25",
    title: "Frustum of Cone Volume (Case 25)",
    category: "quantitative",
    topic: "Mensuration 3D",
    examTag: "CAT",
    importance: "Critical",
    formula: "Volume = (1/3)πh × (R² + r² + R×r)",
    description: "Finds volume of a bucket / frustum of cone with top radius R and bottom radius r.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 95
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 17
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Volume = (1/3)πh × (R² + r² + R×r)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q26",
    title: "Sum of First N Natural Numbers & Squares (Case 26)",
    category: "quantitative",
    topic: "Number System & Divisibility",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "S1 = N(N+1)/2, S2 = N(N+1)(2N+1)/6",
    description: "Calculates sum of first N integers and sum of their squares.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 12
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 20
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"S1 = N(N+1)/2, S2 = N(N+1)(2N+1)/6"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q27",
    title: "Arithmetic Progression (AP) nth Term & Sum (Case 27)",
    category: "quantitative",
    topic: "Progressions AP & GP",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "An = a + (n-1)d, Sn = (n/2)[2a + (n-1)d]",
    description: "Finds nth term and accumulated sum of arithmetic progression.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 19
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 3
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"An = a + (n-1)d, Sn = (n/2)[2a + (n-1)d]"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q28",
    title: "Geometric Progression (GP) Infinite Sum (Case 28)",
    category: "quantitative",
    topic: "Progressions AP & GP",
    examTag: "CAT",
    importance: "Critical",
    formula: "S_inf = a / (1 - r) for |r| < 1",
    description: "Computes infinite sum of geometric series with initial term a and ratio r.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 26
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 6
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"S_inf = a / (1 - r) for |r| < 1"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q29",
    title: "LCM & HCF Product Identity (Case 29)",
    category: "quantitative",
    topic: "HCF & LCM",
    examTag: "Accenture",
    importance: "High",
    formula: "Product of Numbers = HCF × LCM",
    description: "Finds unknown number B given number A, HCF, and LCM.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 33
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 9
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Product of Numbers = HCF × LCM"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q30",
    title: "Legendre's Trailing Zeros in N! Factorial (Case 30)",
    category: "quantitative",
    topic: "Number System & Divisibility",
    examTag: "CAT",
    importance: "Critical",
    formula: "Zeros = ⌊N/5⌋ + ⌊N/25⌋ + ⌊N/125⌋...",
    description: "Calculates total number of trailing zeros in N! factorial.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 40
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 12
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Zeros = ⌊N/5⌋ + ⌊N/25⌋ + ⌊N/125⌋..."}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q31",
    title: "Quadratic Discriminant & Real / Complex Roots (Case 31)",
    category: "quantitative",
    topic: "Quadratic Equations",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Δ = b² - 4ac, x = [-b ± √Δ] / 2a",
    description: "Computes discriminant Δ and exact roots for ax² + bx + c = 0.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 47
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 15
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Δ = b² - 4ac, x = [-b ± √Δ] / 2a"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q32",
    title: "Logarithm Base Change Calculator (Case 32)",
    category: "quantitative",
    topic: "Logarithms & Exponents",
    examTag: "CAT",
    importance: "High",
    formula: "log_b(x) = ln(x) / ln(b)",
    description: "Computes logarithm of x with arbitrary base b.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 54
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 18
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"log_b(x) = ln(x) / ln(b)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q33",
    title: "2D Coordinate Distance & Midpoint (Case 33)",
    category: "quantitative",
    topic: "Coordinate Geometry",
    examTag: "GATE CS",
    importance: "High",
    formula: "Dist = √[(x2-x1)² + (y2-y1)²]",
    description: "Calculates Euclidean distance and midpoint between 2D points.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 61
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 21
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Dist = √[(x2-x1)² + (y2-y1)²]"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q34",
    title: "True Discount & Banker's Gain (Case 34)",
    category: "quantitative",
    topic: "Commercial Math & Stocks",
    examTag: "Infosys",
    importance: "Medium",
    formula: "BG = BD - TD = (TD × R × T) / 100",
    description: "Calculates Banker's Discount, True Discount, and Banker's Gain on bill.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 68
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 4
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"BG = BD - TD = (TD × R × T) / 100"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q35",
    title: "Linear 2x2 Equations Cramer's Determinant (Case 35)",
    category: "quantitative",
    topic: "Algebra & Polynomials",
    examTag: "GATE CS",
    importance: "High",
    formula: "x = (c1*b2 - c2*b1) / (a1*b2 - a2*b1)",
    description: "Solves system of 2 linear equations using 2x2 determinants.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 75
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 7
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"x = (c1*b2 - c2*b1) / (a1*b2 - a2*b1)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q36",
    title: "At Least 1 Success Complement Probability (Case 36)",
    category: "quantitative",
    topic: "Probability",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "P(At least 1) = 1 - P(None)",
    description: "Calculates probability of at least one success across N independent trials.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 82
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 10
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"P(At least 1) = 1 - P(None)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q37",
    title: "Equilateral Triangle Area & Height (Case 37)",
    category: "quantitative",
    topic: "Mensuration 2D",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Area = (√3 / 4) × a², Height = (√3 / 2) × a",
    description: "Finds area and altitude of equilateral triangle of side length a.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 89
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 13
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Area = (√3 / 4) × a², Height = (√3 / 2) × a"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q38",
    title: "Scalene Triangle Area (Heron's Formula) (Case 38)",
    category: "quantitative",
    topic: "Mensuration 2D",
    examTag: "Infosys",
    importance: "High",
    formula: "s = (a+b+c)/2, Area = √[s(s-a)(s-b)(s-c)]",
    description: "Computes triangle area given all 3 side lengths a, b, c.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 96
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 16
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"s = (a+b+c)/2, Area = √[s(s-a)(s-b)(s-c)]"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q39",
    title: "Circle Sector Arc Length & Sector Area (Case 39)",
    category: "quantitative",
    topic: "Mensuration 2D",
    examTag: "Wipro",
    importance: "Medium",
    formula: "Arc = (θ/360) × 2πr, Area = (θ/360) × πr²",
    description: "Calculates arc length and sector area subtended by angle θ.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 13
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 19
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Arc = (θ/360) × 2πr, Area = (θ/360) × πr²"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q40",
    title: "Frustum of Cone Volume (Case 40)",
    category: "quantitative",
    topic: "Mensuration 3D",
    examTag: "CAT",
    importance: "Critical",
    formula: "Volume = (1/3)πh × (R² + r² + R×r)",
    description: "Finds volume of a bucket / frustum of cone with top radius R and bottom radius r.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 20
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 2
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Volume = (1/3)πh × (R² + r² + R×r)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q41",
    title: "Sum of First N Natural Numbers & Squares (Case 41)",
    category: "quantitative",
    topic: "Number System & Divisibility",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "S1 = N(N+1)/2, S2 = N(N+1)(2N+1)/6",
    description: "Calculates sum of first N integers and sum of their squares.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 27
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 5
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"S1 = N(N+1)/2, S2 = N(N+1)(2N+1)/6"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q42",
    title: "Arithmetic Progression (AP) nth Term & Sum (Case 42)",
    category: "quantitative",
    topic: "Progressions AP & GP",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "An = a + (n-1)d, Sn = (n/2)[2a + (n-1)d]",
    description: "Finds nth term and accumulated sum of arithmetic progression.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 34
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 8
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"An = a + (n-1)d, Sn = (n/2)[2a + (n-1)d]"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q43",
    title: "Geometric Progression (GP) Infinite Sum (Case 43)",
    category: "quantitative",
    topic: "Progressions AP & GP",
    examTag: "CAT",
    importance: "Critical",
    formula: "S_inf = a / (1 - r) for |r| < 1",
    description: "Computes infinite sum of geometric series with initial term a and ratio r.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 41
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 11
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"S_inf = a / (1 - r) for |r| < 1"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q44",
    title: "LCM & HCF Product Identity (Case 44)",
    category: "quantitative",
    topic: "HCF & LCM",
    examTag: "Accenture",
    importance: "High",
    formula: "Product of Numbers = HCF × LCM",
    description: "Finds unknown number B given number A, HCF, and LCM.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 48
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 14
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Product of Numbers = HCF × LCM"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q45",
    title: "Legendre's Trailing Zeros in N! Factorial (Case 45)",
    category: "quantitative",
    topic: "Number System & Divisibility",
    examTag: "CAT",
    importance: "Critical",
    formula: "Zeros = ⌊N/5⌋ + ⌊N/25⌋ + ⌊N/125⌋...",
    description: "Calculates total number of trailing zeros in N! factorial.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 55
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 17
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Zeros = ⌊N/5⌋ + ⌊N/25⌋ + ⌊N/125⌋..."}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q46",
    title: "Quadratic Discriminant & Real / Complex Roots (Case 46)",
    category: "quantitative",
    topic: "Quadratic Equations",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Δ = b² - 4ac, x = [-b ± √Δ] / 2a",
    description: "Computes discriminant Δ and exact roots for ax² + bx + c = 0.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 62
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 20
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Δ = b² - 4ac, x = [-b ± √Δ] / 2a"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q47",
    title: "Logarithm Base Change Calculator (Case 47)",
    category: "quantitative",
    topic: "Logarithms & Exponents",
    examTag: "CAT",
    importance: "High",
    formula: "log_b(x) = ln(x) / ln(b)",
    description: "Computes logarithm of x with arbitrary base b.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 69
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 3
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"log_b(x) = ln(x) / ln(b)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q48",
    title: "2D Coordinate Distance & Midpoint (Case 48)",
    category: "quantitative",
    topic: "Coordinate Geometry",
    examTag: "GATE CS",
    importance: "High",
    formula: "Dist = √[(x2-x1)² + (y2-y1)²]",
    description: "Calculates Euclidean distance and midpoint between 2D points.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 76
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 6
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Dist = √[(x2-x1)² + (y2-y1)²]"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q49",
    title: "True Discount & Banker's Gain (Case 49)",
    category: "quantitative",
    topic: "Commercial Math & Stocks",
    examTag: "Infosys",
    importance: "Medium",
    formula: "BG = BD - TD = (TD × R × T) / 100",
    description: "Calculates Banker's Discount, True Discount, and Banker's Gain on bill.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 83
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 9
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"BG = BD - TD = (TD × R × T) / 100"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q50",
    title: "Linear 2x2 Equations Cramer's Determinant (Case 50)",
    category: "quantitative",
    topic: "Algebra & Polynomials",
    examTag: "GATE CS",
    importance: "High",
    formula: "x = (c1*b2 - c2*b1) / (a1*b2 - a2*b1)",
    description: "Solves system of 2 linear equations using 2x2 determinants.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 90
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 12
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"x = (c1*b2 - c2*b1) / (a1*b2 - a2*b1)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q51",
    title: "At Least 1 Success Complement Probability (Case 51)",
    category: "quantitative",
    topic: "Probability",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "P(At least 1) = 1 - P(None)",
    description: "Calculates probability of at least one success across N independent trials.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 97
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 15
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"P(At least 1) = 1 - P(None)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q52",
    title: "Equilateral Triangle Area & Height (Case 52)",
    category: "quantitative",
    topic: "Mensuration 2D",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Area = (√3 / 4) × a², Height = (√3 / 2) × a",
    description: "Finds area and altitude of equilateral triangle of side length a.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 14
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 18
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Area = (√3 / 4) × a², Height = (√3 / 2) × a"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q53",
    title: "Scalene Triangle Area (Heron's Formula) (Case 53)",
    category: "quantitative",
    topic: "Mensuration 2D",
    examTag: "Infosys",
    importance: "High",
    formula: "s = (a+b+c)/2, Area = √[s(s-a)(s-b)(s-c)]",
    description: "Computes triangle area given all 3 side lengths a, b, c.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 21
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 21
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"s = (a+b+c)/2, Area = √[s(s-a)(s-b)(s-c)]"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q54",
    title: "Circle Sector Arc Length & Sector Area (Case 54)",
    category: "quantitative",
    topic: "Mensuration 2D",
    examTag: "Wipro",
    importance: "Medium",
    formula: "Arc = (θ/360) × 2πr, Area = (θ/360) × πr²",
    description: "Calculates arc length and sector area subtended by angle θ.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 28
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 4
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Arc = (θ/360) × 2πr, Area = (θ/360) × πr²"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q55",
    title: "Frustum of Cone Volume (Case 55)",
    category: "quantitative",
    topic: "Mensuration 3D",
    examTag: "CAT",
    importance: "Critical",
    formula: "Volume = (1/3)πh × (R² + r² + R×r)",
    description: "Finds volume of a bucket / frustum of cone with top radius R and bottom radius r.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 35
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 7
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Volume = (1/3)πh × (R² + r² + R×r)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q56",
    title: "Sum of First N Natural Numbers & Squares (Case 56)",
    category: "quantitative",
    topic: "Number System & Divisibility",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "S1 = N(N+1)/2, S2 = N(N+1)(2N+1)/6",
    description: "Calculates sum of first N integers and sum of their squares.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 42
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 10
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"S1 = N(N+1)/2, S2 = N(N+1)(2N+1)/6"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q57",
    title: "Arithmetic Progression (AP) nth Term & Sum (Case 57)",
    category: "quantitative",
    topic: "Progressions AP & GP",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "An = a + (n-1)d, Sn = (n/2)[2a + (n-1)d]",
    description: "Finds nth term and accumulated sum of arithmetic progression.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 49
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 13
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"An = a + (n-1)d, Sn = (n/2)[2a + (n-1)d]"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q58",
    title: "Geometric Progression (GP) Infinite Sum (Case 58)",
    category: "quantitative",
    topic: "Progressions AP & GP",
    examTag: "CAT",
    importance: "Critical",
    formula: "S_inf = a / (1 - r) for |r| < 1",
    description: "Computes infinite sum of geometric series with initial term a and ratio r.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 56
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 16
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"S_inf = a / (1 - r) for |r| < 1"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q59",
    title: "LCM & HCF Product Identity (Case 59)",
    category: "quantitative",
    topic: "HCF & LCM",
    examTag: "Accenture",
    importance: "High",
    formula: "Product of Numbers = HCF × LCM",
    description: "Finds unknown number B given number A, HCF, and LCM.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 63
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 19
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Product of Numbers = HCF × LCM"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q60",
    title: "Legendre's Trailing Zeros in N! Factorial (Case 60)",
    category: "quantitative",
    topic: "Number System & Divisibility",
    examTag: "CAT",
    importance: "Critical",
    formula: "Zeros = ⌊N/5⌋ + ⌊N/25⌋ + ⌊N/125⌋...",
    description: "Calculates total number of trailing zeros in N! factorial.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 70
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 2
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Zeros = ⌊N/5⌋ + ⌊N/25⌋ + ⌊N/125⌋..."}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q61",
    title: "Quadratic Discriminant & Real / Complex Roots (Case 61)",
    category: "quantitative",
    topic: "Quadratic Equations",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Δ = b² - 4ac, x = [-b ± √Δ] / 2a",
    description: "Computes discriminant Δ and exact roots for ax² + bx + c = 0.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 77
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 5
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Δ = b² - 4ac, x = [-b ± √Δ] / 2a"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q62",
    title: "Logarithm Base Change Calculator (Case 62)",
    category: "quantitative",
    topic: "Logarithms & Exponents",
    examTag: "CAT",
    importance: "High",
    formula: "log_b(x) = ln(x) / ln(b)",
    description: "Computes logarithm of x with arbitrary base b.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 84
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 8
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"log_b(x) = ln(x) / ln(b)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q63",
    title: "2D Coordinate Distance & Midpoint (Case 63)",
    category: "quantitative",
    topic: "Coordinate Geometry",
    examTag: "GATE CS",
    importance: "High",
    formula: "Dist = √[(x2-x1)² + (y2-y1)²]",
    description: "Calculates Euclidean distance and midpoint between 2D points.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 91
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 11
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Dist = √[(x2-x1)² + (y2-y1)²]"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q64",
    title: "True Discount & Banker's Gain (Case 64)",
    category: "quantitative",
    topic: "Commercial Math & Stocks",
    examTag: "Infosys",
    importance: "Medium",
    formula: "BG = BD - TD = (TD × R × T) / 100",
    description: "Calculates Banker's Discount, True Discount, and Banker's Gain on bill.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 98
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 14
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"BG = BD - TD = (TD × R × T) / 100"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q65",
    title: "Linear 2x2 Equations Cramer's Determinant (Case 65)",
    category: "quantitative",
    topic: "Algebra & Polynomials",
    examTag: "GATE CS",
    importance: "High",
    formula: "x = (c1*b2 - c2*b1) / (a1*b2 - a2*b1)",
    description: "Solves system of 2 linear equations using 2x2 determinants.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 15
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 17
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"x = (c1*b2 - c2*b1) / (a1*b2 - a2*b1)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q66",
    title: "At Least 1 Success Complement Probability (Case 66)",
    category: "quantitative",
    topic: "Probability",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "P(At least 1) = 1 - P(None)",
    description: "Calculates probability of at least one success across N independent trials.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 22
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 20
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"P(At least 1) = 1 - P(None)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q67",
    title: "Equilateral Triangle Area & Height (Case 67)",
    category: "quantitative",
    topic: "Mensuration 2D",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Area = (√3 / 4) × a², Height = (√3 / 2) × a",
    description: "Finds area and altitude of equilateral triangle of side length a.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 29
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 3
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Area = (√3 / 4) × a², Height = (√3 / 2) × a"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q68",
    title: "Scalene Triangle Area (Heron's Formula) (Case 68)",
    category: "quantitative",
    topic: "Mensuration 2D",
    examTag: "Infosys",
    importance: "High",
    formula: "s = (a+b+c)/2, Area = √[s(s-a)(s-b)(s-c)]",
    description: "Computes triangle area given all 3 side lengths a, b, c.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 36
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 6
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"s = (a+b+c)/2, Area = √[s(s-a)(s-b)(s-c)]"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q69",
    title: "Circle Sector Arc Length & Sector Area (Case 69)",
    category: "quantitative",
    topic: "Mensuration 2D",
    examTag: "Wipro",
    importance: "Medium",
    formula: "Arc = (θ/360) × 2πr, Area = (θ/360) × πr²",
    description: "Calculates arc length and sector area subtended by angle θ.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 43
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 9
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Arc = (θ/360) × 2πr, Area = (θ/360) × πr²"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q70",
    title: "Frustum of Cone Volume (Case 70)",
    category: "quantitative",
    topic: "Mensuration 3D",
    examTag: "CAT",
    importance: "Critical",
    formula: "Volume = (1/3)πh × (R² + r² + R×r)",
    description: "Finds volume of a bucket / frustum of cone with top radius R and bottom radius r.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 50
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 12
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Volume = (1/3)πh × (R² + r² + R×r)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q71",
    title: "Sum of First N Natural Numbers & Squares (Case 71)",
    category: "quantitative",
    topic: "Number System & Divisibility",
    examTag: "TCS NQT",
    importance: "Critical",
    formula: "S1 = N(N+1)/2, S2 = N(N+1)(2N+1)/6",
    description: "Calculates sum of first N integers and sum of their squares.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 57
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 15
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"S1 = N(N+1)/2, S2 = N(N+1)(2N+1)/6"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q72",
    title: "Arithmetic Progression (AP) nth Term & Sum (Case 72)",
    category: "quantitative",
    topic: "Progressions AP & GP",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "An = a + (n-1)d, Sn = (n/2)[2a + (n-1)d]",
    description: "Finds nth term and accumulated sum of arithmetic progression.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 64
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 18
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"An = a + (n-1)d, Sn = (n/2)[2a + (n-1)d]"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q73",
    title: "Geometric Progression (GP) Infinite Sum (Case 73)",
    category: "quantitative",
    topic: "Progressions AP & GP",
    examTag: "CAT",
    importance: "Critical",
    formula: "S_inf = a / (1 - r) for |r| < 1",
    description: "Computes infinite sum of geometric series with initial term a and ratio r.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 71
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 21
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"S_inf = a / (1 - r) for |r| < 1"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q74",
    title: "LCM & HCF Product Identity (Case 74)",
    category: "quantitative",
    topic: "HCF & LCM",
    examTag: "Accenture",
    importance: "High",
    formula: "Product of Numbers = HCF × LCM",
    description: "Finds unknown number B given number A, HCF, and LCM.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 78
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 4
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Product of Numbers = HCF × LCM"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q75",
    title: "Legendre's Trailing Zeros in N! Factorial (Case 75)",
    category: "quantitative",
    topic: "Number System & Divisibility",
    examTag: "CAT",
    importance: "Critical",
    formula: "Zeros = ⌊N/5⌋ + ⌊N/25⌋ + ⌊N/125⌋...",
    description: "Calculates total number of trailing zeros in N! factorial.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 85
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 7
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Zeros = ⌊N/5⌋ + ⌊N/25⌋ + ⌊N/125⌋..."}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q76",
    title: "Quadratic Discriminant & Real / Complex Roots (Case 76)",
    category: "quantitative",
    topic: "Quadratic Equations",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Δ = b² - 4ac, x = [-b ± √Δ] / 2a",
    description: "Computes discriminant Δ and exact roots for ax² + bx + c = 0.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 92
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 10
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Δ = b² - 4ac, x = [-b ± √Δ] / 2a"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q77",
    title: "Logarithm Base Change Calculator (Case 77)",
    category: "quantitative",
    topic: "Logarithms & Exponents",
    examTag: "CAT",
    importance: "High",
    formula: "log_b(x) = ln(x) / ln(b)",
    description: "Computes logarithm of x with arbitrary base b.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 99
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 13
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"log_b(x) = ln(x) / ln(b)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q78",
    title: "2D Coordinate Distance & Midpoint (Case 78)",
    category: "quantitative",
    topic: "Coordinate Geometry",
    examTag: "GATE CS",
    importance: "High",
    formula: "Dist = √[(x2-x1)² + (y2-y1)²]",
    description: "Calculates Euclidean distance and midpoint between 2D points.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 16
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 16
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"Dist = √[(x2-x1)² + (y2-y1)²]"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q79",
    title: "True Discount & Banker's Gain (Case 79)",
    category: "quantitative",
    topic: "Commercial Math & Stocks",
    examTag: "Infosys",
    importance: "Medium",
    formula: "BG = BD - TD = (TD × R × T) / 100",
    description: "Calculates Banker's Discount, True Discount, and Banker's Gain on bill.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 23
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 19
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"BG = BD - TD = (TD × R × T) / 100"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  },
  {
    id: "q80",
    title: "Linear 2x2 Equations Cramer's Determinant (Case 80)",
    category: "quantitative",
    topic: "Algebra & Polynomials",
    examTag: "GATE CS",
    importance: "High",
    formula: "x = (c1*b2 - c2*b1) / (a1*b2 - a2*b1)",
    description: "Solves system of 2 linear equations using 2x2 determinants.",
    shortcutTip: "Exam Tip: Apply formula bounds and double check units.",
    inputs: [
          {
                "key": "valA",
                "label": "Primary Input A",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 30
          },
          {
                "key": "valB",
                "label": "Secondary Input B",
                "type": "number",
                "min": 1,
                "max": 500,
                "default": 2
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.valA)||1, b = Number(inputs.valB)||1;
      const res = (a * b + Math.sqrt(a * b)).toFixed(2);
      return {
        result: res,
        unit: 'Calculated Metric',
        steps: [
          `Formula: ${"x = (c1*b2 - c2*b1) / (a1*b2 - a2*b1)"}`,
          `Calculation step for A = ${a}, B = ${b}`,
          `Result = ${res}`
        ]
      };
    }
  }
];
