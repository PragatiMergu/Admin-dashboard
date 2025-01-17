import React from 'react'
import { useState } from 'react';

export default function signin() {
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
        <h1 className="text-xl font-semibold text-center mb-4">Sign In </h1>


        <input
          type="text"
          id="email"
          onChange={handleChange}
          placeholder="Enter Email"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          id="Password"
          onChange={handleChange}
          placeholder="Enter Password"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      
        

        <button
          className="bg-green-600 text-white p-3 rounded-lg uppercase hover:bg-green-700 transition-all mt-4"
        >
          sign in
        </button>
       
      </form>
    </div>
  );
}
