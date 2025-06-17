// services/compareCompanySelection/compareCompanySelection.service.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const fetchAllCompareCompanySelections = async () => {
  return await prisma.compareCompanySelection.findMany({
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
