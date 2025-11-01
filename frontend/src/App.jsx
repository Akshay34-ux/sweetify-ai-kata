// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import { setAuthToken } from "./lib/api";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token) {
      setAuthToken(token);
      setUser(userStr ? JSON.parse(userStr) : null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      <header className="bg-white shadow">
        <div className="container py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">Sweetify</Link>
          <nav className="space-x-4">
            <Link to="/" className="text-gray-600">Home</Link>
            {!user && <Link to="/login" className="text-blue-600">Login</Link>}
            {!user && <Link to="/register" className="text-blue-600">Register</Link>}
            {user && user.role === "admin" && <Link to="/admin" className="text-red-600">Admin</Link>}
            {user && <button onClick={handleLogout} className="ml-2 text-sm px-3 py-1 bg-gray-100 rounded">Logout</button>}
          </nav>
        </div>
      </header>

      <main className="container py-8">
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/admin" element={<AdminPanel user={user} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;