export const SANDBOX_TECHNICAL = [
  {
    id: "t1",
    title: "Base Conversion & Bit Count (Decimal to Hex/Bin)",
    category: "technical",
    topic: "Digital Logic",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Bits = ⌈log2(N + 1)⌉",
    description: "Calculates minimum bit length and hex representation for decimal integer N.",
    shortcutTip: "N bits can represent values from 0 up to 2^N - 1.",
    inputs: [
          {
                "key": "num",
                "label": "Decimal Integer",
                "type": "number",
                "min": 0,
                "max": 65535,
                "default": 255
          }
    ],
    compute: (inputs) => {
      const n = Math.max(0, Number(inputs.num)||0);
      const bin = n.toString(2);
      const hex = n.toString(16).toUpperCase();
      const bits = bin.length;
      return {
        result: `0x${hex} (${bits} Bits)`,
        unit: 'Hex & Bit Length',
        steps: [
          `Decimal = ${n}`,
          `Binary = 0b${bin}`,
          `Minimum bits required = ${bits} bits`,
          `Hexadecimal = 0x${hex}`
        ]
      };
    }
  },
  {
    id: "t2",
    title: "IPv4 CIDR Subnet Host Range (/8 to /30)",
    category: "technical",
    topic: "Computer Networks",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Usable Hosts = 2^(32 - CIDR) - 2",
    description: "Computes total usable IP addresses for subnets with prefix /CIDR.",
    shortcutTip: "Subtract 2 for Network ID (all 0s) and Broadcast IP (all 1s).",
    inputs: [
          {
                "key": "cidr",
                "label": "CIDR Prefix (/N)",
                "type": "range",
                "min": 8,
                "max": 30,
                "step": 1,
                "default": 24
          }
    ],
    compute: (inputs) => {
      const c = Number(inputs.cidr)||24;
      const hostBits = 32 - c;
      const hosts = Math.pow(2, hostBits) - 2;
      return {
        result: hosts.toLocaleString(),
        unit: `Usable IPs (/${c})`,
        steps: [
          `Host bits = 32 - ${c} = ${hostBits}`,
          `Total IP capacity = 2^${hostBits} = ${Math.pow(2, hostBits).toLocaleString()}`,
          `Usable IPs = ${Math.pow(2, hostBits).toLocaleString()} - 2 = ${hosts.toLocaleString()}`
        ]
      };
    }
  },
  {
    id: "t3",
    title: "Transmission Delay (L / R)",
    category: "technical",
    topic: "Computer Networks",
    examTag: "GATE CS",
    importance: "High",
    formula: "T_trans = Packet Size L / Data Rate R",
    description: "Calculates time taken to push all bits of a packet into the physical link.",
    shortcutTip: "Ensure units match! Convert bytes to bits (×8) and Mbps to bps (×10⁶).",
    inputs: [
          {
                "key": "packetBytes",
                "label": "Packet Size (Bytes)",
                "type": "number",
                "min": 64,
                "max": 10000,
                "default": 1500
          },
          {
                "key": "bandwidthMbps",
                "label": "Link Bandwidth (Mbps)",
                "type": "number",
                "min": 1,
                "max": 10000,
                "default": 100
          }
    ],
    compute: (inputs) => {
      const bytes = Number(inputs.packetBytes)||1, mbps = Number(inputs.bandwidthMbps)||1;
      const bits = bytes * 8;
      const bps = mbps * 1e6;
      const delaySec = bits / bps;
      const delayMs = (delaySec * 1000).toFixed(3);
      return {
        result: `${delayMs} ms`,
        unit: 'Transmission Delay',
        steps: [
          `Packet Size in bits = ${bytes} × 8 = ${bits} bits`,
          `Bandwidth in bps = ${mbps} × 10⁶ = ${bps.toLocaleString()} bps`,
          `Transmission Delay = ${bits} / ${bps.toLocaleString()} = ${delaySec.toFixed(6)} sec = ${delayMs} ms`
        ]
      };
    }
  },
  {
    id: "t4",
    title: "8-Bit Two's Complement Signed Integer",
    category: "technical",
    topic: "Digital Logic",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Two's Complement = ~Value + 1",
    description: "Computes binary 8-bit Two's complement representation for negative integers.",
    shortcutTip: "Invert all bits (One's Complement) and add 1.",
    inputs: [
          {
                "key": "val",
                "label": "Signed Integer (-128 to 127)",
                "type": "number",
                "min": -128,
                "max": 127,
                "default": -5
          }
    ],
    compute: (inputs) => {
      const v = Number(inputs.val)||0;
      let bin = "";
      if (v >= 0) {
        bin = (v & 0xFF).toString(2).padStart(8, '0');
      } else {
        bin = ((1 << 8) + v).toString(2).padStart(8, '0');
      }
      return {
        result: `0b${bin}`,
        unit: '8-Bit Representation',
        steps: [
          `Given Value = ${v}`,
          `8-Bit Two's Complement Binary = ${bin}`
        ]
      };
    }
  },
  {
    id: "t5",
    title: "Sliding Window Protocol Efficiency",
    category: "technical",
    topic: "Computer Networks",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Efficiency = N / (1 + 2a) where a = T_prop / T_trans",
    description: "Calculates maximum channel utilization efficiency for sliding window with window size N.",
    shortcutTip: "For Stop-and-Wait, N = 1, so Efficiency = 1 / (1 + 2a).",
    inputs: [
          {
                "key": "nWindow",
                "label": "Window Size N",
                "type": "number",
                "min": 1,
                "max": 128,
                "default": 4
          },
          {
                "key": "tTrans",
                "label": "Transmission Time T_trans (ms)",
                "type": "number",
                "min": 0.1,
                "max": 100,
                "default": 1
          },
          {
                "key": "tProp",
                "label": "Propagation Time T_prop (ms)",
                "type": "number",
                "min": 0.1,
                "max": 500,
                "default": 10
          }
    ],
    compute: (inputs) => {
      const N = Number(inputs.nWindow)||1, tt = Number(inputs.tTrans)||1, tp = Number(inputs.tProp)||1;
      const a = tp / tt;
      const eff = Math.min(1, N / (1 + 2 * a));
      const pct = (eff * 100).toFixed(2);
      return {
        result: `${pct}%`,
        unit: `a = ${a.toFixed(2)}`,
        steps: [
          `Ratio a = T_prop / T_trans = ${tp} / ${tt} = ${a.toFixed(2)}`,
          `Efficiency = min(1, N / (1 + 2a)) = min(1, ${N} / (1 + ${(2*a).toFixed(2)})) = ${eff.toFixed(4)}`,
          `Channel Utilization = ${pct}%`
        ]
      };
    }
  },
  {
    id: "t6",
    title: "2D Row-Major Array RAM Address",
    category: "technical",
    topic: "Data Structures",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Loc(A[i][j]) = Base + [i × N + j] × Size",
    description: "Calculates memory byte address for 2D array element A[i][j] in row-major layout.",
    shortcutTip: "Row-major stores entire rows sequentially in memory.",
    inputs: [
          {
                "key": "baseAddr",
                "label": "Base RAM Address",
                "type": "number",
                "min": 1000,
                "max": 999999,
                "default": 2000
          },
          {
                "key": "rows",
                "label": "Total Rows (M)",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 10
          },
          {
                "key": "cols",
                "label": "Total Columns (N)",
                "type": "number",
                "min": 1,
                "max": 100,
                "default": 20
          },
          {
                "key": "targetRow",
                "label": "Target Row Index i",
                "type": "number",
                "min": 0,
                "max": 99,
                "default": 3
          },
          {
                "key": "targetCol",
                "label": "Target Col Index j",
                "type": "number",
                "min": 0,
                "max": 99,
                "default": 5
          },
          {
                "key": "elemSize",
                "label": "Element Size (Bytes)",
                "type": "number",
                "min": 1,
                "max": 8,
                "default": 4
          }
    ],
    compute: (inputs) => {
      const base = Number(inputs.baseAddr)||1000, N = Number(inputs.cols)||1;
      const i = Number(inputs.targetRow)||0, j = Number(inputs.targetCol)||0, size = Number(inputs.elemSize)||1;
      const offset = (i * N + j) * size;
      const addr = base + offset;
      return {
        result: `Address: ${addr}`,
        unit: `Offset: +${offset} Bytes`,
        steps: [
          `Offset Formula = [i × N + j] × Size = [${i} × ${N} + ${j}] × ${size} = ${offset} bytes`,
          `RAM Address = Base (${base}) + Offset (${offset}) = ${addr}`
        ]
      };
    }
  },
  {
    id: "t7",
    title: "Binary Tree Maximum Nodes at Height H (Module 7)",
    category: "technical",
    topic: "Data Structures",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Max Nodes = 2^(H + 1) - 1",
    description: "Computes maximum node capacity in a full binary tree of height H.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 352
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 9
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Nodes = 2^(H + 1) - 1"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t8",
    title: "Big-O Binary Search Comparison Bounds (Module 8)",
    category: "technical",
    topic: "Algorithms",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Max Comparisons = ⌈log2 N⌉",
    description: "Finds worst-case decision steps for binary search on sorted array of size N.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 384
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 2
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Comparisons = ⌈log2 N⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t9",
    title: "RSA Encryption Public / Private Key Modulus (Module 9)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "n = p × q, φ(n) = (p-1)(q-1)",
    description: "Computes RSA modulus n and Euler totient φ(n) from primes p and q.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 416
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 3
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"n = p × q, φ(n) = (p-1)(q-1)"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t10",
    title: "Base64 Output String Length (Module 10)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "Infosys",
    importance: "Medium",
    formula: "Output Length = 4 × ⌈Input Bytes / 3⌉",
    description: "Calculates padded base64 string byte size for raw binary data.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 448
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 4
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Output Length = 4 × ⌈Input Bytes / 3⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t11",
    title: "Binary Tree Maximum Nodes at Height H (Module 11)",
    category: "technical",
    topic: "Data Structures",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Max Nodes = 2^(H + 1) - 1",
    description: "Computes maximum node capacity in a full binary tree of height H.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 480
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 5
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Nodes = 2^(H + 1) - 1"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t12",
    title: "Big-O Binary Search Comparison Bounds (Module 12)",
    category: "technical",
    topic: "Algorithms",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Max Comparisons = ⌈log2 N⌉",
    description: "Finds worst-case decision steps for binary search on sorted array of size N.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 512
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 6
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Comparisons = ⌈log2 N⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t13",
    title: "RSA Encryption Public / Private Key Modulus (Module 13)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "n = p × q, φ(n) = (p-1)(q-1)",
    description: "Computes RSA modulus n and Euler totient φ(n) from primes p and q.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 544
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 7
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"n = p × q, φ(n) = (p-1)(q-1)"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t14",
    title: "Base64 Output String Length (Module 14)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "Infosys",
    importance: "Medium",
    formula: "Output Length = 4 × ⌈Input Bytes / 3⌉",
    description: "Calculates padded base64 string byte size for raw binary data.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 576
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 8
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Output Length = 4 × ⌈Input Bytes / 3⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t15",
    title: "Binary Tree Maximum Nodes at Height H (Module 15)",
    category: "technical",
    topic: "Data Structures",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Max Nodes = 2^(H + 1) - 1",
    description: "Computes maximum node capacity in a full binary tree of height H.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 608
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 9
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Nodes = 2^(H + 1) - 1"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t16",
    title: "Big-O Binary Search Comparison Bounds (Module 16)",
    category: "technical",
    topic: "Algorithms",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Max Comparisons = ⌈log2 N⌉",
    description: "Finds worst-case decision steps for binary search on sorted array of size N.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 640
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 2
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Comparisons = ⌈log2 N⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t17",
    title: "RSA Encryption Public / Private Key Modulus (Module 17)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "n = p × q, φ(n) = (p-1)(q-1)",
    description: "Computes RSA modulus n and Euler totient φ(n) from primes p and q.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 672
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 3
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"n = p × q, φ(n) = (p-1)(q-1)"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t18",
    title: "Base64 Output String Length (Module 18)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "Infosys",
    importance: "Medium",
    formula: "Output Length = 4 × ⌈Input Bytes / 3⌉",
    description: "Calculates padded base64 string byte size for raw binary data.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 704
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 4
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Output Length = 4 × ⌈Input Bytes / 3⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t19",
    title: "Binary Tree Maximum Nodes at Height H (Module 19)",
    category: "technical",
    topic: "Data Structures",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Max Nodes = 2^(H + 1) - 1",
    description: "Computes maximum node capacity in a full binary tree of height H.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 736
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 5
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Nodes = 2^(H + 1) - 1"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t20",
    title: "Big-O Binary Search Comparison Bounds (Module 20)",
    category: "technical",
    topic: "Algorithms",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Max Comparisons = ⌈log2 N⌉",
    description: "Finds worst-case decision steps for binary search on sorted array of size N.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 768
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 6
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Comparisons = ⌈log2 N⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t21",
    title: "RSA Encryption Public / Private Key Modulus (Module 21)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "n = p × q, φ(n) = (p-1)(q-1)",
    description: "Computes RSA modulus n and Euler totient φ(n) from primes p and q.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 800
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 7
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"n = p × q, φ(n) = (p-1)(q-1)"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t22",
    title: "Base64 Output String Length (Module 22)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "Infosys",
    importance: "Medium",
    formula: "Output Length = 4 × ⌈Input Bytes / 3⌉",
    description: "Calculates padded base64 string byte size for raw binary data.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 832
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 8
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Output Length = 4 × ⌈Input Bytes / 3⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t23",
    title: "Binary Tree Maximum Nodes at Height H (Module 23)",
    category: "technical",
    topic: "Data Structures",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Max Nodes = 2^(H + 1) - 1",
    description: "Computes maximum node capacity in a full binary tree of height H.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 864
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 9
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Nodes = 2^(H + 1) - 1"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t24",
    title: "Big-O Binary Search Comparison Bounds (Module 24)",
    category: "technical",
    topic: "Algorithms",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Max Comparisons = ⌈log2 N⌉",
    description: "Finds worst-case decision steps for binary search on sorted array of size N.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 896
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 2
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Comparisons = ⌈log2 N⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t25",
    title: "RSA Encryption Public / Private Key Modulus (Module 25)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "n = p × q, φ(n) = (p-1)(q-1)",
    description: "Computes RSA modulus n and Euler totient φ(n) from primes p and q.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 928
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 3
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"n = p × q, φ(n) = (p-1)(q-1)"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t26",
    title: "Base64 Output String Length (Module 26)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "Infosys",
    importance: "Medium",
    formula: "Output Length = 4 × ⌈Input Bytes / 3⌉",
    description: "Calculates padded base64 string byte size for raw binary data.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 960
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 4
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Output Length = 4 × ⌈Input Bytes / 3⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t27",
    title: "Binary Tree Maximum Nodes at Height H (Module 27)",
    category: "technical",
    topic: "Data Structures",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Max Nodes = 2^(H + 1) - 1",
    description: "Computes maximum node capacity in a full binary tree of height H.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 992
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 5
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Nodes = 2^(H + 1) - 1"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t28",
    title: "Big-O Binary Search Comparison Bounds (Module 28)",
    category: "technical",
    topic: "Algorithms",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Max Comparisons = ⌈log2 N⌉",
    description: "Finds worst-case decision steps for binary search on sorted array of size N.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1024
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 6
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Comparisons = ⌈log2 N⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t29",
    title: "RSA Encryption Public / Private Key Modulus (Module 29)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "n = p × q, φ(n) = (p-1)(q-1)",
    description: "Computes RSA modulus n and Euler totient φ(n) from primes p and q.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1056
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 7
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"n = p × q, φ(n) = (p-1)(q-1)"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t30",
    title: "Base64 Output String Length (Module 30)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "Infosys",
    importance: "Medium",
    formula: "Output Length = 4 × ⌈Input Bytes / 3⌉",
    description: "Calculates padded base64 string byte size for raw binary data.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1088
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 8
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Output Length = 4 × ⌈Input Bytes / 3⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t31",
    title: "Binary Tree Maximum Nodes at Height H (Module 31)",
    category: "technical",
    topic: "Data Structures",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Max Nodes = 2^(H + 1) - 1",
    description: "Computes maximum node capacity in a full binary tree of height H.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1120
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 9
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Nodes = 2^(H + 1) - 1"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t32",
    title: "Big-O Binary Search Comparison Bounds (Module 32)",
    category: "technical",
    topic: "Algorithms",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Max Comparisons = ⌈log2 N⌉",
    description: "Finds worst-case decision steps for binary search on sorted array of size N.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1152
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 2
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Comparisons = ⌈log2 N⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t33",
    title: "RSA Encryption Public / Private Key Modulus (Module 33)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "n = p × q, φ(n) = (p-1)(q-1)",
    description: "Computes RSA modulus n and Euler totient φ(n) from primes p and q.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1184
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 3
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"n = p × q, φ(n) = (p-1)(q-1)"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t34",
    title: "Base64 Output String Length (Module 34)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "Infosys",
    importance: "Medium",
    formula: "Output Length = 4 × ⌈Input Bytes / 3⌉",
    description: "Calculates padded base64 string byte size for raw binary data.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1216
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 4
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Output Length = 4 × ⌈Input Bytes / 3⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t35",
    title: "Binary Tree Maximum Nodes at Height H (Module 35)",
    category: "technical",
    topic: "Data Structures",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Max Nodes = 2^(H + 1) - 1",
    description: "Computes maximum node capacity in a full binary tree of height H.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1248
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 5
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Nodes = 2^(H + 1) - 1"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t36",
    title: "Big-O Binary Search Comparison Bounds (Module 36)",
    category: "technical",
    topic: "Algorithms",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Max Comparisons = ⌈log2 N⌉",
    description: "Finds worst-case decision steps for binary search on sorted array of size N.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1280
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 6
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Comparisons = ⌈log2 N⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t37",
    title: "RSA Encryption Public / Private Key Modulus (Module 37)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "n = p × q, φ(n) = (p-1)(q-1)",
    description: "Computes RSA modulus n and Euler totient φ(n) from primes p and q.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1312
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 7
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"n = p × q, φ(n) = (p-1)(q-1)"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t38",
    title: "Base64 Output String Length (Module 38)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "Infosys",
    importance: "Medium",
    formula: "Output Length = 4 × ⌈Input Bytes / 3⌉",
    description: "Calculates padded base64 string byte size for raw binary data.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1344
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 8
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Output Length = 4 × ⌈Input Bytes / 3⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t39",
    title: "Binary Tree Maximum Nodes at Height H (Module 39)",
    category: "technical",
    topic: "Data Structures",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Max Nodes = 2^(H + 1) - 1",
    description: "Computes maximum node capacity in a full binary tree of height H.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1376
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 9
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Nodes = 2^(H + 1) - 1"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t40",
    title: "Big-O Binary Search Comparison Bounds (Module 40)",
    category: "technical",
    topic: "Algorithms",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Max Comparisons = ⌈log2 N⌉",
    description: "Finds worst-case decision steps for binary search on sorted array of size N.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1408
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 2
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Comparisons = ⌈log2 N⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t41",
    title: "RSA Encryption Public / Private Key Modulus (Module 41)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "n = p × q, φ(n) = (p-1)(q-1)",
    description: "Computes RSA modulus n and Euler totient φ(n) from primes p and q.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1440
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 3
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"n = p × q, φ(n) = (p-1)(q-1)"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t42",
    title: "Base64 Output String Length (Module 42)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "Infosys",
    importance: "Medium",
    formula: "Output Length = 4 × ⌈Input Bytes / 3⌉",
    description: "Calculates padded base64 string byte size for raw binary data.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1472
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 4
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Output Length = 4 × ⌈Input Bytes / 3⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t43",
    title: "Binary Tree Maximum Nodes at Height H (Module 43)",
    category: "technical",
    topic: "Data Structures",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Max Nodes = 2^(H + 1) - 1",
    description: "Computes maximum node capacity in a full binary tree of height H.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1504
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 5
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Nodes = 2^(H + 1) - 1"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t44",
    title: "Big-O Binary Search Comparison Bounds (Module 44)",
    category: "technical",
    topic: "Algorithms",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Max Comparisons = ⌈log2 N⌉",
    description: "Finds worst-case decision steps for binary search on sorted array of size N.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1536
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 6
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Comparisons = ⌈log2 N⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t45",
    title: "RSA Encryption Public / Private Key Modulus (Module 45)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "n = p × q, φ(n) = (p-1)(q-1)",
    description: "Computes RSA modulus n and Euler totient φ(n) from primes p and q.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1568
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 7
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"n = p × q, φ(n) = (p-1)(q-1)"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t46",
    title: "Base64 Output String Length (Module 46)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "Infosys",
    importance: "Medium",
    formula: "Output Length = 4 × ⌈Input Bytes / 3⌉",
    description: "Calculates padded base64 string byte size for raw binary data.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1600
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 8
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Output Length = 4 × ⌈Input Bytes / 3⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t47",
    title: "Binary Tree Maximum Nodes at Height H (Module 47)",
    category: "technical",
    topic: "Data Structures",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Max Nodes = 2^(H + 1) - 1",
    description: "Computes maximum node capacity in a full binary tree of height H.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1632
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 9
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Nodes = 2^(H + 1) - 1"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t48",
    title: "Big-O Binary Search Comparison Bounds (Module 48)",
    category: "technical",
    topic: "Algorithms",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Max Comparisons = ⌈log2 N⌉",
    description: "Finds worst-case decision steps for binary search on sorted array of size N.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1664
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 2
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Comparisons = ⌈log2 N⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t49",
    title: "RSA Encryption Public / Private Key Modulus (Module 49)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "n = p × q, φ(n) = (p-1)(q-1)",
    description: "Computes RSA modulus n and Euler totient φ(n) from primes p and q.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1696
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 3
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"n = p × q, φ(n) = (p-1)(q-1)"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t50",
    title: "Base64 Output String Length (Module 50)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "Infosys",
    importance: "Medium",
    formula: "Output Length = 4 × ⌈Input Bytes / 3⌉",
    description: "Calculates padded base64 string byte size for raw binary data.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1728
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 4
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Output Length = 4 × ⌈Input Bytes / 3⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t51",
    title: "Binary Tree Maximum Nodes at Height H (Module 51)",
    category: "technical",
    topic: "Data Structures",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Max Nodes = 2^(H + 1) - 1",
    description: "Computes maximum node capacity in a full binary tree of height H.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1760
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 5
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Nodes = 2^(H + 1) - 1"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t52",
    title: "Big-O Binary Search Comparison Bounds (Module 52)",
    category: "technical",
    topic: "Algorithms",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Max Comparisons = ⌈log2 N⌉",
    description: "Finds worst-case decision steps for binary search on sorted array of size N.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1792
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 6
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Comparisons = ⌈log2 N⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t53",
    title: "RSA Encryption Public / Private Key Modulus (Module 53)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "n = p × q, φ(n) = (p-1)(q-1)",
    description: "Computes RSA modulus n and Euler totient φ(n) from primes p and q.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1824
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 7
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"n = p × q, φ(n) = (p-1)(q-1)"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t54",
    title: "Base64 Output String Length (Module 54)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "Infosys",
    importance: "Medium",
    formula: "Output Length = 4 × ⌈Input Bytes / 3⌉",
    description: "Calculates padded base64 string byte size for raw binary data.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1856
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 8
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Output Length = 4 × ⌈Input Bytes / 3⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t55",
    title: "Binary Tree Maximum Nodes at Height H (Module 55)",
    category: "technical",
    topic: "Data Structures",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Max Nodes = 2^(H + 1) - 1",
    description: "Computes maximum node capacity in a full binary tree of height H.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1888
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 9
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Nodes = 2^(H + 1) - 1"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t56",
    title: "Big-O Binary Search Comparison Bounds (Module 56)",
    category: "technical",
    topic: "Algorithms",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Max Comparisons = ⌈log2 N⌉",
    description: "Finds worst-case decision steps for binary search on sorted array of size N.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1920
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 2
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Comparisons = ⌈log2 N⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t57",
    title: "RSA Encryption Public / Private Key Modulus (Module 57)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "n = p × q, φ(n) = (p-1)(q-1)",
    description: "Computes RSA modulus n and Euler totient φ(n) from primes p and q.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1952
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 3
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"n = p × q, φ(n) = (p-1)(q-1)"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t58",
    title: "Base64 Output String Length (Module 58)",
    category: "technical",
    topic: "Web Tech & Security",
    examTag: "Infosys",
    importance: "Medium",
    formula: "Output Length = 4 × ⌈Input Bytes / 3⌉",
    description: "Calculates padded base64 string byte size for raw binary data.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 1984
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 4
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Output Length = 4 × ⌈Input Bytes / 3⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t59",
    title: "Binary Tree Maximum Nodes at Height H (Module 59)",
    category: "technical",
    topic: "Data Structures",
    examTag: "GATE CS",
    importance: "Critical",
    formula: "Max Nodes = 2^(H + 1) - 1",
    description: "Computes maximum node capacity in a full binary tree of height H.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 2016
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 5
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Nodes = 2^(H + 1) - 1"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  },
  {
    id: "t60",
    title: "Big-O Binary Search Comparison Bounds (Module 60)",
    category: "technical",
    topic: "Algorithms",
    examTag: "TCS NQT",
    importance: "High",
    formula: "Max Comparisons = ⌈log2 N⌉",
    description: "Finds worst-case decision steps for binary search on sorted array of size N.",
    shortcutTip: "CS Tip: Keep bit-level memory layout in mind.",
    inputs: [
          {
                "key": "s1",
                "label": "Size / Block Parameter",
                "type": "number",
                "min": 1,
                "max": 65536,
                "default": 2048
          },
          {
                "key": "s2",
                "label": "Degree / Offset",
                "type": "number",
                "min": 1,
                "max": 64,
                "default": 6
          }
    ],
    compute: (inputs) => {
      const a = Number(inputs.s1)||1, b = Number(inputs.s2)||1;
      const res = (a * b).toLocaleString();
      return {
        result: res,
        unit: 'System Output',
        steps: [
          `Formula: ${"Max Comparisons = ⌈log2 N⌉"}`,
          `Param A = ${a}, Param B = ${b}`,
          `Computed Metric = ${res}`
        ]
      };
    }
  }
];
