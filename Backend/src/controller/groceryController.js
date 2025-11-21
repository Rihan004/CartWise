const { addGroceryItem, getAllGroceries, deleteGroceryItem  , getTodayGroceriesFromDB} = require("../models/groceryModel");

// ADD GROCERY ITEM
const addItem = async (req, res) => {
  try {
    const { name, quantity, cost, category } = req.body;

    // ✅ Get user_id from JWT (authMiddleware)
    const user_id = req.user.id;

    const newItem = await addGroceryItem(user_id, name, quantity, cost, category);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding grocery:", error);
    res.status(500).json({ message: "Error adding item", error });
  }
};

// GET ALL GROCERIES (OPTIONAL DATE FILTER)
const getItems = async (req, res) => {
  try {
    const { start, end } = req.query;
    const user_id = req.user.id;

    let items;

    if (start && end) {
      // 🔥 Fetch filtered data for this user
      items = await getAllGroceries(user_id, start, end);
    } else {
      // 🔥 Fetch entire list for this user
      items = await getAllGroceries(user_id);
    }

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

// DELETE GROCERY ITEM (ONLY ALLOWED FOR THIS USER)
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    // 🔥 Ensure user_id is passed to model for safety
    const deleted = await deleteGroceryItem(id, user_id);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};

// GET TODAY'S GROCERIES (USER-SPECIFIC)
const getTodayGroceries = async (req, res) => {
  try {
    const user_id = req.user.id;
    const items = await getTodayGroceriesFromDB(user_id);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching today's groceries", err });
  }
};

module.exports = { addItem, getItems, deleteItem, getTodayGroceries };