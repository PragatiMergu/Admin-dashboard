import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/sidebar';
export default function Donation() {
  const [formdata, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />


    <div className="flex-1 bg-gray-50">
    {/* Navbar */}
    <Navbar />
   
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700">
      <form className="w-96 bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
        <h1 className="text-xl font-semibold text-center mb-4">Donation Form</h1>

        <input
          type="text"
          id="Name"
          onChange={handleChange}
          placeholder="Name"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          id="Mob Number"
          onChange={handleChange}
          placeholder="Enter Mobile Number"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          id="Amount"
          onChange={handleChange}
          placeholder="Enter Amount"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-600 mt-2">
          If you want to claim the tax deduction, then fill below fields or leave blank.
        </p>
        <input
          type="text"
          id="Bankname"
          onChange={handleChange}
          placeholder="Enter Bank Name"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          id="BankBranchname"
          onChange={handleChange}
          placeholder="Enter Branch Name"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          id="Pan no"
          onChange={handleChange}
          placeholder="Enter PAN No"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className="bg-green-600 text-white p-3 rounded-lg uppercase hover:bg-green-700 transition-all mt-4"
        >
          Donate Now
        </button>
        <button
          className="bg-gray-400 text-white p-3 rounded-lg uppercase hover:bg-gray-500 transition-all"
        >
          Go Back
        </button>
      </form>
    </div>
    </div>
    </div>
  );
}
