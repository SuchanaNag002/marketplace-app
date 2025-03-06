import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/resgister', registerUser);
router.post('/login',  loginUser);

export default router;
