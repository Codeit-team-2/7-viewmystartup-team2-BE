// controllers/myCompanySelection/myCompanySelection.controller.js
import {
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
