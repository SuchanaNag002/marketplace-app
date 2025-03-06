import express from 'express';
import authService from '../services/authService.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await authService.loginUser(email, password);
        res.json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
