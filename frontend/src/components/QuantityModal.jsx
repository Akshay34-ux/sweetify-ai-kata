// src/components/QuantityModal.jsx
import React, { useState, useEffect } from "react";

export default function QuantityModal({ open, onClose, onConfirm, defaultQty = 1 }) {
  const [qty, setQty] = useState(defaultQty);

  useEffect(() => {
    if (open) setQty(defaultQty);
  }, [open, defaultQty]);

  if (!open) return null;

  const increase = () => setQty((q) => q + 1);
  const decrease = () => setQty((q) => Math.max(1, q - 1));
  const onChange = (e) => {
    const val = Number(e.target.value) || 1;
    setQty(Math.max(1, val));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
      onMouseDown={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 animate-fadeIn"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Choose Quantity
        </h3>

        <div className="flex items-center justify-center gap-3 mb-5">
          <button
            onClick={decrease}
            className="px-4 py-2 text-lg border rounded-full hover:bg-gray-100"
          >
            −
          </button>
          <input
            type="number"
            className="w-20 text-center border rounded-lg px-2 py-2 text-lg font-medium"
            value={qty}
            min={1}
            onChange={onChange}
          />
          <button
            onClick={increase}
            className="px-4 py-2 text-lg border rounded-full hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(qty)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Buy {qty}
          </button>
        </div>
      </div>
    </div>
  );
}