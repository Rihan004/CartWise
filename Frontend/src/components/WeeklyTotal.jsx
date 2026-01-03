import { useState } from "react";
import axios from "axios";

const WeeklyTotal = () => {
  const [week, setWeek] = useState("");
  const [expenseTotal, setExpenseTotal] = useState(null);
  const [groceryTotal, setGroceryTotal] = useState(null);

  const fetchTotals = async () => {
    try {
      const token = localStorage.getItem("token");

      const [expenseRes, groceryRes] = await Promise.all([
        axios.get(
          `http://localhost:5000/api/analytics/expenses/total/weekly?week=${week}`,
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        axios.get(
          `http://localhost:5000/api/analytics/groceries/total/weekly?week=${week}`,
          { headers: { Authorization: `Bearer ${token}` } }
        ),
      ]);

      setExpenseTotal(expenseRes.data.total || 0);
      setGroceryTotal(groceryRes.data.total || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const combinedTotal = Number(expenseTotal || 0) + Number(groceryTotal || 0);

  return (
    <div className="w-full max-w-xl mx-auto px-2 sm:px-4">
      <h2 className="text-2xl font-bold text-white mb-4 text-center sm:text-left">
        Weekly <span className="text-purple-400">Total</span>
      </h2>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-end">
        <input
          type="date"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          className="
            p-3 rounded-xl
            bg-white/10 text-white
            border border-white/20
            focus:ring-2 focus:ring-purple-500
            outline-none
            w-full
          "
        />

        <button
          onClick={fetchTotals}
          className="
            p-3 rounded-xl
            bg-purple-600 text-white
            hover:bg-purple-700 transition
            w-full sm:w-auto
          "
        >
          Fetch
        </button>
      </div>

      {/* Results */}
      {(expenseTotal !== null || groceryTotal !== null) && (
        <div className="mt-6 space-y-4">
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow">
            <p className="flex justify-between items-center text-sm sm:text-base text-gray-300">
              <span>Expense Total</span>
              <span className="text-indigo-400 font-semibold">
                ₹{expenseTotal}
              </span>
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow">
            <p className="flex justify-between items-center text-sm sm:text-base text-gray-300">
              <span>Grocery Total</span>
              <span className="text-purple-400 font-semibold">
                ₹{groceryTotal}
              </span>
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
            <p className="flex justify-between items-center text-base sm:text-lg font-bold text-white">
              <span>Combined Total</span>
              <span>₹{combinedTotal}</span>
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

export default WeeklyTotal;
