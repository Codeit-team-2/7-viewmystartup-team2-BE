import { PrismaClient } from "@prisma/client";
import { invInitialData } from "./company-data.js";

const prisma = new PrismaClient();

async function main() {
  // Company 데이터 넣기
  for (const company of invInitialData) {
    try {
      await prisma.company.create({ data: company });
    } catch (err) {
      console.error("❌ 에러 발생한 company 데이터:", company);
      throw err;
    }
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
