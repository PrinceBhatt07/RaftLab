import { prisma } from "../../config/db";

export const guestLogin = async (name: string, phone: string) => {
  let user = await prisma.user.findUnique({ where: { phone } });

  if (!user) {
    user = await prisma.user.create({
      data: { name, phone }
    });
  }

  return user;
};

export const adminLogin = async (email: string, password?: string) => {
  const admin = await prisma.user.findUnique({ where: { email } });
  
  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Admin not found");
  }
  
  if (admin.password !== password) {
    throw new Error("Invalid password");
  }
  
  return admin;
};