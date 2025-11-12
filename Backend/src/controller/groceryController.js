const { addGroceryItem, getAllGroceries, deleteGroceryItem } = require("../models/groceryModel");

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
    const items = await getAllGroceries();
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

module.exports = { addItem, getItems, deleteItem };
