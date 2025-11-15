import { Trash2 } from "lucide-react";

const GroceryList = ({ groceries, onDelete }) => {
  if (groceries.length === 0)
    return (
      <div className="text-center text-gray-500 py-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 mx-2 sm:mx-6">
        <p className="text-lg font-medium">No groceries added yet 🥦</p>
        <p className="text-sm text-gray-400 mt-1">Start by adding a new item above!</p>
      </div>
    );

  return (
    <div className="mt-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 mx-2 sm:mx-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-indigo-700 mb-4 text-center">
        🧺 Grocery List
      </h2>

      <ul className="space-y-3">
        {groceries.map((item) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-indigo-50 hover:bg-indigo-100 transition-all duration-300 p-4 rounded-xl shadow-sm border border-indigo-100"
          >
            <div className="flex flex-col w-full sm:w-auto">
              <p className="font-semibold text-lg text-gray-800 break-words">{item.name}</p>
              <p className="text-gray-600 text-sm mt-1 sm:mt-0.5">
                <span className="font-medium text-gray-700">Qty:</span> {item.quantity} &nbsp;•&nbsp;
                <span className="font-medium text-gray-700">₹</span>{item.cost} &nbsp;•&nbsp;
                <span className="font-medium text-gray-700">{item.category || "Uncategorized"}
                </span>
              </p>
            </div>

            <div className="mt-3 sm:mt-0 sm:ml-3 flex justify-end">
              <button
                onClick={() => onDelete(item.id)}
                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                title="Delete Item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
