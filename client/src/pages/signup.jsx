import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!values.username || !values.email || !values.password) {
            setError('Please fill all the fields');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', values);
            if (response.status === 201) {
                setSuccess('Registration successful! Redirecting to login...');
                navigate('/login');
            }
        } catch (err) {
            setError('Failed to register. Please try again.');
            console.log(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="shadow-lg px-8 py-5 border w-72">
                <h2 className="text-lg font-bold mb-4">Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter Username"
                            className="w-full px-3 py-2 border"
                            name="username"
                            value={values.username}
                            onChange={handleChanges}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter Email"
                            className="w-full px-3 py-2 border"
                            name="email"
                            value={values.email}
                            onChange={handleChanges}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter Password"
                            className="w-full px-3 py-2 border"
                            name="password"
                            value={values.password}
                            onChange={handleChanges}
                        />
                    </div>
                    <button className="w-full bg-green-600 text-white py-2">Submit</button>
                </form>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                <div className="text-center">
                    <span>Already have an account?</span>
                    <Link to="/login" className="text-blue-500"> Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
