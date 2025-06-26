-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "investmentStage" DROP NOT NULL,
ALTER COLUMN "investors" DROP NOT NULL,
ALTER COLUMN "revenue" DROP NOT NULL,
ALTER COLUMN "totalInvestment" DROP NOT NULL;
