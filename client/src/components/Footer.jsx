import React from "react";
import { useNavigate } from "react-router";
export default function Footer() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gray-800 text-white flex items-center justify-between px-8 py-4">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        <p>© 2025 Professional App</p>
        <p>All Rights Reserved</p>
      </div>

      {/* Right Side (Optional) */}
      <div >
        <button
          onClick={() => navigate("/about")}
          className="text-white hover:text-purple-300 transition duration-300"
        >
          About Us
        </button>
        <button
          onClick={() => navigate("/contact")}
          className="text-white hover:text-purple-300 transition duration-300"
        >
          Contact
        </button>
      </div>
    </div>
  );
}
