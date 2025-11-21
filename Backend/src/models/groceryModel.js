const pool = require("../config/db");

// ➕ Add Item (already user-specific, no change needed)
const addGroceryItem = async (user_id, name, quantity, cost, category) => {
  const result = await pool.query(
    `INSERT INTO groceries (user_id, name, quantity, cost, category)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [user_id, name, quantity, cost, category]
  );
  return result.rows[0];
};

// 📌 Get Items (supports optional date range filters)
const getAllGroceries = async (user_id, start, end) => {
  let query = "SELECT * FROM groceries WHERE user_id=$1";
  let params = [user_id];

  if (start && end) {
    query += " AND DATE(created_at) BETWEEN $2 AND $3";
    params.push(start, end);
  }

  query += " ORDER BY id DESC";

  const result = await pool.query(query, params);
  return result.rows;
};

// ❌ Delete Item (user-specific)
const deleteGroceryItem = async (id, user_id) => {
  const result = await pool.query(
    "DELETE FROM groceries WHERE id=$1 AND user_id=$2 RETURNING *",
    [id, user_id]
  );
  return result.rows[0];
};

// 📅 Get Today’s Groceries (user-specific)
const getTodayGroceriesFromDB = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM groceries
     WHERE user_id=$1 AND DATE(created_at) = CURRENT_DATE
     ORDER BY id DESC`,
    [user_id]
  );
  return result.rows;
};

module.exports = {
  addGroceryItem,
  getAllGroceries,
  deleteGroceryItem,
  getTodayGroceriesFromDB
};
