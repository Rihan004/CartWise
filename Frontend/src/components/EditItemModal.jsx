import React from "react";

const EditItemModal = ({ isOpen, onClose, item, onSave }) => {
  if (!isOpen) return null;

  const [form, setForm] = React.useState({
    name: item?.name || "",
    quantity: item?.quantity || 1,
    cost: item?.cost || 0,
  });

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Edit Item
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Item Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Quantity</label>
            <input
              type="number"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
              className="w-full mt-1 p-2 border rounded-lg focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Estimated Price</label>
            <input
              type="number"
              value={form.cost}
              onChange={(e) =>
                setForm({ ...form, cost: Number(e.target.value) })
              }
              className="w-full mt-1 p-2 border rounded-lg focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditItemModal;
