// routes/auth/auth.routes.js
import express from "express";
import { handleLogin } from "../../controllers/auth/auth.controller.js";

const router = express.Router();

router.post("/login", handleLogin);

export default router;
