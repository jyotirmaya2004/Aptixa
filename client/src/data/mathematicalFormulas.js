// Auto-generated 200 Mathematical Formulas Database
export const MATHEMATICAL_FORMULAS = [
  {
    "topic": "Number System",
    "cat": "quantitative",
    "title": "Sum of First n Natural Numbers",
    "formula": "S_n = [n(n + 1)] / 2",
    "desc": "Calculates the sum of consecutive integers from 1 to n.",
    "shortcut": "Multiply n by (n+1) and halve the result.",
    "svg": "series",
    "id": "f_1"
  },
  {
    "topic": "Number System",
    "cat": "quantitative",
    "title": "Sum of Squares of First n Natural Numbers",
    "formula": "S_n² = [n(n + 1)(2n + 1)] / 6",
    "desc": "Sum of 1² + 2² + 3² + ... + n².",
    "shortcut": "For n=10: (10 × 11 × 21) / 6 = 385.",
    "svg": "series",
    "id": "f_2"
  },
  {
    "topic": "Number System",
    "cat": "quantitative",
    "title": "Sum of Cubes of First n Natural Numbers",
    "formula": "S_n³ = [n(n + 1) / 2]²",
    "desc": "Sum of 1³ + 2³ + ... + n³ is the square of the sum of first n numbers.",
    "shortcut": "Calculate sum of first n numbers then square it.",
    "svg": "series",
    "id": "f_3"
  },
  {
    "topic": "Number System",
    "cat": "quantitative",
    "title": "HCF & LCM Relation",
    "formula": "Product of Two Numbers = HCF × LCM",
    "desc": "For any two positive integers a and b, a × b = HCF(a,b) × LCM(a,b).",
    "shortcut": "LCM = (a × b) / HCF.",
    "svg": "hcf_lcm",
    "id": "f_4"
  },
  {
    "topic": "Number System",
    "cat": "quantitative",
    "title": "HCF and LCM of Fractions",
    "formula": "HCF = HCF(Num) / LCM(Denom) | LCM = LCM(Num) / HCF(Denom)",
    "desc": "Used for fractional values a/b, c/d.",
    "shortcut": "Always simplify fractions to lowest terms first.",
    "svg": "hcf_lcm",
    "id": "f_5"
  },
  {
    "topic": "Number System",
    "cat": "quantitative",
    "title": "Sum of First n Even Numbers",
    "formula": "S_even = n(n + 1)",
    "desc": "Sum of 2 + 4 + 6 + ... + 2n.",
    "shortcut": "Simply n × (n + 1).",
    "svg": "series",
    "id": "f_6"
  },
  {
    "topic": "Number System",
    "cat": "quantitative",
    "title": "Sum of First n Odd Numbers",
    "formula": "S_odd = n²",
    "desc": "Sum of 1 + 3 + 5 + ... + (2n - 1).",
    "shortcut": "If there are 15 odd numbers, sum is 15² = 225.",
    "svg": "series",
    "id": "f_7"
  },
  {
    "topic": "Number System",
    "cat": "quantitative",
    "title": "Divisibility Rule by 11",
    "formula": "|Sum(Odd Pos) - Sum(Even Pos)| = 0 or ÷ 11",
    "desc": "A number is divisible by 11 if difference of alternating digit sums is 0 or multiple of 11.",
    "shortcut": "Alternate addition and subtraction across digits.",
    "svg": "math_logic",
    "id": "f_8"
  },
  {
    "topic": "Number System",
    "cat": "quantitative",
    "title": "Number of Factors of N",
    "formula": "N = p^a × q^b × r^c → Total Factors = (a+1)(b+1)(c+1)",
    "desc": "Where p, q, r are prime factors of N.",
    "shortcut": "Prime factorize N, add 1 to each exponent, and multiply.",
    "svg": "math_logic",
    "id": "f_9"
  },
  {
    "topic": "Number System",
    "cat": "quantitative",
    "title": "Sum of All Factors of N",
    "formula": "Sum = [(p^(a+1)-1)/(p-1)] × [(q^(b+1)-1)/(q-1)]",
    "desc": "Sum of divisors of N expressed in prime factorization.",
    "shortcut": "Use geometric series formula for each prime power.",
    "svg": "math_logic",
    "id": "f_10"
  },
  {
    "topic": "Number System",
    "cat": "quantitative",
    "title": "Remainder Theorem (Euler Totient)",
    "formula": "a^Φ(n) ≡ 1 (mod n) when gcd(a,n)=1",
    "desc": "Euler's totient theorem for modular exponentiation.",
    "shortcut": "Reduces large powers when finding remainders.",
    "svg": "math_logic",
    "id": "f_11"
  },
  {
    "topic": "Number System",
    "cat": "quantitative",
    "title": "Wilson's Theorem",
    "formula": "(p - 1)! ≡ -1 (mod p) for prime p",
    "desc": "Used for prime testing and factorial remainders.",
    "shortcut": "(p-1)! + 1 is divisible by p if and only if p is prime.",
    "svg": "math_logic",
    "id": "f_12"
  },
  {
    "topic": "Number System",
    "cat": "quantitative",
    "title": "Unit Digit of Cyclicity 4",
    "formula": "Base digits 2, 3, 7, 8 repeat unit digits every 4 powers",
    "desc": "Divide power by 4, remainder gives the effective power exponent.",
    "shortcut": "Power mod 4 = 0 implies 4th power unit digit.",
    "svg": "math_logic",
    "id": "f_13"
  },
  {
    "topic": "Number System",
    "cat": "quantitative",
    "title": "Surds Laws of Indices",
    "formula": "a^m × a^n = a^(m+n) | (a^m)^n = a^(m×n)",
    "desc": "Fundamental exponential simplification rules.",
    "shortcut": "a^0 = 1, a^-n = 1 / a^n.",
    "svg": "algebra",
    "id": "f_14"
  },
  {
    "topic": "Number System",
    "cat": "quantitative",
    "title": "Rationalization of Surds",
    "formula": "1 / (√a + √b) = (√a - √b) / (a - b)",
    "desc": "Multiply numerator and denominator by conjugate pair.",
    "shortcut": "Eliminates irrational terms from denominator.",
    "svg": "algebra",
    "id": "f_15"
  },
  {
    "topic": "Percentages & Profit",
    "cat": "quantitative",
    "title": "Percentage Change Formula",
    "formula": "% Change = [(New - Old) / Old] × 100",
    "desc": "Measures relative increase or decrease.",
    "shortcut": "Always divide difference by ORIGINAL (initial) value.",
    "svg": "percentage",
    "id": "f_16"
  },
  {
    "topic": "Percentages & Profit",
    "cat": "quantitative",
    "title": "Successive Percentage Change",
    "formula": "Net % = A + B + (A × B / 100)",
    "desc": "Combined effect of two consecutive percentage changes A% and B%.",
    "shortcut": "If increase then decrease, use positive for A and negative for B.",
    "svg": "percentage",
    "id": "f_17"
  },
  {
    "topic": "Percentages & Profit",
    "cat": "quantitative",
    "title": "Profit Percentage",
    "formula": "Profit % = (Profit / CP) × 100",
    "desc": "Profit = Selling Price (SP) - Cost Price (CP).",
    "shortcut": "Calculated relative to Cost Price.",
    "svg": "profit",
    "id": "f_18"
  },
  {
    "topic": "Percentages & Profit",
    "cat": "quantitative",
    "title": "Loss Percentage",
    "formula": "Loss % = (Loss / CP) × 100",
    "desc": "Loss = Cost Price (CP) - Selling Price (SP).",
    "shortcut": "SP = CP × (100 - Loss%) / 100.",
    "svg": "profit",
    "id": "f_19"
  },
  {
    "topic": "Percentages & Profit",
    "cat": "quantitative",
    "title": "Selling Price from Cost & Profit%",
    "formula": "SP = CP × [(100 + Profit %) / 100]",
    "desc": "Direct formula to compute SP when profit percentage is known.",
    "shortcut": "For 20% profit, SP = 1.2 × CP.",
    "svg": "profit",
    "id": "f_20"
  },
  {
    "topic": "Percentages & Profit",
    "cat": "quantitative",
    "title": "Marked Price & Discount",
    "formula": "Discount = MP - SP | Discount % = (Discount / MP) × 100",
    "desc": "Discount is always calculated on Marked Price (MP).",
    "shortcut": "SP = MP × (100 - Discount %) / 100.",
    "svg": "profit",
    "id": "f_21"
  },
  {
    "topic": "Percentages & Profit",
    "cat": "quantitative",
    "title": "Relation Between CP and MP",
    "formula": "MP / CP = (100 + Profit %) / (100 - Discount %)",
    "desc": "Direct relationship connecting CP, MP, Profit% and Discount%.",
    "shortcut": "Super useful for quick ratio calculation.",
    "svg": "profit",
    "id": "f_22"
  },
  {
    "topic": "Percentages & Profit",
    "cat": "quantitative",
    "title": "False Weight Trader Gain%",
    "formula": "Gain % = [ Error / (True Value - Error) ] × 100",
    "desc": "When a trader uses false weight instead of true weight.",
    "shortcut": "Gain % = [ (True Weight - False Weight) / False Weight ] × 100.",
    "svg": "profit",
    "id": "f_23"
  },
  {
    "topic": "Percentages & Profit",
    "cat": "quantitative",
    "title": "Two Items Sold at Same Price (x% profit, x% loss)",
    "formula": "Net Result = Always Loss = (x / 10)²",
    "desc": "When two items are sold at same SP, one at x% profit and other at x% loss.",
    "shortcut": "Overall transaction always results in a loss of x²/100 %.",
    "svg": "profit",
    "id": "f_24"
  },
  {
    "topic": "Percentages & Profit",
    "cat": "quantitative",
    "title": "Buy X Get Y Free Discount%",
    "formula": "Discount % = [ Y / (X + Y) ] × 100",
    "desc": "Effective discount percentage for buy X get Y free schemes.",
    "shortcut": "Buy 3 Get 1 Free = 1/4 = 25% discount.",
    "svg": "percentage",
    "id": "f_25"
  },
  {
    "topic": "Percentages & Profit",
    "cat": "quantitative",
    "title": "Consumption Adjustment for Price Rise",
    "formula": "% Reduction in Consumption = [ x / (100 + x) ] × 100",
    "desc": "When price increases by x%, reduction needed to keep expenditure constant.",
    "shortcut": "If price rises by 25%, consumption drops by 25/125 = 20%.",
    "svg": "percentage",
    "id": "f_26"
  },
  {
    "topic": "Percentages & Profit",
    "cat": "quantitative",
    "title": "Population Growth Formula",
    "formula": "P_future = P_present × (1 + R/100)^n",
    "desc": "Calculates future population compounded over n periods.",
    "shortcut": "Same as compound interest formula.",
    "svg": "chart_line",
    "id": "f_27"
  },
  {
    "topic": "Percentages & Profit",
    "cat": "quantitative",
    "title": "Depreciation Formula",
    "formula": "V_future = V_present × (1 - R/100)^n",
    "desc": "Calculates depreciated value of machinery/asset.",
    "shortcut": "Negative rate applied compounded.",
    "svg": "chart_line",
    "id": "f_28"
  },
  {
    "topic": "Percentages & Profit",
    "cat": "quantitative",
    "title": "Margin vs Markup Percentage",
    "formula": "Markup % = Profit / CP | Margin % = Profit / SP",
    "desc": "Margin is on SP, Markup is on CP.",
    "shortcut": "Margin % = Markup % / (1 + Markup %).",
    "svg": "profit",
    "id": "f_29"
  },
  {
    "topic": "Percentages & Profit",
    "cat": "quantitative",
    "title": "Break-Even Point (Units)",
    "formula": "BEP = Fixed Costs / (SP per unit - Variable Cost per unit)",
    "desc": "Point where total revenue equals total costs.",
    "shortcut": "Contribution Margin = SP - Variable Cost.",
    "svg": "profit",
    "id": "f_30"
  },
  {
    "topic": "Speed, Time & Distance",
    "cat": "quantitative",
    "title": "Speed Distance Time Core Rule",
    "formula": "Speed = Distance / Time | D = S × T",
    "desc": "Fundamental relationship of uniform motion.",
    "shortcut": "D is directly proportional to S when T is constant.",
    "svg": "speed",
    "id": "f_31"
  },
  {
    "topic": "Speed, Time & Distance",
    "cat": "quantitative",
    "title": "Unit Conversion m/s and km/h",
    "formula": "1 km/h = 5/18 m/s | 1 m/s = 18/5 km/h",
    "desc": "Conversion factor between metric speed units.",
    "shortcut": "72 km/h = 72 × 5/18 = 20 m/s.",
    "svg": "speed",
    "id": "f_32"
  },
  {
    "topic": "Speed, Time & Distance",
    "cat": "quantitative",
    "title": "Average Speed (Equal Distances)",
    "formula": "Avg Speed = (2 × S1 × S2) / (S1 + S2)",
    "desc": "Harmonic mean of two speeds for equal distances.",
    "shortcut": "Do NOT use simple average (S1+S2)/2!",
    "svg": "speed",
    "id": "f_33"
  },
  {
    "topic": "Speed, Time & Distance",
    "cat": "quantitative",
    "title": "Average Speed (3 Equal Distances)",
    "formula": "Avg Speed = (3 × S1 × S2 × S3) / (S1S2 + S2S3 + S3S1)",
    "desc": "Harmonic mean for three equal distance segments.",
    "shortcut": "Take LCM of speeds as distance to simplify.",
    "svg": "speed",
    "id": "f_34"
  },
  {
    "topic": "Speed, Time & Distance",
    "cat": "quantitative",
    "title": "Relative Speed (Opposite Direction)",
    "formula": "S_rel = S1 + S2",
    "desc": "When two objects move towards each other.",
    "shortcut": "Time to meet = Initial Distance / (S1 + S2).",
    "svg": "speed",
    "id": "f_35"
  },
  {
    "topic": "Speed, Time & Distance",
    "cat": "quantitative",
    "title": "Relative Speed (Same Direction)",
    "formula": "S_rel = |S1 - S2|",
    "desc": "When two objects move in the same direction.",
    "shortcut": "Time for faster to catch slower = Distance / |S1 - S2|.",
    "svg": "speed",
    "id": "f_36"
  },
  {
    "topic": "Speed, Time & Distance",
    "cat": "quantitative",
    "title": "Train Crossing a Stationary Point/Pole",
    "formula": "Time = Length of Train / Speed of Train",
    "desc": "Distance traveled equals the length of the train (L).",
    "shortcut": "Ensure length in meters and speed in m/s.",
    "svg": "train",
    "id": "f_37"
  },
  {
    "topic": "Speed, Time & Distance",
    "cat": "quantitative",
    "title": "Train Crossing a Platform/Bridge",
    "formula": "Time = (L_train + L_platform) / Speed of Train",
    "desc": "Total distance equals train length plus platform length.",
    "shortcut": "D = L1 + L2.",
    "svg": "train",
    "id": "f_38"
  },
  {
    "topic": "Speed, Time & Distance",
    "cat": "quantitative",
    "title": "Two Trains Crossing Each Other",
    "formula": "Time = (L1 + L2) / Relative Speed",
    "desc": "Distance is sum of lengths; speed depends on direction.",
    "shortcut": "Relative speed = S1+S2 (opp) or |S1-S2| (same).",
    "svg": "train",
    "id": "f_39"
  },
  {
    "topic": "Speed, Time & Distance",
    "cat": "quantitative",
    "title": "Boats Downstream Speed",
    "formula": "Downstream Speed (D) = B + C",
    "desc": "B = Boat speed in still water, C = Current/Stream speed.",
    "shortcut": "D is faster because current assists motion.",
    "svg": "boat",
    "id": "f_40"
  },
  {
    "topic": "Speed, Time & Distance",
    "cat": "quantitative",
    "title": "Boats Upstream Speed",
    "formula": "Upstream Speed (U) = B - C",
    "desc": "B = Boat speed in still water, C = Current speed.",
    "shortcut": "Requires B > C for upstream motion.",
    "svg": "boat",
    "id": "f_41"
  },
  {
    "topic": "Speed, Time & Distance",
    "cat": "quantitative",
    "title": "Boat & Stream Speed Recovery",
    "formula": "Boat Speed (B) = (D + U)/2 | Current (C) = (D - U)/2",
    "desc": "Recover still water boat speed and current speed from D and U.",
    "shortcut": "Average of D & U gives boat speed.",
    "svg": "boat",
    "id": "f_42"
  },
  {
    "topic": "Speed, Time & Distance",
    "cat": "quantitative",
    "title": "Circular Race First Meeting Time",
    "formula": "Time = Circumference / Relative Speed",
    "desc": "Time taken for two runners to meet for first time on circular track.",
    "shortcut": "Use S1-S2 for same dir, S1+S2 for opp dir.",
    "svg": "circle",
    "id": "f_43"
  },
  {
    "topic": "Speed, Time & Distance",
    "cat": "quantitative",
    "title": "Circular Race Meeting at Starting Point",
    "formula": "Time = LCM(T1, T2)",
    "desc": "Where T1 = L/S1 and T2 = L/S2 are individual lap times.",
    "shortcut": "Take LCM of lap completion times.",
    "svg": "circle",
    "id": "f_44"
  },
  {
    "topic": "Speed, Time & Distance",
    "cat": "quantitative",
    "title": "Escalator Steps Formula",
    "formula": "Total Steps = Time × (Person Speed ± Escalator Speed)",
    "desc": "Person walking on moving escalator.",
    "shortcut": "+ if walking in same direction, - if opposite.",
    "svg": "speed",
    "id": "f_45"
  },
  {
    "topic": "Time & Work",
    "cat": "quantitative",
    "title": "Combined Work (2 Workers)",
    "formula": "Total Time = (A × B) / (A + B)",
    "desc": "Worker A takes A days, Worker B takes B days.",
    "shortcut": "Daily work rate = 1/A + 1/B.",
    "svg": "work",
    "id": "f_46"
  },
  {
    "topic": "Time & Work",
    "cat": "quantitative",
    "title": "Combined Work (3 Workers)",
    "formula": "Total Time = (A × B × C) / (AB + BC + CA)",
    "desc": "Three workers working simultaneously.",
    "shortcut": "Take LCM of A, B, C as total work units.",
    "svg": "work",
    "id": "f_47"
  },
  {
    "topic": "Time & Work",
    "cat": "quantitative",
    "title": "Work & Efficiency Relation",
    "formula": "Work = Efficiency × Time | E ∝ 1 / Time",
    "desc": "Higher efficiency implies shorter completion time.",
    "shortcut": "Efficiency ratio is inverse of time ratio.",
    "svg": "work",
    "id": "f_48"
  },
  {
    "topic": "Time & Work",
    "cat": "quantitative",
    "title": "Man-Days Chain Rule",
    "formula": "(M1 × D1 × H1) / W1 = (M2 × D2 × H2) / W2",
    "desc": "M = Men, D = Days, H = Hours/day, W = Work done.",
    "shortcut": "Keep work done in the denominator.",
    "svg": "work",
    "id": "f_49"
  },
  {
    "topic": "Time & Work",
    "cat": "quantitative",
    "title": "Wages Division Principle",
    "formula": "Wage Ratio = Individual Efficiency Ratio",
    "desc": "Payment divided in proportion to work done by each.",
    "shortcut": "Divide total money according to total units completed.",
    "svg": "work",
    "id": "f_50"
  },
  {
    "topic": "Time & Work",
    "cat": "quantitative",
    "title": "Pipes Filling & Emptying Tank",
    "formula": "Net Rate = (1 / Inlet Time) - (1 / Outlet Time)",
    "desc": "Inlet pipe fills (+) and outlet pipe empties (-).",
    "shortcut": "If Net Rate < 0, tank will empty.",
    "svg": "work",
    "id": "f_51"
  },
  {
    "topic": "Time & Work",
    "cat": "quantitative",
    "title": "Alternate Days Work Pattern",
    "formula": "Work in 2-day Cycle = (1/A) + (1/B)",
    "desc": "When A and B work on alternate days.",
    "shortcut": "Calculate work done per 2-day cycle first.",
    "svg": "work",
    "id": "f_52"
  },
  {
    "topic": "Time & Work",
    "cat": "quantitative",
    "title": "Worker Leaves Before Completion",
    "formula": "Remaining Work = 1 - (Work done before leaving)",
    "desc": "Calculate work completed up to departure point.",
    "shortcut": "Equate sum of fractional works to 1.",
    "svg": "work",
    "id": "f_53"
  },
  {
    "topic": "Time & Work",
    "cat": "quantitative",
    "title": "Men vs Women Equivalency",
    "formula": "m Men = w Women → 1 Man = (w/m) Women",
    "desc": "Convert all workers into a single equivalent unit.",
    "shortcut": "Convert all workers to women or men units.",
    "svg": "work",
    "id": "f_54"
  },
  {
    "topic": "Time & Work",
    "cat": "quantitative",
    "title": "Leakage in Tank Formula",
    "formula": "Time to Empty = (Fill Time × Leak Time) / (Leak Time - Fill Time)",
    "desc": "Tank fills in T1 hours but takes T2 hours due to leak.",
    "shortcut": "Net leak rate = 1/T1 - 1/T2.",
    "svg": "work",
    "id": "f_55"
  },
  {
    "topic": "Time & Work",
    "cat": "quantitative",
    "title": "Partial Filling of Tank",
    "formula": "Time = Fraction Remaining / Net Rate",
    "desc": "Time to fill remaining fraction of tank.",
    "shortcut": "Fraction remaining = 1 - Fraction filled.",
    "svg": "work",
    "id": "f_56"
  },
  {
    "topic": "Time & Work",
    "cat": "quantitative",
    "title": "Efficiency Percentage Boost",
    "formula": "E_new = E_old × (1 + %Boost / 100)",
    "desc": "If worker becomes x% more efficient, new time = Old Time / (1 + x/100).",
    "shortcut": "50% boost means time becomes 2/3 of original.",
    "svg": "work",
    "id": "f_57"
  },
  {
    "topic": "Interest & Finance",
    "cat": "quantitative",
    "title": "Simple Interest Formula",
    "formula": "SI = (P × R × T) / 100",
    "desc": "P = Principal, R = Annual Rate %, T = Time in years.",
    "shortcut": "Amount A = P + SI = P(1 + RT/100).",
    "svg": "finance",
    "id": "f_58"
  },
  {
    "topic": "Interest & Finance",
    "cat": "quantitative",
    "title": "Compound Interest Amount",
    "formula": "A = P × (1 + R / 100)^n",
    "desc": "Compounded annually. CI = Amount - Principal.",
    "shortcut": "For semi-annual, use R/2 and 2n.",
    "svg": "finance",
    "id": "f_59"
  },
  {
    "topic": "Interest & Finance",
    "cat": "quantitative",
    "title": "CI Difference for 2 Years",
    "formula": "CI - SI = P × (R / 100)²",
    "desc": "Difference between CI and SI for a 2-year period.",
    "shortcut": "Directly gives P if CI-SI and R are known.",
    "svg": "finance",
    "id": "f_60"
  },
  {
    "topic": "Interest & Finance",
    "cat": "quantitative",
    "title": "CI Difference for 3 Years",
    "formula": "CI - SI = P × (R / 100)² × (3 + R / 100)",
    "desc": "Difference between CI and SI for 3-year duration.",
    "shortcut": "Equal to 2-yr diff × (3 + R/100).",
    "svg": "finance",
    "id": "f_61"
  },
  {
    "topic": "Interest & Finance",
    "cat": "quantitative",
    "title": "Compounding Frequency Variations",
    "formula": "A = P × (1 + R / (100 × m))^(m × n)",
    "desc": "m = compounding periods per year (m=2 semi, m=4 quarterly).",
    "shortcut": "Rate divides by m, time multiplies by m.",
    "svg": "finance",
    "id": "f_62"
  },
  {
    "topic": "Interest & Finance",
    "cat": "quantitative",
    "title": "Rule of 72 (Doubling Time)",
    "formula": "Years to Double ≈ 72 / R",
    "desc": "Estimates years needed to double money under CI.",
    "shortcut": "At 8% interest, money doubles in ~9 years (72/8).",
    "svg": "finance",
    "id": "f_63"
  },
  {
    "topic": "Interest & Finance",
    "cat": "quantitative",
    "title": "Equal Annual Installment (SI)",
    "formula": "Installment = (100 × A) / [100n + R × n(n-1)/2]",
    "desc": "Equal annual installment to discharge a debt A due in n years.",
    "shortcut": "Used for simple interest loan clearance.",
    "svg": "finance",
    "id": "f_64"
  },
  {
    "topic": "Interest & Finance",
    "cat": "quantitative",
    "title": "Equal Annual Installment (CI)",
    "formula": "P = [X / (1 + R/100)] + [X / (1 + R/100)²] + ...",
    "desc": "X is the equal annual EMI installment under compound interest.",
    "shortcut": "Present value sum of installments.",
    "svg": "finance",
    "id": "f_65"
  },
  {
    "topic": "Interest & Finance",
    "cat": "quantitative",
    "title": "Effective Annual Rate (EAR)",
    "formula": "EAR = (1 + R / m)^m - 1",
    "desc": "True annual yield considering m compounding periods.",
    "shortcut": "Converts nominal rate to true annual rate.",
    "svg": "finance",
    "id": "f_66"
  },
  {
    "topic": "Interest & Finance",
    "cat": "quantitative",
    "title": "True Discount & Banker Discount",
    "formula": "BG = BD - TD = (TD × R × T) / 100 = (BD)² / Amount",
    "desc": "Banker's gain BG is the interest on True Discount TD.",
    "shortcut": "BD is simple interest on face value.",
    "svg": "finance",
    "id": "f_67"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Pythagorean Theorem",
    "formula": "a² + b² = c²",
    "desc": "In a right triangle, hypotenuse c² equals sum of legs squared.",
    "shortcut": "Triplets: 3-4-5, 5-12-13, 7-24-25, 8-15-17.",
    "svg": "triangle",
    "id": "f_68"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Area of Triangle (Heron's Formula)",
    "formula": "Area = √[s(s - a)(s - b)(s - c)] | s = (a+b+c)/2",
    "desc": "Calculates area of any triangle with side lengths a, b, c.",
    "shortcut": "s is the semi-perimeter.",
    "svg": "triangle",
    "id": "f_69"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Area of Equilateral Triangle",
    "formula": "Area = (√3 / 4) × a² | Height = (√3 / 2) × a",
    "desc": "Triangle with all three equal sides of length a.",
    "shortcut": "For side=2, area = √3.",
    "svg": "triangle",
    "id": "f_70"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Circle Area & Circumference",
    "formula": "Area = πr² | Circumference = 2πr",
    "desc": "Fundamental circle measurements.",
    "shortcut": "Diameter d = 2r. Area = πd²/4.",
    "svg": "circle",
    "id": "f_71"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Area of Circle Sector",
    "formula": "Sector Area = (θ / 360) × πr² | Arc Length = (θ / 360) × 2πr",
    "desc": "θ is central angle in degrees.",
    "shortcut": "For 90° (quarter circle), area = πr²/4.",
    "svg": "circle",
    "id": "f_72"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Area of Trapezium",
    "formula": "Area = 0.5 × (a + b) × h",
    "desc": "a and b are parallel sides, h is perpendicular height.",
    "shortcut": "Average of parallel sides multiplied by height.",
    "svg": "geometry",
    "id": "f_73"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Area & Diagonal of Rhombus",
    "formula": "Area = 0.5 × d1 × d2 | Side² = (d1/2)² + (d2/2)²",
    "desc": "Rhombus with diagonals d1 and d2 intersecting at 90°.",
    "shortcut": "Diagonals bisect each other at right angles.",
    "svg": "geometry",
    "id": "f_74"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Sum of Interior Angles of Polygon",
    "formula": "Sum = (n - 2) × 180°",
    "desc": "n is the number of sides of the polygon.",
    "shortcut": "Each interior angle of regular n-gon = [(n-2)×180]/n.",
    "svg": "geometry",
    "id": "f_75"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Sum of Exterior Angles of Polygon",
    "formula": "Sum of Exterior Angles = 360°",
    "desc": "Holds true for ALL convex polygons regardless of n.",
    "shortcut": "Each exterior angle of regular n-gon = 360° / n.",
    "svg": "geometry",
    "id": "f_76"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Number of Diagonals in Polygon",
    "formula": "Diagonals = [n(n - 3)] / 2",
    "desc": "Total line segments connecting non-adjacent vertices.",
    "shortcut": "Hexagon (n=6) has 6×3/2 = 9 diagonals.",
    "svg": "geometry",
    "id": "f_77"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Cube Surface Area & Volume",
    "formula": "Volume = a³ | Total Surface Area = 6a² | Diagonal = a√3",
    "desc": "a is the edge length of the cube.",
    "shortcut": "Longest rod in cube = a√3.",
    "svg": "cube",
    "id": "f_78"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Cuboid Volume & Surface Area",
    "formula": "Vol = l×b×h | TSA = 2(lb + bh + hl) | Body Diagonal = √(l²+b²+h²)",
    "desc": "Rectangular solid box dimensions.",
    "shortcut": "Diagonal is longest rod that fits inside box.",
    "svg": "cube",
    "id": "f_79"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Right Circular Cylinder",
    "formula": "Vol = πr²h | Curved Surface = 2πrh | TSA = 2πr(r + h)",
    "desc": "r is radius of circular base, h is height.",
    "shortcut": "TSA includes top and bottom circles (2πr²).",
    "svg": "cylinder",
    "id": "f_80"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Right Circular Cone",
    "formula": "Vol = (1/3)πr²h | Slant Height l = √(r²+h²) | CSA = πrl",
    "desc": "Curved surface area CSA = πrl. Total area = πr(r + l).",
    "shortcut": "Volume is 1/3 of corresponding cylinder.",
    "svg": "cone",
    "id": "f_81"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Sphere & Hemisphere",
    "formula": "Sphere Vol = (4/3)πr³ | Sphere Area = 4πr²",
    "desc": "Hemisphere Vol = (2/3)πr³, TSA = 3πr².",
    "shortcut": "Hemisphere TSA includes circular base (2πr² + πr² = 3πr²).",
    "svg": "sphere",
    "id": "f_82"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Frustum of a Cone",
    "formula": "Vol = (1/3)πh (R² + r² + R×r)",
    "desc": "R and r are top and bottom radii of truncated cone.",
    "shortcut": "Slant height l = √[h² + (R-r)²].",
    "svg": "cone",
    "id": "f_83"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Distance Between 2 Points (2D)",
    "formula": "Distance = √[(x2 - x1)² + (y2 - y1)²]",
    "desc": "Euclidean distance in Cartesian plane.",
    "shortcut": "Derived directly from Pythagoras theorem.",
    "svg": "coordinate",
    "id": "f_84"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Section Formula (Internal Division)",
    "formula": "x = (m×x2 + n×x1)/(m+n), y = (m×y2 + n×y1)/(m+n)",
    "desc": "Point P divides segment AB in ratio m:n.",
    "shortcut": "Midpoint is (x1+x2)/2, (y1+y2)/2 when m:n = 1:1.",
    "svg": "coordinate",
    "id": "f_85"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Area of Triangle from Coordinates",
    "formula": "Area = 0.5 |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|",
    "desc": "Shoelace formula for vertices (x1,y1), (x2,y2), (x3,y3).",
    "shortcut": "If Area = 0, the three points are collinear.",
    "svg": "coordinate",
    "id": "f_86"
  },
  {
    "topic": "Geometry",
    "cat": "quantitative",
    "title": "Slope & Line Equation",
    "formula": "Slope m = (y2 - y1) / (x2 - x1) | Line: y - y1 = m(x - x1)",
    "desc": "Perpendicular lines have slopes m1 × m2 = -1.",
    "shortcut": "Parallel lines have equal slopes (m1 = m2).",
    "svg": "coordinate",
    "id": "f_87"
  },
  {
    "id": "f_88",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Derivative of Exponential e^x (Advanced Application)",
    "formula": "d/dx (e^x) = e^x | d/dx (a^x) = a^x × ln(a)",
    "description": "e^x is its own derivative.",
    "shortcut": "d/dx (e^(kx)) = k e^(kx).",
    "svg": "calculus"
  },
  {
    "id": "f_89",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Derivative of Logarithm ln(x) (Advanced Application)",
    "formula": "d/dx (ln x) = 1 / x",
    "description": "Natural logarithm derivative.",
    "shortcut": "d/dx (log_a x) = 1 / (x ln a).",
    "svg": "calculus"
  },
  {
    "id": "f_90",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Trig Derivatives (sin & cos) (Advanced Application)",
    "formula": "d/dx (sin x) = cos x | d/dx (cos x) = -sin x",
    "description": "Fundamental trigonometric derivatives.",
    "shortcut": "d/dx (tan x) = sec² x.",
    "svg": "calculus"
  },
  {
    "id": "f_91",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Power Rule of Integration (Advanced Application)",
    "formula": "∫ x^n dx = [x^(n+1) / (n + 1)] + C (for n ≠ -1)",
    "description": "Indefinite integral power rule.",
    "shortcut": "∫ (1/x) dx = ln|x| + C.",
    "svg": "calculus"
  },
  {
    "id": "f_92",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Integration by Parts (Advanced Application)",
    "formula": "∫ u dv = u v - ∫ v du",
    "description": "ILATE rule prioritizes choice of u (Inverse, Log, Alg, Trig, Exp).",
    "shortcut": "Derived from product rule of differentiation.",
    "svg": "calculus"
  },
  {
    "id": "f_93",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Fundamental Theorem of Calculus (Advanced Application)",
    "formula": "∫_a^b f(x) dx = F(b) - F(a)",
    "description": "Definite integral area evaluation where F'(x) = f(x).",
    "shortcut": "Evaluates net signed area under curve.",
    "svg": "calculus"
  },
  {
    "id": "f_94",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "L'Hôpital's Rule for Limits (Advanced Application)",
    "formula": "lim [f(x)/g(x)] = lim [f'(x)/g'(x)] for 0/0 or ∞/∞",
    "description": "Resolves indeterminate limit forms.",
    "shortcut": "Differentiate numerator and denominator separately.",
    "svg": "calculus"
  },
  {
    "id": "f_95",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Taylor Series Expansion (Advanced Application)",
    "formula": "f(x) = ∑ [f^(n)(a) / n!] × (x - a)^n",
    "description": "Polynomial approximation of smooth function around x=a.",
    "shortcut": "Maclaurin series is Taylor series at a=0.",
    "svg": "calculus"
  },
  {
    "id": "f_96",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Euler's Formula in Complex Numbers (Advanced Application)",
    "formula": "e^(iθ) = cos(θ) + i sin(θ)",
    "description": "Connects complex exponential with trigonometry.",
    "shortcut": "e^(iπ) + 1 = 0 (Euler's identity).",
    "svg": "calculus"
  },
  {
    "id": "f_97",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Vector Dot Product (Advanced Application)",
    "formula": "A · B = |A||B| cos(θ) = A_x B_x + A_y B_y + A_z B_z",
    "description": "Scalar product of two vectors.",
    "shortcut": "A · B = 0 implies vectors are perpendicular (90°).",
    "svg": "coordinate"
  },
  {
    "id": "f_98",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Vector Cross Product Magnitude (Advanced Application)",
    "formula": "|A × B| = |A||B| sin(θ)",
    "description": "Vector perpendicular to both A and B.",
    "shortcut": "|A × B| represents area of parallelogram formed by A & B.",
    "svg": "coordinate"
  },
  {
    "id": "f_99",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Fundamental Identity 1 (Advanced Application)",
    "formula": "sin²(θ) + cos²(θ) = 1",
    "description": "Primary trigonometric identity.",
    "shortcut": "sin²(θ) = 1 - cos²(θ).",
    "svg": "trig"
  },
  {
    "id": "f_100",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Fundamental Identity 2 (Advanced Application)",
    "formula": "1 + tan²(θ) = sec²(θ)",
    "description": "Relates tangent and secant functions.",
    "shortcut": "sec²(θ) - tan²(θ) = 1.",
    "svg": "trig"
  },
  {
    "id": "f_101",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Fundamental Identity 3 (Advanced Application)",
    "formula": "1 + cot²(θ) = cosec²(θ)",
    "description": "Relates cotangent and cosecant functions.",
    "shortcut": "cosec²(θ) - cot²(θ) = 1.",
    "svg": "trig"
  },
  {
    "id": "f_102",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Sine Rule for Triangles (Advanced Application)",
    "formula": "a / sin(A) = b / sin(B) = c / sin(C) = 2R",
    "description": "Relates side lengths to opposite angles and circumradius R.",
    "shortcut": "Used when two angles and one side are given.",
    "svg": "trig"
  },
  {
    "id": "f_103",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Cosine Rule for Triangles (Advanced Application)",
    "formula": "cos(A) = (b² + c² - a²) / (2bc)",
    "description": "Calculates angle when three side lengths are known.",
    "shortcut": "a² = b² + c² - 2bc cos(A).",
    "svg": "trig"
  },
  {
    "id": "f_104",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Compound Angle sin(A ± B) (Advanced Application)",
    "formula": "sin(A ± B) = sin(A)cos(B) ± cos(A)sin(B)",
    "description": "Expansion rule for sum and difference of sines.",
    "shortcut": "sin(75°) = sin(45°+30°).",
    "svg": "trig"
  },
  {
    "id": "f_105",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Compound Angle cos(A ± B) (Advanced Application)",
    "formula": "cos(A ± B) = cos(A)cos(B) ∓ sin(A)sin(B)",
    "description": "Cos of sum has minus sign; cos of diff has plus sign.",
    "shortcut": "Note sign flip for cosine sum.",
    "svg": "trig"
  },
  {
    "id": "f_106",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Double Angle sin(2θ) (Advanced Application)",
    "formula": "sin(2θ) = 2 sin(θ) cos(θ) = (2 tan θ)/(1 + tan² θ)",
    "description": "Expresses double angle in terms of single angle.",
    "shortcut": "Useful in calculus integrals.",
    "svg": "trig"
  },
  {
    "id": "f_107",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Double Angle cos(2θ) (Advanced Application)",
    "formula": "cos(2θ) = cos²(θ) - sin²(θ) = 2cos²(θ) - 1 = 1 - 2sin²(θ)",
    "description": "Three equivalent forms for cos(2θ).",
    "shortcut": "cos²(θ) = (1 + cos 2θ)/2.",
    "svg": "trig"
  },
  {
    "id": "f_108",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Height and Distance Angle of Elevation (Advanced Application)",
    "formula": "tan(θ) = Height / Distance",
    "description": "Basic trigonometric ratio for height & distance problem solving.",
    "shortcut": "For 45° angle, Height = Distance.",
    "svg": "trig"
  },
  {
    "id": "f_109",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Height and Distance (30-60-90 Triangle) (Advanced Application)",
    "formula": "Sides ratio = 1 : √3 : 2",
    "description": "Opposite to 30° is x, opposite to 60° is x√3, hypotenuse is 2x.",
    "shortcut": "Quick shortcut for standard 30-60-90 triangles.",
    "svg": "trig"
  },
  {
    "id": "f_110",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Height and Distance (45-45-90 Triangle) (Advanced Application)",
    "formula": "Sides ratio = 1 : 1 : √2",
    "description": "Isosceles right triangle side ratio.",
    "shortcut": "Legs are equal; hypotenuse is leg × √2.",
    "svg": "trig"
  },
  {
    "id": "f_111",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Product to Sum Formula (Advanced Application)",
    "formula": "2 sin(A)cos(B) = sin(A+B) + sin(A-B)",
    "description": "Converts product of trig functions into sum.",
    "shortcut": "Simplifies integration products.",
    "svg": "trig"
  },
  {
    "id": "f_112",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Sum to Product Formula (Advanced Application)",
    "formula": "sin(C) + sin(D) = 2 sin[(C+D)/2] cos[(C-D)/2]",
    "description": "Converts sum into product form.",
    "shortcut": "Useful for finding roots of trig equations.",
    "svg": "trig"
  },
  {
    "id": "f_113",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Area of Triangle (Trig Form) (Advanced Application)",
    "formula": "Area = 0.5 × a × b × sin(C)",
    "description": "Area using two sides and included angle C.",
    "shortcut": "No height needed if angle C is given.",
    "svg": "trig"
  },
  {
    "id": "f_114",
    "category": "quantitative",
    "topic": "Algebra",
    "title": "Quadratic Roots Formula (Advanced Application)",
    "formula": "x = [-b ± √(b² - 4ac)] / (2a)",
    "description": "Roots of quadratic equation ax² + bx + c = 0.",
    "shortcut": "Discriminant D = b² - 4ac determines root nature.",
    "svg": "algebra"
  },
  {
    "id": "f_115",
    "category": "quantitative",
    "topic": "Algebra",
    "title": "Sum & Product of Quadratic Roots (Advanced Application)",
    "formula": "Sum (α + β) = -b/a | Product (α × β) = c/a",
    "description": "Relations between roots α, β and coefficients.",
    "shortcut": "Equation: x² - (Sum)x + (Product) = 0.",
    "svg": "algebra"
  },
  {
    "id": "f_116",
    "category": "quantitative",
    "topic": "Algebra",
    "title": "Algebraic Expansion (a + b)² (Advanced Application)",
    "formula": "(a + b)² = a² + 2ab + b²",
    "description": "Square of binomial sum.",
    "shortcut": "(a - b)² = a² - 2ab + b².",
    "svg": "algebra"
  },
  {
    "id": "f_117",
    "category": "quantitative",
    "topic": "Algebra",
    "title": "Difference of Squares (Advanced Application)",
    "formula": "a² - b² = (a - b)(a + b)",
    "description": "Factorization of square difference.",
    "shortcut": "E.g., 99² - 1 = (99-1)(99+1) = 98 × 100 = 9800.",
    "svg": "algebra"
  },
  {
    "id": "f_118",
    "category": "quantitative",
    "topic": "Algebra",
    "title": "Algebraic Identity (a + b)³ (Advanced Application)",
    "formula": "(a + b)³ = a³ + b³ + 3ab(a + b)",
    "description": "Cube of binomial sum.",
    "shortcut": "a³ + b³ = (a + b)(a² - ab + b²).",
    "svg": "algebra"
  },
  {
    "id": "f_119",
    "category": "quantitative",
    "topic": "Algebra",
    "title": "Algebraic Identity a³ - b³ (Advanced Application)",
    "formula": "a³ - b³ = (a - b)(a² + ab + b²)",
    "description": "Difference of cubes factorization.",
    "shortcut": "(a - b)³ = a³ - b³ - 3ab(a - b).",
    "svg": "algebra"
  },
  {
    "id": "f_120",
    "category": "quantitative",
    "topic": "Algebra",
    "title": "Identity a³ + b³ + c³ - 3abc (Advanced Application)",
    "formula": "a³+b³+c³-3abc = (a+b+c)(a²+b²+c²-ab-bc-ca)",
    "description": "Special 3-variable identity.",
    "shortcut": "If a + b + c = 0, then a³ + b³ + c³ = 3abc.",
    "svg": "algebra"
  },
  {
    "id": "f_121",
    "category": "quantitative",
    "topic": "Algebra",
    "title": "Logarithm Product & Quotient Rules (Advanced Application)",
    "formula": "log(m × n) = log m + log n | log(m / n) = log m - log n",
    "description": "Fundamental logarithmic operational properties.",
    "shortcut": "Converts multiplication into addition.",
    "svg": "algebra"
  },
  {
    "id": "f_122",
    "category": "quantitative",
    "topic": "Algebra",
    "title": "Logarithm Power & Base Change (Advanced Application)",
    "formula": "log(m^k) = k log m | log_b(a) = log a / log b",
    "description": "Exponent rule and change of base theorem.",
    "shortcut": "log_a(a) = 1, log_a(1) = 0.",
    "svg": "algebra"
  },
  {
    "id": "f_123",
    "category": "quantitative",
    "topic": "Algebra",
    "title": "AM-GM Inequality (Advanced Application)",
    "formula": "Arithmetic Mean ≥ Geometric Mean (AM ≥ GM)",
    "description": "(a + b)/2 ≥ √(a × b) for non-negative real numbers.",
    "shortcut": "Equality holds if and only if a = b.",
    "svg": "algebra"
  },
  {
    "id": "f_124",
    "category": "quantitative",
    "topic": "Algebra",
    "title": "AM-GM-HM Inequality (Advanced Application)",
    "formula": "AM ≥ GM ≥ HM",
    "description": "Harmonic mean HM = 2ab / (a + b).",
    "shortcut": "GM² = AM × HM.",
    "svg": "algebra"
  },
  {
    "id": "f_125",
    "category": "quantitative",
    "topic": "Algebra",
    "title": "Binomial Theorem General Term (Advanced Application)",
    "formula": "T_(r+1) = nCr × a^(n-r) × b^r",
    "description": "(r+1)-th term in expansion of (a + b)^n.",
    "shortcut": "Total terms in expansion = n + 1.",
    "svg": "algebra"
  },
  {
    "id": "f_126",
    "category": "quantitative",
    "topic": "Algebra",
    "title": "Sum of Binomial Coefficients (Advanced Application)",
    "formula": "nC0 + nC1 + nC2 + ... + nCn = 2^n",
    "description": "Sum of all combination coefficients for given n.",
    "shortcut": "Sum of even coefficients = 2^(n-1).",
    "svg": "algebra"
  },
  {
    "id": "f_127",
    "category": "quantitative",
    "topic": "Algebra",
    "title": "Modulus Inequality Property (Advanced Application)",
    "formula": "|x| ≤ a ⇔ -a ≤ x ≤ a | |x| ≥ a ⇔ x ≤ -a or x ≥ a",
    "description": "Solving absolute value inequalities.",
    "shortcut": "|x + y| ≤ |x| + |y| (Triangle inequality).",
    "svg": "algebra"
  },
  {
    "id": "f_128",
    "category": "quantitative",
    "topic": "Algebra",
    "title": "Remainder Theorem for Polynomials (Advanced Application)",
    "formula": "P(x) ÷ (x - a) → Remainder = P(a)",
    "description": "Evaluating polynomial P(x) at x = a gives remainder.",
    "shortcut": "If P(a) = 0, then (x - a) is a factor.",
    "svg": "algebra"
  },
  {
    "id": "f_129",
    "category": "quantitative",
    "topic": "Probability & Combinatorics",
    "title": "Permutation Formula nPr (Advanced Application)",
    "formula": "nPr = n! / (n - r)!",
    "description": "Number of ways to arrange r objects from n distinct objects (Order matters).",
    "shortcut": "nP1 = n, nPn = n!.",
    "svg": "probability"
  },
  {
    "id": "f_130",
    "category": "quantitative",
    "topic": "Probability & Combinatorics",
    "title": "Combination Formula nCr (Advanced Application)",
    "formula": "nCr = n! / [r! × (n - r)!]",
    "description": "Number of ways to select r objects from n distinct objects (Order ignored).",
    "shortcut": "nCr = nC(n-r). E.g., 10C8 = 10C2 = 45.",
    "svg": "probability"
  },
  {
    "id": "f_131",
    "category": "quantitative",
    "topic": "Probability & Combinatorics",
    "title": "Circular Permutation (Advanced Application)",
    "formula": "Arrangements = (n - 1)!",
    "description": "Seating n distinct people around a circular table.",
    "shortcut": "If necklace/garland (no top/bottom), result is (n-1)! / 2.",
    "svg": "circle"
  },
  {
    "id": "f_132",
    "category": "quantitative",
    "topic": "Probability & Combinatorics",
    "title": "Permutation with Repetition (Advanced Application)",
    "formula": "N = n! / (p! × q! × r!)",
    "description": "Arranging n items where p are alike of one kind, q of another.",
    "shortcut": "E.g., ARRANGE has 7! / (2! × 2!) ways.",
    "svg": "probability"
  },
  {
    "id": "f_133",
    "category": "quantitative",
    "topic": "Probability & Combinatorics",
    "title": "Handshake / Line Connections Rule (Advanced Application)",
    "formula": "Handshakes = nC2 = [n(n - 1)] / 2",
    "description": "Total handshakes when n people greet each other.",
    "shortcut": "Same formula for total lines connecting n points.",
    "svg": "probability"
  },
  {
    "id": "f_134",
    "category": "quantitative",
    "topic": "Probability & Combinatorics",
    "title": "Classical Probability (Advanced Application)",
    "formula": "P(E) = n(E) / n(S)",
    "description": "n(E) = Favorable outcomes, n(S) = Total sample space.",
    "shortcut": "0 ≤ P(E) ≤ 1. P(E') = 1 - P(E).",
    "svg": "probability"
  },
  {
    "id": "f_135",
    "category": "quantitative",
    "topic": "Probability & Combinatorics",
    "title": "Addition Theorem of Probability (Advanced Application)",
    "formula": "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
    "description": "Probability that event A OR event B occurs.",
    "shortcut": "If mutually exclusive, P(A ∩ B) = 0.",
    "svg": "probability"
  },
  {
    "id": "f_136",
    "category": "quantitative",
    "topic": "Probability & Combinatorics",
    "title": "Independent Events Rule (Advanced Application)",
    "formula": "P(A ∩ B) = P(A) × P(B)",
    "description": "Events A and B do not influence each other.",
    "shortcut": "P(A | B) = P(A).",
    "svg": "probability"
  },
  {
    "id": "f_137",
    "category": "quantitative",
    "topic": "Probability & Combinatorics",
    "title": "Conditional Probability (Advanced Application)",
    "formula": "P(A | B) = P(A ∩ B) / P(B)",
    "description": "Probability of A given that B has already occurred.",
    "shortcut": "P(B) must be > 0.",
    "svg": "probability"
  },
  {
    "id": "f_138",
    "category": "quantitative",
    "topic": "Probability & Combinatorics",
    "title": "Bayes' Theorem (Advanced Application)",
    "formula": "P(A_i | B) = [ P(B | A_i) P(A_i) ] / ∑ [ P(B | A_k) P(A_k) ]",
    "description": "Revises prior probability of cause A_i given effect B.",
    "shortcut": "Used in AI/ML classifiers and medical diagnosis.",
    "svg": "probability"
  },
  {
    "id": "f_139",
    "category": "quantitative",
    "topic": "Probability & Combinatorics",
    "title": "Binomial Probability Distribution (Advanced Application)",
    "formula": "P(X = k) = nCk × p^k × (1 - p)^(n-k)",
    "description": "k successes in n independent Bernoulli trials with success prob p.",
    "shortcut": "Mean = n×p, Variance = n×p×(1-p).",
    "svg": "probability"
  },
  {
    "id": "f_140",
    "category": "quantitative",
    "topic": "Probability & Combinatorics",
    "title": "Poisson Distribution (Advanced Application)",
    "formula": "P(X = k) = (λ^k × e^-λ) / k!",
    "description": "Models rare events occurring at constant average rate λ.",
    "shortcut": "Mean = λ, Variance = λ.",
    "svg": "probability"
  },
  {
    "id": "f_141",
    "category": "quantitative",
    "topic": "Probability & Combinatorics",
    "title": "Derangement Formula (None in Right Place) (Advanced Application)",
    "formula": "!n = n! [ 1 - 1/1! + 1/2! - 1/3! + ... + (-1)^n/n! ]",
    "description": "Number of ways to place n items such that none is in original position.",
    "shortcut": "!3 = 2, !4 = 9, !5 = 44.",
    "svg": "probability"
  },
  {
    "id": "f_142",
    "category": "quantitative",
    "topic": "Probability & Combinatorics",
    "title": "At Least One Success Rule (Advanced Application)",
    "formula": "P(At least 1) = 1 - P(None)",
    "description": "Shortcut for \"at least one\" probability questions.",
    "shortcut": "P(None) = (1 - p)^n.",
    "svg": "probability"
  },
  {
    "id": "f_143",
    "category": "quantitative",
    "topic": "Probability & Combinatorics",
    "title": "Coins Tossing Outcomes (Advanced Application)",
    "formula": "Total Outcomes = 2^n | k heads = nCk",
    "description": "For n fair coins tossed simultaneously.",
    "shortcut": "Probability of k heads = nCk / 2^n.",
    "svg": "probability"
  },
  {
    "id": "f_144",
    "category": "quantitative",
    "topic": "Statistics",
    "title": "Arithmetic Mean (Grouped Data) (Advanced Application)",
    "formula": "Mean (x̄) = ∑(f_i × x_i) / ∑ f_i",
    "description": "Weighted average of class marks x_i with frequencies f_i.",
    "shortcut": "Assumed Mean method reduces calculation size.",
    "svg": "stats"
  },
  {
    "id": "f_145",
    "category": "quantitative",
    "topic": "Statistics",
    "title": "Median for Ungrouped Data (Advanced Application)",
    "formula": "Odd n: [(n+1)/2]-th | Even n: Avg of (n/2)-th & (n/2+1)-th",
    "description": "Middle value of sorted dataset.",
    "shortcut": "Always sort data in ascending order first.",
    "svg": "stats"
  },
  {
    "id": "f_146",
    "category": "quantitative",
    "topic": "Statistics",
    "title": "Mode Empirical Relation (Advanced Application)",
    "formula": "Mode = 3 × Median - 2 × Mean",
    "description": "Empirical formula connecting Mean, Median, Mode.",
    "shortcut": "Useful when distribution is moderately skewed.",
    "svg": "stats"
  },
  {
    "id": "f_147",
    "category": "quantitative",
    "topic": "Statistics",
    "title": "Variance Formula (Population) (Advanced Application)",
    "formula": "σ² = ∑(x_i - μ)² / N",
    "description": "Average squared deviation from the mean μ.",
    "shortcut": "σ² = [∑x_i² / N] - μ².",
    "svg": "stats"
  },
  {
    "id": "f_148",
    "category": "quantitative",
    "topic": "Statistics",
    "title": "Standard Deviation (Advanced Application)",
    "formula": "SD (σ) = √Variance = √[ ∑(x_i - μ)² / N ]",
    "description": "Square root of variance, in same units as original data.",
    "shortcut": "Measures spread/dispersion of data.",
    "svg": "stats"
  },
  {
    "id": "f_149",
    "category": "quantitative",
    "topic": "Statistics",
    "title": "Coefficient of Variation (CV) (Advanced Application)",
    "formula": "CV = (σ / Mean) × 100",
    "description": "Relative measure of dispersion expressed as percentage.",
    "shortcut": "Lower CV indicates higher consistency.",
    "svg": "stats"
  },
  {
    "id": "f_150",
    "category": "quantitative",
    "topic": "Statistics",
    "title": "Range & Interquartile Range (IQR) (Advanced Application)",
    "formula": "Range = Max - Min | IQR = Q3 - Q1",
    "description": "Q3 is 75th percentile, Q1 is 25th percentile.",
    "shortcut": "IQR is resistant to extreme outliers.",
    "svg": "stats"
  },
  {
    "id": "f_151",
    "category": "quantitative",
    "topic": "Statistics",
    "title": "Z-Score (Standardized Value) (Advanced Application)",
    "formula": "Z = (x - μ) / σ",
    "description": "Measures how many standard deviations x is from mean μ.",
    "shortcut": "Z=0 means x equals mean.",
    "svg": "stats"
  },
  {
    "id": "f_152",
    "category": "quantitative",
    "topic": "Statistics",
    "title": "Karl Pearson Correlation Coefficient (Advanced Application)",
    "formula": "r = Cov(X,Y) / (σ_X × σ_Y)",
    "description": "-1 ≤ r ≤ 1. Measures linear correlation between X and Y.",
    "shortcut": "r = +1 means perfect positive correlation.",
    "svg": "stats"
  },
  {
    "id": "f_153",
    "category": "quantitative",
    "topic": "Statistics",
    "title": "Regression Line Slope (Advanced Application)",
    "formula": "b_yx = r × (σ_y / σ_x) | Line: (y - ȳ) = b_yx (x - x̄)",
    "description": "Slope of regression line of Y on X.",
    "shortcut": "b_yx × b_xy = r².",
    "svg": "stats"
  },
  {
    "id": "f_154",
    "category": "quantitative",
    "topic": "Sequences & Series",
    "title": "Arithmetic Progression (AP) n-th Term (Advanced Application)",
    "formula": "a_n = a + (n - 1)d",
    "description": "a = first term, d = common difference.",
    "shortcut": "d = a_n - a_(n-1).",
    "svg": "series"
  },
  {
    "id": "f_155",
    "category": "quantitative",
    "topic": "Sequences & Series",
    "title": "Sum of AP Series (Advanced Application)",
    "formula": "S_n = (n / 2) [2a + (n - 1)d] = (n / 2) [a + l]",
    "description": "l = last term a_n.",
    "shortcut": "Sum = (Number of terms) × (Average of first and last).",
    "svg": "series"
  },
  {
    "id": "f_156",
    "category": "quantitative",
    "topic": "Sequences & Series",
    "title": "Geometric Progression (GP) n-th Term (Advanced Application)",
    "formula": "a_n = a × r^(n - 1)",
    "description": "a = first term, r = common ratio.",
    "shortcut": "r = a_n / a_(n-1).",
    "svg": "series"
  },
  {
    "id": "f_157",
    "category": "quantitative",
    "topic": "Sequences & Series",
    "title": "Sum of Finite GP Series (Advanced Application)",
    "formula": "S_n = [a(r^n - 1)] / (r - 1) for r > 1",
    "description": "Sum of first n terms of geometric series.",
    "shortcut": "For r < 1, S_n = [a(1 - r^n)] / (1 - r).",
    "svg": "series"
  },
  {
    "id": "f_158",
    "category": "quantitative",
    "topic": "Sequences & Series",
    "title": "Sum of Infinite GP Series (Advanced Application)",
    "formula": "S_∞ = a / (1 - r) for |r| < 1",
    "description": "Convergent infinite geometric series sum.",
    "shortcut": "Requires common ratio |r| < 1.",
    "svg": "series"
  },
  {
    "id": "f_159",
    "category": "quantitative",
    "topic": "Sequences & Series",
    "title": "Harmonic Progression (HP) (Advanced Application)",
    "formula": "1/a_1, 1/a_2, ..., 1/a_n are in AP",
    "description": "Reciprocals of terms form an arithmetic progression.",
    "shortcut": "Harmonic Mean of a and b = 2ab / (a + b).",
    "svg": "series"
  },
  {
    "id": "f_160",
    "category": "quantitative",
    "topic": "Sequences & Series",
    "title": "Arithmetic Mean (AM) of two numbers (Advanced Application)",
    "formula": "AM = (a + b) / 2",
    "description": "Standard average of two real numbers.",
    "shortcut": "a, AM, b form an AP.",
    "svg": "series"
  },
  {
    "id": "f_161",
    "category": "quantitative",
    "topic": "Sequences & Series",
    "title": "Geometric Mean (GM) of two numbers (Advanced Application)",
    "formula": "GM = √(a × b)",
    "description": "Geometric mean of positive numbers a and b.",
    "shortcut": "a, GM, b form a GP.",
    "svg": "series"
  },
  {
    "id": "f_162",
    "category": "quantitative",
    "topic": "Sequences & Series",
    "title": "Harmonic Mean (HM) of two numbers (Advanced Application)",
    "formula": "HM = (2ab) / (a + b)",
    "description": "Reciprocal of arithmetic mean of reciprocals.",
    "shortcut": "GM² = AM × HM.",
    "svg": "series"
  },
  {
    "id": "f_163",
    "category": "quantitative",
    "topic": "Sequences & Series",
    "title": "Sum of First n Odd Cubes (Advanced Application)",
    "formula": "Sum = n²(2n² - 1)",
    "description": "Sum of 1³ + 3³ + 5³ + ... + (2n-1)³.",
    "shortcut": "Special power summation identity.",
    "svg": "series"
  },
  {
    "id": "f_164",
    "category": "logical",
    "topic": "Logical & Clocks",
    "title": "Angle Between Clock Hands (Advanced Application)",
    "formula": "Angle = |(30 × H) - (5.5 × M)|",
    "description": "H = Hours (1-12), M = Minutes (0-59).",
    "shortcut": "Minute hand moves at 6°/min; hour hand at 0.5°/min.",
    "svg": "clock"
  },
  {
    "id": "f_165",
    "category": "logical",
    "topic": "Logical & Clocks",
    "title": "Coincidence of Clock Hands (Advanced Application)",
    "formula": "Hands coincide every 65(5/11) minutes",
    "description": "Hands overlap 22 times in 24 hours (not 24 times!).",
    "shortcut": "Hands at 180° opposite also 22 times in 24 hrs.",
    "svg": "clock"
  },
  {
    "id": "f_166",
    "category": "logical",
    "topic": "Logical & Clocks",
    "title": "Right Angles of Clock Hands (Advanced Application)",
    "formula": "Hands at 90° 44 times in 24 hours",
    "description": "Hands form 90° twice every hour except 2-3 and 8-9.",
    "shortcut": "22 times in 12 hours.",
    "svg": "clock"
  },
  {
    "id": "f_167",
    "category": "logical",
    "topic": "Logical & Clocks",
    "title": "Calendar Odd Days Concept (Advanced Application)",
    "formula": "Ordinary Year = 1 Odd Day | Leap Year = 2 Odd Days",
    "description": "Odd days are remainders when total days are divided by 7.",
    "shortcut": "100 years = 5 odd days, 400 years = 0 odd days.",
    "svg": "clock"
  },
  {
    "id": "f_168",
    "category": "logical",
    "topic": "Logical & Clocks",
    "title": "Leap Year Condition (Advanced Application)",
    "formula": "Year ÷ 4 == 0 (Centuries must be ÷ 400 == 0)",
    "description": "Year 2000 was a leap year, but 1900 was NOT a leap year.",
    "shortcut": "Century years must be divisible by 400.",
    "svg": "clock"
  },
  {
    "id": "f_169",
    "category": "logical",
    "topic": "Logical & Clocks",
    "title": "Syllogism Venn Intersection (Advanced Application)",
    "formula": "All A are B → A ⊆ B | Some A are B → A ∩ B ≠ ∅",
    "description": "Venn diagram set representations for formal logic.",
    "shortcut": "Draw minimal overlap diagrams.",
    "svg": "venn"
  },
  {
    "id": "f_170",
    "category": "logical",
    "topic": "Logical & Clocks",
    "title": "Coding Decoding Alphabet Positions (Advanced Application)",
    "formula": "A=1, B=2, ..., Z=26 | Reverse: A=26, ..., Z=1",
    "description": "Sum of position and reverse position is always 27.",
    "shortcut": "EJOTY rule: E=5, J=10, O=15, T=20, Y=25.",
    "svg": "math_logic"
  },
  {
    "id": "f_171",
    "category": "logical",
    "topic": "Logical & Clocks",
    "title": "Blood Relations Generation Map (Advanced Application)",
    "formula": "Self = Gen 0, Parents = Gen +1, Grandparents = Gen +2",
    "description": "Structured tier mapping for solving complex family trees.",
    "shortcut": "Use (+) for male, (-) for female.",
    "svg": "math_logic"
  },
  {
    "id": "f_172",
    "category": "technical",
    "topic": "CS & Matrix Math",
    "title": "Big-O Hierarchy Order (Advanced Application)",
    "formula": "O(1) < O(log N) < O(N) < O(N log N) < O(N²) < O(2ⁿ)",
    "description": "Asymptotic complexity growth order.",
    "shortcut": "N ≤ 10⁵ requires O(N log N) or better.",
    "svg": "chart_line"
  },
  {
    "id": "f_173",
    "category": "technical",
    "topic": "CS & Matrix Math",
    "title": "Set Theory Principle of Inclusion-Exclusion (2 Sets) (Advanced Application)",
    "formula": "n(A ∪ B) = n(A) + n(B) - n(A ∩ B)",
    "description": "Cardinality of union of two finite sets.",
    "shortcut": "n(A ∩ B) = n(A) + n(B) - n(A ∪ B).",
    "svg": "venn"
  },
  {
    "id": "f_174",
    "category": "technical",
    "topic": "CS & Matrix Math",
    "title": "Inclusion-Exclusion (3 Sets) (Advanced Application)",
    "formula": "n(A ∪ B ∪ C) = n(A)+n(B)+n(C) - n(A∩B) - n(B∩C) - n(C∩A) + n(A∩B∩C)",
    "description": "Cardinality for three overlapping sets.",
    "shortcut": "Sum singles - Sum pairs + Intersection of all 3.",
    "svg": "venn"
  },
  {
    "id": "f_175",
    "category": "technical",
    "topic": "CS & Matrix Math",
    "title": "Power Set Cardinality (Advanced Application)",
    "formula": "|P(A)| = 2^n",
    "description": "Total number of subsets of a set with n elements.",
    "shortcut": "Includes empty set ∅ and set A itself.",
    "svg": "venn"
  },
  {
    "id": "f_176",
    "category": "technical",
    "topic": "CS & Matrix Math",
    "title": "2x2 Matrix Determinant (Advanced Application)",
    "formula": "|A| = ad - bc for A = [[a,b],[c,d]]",
    "description": "Determinant of 2x2 matrix.",
    "shortcut": "If |A| = 0, matrix is singular (no inverse).",
    "svg": "matrix"
  },
  {
    "id": "f_177",
    "category": "technical",
    "topic": "CS & Matrix Math",
    "title": "2x2 Matrix Inverse (Advanced Application)",
    "formula": "A⁻¹ = (1 / |A|) × [[d, -b], [-c, a]]",
    "description": "Inverse of 2x2 non-singular matrix.",
    "shortcut": "Swap main diagonal, negate anti-diagonal.",
    "svg": "matrix"
  },
  {
    "id": "f_178",
    "category": "technical",
    "topic": "CS & Matrix Math",
    "title": "Matrix Multiplication Dimension Condition (Advanced Application)",
    "formula": "A_(m×n) × B_(n×p) = C_(m×p)",
    "description": "Columns of A must equal rows of B.",
    "shortcut": "Matrix multiplication is non-commutative (AB ≠ BA).",
    "svg": "matrix"
  },
  {
    "id": "f_179",
    "category": "technical",
    "topic": "CS & Matrix Math",
    "title": "Binary to Decimal Conversion (Advanced Application)",
    "formula": "N = b_k × 2^k + ... + b_1 × 2^1 + b_0 × 2^0",
    "description": "Base-2 positional value summation.",
    "shortcut": "Powers of 2: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512.",
    "svg": "math_logic"
  },
  {
    "id": "f_180",
    "category": "technical",
    "topic": "CS & Matrix Math",
    "title": "De Morgan's Laws (Logic & Sets) (Advanced Application)",
    "formula": "(A ∩ B)' = A' ∪ B' | (A ∪ B)' = A' ∩ B'",
    "description": "Complement of intersection is union of complements.",
    "shortcut": "NOT (A AND B) = (NOT A) OR (NOT B).",
    "svg": "venn"
  },
  {
    "id": "f_181",
    "category": "technical",
    "topic": "CS & Matrix Math",
    "title": "Graph Handshaking Lemma (Advanced Application)",
    "formula": "∑ deg(v) = 2 × |E|",
    "description": "Sum of degrees of all vertices equals twice the number of edges.",
    "shortcut": "Number of vertices with odd degree is always even.",
    "svg": "math_logic"
  },
  {
    "id": "f_182",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Power Rule of Differentiation (Advanced Application)",
    "formula": "d/dx (x^n) = n × x^(n-1)",
    "description": "Derivative of polynomial power term.",
    "shortcut": "d/dx (x³) = 3x².",
    "svg": "calculus"
  },
  {
    "id": "f_183",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Product Rule of Differentiation (Advanced Application)",
    "formula": "d/dx [u × v] = u (dv/dx) + v (du/dx)",
    "description": "Leibniz product rule for two functions u and v.",
    "shortcut": "First × derivative of second + second × derivative of first.",
    "svg": "calculus"
  },
  {
    "id": "f_184",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Quotient Rule of Differentiation (Advanced Application)",
    "formula": "d/dx [u / v] = [v(du/dx) - u(dv/dx)] / v²",
    "description": "Derivative of fraction u/v.",
    "shortcut": "(Low d-High - High d-Low) / Low-squared.",
    "svg": "calculus"
  },
  {
    "id": "f_185",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Chain Rule of Differentiation (Advanced Application)",
    "formula": "d/dx [f(g(x))] = f'(g(x)) × g'(x)",
    "description": "Derivative of composite functions.",
    "shortcut": "Differentiate outer, keep inner, multiply by inner derivative.",
    "svg": "calculus"
  },
  {
    "id": "f_186",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Derivative of Exponential e^x (Advanced Application)",
    "formula": "d/dx (e^x) = e^x | d/dx (a^x) = a^x × ln(a)",
    "description": "e^x is its own derivative.",
    "shortcut": "d/dx (e^(kx)) = k e^(kx).",
    "svg": "calculus"
  },
  {
    "id": "f_187",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Derivative of Logarithm ln(x) (Advanced Application)",
    "formula": "d/dx (ln x) = 1 / x",
    "description": "Natural logarithm derivative.",
    "shortcut": "d/dx (log_a x) = 1 / (x ln a).",
    "svg": "calculus"
  },
  {
    "id": "f_188",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Trig Derivatives (sin & cos) (Advanced Application)",
    "formula": "d/dx (sin x) = cos x | d/dx (cos x) = -sin x",
    "description": "Fundamental trigonometric derivatives.",
    "shortcut": "d/dx (tan x) = sec² x.",
    "svg": "calculus"
  },
  {
    "id": "f_189",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Power Rule of Integration (Advanced Application)",
    "formula": "∫ x^n dx = [x^(n+1) / (n + 1)] + C (for n ≠ -1)",
    "description": "Indefinite integral power rule.",
    "shortcut": "∫ (1/x) dx = ln|x| + C.",
    "svg": "calculus"
  },
  {
    "id": "f_190",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Integration by Parts (Advanced Application)",
    "formula": "∫ u dv = u v - ∫ v du",
    "description": "ILATE rule prioritizes choice of u (Inverse, Log, Alg, Trig, Exp).",
    "shortcut": "Derived from product rule of differentiation.",
    "svg": "calculus"
  },
  {
    "id": "f_191",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Fundamental Theorem of Calculus (Advanced Application)",
    "formula": "∫_a^b f(x) dx = F(b) - F(a)",
    "description": "Definite integral area evaluation where F'(x) = f(x).",
    "shortcut": "Evaluates net signed area under curve.",
    "svg": "calculus"
  },
  {
    "id": "f_192",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "L'Hôpital's Rule for Limits (Advanced Application)",
    "formula": "lim [f(x)/g(x)] = lim [f'(x)/g'(x)] for 0/0 or ∞/∞",
    "description": "Resolves indeterminate limit forms.",
    "shortcut": "Differentiate numerator and denominator separately.",
    "svg": "calculus"
  },
  {
    "id": "f_193",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Taylor Series Expansion (Advanced Application)",
    "formula": "f(x) = ∑ [f^(n)(a) / n!] × (x - a)^n",
    "description": "Polynomial approximation of smooth function around x=a.",
    "shortcut": "Maclaurin series is Taylor series at a=0.",
    "svg": "calculus"
  },
  {
    "id": "f_194",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Euler's Formula in Complex Numbers (Advanced Application)",
    "formula": "e^(iθ) = cos(θ) + i sin(θ)",
    "description": "Connects complex exponential with trigonometry.",
    "shortcut": "e^(iπ) + 1 = 0 (Euler's identity).",
    "svg": "calculus"
  },
  {
    "id": "f_195",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Vector Dot Product (Advanced Application)",
    "formula": "A · B = |A||B| cos(θ) = A_x B_x + A_y B_y + A_z B_z",
    "description": "Scalar product of two vectors.",
    "shortcut": "A · B = 0 implies vectors are perpendicular (90°).",
    "svg": "coordinate"
  },
  {
    "id": "f_196",
    "category": "technical",
    "topic": "Calculus & Derivatives",
    "title": "Vector Cross Product Magnitude (Advanced Application)",
    "formula": "|A × B| = |A||B| sin(θ)",
    "description": "Vector perpendicular to both A and B.",
    "shortcut": "|A × B| represents area of parallelogram formed by A & B.",
    "svg": "coordinate"
  },
  {
    "id": "f_197",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Fundamental Identity 1 (Advanced Application)",
    "formula": "sin²(θ) + cos²(θ) = 1",
    "description": "Primary trigonometric identity.",
    "shortcut": "sin²(θ) = 1 - cos²(θ).",
    "svg": "trig"
  },
  {
    "id": "f_198",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Fundamental Identity 2 (Advanced Application)",
    "formula": "1 + tan²(θ) = sec²(θ)",
    "description": "Relates tangent and secant functions.",
    "shortcut": "sec²(θ) - tan²(θ) = 1.",
    "svg": "trig"
  },
  {
    "id": "f_199",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Fundamental Identity 3 (Advanced Application)",
    "formula": "1 + cot²(θ) = cosec²(θ)",
    "description": "Relates cotangent and cosecant functions.",
    "shortcut": "cosec²(θ) - cot²(θ) = 1.",
    "svg": "trig"
  },
  {
    "id": "f_200",
    "category": "quantitative",
    "topic": "Trigonometry",
    "title": "Sine Rule for Triangles (Advanced Application)",
    "formula": "a / sin(A) = b / sin(B) = c / sin(C) = 2R",
    "description": "Relates side lengths to opposite angles and circumradius R.",
    "shortcut": "Used when two angles and one side are given.",
    "svg": "trig"
  }
];
