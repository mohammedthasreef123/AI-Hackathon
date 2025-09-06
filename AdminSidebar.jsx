// src/components/AdminSidebar.jsx
import { NavLink, useLocation } from "react-router-dom";
import {
  FaBox,
  FaTags,
  FaChevronDown,
  FaChevronRight,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";

export default function AdminSidebar() {
  const location = useLocation();
  const [openOrders, setOpenOrders] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-open Orders if on /dashboard/orders
  useEffect(() => {
    if (location.pathname.startsWith("/dashboard/orders")) {
      setOpenOrders(true);
    } else {
      setOpenOrders(false);
    }
  }, [location.pathname]);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
      isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* 🔹 Top Navbar (Mobile only) */}
      <div className="fixed top-0 left-0 w-full h-12 bg-white border-b shadow-sm flex items-center px-4 md:hidden z-50">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-700">
          <FaBars size={22} />
        </button>
        <h1 className="ml-4 text-lg font-semibold">Dashboard</h1>
      </div>

      {/* 🔹 Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-60 bg-white border-r border-gray-200 p-4 z-50 transform transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-xl font-bold mb-6">Admin</h2>
        <nav className="space-y-2">
          {/* Orders Section */}
          <div>
            <button
              onClick={() => setOpenOrders(!openOrders)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <span className="flex items-center gap-2">
                <FaBox /> Orders
              </span>
              {openOrders ? (
                <FaChevronDown className="w-3 h-3" />
              ) : (
                <FaChevronRight className="w-3 h-3" />
              )}
            </button>

            {openOrders && (
              <div className="ml-8 mt-2 space-y-1 text-sm">
                <NavLink to="/dashboard/orders" className={linkClasses} end>
                  All Orders
                </NavLink>
                <NavLink
                  to="/dashboard/orders/delivered"
                  className={linkClasses}
                >
                  Delivered
                </NavLink>
                <NavLink
                  to="/dashboard/orders/pending"
                  className={linkClasses}
                >
                  Pending
                </NavLink>
                <NavLink
                  to="/dashboard/orders/cancelled"
                  className={linkClasses}
                >
                  Cancelled
                </NavLink>
              </div>
            )}
          </div>

          {/* Products */}
          <NavLink to="/dashboard/products" className={linkClasses} end>
            <FaTags /> Products
          </NavLink>

          {/* Add Product */}
          <NavLink to="/dashboard/add-product" className={linkClasses} end>
            <FaTags /> Add Product
          </NavLink>
        </nav>

        {/* 🔹 Close Button (Mobile only) */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden text-gray-600"
        >
          <FaTimes size={20} />
        </button>
      </aside>
    </>
  );
}
