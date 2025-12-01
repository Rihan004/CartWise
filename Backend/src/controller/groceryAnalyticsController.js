const pool = require("../config/db");

// -------------------- Monthly Total --------------------
exports.getGroceryMonthlyTotal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month } = req.query; // example: 2025-02

    const result = await pool.query(
      `
      SELECT COALESCE(SUM(quantity * cost), 0) AS total
      FROM groceries
      WHERE user_id = $1
      AND TO_CHAR(created_at, 'YYYY-MM') = $2
      `,
      [userId, month]
    );

    res.json({ total: Number(result.rows[0].total) });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// -------------------- Weekly Total --------------------
exports.getGroceryWeeklyTotal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { week } = req.query;

    const result = await pool.query(
      `
      SELECT COALESCE(SUM(quantity * cost), 0) AS total
      FROM groceries
      WHERE user_id = $1
      AND created_at >= date_trunc('week', $2::date)
      AND created_at < date_trunc('week', $2::date) + interval '7 days'
      `,
      [userId, week]
    );

    res.json({ total: Number(result.rows[0].total) });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// -------------------- Category Summary --------------------
exports.getGroceryCategorySummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT 
        COALESCE(category, 'Uncategorized') AS category,
        SUM(quantity * cost) AS total
      FROM groceries
      WHERE user_id = $1
      GROUP BY category
      `,
      [userId]
    );

    const summary = {};
    result.rows.forEach((row) => {
      summary[row.category] = Number(row.total);
    });

    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// -------------------- Monthly Trends --------------------
exports.getGroceryMonthlyTrends = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT 
        TO_CHAR(created_at, 'YYYY-MM') AS month,
        SUM(quantity * cost) AS total
      FROM groceries
      WHERE user_id = $1
      GROUP BY month
      ORDER BY month ASC
      `,
      [userId]
    );

    res.json(
      result.rows.map((row) => ({
        date: row.month,
        total: Number(row.total),
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
