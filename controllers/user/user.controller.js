// controllers/user/user.controller.js
import { fetchAllUsers } from "../../services/user/user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ [getAllUsers] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
