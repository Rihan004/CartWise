import { useEffect, useState } from "react";
import axios from "axios";

const AllExpensesAnalytics = () => {
  const [expenses, setExpenses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/expenses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    }
  };

  const applyFilter = () => {
    let data = [...expenses];

    if (fromDate) {
      data = data.filter(
        (e) => new Date(e.date) >= new Date(fromDate)
      );
    }

    if (toDate) {
      data = data.filter(
        (e) => new Date(e.date) <= new Date(toDate)
      );
    }

    setFiltered(data);
  };

  return (
    <div className="w-full">

      {/* Header */}
      <h2 className="text-2xl font-bold text-white mb-6">
        📋 All Expenses
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="
            flex-1 p-3 rounded-xl
            bg-gray-900/70 text-white
            border border-gray-700
            focus:ring-2 focus:ring-purple-500 outline-none
          "
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="
            flex-1 p-3 rounded-xl
            bg-gray-900/70 text-white
            border border-gray-700
            focus:ring-2 focus:ring-purple-500 outline-none
          "
        />

        <button
          onClick={applyFilter}
          className="
            px-6 py-3 rounded-xl
            bg-purple-600 text-white font-semibold
            hover:bg-purple-700
            shadow-lg shadow-purple-500/30
            transition
          "
        >
          Apply
        </button>
      </div>

      {/* Expenses List */}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          No expenses found for selected dates
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((exp) => (
            <div
              key={exp.id}
              className="
                bg-gray-900/70
                border border-gray-700
                rounded-2xl
                p-5
                shadow hover:border-purple-500
                transition
              "
            >
              <h3 className="text-lg font-semibold text-white">
                {exp.title}
              </h3>

              <p className="mt-1 text-gray-300">
                <span className="text-purple-400 font-bold">
                  ₹{exp.amount}
                </span>{" "}
                • {exp.category || "Uncategorized"}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                📅 {exp.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllExpensesAnalytics;
