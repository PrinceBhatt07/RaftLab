import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/db";

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = await prisma.user.findUnique({
      where: { id: token }
    });

    if (!user || (user as any).role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "Forbidden - Admin access required" });
    }

    // Pass user to next middleware if needed
    (req as any).user = user;
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error);
    res.status(500).json({ success: false, message: "Internal server error during authentication" });
  }
};
