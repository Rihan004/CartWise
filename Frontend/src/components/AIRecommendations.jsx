import { useState } from "react";
import axios from "axios";
import EditItemModal from "./EditItemModal";

const AIRecommendations = ({ groceries, onAdd }) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setSuggestions([]);

      const items = groceries.map((g) => g.name);

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/recommend`, {
        items,
      });

      setSuggestions(res.data.suggestions);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch AI recommendations");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (updatedItem) => {
    onAdd({
      user_id: 1,
      name: updatedItem.name,
      quantity: updatedItem.quantity,
      cost: updatedItem.cost,
      category: "AI Suggested",
    });
  };

  return (
    <div className="mt-10 mx-2 sm:mx-6">
      {/* Action button */}
      <button
        onClick={fetchRecommendations}
        className="
          w-full py-3 rounded-xl font-semibold
          bg-purple-600 text-white
          hover:bg-purple-700
          transition-all duration-300
          shadow-lg hover:shadow-purple-500/30
        "
      >
        ✨ Get AI Suggestions
      </button>

      {/* Loading */}
      {loading && (
        <p className="text-center text-purple-300 mt-4 animate-pulse">
          AI is thinking... ⏳
        </p>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="
                p-4 rounded-2xl
                bg-gray-900/90 backdrop-blur-xl
                border border-gray-700
                shadow-xl
                transition hover:shadow-purple-500/20
              "
            >
              <p className="text-lg font-semibold text-white">
                {item.name}
              </p>

              <p className="text-gray-400 mt-1">
                Estimated Price:{" "}
                <span className="font-semibold text-purple-400">
                  ₹{item.estimated_price}
                </span>
              </p>

              <button
                onClick={() => {
                  setEditingItem({
                    name: item.name,
                    quantity: 1,
                    cost: item.estimated_price,
                  });
                  setIsModalOpen(true);
                }}
                className="
                  mt-4 w-full py-2 rounded-xl
                  bg-indigo-600 text-white font-medium
                  hover:bg-indigo-700
                  transition-all duration-300
                  shadow-md
                "
              >
                ➕ Add to Grocery
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <EditItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        onSave={handleSave}
      />
    </div>
  );
};

export default AIRecommendations;
