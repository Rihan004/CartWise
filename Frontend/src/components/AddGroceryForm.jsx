import { useState } from "react";

const AddGroceryForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    cost: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.quantity)
      return alert("Please fill all required fields");

    try {
      // 🔑 Include token in Authorization header
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/groceries/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        onAdd(data); // update parent state
        setForm({ name: "", quantity: "", cost: "", category: "" });
      } else {
        alert(data.message || "Failed to add grocery");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="mx-3 sm:mx-auto mt-6 sm:mt-10 w-full max-w-md bg-white/80 backdrop-blur-lg shadow-lg sm:shadow-xl rounded-2xl p-4 sm:p-6 border border-gray-200 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-indigo-700 mb-5 sm:mb-6">
        🛒 Add Grocery Item
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Item Name
            </label>
            <input
              type="text"
              placeholder="e.g. Apples"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Quantity
            </label>
            <input
              type="number"
              placeholder="e.g. 2 kg"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              required
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Cost
            </label>
            <input
              type="number"
              placeholder="₹ Price"
              value={form.cost}
              onChange={(e) => setForm({ ...form, cost: e.target.value })}
              className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Category
            </label>
            <input
              type="text"
              placeholder="e.g. Fruits"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-3 bg-indigo-600 text-white py-2 sm:py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          ➕ Add Grocery
        </button>
      </form>
    </div>
  );
};

export default AddGroceryForm;
