// routes/investment/investment.routes.js
import express from "express";
import {
  deletedInvestmentController,
  getInvestmentsByCompanyId,
  updateInvestmentController,
  postInvestments,
  passwordCheckController,
  getCompanyDetail,
} from "../../controllers/investment/investment.controller.js";

const router = express.Router();

router.get("/:companyId", getCompanyDetail);
router.get("/:companyId/investments", getInvestmentsByCompanyId);
router.patch("/investments/:investmentId", updateInvestmentController);
router.delete("/investments/:investmentId", deletedInvestmentController);
router.post("/users/:userId/passwordcheck", passwordCheckController);
router.post("/", postInvestments);

export default router;
