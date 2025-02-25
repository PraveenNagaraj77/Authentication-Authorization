# Authentication System with Node.js, Express, MongoDB, Bcrypt & JWT

## Overview
This project implements a secure authentication system using **Node.js, Express.js, MongoDB, Bcrypt, and JWT**. It includes **user registration, login, password hashing, JWT-based authentication**, and **middleware for protected routes**. Additionally, it supports **image uploads using Multer and Cloudinary**.

## Features
- 🔐 **JWT Authentication** for securing API routes.
- 🔑 **Password Hashing** using Bcrypt for security.
- 🔄 **User Registration & Login** with token-based authentication.
- 🛡 **Middleware Protection** for verifying user access.
- 🏗 **RESTful API Design** using Express.js.
- 📤 **Image Uploading** using Multer and Cloudinary.
- ☁️ **Cloudinary Integration** for storing images securely.

---

## 1️⃣ **Authentication Middleware (`authMiddleware.js`)**
### 📌 **Functionality**
- Extracts the JWT token from the request header.
- Verifies the token using `jwt.verify()`.
- Attaches decoded user info (`id`, `role`, `username`) to `req.userInfo`.
- Calls `next()` to proceed if authentication is successful.

### 📝 **Key Learnings**
✅ JWT authentication for securing routes.  
✅ Middleware usage in Express.js.  
✅ Handling missing or invalid tokens properly.  

---

## 2️⃣ **Express Server Setup (`server.js`)**
### 📌 **Functionality**
- Loads environment variables using `dotenv`.
- Connects to **MongoDB**.
- Uses middleware to parse JSON requests.
- Defines API routes (`/api/auth`, `/api/home`, `/api/admin`, `/api/upload`).
- Starts the server on `PORT` (default: 5000).

### 📝 **Key Learnings**
✅ Express.js setup for handling API requests.  
✅ Using middleware (`express.json()`).  
✅ Structuring routes for authentication, image upload, and admin views.  

---

## 3️⃣ **User Registration (`registerUser` function)**
### 📌 **Functionality**
- Checks if the user already exists.
- Hashes passwords before storing them.
- Saves new user data to MongoDB.
- Generates a **JWT token** for authentication.
- Returns user details (excluding password) and a token.

### 📝 **Key Learnings**
✅ How to hash passwords securely using **bcrypt**.  
✅ How to store and retrieve user information from MongoDB.  
✅ How to generate JWT tokens for user authentication.  

---

## 4️⃣ **User Login (`loginUser` function)**
### 📌 **Functionality**
- Finds the user by email.
- Verifies the hashed password using `bcrypt.compare()`.
- If valid, generates a new JWT token.
- Sends user details and token as response.

### 📝 **Key Learnings**
✅ Password comparison using **bcrypt.compare()**.  
✅ Returning structured JSON responses with authentication data.  
✅ How to handle failed login attempts properly.  

---

## 5️⃣ **Image Upload (`uploadImage` function)**
### 📌 **Functionality**
- Accepts an image file using **Multer**.
- Uploads the image to **Cloudinary**.
- Stores the image URL and metadata in MongoDB.
- Returns the uploaded image URL and details.

### 📤 **Image Upload API**
**Endpoint:** `POST /api/upload`  
**Headers:** 
```json
{
  "Authorization": "Bearer jwt_token"
}
