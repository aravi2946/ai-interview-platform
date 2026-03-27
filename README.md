# 🤖 HIRE.AI — AI-Powered Mock Interview Platform

> Practice smarter. Get hired faster.

HIRE.AI is a full-stack web application that simulates real job interviews using AI. It generates role-specific questions, evaluates your responses in real time, and gives you actionable feedback — so you can walk into any interview with confidence.

---

## ✨ Features

- 🎯 **Role-Based Interview Simulation** — Generates relevant questions based on your target job role and experience level
- 🧠 **AI-Powered Feedback** — Evaluates answers using LLaMA 3 (via Groq SDK) and provides detailed, constructive feedback
- 💬 **Conversational Interview Flow** — Multi-turn AI conversation that mimics a real interviewer
- 🔐 **Authentication** — Secure login via Email/Password or Google OAuth2
- 📊 **Interview History** — View past sessions, scores, and improvement over time
- 📱 **Responsive UI** — Clean, mobile-friendly interface built with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Frontend     | React, Tailwind CSS, Axios           |
| Backend      | Node.js, Express.js (MVC pattern)    |
| Database     | MongoDB, Mongoose                    |
| AI           | Groq SDK (LLaMA 3)                   |
| Auth         | Passport.js, Google OAuth2, JWT, bcrypt |

---

## 📁 Project Structure

```
hire-ai/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level pages
│   │   ├── context/         # AuthContext and global state
│   │   └── utils/           # Axios instance, helpers
│   └── .env
│
├── server/                  # Express backend
│   ├── controllers/         # Route logic
│   ├── models/              # Mongoose schemas (User, Interview)
│   ├── routes/              # API route definitions
│   ├── middleware/          # JWT auth middleware
│   └── .env
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Groq API Key
- Google OAuth2 credentials

### 1. Clone the repository

```bash
git clone https://github.com/your-username/hire-ai.git
cd hire-ai
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### 3. Setup the Frontend

```bash
cd client
npm install
```

Create a `.env` file in `/client`:

```env
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 🔑 Authentication Flow

- **Email/Password** — Register and login with JWT-based session management
- **Google OAuth2** — One-click login via Passport.js, redirects back to the dashboard on success

---

## 🧩 How It Works

1. User logs in and selects a job role and difficulty level
2. The AI generates an opening interview question
3. User types their response; the full conversation history is sent to Groq on each turn
4. The AI responds as an interviewer — asking follow-ups or moving to the next topic
5. At the end of the session, feedback and a score are generated and saved to MongoDB

---

## 📌 Roadmap

- [ ] Voice input support (Speech-to-Text)
- [ ] Resume upload for personalized question generation
- [ ] Performance analytics dashboard
- [ ] Peer mock interview (live multiplayer mode)
- [ ] Export interview report as PDF

---

## 🙋‍♂️ Author

**Aravind** — CSE Prefinal Year @ Pace Institute of Technology and Sciences  
[LinkedIn](https://linkedin.com/in/your-profile) · [GitHub](https://github.com/your-username)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
