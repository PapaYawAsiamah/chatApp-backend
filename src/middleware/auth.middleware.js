// src/middleware/authMiddleware.ts


import { verifyToken } from '../utils/auth.utils.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token || token.length === 0) {
            const header_token = req.headers.authorization; //????
            if (!header_token) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const verify_token = verifyToken(header_token);
            if (!verify_token) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

        }
        const { userId, id } = verifyToken(token);
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (user){
            console.log(user)
        }
        req.headers.user = JSON.stringify(user)
        next();
    } catch (error) {
        // console.error(error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};
