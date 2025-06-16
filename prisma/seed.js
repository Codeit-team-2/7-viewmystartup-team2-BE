import { PrismaClient } from "@prisma/client";
import {
  userData,
  companyData,
  investmentData,
  myCompanyData,
  compareCompanyData,
} from "./seedData_uuid_cleaned_final.js";

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제 (관계 순서대로)
  await prisma.compareCompanySelection.deleteMany();
  await prisma.myCompanySelection.deleteMany();
  await prisma.investment.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  // 새 데이터 삽입 (관계 순서대로)
  await prisma.user.createMany({ data: userData });
  await prisma.company.createMany({ data: companyData });
  await prisma.investment.createMany({ data: investmentData });
  await prisma.myCompanySelection.createMany({ data: myCompanyData });
  await prisma.compareCompanySelection.createMany({ data: compareCompanyData });

  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
