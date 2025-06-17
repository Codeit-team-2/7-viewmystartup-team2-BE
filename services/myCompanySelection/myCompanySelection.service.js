// services/myCompanySelection/myCompanySelection.service.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const fetchAllMyCompanySelections = async () => {
  return await prisma.myCompanySelection.findMany({
    include: {
      user: {
        select: { id: true, nickname: true }
      },
      company: {
        select: { id: true, companyName: true }
      }
    }
  });
};
