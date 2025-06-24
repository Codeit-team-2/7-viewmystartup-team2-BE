// services/investment/investment.service.js
import {
  deleteInvestmentRepo,
  getAllInvestmentsFromDB,
  updateInvestmentRepo,
  findUserById,
  decrementUserBalance,
  createInvestment,
  getUser,
  getCompanyFromDB,
  // postInvestmentsFromDB,
} from "../../repositories/investment/investment.repository.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const fetchCompanyDetailService = async companyId => {
  return await getCompanyFromDB(companyId);
};

export const fetchInvestmentsByCompanyId = async companyId => {
  const investments = await getAllInvestmentsFromDB(companyId);
  // 순위 계산 로직
  return investments.map((inv, idx) => ({
    ...inv,
    rank: idx + 1,
  }));
};

export const updateInvestmentService = async (
  investmentId,
  userId,
  password,
  updateData
) => {
  // 유저 조회
  const user = await getUser(userId);
  if (!user) {
    throw { status: 404, message: "유저를 찾을 수 없습니다." };
  }
  // 비밀번호 검증
  // const isMatch = await bcrypt.compare(password, user.password);
  const isMatch = password === user.password;
  if (!isMatch) {
    throw { status: 401, message: "비밀번호가 일치하지 않습니다." };
  }
  return await updateInvestmentRepo(investmentId, updateData);
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
export const deleteInvestmentService = async (
  investmentId,
  userId,
  password
) => {
  // 유저 조회
  const user = await getUser(userId);
  if (!user) {
    throw { status: 404, message: "유저를 찾을 수 없습니다." };
  }
  // 비밀번호 검증
  // const isMatch = await bcrypt.compare(password, user.password);
  const isMatch = password === user.password;
  if (!isMatch) {
    throw { status: 401, message: "비밀번호가 일치하지 않습니다." };
  }
  return await deleteInvestmentRepo(investmentId);
};

// 비밀번호만 검증
export const passwordCheckService = async (userId, password) => {
  const user = await getUser(userId);
  if (!user) throw { status: 404, message: "유저를 찾을 수 없습니다." };
  // const isMatch = await bcrypt.compare(password, user.password);
  const isMatch = password === user.password;
  if (!isMatch) throw { status: 401, message: "비밀번호가 일치하지 않습니다." };
  return { message: "비밀번호 일치" };
};
