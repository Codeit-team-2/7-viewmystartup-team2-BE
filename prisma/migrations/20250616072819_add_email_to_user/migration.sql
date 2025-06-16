/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `investmentStage` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `investors` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userInvestment` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vmsInvestment` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "investmentStage" TEXT NOT NULL,
ADD COLUMN     "investors" TEXT NOT NULL,
ADD COLUMN     "userInvestment" TEXT NOT NULL,
ADD COLUMN     "vmsInvestment" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "nickname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
