import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';

import Donation from './pages/donation';
import Edit from './pages/edit';
import Register from './pages/register';
import Login from './pages/login';
import Profile from './pages/profile';
import Editprofile from './pages/editprofile';
import Emailott from './pages/emailott';
import Loginemailott from './pages/loginemailott';
export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>

        <Route path="/" element={<Home />} />
        
        <Route path="email-ott" element={<Emailott />} />
        <Route path="login-ott" element={<Loginemailott />} />
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
