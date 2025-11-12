// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const pool = require("./src/config/db.js");
const app = express();
app.use(cors());
app.use(express.json());

const expenseRoutes = require("./src/routes/expenseRoutes.js");
const groceryRoutes = require("./src/routes/groceryRoutes.js");


app.use("/api/expenses", expenseRoutes);
app.use("/api/groceries", groceryRoutes);


// Simple test route
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running 🚀");
});

// (Later we'll add: app.use("/api/expenses", expenseRoutes))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
