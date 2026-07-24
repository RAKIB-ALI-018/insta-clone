# Insta Clone

A full-stack Instagram clone built with the MERN stack, created as a hands-on learning project to practice authentication, file uploads, database relationships, and deployment.

**Live Demo:** [insta-clone-dsk9.onrender.com](https://insta-clone-dsk9.onrender.com)

> **Note:** The UI is currently built and tested for desktop only. It is not responsive on mobile devices yet.

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- SCSS for styling
- Axios for API calls

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JWT (JSON Web Tokens) for authentication, stored in HTTP-only cookies
- bcryptjs for password hashing
- Multer for handling file uploads
- ImageKit for image storage and delivery

**Deployment**
- Render (single web service serving both the built React frontend and the Express backend)

---

## Features Implemented

- **Authentication**
  - User registration and login
  - Passwords hashed with bcrypt
  - JWT-based sessions stored in secure, HTTP-only cookies
  - Protected routes with a persistent login check on app load

- **Posts**
  - Create posts with image upload (via ImageKit)
  - Feed page displaying all posts with user info
  - Like / unlike functionality with optimistic UI updates

- **Navigation & UI**
  - Client-side routing (Login, Register, Feed, Create Post)
  - Instagram-inspired login and register screens with gradient branding
  - Custom-styled forms, buttons, and post cards

- **Deployment Setup**
  - Single production build: React frontend is built and served as static files directly from the Express backend
  - Environment-based configuration for API base URLs (development vs. production)
  - Production-ready cookie settings (`secure`, `sameSite`) for cross-environment auth

---

## Project Structure

```
insta-clone/
├── Backend/
│   ├── src/
│   │   ├── config/         # Database connection
│   │   ├── controller/     # Route handlers (auth, posts, users)
│   │   ├── middlewares/    # Auth middleware, etc.
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express routes
│   │   └── app.js          # Express app setup, static serving
│   └── server.js           # Entry point, DB connection + server start
│
└── Frontend/
    └── src/
        ├── Features/
        │   ├── auth/        # Login, Register, auth context & hooks
        │   └── post/         # Feed, CreatePost, post context & hooks
        └── shared/          # Shared components (Navbar, etc.)
```

---

## Planned Features

- Follow / Following system with follow requests
- Comments on posts
- User profile page with bio and post grid
- Notifications
- Mobile-responsive UI
- Possibly a "close friends" style story feature

---

## Getting Started (Local Development)

### Prerequisites
- Node.js
- MongoDB (local or Atlas)
- ImageKit account (for image uploads)

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/RAKIB-ALI-018/insta-clone.git
   cd insta-clone
   ```

2. Install dependencies for both Frontend and Backend
   ```bash
   cd Frontend && npm install
   cd ../Backend && npm install
   ```

3. Create a `.env` file inside `Backend/` with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   ```

4. Run the backend
   ```bash
   cd Backend
   npm run dev
   ```

5. Run the frontend (in a separate terminal)
   ```bash
   cd Frontend
   npm run dev
   ```

6. Visit `http://localhost:5173` in your browser.

---

## Feedback

This project is a work in progress and part of an ongoing learning journey. Suggestions on architecture, authentication patterns, image upload scaling, or general MERN best practices are always welcome.
