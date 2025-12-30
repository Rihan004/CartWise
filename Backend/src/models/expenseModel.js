// models/expenseModel.js
const sql = require("../config/db");

// ➕ Add Expense (user-specific)
const addExpense = async (user_id, title, amount, category, date) => {
  const result = await sql`
    INSERT INTO expenses (user_id, title, amount, category, date)
    VALUES (${user_id}, ${title}, ${amount}, ${category}, ${date})
    RETURNING *
  `;
  return result[0];
};

// 📌 Get All Expenses (user-specific)
const getAllExpenses = async (user_id) => {
  const result = await sql`
    SELECT *
    FROM expenses
    WHERE user_id = ${user_id}
    ORDER BY id DESC
  `;
  return result;
};

// ❌ Delete Expense
const deleteExpense = async (id, user_id) => {
  const result = await sql`
    DELETE FROM expenses
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *
  `;
  return result[0];
};

// ✏️ Update Expense
const updateExpense = async (id, user_id, title, amount, category, date) => {
  const result = await sql`
    UPDATE expenses
    SET title = ${title},
        amount = ${amount},
        category = ${category},
        date = ${date}
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *
  `;
  return result[0];
};

module.exports = {
  addExpense,
  getAllExpenses,
  deleteExpense,
  updateExpense,
};
