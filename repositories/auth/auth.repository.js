// repositories/auth/auth.repository.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findUserByNickname = async (nickname) => {
  return await prisma.user.findUnique({
    where: { nickname },
  });
};
