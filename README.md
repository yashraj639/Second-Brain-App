<div align="center">

<br/>

# 🧠 Second Brain

**Your personal knowledge hub — save, organise, and share everything that matters.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## ✨ What is Second Brain?

Second Brain is a full-stack personal knowledge management app inspired by the idea of an external memory system. Capture tweets, YouTube videos, articles, documents, and links — then organise them with tags and instantly share your entire collection with anyone via a unique public link.

> _"Your mind is for having ideas, not holding them."_ — David Allen

---

## 🚀 Features

| Feature                     | Description                                                                      |
| --------------------------- | -------------------------------------------------------------------------------- |
| 📌 **Multi-type Content**   | Save tweets, YouTube videos, web links, articles, and documents all in one place |
| 🏷️ **Tag Organisation**     | Categorise your saved items with flexible tags for easy filtering                |
| 🔗 **Link Previews**        | Automatic metadata scraping (title, description, image) for saved URLs           |
| 📺 **YouTube Thumbnails**   | Auto-fetched thumbnails for YouTube content                                      |
| 🐦 **Embedded Tweets**      | Native Twitter embed rendering directly in cards                                 |
| 🌐 **Public Brain Sharing** | Generate a shareable link so anyone can browse your brain (read-only)            |
| 🔐 **JWT Authentication**   | Secure sign-up / sign-in with cookie-based JWT sessions                          |
| ⚡ **Smooth Animations**    | Fluid UI transitions powered by Motion (Framer Motion)                           |
| 📱 **Responsive Layout**    | Works great on desktop and mobile with a sidebar + dashboard grid                |
| ✏️ **Full CRUD**            | Create, view, edit, and delete content items with ease                           |

---

## 🏗️ Tech Stack

### Frontend

- **React 19** + **TypeScript** — component-driven UI
- **Vite 7** — lightning-fast dev server and builds
- **Tailwind CSS 4** — utility-first styling
- **Motion (Framer Motion)** — page and card animations
- **Jotai** — atomic global state management
- **React Router v7** — client-side routing
- **Axios** — HTTP client

### Backend

- **Express 5** + **TypeScript** — REST API server
- **MongoDB** + **Mongoose 9** — document database
- **JWT** + **bcrypt** — authentication & password hashing
- **Zod** — request validation
- **cookie-parser** + **cors** — middleware

---

## 📁 Project Structure

```
Second Brain app/
├── frontend/                  # Vite + React app
│   └── src/
│       ├── components/
│       │   ├── auth/          # Signin & Signup screens
│       │   ├── content/       # ContentCard, ContentList, Modals, PublicBrain
│       │   ├── hooks/         # Jotai atoms, useContent hook, init state
│       │   └── layouts/       # Header, Sidebar, Dashboard, HomePage
│       ├── icons/             # SVG icon components
│       ├── App.tsx            # Route definitions
│       └── config.ts          # Backend URL config
│
└── backend/                   # Express REST API
    └── src/
        ├── controllers/       # auth, content, link controllers
        ├── models/            # User, Content, Tag, Link, Share, Hash models
        ├── routes/            # Auth, content, link routes
        ├── middleware/        # JWT auth, Zod validation
        └── index.ts           # Server entry point
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js ≥ 18
- A MongoDB connection string (local or [Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repository

```bash
git clone https://github.com/yashraj639/Second-Brain-App.git
cd "Second Brain app"
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=3000
```

Start the backend:

```bash
npm run dev
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
```

Update `src/config.ts` to point to your backend URL if needed:

```ts
export const BACKEND_URL = "http://localhost:3000";
```

Start the frontend:

```bash
npm run dev
```

The app will be live at **http://localhost:5173** 🎉

---

## 🔌 API Overview

### Auth

| Method | Endpoint           | Description                      |
| ------ | ------------------ | -------------------------------- |
| `POST` | `/api/auth/signup` | Register a new user              |
| `POST` | `/api/auth/signin` | Sign in and receive a JWT cookie |

### Content _(requires auth)_

| Method   | Endpoint                  | Description                            |
| -------- | ------------------------- | -------------------------------------- |
| `GET`    | `/api/content/fetch`      | Get all content for the logged-in user |
| `GET`    | `/api/content/fetch/:id`  | Get a single content item              |
| `POST`   | `/api/content/create`     | Save new content                       |
| `PUT`    | `/api/content/update/:id` | Update an existing item                |
| `DELETE` | `/api/content/delete/:id` | Delete a content item                  |

### Public Brain

| Method | Endpoint           | Description                         |
| ------ | ------------------ | ----------------------------------- |
| `GET`  | `/api/brain/:hash` | View a user's publicly shared brain |
| `POST` | `/api/link/share`  | Generate a public share link        |

---

## 📦 Supported Content Types

- 🐦 **Tweet** — native Twitter/X embeds
- 📺 **YouTube** — auto-fetched video thumbnails
- 🔗 **Link** — rich link previews with OG metadata
- 📄 **Document** — store and view document notes
- 📝 **Article / Note / Image / Audio / Video** — flexible content taxonomy

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/yashraj639">Yashraj Yadav</a>
</div>
