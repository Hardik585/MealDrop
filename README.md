# 🚀 MealDrop

<p align="center">
  <h3 align="center">A Modern Full-Stack Food Delivery & Order Management Platform</h3>
  <p align="center">
    Built with Spring Boot, React, MongoDB, JWT Authentication, Razorpay & Cloudinary.
  </p>
</p>

<p align="center">

![GitHub stars](https://img.shields.io/github/stars/Hardik585/MealDrop?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/Hardik585/MealDrop?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/Hardik585/MealDrop?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/Hardik585/MealDrop?style=for-the-badge)

</p>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Order Lifecycle](#-order-lifecycle)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Security](#-security)
- [Payment Integration](#-payment-integration)
- [Cloud Storage](#-cloud-storage)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Learning Outcomes](#-learning-outcomes)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

# 📖 Overview

MealDrop is a **full-stack food delivery platform** that enables customers to browse food items, place online orders, make secure payments, and track deliveries in real time.

The project also includes a dedicated **Admin Dashboard** for restaurant management, allowing administrators to manage food items, process customer orders, and monitor the overall ordering workflow.

The application demonstrates modern backend development practices including authentication, REST APIs, cloud image storage, secure payments, and scalable application architecture.

---

# ✨ Features

## 👤 Customer

- Register & Login securely
- JWT Authentication
- Browse available food items
- Search & Filter menu
- Add/Remove items from cart
- Place online orders
- Secure Razorpay payment
- View order history
- Track live order status

---

## 🏪 Admin

- Secure Admin Login
- Add new food items
- Update menu
- Delete food items
- Upload images via Cloudinary
- Manage customer orders
- Update order status

---

## 🚚 Order Management

- Order Creation
- Payment Verification
- Order Acceptance
- Food Preparation
- Delivery Tracking
- Order Completion

---

# 📦 Order Lifecycle

```text
Order Placed
      │
      ▼
Payment Successful
      │
      ▼
Accepted
      │
      ▼
Preparing
      │
      ▼
Out For Delivery
      │
      ▼
Delivered
```

---

# 🏗️ System Architecture

```text
                    React Frontend
                           │
                    REST API Requests
                           │
                  Spring Boot Backend
                           │
          ┌────────────────┴────────────────┐
          │                                 │
      MongoDB Database               Cloudinary Storage
          │
     Razorpay Payment Gateway
```

---

# 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- CSS3
- Axios

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data MongoDB
- JWT Authentication
- Maven

### Database

- MongoDB

### Third-Party Services

- Razorpay
- Cloudinary

### Tools

- Git
- GitHub
- Docker
- Postman

---

# 📂 Project Structure

```text
MealDrop
│
├── frontend/          # Customer Application
│
├── adminpanel/        # Admin Dashboard
│
└── backend/           # Spring Boot REST API
```

---

# 📸 Screenshots

### Admin Dashboard

<p align="center">
<img src="adminpanel/src/assets/parcel.png" width="700">
</p>

> **More screenshots coming soon:** Home Page • Menu • Cart • Checkout • Orders • Login

---

# 🔐 Security

- JWT Authentication
- Spring Security
- Password Encryption (BCrypt)
- Secure REST APIs
- Role-Based Authorization

---

# 💳 Payment Integration

MealDrop integrates **Razorpay** to provide a secure online payment experience.

### Features

- Secure Checkout
- Payment Verification
- Order Confirmation
- Transaction Management

---

# ☁️ Cloud Storage

Food images are managed using **Cloudinary**.

### Benefits

- Cloud Image Hosting
- Fast Image Delivery
- Automatic Optimization
- Easy Image Management

---

# 🚀 Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Hardik585/MealDrop.git
```

---

## 2️⃣ Backend Setup

```bash
cd backend
mvn clean install
```

Configure `application.properties`

```properties
spring.data.mongodb.uri=YOUR_MONGODB_URI

jwt.secret=YOUR_SECRET

razorpay.key=YOUR_KEY
razorpay.secret=YOUR_SECRET

cloudinary.cloud_name=YOUR_NAME
cloudinary.api_key=YOUR_KEY
cloudinary.api_secret=YOUR_SECRET
```

Run Backend

```bash
mvn spring-boot:run
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 4️⃣ Admin Panel Setup

```bash
cd adminpanel

npm install

npm run dev
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register User |
| POST | `/auth/login` | User Login |
| GET | `/foods` | Get All Food Items |
| GET | `/foods/{id}` | Get Food Details |
| POST | `/cart` | Add Item to Cart |
| POST | `/orders` | Place Order |
| GET | `/orders/user` | User Orders |
| PUT | `/orders/{id}` | Update Order Status |

> **Note:** API endpoints may vary depending on future updates.

---

# 🎯 Learning Outcomes

This project demonstrates practical knowledge of:

- Full Stack Web Development
- REST API Design
- JWT Authentication
- Spring Security
- MongoDB Integration
- Payment Gateway Integration
- Cloudinary Image Storage
- React State Management
- MVC Architecture
- Docker Deployment

---

# 🚀 Future Improvements

- Email Notifications
- Live Order Tracking
- Delivery Partner Module
- Push Notifications
- Restaurant Ratings
- Customer Reviews
- Coupons & Discounts
- Admin Analytics Dashboard
- Multi-Restaurant Support

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature/awesome-feature
```

3. Commit your changes

```bash
git commit -m "Add awesome feature"
```

4. Push to the branch

```bash
git push origin feature/awesome-feature
```

5. Open a Pull Request

---

# 📄 License

This project is intended for educational and learning purposes.

---

# 👨‍💻 Author

## Hardik Kaushik

**Java Backend Developer**

- Spring Boot
- React
- MongoDB
- REST APIs

GitHub: https://github.com/Hardik585

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a Star!

Made with ❤️ by **Hardik Kaushik**

</div>
