// routes/investment/investment.routes.js
import express from "express";
import {
  deletedInvestmentController,
  getInvestmentsByCompanyId,
  updateInvestmentAndNicknameController,
} from "../../controllers/investment/investment.controller.js";

const router = express.Router();

router.get("/:companyId/investments", getInvestmentsByCompanyId);
router.patch(
  "/:companyId/investments/:userId/investment",
  updateInvestmentAndNicknameController
);
router.delete(
  "/:companyId/investments/:investmentId",
  deletedInvestmentController
);

export default router;
