import { prisma } from "../../config/db";

export const getMenuItems = () => {
  return prisma.menuItem.findMany({
    where: { isAvailable: true }
  });
};