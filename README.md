
# 🎓 EdTech - Online Learning Platform

Welcome to **EdTech**, a modern and scalable online learning platform designed to empower educators and learners. With features like course creation, instructor verification, secure authentication, and a dynamic dashboard, EdTech offers a seamless learning experience.

## 🚀 Live Demo

🌐 [Visit the Website](https://ed-tech-frontend-two.vercel.app)

## 📸 Screenshots

### 🏠 Home Page
![Home Page](./src/assets/Images/Screenshot%202025-08-02%20103855.png)

### 🎓 Enrolled Courses
![Enrolled Courses](./src/assets/Images/Screenshot%202025-08-02%20103839.png)

### 👤 Profile Page
![Profile Page](./src/assets/Images/Screenshot%202025-08-02%20103823.png)

---

## 🧩 Features

- 🧑‍🏫 Instructor and Student Roles
- ✅ Admin-based Instructor Verification
- 📚 Course Creation and Lecture Upload
- 🔐 Secure Authentication (Login, Signup, JWT)
- 🛒 Razorpay Payment Integration
- 🎥 Video Streaming and Lecture Progress Tracking
- 📈 Dynamic Dashboard with Course Analytics
- 📝 Course Reviews and Ratings

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- React Icons
- Axios

### 🔹 Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- Cloudinary (for media)
- Razorpay (for payments)
- JWT for Authentication
- Bcrypt for password hashing

---

## 📁 Folder Structure (Monorepo Style)

```
edTech/
├── client/             # React frontend
│   └── src/
├── server/             # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/edTech.git
cd edTech

# Install dependencies
cd client && npm install
cd ../server && npm install

# Setup .env for backend
PORT=7000
MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_secret_key
RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Run both frontend and backend
npm run dev
```

---

## ✨ Future Improvements

- Add quizzes and assignments
- Real-time chat
- Certificate generation
- Mobile app version

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature-name`
3. Commit: `git commit -m 'Add feature'`
4. Push: `git push origin feature-name`
5. Open a pull request

---

## 🧑‍💻 Author

**Rituranjan Kumar**  

📧 kunal50639@gmail.com

---

## 📄 License

This project is licensed under the MIT License.
