# 💸 CartWise - AI-Powered Expense & Grocery Tracker

A full-stack, production-ready **Expense & Grocery Tracking application** with **AI-powered insights**, **advanced analytics**, and **secure authentication**. The app helps users track daily spending, analyze trends, and receive personalized recommendations using OpenAI GPT.

---

## 🚀 Live Demo

**App:** [https://your-frontend-url.vercel.app](https://cart-wise-lyart.vercel.app/login)


---
## 📸 Screenshots


## 🧠 Key Features

### 🔐 Authentication

* JWT-based authentication
* Google OAuth 2.0 login
* Protected routes using auth middleware

### 💰 Expense & Grocery Management

* Add, edit, delete daily expenses
* Track groceries separately to avoid data redundancy
* Date-based filtering (daily view)

### 📊 Advanced Analytics Dashboard

* Weekly & Monthly total spending
* Category-wise spending summary (Pie Chart)
* Monthly trends visualization (Line Chart)
* Combined analytics:

  * **Total Spending = Expenses + Groceries**
  * Grocery shown as a single category in analytics

### 🤖 AI-Powered Recommendations

* Personalized spending insights using **OpenAI GPT**
* Smart suggestions based on user spending patterns

### 🌐 Deployment

* Frontend deployed on **Vercel**
* Backend deployed on **Render**

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Chart.js
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

### AI & Auth

* OpenAI GPT API
* Google OAuth 2.0

### DevOps

* Docker
* Render (Backend)
* Vercel (Frontend)

---

## 📂 Project Architecture

```
Frontend (React)
│
├── Pages
│   ├── ExpensePage
│   ├── GroceryPage
│   └── AnalyticsPage
│
├── Components
│   ├── CategorySummary (Pie Chart)
│   ├── MonthlyTrends (Line Chart)
│   ├── WeeklyTotal
│   └── MonthlyTotal
│
Backend (Node + Express)
│
├── Routes
│   ├── /expenses
│   ├── /groceries
│   ├── /analytics/expenses
│   └── /analytics/groceries
│
├── Controllers
├── Middleware (JWT Auth)
└── Models
```

---

## 📈 Analytics Design Decision (Important)

* **Expenses and Groceries are stored separately** to avoid data redundancy
* Analytics layer combines both when needed:

  * Weekly / Monthly totals = Expense total + Grocery total
  * Pie chart shows grocery as one category
* This keeps data normalized while still providing meaningful insights

---

## 🔑 Environment Variables

### Backend (`.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Frontend (`.env`)

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

---

## 🐳 Docker Support

### Frontend

```bash
docker build -t expense-tracker-frontend .
docker run -p 3000:80 expense-tracker-frontend
```

### Backend

```bash
docker build -t expense-tracker-backend .
docker run -p 5000:5000 expense-tracker-backend
```

---

## 🧪 Future Enhancements

* Budget limits & alerts
* Export analytics (PDF / CSV)
* More AI-driven financial insights
* Mobile responsiveness improvements

---

## 👨‍💻 Author

**Rihan Shaikh**

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub — it really helps!
