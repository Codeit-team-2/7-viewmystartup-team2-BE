// repositories/company/company.repository.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCompaniesFromDB = async ({ sortBy, order }) => {
  const allowedFields = ["revenue", "totalInvestment", "employees"];
  const allowedOrders = ["asc", "desc"];

  //혹시 몰라 한번더 검사 없으면 기본값 매출액 높은순(내림차순)
  const sortField = allowedFields.includes(sortBy) ? sortBy : "revenue";
  const sortOrder = allowedOrders.includes(order) ? order : "desc";

  return prisma.company.findMany({
    orderBy: {
      [sortField]: sortOrder,
    },
  });
};
export const getCompanyByIdFromDB = async (id) => {
  return await prisma.company.findUnique({
    where: { id },
  });
};
//createCompany, countByCompanyId, deleteCompanyById등도 여기로 확장될 예정
