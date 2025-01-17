// import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartLine } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react';
export default function Home() {
  const Navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      {/* <Sidebar /> */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
     

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        {/* Navbar */}
        {/* <Navbar /> */}
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Header with Neon Effect */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
            <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-600">
              Dashboard
            </h2>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <button onClick={() => Navigate("/")}>
                <FontAwesomeIcon
                  icon={faHome}
                  className="text-3xl text-gray-600 hover:text-teal-500"
                />
              </button>
              <button>
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="text-3xl text-gray-600 hover:text-teal-500"
                />
              </button>
            </div>
          </div>

          {/* Trending Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-teal-500 rounded-lg shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg font-semibold neon-text">Generated</h3>
              <p className="neon-text">ID CARD</p>
            </div>

            {/* Card 2 */}
            <div className="bg-purple-500 rounded-lg shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg font-semibold neon-text">Generated</h3>
              <p className="neon-text">Appointment Letter</p>
            </div>

            {/* Card 3 */}
            <div className="bg-orange-500 rounded-lg shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg font-semibold neon-text">Paid</h3>
              <p className="neon-text">Membership Payment</p>
            </div>

            {/* Card 4 */}
            <div className="bg-blue-500 rounded-lg shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg font-semibold neon-text">Active</h3>
              <p className="neon-text">Membership Status</p>
            </div>
          </div>

          {/* Report Section */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-600">
              Report: Show Details
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="px-4 py-2">Assignee</th>
                    <th className="px-4 py-2">Subject</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Last Update</th>
                    <th className="px-4 py-2">Tracking ID</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="px-4 py-2">John Doe</td>
                    <td className="px-4 py-2">Appointment</td>
                    <td className="px-4 py-2">Pending</td>
                    <td className="px-4 py-2">01/13/2025</td>
                    <td className="px-4 py-2">#12345</td>
                  </tr>
                  <tr className="text-center">
                    <td className="px-4 py-2">Jane Smith</td>
                    <td className="px-4 py-2">ID Card Generation</td>
                    <td className="px-4 py-2">Completed</td>
                    <td className="px-4 py-2">01/12/2025</td>
                    <td className="px-4 py-2">#67890</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
