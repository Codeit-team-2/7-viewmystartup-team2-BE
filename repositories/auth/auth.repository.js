// repositories/auth/auth.repository.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findUserByNickname = async (nickname) => {
  return prisma.user.findUnique({
    where: { nickname },
    select: {
      id: true,
      nickname: true,
      email: true,
      password: true,
      balance: true,
      _count: {
        select: { investments: true },
      },
    },
  });
};
