const pool = require("../config/db");

// ➕ Add Item
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
const getAllGroceries = async (start, end) => {
  // If start and end dates exist → apply filter
  if (start && end) {
    const result = await pool.query(
      `SELECT * FROM groceries 
       WHERE DATE(created_at) BETWEEN $1 AND $2
       ORDER BY id DESC`,
      [start, end]
    );
    return result.rows;
  }

  // Default: return all groceries
  const result = await pool.query("SELECT * FROM groceries ORDER BY id DESC");
  return result.rows;
};

// ❌ Delete Item
const deleteGroceryItem = async (id) => {
  const result = await pool.query(
    "DELETE FROM groceries WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

const getTodayGroceriesFromDB = async () => {
  const result = await pool.query(`
    SELECT * FROM groceries
    WHERE DATE(created_at) = CURRENT_DATE
    ORDER BY id DESC;
  `);
  return result.rows;
};


module.exports = {
  addGroceryItem,
  getAllGroceries,
  deleteGroceryItem,
  getTodayGroceriesFromDB
};
