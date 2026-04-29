import { Request, Response } from "express";
import * as service from "./auth.service";

export const guestLogin = async (req: Request, res: Response) => {
  const { name, phone } = req.body;

  const user = await service.guestLogin(name, phone);

  res.json({ success: true, data: user });
};

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await service.adminLogin(email, password);
    res.json({ success: true, data: admin });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message || "Invalid credentials" });
  }
};