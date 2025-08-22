import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar for desktop */}
      <div className="hidden md:flex h-screen w-64 bg-gray-900 text-white flex-col p-6 shadow-lg ">
        <h1 className="text-2xl font-bold mb-8 text-center">Test Platform</h1>

        <nav className="flex flex-col space-y-4">
          <Link to="/" className="px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            Home
          </Link>
          <Link to="/about" className="px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            About
          </Link>
          <Link to="/upload" className="px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            Upload
          </Link>
        </nav>

        <div className="mt-auto text-center text-sm text-gray-400">
          © 2025 Online Test
        </div>
      </div>

      {/* Top Navbar for mobile */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg fixed top-0 left-0 w-full z-50">
        <h1 className="text-lg font-bold">Test Platform</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-14 left-0 w-full bg-gray-900 text-white flex flex-col space-y-4 p-6 shadow-lg z-40">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            About
          </Link>
          <Link
            to="/upload"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Upload
          </Link>

          <div className="mt-6 text-center text-sm text-gray-400">
            © 2025 Online Test
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
