import React, { useState } from 'react';

export default function Edit() {
  const [formdata, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700">
      <form className="w-96 bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
        <h1 className="text-xl font-semibold text-center mb-4">Edit Your Profile</h1>

        <input
          type="text"
          id="name"
          onChange={handleChange}
          placeholder="Name"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          id="fatherName"
          onChange={handleChange}
          placeholder="Father Name"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          id="email"
          onChange={handleChange}
          placeholder="Enter Email"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          id="mobNumber"
          onChange={handleChange}
          placeholder="Enter Mobile Number"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          id="director"
          onChange={handleChange}
          placeholder="Director"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          id="date"
          onChange={handleChange}
          placeholder="Date"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          id="aadharNo"
          onChange={handleChange}
          placeholder="Enter Aadhar No"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className="bg-green-600 text-white p-3 rounded-lg uppercase hover:bg-green-700 transition-all mt-4"
        >
          Update Now
        </button>
        <button
          className="bg-gray-400 text-white p-3 rounded-lg uppercase hover:bg-gray-500 transition-all"
        >
          Go Back
        </button>
      </form>
    </div>
  );
}
