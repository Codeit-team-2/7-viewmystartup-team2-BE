// repositories/user/user.repository.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllUsersFromDB = async () => {
  return await prisma.user.findMany();
};
