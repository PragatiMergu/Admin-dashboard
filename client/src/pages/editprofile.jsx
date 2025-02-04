import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";

export default function EditProfile() {
  const [editForm, setEditForm] = useState({ username: "" });
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.patch(
        "http://localhost:3000/auth/editprofile",
        { username: editForm.username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/profile");
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
    }
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
                  value={editForm.username}
                  onChange={handleChange}
                  required
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-all"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
