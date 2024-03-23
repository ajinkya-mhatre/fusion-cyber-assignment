import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email, password } = req.body;
    console.log("Email:", email, "Password:", password);
  } catch (error) {
    console.error("Login Failed:", error);
    res.status(500).json({ message: "Login Failed" });
  }
}
