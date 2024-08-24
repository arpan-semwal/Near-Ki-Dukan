import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    console.log("jere")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.json({ message: 'Access denied, token missing!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.json({ message: 'Invalid token!' });
    }
};