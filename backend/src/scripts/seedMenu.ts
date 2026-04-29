import { prisma } from "../config/db";
import menuData from "../data/menu.seed.json";

export const seedMenu = async () => {
  const existing = await prisma.menuItem.count();

  if (existing > 0) {
    console.log("Menu already seeded");
    return;
  }

  await prisma.menuItem.createMany({
    data: menuData
  });

  console.log("Menu seeded successfully");
};