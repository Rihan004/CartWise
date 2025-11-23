const { addExpense, getAllExpenses, deleteExpense, updateExpense } = require("../models/expenseModel");

exports.createExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const user_id = req.user.id; // from JWT middleware

    const expense = await addExpense(user_id, title, amount, category, date);
    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const user_id = req.user.id;
    const expenses = await getAllExpenses(user_id);
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const user_id = req.user.id;

    const deleted = await deleteExpense(id, user_id);
    if (!deleted) return res.status(403).json({ message: "Not allowed" });

    res.json({ message: "Expense deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const user_id = req.user.id;
    const { title, amount, category, date } = req.body;

    const updated = await updateExpense(id, user_id, title, amount, category, date);
    if (!updated) return res.status(403).json({ message: "Not allowed" });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
