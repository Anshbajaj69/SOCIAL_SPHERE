# 🌐 SOCIAL SPHERE

> A fully functional social media backend API built with Node.js, Express.js, and MongoDB

SOCIAL SPHERE is a robust REST API that powers a modern social media platform, replicating core functionalities found in platforms like Twitter. This project demonstrates best practices in RESTful API design, database modeling, authentication, and secure backend development.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [API Endpoints](#-api-endpoints)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure user registration and login
- JWT-based authentication
- Protected routes and session management
- Logout functionality

### 👤 User Management
- User profile creation and updates
- Profile picture and cover image upload via Cloudinary
- User bio and personal information editing
- User search functionality

### 📝 Posts
- Create, read, update, and delete posts
- Image/media upload support
- Post visibility control
- Timeline feed generation

### 💬 Social Interactions
- Like and unlike posts
- Comment on posts
- Follow and unfollow users
- Real-time notification system for likes and follows

### 🔔 Notifications
- Real-time notifications for social interactions
- Mark notifications as read
- Notification history

---

## 🛠️ Tech Stack

### Backend Framework
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework

### Database
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - ODM for MongoDB

### Authentication & Security
- **JWT (JSON Web Tokens)** - Secure authentication
- **bcrypt** - Password hashing

### File Storage
- **Cloudinary** - Cloud-based image and video management

### Additional Tools
- **dotenv** - Environment variable management
- **cookie-parser** - Parse cookies for session management

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/signup          - Register a new user
POST   /api/auth/login           - Login user
POST   /api/auth/logout          - Logout user
GET    /api/auth/me              - Get current user
```

### Users
```
GET    /api/users/profile/:username  - Get user profile
POST   /api/users/follow/:id         - Follow/unfollow user
GET    /api/users/suggested          - Get suggested users
PUT    /api/users/update             - Update user profile
```

### Posts
```
POST   /api/posts/create         - Create a new post
DELETE /api/posts/:id            - Delete a post
POST   /api/posts/like/:id       - Like/unlike a post
POST   /api/posts/comment/:id    - Comment on a post
GET    /api/posts/all            - Get all posts
GET    /api/posts/following      - Get posts from followed users
GET    /api/posts/user/:username - Get user's posts
```

### Notifications
```
GET    /api/notifications        - Get all notifications
DELETE /api/notifications        - Delete all notifications
DELETE /api/notifications/:id    - Delete specific notification
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anshbajaj69/SOCIAL_SPHERE.git
   cd SOCIAL_SPHERE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory (see [Environment Variables](#-environment-variables))

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the API**
   
   The server will run on `http://localhost:5000` (or your specified PORT)

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/social-sphere
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/social-sphere

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Getting Cloudinary Credentials
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

---

## 📖 Usage

### Testing with Postman

1. Import the API endpoints into Postman
2. Start with user registration:
   ```json
   POST http://localhost:5000/api/auth/signup
   {
     "username": "johndoe",
     "fullName": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. Login to get authentication token:
   ```json
   POST http://localhost:5000/api/auth/login
   {
     "username": "johndoe",
     "password": "password123"
   }
   ```

4. Use the JWT token in subsequent requests (automatically stored in cookies)

---

## 📁 Project Structure

```
SOCIAL_SPHERE/
├── backend/
│   ├── controllers/        # Request handlers
│   ├── models/            # Database schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── lib/               # Utility functions
│   └── db/                # Database connection
├── .env                   # Environment variables
├── server.js             # Entry point
└── package.json          # Dependencies
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

**Ansh Bajaj**

- GitHub: [@Anshbajaj69](https://github.com/Anshbajaj69)
- Email: bajajaansh822@gmail.com
- LinkedIn: [linkedin.com/in/ansh-bajaj](https://www.linkedin.com/in/ansh-bajaj-23b006318)

---

## 🙏 Acknowledgments

- Inspired by modern social media platforms
- Built as a learning project to master backend development
- Thanks to the Node.js and MongoDB communities

---

<div align="center">
  Made with ❤️ by Ansh Bajaj
</div>