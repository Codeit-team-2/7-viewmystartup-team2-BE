// repositories/auth/auth.repository.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findUserByNickname = async (nickname) => {
  const user = await prisma.user.findUnique({
    where: { nickname },
    select: {
      id: true,
      nickname: true,
      email: true,
      password: true,
      balance: true,
    },
  });
  if (!user) return null;
  // 투자갯수 카운트 _count에서는 조건필터링이 안됨 그래서 따로 만들어야함
  const investmentsCount = await prisma.investment.count({
    where: {
      userId: user.id,
      deletedAt: null, //deletedAt이 null 인 것만 카운트
    },
  });
  return { ...user, investmentsCount };
};
