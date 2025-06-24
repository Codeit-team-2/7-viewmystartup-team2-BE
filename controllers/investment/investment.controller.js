// controllers/investment/investment.controller.js
import { tr } from "@faker-js/faker";
import {
  deleteInvestmentService,
  fetchInvestmentsByCompanyId,
  updateInvestmentService,
  postInvestments as postInvestmentService,
  passwordCheckService,
  fetchCompanyDetailService,
  MatchingUsersList,
} from "../../services/investment/investment.service.js";

export const getCompanyDetail = async (req, res) => {
  const { companyId } = req.params;
  try {
    const company = await fetchCompanyDetailService(companyId);
    if (!company) {
      return res.status(404).json({ error: "기업을 찾을 수 없습니다." });
    }
    res.status(200).json(company);
  } catch (eroor) {
    res.status(500).json({ error: "서버 오류" });
  }
};

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
  const { investmentId } = req.params;
  const { userId, password, howMuch, comment } = req.body;
  try {
    await updateInvestmentService(investmentId, userId, password, {
      howMuch: Number(howMuch),
      comment,
      updatedAt: new Date(),
    });
    res.status(200).json({ message: "수정 완료" });
  } catch (error) {
    console.error("❌ [updateInvestment] error:", error);
    res.status(500).json({ error: "수정 실패" });
  }
};

export const deletedInvestmentController = async (req, res) => {
  const { investmentId } = req.params;
  const { userId, password } = req.body;
  try {
    await deleteInvestmentService(investmentId, userId, password);
    res.status(200).json({ message: "삭제 완료" });
  } catch (error) {
    console.error("❌ [deleteInvestment] error:", error);
    res.status(500).json({ error: "삭제 실패" });
  }
};

export const passwordCheckController = async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;
  try {
    await passwordCheckService(userId, password);
    res.status(200).json({ message: "비밀번호 일치" });
  } catch (error) {
    res.status(500).json({ error: "서버 오류" });
  }
};

export const postInvestments = async (req, res) => {
  try {
    const form = req.body;
    const investments = await postInvestmentService(form);
    res.status(200).json(investments);
  } catch (error) {
    console.error("❌ [postInvestments] error:", error);
    res.status(400).json({ error: error.message });
    //(500->400 Invalid user , 잔액부족 등 클라이언트 실수)
  }
};

export const getInvestmentByUserIdList = async (req, res) => {
  try {
    const { userId, nickname, sortBy, order, keyword } = req.query;

    if (!userId && !nickname) {
      return res.status(400).json({ error: "userid or nickname 중 하나오류" });
    }
    const listInvestments = await MatchingUsersList({
      userId,
      nickname,
      sortBy: sortBy || "howMuch",
      order: order || "desc",
      keyword: keyword || "",
    });
    res.status(200).json(listInvestments);
  } catch (error) {
    console.error("[getInvestmentByUserIdList] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
