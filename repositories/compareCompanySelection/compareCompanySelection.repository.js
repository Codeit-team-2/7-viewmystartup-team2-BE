//repositories/compareCompanySelection/compareCompanySelection.repository.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 전체 비교 선택 내역
export const getAllCompareCompanySelectionsFromDB = async () => {
  return await prisma.compareCompanySelection.findMany({
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

// 회사별 비교 선택 횟수 집계
export const getCompareCompanySelectionCountByCompany = async () => {
  return await prisma.compareCompanySelection.groupBy({
    by: ["companyId"],
    _count: true,
  });
};

// 비교 기업 선택 기록 추가
export const postCompareCompanySelection = async (userId, companyId) => {
  return await prisma.compareCompanySelection.create({
    data: {
      user: { connect: { id: userId } },
      company: { connect: { id: companyId } },
    },
  });
};
