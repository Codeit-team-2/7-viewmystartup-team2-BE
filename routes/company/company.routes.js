// routes/company/company.routes.js
import express from "express";
import {
  getAllCompanies,
  getCompanyById,
  getInvestmentOverviewCompanies,
  getSelectedOverviewCompanies,
} from "../../controllers/company/company.controller.js";

const router = express.Router();

// GET /companies
//!!순서 중요!! id뒤에 뭐 넣을경우 id='investment-overview' 이렇게 인식될수있습니다
// 라우트 순서바꾸고 노드몬 껏다키세요~
router.get("/investment-overview", getInvestmentOverviewCompanies);
router.get("/selected-overview", getSelectedOverviewCompanies);
router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);

/**
 * 요청사항
 *  각 테이블별로 /:파라미터 뭐가 들어가는곳에 치면
 * 어떤어떤 데이터가 리턴되야함
 * 이걸 알려줘야함
 *
 */
export default router;
