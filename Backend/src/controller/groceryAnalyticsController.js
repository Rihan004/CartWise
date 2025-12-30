const sql = require("../config/db");

// -------------------- Monthly Total --------------------
exports.getGroceryMonthlyTotal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month } = req.query; // example: 2025-02

    const rows = await sql`
      SELECT COALESCE(SUM(quantity * cost), 0) AS total
      FROM groceries
      WHERE user_id = ${userId}
      AND TO_CHAR(created_at, 'YYYY-MM') = ${month}
    `;

    res.json({ total: Number(rows[0].total) });
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

    const rows = await sql`
      SELECT COALESCE(SUM(quantity * cost), 0) AS total
      FROM groceries
      WHERE user_id = ${userId}
      AND created_at >= date_trunc('week', ${week}::date)
      AND created_at < date_trunc('week', ${week}::date) + interval '7 days'
    `;

    res.json({ total: Number(rows[0].total) });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// -------------------- Category Summary --------------------
exports.getGroceryCategorySummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const rows = await sql`
      SELECT
        COALESCE(category, 'Uncategorized') AS category,
        SUM(quantity * cost) AS total
      FROM groceries
      WHERE user_id = ${userId}
      GROUP BY category
    `;

    const summary = {};
    rows.forEach((row) => {
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

    const rows = await sql`
      SELECT
        TO_CHAR(created_at, 'YYYY-MM') AS month,
        SUM(quantity * cost) AS total
      FROM groceries
      WHERE user_id = ${userId}
      GROUP BY month
      ORDER BY month ASC
    `;

    res.json(
      rows.map((row) => ({
        date: row.month,
        total: Number(row.total),
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
