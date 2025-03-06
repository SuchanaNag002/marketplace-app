import authService from '../services/authService.js';
import userValidator from '../validators/userValidator.js';

export const registerUser = async (req, res) => {
  try {
    console.log('Register request:', req.body);
    const { error, value } = userValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const user = await authService.registerUser(value);
    res.status(201).json(user);
  } catch (error) {
    console.error('Register controller error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log('Login request:', req.body);
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const response = await authService.loginUser(email, password);
    res.json(response);
  } catch (error) {
    console.error('Login controller error:', error);
    if (error.message === 'User not found' || error.message === 'Invalid credentials') {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};