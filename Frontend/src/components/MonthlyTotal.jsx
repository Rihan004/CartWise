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
    <div className="w-full p-2 sm:p-4">
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-6">
        Monthly Total (Expense + Grocery)
      </h2>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-3 border rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        <button
          onClick={fetchTotals}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Fetch
        </button>
      </div>

      {/* Results */}
      {(expenseTotal !== null || groceryTotal !== null) && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div className="bg-indigo-50 p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Expense Total</p>
            <p className="text-xl font-bold text-indigo-700">
              ₹{expenseTotal}
            </p>
          </div>

          <div className="bg-purple-50 p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Grocery Total</p>
            <p className="text-xl font-bold text-purple-700">
              ₹{groceryTotal}
            </p>
          </div>

          <div className="bg-green-50 p-5 rounded-xl shadow-md sm:col-span-2 lg:col-span-1">
            <p className="text-sm text-gray-600 mb-1">Combined Total</p>
            <p className="text-2xl font-extrabold text-green-700">
              ₹{combinedTotal}
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

export default MonthlyTotal;
