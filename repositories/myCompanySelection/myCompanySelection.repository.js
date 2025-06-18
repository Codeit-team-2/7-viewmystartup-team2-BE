//repositories/myCompanySelection/myCompanySelection.repository.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 모든 선택 기록 조회
export const getAllMyCompanySelectionsFromDB = async () => {
  return await prisma.myCompanySelection.findMany({
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

// 선택된 회사별 선택 횟수 집계
export const getMyCompanySelectionCountByCompany = async () => {
  return await prisma.myCompanySelection.groupBy({
    by: ["companyId"],
    _count: true,
  });
};
