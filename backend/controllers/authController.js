import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '1h' }
    );
};

export default generateToken;
