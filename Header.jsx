import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-gray-50 shadow-sm">
      <div className="w-full flex items-center justify-between px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-200">
  {/* Logo */}
  <div className="flex items-center space-x-1">
    <img 
      src="/logo.png" 
      alt="Logo" 
      className="w-32 h-29 object-contain bg-transparent ml-10"
    />
    <span className="w-2 h-2 rounded-full bg-purple-600"></span>
  </div>

  {/* Desktop Navigation */}
  <nav className="hidden md:flex space-x-8">
    <Link to="/" className="text-sm font-medium text-gray-700 hover:text-black transition">
      HOME
    </Link>
    <Link to="/about">ABOUT US</Link>
<Link to="/products">PRODUCTS</Link>
<Link to="/offices">CONTACT US</Link>

  </nav>

  {/* Right Section */}
  <div className="flex items-center space-x-3">
    {/* User Icon (Desktop only) */}
    <button className="hidden md:flex p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
             1.79-4 4 1.79 4 4 4zm-6 8c0-3.31 
             2.69-6 6-6s6 2.69 6 6v1H6v-1z"
        />
      </svg>
    </button>

    {/* Mobile Menu Button */}
    <button
      className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-200"
      onClick={() => setIsOpen(true)}
    >
      {/* Hamburger Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
</div>


      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={() => setIsOpen(false)} className="p-2 text-gray-600 hover:bg-gray-200 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col space-y-4 px-6 py-6">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-black" onClick={() => setIsOpen(false)}>
            HOME
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-gray-600 hover:text-black" onClick={() => setIsOpen(false)}>
            CATEGORIES
          </Link>
          <Link to="/events" className="text-sm font-medium text-gray-600 hover:text-black" onClick={() => setIsOpen(false)}>
            NEW ARRIVALS
          </Link>
          <Link to="/company" className="text-sm font-medium text-gray-600 hover:text-black" onClick={() => setIsOpen(false)}>
            CONTACT US
          </Link>
        </nav>
      </div>
    </header>
  );
}
