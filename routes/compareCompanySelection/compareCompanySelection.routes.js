// routes/compareCompanySelection/compareCompanySelection.routes.js
import express from "express";
import { getAllCompareCompanySelections } from "../../controllers/compareCompanySelection/compareCompanySelection.controller.js";

const router = express.Router();

router.get("/", getAllCompareCompanySelections);

export default router;
