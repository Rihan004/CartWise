const express = require("express");
const {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense
} = require("../controller/expenseController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createExpense);
router.get("/", authMiddleware, getExpenses);
router.delete("/:id", authMiddleware, deleteExpense);
router.put("/:id", authMiddleware, updateExpense);

module.exports = router;
