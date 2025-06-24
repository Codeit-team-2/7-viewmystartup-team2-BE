/*
  Warnings:

  - Changed the type of `revenue` on the `Company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `totalInvestment` on the `Company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `vmsInvestment` on the `Company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "revenue",
ADD COLUMN     "revenue" DOUBLE PRECISION NOT NULL,
DROP COLUMN "totalInvestment",
ADD COLUMN     "totalInvestment" DOUBLE PRECISION NOT NULL,
DROP COLUMN "vmsInvestment",
ADD COLUMN     "vmsInvestment" DOUBLE PRECISION NOT NULL;
