// controllers/investment/investment.controller.js
import { fetchAllInvestments } from "../../services/investment/investment.service.js";

export const getAllInvestments = async (req, res) => {
  try {
    const investments = await fetchAllInvestments();
    res.status(200).json(investments);
  } catch (error) {
    console.error("❌ [getAllInvestments] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
