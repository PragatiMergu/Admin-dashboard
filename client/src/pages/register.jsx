import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // **Delete all OTPs when this page is loaded**
   useEffect(() => {
      const clearAllOtps = async () => {
        try {
          const res = await axios.delete('http://localhost:3000/auth/remove-otps');
          console.log(res.data.message); // "All OTPs deleted successfully"
        } catch (err) {
          console.error("Failed to delete OTPs:", err);
        }
      };
  
      clearAllOtps();
    }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/email",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Successfully registered");
       




        navigate("/email-ott"); // Redirect to OTP page
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-lg font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-medium">
              Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phonenumber" className="block text-gray-600 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              pattern="[0-9]{10}"
              value={formData.phonenumber}
              onChange={handleChange}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-all"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
