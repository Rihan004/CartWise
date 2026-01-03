import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddGroceryForm from "../components/AddGroceryForm";
import GroceryList from "../components/GroceryList";
import AIRecommendations from "../components/AIRecommendations";

const GroceryPage = () => {
  const [groceries, setGroceries] = useState([]);
  const token = localStorage.getItem("token");

  const fetchGroceries = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/groceries/today",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGroceries(res.data);
    } catch (err) {
      console.error("Error fetching groceries:", err);
    }
  };

  useEffect(() => {
    fetchGroceries();
  }, []);

  // Add item (optimistic UI)
  const handleAdd = (newItem) => {
    setGroceries((prev) => [newItem, ...prev]);
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/groceries/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGroceries((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl 
                      border border-white/10 rounded-3xl 
                      shadow-2xl p-6 sm:p-10">

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-white">
          Grocery <span className="text-purple-400">Planner</span> 🛒
        </h1>

        {/* History Button */}
        <div className="flex justify-center mb-8">
          <Link
            to="/table-view"
            className="w-full sm:w-auto text-center
                       bg-gradient-to-r from-purple-500 to-purple-700
                       text-white px-6 py-3 rounded-xl font-semibold
                       shadow-lg shadow-purple-500/30
                       hover:opacity-90 transition"
          >
            📊 View Full Grocery History & Costs
          </Link>
        </div>

        {/* Add Grocery Form */}
        <div className="mb-10">
          <AddGroceryForm onAdd={handleAdd} />
        </div>

        {/* Grocery List */}
        <GroceryList
          groceries={groceries}
          onDelete={handleDelete}
        />

        {/* AI Recommendations */}
        <div className="mt-10">
          <AIRecommendations
            groceries={groceries}
            onAdd={handleAdd}
          />
        </div>
      </div>
    </div>
  );
};

export default GroceryPage;
