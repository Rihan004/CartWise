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

  const getLocalDate = (dateValue) => {
    const d = new Date(dateValue);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayDate = getLocalDate(new Date());

  const todaysExpenses = expenses.filter(
    (exp) => getLocalDate(new Date(exp.date)) === todayDate
  );

  const fetchExpenses = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/expenses`, {
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

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/expenses`, form, {
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

  const handleDelete = async (id) => {
    if (window.confirm("Delete this expense?")) {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchExpenses();
    }
  };

  const handleEdit = (expense) => {
    setEditExpense(expense);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/expenses/${editExpense.id}`,
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 px-4 py-8">

      <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-extrabold text-center mb-8 text-white">
          Expense <span className="text-purple-400">Tracker</span>
        </h1>

        {/* Analytics Button */}
        <div className="flex justify-center mb-8">
          <Link
            to="/analytics"
            className="bg-gradient-to-r from-purple-500 to-purple-700 
                       text-white px-6 py-3 rounded-xl font-semibold
                       shadow-lg shadow-purple-500/30 hover:opacity-90 transition"
          >
            📊 View Analytics
          </Link>
        </div>

        {/* Add Expense Form */}
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
        >
          {["title", "amount", "category", "date"].map((field, idx) => (
            <input
              key={idx}
              type={field === "amount" ? "number" : field === "date" ? "date" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              required={field !== "category"}
              className={`p-3 rounded-xl bg-gray-900/70 text-white placeholder-gray-500 
                          border border-gray-700 focus:border-purple-500
                          focus:ring-2 focus:ring-purple-500/30 outline-none transition
                          ${field === "category" || field === "date" ? "sm:col-span-2" : ""}`}
            />
          ))}

          <button
            type="submit"
            className="sm:col-span-2 bg-purple-600 hover:bg-purple-700
                       text-white py-3 rounded-xl font-semibold text-lg
                       shadow-lg shadow-purple-500/30 transition"
          >
            ➕ Add Expense
          </button>
        </form>

        {/* Today Expenses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {todaysExpenses.length === 0 ? (
            <p className="sm:col-span-2 text-center text-gray-400">
              No expenses added today
            </p>
          ) : (
            todaysExpenses.map((exp) => (
              <div
                key={exp.id}
                className="bg-gray-900/70 border border-gray-700 rounded-2xl p-5 shadow hover:border-purple-500 transition"
              >
                <h2 className="text-xl font-semibold text-white">
                  {exp.title}
                </h2>

                <p className="mt-2 text-gray-300">
                  <span className="text-purple-400 font-bold">
                    ₹{exp.amount}
                  </span>{" "}
                  • {exp.category || "Uncategorized"}
                </p>

                <p className="text-sm text-gray-500 mt-1">{exp.date}</p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="
      flex-1 py-2.5 rounded-xl
      bg-gradient-to-r from-yellow-400 to-yellow-500
      text-black font-semibold
      shadow-lg shadow-yellow-500/20
      hover:from-yellow-500 hover:to-yellow-600
      transition-all duration-200
      active:scale-95
    "
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="
      flex-1 py-2.5 rounded-xl
      bg-gradient-to-r from-red-600 to-red-700
      text-white font-semibold
      shadow-lg shadow-red-600/30
      hover:from-red-700 hover:to-red-800
      transition-all duration-200
      active:scale-95
    "
                  >
                    🗑️ Delete
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

          <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              Edit Expense
            </h2>

            <div className="space-y-3">
              {["title", "amount", "category", "date"].map((field, idx) => (
                <input
                  key={idx}
                  type={field === "amount" ? "number" : field === "date" ? "date" : "text"}
                  value={editExpense[field]}
                  onChange={(e) =>
                    setEditExpense({ ...editExpense, [field]: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700"
                />
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveEdit}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
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
