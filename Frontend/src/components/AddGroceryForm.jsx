import { useState } from "react";
import axios from "axios";

const AddGroceryForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    cost: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!form.name || !form.quantity) {
      return alert("Please fill required fields");
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/groceries/add`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onAdd(res.data);
      setForm({ name: "", quantity: "", cost: "", category: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 sm:mx-auto mt-6 sm:mt-10 w-full max-w-md rounded-2xl bg-gray-900/90 backdrop-blur-xl border border-gray-700 shadow-2xl p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-purple-400 mb-6">
        🛒 Add Grocery Item
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Item name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="
              w-full p-3 rounded-xl
              bg-gray-800 text-white placeholder-gray-400
              border border-gray-700
              focus:ring-2 focus:ring-purple-500 focus:border-purple-500
              outline-none transition
            "
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="
              w-full p-3 rounded-xl
              bg-gray-800 text-white placeholder-gray-400
              border border-gray-700
              focus:ring-2 focus:ring-purple-500 focus:border-purple-500
              outline-none transition
            "
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Cost ₹"
            value={form.cost}
            onChange={(e) => setForm({ ...form, cost: e.target.value })}
            className="
              w-full p-3 rounded-xl
              bg-gray-800 text-white placeholder-gray-400
              border border-gray-700
              focus:ring-2 focus:ring-purple-500 focus:border-purple-500
              outline-none transition
            "
          />

          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="
              w-full p-3 rounded-xl
              bg-gray-800 text-white placeholder-gray-400
              border border-gray-700
              focus:ring-2 focus:ring-purple-500 focus:border-purple-500
              outline-none transition
            "
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-3 rounded-xl font-semibold
            bg-gradient-to-r from-purple-500 to-purple-700 text-white
            hover:bg-purple-700
            shadow-lg shadow-purple-500/30
            hover:opacity-90 transition
          "
        >
          {loading ? "Adding..." : "➕ Add Grocery"}
        </button>
      </form>
    </div>
  );
};

export default AddGroceryForm;
