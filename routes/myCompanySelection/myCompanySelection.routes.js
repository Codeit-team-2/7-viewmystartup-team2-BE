// routes/myCompanySelection/myCompanySelection.routes.js
import express from "express";
import {
  getAllMyCompanySelections,
  getMyCompanySelectionCounts,
} from "../../controllers/myCompanySelection/myCompanySelection.controller.js";

const router = express.Router();

router.get("/", getAllMyCompanySelections);
router.get("/counts", getMyCompanySelectionCounts);

export default router;
