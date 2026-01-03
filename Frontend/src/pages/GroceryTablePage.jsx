import { useEffect, useState } from "react";
import axios from "axios";

const GroceryTablePage = () => {
  const [groceries, setGroceries] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = localStorage.getItem("token");

  const fetchGroceries = async (query = "") => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/groceries${query}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGroceries(res.data);
    } catch (err) {
      console.error("Error fetching groceries:", err);
    }
  };

  useEffect(() => {
    fetchGroceries();
  }, []);

  const handleFilter = () => {
    let query = "";
    if (startDate && endDate) query = `?start=${startDate}&end=${endDate}`;
    else if (startDate) query = `?start=${startDate}`;
    else if (endDate) query = `?end=${endDate}`;
    fetchGroceries(query);
  };

  const resetFilter = () => {
    setStartDate("");
    setEndDate("");
    fetchGroceries();
  };

  const totalItems = groceries.length;
  const totalPrice = groceries.reduce(
    (acc, item) => acc + Number(item.cost || 0) * Number(item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-5 sm:p-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-400 mb-6">
          📊 Grocery List
        </h1>

        {/* Filters */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
          <h2 className="font-semibold text-purple-300 mb-3">
            🔍 Filter by Date
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-900 text-white border border-gray-700"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-900 text-white border border-gray-700"
            />

            <div className="flex gap-2">
              <button
                onClick={handleFilter}
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Apply
              </button>
              <button
                onClick={resetFilter}
                className="flex-1 bg-gray-700 text-gray-200 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Data */}
        {groceries.length === 0 ? (
          <p className="text-center py-10 text-gray-400">
            No grocery items found 🥲
          </p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-700 rounded-xl overflow-hidden">
                <thead className="bg-purple-700 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Qty</th>
                    <th className="px-4 py-3 text-left">Cost (₹)</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Added On</th>
                  </tr>
                </thead>

                <tbody className="bg-gray-900">
                  {groceries.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-700 hover:bg-gray-800 transition"
                    >
                      <td className="px-4 py-3 text-white">{item.name}</td>
                      <td className="px-4 py-3 text-gray-300">{item.quantity}</td>
                      <td className="px-4 py-3 text-gray-300">₹{item.cost}</td>
                      <td className="px-4 py-3 text-gray-400">
                        {item.category || "Uncategorized"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot className="bg-gray-800 text-purple-300 font-semibold">
                  <tr>
                    <td className="px-4 py-3">Total Items</td>
                    <td className="px-4 py-3">{totalItems}</td>
                    <td className="px-4 py-3">₹{totalPrice}</td>
                    <td className="px-4 py-3" colSpan={2}>
                      Filtered Total
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden grid gap-4">
              {groceries.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-gray-800 border border-gray-700 rounded-2xl shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-white">{item.name}</p>
                    <span className="text-xs text-purple-400">
                      {item.category || "Uncategorized"}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-300">
                    <p>Qty: {item.quantity}</p>
                    <p>₹{item.cost}</p>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Added: {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="text-center mt-8">
          <a
            href="/grocery"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition shadow-lg"
          >
            ⬅ Back to Grocery Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default GroceryTablePage;
