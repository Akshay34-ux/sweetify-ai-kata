// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../lib/api";
import { toast } from "react-toastify";
import SweetCard from "../components/SweetCard";
import QuantityModal from "../components/QuantityModal";

export default function Dashboard({ user }) {
  const [sweets, setSweets] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [purchasingId, setPurchasingId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  async function fetchSweets(params = {}) {
    setLoading(true);
    try {
      const res = await API.get("/sweets/search", { params });
      setSweets(res.data || []);
      console.debug("DEBUG fetchSweets normalized:", res.data?.length ?? 0);
    } catch (err) {
      console.error("Fetch sweets error:", err?.response?.data || err.message);
      toast.error("Failed to load sweets");
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

  // open quantity modal (no server fetch here - server enforces stock)
  const openQuantity = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  // confirm purchase from modal
  const handleConfirmQuantity = async (qty) => {
    if (!selectedItem) return;

    // quick client-side check if we *do* have a stock value (admins)
    if (typeof selectedItem.stock === "number" && qty > selectedItem.stock) {
      toast.error(`Only ${selectedItem.stock} available`);
      setModalOpen(false);
      setSelectedItem(null);
      return;
    }

    try {
      setModalOpen(false);
      setPurchasingId(selectedItem._id);

      // ensure token header is sent (API might already set it via setAuthToken)
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

      // POST purchase; backend will check stock atomically and return helpful message if insufficient
      await API.post(`/sweets/${selectedItem._id}/purchase`, { quantity: qty }, headers ? { headers } : {});

      toast.success(`Purchased ${qty} × ${selectedItem.name}`);
      await fetchSweets(); // refresh listing (stock hidden for non-admins; still we refresh)
    } catch (err) {
      // server sends `{ message: 'Insufficient stock. Only X item(s) available.' }` on low stock
      const msg = err?.response?.data?.message || "Purchase failed";
      toast.error(msg);
    } finally {
      setPurchasingId(null);
      setSelectedItem(null);
    }
  };

  // delete (only shown when admin)
  const handleDelete = async (it) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/sweets/${it._id}`, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
      toast.success("Deleted");
      fetchSweets();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      {/* filters */}
      <div className="mb-6 px-2">
        <div className="flex flex-col md:flex-row gap-3 items-center">
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
          <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded">
            Search
          </button>
        </div>
      </div>

      {/* listing */}
      {loading ? (
        <div className="container mx-auto px-4">Loading...</div>
      ) : (
        <div className="container mx-auto px-4">
          {sweets.length === 0 ? (
            <div className="text-gray-600">No sweets found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sweets.map((s) => (
                <SweetCard
                  key={s._id}
                  item={s}
                  // support both prop names so the card can call either onPurchase or onOpenQuantity
                  onPurchase={openQuantity}
                  onOpenQuantity={openQuantity}
                  isPurchasing={purchasingId === s._id}
                  onDelete={user?.role === "admin" ? () => handleDelete(s) : null}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* quantity modal */}
      <QuantityModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={handleConfirmQuantity}
        // pass max only if backend revealed it (admins). If undefined, modal will allow any number and backend enforces limits.
        max={selectedItem?.stock}
        defaultQty={1}
      />
    </div>
  );
}