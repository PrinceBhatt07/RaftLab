import { prisma } from "../config/db";

export const createAdmin = async () => {
  try {
    await prisma.$connect();
    const admin = await prisma.user.upsert({
      where: { email: "admin@raftlabs.com" },
      update: { role: "ADMIN", password: "password", phone: null },
      create: {
        name: "Admin User",
        email: "admin@raftlabs.com",
        role: "ADMIN",
        password: "password"
      }
    });
    console.log("Admin user created/updated:", admin);
  } catch (error) {
    console.error("Failed to create admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();
