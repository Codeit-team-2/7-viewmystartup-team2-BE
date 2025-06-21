// routes/company/company.routes.js
import express from "express";
import {
  getSortedFilteredCompanies,
  getCompaniesFiltered,
  getCompanyById,
  getInvestmentOverviewCompanies,
  getRecentMyCompanies,
  getSelectedOverviewCompanies,
} from "../../controllers/company/company.controller.js";

const router = express.Router();

// GET /companies
//!!순서 중요!! id뒤에 뭐 넣을경우 id='investment-overview' 이렇게 인식될수있습니다
// 라우트 순서바꾸고 노드몬 껏다키세요~

router.get("/recent", getRecentMyCompanies);
router.get("/investment-overview", getInvestmentOverviewCompanies);
router.get("/selected-overview", getSelectedOverviewCompanies);
router.get("/filtered/", getCompaniesFiltered);
router.get("/", getSortedFilteredCompanies);
router.get("/:id", getCompanyById);

export default router;
