// services/investment/investment.service.js
import {
  deleteInvestment,
  getAllInvestmentsFromDB,
  updateInvestment,
  updateUserNickname,
} from "../../repositories/investment/investment.repository.js";

export const fetchInvestmentsByCompanyId = async companyId => {
  const investments = await getAllInvestmentsFromDB(companyId);
  // 순위 계산 로직
  return investments.map((inv, idx) => ({
    ...inv,
    rank: idx + 1,
  }));
};

export const updateInvestmentAndNickname = async (
  userId,
  companyId,
  { howMuch, comment, nickname }
) => {
  const updatedInvestment = await updateInvestment(userId, companyId, {
    howMuch,
    comment,
  });
  let updatedUser;
  if (nickname) {
    updatedUser = await updateUserNickname(userId, nickname);
  }
  return { updatedInvestment, updatedUser };
};

export const deletedInvestment = async investmentId => {
  return await deleteInvestment(investmentId);
};
