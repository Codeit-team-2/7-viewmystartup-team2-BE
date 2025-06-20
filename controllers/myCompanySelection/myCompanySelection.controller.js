// controllers/myCompanySelection/myCompanySelection.controller.js
import {
  createMyCompanySelection,
  fetchAllMyCompanySelections,
  fetchMyCompanySelectionCounts,
} from "../../services/myCompanySelection/myCompanySelection.service.js";

export const getAllMyCompanySelections = async (req, res) => {
  try {
    const result = await fetchAllMyCompanySelections();
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ [getAllMyCompanySelections] error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMyCompanySelectionCounts = async (req, res) => {
  try {
    const result = await fetchMyCompanySelectionCounts();
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ [getMyCompanySelectionCounts] error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postMyCompanySelection = async (req, res) => {
  const { userId, companyId } = req.body;
  try {
    const result = await createMyCompanySelection(userId, companyId);
    res.status(200).json(result);
  } catch (e) {
    console.error("❌ [postMyCompanySelection] error:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
