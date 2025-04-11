import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const loginemailott = () => {
    const [formData, setFormData] = useState({ ottemail: "", ott: "" }); 
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        
        
        const timeout = setTimeout(async () => {
        
                 // No email required
                navigate("/login");  // Redirect to register page
            
        
            
        }, 5 * 60 * 1000);  // 5 minutes timeout

        return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!formData.ott) {
            setError("Please enter the OTP number");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/auth/login", formData);
            if (response.status === 201) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.email); // Store email in localStorage
                navigate('/');
              } else {
                setError("Invalid OTP. Please try again.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to verify OTP. Please try again.");
            setTimeout(() => {
                setError(null);
              }, 5000);
            
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="shadow-lg px-8 py-5 border w-72">
                <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="ottemail" className="block text-gray-600 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="ottemail"
                            name="ottemail"
                            value={formData.ottemail}
                            onChange={handleChange}
                            required
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    

                    <div className="mb-4">
                        <label htmlFor="ott" className="block text-gray-700">OTP Number</label>
                        <input
                            id="ott"
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full px-3 py-2 border"
                            name="ott"
                            value={formData.ott}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="w-full bg-green-600 text-white py-2">Submit</button>
                </form>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
            </div>
        </div>
    );
};

export default loginemailott;
