//repositories/myCompanySelection/myCompanySelection.repository.js
import { tr } from "@faker-js/faker";
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

// 유저id로, 유저id가 일치하는 목록을 -> 최신순으로 정렬 -> 개 중 company 속성만 리스트로 뽑음 -> 중복 제거 -> 상위 5개만 리턴
export const getMyCompanySelectionByIdFromDB = async (userId) => {
  return await prisma.myCompanySelection.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      companyId: true,
    },
    take: 5,
  });
};

// 나의 기업 선택 기록 추가
export const postMyCompanySelection = async (userId, companyId) => {
  return await prisma.myCompanySelection.create({
    data: {
      user: { connect: { id: userId } },
      company: { connect: { id: companyId } },
    },
  });
};
