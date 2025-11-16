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

      const res = await axios.post("http://localhost:5000/api/recommend", {
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
    <div className="mt-8 mx-3 sm:mx-6">
      <button
        onClick={fetchRecommendations}
        className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all shadow-md"
      >
         Get AI Suggestions ✨
      </button>

      {loading && (
        <p className="text-center text-gray-600 mt-4 animate-pulse">
          AI is thinking... ⏳
        </p>
      )}

      {suggestions.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white/80 backdrop-blur-lg shadow-md border rounded-xl"
            >
              <p className="text-lg font-semibold text-gray-800">
                {item.name}
              </p>
              <p className="text-gray-600 mt-1">
                Estimated Price: ₹{item.estimated_price}
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
                className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
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
