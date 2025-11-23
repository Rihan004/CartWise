import { useState } from "react";
import axios from "axios";

const WeeklyTotal = () => {
  const [week, setWeek] = useState("");
  const [total, setTotal] = useState(null);

  const fetchTotal = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/analytics/expenses/total/weekly?week=${week}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTotal(res.data.total);
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
        onClick={fetchTotal}
        className="ml-3 p-3 bg-indigo-600 text-white rounded-lg"
      >
        Fetch
      </button>

      {total !== null && (
        <p className="mt-4 text-xl font-semibold">Total: ₹{total}</p>
      )}
    </div>
  );
};

export default WeeklyTotal;
