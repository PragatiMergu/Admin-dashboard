import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router";
import axios from "axios";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch("http://localhost:3000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const deleteProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
  
      const response = await axios.delete("http://localhost:3000/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Profile deleted successfully:", response.data);
  
      // Remove token from localStorage after deletion
      localStorage.removeItem("token");
  
      // Navigate to login page
      navigate("/login");
    } catch (err) {
      console.error("Error deleting profile:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Error deleting profile");
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
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                <span className="text-gray-500 text-xl">No Photo</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">{profileData.username}</h2>
            </div>

            {/* Info Box */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">ID:</span>
                <span className="text-gray-800">{profileData.id}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="text-gray-800">{profileData.username}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="text-gray-800">{profileData.email}</span>
              </div>
            </div>

            {/* Edit & Delete Buttons */}
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => navigate("/editprofile")}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-all"
              >
                Edit Profile
              </button>
              <button
                onClick={deleteProfile}
                className="bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition-all"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
