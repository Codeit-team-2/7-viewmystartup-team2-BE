// services/investment/investment.service.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const fetchAllInvestments = async () => {
  //id랑 닉네임만 가져오기 아래처럼 필요한 필드만 가져올수있음
  return await prisma.investment.findMany({
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
      company: {
        select: {
          id: true,
          companyName: true,
        },
      },
    },
  });
};
