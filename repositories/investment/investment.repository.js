// repositories/investment/investment.repository.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllInvestmentsFromDB = async () => {
  return await prisma.investment.findMany({
    //id랑 닉네임만 가져오기 아래처럼 필요한 필드만 가져올수있음
    include: {
      user: {
        select: { id: true, nickname: true },
      },
      company: {
        select: { id: true, companyName: true },
      },
    },
  });
};

//추후 createInvestment, getInvestmentsByUserId 같은 것 예정
