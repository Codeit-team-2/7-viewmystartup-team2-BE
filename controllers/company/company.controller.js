// controllers/company/company.controller.js
import {
  fetchAllCompanies,
  fetchCompanyById,
} from "../../services/company/company.service.js";

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await fetchAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    console.error("❌ [getAllCompanies] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await fetchCompanyById(id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error("❌ [getCompanyById] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
