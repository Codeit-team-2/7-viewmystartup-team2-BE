// controllers/compareCompanySelection/compareCompanySelection.controller.js
import { fetchAllCompareCompanySelections } from "../../services/compareCompanySelection/compareCompanySelection.service.js";

export const getAllCompareCompanySelections = async (req, res) => {
  try {
    const results = await fetchAllCompareCompanySelections();
    res.status(200).json(results);
  } catch (error) {
    console.error("❌ [getAllCompareCompanySelections] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
