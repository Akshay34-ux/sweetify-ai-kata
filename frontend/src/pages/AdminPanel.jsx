// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import API from "../lib/api";

export default function AdminPanel({ user }) {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    category: "Other",
    stock: 0,
    image: "",
  });

  useEffect(() => {
    fetchSweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchSweets() {
    try {
      const res = await API.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error("fetchSweets:", err?.response?.data || err.message);
      alert("Failed to load sweets");
    }
  }

  const create = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Login as admin required");
      await API.post("/sweets", form, { headers: { Authorization: `Bearer ${token}` } });
      setForm({ name: "", description: "", price: 0, category: "Other", stock: 0, image: "" });
      fetchSweets();
      alert("Added");
    } catch (err) {
      alert(err?.response?.data?.message || "Error adding sweet");
    }
  };

  const restock = async (id) => {
    const q = prompt("Quantity to add", "10");
    if (!q) return;
    try {
      const token = localStorage.getItem("token");
      await API.post(`/sweets/${id}/restock`, { quantity: Number(q) }, { headers: { Authorization: `Bearer ${token}` } });
      fetchSweets();
      alert("Restocked");
    } catch (err) {
      alert(err?.response?.data?.message || "Error restocking");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/sweets/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchSweets();
      alert("Deleted");
    } catch (err) {
      alert(err?.response?.data?.message || "Error deleting");
    }
  };

  if (!user || user.role !== "admin") {
    return <div className="max-w-md mx-auto bg-white p-6 rounded shadow">Admin access required. Log in as an admin to use this page.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>

      <div className="mb-6 bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Add Sweet</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2 border rounded" />
          <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="px-3 py-2 border rounded" />
          <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="px-3 py-2 border rounded" />
          <input placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} className="px-3 py-2 border rounded" />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-3 py-2 border rounded" />
          <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="px-3 py-2 border rounded" />
        </div>
        <div className="mt-3">
          <button onClick={create} className="px-4 py-2 bg-green-600 text-white rounded">Add Sweet</button>
        </div>
      </div>

      <div className="space-y-3">
        {sweets.map((s) => (
          <div key={s._id} className="bg-white p-3 rounded shadow flex items-center justify-between">
            <div>
              <div className="font-semibold">{s.name} <span className="text-sm text-gray-500">({s.stock})</span></div>
              <div className="text-sm text-gray-600">{s.description}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => restock(s._id)} className="px-3 py-1 border rounded">Restock</button>
              <button onClick={() => remove(s._id)} className="px-3 py-1 border rounded text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}