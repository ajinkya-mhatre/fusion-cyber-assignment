import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import { generateToken } from "@/utils/misc";

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

    const registeredUser = await prisma.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

    if (!registeredUser) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    if (registeredUser) {
      if (password) {
        const isPasswordCorrect = await argon2.verify(
          registeredUser.password as string,
          password,
        );
        if (isPasswordCorrect) {
          return {
            token: await generateToken(email, password, registeredUser, prisma),
          };
        }
      }
    }

    res.status(200).json({ message: "Login Successful" });
    console.log("Email:", email, "Password:", password);
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
}
