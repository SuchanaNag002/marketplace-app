import authService from "../services/authService";

export const loginUser = async (res, req) => {
  try {
    const { email, password } = req.body;
    const response = await authService.loginUser(email, password);
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
