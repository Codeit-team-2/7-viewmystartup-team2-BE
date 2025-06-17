// controllers/myCompanySelection/myCompanySelection.controller.js
import { fetchAllMyCompanySelections } from "../../services/myCompanySelection/myCompanySelection.service.js";

export const getAllMyCompanySelections = async (req, res) => {
  try {
    const results = await fetchAllMyCompanySelections();
    res.status(200).json(results);
  } catch (error) {
    console.error("❌ [getAllMyCompanySelections] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
