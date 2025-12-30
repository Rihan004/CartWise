import { useState, useEffect } from "react";
import axios from "axios";
import AddGroceryForm from "../components/AddGroceryForm";
import GroceryList from "../components/GroceryList";
import AIRecommendations from "../components/AIRecommendations";

const GroceryPage = () => {
  const [groceries, setGroceries] = useState([]);
  const token = localStorage.getItem("token");

  const fetchGroceries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/groceries/today", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroceries(res.data);
    } catch (err) {
      console.error("Error fetching groceries:", err);
    }
  };

  useEffect(() => {
    fetchGroceries(); // runs once
  }, []); 

  // 🔥 Add Item (Now stable & no double insert)
  const handleAdd = (newItem) => {
    setGroceries((prev) => [newItem, ...prev]);
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/groceries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setGroceries((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-200 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-indigo-700 drop-shadow-sm">
          Grocery Planner 🛒
        </h1>

        <div className="text-center mb-8">
          <a
            href="/table-view"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-300"
          >
            📊 View Full Grocery History & Estimated Costs
          </a>
        </div>

        <AddGroceryForm onAdd={handleAdd} />

        <div className="mt-8">
          <GroceryList groceries={groceries} onDelete={handleDelete} />
          <AIRecommendations groceries={groceries} onAdd={handleAdd} />
        </div>
      </div>
    </div>
  );
};

export default GroceryPage;
