import { useState } from "react";
import axios from "axios";

const MonthlyTotal = () => {
  const [month, setMonth] = useState("");
  const [expenseTotal, setExpenseTotal] = useState(null);
  const [groceryTotal, setGroceryTotal] = useState(null);

  const fetchTotals = async () => {
    try {
      const token = localStorage.getItem("token");

      const expenseRes = await axios.get(
        `http://localhost:5000/api/analytics/expenses/total/monthly?month=${month}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const groceryRes = await axios.get(
        `http://localhost:5000/api/analytics/groceries/total/monthly?month=${month}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setExpenseTotal(expenseRes.data.total);
      setGroceryTotal(groceryRes.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  const combinedTotal =
    Number(expenseTotal || 0) + Number(groceryTotal || 0);

  return (
    <div className="w-full px-2 sm:px-4">

      {/* Heading */}
      <h2 className="text-2xl font-bold text-white mb-6">
        Monthly <span className="text-purple-400">Total</span>
      </h2>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full sm:w-64 p-3 rounded-xl
                     bg-gray-900/70 text-white
                     border border-gray-700
                     focus:border-purple-500
                     focus:ring-2 focus:ring-purple-500/30
                     outline-none transition"
        />

        <button
          onClick={fetchTotals}
          className="w-full sm:w-auto px-6 py-3 rounded-xl
                     bg-gradient-to-r from-purple-500 to-purple-700
                     text-white font-semibold
                     shadow-lg shadow-purple-500/30
                     hover:opacity-90 transition"
        >
          Fetch Totals
        </button>
      </div>

      {/* Results */}
      {(expenseTotal !== null || groceryTotal !== null) && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Expense */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10
                          rounded-2xl p-5 shadow-lg">
            <p className="text-sm text-gray-400 mb-1">Expense Total</p>
            <p className="text-2xl font-bold text-purple-400">
              ₹{expenseTotal}
            </p>
          </div>

          {/* Grocery */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10
                          rounded-2xl p-5 shadow-lg">
            <p className="text-sm text-gray-400 mb-1">Grocery Total</p>
            <p className="text-2xl font-bold text-indigo-400">
              ₹{groceryTotal}
            </p>
          </div>

          {/* Combined */}
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20
                          border border-purple-500/30
                          rounded-2xl p-5 shadow-xl
                          sm:col-span-2 lg:col-span-1">
            <p className="text-sm text-gray-300 mb-1">Combined Total</p>
            <p className="text-3xl font-extrabold text-white">
              ₹{combinedTotal}
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

export default MonthlyTotal;
