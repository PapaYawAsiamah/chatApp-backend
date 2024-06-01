import express from "express"
import { login } from "./auth.controllers.js";
const router = express.Router();

router.get("/isAuth", (req, res) => {
    // console.log(req.cookies.token);
    
    res.status(200).json({ message: "Welcome to the chat log" })
})
router.post('/login', login);
export default router;