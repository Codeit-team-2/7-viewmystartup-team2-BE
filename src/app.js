import express from "express";
import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/user.js";
import companyRouter from "./routes/company.js";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

// 라우터 연결
app.use("/users", userRouter);
app.use("/companies", companyRouter);

app.listen(3000, () => {
  console.log("서버 실행 중: http://localhost:3000");
});
