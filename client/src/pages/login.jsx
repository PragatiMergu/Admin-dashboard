import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null); // For error message
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', values);
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', values.email); // Store email in localStorage
        navigate('/');
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      // Clear error after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg px-8 py-5 border w-72 relative">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        
        {/* Error Message */}
        {error && (
          <div className="absolute top-0 left-0 w-full bg-red-500 text-white text-center py-2 px-4 rounded-t-md">
            {error}
            <button
              onClick={() => setError(null)}
              className="absolute right-3 top-1 text-white font-bold"
            >
              &times;
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-3 py-2 border rounded"
              name="email"
              onChange={handleChanges}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-3 py-2 border rounded"
              name="password"
              onChange={handleChanges}
            />
          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded">Submit</button>
        </form>
        <div className="text-center mt-4">
          <span>Don't Have Account? </span>
          <Link to="/register" className="text-blue-500">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
