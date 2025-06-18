// repositories/company/company.repository.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCompaniesFromDB = async () => {
  return await prisma.company.findMany();
};

export const getCompanyByIdFromDB = async (id) => {
  return await prisma.company.findUnique({
    where: { id },
  });
};
//createCompany, countByCompanyId, deleteCompanyById등도 여기로 확장될 예정
