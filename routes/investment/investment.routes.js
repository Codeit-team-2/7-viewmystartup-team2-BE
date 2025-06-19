// routes/investment/investment.routes.js
import express from "express";
import {
  deletedInvestmentController,
  getInvestmentsByCompanyId,
  updateInvestmentController,
} from "../../controllers/investment/investment.controller.js";

const router = express.Router();

router.get("/:companyId/investments", getInvestmentsByCompanyId);
router.patch(
  "/:companyId/investments/:userId/investment",
  updateInvestmentController
);
router.delete(
  "/:companyId/investments/:investmentId",
  deletedInvestmentController
);

export default router;
