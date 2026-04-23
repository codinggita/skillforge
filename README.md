# SkillForge

![SkillForge Banner](https://via.placeholder.com/1200x300/111827/4F46E5?text=SkillForge+-+AI+Powered+Developer+Practice+Platform)

**SkillForge** is an AI-powered coding practice platform designed to elevate your developer skills. Think of it as a next-generation LeetCode tailored for real-world projects, complete with comprehensive AI code reviews, dynamic radar charts, persistent heatmaps, and a gamified badge system.

## 🌟 Project Overview

Traditional coding platforms tell you if your code passed test cases, but they rarely tell you *why* your code could be better. SkillForge bridges this gap by integrating a powerful AI Review Engine (powered by Groq/LLaMa or OpenAI) that analyses every submission across five distinct dimensions:
- **🐛 Debugging**
- **🧩 Problem Solving**
- **✨ Code Quality**
- **⚡ Time Management**
- **🧠 Concept Application**

Your submissions directly impact your dynamic Skill Profile, powering GitHub-style activity heatmaps, Recharts-based progression timelines, and automatic badge unlocking.

## 🎨 Design & Prototyping

Our UI/UX was carefully crafted to provide a seamless, dark-themed, glassmorphic developer experience.

🔗 **[View our Figma Design Prototype](https://www.figma.com/design/r0FXl8bdIhHJNCmObqBv2T/Untitled?node-id=0-1&t=zpJswdv6oYGcezGR-1)**

## 🛠 Tech Stack

### Frontend
- **React 19** + **Vite 8**
- **Tailwind CSS v4** (Utility-first styling + Custom Glassmorphism UI)
- **Monaco Editor** (`@monaco-editor/react` for the embedded VSCode-like IDE experience)
- **Recharts** (Radar charts and area charts for analytics)
- **React Router v7** (Client-side routing)
- **React Hot Toast** (Notifications)

### Backend
- **Node.js 22** + **Express 5**
- **MongoDB** / **Mongoose** (Data persistence)
- **JWT** (`jsonwebtoken`) + `bcryptjs` (Secure Authentication)
- **express-validator** (Request sanitisation)
- **Groq SDK / OpenAI API** (AI Review Engine)

---

## 📂 Folder Structure

```text
SkillForge/
├── client/                 # Frontend React Application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context (AuthContext, etc.)
│   │   ├── pages/          # Main application pages
│   │   ├── index.css       # Tailwind CSS entry point
│   │   └── main.jsx        # App entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Backend Node.js/Express API
│   ├── controllers/        # Request handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routes
│   ├── utils/              # Utility functions (AI Reviewer, etc.)
│   ├── server.js           # Server entry point
│   ├── seed.js             # Database seeder
│   └── package.json
└── README.md
```

---

## 🚀 How to Run Locally

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/skillforge.git
cd skillforge
\`\`\`

### 2. Configure Environment Variables
Create a \`.env\` file in the \`server/\` directories. See the **Environment Variables** section below.

### 3. Install Dependencies
Install packages for both the server and the client.

\`\`\`bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
\`\`\`

### 4. Seed the Database
SkillForge comes with a powerful seed script that injects 10 real-world projects of varying difficulties into your MongoDB so you can test immediately.

\`\`\`bash
cd server
npm run seed
\`\`\`
*(A test account will automatically be created: `seed@skillforge.dev` / `Seed@1234`)*

### 5. Start the Application
You will need two terminal windows to run the frontend and backend simultaneously.

**Terminal 1 (Backend):**
\`\`\`bash
cd server
npm run dev
# Runs on http://localhost:3000
\`\`\`

**Terminal 2 (Frontend):**
\`\`\`bash
cd client
npm run dev
# Runs on http://localhost:5173
\`\`\`

---

## 🔑 Environment Variables

### `server/.env`
Create this file in the `server` directory.

\`\`\`env
# Node Environment
NODE_ENV=development
PORT=3000

# MongoDB URI (Use local MongoDB or MongoDB Atlas)
MONGODB_URI=mongodb://127.0.0.1:27017/skillforge

# Security
JWT_SECRET=your_super_secret_jwt_string_change_me_in_prod
JWT_EXPIRE=30d

# AI API Keys (Use Groq for LLaMA 3 or standard OpenAI)
GROQ_API_KEY=gsk_your_groq_api_key_here
# OPENAI_API_KEY=sk-your_openai_key_here (if you prefer OpenAI)
\`\`\`

---

## 📡 API Endpoints

### Authentication `/api/auth`
- `POST /register` — Register a new developer account.
- `POST /login` — Authenticate and receive a JWT.
- `GET  /me` — Retrieve current securely logged-in user profile.

### Projects `/api/projects`
- `GET  /` — Fetch all projects (Supports `?page=`, `?limit=`, `?search=`, `?difficulty=`).
- `GET  /:id` — Fetch detailed starter code and task list for a specific project.
- `POST /` — Create a new project (Instructors/Admins only).

### Submissions `/api/submissions`
- `POST /` — Submit code from the IDE. Responds with `202 Accepted` to initiate async AI reviewing.
- `GET  /:id/status` — Polling endpoint to check if the AI review is complete.
- `GET  /me` — Retrieve a history of all personal submissions.

### Analytics `/api/analytics`
- `GET /skillscore` — Retrieves aggregated dimension scores for the Radar Chart.
- `GET /progress` — Timeline progression data for the Area Chart.
- `GET /badges` — Arrays of currently earned vs locked achievements.
- `GET /streak` — 60-day heatmap data and streak arrays.

---

## 📸 Screenshots

*(Add screenshots of your application here once deployed)*

### Dashboard (Radar Chart & Badges)
![Dashboard Overview Placeholder](https://via.placeholder.com/800x400/111827/4F46E5?text=SkillForge+Dashboard)

### The Project Room (Monaco Editor & Sliding AI Panel)
![Project IDE Placeholder](https://via.placeholder.com/800x400/111827/4F46E5?text=SkillForge+Project+Room)

### Developer Skill Report (Heatmap & Trends)
![Skill Report Placeholder](https://via.placeholder.com/800x400/111827/4F46E5?text=SkillForge+Analytics+Report)

---

## 🗺️ Roadmap & Steps

- [x] **Phase 1: Foundation**
  - Setup React + Vite frontend and Node.js + Express backend.
  - Implement MongoDB database schema.
  - Create secure JWT authentication system.
- [x] **Phase 2: Core Features**
  - Build the Project Room with Monaco Editor integration.
  - Integrate Groq SDK / OpenAI API for the AI Review Engine.
  - Implement submission handling and scoring algorithm.
- [ ] **Phase 3: Analytics & Gamification**
  - Develop dynamic radar charts and activity heatmaps.
  - Implement the badge and achievement system.
  - Create detailed developer skill reports.
- [ ] **Phase 4: Community & Expansion**
  - Add leaderboards and friend systems.
  - Support for multiple programming languages.
  - Implement instructor dashboards for custom project creation.

---

**Built with ❤️ for developers who never stop learning.**
