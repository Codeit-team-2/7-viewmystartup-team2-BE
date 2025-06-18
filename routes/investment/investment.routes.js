// routes/investment/investment.routes.js
import express from "express";
import { getAllInvestments } from "../../controllers/investment/investment.controller.js";

const router = express.Router();

router.get("/", getAllInvestments);

export default router;
