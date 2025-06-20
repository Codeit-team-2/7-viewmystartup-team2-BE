// controllers/investment/investment.controller.js
import {
  deleteInvestmentService,
  fetchInvestmentsByCompanyId,
  updateInvestmentService,
  postInvestments as postInvestmentService,
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

export const updateInvestmentController = async (req, res) => {
  try {
    const { companyId, userId } = req.params;
    const { howMuch, comment } = req.body;
    const result = await updateInvestmentService(userId, companyId, {
      howMuch,
      comment,
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
    await deleteInvestmentService(investmentId);
    res.status(200).json({ message: "삭제 완료" });
  } catch (error) {
    console.error("❌ [deleteInvestment] error:", error);
    res.status(500).json({ error: "삭제 실패" });
  }
};

export const postInvestments = async (req, res) => {
  try {
    const form = req.body;
    const investments = await postInvestmentService(form);
    res.status(200).json(investments);
  } catch (error) {
    console.error("❌ [postInvestments] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
