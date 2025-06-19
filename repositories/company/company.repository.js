// repositories/company/company.repository.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//LandingPage용 get
export const getAllCompaniesFromDB = async ({ sortBy, order }) => {
  //나중에 config로 뺍시당
  const allowedFields = ["revenue", "totalInvestment", "employees"];
  const allowedOrders = ["asc", "desc"];

  // 혹시 잘못된 정렬키가 들어오면 서버가 죽지않도록 방어로직
  //혹시 몰라 한번더 검사 없으면 기본값 매출액 높은순(내림차순)
  const sortField = allowedFields.includes(sortBy) ? sortBy : "revenue";
  const sortOrder = allowedOrders.includes(order) ? order : "desc";

  return prisma.company.findMany({
    orderBy: {
      [sortField]: sortOrder,
    },
  });
};

//투자현황 페이지
export const getInvestmentOverviewCompaniesFromDB = async ({
  sortBy,
  order,
}) => {
  const allowedFields = ["revenue", "totalInvestment", "vmsInvestment"];
  const allowedOrders = ["asc", "desc"];
  const sortField = allowedFields.includes(sortBy) ? sortBy : "vmsInvestment";
  const sortOrder = allowedOrders.includes(order) ? order : "desc";
  return await prisma.company.findMany({
    include: {
      _count: {
        select: {
          myCompanySelections: true,
          compareCompanySelections: true,
        },
      },
    },
    orderBy: {
      _count: {
        [sortField]: sortOrder,
      },
    },
  });
};

//비교현황 페이지
export const getSelectedOverviewCompaniesFromDB = async ({ sortBy, order }) => {
  const countFields = {
    myCompanySelectedCount: "myCompanySelections",
    compareCompanySelectedCount: "compareCompanySelections",
  };
  const allowedOrders = ["asc", "desc"];
  const relationField = countFields[sortBy] || "myCompanySelections";
  const sortOrder = allowedOrders.includes(order) ? order : "desc";

  return await prisma.company.findMany({
    include: {
      _count: {
        select: {
          myCompanySelections: true,
          compareCompanySelections: true,
        },
      },
    },
  });
};

export const getCompanyByIdFromDB = async (id) => {
  return await prisma.company.findUnique({
    where: { id },
  });
};
//createCompany, countByCompanyId, deleteCompanyById등도 여기로 확장될 예정

export const getCompaniesFilteredFromDB = async (keyword) => {
  return await prisma.company.findMany({
    where: { companyName: { contains: keyword, mode: "insensitive" } },
  });
};
