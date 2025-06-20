// routes/compareCompanySelection/compareCompanySelection.routes.js
import express from "express";
import {
  getAllCompareCompanySelections,
  getCompareCompanySelectionCounts,
  postCompareCompanySelection,
} from "../../controllers/compareCompanySelection/compareCompanySelection.controller.js";

const router = express.Router();

router.post("/", postCompareCompanySelection);
router.get("/", getAllCompareCompanySelections);
router.get("/counts", getCompareCompanySelectionCounts);

export default router;
