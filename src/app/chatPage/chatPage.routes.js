
import express from "express"
const router = express.Router();

router.get("/chatPage", (req, res) => {
    // console.log(req.cookies.token);
    
    res.status(200).json({ message: "Welcome to the chat log" })
})

export default router