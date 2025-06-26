// controllers/auth/auth.controller.js
import {
  loginUser,
  refreshUserInfo,
} from "../../services/auth/auth.service.js";

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

export const handleRefresh = async (req, res) => {
  const { nickname } = req.params;

  try {
    const user = await refreshUserInfo(nickname);
    res.status(200).json(user);
  } catch (error) {
    console.error("❌ [handleRefresh] error:", error.message);
    res.status(404).json({ error: error.message });
  }
};
