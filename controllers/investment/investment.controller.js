// controllers/investment/investment.controller.js
import {
  deletedInvestment,
  fetchInvestmentsByCompanyId,
  updateInvestmentAndNickname,
} from "../../services/investment/investment.service.js";

export const getInvestmentsByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;
    const investments = await fetchInvestmentsByCompanyId(companyId);
    res.status(200).json(investments);
  } catch (error) {
    console.error("❌ [getAllInvestments] error:", error);
    res.status(500).json({ error: "조회 실패" });
  }
};

export const updateInvestmentAndNicknameController = async (req, res) => {
  try {
    const { companyId, userId } = req.params;
    const { howMuch, comment, nickname } = req.body;
    const result = await updateInvestmentAndNickname(userId, companyId, {
      howMuch,
      comment,
      nickname,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ [updateInvestment] error:", error);
    res.status(500).json({ error: "수정 실패" });
  }
};

export const deletedInvestmentController = async (req, res) => {
  try {
    const { investmentId } = req.params;
    await deletedInvestment(investmentId);
    res.status(200).json({ message: "삭제 완료" });
  } catch (error) {
    console.error("❌ [deleteInvestment] error:", error);
    res.status(500).json({ error: "삭제 실패" });
  }
};
