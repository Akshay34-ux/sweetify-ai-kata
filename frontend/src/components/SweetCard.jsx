// src/components/SweetCard.jsx
import React from "react";

export default function SweetCard({ item, onOpenQuantity, isPurchasing, onEdit, onDelete }) {
  // item may or may not include .stock (for non-admin)
  const inStock = typeof item.stock === "number" ? item.stock > 0 : true; // if hidden, assume available (UI won't show count)
  const priceText = item.price ? `₹${item.price}` : "-";

  return (
    <article className="bg-white rounded-lg shadow-sm border hover:shadow-md transition p-4 flex gap-4 items-start">
      <img
        src={item.image || "/placeholder.png"}
        alt={item.name}
        className="w-28 h-28 rounded object-cover flex-shrink-0"
      />

      <div className="flex-1">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h4 className="text-lg font-semibold">{item.name}</h4>
            <div className="text-sm text-gray-500 mt-1">{item.category}</div>
          </div>
          <div className="text-lg font-semibold">{priceText}</div>
        </div>

        <p className="text-sm text-gray-600 mt-3 line-clamp-2">{item.description}</p>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => onOpenQuantity(item)}
            disabled={!inStock || isPurchasing}
            className={
              "px-4 py-2 rounded shadow-sm text-sm " +
              (!inStock ? "bg-gray-100 text-gray-500" : "bg-blue-600 text-white hover:bg-blue-700")
            }
          >
            {isPurchasing ? "Processing..." : inStock ? "Buy" : "Out of stock"}
          </button>

          {onEdit && (
            <button onClick={() => onEdit(item)} className="px-3 py-1 border rounded text-sm">
              Edit
            </button>
          )}

          {onDelete && (
            <button onClick={() => onDelete(item)} className="px-3 py-1 border rounded text-sm text-red-600">
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
}