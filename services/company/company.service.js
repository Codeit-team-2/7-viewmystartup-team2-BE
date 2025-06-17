// services/company/company.service.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const fetchAllCompanies = async () => {
  return await prisma.company.findMany();
};

export const fetchCompanyById = async (id) => {
  return await prisma.company.findUnique({
    where: { id },
  });
};
