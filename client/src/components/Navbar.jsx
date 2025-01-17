import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUserCircle, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user session data from localStorage
    const email = localStorage.getItem("email");
    if (email) {
      setUserEmail(email);
    } else {
      // Redirect to login if no session exists
      navigate("/login");
    }
  }, [navigate]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Clear session and navigate to login
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div className="bg-white text-black flex items-center justify-between px-8 py-4">
      {/* Breadcrumb Section */}
      <div className="flex items-center">
        <span className="text-sm flex items-center hover:bg-blue-500 text-gray-200 h-10">
          {/* Add breadcrumb content here if needed */}
        </span>
      </div>

      {/* User Profile and Notifications */}
      <div className="flex items-center">
        <FontAwesomeIcon icon={faBell} className="text-lg mr-4 cursor-pointer" />
        <FontAwesomeIcon
          icon={faUserCircle}
          className="text-2xl mr-2 cursor-pointer"
        />
        <div className="ml-2 relative">
          <button
            className="text-sm focus:outline-none"
            onClick={toggleDropdown}
          >
            {userEmail || "Guest"} <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg">
              <a
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Profile
              </a>
              <a
                href="/forgot-password"
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Forgot Password
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
