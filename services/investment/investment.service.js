// services/investment/investment.service.js
import { tr } from "@faker-js/faker";
import {
  deleteInvestmentRepo,
  getAllInvestmentsFromDB,
  updateInvestmentRepo,
  findUserById,
  decrementUserBalance,
  createInvestment,
  getUser,
  getCompanyFromDB,
  getInvestmentUserListByDB,
  incrementUserBalance,
} from "../../repositories/investment/investment.repository.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
// 기업정보 조회
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
// 투자 수정
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
  const investment = await prisma.investment.findUnique({
    where: { id: investmentId },
    select: { howMuch: true },
  });
  if (!investment) {
    throw { status: 404, message: "투자 정보를 찾을 수 없습니다." };
  }
  const oldAmount = investment.howMuch;
  const newAmount = updateData.howMuch;

  const diff = newAmount - oldAmount;

  const tx = [];
  if (diff > 0) {
    // 추가 투자: 잔액 차감 및 잔액 부족 검증
    if (user.balance < diff) {
      throw { status: 400, message: "잔액이 부족합니다." };
    }
    tx.push(decrementUserBalance(prisma, userId, diff));
  } else if (diff < 0) {
    // 투자액 감소시 잔액 복구
    tx.push(incrementUserBalance(prisma, userId, Math.abs(diff)));
  }
  tx.push(updateInvestmentRepo(investmentId, updateData));
  await prisma.$transaction(tx);
  return { message: "투자 수정 및 잔액 수정" };
};
//  ????
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
// 투자 취소
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
  // 투자 정보 조회
  const investment = await prisma.investment.findUnique({
    where: { id: investmentId },
    select: { howMuch: true },
  });
  if (!investment) {
    throw { status: 404, message: "투자 정보를 찾을 수 없습니다." };
  }
  await prisma.$transaction([
    incrementUserBalance(prisma, userId, investment.howMuch),
    deleteInvestmentRepo(investmentId),
  ]);
  return { message: "삭제 및 잔액 복구 완료" };
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

export const MatchingUsersList = async ({
  userId,
  nickname,
  sortBy,
  order,
  keyword,
}) => {
  if (!userId && !nickname) {
    throw new Error("userId 또는 nickname 중 하나는 필수입니다.");
  }
  try {
    return await getInvestmentUserListByDB({
      userId,
      nickname,
      sortBy,
      order,
      keyword,
    });
  } catch (error) {
    console.error("[MatchingUsersList] error:", error);
    throw error;
  }
};
