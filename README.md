# Task Manager – Full-Stack Task Management

A small, intuitive full-stack application to manage tasks with categories, including features like task completion, filtering, and Undo notifications.

---

## 📋 Project Description

Task Manager is a full-stack application built with **Next.js frontend** and **NestJS backend**. It allows users to:

* Create tasks with a category
* View tasks and their status (done / not done)
* Mark tasks as completed
* Delete tasks
* Filter tasks by category
* Undo deletions or completions via snackbar notifications
* Enforce a maximum of 5 tasks per category

---

## ✨ Features

* 📝 **Display tasks** – View tasks with text, category, and status
* ➕ **Create tasks** – Add new tasks via a form
* ✅ **Mark as completed** – Mark tasks done with a checkbox
* 🗑️ **Delete tasks** – Remove tasks with Undo support
* 🔄 **Undo actions** – Snackbar notification for undoing deletions or completions (5 seconds)
* 🎯 **Category filtering** – Show tasks by selected category or all tasks
* ⚠️ **Task limit per category** – Backend enforces max 5 tasks per category
* ⏳ **Loading, error, and empty states** – UX-friendly visual feedback

---

## 🏗️ Architecture

* **Frontend:** Next.js + TypeScript + React Hook Form + Axios + MUI (or TailwindCSS)
* **Backend:** NestJS + Prisma + SQLite
* **Database:** SQLite (`dev.db`)

---

## 🐳 Running with Docker

If you already have Docker and `docker-compose.yml`, you can quickly run the app using Docker.

### Prerequisites

* Docker
* Docker Compose

### Steps

1. Navigate to project root:

```bash
cd path/to/project
```

2. Start services:

```bash
docker-compose up -d
```

3. Access the app:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:5000](http://localhost:5000)

4. Stop services:

```bash
docker-compose down
```

**Notes:**

* Make sure `.env` files exist in both `frontend/` and `backend/` folders.
* Code changes will reflect automatically if volumes are configured in `docker-compose.yml`.

---

## 🛠️ Manual Development Setup

### Prerequisites

* Node.js v16+
* npm or yarn

### Backend Setup (NestJS + Prisma)

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
PORT=5000
DATABASE_URL="file:./dev.db"
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start backend server:

```bash
npm run start:dev
```

### Frontend Setup

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start frontend server:

```bash
npm run dev
```

---

## 📦 Project Structure

```
task-manager/
├── docker-compose.yml
├── frontend/          # Next.js frontend
│   ├── .env
│   ├── package.json
│   └── src/
├── backend/           # NestJS backend
│   ├── .env
│   ├── package.json
│   ├── prisma/
│   └── src/
└── README.md
```

---

## 💻 Usage

**Creating a Task:**

1. Enter task text
2. Select a category
3. Submit form

**Managing Tasks:**

* Mark as done with checkbox
* Delete task with Undo support via snackbar
* Filter tasks by category
* View task list updates in real-time

---

## 🛠️ Technologies

* **Frontend:** Next.js, React, TypeScript, React Hook Form, Axios, MUI / TailwindCSS
* **Backend:** NestJS, Prisma ORM
* **Database:** SQLite
* **Containerization:** Docker, Docker Compose

---

## 🤖 AI Usage Notes

During development, AI was used for the following purposes:

1. **Code Structuring & Suggestions:**
   Helped with organizing backend and frontend folder structure, and suggested improvements for NestJS controllers and services.

2. **Task Handling Logic:**
   Assisted in designing Undo functionality with transient notifications (snackbar) for both deletions and completions.

3. **Clarifications & Guidance:**
   Provided advice on best practices for React Hook Form integration, Axios requests, and Docker setup.

**AI was used to speed up problem-solving and improve code clarity**, but all core logic, architecture decisions, and implementation were developed and verified manually.


---

## 👤 Author

**RandomIv**
GitHub: [@RandomIv](https://github.com/RandomIv)

