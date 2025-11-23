import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });
  const [editExpense, setEditExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch expenses
  const fetchExpenses = () => {
    axios.get("http://localhost:5000/api/expenses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error(err));


  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Add expense
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/expenses", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setForm({ title: "", amount: "", category: "", date: "" });
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this expense?")) {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchExpenses();
    }
  };

  // Open modal
  const handleEdit = (expense) => {
    setEditExpense(expense);
    setShowModal(true);
  };

  // Save edit
  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/expenses/${editExpense.id}`,
        editExpense,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );


      setShowModal(false);
      setEditExpense(null);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-200 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-indigo-700 drop-shadow-sm">
          Expense Tracker 💰
        </h1>
        {/* Analytics Button */}
        <div className="flex justify-center mb-6">
          <Link
            to="/analytics"
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-md hover:bg-indigo-700 transition font-semibold"
          >
            📊 View Analytics
          </Link>
        </div>
        {/* Add Form */}
        <form
          onSubmit={handleAdd}
          className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none col-span-1 sm:col-span-2"
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none col-span-1 sm:col-span-2"
            required
          />

          <button
            type="submit"
            className="col-span-1 sm:col-span-2 bg-indigo-600 text-white p-3 rounded-xl shadow-md hover:bg-indigo-700 transition font-semibold text-lg"
          >
            ➕ Add Expense
          </button>
        </form>

        {/* Expense Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {expenses.map((exp) => (
            <div
              key={exp.id}
              className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-xl text-indigo-900">
                {exp.title}
              </h2>

              <p className="text-gray-700 mt-1">
                <span className="font-bold text-indigo-700">₹{exp.amount}</span>{" "}
                • {exp.category || "Uncategorized"}
              </p>

              <p className="text-gray-500 text-sm mt-1">{exp.date}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="flex-1 bg-yellow-400 text-white p-2 rounded-lg hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="flex-1 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          <div className="relative bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">
              Edit Expense
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                value={editExpense.title}
                onChange={(e) =>
                  setEditExpense({ ...editExpense, title: e.target.value })
                }
                className="w-full p-3 border rounded-xl shadow-sm"
              />

              <input
                type="number"
                value={editExpense.amount}
                onChange={(e) =>
                  setEditExpense({ ...editExpense, amount: e.target.value })
                }
                className="w-full p-3 border rounded-xl shadow-sm"
              />

              <input
                type="text"
                value={editExpense.category}
                onChange={(e) =>
                  setEditExpense({ ...editExpense, category: e.target.value })
                }
                className="w-full p-3 border rounded-xl shadow-sm"
              />

              <input
                type="date"
                value={editExpense.date}
                onChange={(e) =>
                  setEditExpense({ ...editExpense, date: e.target.value })
                }
                className="w-full p-3 border rounded-xl shadow-sm"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveEdit}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensePage;
