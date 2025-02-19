import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phonenumber: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        "http://localhost:3000/auth/register", 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Successfully registered");
        navigate("/");
      }
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex-1 bg-gray-50">
        {/* Navbar */}
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
          <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
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
    pattern="[0-9]{10}" // Example pattern for a 10-digit phone number
    value={formData.phonenumber}
    onChange={handleChange}
    required
    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
    placeholder="Enter your phone number"
  />
</div>

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
      </div>
    </div>
  );
};

export default Register;
