// services/investment/investment.service.js
import {
  deleteInvestmentRepo,
  getAllInvestmentsFromDB,
  updateInvestmentRepo,
  findUserById,
  decrementUserBalance,
  createInvestment,
  // postInvestmentsFromDB,
} from "../../repositories/investment/investment.repository.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const fetchInvestmentsByCompanyId = async (companyId) => {
  const investments = await getAllInvestmentsFromDB(companyId);
  // 순위 계산 로직
  return investments.map((inv, idx) => ({
    ...inv,
    rank: idx + 1,
  }));
};

export const updateInvestmentService = async (
  userId,
  companyId,
  { howMuch, comment }
) => {
  return await updateInvestmentRepo(userId, companyId, {
    howMuch,
    comment,
  });
};

export const deleteInvestmentService = async (investmentId) => {
  return await deleteInvestmentRepo(investmentId);
};

export const postInvestments = async ({
  userId,
  companyId,
  howMuch,
  comment,
  password,
}) => {
  const user = await findUserById(userId);
  if (!user) throw new Error("존재하지 않는 유저입니다.");
  if (user.password !== password)
    throw new Error("비밀번호가 일치하지 않습니다.");
  if (user.balance < howMuch) throw new Error("잔액이 부족합니다.");

  // 트랜잭션으로 처리
  const [_, investment] = await prisma.$transaction([
    decrementUserBalance(prisma, userId, howMuch),
    createInvestment(prisma, { userId, companyId, howMuch, comment }),
  ]);

  return investment;
};
