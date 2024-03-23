import * as argon2 from "argon2";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export function resolveDotPath(path: string, obj: object, separator = ".") {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev?.[curr], obj);
}

export const generateToken = async (
  email: string,
  password: string,
  user: User,
  prisma: PrismaClient,
) => {
  const token = await argon2.hash(`${email}|${password}|${Date.now()}`);
  await prisma.authToken.create({
    data: {
      token,
      user_id: user.id,
    },
  });
  return token;
};
