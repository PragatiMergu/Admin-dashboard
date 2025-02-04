import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/signin';
import Donation from './pages/donation';
import Edit from './pages/edit';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/profile';
import Editprofile from './pages/editprofile';
export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign-in" element={<Signin />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="donation" element={<Donation />} />
        <Route path="edit" element={<Edit />} />
        <Route path="profile" element={<Profile />} />
        <Route path="editprofile" element={<Editprofile/>}/>
      </Routes>
    </BrowserRouter>
  );
}
