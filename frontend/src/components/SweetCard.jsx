import React from "react";

export default function SweetCard({ item, onPurchase, isAuthenticated, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow flex gap-4">
      <img
        src={item.image || "https://via.placeholder.com/150"}
        alt={item.name}
        className="w-28 h-28 object-cover rounded"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <div className="text-sm text-gray-500">₹{item.price}</div>
        </div>

        <p className="text-sm text-gray-600 mt-2">{item.description}</p>

        <div className="mt-3 flex items-center gap-3">
          <div className="text-xs text-gray-500">Stock: {item.stock}</div>

          <button
            disabled={!isAuthenticated || item.stock <= 0}
            onClick={() => onPurchase && onPurchase(item)}
            className={
              "px-3 py-1 rounded " +
              ((!isAuthenticated || item.stock <= 0) ? "bg-gray-200 text-gray-500" : "bg-blue-600 text-white")
            }
          >
            {item.stock > 0 ? "Purchase" : "Out of stock"}
          </button>

          {onEdit && (
            <button onClick={() => onEdit(item)} className="px-2 py-1 text-sm border rounded">
              Edit
            </button>
          )}

          {onDelete && (
            <button onClick={() => onDelete(item)} className="px-2 py-1 text-sm border rounded text-red-600">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}