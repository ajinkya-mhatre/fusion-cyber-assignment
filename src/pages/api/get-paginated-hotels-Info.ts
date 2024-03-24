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

    const skip =
      Number(req.query.page) === 1 ? 0 : (Number(req.query.page) - 1) * 8;

    const hotels = await prisma.hotel.findMany({
      take: 8,
      skip: skip,
    });

    res.status(200).json({
      message: "Data found",
      hotels,
      nextCursor: hotels.length < 8 ? undefined : skip + 1,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get hotel details" });
  }
}
