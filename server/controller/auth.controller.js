import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../lib/db.js';
import axios from 'axios';

import nodemailer from 'nodemailer';

export const signup = async (req, res) => {
    let { ottemail, ott } = req.body;

    try {
        if (!ottemail || typeof ottemail !== 'string') {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const cleanEmail = ottemail.trim().toLowerCase();
        const db = await connectToDatabase();

        const [ottrows] = await db.query('SELECT * FROM tempott WHERE email = ?', [cleanEmail]);

        if (ottrows.length === 0) {
            return res.status(409).json({ message: 'Re-enter the OTP' });
        }

        const storedOTP = ottrows[0].ott;
        const isMatch = await bcrypt.compare(ott,storedOTP );
        if (!isMatch) {
            return res.status(409).json({ message: 'Incorrect OTP' });
        }

        const { email, username, phonenumber, password: storedPassword } = ottrows[0];

        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
        }

        await db.query(
            'INSERT INTO users (username, email, password, phonenumber) VALUES (?, ?, ?, ?)',
            [username, email, storedPassword, phonenumber]
        );

        await db.query('DELETE FROM tempott WHERE email = ?', [email]);

        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const expireOtp =  async (req, res) => {
    const { email } = req.body; // Extract email from request body
   console.log("hi hello");
    try {
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const db = await connectToDatabase();

        // Delete records from `tempott` where email matches
        const [result] = await db.query('DELETE FROM tempott WHERE email = ?', [email]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No records found for this email' });
        }

        return res.status(200).json({ message: 'Records deleted successfully' });
    } catch (err) {
        console.error('Error deleting records:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const removeotps = async (req, res) => {
    try {
      const db = await connectToDatabase();
  
      // Delete ALL rows from tempott
      const [result] = await db.query('DELETE FROM tempott');
  
      return res.status(200).json({ message: 'All OTPs deleted successfully' });
    } catch (err) {
      console.error('Error deleting OTPs:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

export const email = async (req, res) => {//signin email and whatsapp otp sneding function
    console.log('Request body:', req.body);
    const { username, email, phonenumber, password } = req.body;

    const HOSTEMAIL = process.env.HOSTEMAIL;
    const EMAILPASS = process.env.EMAILPASS;

    try {
        const db = await connectToDatabase();
        console.log('Database connected successfully');

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: HOSTEMAIL, pass: EMAILPASS },
            tls: { rejectUnauthorized: false },
        });

        await transporter.verify();
        const ott = Math.floor(Math.random() * 9000) + 1000; // 4-digit OTP

        const mailOptions = {
            from: HOSTEMAIL,
            to: email,
            subject: 'Registration Confirmation',
            text: `Hello ${username},\n\nYour registration was successful.\n\nPhone Number: ${phonenumber}.\n\nYour OTP: ${ott}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
         //whatsapp otp sending....
                const apikey = process.env.apikey; // api key 
                const number = process.env.number; //  recipient's phone number which u want to send a messgae 
                const msg = `u r one time otp is ${ott}` ; // Replace with your message
            
                const url = `http://web.cloudwhatsapp.com/wapp/api/send?apikey=${apikey}&mobile=${number}&msg=${encodeURIComponent(msg)}`;
            
                try {
                    const response = await axios.post(url); // Using GET request as shown in the example
                    console.log("Message sent successfully:", response.data);
                } catch (error) {
                    console.error("Error sending message:", error.response ? error.response.data : error.message);
                }
        
        


        const hashPassword = await bcrypt.hash(password, 10); // Hash password before storing
        const hashott = await bcrypt.hash(ott.toString(), 10);
        const phoneValue = phonenumber ? phonenumber : null;

        // Store hashed password and OTP in `tempott`
        await db.query('INSERT INTO tempott (email, username, password, phonenumber, ott) VALUES (?, ?, ?, ?, ?)', [
            email,
            username,
            hashPassword, // Store hashed password
            phoneValue,
            hashott // Store OTP
        ]);

        return res.status(200).json({ message: 'Email sent and OTP stored successfully!' });

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: error.message });
    }
};


export const loginemail = async (req, res) => {//signin email and whatsapp otp sneding function
    console.log('Request body:', req.body);
    const { username, email, phonenumber, password } = req.body;

    const HOSTEMAIL = process.env.HOSTEMAIL;
    const EMAILPASS = process.env.EMAILPASS;

    try {
        const db = await connectToDatabase();
        console.log('Database connected successfully');

       
        const [rows] = await db.query('SELECT password FROM users WHERE email = ?', [email]);
            if(rows.length===0){
                res.status(404).json({ message: 'User does not exist' });
            }
              const isMatch =await bcrypt.compare(password,rows[0].password);
              if(!isMatch){
                return res.status(409).json({ message: 'Incorrect password' });
              }
            
      
     



        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: HOSTEMAIL, pass: EMAILPASS },
            tls: { rejectUnauthorized: false },
        });

        await transporter.verify();
        const ott = Math.floor(Math.random() * 9000) + 1000; // 4-digit OTP

        const mailOptions = {
            from: HOSTEMAIL,
            to: email,
            subject: 'Registration Confirmation',
            text: `Hello ${username},\n\nYour registration was successful.\n\nPhone Number: ${phonenumber}.\n\nYour OTP: ${ott}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
         //whatsapp otp sending....
         const apikey = process.env.apikey; // api key 
         const number = process.env.number; //  recipient's phone number which u want to send a messgae 
                const msg = `u r one time otp is ${ott}` ; // Replace with your message
            
                const url = `http://web.cloudwhatsapp.com/wapp/api/send?apikey=${apikey}&mobile=${number}&msg=${encodeURIComponent(msg)}`;
            
                try {
                    const response = await axios.post(url); // Using GET request as shown in the example
                    console.log("Message sent successfully:", response.data);
                } catch (error) {
                    console.error("Error sending message:", error.response ? error.response.data : error.message);
                }
        
        


      
        const hashott = await bcrypt.hash(ott.toString(), 10);
        const phoneValue = phonenumber ? phonenumber : null;

        // Store hashed password and OTP in `tempott`
        await db.query('INSERT INTO tempott (email, username,password, phonenumber, ott) VALUES (?, ?, ?, ?, ?)', [
            email,
            username,
            rows[0].password, // Store hashed password
            phoneValue,
            hashott // Store OTP
        ]);

        return res.status(200).json({ message: 'Email sent and OTP stored successfully!' });

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: error.message });
    }
};


export const login = async (req, res) => {
    let { ottemail, ott } = req.body;
    console.log(ottemail);
    console.log(ott);

    try {
        if (!ottemail || typeof ottemail !== 'string') {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const cleanEmail = ottemail.trim().toLowerCase();
        const db = await connectToDatabase();

        // Check if user exists in `users` first
        const [userRows] = await db.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        // Retrieve user details
        const { id, email } = userRows[0];
     
        // Check OTP from `tempott`
        const [ottrows] = await db.query('SELECT * FROM tempott WHERE email = ?', [cleanEmail]);
        if (ottrows.length === 0) {
            return res.status(409).json({ message: 'Re-enter the OTP' });
        }

        const storedOTP = ottrows[0].ott;
      // Compare OTP (hashed stored OTP vs plain OTP)
      const isOTPMatch = await bcrypt.compare(ott, storedOTP);
      if (!isOTPMatch) {
          
          return res.status(409).json({ message: 'Incorrect OTP' });
      }
      

 
       
 
       // Generate JWT token
        const token = jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '3h' });
        await db.query('DELETE FROM tempott WHERE email = ?', [email]);

        // Delete OTP after successful login (optional)
   //     await db.query('DELETE FROM tempott WHERE email = ?', [cleanEmail]);

        return res.status(201).json({ token, email });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'No Token Provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(500).json({ message: 'server error' });
    }
};






export const profile = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT id, username, email FROM users WHERE id = ?', [req.userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(rows[0]); // Include email in the response
    } catch (err) {
        console.error('Error fetching profile data:', err.message);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

export const editprofile = async (req, res) => {
    try {
        const { username } = req.body;
        const userId = req.userId; // Ensure this is set from auth middleware

        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        const db = await connectToDatabase();
        const [result] = await db.query(
            "UPDATE users SET username = ? WHERE id = ?",
            [username, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found or no changes made" });
        }

        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (err) {
        console.error("Error updating profile:", err.message);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

export const home = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'user not existed' });
        }

        return res.status(201).json({ user: rows[0] });
    } catch (err) {
        return res.status(500).json({ message: 'server error' });
    }
};

export const deleteProfile = async (req, res) => {
    try {
      const db = await connectToDatabase();
      const [result] = await db.query("DELETE FROM users WHERE id = ?", [req.userId]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found or no changes made" });
      }
  
      return res.status(200).json({ message: "Profile deleted successfully" });
    } catch (err) {
      console.error("Error deleting profile:", err.message);
      return res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };
  