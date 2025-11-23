const pool = require("../config/db");

// ➕ Add Expense (user-specific)
const addExpense = async (user_id, title, amount, category, date) => {
  const result = await pool.query(
    `INSERT INTO expenses (user_id, title, amount, category, date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [user_id, title, amount, category, date]
  );
  return result.rows[0];
};

// 📌 Get All Expenses (user-specific)
const getAllExpenses = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM expenses 
     WHERE user_id=$1 
     ORDER BY id DESC`,
    [user_id]
  );
  return result.rows;
};

// ❌ Delete Expense
const deleteExpense = async (id, user_id) => {
  const result = await pool.query(
    `DELETE FROM expenses 
     WHERE id=$1 AND user_id=$2 RETURNING *`,
    [id, user_id]
  );
  return result.rows[0];
};

// ✏️ Update Expense
const updateExpense = async (id, user_id, title, amount, category, date) => {
  const result = await pool.query(
    `UPDATE expenses 
     SET title=$1, amount=$2, category=$3, date=$4
     WHERE id=$5 AND user_id=$6
     RETURNING *`,
    [title, amount, category, date, id, user_id]
  );
  return result.rows[0];
};

module.exports = {
  addExpense,
  getAllExpenses,
  deleteExpense,
  updateExpense
};
