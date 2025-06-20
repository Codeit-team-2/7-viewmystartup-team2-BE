// controllers/company/company.controller.js
import {
  fetchAllCompanies,
  fetchCompaniesFiltered,
  fetchCompanyById,
  fetchInvestmentOverviewCompanies,
  fetchRecentMyCompanies,
  fetchSelectedOverviewCompanies,
} from "../../services/company/company.service.js";

export const getSortedFilteredCompanies = async (req, res) => {
  const { keyword = "", sortBy, order } = req.query;

  //기본값도 config로 정리해도 좋을듯여
  const sortField = sortBy ?? "totalInvestment"; // 정렬 필드 기본값 누적투자금액 totalInvestment
  const sortOrder = order ?? "desc"; // 정렬 기준 기본값 높은순 desc
  try {
    console.log(
      "입력한 sortBy : ",
      sortField,
      " 입력한 order : ",
      sortOrder,
      " keyword: ",
      keyword
    );

    const companies = await fetchAllCompanies({
      keyword,
      sortBy: sortField,
      order: sortOrder,
    });

    res.status(200).json(companies);
  } catch (error) {
    console.error(
      "❌ [getAllCompanies] error:",
      error,
      "입력한 sort : ",
      sortField,
      " 입력한 order : ",
      sortOrder
    );
    res.status(500).json({
      error: `Internal Server Error '입력한 sort : ${sortField}, 입력한 order : ', sortOrder`,
    });
  }
};

export const getInvestmentOverviewCompanies = async (req, res) => {
  try {
    const { keyword = "", sortBy, order } = req.query;
    const sortField = sortBy ?? "vmsInvestment";
    const sortOrder = order ?? "desc";

    const companies = await fetchInvestmentOverviewCompanies({
      keyword,
      sortBy: sortField,
      order: sortOrder,
    });

    res.status(200).json(companies);
  } catch (error) {
    console.error("❌ [getInvestmentOverviewCompanies] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSelectedOverviewCompanies = async (req, res) => {
  try {
    const { keyword = "", sortBy, order } = req.query;
    const sortField = sortBy ?? "myCompanySelectedCount";
    const sortOrder = order ?? "desc";

    const companies = await fetchSelectedOverviewCompanies({
      keyword,
      sortBy: sortField,
      order: sortOrder,
    });

    res.status(200).json(companies);
  } catch (error) {
    console.error("❌ [getSelectedOverviewCompanies] error:", error);
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

export const getCompaniesFiltered = async (req, res) => {
  const { keyword } = req.query;
  try {
    const companies = await fetchCompaniesFiltered(keyword);
    res.status(200).json(companies);
  } catch (error) {
    console.error("❌ [getCompaniesFiltered] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRecentMyCompanies = async (req, res) => {
  const { id } = req.query;
  try {
    const companies = await fetchRecentMyCompanies(id);
    res.status(200).json(companies);
  } catch (error) {
    console.error("❌ [getRecentMyCompanies] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
