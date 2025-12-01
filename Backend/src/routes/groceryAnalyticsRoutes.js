const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getGroceryMonthlyTotal,
  getGroceryWeeklyTotal,
  getGroceryCategorySummary,
  getGroceryMonthlyTrends
} = require("../controller/groceryAnalyticsController");

router.get("/total/monthly", authMiddleware, getGroceryMonthlyTotal);
router.get("/total/weekly", authMiddleware, getGroceryWeeklyTotal);
router.get("/category-summary", authMiddleware, getGroceryCategorySummary);
router.get("/trends/monthly", authMiddleware, getGroceryMonthlyTrends);

module.exports = router;
