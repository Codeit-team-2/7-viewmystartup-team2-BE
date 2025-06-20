// services/investment/investment.service.js
import {
  deleteInvestmentRepo,
  getAllInvestmentsFromDB,
  updateInvestmentRepo,
  postInvestmentsFromDB,
} from "../../repositories/investment/investment.repository.js";

export const fetchInvestmentsByCompanyId = async companyId => {
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

export const deleteInvestmentService = async investmentId => {
  return await deleteInvestmentRepo(investmentId);
};

export const postInvestments = async (form) => {
  return await postInvestmentsFromDB(form);
};
