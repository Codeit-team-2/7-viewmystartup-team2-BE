import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// POST /companies - 새로운 회사 추가
router.post("/", async (req, res) => {
  const {
    companyName,
    description,
    category,
    revenue,
    employees,
    totalInvestment,
    investmentStage,
    investors,
    vmsInvestment,
  } = req.body;

  try {
    const newCompany = await prisma.company.create({
      data: {
        companyName,
        description,
        category,
        revenue,
        employees,
        totalInvestment,
        investmentStage,
        investors,
        vmsInvestment,
      },
    });

    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    res.json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 에러" });
  }
});

export default router;
