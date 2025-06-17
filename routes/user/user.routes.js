// routes/user/user.routes.js
import express from "express";
import { getAllUsers } from "../../controllers/user/user.controller.js";

const router = express.Router();

// GET /users
router.get("/", getAllUsers);

export default router;
