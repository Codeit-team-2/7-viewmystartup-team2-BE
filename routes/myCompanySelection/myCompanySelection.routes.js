// routes/myCompanySelection/myCompanySelection.routes.js
import express from "express";
import {
  getAllMyCompanySelections,
  getMyCompanySelectionCounts,
  postMyCompanySelection,
} from "../../controllers/myCompanySelection/myCompanySelection.controller.js";

const router = express.Router();

router.post("/", postMyCompanySelection);
router.get("/", getAllMyCompanySelections);
router.get("/counts", getMyCompanySelectionCounts);

export default router;
