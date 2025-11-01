// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <header className="bg-white border-b border-muted-300">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-300 to-brand-500 flex items-center justify-center text-white font-semibold shadow">
            S
          </div>
          <Link to="/" className="text-2xl font-semibold text-slate-800">Sweetify</Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-slate-800">Home</Link>
          {user ? (
            <>
              <span className="text-gray-600">Hi, <b>{user.username}</b></span>
              {user.role === "admin" && <Link to="/admin" className="text-red-600">Admin</Link>}
              <button onClick={onLogout} className="ml-2 px-3 py-1 rounded bg-slate-100 hover:bg-slate-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
              <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}