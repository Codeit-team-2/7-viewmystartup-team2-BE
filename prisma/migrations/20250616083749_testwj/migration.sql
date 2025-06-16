/*
  Warnings:

  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `compareSelectedCount` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `myCompanySelectedCount` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `userInvestment` on the `Company` table. All the data in the column will be lost.
  - The primary key for the `CompareCompanySelection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Investment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MyCompanySelection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CompareCompanySelection" DROP CONSTRAINT "CompareCompanySelection_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompareCompanySelection" DROP CONSTRAINT "CompareCompanySelection_userId_fkey";

-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_userId_fkey";

-- DropForeignKey
ALTER TABLE "MyCompanySelection" DROP CONSTRAINT "MyCompanySelection_companyId_fkey";

-- DropForeignKey
ALTER TABLE "MyCompanySelection" DROP CONSTRAINT "MyCompanySelection_userId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
DROP COLUMN "compareSelectedCount",
DROP COLUMN "myCompanySelectedCount",
DROP COLUMN "userInvestment",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Company_id_seq";

-- AlterTable
ALTER TABLE "CompareCompanySelection" DROP CONSTRAINT "CompareCompanySelection_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "companyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CompareCompanySelection_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CompareCompanySelection_id_seq";

-- AlterTable
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "companyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Investment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Investment_id_seq";

-- AlterTable
ALTER TABLE "MyCompanySelection" DROP CONSTRAINT "MyCompanySelection_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "companyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MyCompanySelection_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MyCompanySelection_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyCompanySelection" ADD CONSTRAINT "MyCompanySelection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyCompanySelection" ADD CONSTRAINT "MyCompanySelection_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompareCompanySelection" ADD CONSTRAINT "CompareCompanySelection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompareCompanySelection" ADD CONSTRAINT "CompareCompanySelection_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
