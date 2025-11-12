const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// ✅ CREATE an expense
router.post("/", async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const result = await pool.query(
      "INSERT INTO expenses (title, amount, category, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, amount, category, date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// ✅ READ all expenses
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM expenses ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// ✅ UPDATE an expense
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, date } = req.body;
    const result = await pool.query(
      "UPDATE expenses SET title=$1, amount=$2, category=$3, date=$4 WHERE id=$5 RETURNING *",
      [title, amount, category, date, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// ✅ DELETE an expense
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM expenses WHERE id=$1", [id]);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
