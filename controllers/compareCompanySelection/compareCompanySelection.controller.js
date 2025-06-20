// controllers/compareCompanySelection/compareCompanySelection.controller.js
import {
  createCompareCompanySelection,
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

export const postCompareCompanySelection = async (req, res) => {
  const { userId, companyIds } = req.body;
  try {
    const result = await createCompareCompanySelection(userId, companyIds);
    res.status(200).json(result);
  } catch (e) {
    console.error("❌ [postCompareCompanySelection] error:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
