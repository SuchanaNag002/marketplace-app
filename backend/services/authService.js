import base from '../db_config/airtable.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Register User
const registerUser = async (userData) => {
  try {
    const { name, email, password, role } = userData;
    
    // Check if user already exists
    const existingUsers = await base('Users').select({
      filterByFormula: `{email} = '${email}'`
    }).firstPage();
    
    if (existingUsers.length > 0) {
      throw new Error('User with this email already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const records = await base('Users').create([
      { fields: { name, email, password: hashedPassword, role: role || 'customer' } }
    ]);

    return { 
      id: records[0].id, 
      name: records[0].fields.name,
      email: records[0].fields.email,
      role: records[0].fields.role
    };
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

// Login User
const loginUser = async (email, password) => {
  try {
    const records = await base('Users').select({
      filterByFormula: `{email} = '${email}'`
    }).firstPage();

    if (records.length === 0) throw new Error('User not found');

    const user = records[0].fields;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
      { id: records[0].id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '72h' }
    );

    return {
      token,
      user: { id: records[0].id, name: user.name, email: user.email, role: user.role }
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export default { registerUser, loginUser };