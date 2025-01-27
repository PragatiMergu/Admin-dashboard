import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router";
const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        if (!token) throw new Error('No token found');

        const response = await fetch('http://localhost:3000/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
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

  return (
     <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          {/* <Sidebar /> */}
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
         
          <div className="flex-1 bg-gray-50">
            {/* Navbar */}
            {/* <Navbar /> */}
            <Navbar setIsSidebarOpen={setIsSidebarOpen} />
    
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
         

      <h1>Profile Page</h1>
      <table style={{ borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
          </tr>
        </thead>
        <tbody>
          {profileData ? (
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                {profileData.id}
              </td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                {profileData.username}
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  </div>
  );
};

export default ProfilePage;
