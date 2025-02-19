import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../lib/db.js';

import nodemailer from 'nodemailer';


export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (username, email, password, register) VALUES (?, ?, ?, ?)', [
            username,
            email,
            hashPassword,
            false,
        ]);

        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const email = async (req, res) => {
    console.log('Request body:', req.body);
    const { username, email, phonenumber } = req.body;
    const userId = req.userId;
    const HOSTEMAIL=process.env.HOSTEMAIL;
    const EMAILPASS=process.env.EMAILPASS;

    try {
        const db = await connectToDatabase();
        console.log('Database connected successfully');

        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        console.log('Query result:', rows);

        if (rows.length === 0 || rows[0].register) {
            return res.status(400).json({ message: 'User already registered or not found' });
        }

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: HOSTEMAIL,
                pass: EMAILPASS,
            },
            tls: {
                rejectUnauthorized: false, // Add this line to bypass certificate validation
            },
        });

        await transporter.verify(function (error, success) {
            if (error) {
                console.error('Transporter error:', error);
                throw error;
            } else {
                console.log('Server is ready to take our messages');
            }
        });

        const mailOptions = {
            from: HOSTEMAIL,
            to: email,
            subject: 'Registration Confirmation',
            text: `Hello ${username},\nYour registration was successful.\nPhone Number: ${phonenumber}`,
        };

        // Send Email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        // Update registration status
        const updateResult = await db.query('UPDATE users SET register = ? WHERE id = ?', [true, userId]);
        console.log('Update result:', updateResult);

        return res.status(200).json({ message: 'Email sent and user registered successfully!' });
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: error.message });
    }
};

export const checkRegistration = async (req, res) => {
    const userId = req.userId;
    try {
        const db = await connectToDatabase();
        const [result] = await db.query('SELECT register FROM users WHERE id = ?', [userId]);
        if (result.length > 0) {
            return res.json({ registered: result[0].register });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'user not existed' });
        }
        const isMatch = await bcrypt.compare(password, rows[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: 'wrong password' });
        }
        const token = jwt.sign({ id: rows[0].id }, process.env.JWT_KEY, { expiresIn: '3h' });

        return res.status(201).json({ token: token });
    } catch (err) {
        return res.status(500).json(err.message);
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
  