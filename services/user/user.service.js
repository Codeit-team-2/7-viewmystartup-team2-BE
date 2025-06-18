// services/user/user.service.js
import { getAllUsersFromDB } from "../../repositories/user/user.repository.js";

export const fetchAllUsers = async () => {
  // 비즈니스 로직 추가 가능 (ex. 필터, 정렬, 계산 등)
  return await getAllUsersFromDB();
};
