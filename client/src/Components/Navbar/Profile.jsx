//problems to analyze when user logouts username is not defined message comes to check this problem
import React, { useState } from "react";
import "./Profile.css"; // Import CSS for transitions
import { MdAccountCircle } from "react-icons/md";

const Profile = ({ user = {}, handleLogout }) => {
  // Added default value for user
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        className="flex items-center font-medium cursor-pointer hover:scale-110"
        onClick={toggleDropdown}
      >
        <MdAccountCircle className="text-5xl lg:text-4xl md:text-4xl " />
      </button>
      {user && (
        <div
          className={`right-[-52px] absolute z-10 w-60 p-3 mt-2 text-black bg-white dark:bg-black dark:text-white border border-gray-500 shadow-xl md:right-[-15px] .transition-transform .transition-opacity duration-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-0"
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-xl font-semibold text-center">
              <span className="text-lg">Welcome</span>,{" "}
              {user.username || "User"}
            </span>
            <button
              className="mt-2 text-xl font-bold text-red-600 transition duration-300 ease-in-out hover:underline" // Corrected class names
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
