// routes/compareCompanySelection/compareCompanySelection.routes.js
import express from "express";
import {
  getAllCompareCompanySelections,
  getCompareCompanySelectionCounts,
} from "../../controllers/compareCompanySelection/compareCompanySelection.controller.js";

const router = express.Router();

router.get("/", getAllCompareCompanySelections);
router.get("/counts", getCompareCompanySelectionCounts);

export default router;
