const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getMonthlyTotal,
  getWeeklyTotal,
  getCategorySummary,
  getMonthlyTrends
} = require("../controller/expenseAnalyticsController");

router.get("/total/monthly", authMiddleware, getMonthlyTotal);
router.get("/total/weekly", authMiddleware, getWeeklyTotal);
router.get("/category-summary", authMiddleware, getCategorySummary);
router.get("/trends/monthly", authMiddleware, getMonthlyTrends);

module.exports = router;
