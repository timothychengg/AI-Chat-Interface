# Laer Health AI Chat Interface 💬🩺

A modern, responsive ChatGPT-style interface built as a take-home project for Laer Health. This interface simulates how healthcare providers might interact with AI tools in clinical and non-clinical workflows.

---

## 🚀 Features

- ✅ **Responsive UI** for both desktop and mobile
- ✅ **Conversation topic selector** for healthcare use cases
- ✅ **Chat interface** with clean user/AI message components
- ✅ **Voice input** via Web Speech API 🎤
- ✅ **File upload support** (.txt, .pdf, .docx)
- ✅ **Typing/loading indicator**
- ✅ **Persistent chat memory** using `localStorage`
- ✅ **Export chat to TXT and PDF**
- ✅ **Reset and clear chat history**
- ✅ **Back button** to return to topic selection
- ✅ **Smooth, intuitive UX with Tailwind styling**

---

## 🧠 Architecture

- **React (with Next.js Pages Router)** — Modular component-based UI
- **Component Breakdown:**
  - `TopicSelector`: Conversation topic grid
  - `ChatWindow`: Main chat UI with header, export/reset, file input
  - `MessageBubble`: Reusable message display
  - `MessageInput`: Input box with voice input and send
  - `LoadingIndicator`: Typing animation
- **State Management:** Local component state + `useEffect` hooks
- **Persistence:** `localStorage` used to store chat history by topic
- **Mocked AI Response:** Simulated with `setTimeout()` for async feel

---

## 🧪 Optional Unit Tests

This version focuses on frontend behavior — tests can easily be added using `Jest` and `React Testing Library`.

Suggested test coverage:

- `MessageBubble`: Renders sender and message
- `TopicSelector`: Triggers topic selection
- `MessageInput`: Submits and updates state correctly

---

## 📦 Tech Stack

| Tool                    | Usage                   |
| ----------------------- | ----------------------- |
| **React / Next.js**     | Framework and rendering |
| **Tailwind CSS**        | Styling and layout      |
| **html2canvas + jsPDF** | Export chat as PDF      |
| **Web Speech API**      | Voice input             |
| **LocalStorage**        | Chat memory per topic   |
| **React Icons**         | Clean icons for buttons |

---

## 🛠 Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/AI-Chat-Interface.git
cd AI-Chat-Interface

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## 🧑‍⚕️ Use Case Context

This application is designed to simulate how healthcare providers can interact with AI-based tools within clinical workflows.

It supports use cases like:

- Uploading lab results or patient notes for AI summarization
- Asking symptom-related or medication questions
- Exploring mental health or chronic condition management

Each interaction happens inside a chat interface that feels intuitive, friendly, and accessible across devices.

---

## 📁 Project Structure

```bash
├── components/
│   ├── ChatWindow.js       # Main chat screen
│   ├── MessageInput.js     # Input bar with voice + send
│   ├── MessageBubble.js    # User + AI message styling
│   ├── LoadingIndicator.js # AI typing animation
│   └── TopicSelector.js    # Pre-chat topic selection UI
│
├── services/
│   └── storage.js          # localStorage-based memory
│
├── pages/
│   └── index.js            # Next.js main route
│
├── public/
├── styles/
├── README.md
└── package.json

```
