import authService from '../services/authService.js';
import userValidator from '../validators/userValidator.js';

export const registerUser = async (req, res) => {
  try {
    const { error, value } = userValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const user = await authService.registerUser(value);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await authService.loginUser(email, password);
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
