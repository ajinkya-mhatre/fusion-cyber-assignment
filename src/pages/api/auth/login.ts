import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({ error: "Email and Password are required" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    res.status(200).json({ message: "Login Successful" });
    console.log("Email:", email, "Password:", password);
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
}
