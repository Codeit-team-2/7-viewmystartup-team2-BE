// routes/company/company.routes.js
import express from "express";
import {
  getAllCompanies,
  getCompanyById,
} from "../../controllers/company/company.controller.js";

const router = express.Router();

// GET /companies
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
