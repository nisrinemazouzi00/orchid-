<!-- PROJECT TITLE -->
<h1 align="center">🌸 ORCHID</h1>
<h3 align="center">Full Stack Authentication Web Application</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Express.js-Framework-black?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Database-brightgreen?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/JWT-Authentication-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Academic%20Project-purple?style=for-the-badge" />
</p>

---

## 📌 About The Project

**ORCHID** is a full-stack web application built to demonstrate secure user authentication using modern backend technologies.

It includes:

- Secure user registration
- Password hashing using bcrypt
- Login authentication
- JWT-based authorization
- MongoDB Atlas cloud database integration
- Clean responsive frontend interface

This project was developed as a **Final Exam Project** to demonstrate full-stack development skills.

---

## 🏗️ Project Architecture

```
final-exam-project/
│
├── backend/
│   ├── server.js
│
├── frontend/
│   ├── index.html
│   ├── home.html
│   ├── about.html
│   ├── catalogue.html
│   ├── contact.html
│   ├── styles.css
│   └── script.js
│
├── package.json
└── README.md
```

---

## 🚀 Features

✨ User Registration System  
🔐 Password Hashing with bcrypt  
🔑 JWT Authentication  
🌐 REST API Endpoints  
🛡️ Protected Routes Middleware  
💾 MongoDB Atlas Database  
🎨 Responsive Frontend  

---

## 🔐 Authentication Workflow

1. User registers  
2. Password is hashed securely  
3. Data stored in MongoDB  
4. User logs in  
5. JWT token generated  
6. Token stored in browser  
7. Middleware verifies token for protected access  

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Bcryptjs
- JSON Web Token (JWT)
- CORS

### Frontend
- HTML5
- CSS3
- JavaScript (ES6)

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/orchid-fullstack-app.git
cd orchid-fullstack-app
```

### 2️⃣ Install Dependencies

```bash
cd backend
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file inside backend folder:

```
PORT=3001
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```

### 4️⃣ Run Server

```bash
npm start
```

Server runs at:

```
http://localhost:3001
```

---

## 📸 Future Improvements

- Deployment (Render / Railway)
- Role-based authentication
- UI Enhancements
- API documentation with Swagger
- Password reset functionality

---

## 👩‍💻 Author

**Nisrine Mazouzi**  
 
Software Engineering Graduate  
Cybersecurity Specialist

---

## 📄 License

This project is created for educational purposes.

---

<p align="center">
  ⭐ If you like this project, give it a star on GitHub!
</p>
