import { useEffect, useState } from "react";
import axios from "axios";

const GroceryTablePage = () => {
  const [groceries, setGroceries] = useState([]);

  // Filter states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ✅ Get token from localStorage
  const token = localStorage.getItem("token");

  const fetchGroceries = async (query = "") => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/groceries${query}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // 🔑 Pass token
        }
      );
      setGroceries(res.data);
    } catch (err) {
      console.error("Error fetching groceries:", err);
    }
  };

  useEffect(() => {
    fetchGroceries(); // load all initially
  }, []);

  // Apply Date Filters
  const handleFilter = () => {
    let query = "";

    if (startDate && endDate) {
      query = `?start=${startDate}&end=${endDate}`;
    } else if (startDate) {
      query = `?start=${startDate}`;
    } else if (endDate) {
      query = `?end=${endDate}`;
    }

    fetchGroceries(query);
  };

  // Reset filters
  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    fetchGroceries();
  };

  // Calculate totals
  const totalItems = groceries.length;
  const totalPrice = groceries.reduce((acc, item) => {
    const itemTotal = Number(item.cost || 0) * Number(item.quantity || 1);
    return acc + itemTotal;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 mb-6">
          📊 Grocery List (Table View)
        </h1>

        {/* 🎯 Date Filters */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6 shadow-sm">
          <h2 className="font-semibold text-indigo-700 mb-3">
            🔍 Filter by Date
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-gray-600">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={handleFilter}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Apply
              </button>
              <button
                onClick={resetFilter}
                className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* 📋 Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-xl overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Cost (₹)</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Added On</th>
              </tr>
            </thead>

            <tbody>
              {groceries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No grocery items found 🥲
                  </td>
                </tr>
              ) : (
                groceries.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-indigo-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3">₹{item.cost}</td>
                    <td className="px-4 py-3">
                      {item.category || "Uncategorized"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            {/* Footer Summary */}
            {groceries.length > 0 && (
              <tfoot>
                <tr className="bg-purple-50 font-semibold">
                  <td className="px-4 py-3">Total Items</td>
                  <td className="px-4 py-3">{totalItems}</td>
                  <td className="px-4 py-3">₹{totalPrice}</td>
                  <td className="px-4 py-3" colSpan={2}>
                    : Filtered Total Price
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        <div className="text-center mt-8">
          <a
            href="/grocery"
            className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition"
          >
            ⬅ Back to Grocery Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default GroceryTablePage;
