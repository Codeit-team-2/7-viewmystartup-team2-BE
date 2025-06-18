// controllers/company/company.controller.js
import {
  fetchAllCompanies,
  fetchCompanyById,
} from "../../services/company/company.service.js";

export const getAllCompanies = async (req, res) => {
  try {
    const { sortBy, order } = req.query;

    //기본값도 config로 정리해도 좋을듯여
    const sortField = sortBy ?? "revenue";   // 정렬 필드 기본값 매출액 revenue
    const sortOrder = order ?? "desc";       // 정렬 기준 기본값 높은순 desc

    const companies = await fetchAllCompanies({ sortBy: sortField, order: sortOrder });

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
