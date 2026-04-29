import { prisma } from "../config/db";
import { Role } from "@prisma/client";

export const createAdmin = async () => {
  try {
    await prisma.$connect();

    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@raftlabs.com" }
    });

    if (existingAdmin) {
      console.log("Admin already exists. Skipping creation.");
      return;
    }

    const admin = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@raftlabs.com",
        role: Role.ADMIN,
        password: "password"
      }
    });

    console.log("Admin created:", admin);
  } catch (error) {
    console.error("Failed to create admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();