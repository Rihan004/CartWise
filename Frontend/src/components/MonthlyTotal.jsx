import { useState } from "react";
import axios from "axios";

const MonthlyTotal = () => {
  const [month, setMonth] = useState("");
  const [expenseTotal, setExpenseTotal] = useState(null);
  const [groceryTotal, setGroceryTotal] = useState(null);

  const fetchTotals = async () => {
    try {
      const token = localStorage.getItem("token");

      // Expense Monthly Total
      const expenseRes = await axios.get(
        `http://localhost:5000/api/analytics/expenses/total/monthly?month=${month}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Grocery Monthly Total
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
    <div>
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Monthly Total (Expense + Grocery)
      </h2>

      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="p-3 border rounded-lg"
      />

      <button
        onClick={fetchTotals}
        className="ml-3 p-3 bg-indigo-600 text-white rounded-lg"
      >
        Fetch
      </button>

      {(expenseTotal !== null || groceryTotal !== null) && (
        <div className="mt-4 space-y-2 text-lg">
          <p><b>Expense Total:</b> ₹{expenseTotal}</p>
          <p><b>Grocery Total:</b> ₹{groceryTotal}</p>
          <p className="text-xl font-bold">
            Combined Total: ₹{combinedTotal}
          </p>
        </div>
      )}
    </div>
  );
};

export default MonthlyTotal;
