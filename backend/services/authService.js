import base from '../db_config/airtable.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Register User
const registerUser = async (userData) => {
    const { name, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const record = await base('Users').create([{ fields: { name, email, password: hashedPassword, role } }]);
    return { id: record[0].id, ...record[0].fields };
};

// Login User
const loginUser = async (email, password) => {
    const records = await base('Users').select({ filterByFormula: `{email} = '${email}'` }).firstPage();
    if (records.length === 0) throw new Error('User not found');

    const user = records[0].fields;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: records[0].id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    return { token, user: { id: records[0].id, name: user.name, email: user.email, role: user.role } };
};

export default { registerUser, loginUser };
