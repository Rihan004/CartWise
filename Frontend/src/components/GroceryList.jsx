import { Trash2 } from "lucide-react";

const GroceryList = ({ groceries, onDelete }) => {
  if (groceries.length === 0)
    return (
      <div className="mx-4 mt-6 py-12 text-center 
                      bg-white/5 backdrop-blur-xl 
                      border border-white/10 
                      rounded-3xl shadow-xl">
        <p className="text-lg font-semibold text-gray-200">
          No groceries added yet 🥦
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Start by adding items to your list
        </p>
      </div>
    );

  return (
    <div className="mt-8 mx-4 bg-white/5 backdrop-blur-xl 
                    border border-white/10 
                    rounded-3xl shadow-2xl p-6">
      <h2 className="text-2xl font-extrabold text-center mb-6 text-white">
        🧺 Grocery <span className="text-purple-400">List</span>
      </h2>

      <ul className="space-y-4">
        {groceries.map((item) => (
          <li
            key={item.id}
            className="bg-gray-900/70 border border-gray-700 
                       rounded-2xl p-4 
                       hover:border-purple-500 
                       transition shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white break-words">
                  {item.name}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-300">
                  <span>
                    <span className="text-purple-400 font-medium">Qty:</span>{" "}
                    {item.quantity}
                  </span>

                  <span className="hidden sm:inline text-gray-500">•</span>

                  <span>
                    <span className="text-purple-400 font-medium">₹</span>
                    {item.cost}
                  </span>

                  <span className="hidden sm:inline text-gray-500">•</span>

                  <span className="truncate max-w-[160px] sm:max-w-none text-gray-400">
                    {item.category || "Uncategorized"}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="flex justify-end">
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-3 rounded-full 
                             bg-red-600/90 hover:bg-red-700 
                             text-white shadow-lg 
                             active:scale-95 transition
                             focus:outline-none focus:ring-2 focus:ring-red-500/40"
                  title="Delete Item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
