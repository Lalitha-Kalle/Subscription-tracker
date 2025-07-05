
# 📦 Subscription Management System

A robust backend system for managing real users, real money, and real business logic. This application is built using Node.js, Express, MongoDB (via Mongoose), and JWT authentication. It supports efficient subscription tracking, user management, email reminders, error handling, and more.

---

## 🚀 Features

- **JWT Authentication** – Secure user login and session management.
- **MongoDB Integration** – Data modeling using Mongoose schemas and relationships.
- **Subscription Tracking API** – CRUD operations for user subscriptions.
- **Rate Limiting & Bot Protection** – Secured endpoints using `express-rate-limit` and `arcjet`.
- **Input Validation** – Middleware-based validation for request payloads.
- **Global Error Handling** – Centralized error response architecture.
- **Smart Email Reminders** – Automated workflows using Upstash for scheduled notifications.

---

## 🧱 Tech Stack

| Layer        | Tech                          |
| ------------ | ----------------------------- |
| Backend      | Node.js, Express.js           |
| Database     | MongoDB, Mongoose             |
| Auth         | JWT, bcrypt                   |
| Validation   | express-validator / custom MW |
| Rate Limit   | express-rate-limit, arcjet    |
| Automation   | Upstash for reminders         |

---

## 📂 Project Structure

```
subscription-management-system/
├── src/
│   ├── config/
│   │   ├── arcjet.js
│   │   ├── env.js
│   │   ├── nodemailer.js
│   │   └── upstash.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── subscription.controller.js
│   │   ├── user.controller.js
│   │   └── workflow.controller.js
│   ├── db/
│   │   └── database.js
│   ├── middlewares/
│   │   ├── arcjet.middleware.js
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── notfound.middleware.js
│   ├── models/
│   │   ├── subscription.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   └── v1/
│   │       ├── auth.routes.js
│   │       ├── subscription.routes.js
│   │       ├── user.routes.js
│   │       └── workflow.routes.js
│   ├── utils/
│   │   ├── email.template.js
│   │   └── send.email.js
│   ├── data.md
│   └── index.js
├── .gitignore
├── eslint.config.js
├── package-lock.json
├── package.json
└── README.md

```
---

## 🧪 API Endpoints

### 🔐 Auth Routes
**Base URL**: `/api/v1/auth`

| Method | Endpoint      | Description     |
|--------|---------------|-----------------|
| POST   | `/sign-up`    | Register a user |
| POST   | `/sign-in`    | Login a user    |


### 👤 User Routes
**Base URL**: `/api/v1/users`

| Method | Endpoint     | Description          |
|--------|--------------|----------------------|
| GET    | `/`          | Get all users        |
| GET    | `/:id`       | Get user by ID       |
| POST   | `/`          | Create a new user    |
| PUT    | `/:id`       | Update a user        |
| DELETE | `/:id`       | Delete a user        |


### 📦 Subscription Routes
**Base URL**: `/api/v1/subscriptions`

| Method | Endpoint               | Description                       |
|--------|------------------------|-----------------------------------|
| POST   | `/`                    | Create a new subscription         |
| GET    | `/user/:id`            | Get all subscriptions of a user  |
| GET    | `/`                    | Get all subscriptions            |
| GET    | `/:id`                 | Get a subscription by ID         |
| PUT    | `/:id`                 | Update a subscription by ID      |
| DELETE | `/:id`                 | Delete a subscription by ID      |
| PUT    | `/:id/cancel`          | Cancel a subscription by ID      |

### 🔄 Workflow Routes
**Base URL**: `/api/v1/workflows`

| Method | Endpoint                   | Description                  |
|--------|----------------------------|------------------------------|
| POST   | `/subscription/reminder`   | Send subscription reminders  |

---

## 🛡 Security & Optimization

- Rate limiting to prevent abuse
- Bot protection with Arcjet
- Error logging
- Scheduled notification automation
- Modular architecture with middleware pattern

---

## 🛠 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Lalitha-Kalle/Subscription-tracker.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment:\
  in .env.development.local
   ```
    PORT=<port>
    NODE_ENV="development"
    SERVER_URL=http://localhost:<port>
    MONGO_URL=<your-mongo-url>
    JWT_SECRET=<your jwt secret>
    JWT_EXPIRY_IN=<expiry>
    ARCJET_KEY=<arcjet-key>
    ARCJET_ENV='development'
    QSTASH_URL=<qstash-url>
    QSTASH_TOKEN=<qstash-token>
    EMAIL_PASSWORD=<your-gmail-app-password>
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

---

## 📧 Email Notification System

Smart email workflows scheduled using **Upstash** or cron jobs. Users are notified before upcoming renewals with customizable messages.

---

## 🧠 Future Enhancements

- Add Stripe/PayPal integration for real payments
- Admin dashboard (React/Vue)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
