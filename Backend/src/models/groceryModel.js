// models/groceryModel.js
const sql = require("../config/db");

// ➕ Add Item (user-specific)
const addGroceryItem = async (user_id, name, quantity, cost, category) => {
  const result = await sql`
    INSERT INTO groceries (user_id, name, quantity, cost, category)
    VALUES (${user_id}, ${name}, ${quantity}, ${cost}, ${category})
    RETURNING *
  `;
  return result[0];
};

// 📌 Get Items (supports optional date range filters)
const getAllGroceries = async (user_id, start, end) => {
  if (start && end) {
    return await sql`
      SELECT *
      FROM groceries
      WHERE user_id = ${user_id}
        AND DATE(created_at) BETWEEN ${start} AND ${end}
      ORDER BY id DESC
    `;
  }

  return await sql`
    SELECT *
    FROM groceries
    WHERE user_id = ${user_id}
    ORDER BY id DESC
  `;
};

// ❌ Delete Item (user-specific)
const deleteGroceryItem = async (id, user_id) => {
  const result = await sql`
    DELETE FROM groceries
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *
  `;
  return result[0];
};

// 📅 Get Today’s Groceries (user-specific)
const getTodayGroceriesFromDB = async (user_id) => {
  return await sql`
    SELECT *
    FROM groceries
    WHERE user_id = ${user_id}
      AND DATE(created_at) = CURRENT_DATE
    ORDER BY id DESC
  `;
};

module.exports = {
  addGroceryItem,
  getAllGroceries,
  deleteGroceryItem,
  getTodayGroceriesFromDB,
};
