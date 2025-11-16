const { addGroceryItem, getAllGroceries, deleteGroceryItem  , getTodayGroceriesFromDB} = require("../models/groceryModel");

const addItem = async (req, res) => {
  try {
    const { user_id, name, quantity, cost, category } = req.body;
    const newItem = await addGroceryItem(user_id, name, quantity, cost, category);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding grocery:", error);
    res.status(500).json({ message: "Error adding item", error });
  }
};

const getItems = async (req, res) => {
  try {
    const { start, end } = req.query;

    let items;

    if (start && end) {
      // 🔥 Fetch filtered data
      items = await getAllGroceries(start, end);
    } else {
      // 🔥 Fetch entire list (old behaviour)
      items = await getAllGroceries();
    }

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};


const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteGroceryItem(id);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};

const getTodayGroceries = async (req, res) => {
  try {
    const items = await getTodayGroceriesFromDB();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching today's groceries", err });
  }
};

module.exports = { addItem, getItems, deleteItem , getTodayGroceries };
