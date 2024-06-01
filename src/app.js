import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import authRoutes from './app/auth/auth.routes.js';
import categoryRouter from './app/chatPage/chatPage.routes.js';
import  {authenticateUser} from './middleware/auth.middleware.js';

const app = express();
const prisma = new PrismaClient();

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Welcome to Health API");
});
const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // methods: 'GET,POST,PATCH,DELETE,PUT', // Only allow these methods
    allowedHeaders: 'Content-Type,Authorization,Set-Cookie,Access-Control-Allow-Origin,Access-Control-Allow-Credentials', // Only allow some headers
    // Allow cookies
    credentials: true,
};

app.use(cors(corsOptions));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/chat',authenticateUser, categoryRouter);



// app.get('/users', async (req, res) => {
//     try {
//         const users = await prisma.user.findMany({
//             include: { posts: true },
//         });
//         res.json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.post('/users', async (req, res) => {
//     try {
//         const { name, email } = req.body;
//         const user = await prisma.user.create({
//             data: {
//                 name,
//                 email,
//             },
//         });
//         res.status(201).json(user);
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


export default app;
