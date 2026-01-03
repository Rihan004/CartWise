import { useEffect, useState } from "react";

const EditItemModal = ({ isOpen, onClose, item, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    quantity: 1,
    cost: 0,
  });

  // ✅ Keep form in sync when item changes
  useEffect(() => {
    if (item) {
      setForm({
        name: item.name || "",
        quantity: item.quantity || 1,
        cost: item.cost || 0,
      });
    }
  }, [item]);

  // ESC key close
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/60 backdrop-blur-sm px-3"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md
          rounded-2xl
          bg-gray-900 text-white
          border border-gray-700
          shadow-2xl
          p-5 sm:p-6
          animate-fadeIn
        "
      >
        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-bold text-center text-purple-400 mb-6">
          ✏️ Edit Grocery Item
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Item Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="
                w-full mt-1 p-3 rounded-xl
                bg-gray-800 text-white
                border border-gray-700
                focus:ring-2 focus:ring-purple-500
                focus:border-purple-500
                outline-none transition
              "
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Quantity</label>
            <input
              type="number"
              min={1}
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
              className="
                w-full mt-1 p-3 rounded-xl
                bg-gray-800 text-white
                border border-gray-700
                focus:ring-2 focus:ring-purple-500
                focus:border-purple-500
                outline-none transition
              "
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Estimated Price</label>
            <input
              type="number"
              min={0}
              value={form.cost}
              onChange={(e) =>
                setForm({ ...form, cost: Number(e.target.value) })
              }
              className="
                w-full mt-1 p-3 rounded-xl
                bg-gray-800 text-white
                border border-gray-700
                focus:ring-2 focus:ring-purple-500
                focus:border-purple-500
                outline-none transition
              "
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="
              flex-1 py-2.5 rounded-xl
              bg-gray-700 text-gray-200
              hover:bg-gray-600
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              flex-1 py-2.5 rounded-xl
              bg-purple-600 text-white font-semibold
              hover:bg-purple-700
              transition
              shadow-lg hover:shadow-purple-500/30
            "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;
