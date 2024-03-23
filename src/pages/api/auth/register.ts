import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email } = req.body;

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    if (!email) {
      res.status(401).json({ error: "Email is required" });
      return;
    }

    const user = await prisma.user.create({
      data: {
        email: email,
      },
    });

    res.status(200).json({ message: "Register successfully" });
    console.log("output", "Email:", user);
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
}
