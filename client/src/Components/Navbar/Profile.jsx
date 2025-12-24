import React, { useState, useEffect, useRef } from "react";
import { MdAccountCircle } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

const Profile = ({ user = {}, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center font-medium transition-transform duration-200 cursor-pointer hover:scale-110"
        onClick={toggleDropdown}
        aria-label="Profile menu"
      >
        <MdAccountCircle className="text-4xl text-gray-700 dark:text-gray-300" />
      </button>

      {user && (
        <div
          className={`absolute right-0 mt-6 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden transition-all duration-200 ease-in-out ${
            isOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-2 invisible"
          }`}
        >
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full dark:bg-blue-900">
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-300">
                  {user.username?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Welcome back
                </p>
                <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                  {user.username || "User"}
                </p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-2">
            <button
              className="flex items-center w-full px-3 py-2 space-x-2 text-sm font-medium text-red-600 transition-colors duration-150 rounded-md hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 group"
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
            >
              <FiLogOut className="text-base transition-transform group-hover:translate-x-0.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
