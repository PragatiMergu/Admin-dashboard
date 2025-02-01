import express from 'express';
import { home, login, profile, register, verifyToken } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, profile);
router.get('/home', verifyToken, home);

export default router;
