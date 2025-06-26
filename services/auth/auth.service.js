// services/auth/auth.service.js
import { findUserByNickname } from "../../repositories/auth/auth.repository.js";

export const loginUser = async ({ nickname, password }) => {
  const user = await findUserByNickname(nickname);
  if (!user) {
    throw new Error("존재하지 않는 사용자입니다.");
  }

  if (user.password !== password) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  return {
    nickname: user.nickname,
    userId: user.id,
    email: user.email,
    balance: user.balance,
    investmentsCount: user.investmentsCount,
  };
};

export const refreshUserInfo = async (nickname) => {
  const user = await findUserByNickname(nickname);
  if (!user) throw new Error("존재하지 않는 사용자입니다.");

  return {
    nickname: user.nickname,
    userId: user.id,
    email: user.email,
    balance: user.balance,
    investmentsCount: user.investmentsCount,
  };
};
