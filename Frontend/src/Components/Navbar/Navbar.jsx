import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Profile from "./Profile";

function Navbar({ user, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);
  const navigate = useNavigate();
  console.log(user);

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
    { name: "Home", slug: "/", active: authStatus },
    { name: "About", slug: "/about", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full text-black bg-white border-b border-gray-300 dark:border-gray-600 dark:bg-black dark:text-white">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <Link to="/" className="flex items-center justify-center">
            <h1 className="text-xl font-bold text-black md:text-2xl dark:text-white">
              note<span className="text-blue-600">.cloud</span>
            </h1>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black dark:text-white">
            {!isMenuOpen && <FaBars size={20} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex md:items-center md:ml-auto">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name} className="flex text-center md:ml-4">
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-black text-md hover:border-b-2 hover:border-blue-600 dark:text-white"
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}

          {/* Conditional Profile component rendering */}
          {authStatus && (
            <li className="md:ml-4">
              <Profile user={user} handleLogout={handleLogout} />
            </li>
          )}
        </ul>

        {/* Mobile Dropdown Menu */}
        <div
          className={`fixed top-0 right-0 w-40 h-full bg-white text-black transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } z-50 flex flex-col items-center dark:bg-black dark:text-white`}
        >
          <button onClick={toggleMenu} className="absolute top-3 right-3">
            <FaTimes size={20} />
          </button>

          <ul className="flex flex-col items-center mt-16 space-y-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="w-full text-center">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false); // Close menu on navigation
                        navigate(item.slug);
                      }}
                      className="block text-lg hover:underline"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Conditional Profile component rendering */}
            {authStatus && (
              <li className="w-full text-center">
                <Profile user={user} handleLogout={handleLogout} />
              </li>
            )}
          </ul>

          {/* Footer Text */}
          <div className="absolute w-full text-xl font-bold text-center bottom-4">
            <h1>
              @note<span className="text-blue-600">.cloud</span>
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
