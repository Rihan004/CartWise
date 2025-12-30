const sql = require("../config/db");

// -------------------- Monthly Total --------------------
exports.getMonthlyTotal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month } = req.query;

    const result = await sql`
      SELECT COALESCE(SUM(amount), 0) AS total
      FROM expenses
      WHERE user_id = ${userId}
      AND TO_CHAR(date, 'YYYY-MM') = ${month}
    `;

    res.json({ total: Number(result[0].total) });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// -------------------- Weekly Total --------------------
exports.getWeeklyTotal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { week } = req.query;

    const result = await sql`
      SELECT COALESCE(SUM(amount), 0) AS total
      FROM expenses
      WHERE user_id = ${userId}
      AND date >= date_trunc('week', ${week}::date)
      AND date < date_trunc('week', ${week}::date) + interval '7 days'
    `;

    res.json({ total: Number(result[0].total) });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// -------------------- Category Summary --------------------
exports.getCategorySummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const rows = await sql`
      SELECT category, SUM(amount) AS total
      FROM expenses
      WHERE user_id = ${userId}
      GROUP BY category
    `;

    const summary = {};
    rows.forEach((row) => {
      summary[row.category || "Uncategorized"] = Number(row.total);
    });

    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// -------------------- Monthly Trends --------------------
exports.getMonthlyTrends = async (req, res) => {
  try {
    const userId = req.user.id;

    const rows = await sql`
      SELECT
        TO_CHAR(date, 'YYYY-MM') AS month,
        SUM(amount) AS total
      FROM expenses
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
