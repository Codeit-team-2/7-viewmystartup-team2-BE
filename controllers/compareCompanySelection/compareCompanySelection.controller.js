// controllers/compareCompanySelection/compareCompanySelection.controller.js
import {
  fetchAllCompareCompanySelections,
  fetchCompareCompanySelectionCounts,
} from "../../services/compareCompanySelection/compareCompanySelection.service.js";

export const getAllCompareCompanySelections = async (req, res) => {
  try {
    const result = await fetchAllCompareCompanySelections();
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ [getAllCompareCompanySelections] error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCompareCompanySelectionCounts = async (req, res) => {
  try {
    const result = await fetchCompareCompanySelectionCounts();
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ [getCompareCompanySelectionCounts] error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
