## 🚀 MealDrop

**Smart Food Delivery & Order Management System**

---

## 📌 Overview

The Smart Food Delivery System is a scalable web-based platform designed to manage online food ordering, real-time order tracking, and efficient delivery handling.

Unlike basic food ordering apps, this system focuses on **backend architecture, order lifecycle management, and delivery optimization**, making it suitable for real-world applications.

---

## 🎯 Objectives

* Simplify food ordering for users
* Enable restaurant management
* Optimize order processing and delivery flow
* Provide real-time order tracking
* Ensure secure and scalable backend architecture

---

## 🎯 Features

### 👤 Customer

* Register and login securely
* Browse restaurants and menus
* Add items to cart
* Place orders
* Track order status (Placed → Preparing → Out for Delivery → Delivered)

---

### 🏪 Restaurant Admin

* Manage menu items
* Update item availability
* Accept/reject orders
* Update order status

---

### 🚚 Delivery Agent *(Optional Advanced Feature)*

* View assigned orders
* Update delivery status
* Optimize delivery routes

---

## 🧠 Core System Design

The system is built around **order lifecycle management**:

```text
Order Created → Accepted → Preparing → Out for Delivery → Delivered
```

Each stage is tracked and updated in real-time.

---

## 🏗️ System Architecture

```text
Client (React / Web)
        ↓
Controller Layer (REST APIs)
        ↓
Service Layer (Business Logic)
        ↓
Repository Layer (JPA)
        ↓
Database (MySQL)
```

---

## 🧩 Database Design

### Main Entities:

* **User**
* **Restaurant**
* **MenuItem**
* **Order**
* **OrderItem**
* **Delivery**

---

### Key Relationships:

* User → Orders (One-to-Many)
* Restaurant → MenuItems (One-to-Many)
* Order → OrderItems (One-to-Many)
* Order → User (Many-to-One)
* Order → Restaurant (Many-to-One)

---

## 🔄 Order Flow (Important)

1. User places order
2. Order stored in database
3. Restaurant processes order
4. Status updated step-by-step
5. Delivery assigned
6. User receives order

---

## 🛠️ Tech Stack

### Backend:

* Java
* Spring Boot
* Spring Security
* Spring Data JPA

### Frontend:

* React.js
* HTML, CSS, JavaScript
* Tailwind / Bootstrap

### Database:

* MySQL

### Tools:

* Git & GitHub
* Postman
* Maven
* Docker (optional)

---

## 🔐 Security

* User authentication using Spring Security
* Role-based access (Customer / Admin / Delivery Agent)
* Password encryption (BCrypt)
* Secure REST APIs

---

## ⚙️ Installation & Setup

### 1. Clone repository

```bash
git clone https://github.com/your-username/food-delivery-system.git
```

### 2. Configure database

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/food_delivery
spring.datasource.username=root
spring.datasource.password=your_password
```

### 3. Run application

```bash
mvn spring-boot:run
```

---

## ▶️ Usage

* Open:

  ```
  http://localhost:8080/
  ```

* Register as user

* Browse menu

* Place order

* Track delivery status

---

## 📈 Key Learning Outcomes

* REST API design
* Database relationship management
* Authentication & authorization
* Order lifecycle handling
* Scalable backend architecture

---

## 🤝 Contribution

Contributions are welcome. Fork the repo and improve the system.

---

## 📄 License

This project is for educational purposes.

---

## 👨‍💻 Author

**Hardik Kaushik**
Backend Developer (Java | Spring Boot )

