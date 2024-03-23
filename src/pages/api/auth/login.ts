import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email, password } = req.body;

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    if (!email || !password) {
      res.status(401).json({ error: "Email and Password are required" });
      return;
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        password: true,
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
          const token = await argon2.hash(`${email}|${password}|${Date.now()}`);
          await prisma.authToken.create({
            data: {
              token,
              user_id: registeredUser.id,
            },
          });
          res.setHeader("Set-Cookie", `token=${token}`);
          return res.status(200).json({ message: "Login Successful" });
        } else {
          res.status(401).json({ error: "Password don't matched" });
          return;
        }
      }
    }
    console.log("output", "Email:", email, "Password:", password);
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
}
