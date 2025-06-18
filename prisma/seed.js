import { PrismaClient } from "@prisma/client";
import {
  userData,
  companyData,
  myCompanySelectionData,
  compareCompanySelectionData,
  investmentData,
} from "./seedData.js";

const prisma = new PrismaClient();

async function main() {
  // User 데이터 넣기
  for (const user of userData) {
    await prisma.user.create({
      data: user,
    });
  }

  // Company 데이터 넣기
  for (const company of companyData) {
    try {
      await prisma.company.create({ data: company });
    } catch (err) {
      console.error("❌ 에러 발생한 company 데이터:", company);
      throw err;
    }
  }

  // Investment 데이터 넣기
  for (const inv of investmentData) {
    await prisma.investment.create({
      data: inv,
    });
  }

  // MyCompanySelection 데이터 넣기
  for (const sel of myCompanySelectionData) {
    await prisma.myCompanySelection.create({
      data: sel,
    });
  }

  // CompareCompanySelection 데이터 넣기
  for (const sel of compareCompanySelectionData) {
    await prisma.compareCompanySelection.create({
      data: sel,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
