import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// [GET] 모든 사용자 조회
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      investments: true,
      myCompanySelections: true,
      compareCompanySelections: true,
    },
  });
  res.json(users);
});

// [POST] 사용자 생성
router.post('/', async (req, res) => {
  const { email, password, nickname } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        nickname,
        balance: 0,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
