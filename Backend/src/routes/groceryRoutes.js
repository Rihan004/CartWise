const express = require("express");
const { addItem, getItems, deleteItem } = require("../controller/groceryController");
const { getTodayGroceries } = require("../controller/groceryController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);
router.post("/add",  addItem);
router.get("/", getItems);
router.delete("/:id", deleteItem);
// route
router.get("/today", getTodayGroceries);


module.exports = router;
