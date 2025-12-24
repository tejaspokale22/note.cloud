import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { HiHome, HiInformationCircle, HiLogin } from "react-icons/hi";
import Profile from "./Profile";

function Navbar({ user, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (user && token) {
      setAuthStatus(true);
    } else {
      setAuthStatus(false);
    }
  }, [user]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: "Home", slug: "/", active: authStatus, icon: HiHome },
    { name: "About", slug: "/about", active: true, icon: HiInformationCircle },
    { name: "Login", slug: "/login", active: !authStatus, icon: HiLogin },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 mx-auto lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="flex items-center justify-center w-8 h-8 transition-transform bg-blue-600 rounded-lg group-hover:scale-110">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
            note<span className="text-blue-600">.cloud</span>
          </h1>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="p-2 text-gray-700 transition-colors rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label="Toggle menu"
        >
          {!isMenuOpen ? <FaBars size={20} /> : <FaTimes size={20} />}
        </button>

        {/* Desktop Menu */}
        <div className="items-center hidden mr-8 space-x-3 md:flex">
          {navItems.map(
            (item) =>
              item.active && (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className="px-4 py-2 text-base font-medium text-gray-700 transition-colors rounded-lg hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                >
                  {item.name}
                </button>
              )
          )}

          {/* Profile */}
          {authStatus && (
            <div className="ml-1">
              <Profile user={user} handleLogout={handleLogout} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Menu
          </h2>
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Close menu"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav className="flex flex-col p-4 space-y-2">
          {navItems.map(
            (item) =>
              item.active && (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate(item.slug);
                  }}
                  className="flex items-center px-4 py-3 space-x-3 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <item.icon className="text-gray-500 dark:text-gray-400 text=lg" />
                  <span className="font-medium">{item.name}</span>
                </button>
              )
          )}

          {/* Profile in Mobile Menu */}
          {authStatus && (
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="px-4 py-2 mb-2">
                <p className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                  Account
                </p>
              </div>
              <Profile user={user} handleLogout={handleLogout} />
            </div>
          )}
        </nav>

        {/* Mobile Menu Footer */}
        <div className="absolute bottom-0 w-full p-4 text-center border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            @note<span className="text-blue-600">.cloud</span>
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
