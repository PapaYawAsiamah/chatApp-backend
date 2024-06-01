
import jwt from 'jsonwebtoken';

export const generateToken = (payload)=> {
    const token = jwt.sign({
        exp: Math.floor(Date.now()) + 1000 + (60 * 60 * 24 * 7),
        data: payload
    }, process.env.JWT_SECRET)
    return token;
};

export const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.data;
};
