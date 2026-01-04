const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
dotenv.config();

const pool = require("./src/config/db.js");
const app = express();
app.use(cors());
app.use(express.json());

// ➕ SESSION MIDDLEWARE (required for passport-google)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

// ➕ PASSPORT SETUP
require("./src/config/passport.js"); // <-- you will create this file
app.use(passport.initialize());
app.use(passport.session());

const expenseRoutes = require("./src/routes/expenseRoutes.js");
const groceryRoutes = require("./src/routes/groceryRoutes.js");
const recommendRoutes = require("./src/routes/recommendRoutes.js");
const authRoutes = require("./src/routes/authRoutes.js");
const authLocalRoutes = require("./src/routes/authLocalRoutes.js");
const expenseAnalyticsRoutes = require("./src/routes/expenseAnalyticsRoutes.js");
const groceryAnalyticsRoutes = require("./src/routes/groceryAnalyticsRoutes.js");

app.use("/api/expenses", expenseRoutes);
app.use("/api/groceries", groceryRoutes);
app.use("/api/recommend", recommendRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth/local", authLocalRoutes);
app.use("/api/analytics/expenses", expenseAnalyticsRoutes);
app.use("/api/analytics/groceries", groceryAnalyticsRoutes);

// Simple test route
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running 🚀");
});

// (Later we'll add: app.use("/api/expenses", expenseRoutes))
//made chnage in vercel
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
