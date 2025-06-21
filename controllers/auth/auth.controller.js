// controllers/auth/auth.controller.js
import { loginUser } from "../../services/auth/auth.service.js";

export const handleLogin = async (req, res) => {
  const { nickname, password } = req.body;

  try {
    const user = await loginUser({ nickname, password });
    res.status(200).json(user);
  } catch (error) {
    console.error("❌ [handleLogin] error:", error.message);
    res.status(401).json({ error: error.message });
  }
};
