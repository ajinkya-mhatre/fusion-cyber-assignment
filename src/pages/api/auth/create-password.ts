import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { password, email } = req.body;

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    if (!email || !password) {
      res.status(401).json({ error: "Email and Password are required" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await argon2.hash(password),
      },
    });
    res.status(200).json({ message: "Password created Successfully" });
    console.log("output", "Email:", email, "Password:", password);
  } catch (error) {
    res.status(500).json({ message: "Password creation Failed" });
  }
}
