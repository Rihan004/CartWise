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
    if (loading) return; // ⛔ prevents double submission

    if (!form.name || !form.quantity) {
      return alert("Please fill required fields");
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/groceries/add",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onAdd(res.data); // update UI immediately
      setForm({ name: "", quantity: "", cost: "", category: "" });

    } catch (error) {
      console.error(error);
      alert("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-3 sm:mx-auto mt-6 sm:mt-10 w-full max-w-md bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-4 sm:p-6 border border-gray-200">
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-indigo-700 mb-5">
        🛒 Add Grocery Item
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Item name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 border rounded-lg"
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="p-2 border rounded-lg"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Cost ₹"
            value={form.cost}
            onChange={(e) => setForm({ ...form, cost: e.target.value })}
            className="p-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? "Adding..." : "➕ Add Grocery"}
        </button>
      </form>
    </div>
  );
};

export default AddGroceryForm;
