import express from "express";
import cors from "cors";
import userRoutes from "./routes/user/user.routes.js";
import companyRoutes from "./routes/company/company.routes.js";
import investmentRoutes from "./routes/investment/investment.routes.js";
import myCompanySelectionRoutes from "./routes/myCompanySelection/myCompanySelection.routes.js";
import compareCompanySelectionRoutes from "./routes/compareCompanySelection/compareCompanySelection.routes.js";
import authRoutes from "./routes/auth/auth.routes.js";

const app = express();
app.use(cors()); // ㅂ배포해야 cors에러 알수있음
app.use(express.json());

// user 라우터 등록
app.use("/users", userRoutes);

// company 라우터
app.use("/companies", companyRoutes);

// investment 라우터
app.use("/investments", investmentRoutes); // 처음부터 오타낸건지 다른분이 바꾼건지 몰라서 일단주석처리

// myCompanySelection 라우터
app.use("/my-company-selections", myCompanySelectionRoutes);

// compareCompanySelection 라우터
app.use("/compare-company-selections", compareCompanySelectionRoutes);

// auth 라우터
app.use("/auth", authRoutes);

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT}에서 실행 중...🚀`);
});
