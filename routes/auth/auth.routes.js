// routes/auth/auth.routes.js
import express from "express";
import { handleLogin, handleRefresh} from "../../controllers/auth/auth.controller.js";

const router = express.Router();

router.post("/login", handleLogin);
router.get("/refresh/:nickname", handleRefresh);

export default router;
