import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== "GET") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const hotels = await prisma.hotel.findMany({});

    res.status(200).json({
      message: "Data found",
      hotels,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get hotel details" });
  }
}
