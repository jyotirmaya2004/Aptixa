# Aptixa Placement Hub 🚀

[![Live App](https://img.shields.io/badge/Live_App-aptixa.vercel.app-2563eb?style=for-the-badge&logo=vercel&logoColor=white)](https://aptixa.vercel.app)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

**Aptixa** is an all-in-one, mobile-first Placement Preparation & Quiz Platform designed to empower students and job aspirants preparing for campus placements, competitive exams (Bank PO, SSC, CAT, GATE, Railways), and technical interviews.

🌐 **Live Deployment:** [https://aptixa.vercel.app](https://aptixa.vercel.app)

---

## 🌟 Key Highlights & Curriculum Coverage

### 📚 Complete R.S. Aggarwal Quantitative Aptitude Integration
Aptixa features a comprehensive digital integration of **R.S. Aggarwal's Quantitative Aptitude** textbook — covering **39 chapters** and **4,060+ objective-type questions**, complete with verified answer keys, detailed explanations, and formulas.

| Chapter # | Chapter Title | Questions | Chapter # | Chapter Title | Questions |
|---|---|---|---|---|---|
| **Ch 01** | Number System | 380 | **Ch 21** | Surds and Indices | 94 |
| **Ch 02** | H.C.F. & L.C.M. | 120 | **Ch 22** | Logarithms | 80 |
| **Ch 03** | Decimal Fractions | 175 | **Ch 23** | Area | 76 |
| **Ch 04** | Simplification | 260 | **Ch 24** | Volume & Surface Area | 40 |
| **Ch 05** | Square Roots & Cube Roots | 165 | **Ch 25** | Races & Games of Skill | 25 |
| **Ch 06** | Average | 140 | **Ch 26** | Races & Games (Ex II) | 39 |
| **Ch 07** | Problems on Numbers | 145 | **Ch 27** | Calendar | 18 |
| **Ch 08** | Problems on Ages | 70 | **Ch 28** | Clocks | 54 |
| **Ch 09** | Surds and Indices | 94 | **Ch 29** | Stocks & Shares | 29 |
| **Ch 10** | Percentage | 390 | **Ch 30** | Permutations & Combinations | 48 |
| **Ch 11** | Profit and Loss | 340 | **Ch 31** | Probability | 50 |
| **Ch 12** | Ratio and Proportion | 350 | **Ch 32** | True Discount | 21 |
| **Ch 13** | Partnership | 130 | **Ch 33** | Banker's Discount | 13 |
| **Ch 14** | Chain Rule | 100 | **Ch 34** | Heights and Distances | 18 |
| **Ch 15** | Pipes and Cisterns | 80 | **Ch 35** | Odd Man Out & Series | 81 |
| **Ch 16** | Time and Work | 180 | **Ch 36** | Tabulation | 25 |
| **Ch 17** | Problems on Trains | 95 | **Ch 37** | Bar Graphs | 31 |
| **Ch 18** | Time and Distance | 191 | **Ch 38** | Pie Chart | 29 |
| **Ch 19** | Boats and Streams | 36 | **Ch 39** | Line Graphs | 28 |
| **Ch 20** | Alligation or Mixture | 70 | **Total** | **39 Chapters** | **4,060 Questions** |

---

### 💡 Core Features

1. **⚡ Interactive Quiz Engine**:
   - Compact, single-screen question layout optimized for mobile screens (360px–490px) and desktops.
   - Question Palette, Timer, Bookmark, Skip/Submit features, and instant score breakdowns.

2. **📖 Book Library & Study Hub**:
   - Browse digital chapters with real-time progress indicators.
   - Instant filtering, searching, and chapter bookmarking.

3. **🎯 Interview Preparation Module**:
   - Comprehensive technical, HR, System Design, and Behavioral interview question banks.
   - Ideal answer templates, key takeaways, and interviewer perspective guides.

4. **📐 Formula Bank & Cheat Sheets**:
   - Topic-wise formula sheets with dynamic SVG diagrams.
   - Instant search and quick-reference cards for fast revision.

5. **🗣️ Spoken English & Communication Skills**:
   - Daily practice exercises, grammar cheat sheets, common mispronunciations, and vocabulary drills.

6. **📱 Progressive Web App (PWA) & Offline Sync**:
   - Fast data synchronization from backend datasets (`scripts/sync-data.js`).
   - LocalStorage persistence for user attempts, bookmarks, and configuration settings.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8, Lucide React Icons, Canvas Confetti
- **Styling**: Custom CSS Design System, Responsive Glassmorphic UI, Light/Dark Modes
- **Backend & Data**: Node.js, Express, Vercel Serverless Functions (`/api/index.js`)
- **Build & Deployment**: Vite, npm, Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm (v9.x or higher)

### Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jyotirmaya2004/Aptixa.git
   cd Aptixa
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Sync Data Files**:
   ```bash
   npm run sync
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The application will run locally at `http://localhost:5173`.

5. **Production Build**:
   ```bash
   npm run build
   ```

---

## 📁 Directory Structure

```text
PLACEMENT/
├── api/                   # Vercel Serverless API Functions
│   └── index.js           # Express API Server entry point
├── client/                # React Frontend Application
│   ├── public/            # Public assets & static data datasets
│   │   └── data/          # Synced JSON datasets (R.S. Aggarwal, etc.)
│   ├── src/               # React Source Code
│   │   ├── components/    # UI Components (Quiz, Books, Interview, Formulas, etc.)
│   │   ├── data/          # Client static registries (booksData.js, etc.)
│   │   └── utils/         # Helper functions, timers, and API clients
│   └── package.json       # Client dependencies
├── server/                # Backend data source directory
│   └── data/              # Source-of-truth JSON datasets
├── scripts/               # Utility Scripts
│   └── sync-data.js       # Data synchronization script (Server -> Client)
├── package.json           # Root package configuration
├── vercel.json            # Vercel deployment routes configuration
└── README.md              # Project documentation
```

---

## 🌐 Deployment

The platform is deployed on **Vercel** with automated builds on git pushes.

- **Production URL**: [https://aptixa.vercel.app](https://aptixa.vercel.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
