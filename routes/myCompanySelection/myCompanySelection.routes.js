// routes/myCompanySelection/myCompanySelection.routes.js
import express from "express";
import { getAllMyCompanySelections } from "../../controllers/myCompanySelection/myCompanySelection.controller.js";

const router = express.Router();

router.get("/", getAllMyCompanySelections);

export default router;
