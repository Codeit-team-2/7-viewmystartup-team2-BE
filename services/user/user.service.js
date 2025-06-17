// services/user/user.service.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const fetchAllUsers = async () => {
  return await prisma.user.findMany();
};
