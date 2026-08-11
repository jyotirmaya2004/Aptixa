export const SANDBOX_VERBAL_DATA = [
  {
    id: "v1",
    title: "DI Percentage Share & Revenue Contribution",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "Critical",
    formula: "Share% = (Segment Value / Total Revenue) × 100",
    description: "Calculates percentage contribution of segment value to total revenue.",
    shortcutTip: "Estimate ratios mentally to eliminate choices quickly.",
    inputs: [
          {
                "key": "val",
                "label": "Segment Value ($)",
                "type": "number",
                "min": 1,
                "max": 100000,
                "default": 450
          },
          {
                "key": "tot",
                "label": "Total Revenue ($)",
                "type": "number",
                "min": 1,
                "max": 1000000,
                "default": 2000
          }
    ],
    compute: (inputs) => {
      const v = Number(inputs.val)||0, t = Math.max(1, Number(inputs.tot)||1);
      const pct = ((v / t) * 100).toFixed(2);
      return {
        result: `${pct}%`,
        unit: 'Revenue Share',
        steps: [
          `Fraction = ${v} / ${t} = ${(v/t).toFixed(4)}`,
          `Percentage = ${(v/t).toFixed(4)} × 100 = ${pct}%`
        ]
      };
    }
  },
  {
    id: "v2",
    title: "Reading Speed & WPM Rate Calculator",
    category: "verbal",
    topic: "Reading & Verbal WPM",
    examTag: "TCS NQT",
    importance: "High",
    formula: "WPM = Total Words / Reading Duration (Mins)",
    description: "Computes reading speed in Words Per Minute (WPM).",
    shortcutTip: "Average reading speed is 200-250 WPM.",
    inputs: [
          {
                "key": "w",
                "label": "Total Words Read",
                "type": "number",
                "min": 10,
                "max": 10000,
                "default": 600
          },
          {
                "key": "m",
                "label": "Duration (Mins)",
                "type": "number",
                "min": 0.5,
                "max": 60,
                "step": 0.5,
                "default": 2.5
          }
    ],
    compute: (inputs) => {
      const w = Number(inputs.w)||0, m = Math.max(0.1, Number(inputs.m)||1);
      const wpm = Math.round(w / m);
      return {
        result: `${wpm} WPM`,
        unit: 'Reading Rate',
        steps: [
          `WPM = ${w} words / ${m} mins = ${wpm} WPM`
        ]
      };
    }
  },
  {
    id: "v3",
    title: "Business Breakeven Sales Units Solver",
    category: "verbal",
    topic: "Financial Mathematics",
    examTag: "Accenture",
    importance: "Critical",
    formula: "Breakeven Units = Fixed Costs / (Price - Variable Cost)",
    description: "Finds sales volume needed to achieve zero profit/loss.",
    shortcutTip: "Contribution Margin = Price - Variable Cost per unit.",
    inputs: [
          {
                "key": "fc",
                "label": "Fixed Costs ($)",
                "type": "number",
                "min": 100,
                "max": 100000,
                "default": 10000
          },
          {
                "key": "p",
                "label": "Selling Price ($)",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 50
          },
          {
                "key": "vc",
                "label": "Variable Cost ($)",
                "type": "number",
                "min": 0,
                "max": 1000,
                "default": 20
          }
    ],
    compute: (inputs) => {
      const fc = Number(inputs.fc)||0, p = Number(inputs.p)||1, vc = Number(inputs.vc)||0;
      const cm = p - vc;
      if (cm <= 0) return { result: 'No Breakeven', unit: '', steps: ['Price must exceed variable cost!'] };
      const units = Math.ceil(fc / cm);
      return {
        result: `${units.toLocaleString()} Units`,
        unit: `Sales: $${(units * p).toLocaleString()}`,
        steps: [
          `Contribution Margin = $${p} - $${vc} = $${cm}`,
          `Breakeven Units = $${fc} / $${cm} = ${units} units`
        ]
      };
    }
  },
  {
    id: "v4",
    title: "Data Interpretation & Business Math #4",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #4.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 400
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 40
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v5",
    title: "Data Interpretation & Business Math #5",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "Infosys",
    importance: "High",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #5.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 500
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 50
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v6",
    title: "Data Interpretation & Business Math #6",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "Critical",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #6.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 600
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 60
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v7",
    title: "Data Interpretation & Business Math #7",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "Infosys",
    importance: "High",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #7.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 700
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 70
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v8",
    title: "Data Interpretation & Business Math #8",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #8.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 800
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 80
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v9",
    title: "Data Interpretation & Business Math #9",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "Infosys",
    importance: "Critical",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #9.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 900
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 90
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v10",
    title: "Data Interpretation & Business Math #10",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #10.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 1000
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 100
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v11",
    title: "Data Interpretation & Business Math #11",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "Infosys",
    importance: "High",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #11.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 1100
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 110
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v12",
    title: "Data Interpretation & Business Math #12",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "Critical",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #12.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 1200
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 120
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v13",
    title: "Data Interpretation & Business Math #13",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "Infosys",
    importance: "High",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #13.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 1300
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 130
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v14",
    title: "Data Interpretation & Business Math #14",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #14.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 1400
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 140
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v15",
    title: "Data Interpretation & Business Math #15",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "Infosys",
    importance: "Critical",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #15.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 1500
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 150
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v16",
    title: "Data Interpretation & Business Math #16",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #16.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 1600
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 160
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v17",
    title: "Data Interpretation & Business Math #17",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "Infosys",
    importance: "High",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #17.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 1700
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 170
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v18",
    title: "Data Interpretation & Business Math #18",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "Critical",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #18.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 1800
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 180
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v19",
    title: "Data Interpretation & Business Math #19",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "Infosys",
    importance: "High",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #19.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 1900
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 190
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  },
  {
    id: "v20",
    title: "Data Interpretation & Business Math #20",
    category: "verbal",
    topic: "Data Interpretation",
    examTag: "CAT",
    importance: "High",
    formula: "Metric = f(Data A, Data B)",
    description: "Computes business analytics parameters for scenario #20.",
    shortcutTip: "Estimate ratios mentally before computing exact decimals.",
    inputs: [
          {
                "key": "val1",
                "label": "Parameter A",
                "type": "number",
                "min": 1,
                "max": 50000,
                "default": 2000
          },
          {
                "key": "val2",
                "label": "Parameter B",
                "type": "number",
                "min": 1,
                "max": 1000,
                "default": 200
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.val1)||1, b = Number(inputs.val2)||1;
      const res = ((a / (a + b)) * 100).toFixed(2);
      return {
        result: `${res}%`,
        unit: 'Percentage Metric',
        steps: [
          `Ratio = ${a} / (${a} + ${b}) = ${(a/(a+b)).toFixed(4)}`,
          `Percentage = ${res}%`
        ]
      };
    }
  }
];
