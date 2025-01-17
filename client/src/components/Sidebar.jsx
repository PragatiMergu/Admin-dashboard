import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/images.png";

import {
  faChevronRight,
  faChevronLeft,
  faHome,
  faUserPlus,
  faClipboardList,
  faIdCard,
  faFileAlt,
  faCertificate,
  faCog,
  faHandsHelping,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { icon: faHome, label: "Dashboard", path: "/" },
    { icon: faUserPlus, label: "Apply For Membership", path: "/membership" },
    { icon: faClipboardList, label: "Membership Status", path: "/membership-status" },
    { icon: faClipboardList, label: "Register", path: "/register" },
    { icon: faIdCard, label: "Generate ID Card", path: "/login" },
    { icon: faFileAlt, label: "Appointment Letter", path: "/appointment-letter" },
    { icon: faCertificate, label: "Our Certificate", path: "/certificate" },
    { icon: faCog, label: "Account", path: "/account" },
    { icon: faHandsHelping, label: "Donate Now", path: "/donation" },
    { icon: faReceipt, label: "Receipt", path: "/receipt" },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-white text-gray-800 h-screen transition-all duration-300 flex flex-col shadow-lg`}
    >
      {/* Logo and Toggle Button Section */}
      <div className="relative flex flex-col items-center justify-center p-3">
        {/* Logo Image */}
        <img
          src={logo}
          alt="Logo"
          className={`transition-all duration-200 
            ${isSidebarOpen ? "w-16 h-16" : "w-12 h-12"} 
            sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20`} 
        />
        
        {/* Toggle Button (Positioned at top-right) */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-0 right-0 m-2 text-black focus:outline-none"
        >
          <FontAwesomeIcon
            icon={isSidebarOpen ? faTimes : faBars}
            className="text-xl"
          />
        </button>

        {/* Logo Text */}
        {isSidebarOpen && (
          <p className="font-semibold text-xl mt-2 sm:text-lg md:text-xl lg:text-2xl">
            Admin Dashboard
          </p>
        )}
      </div>

      {/* Menu Items */}
      <ul className="mt-6 space-y-2">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 p-3 rounded-md cursor-pointer transition duration-200 hover:bg-purple-100 hover:text-purple-800"
            onClick={() => navigate(item.path)}
          >
            {/* Icon */}
            <FontAwesomeIcon icon={item.icon} className="text-lg" />
            
            {/* Label (Text) */}
            <span
              className={`${
                isSidebarOpen ? "block" : "hidden"
              } text-base font-medium transition duration-200`}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
