const pool = require("../config/db");

// -------------------- Monthly Total --------------------
exports.getMonthlyTotal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month } = req.query; // format: 2025-02

    const result = await pool.query(
      `
      SELECT COALESCE(SUM(amount), 0) AS total
      FROM expenses 
      WHERE user_id = $1 
      AND TO_CHAR(date, 'YYYY-MM') = $2
    `,
      [userId, month]
    );

    res.json({ total: result.rows[0].total });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// -------------------- Weekly Total --------------------
exports.getWeeklyTotal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { week } = req.query; // Give any date inside week

    const result = await pool.query(
      `
      SELECT COALESCE(SUM(amount), 0) AS total
      FROM expenses 
      WHERE user_id = $1 
      AND date >= date_trunc('week', $2::date)
      AND date < date_trunc('week', $2::date) + interval '7 days'
    `,
      [userId, week]
    );

    res.json({ total: result.rows[0].total });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// -------------------- Category Summary --------------------
exports.getCategorySummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT category, SUM(amount) AS total
      FROM expenses
      WHERE user_id = $1
      GROUP BY category
    `,
      [userId]
    );

    const summary = {};
    result.rows.forEach((row) => {
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

    const result = await pool.query(
      `
      SELECT 
        TO_CHAR(date, 'YYYY-MM') AS month,
        SUM(amount) AS total
      FROM expenses
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
