import { useState } from "react";
import axios from "axios";

const WeeklyTotal = () => {
  const [week, setWeek] = useState("");
  const [expenseTotal, setExpenseTotal] = useState(null);
  const [groceryTotal, setGroceryTotal] = useState(null);
  const [combinedTotal, setCombinedTotal] = useState(null);

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

      const expense = expenseRes.data.total || 0;
      const grocery = groceryRes.data.total || 0;

      setExpenseTotal(expense);
      setGroceryTotal(grocery);
      setCombinedTotal(expense + grocery);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Weekly Total</h2>

      <input
        type="date"
        value={week}
        onChange={(e) => setWeek(e.target.value)}
        className="p-3 border rounded-lg"
      />

      <button
        onClick={fetchTotals}
        className="ml-3 p-3 bg-indigo-600 text-white rounded-lg"
      >
        Fetch
      </button>

      {expenseTotal !== null && (
        <p className="mt-4 text-lg font-semibold">
          Expense Total: ₹{expenseTotal}
        </p>
      )}

      {groceryTotal !== null && (
        <p className="text-lg font-semibold">
          Grocery Total: ₹{groceryTotal}
        </p>
      )}

      {combinedTotal !== null && (
        <p className="text-xl font-bold text-green-600 mt-2">
          Combined Total: ₹{combinedTotal}
        </p>
      )}
    </div>
  );
};

export default WeeklyTotal;
