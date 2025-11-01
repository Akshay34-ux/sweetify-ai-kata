import React, { useEffect, useState } from "react";
import API from "../lib/api";
import SweetCard from "../components/SweetCard";

export default function Dashboard({ user }) {
  const [sweets, setSweets] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchSweets(params = {}) {
    setLoading(true);
    try {
      const res = await API.get("/sweets/search", { params });
      setSweets(res.data);
    } catch (err) {
      console.error("Fetch sweets error:", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    const params = {};
    if (q) params.q = q;
    if (category) params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    fetchSweets(params);
  };

  const purchase = async (item) => {
    if (!user) return alert("Please login to purchase");
    try {
      const token = localStorage.getItem("token");
      await API.post(`/sweets/${item._id}/purchase`, {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchSweets();
      alert("Purchase successful");
    } catch (err) {
      alert(err?.response?.data?.message || "Purchase failed");
    }
  };

  const onDelete = async (item) => {
    if (!window.confirm("Delete this sweet?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/sweets/${item._id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchSweets();
      alert("Deleted");
    } catch (err) {
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row gap-3 items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name..."
          className="px-3 py-2 border rounded w-full md:w-1/3"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border rounded w-full md:w-40"
        >
          <option value="">All categories</option>
          <option value="Chocolate">Chocolate</option>
          <option value="Candy">Candy</option>
          <option value="Pastry">Pastry</option>
          <option value="Other">Other</option>
        </select>

        <input
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="min price"
          className="px-3 py-2 border rounded w-full md:w-28"
        />
        <input
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="max price"
          className="px-3 py-2 border rounded w-full md:w-28"
        />
        <button onClick={handleSearch} className="px-3 py-2 bg-blue-600 text-white rounded">
          Search
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4">
          {sweets.length === 0 && <div className="text-gray-500">No sweets found.</div>}
          {sweets.map((s) => (
            <SweetCard
              key={s._id}
              item={s}
              isAuthenticated={!!user}
              onPurchase={purchase}
              onDelete={user?.role === "admin" ? onDelete : null}
            />
          ))}
        </div>
      )}
    </div>
  );
}