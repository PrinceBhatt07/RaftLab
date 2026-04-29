import { Request, Response } from "express";
import * as service from "./menu.service";

export const getMenu = async (req: Request, res: Response) => {
  const data = await service.fetchMenu();
  res.json({ success: true, data });
};