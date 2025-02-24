# Authentication System with Node.js, Express, MongoDB, Bcrypt & JWT

## Overview
This project implements a secure authentication system using **Node.js, Express.js, MongoDB, Bcrypt, and JWT**. It includes **user registration, login, password hashing, JWT-based authentication**, and **middleware for protected routes**.

## Features
- 🔐 **JWT Authentication** for securing API routes.
- 🔑 **Password Hashing** using Bcrypt for security.
- 🔄 **User Registration & Login** with token-based authentication.
- 🛡 **Middleware Protection** for verifying user access.
- 🏗 **RESTful API Design** using Express.js.

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
- Defines API routes (`/api/auth`, `/api/home`, `/api/admin`).
- Starts the server on `PORT` (default: 5000).

### 📝 **Key Learnings**
✅ Express.js setup for handling API requests.  
✅ Using middleware (`express.json()`).  
✅ Structuring routes for authentication and admin views.  

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

## 🔥 **Key Takeaways & Best Practices**
### ✅ **JWT Authentication**
- Secure API access using **Bearer Tokens**.
- Store JWT securely (httpOnly cookies are recommended).

### ✅ **Password Security**
- Always **hash passwords** before saving to the database.
- Never store raw passwords.

### ✅ **Express Middleware for Authentication**
- Protect routes with `authMiddleware.js`.
- Attach decoded user info to `req.userInfo`.

### ✅ **Error Handling & Status Codes**
- `401 Unauthorized` → Missing/Invalid Token.
- `409 Conflict` → User already exists.
- `500 Internal Server Error` → Unexpected errors.

---

## 🚀 **Future Enhancements**
🔹 **Implement Refresh Tokens** for better security.  
🔹 **Use httpOnly Cookies** instead of localStorage for storing tokens.  
🔹 **Enable Rate Limiting** to prevent brute force attacks.  
🔹 **Add Email Verification** for user registration.  
🔹 **Deploy API to Cloud** (AWS/GCP/Heroku).  

---

## 📌 **Setup & Installation**
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/auth-system.git
   cd auth-system
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and add the following:
   ```sh
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```sh
   npm start
   ```

5. **API Endpoints:**
   - `POST /api/auth/register` → Register a new user.
   - `POST /api/auth/login` → Login with email and password.
   - `GET /api/home` → Access protected route (requires authentication).

---

## 📜 **License**
This project is open-source under the **MIT License**.

---

## 📩 **Contact**
🔗 **GitHub:** [https://github.com/your-github](https://github.com/your-github)  
🔗 **LinkedIn:** [https://linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)  
📧 **Email:** your-email@example.com  
