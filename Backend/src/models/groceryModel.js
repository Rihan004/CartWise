const pool = require("../config/db");

const addGroceryItem = async (user_id, name, quantity, cost, category) => {
  const result = await pool.query(
    `INSERT INTO groceries (user_id, name, quantity, cost, category)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [user_id, name, quantity, cost, category]
  );
  return result.rows[0];
};

const getAllGroceries = async () => {
  const result = await pool.query("SELECT * FROM groceries ORDER BY id DESC");
  return result.rows;
};

const deleteGroceryItem = async (id) => {
  const result = await pool.query("DELETE FROM groceries WHERE id=$1 RETURNING *", [id]);
  return result.rows[0];
};

module.exports = { addGroceryItem, getAllGroceries, deleteGroceryItem };
