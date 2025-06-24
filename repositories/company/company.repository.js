// repositories/company/company.repository.js
import { tr } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//LandingPage용 get
export const getAllCompaniesFromDB = async ({ keyword, sortBy, order }) => {
  //나중에 config로 뺍시당
  const allowedFields = ["revenue", "totalInvestment", "employees"];
  const allowedOrders = ["asc", "desc"];

  // 혹시 잘못된 정렬키가 들어오면 서버가 죽지않도록 방어로직
  //혹시 몰라 한번더 검사 없으면 기본값 매출액 높은순(내림차순)
  const sortField = allowedFields.includes(sortBy) ? sortBy : "revenue";
  const sortOrder = allowedOrders.includes(order) ? order : "desc";

  //키워드 있으면 키워드넣고 공란이면 그냥 넘어가서 기본 sort order만 적용

  //기업이름, 기업설명도 함께 검색
  const whereCondition = keyword
    ? {
        OR: [
          {
            companyName: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: keyword,
              mode: "insensitive",
            },
          },
        ],
      }
    : undefined;

  // 기업이름만 검색
  // const whereCondition = keyword
  //   ? {
  //       companyName: {
  //         contains: keyword,
  //         mode: "insensitive", // 대소문자 구분 없음
  //       },
  //     }
  //   : undefined;

  return prisma.company.findMany({
    where: whereCondition,
    orderBy: {
      [sortField]: sortOrder,
    },
  });
};

//투자현황 페이지
export const getInvestmentOverviewCompaniesFromDB = async ({
  keyword,
  sortBy,
  order,
}) => {
  const allowedFields = ["revenue", "totalInvestment", "vmsInvestment"];
  const allowedOrders = ["asc", "desc"];
  const sortField = allowedFields.includes(sortBy) ? sortBy : "vmsInvestment";
  const sortOrder = allowedOrders.includes(order) ? order : "desc";

  const whereCondition = keyword
    ? {
        OR: [
          {
            companyName: { contains: keyword, mode: "insensitive" },
          },
          {
            description: { contains: keyword, mode: "insensitive" },
          },
        ],
      }
    : undefined;

  return await prisma.company.findMany({
    where: whereCondition, // ✅ now conditional
    include: {
      _count: {
        select: {
          myCompanySelections: true,
          compareCompanySelections: true,
        },
      },
    },
    orderBy: {
      [sortField]: sortOrder,
    },
  });
};

//비교현황 페이지
export const getSelectedOverviewCompaniesFromDB = async ({
  keyword,
  sortBy,
  order,
}) => {
  const countFields = {
    myCompanySelectedCount: "myCompanySelections",
    compareCompanySelectedCount: "compareCompanySelections",
  };
  const allowedOrders = ["asc", "desc"];
  // const relationField = countFields[sortBy] || "myCompanySelections";
  // const sortOrder = allowedOrders.includes(order) ? order : "desc";

  const whereCondition = keyword
    ? {
        OR: [
          {
            companyName: { contains: keyword, mode: "insensitive" },
          },
          {
            description: { contains: keyword, mode: "insensitive" },
          },
        ],
      }
    : undefined;

  return await prisma.company.findMany({
    where: whereCondition,
    include: {
      _count: {
        select: {
          myCompanySelections: true,
          compareCompanySelections: true,
        },
      },
    },
    //정렬은 service에서 수동으로 하므로 orderBy 없음
  });
};

export const getCompanyByIdFromDB = async (id) => {
  return await prisma.company.findUnique({
    where: { id },
  });
};
//createCompany, countByCompanyId, deleteCompanyById등도 여기로 확장될 예정

export const getCompaniesFilteredFromDB = async (keyword, id) => {
  const where = { companyName: { contains: keyword, mode: "insensitive" } };

  if (id) {
    where.id = { not: id };
  }

  return await prisma.company.findMany({ where });
};

//기업명 클릭 => 기업id출력
export const getIdByCompanyFromDB = async (companyName) => {
  return await prisma.company.findFirst({
    where: { companyName },
    select: { id: true },
  });
};
