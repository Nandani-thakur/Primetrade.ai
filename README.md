# Task 

---

## Features

- User registration and login with JWT authentication.
- Role-based access control (Admin/User).
- Users can create tasks and view their own tasks.
- Admin can view, edit, and delete all tasks.
- Frontend built with React.
- Backend built with Node.js and Express.
- MongoDB database for task storage.
- API requests secured with JWT.
- Error handling for 400, 401, 403, and 500 status codes.
- `.env` for sensitive credentials.
- `node_modules` ignored in Git.

---

## Technologies Used

- **Frontend:** React, Axios, CSS
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas
- **Authentication:** JSON Web Tokens (JWT)

---

## Folder Structure


backend
│
├── config
│   └── db.js
│
├── models
│   ├── User.js
│   └── Task.js
│
├── middleware
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── controllers
│   ├── authController.js
│   └── taskController.js
│
├── routes
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── swagger.js
├── app.js
├── server.js
└── package.json

frontend
│
├── public
│
├── src
│   │
│   ├── components
│   │   └── Navbar.jsx
│   │
│   ├── pages
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── services
│   │   └── api.js
│   │
│   ├── utils
│   │   └── auth.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│  
│
├── package.json
└── vite.config.js




---

## Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/Nandani-thakur/Primetrade.ai
cd repo-folder
2. Backend Setup
cd backend
npm install

Create .env file in backend/:

PORT=5000
MONGO_URI="mongodb-uri"

Start backend server:

nodemon server.js

Backend runs on http://localhost:5000

3. Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on http://localhost:5173



