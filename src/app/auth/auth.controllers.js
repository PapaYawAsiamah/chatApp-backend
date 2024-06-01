// import { Request, Response } from 'express';
import { Prisma, PrismaClient } from "@prisma/client";
import { generateToken, verifyToken } from "../../utils/auth.utils.js";
import prisma from "../../utils/prisma.js";
import axios from 'axios';


export const login = async (req, res) => {
  // const app = express();
  // app.use(bodyParser.json());

  try {
    const { IndexNo, name } = req.body;
    const key = await prisma.key.findUnique({
      where: {
        key: `IndexNo::${IndexNo}`,
      },
    });
    if (!key) {
      return res.status(500).json({ message: "Account does not exist" });
    }

    const session = await prisma.session.create({
      data: {
        userId: key.userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: key.userId,
      },
    });

    res.cookie("token", generateToken(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    

    const r = await axios.put(
      "https://api.chatengine.io/users/",
      {
        username: name,
        secret: name,
        first_name: name,
      },

      {
        headers: { "private-key": "9c1a05ce-5230-4306-964b-90ae6b25bb36" },
      }
    );
    return res
      .status(200)
      .json({ token: generateToken(session), user: user, data: r.data });
  } catch (error) {
    // console.error(error);
    return res
      .status(500)
      .json({ error: error, message: "Internal server error" });
  }
};
