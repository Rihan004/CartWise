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
        axios.get(`http://localhost:5000/api/analytics/expenses/total/weekly?week=${week}`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`http://localhost:5000/api/analytics/groceries/total/weekly?week=${week}`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setExpenseTotal(expenseRes.data.total || 0);
      setGroceryTotal(groceryRes.data.total || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const combinedTotal = Number(expenseTotal || 0) + Number(groceryTotal || 0);

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4 text-center sm:text-left">
        Weekly Total (Expense + Grocery)
      </h2>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-end">
        <input
          type="date"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        <button
          onClick={fetchTotals}
          className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition w-full sm:w-auto"
        >
          Fetch
        </button>
      </div>

      {/* Results */}
      {(expenseTotal !== null || groceryTotal !== null) && (
        <div className="mt-6 space-y-3 text-base sm:text-lg">
          <div className="bg-indigo-50 p-4 rounded-xl shadow-sm">
            <p className="flex justify-between">
              <span className="font-medium">Expense Total</span>
              <span className="font-bold text-indigo-700">₹{expenseTotal}</span>
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl shadow-sm">
            <p className="flex justify-between">
              <span className="font-medium">Grocery Total</span>
              <span className="font-bold text-purple-700">₹{groceryTotal}</span>
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl shadow-md">
            <p className="flex justify-between text-lg sm:text-xl font-bold">
              <span>Combined Total</span>
              <span className="text-green-700">₹{combinedTotal}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyTotal;
