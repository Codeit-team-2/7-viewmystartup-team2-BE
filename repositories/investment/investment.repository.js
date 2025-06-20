// repositories/investment/investment.repository.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllInvestmentsFromDB = async companyId => {
  return await prisma.investment.findMany({
    //id랑 닉네임만 가져오기 아래처럼 필요한 필드만 가져올수있음
    where: {
      companyId,
      deletedAt: null,
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
      howMuch: true,
      comment: true,
    },
    orderBy: {
      howMuch: "desc",
    },
  });
};
// 유저 투자 정보 수정
export const updateInvestmentRepo = async (userId, companyId, updateData) => {
  return await prisma.investment.updateMany({
    where: { userId, companyId, deletedAt: null },
    data: updateData,
  });
};

// 투자 정보 삭제
export const deleteInvestmentRepo = async investmentId => {
  return await prisma.investment.update({
    where: { id: investmentId },
    data: { deletedAt: new Date() },
  });
};
export const postInvestmentsFromDB = async (form) => {
  return await prisma.investment.create({
    data: {
      user: {
        connect: { id: form.userId }, // User 테이블에 있는 유저 ID
      },
      company: {
        connect: { id: form.companyId }, // Company 테이블의 ID
      },
      howMuch: form.howMuch, // 필수
      comment: form.comment, // 선택
    },
  });
};

//추후 createInvestment, getInvestmentsByUserId 같은 것 예정
