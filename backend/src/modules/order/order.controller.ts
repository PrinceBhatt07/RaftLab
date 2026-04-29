import { Request, Response } from "express";
import * as service from "./order.service";
import { OrderStatus } from "@prisma/client";

export const createOrder = async (req: Request, res: Response) => {
  const order = await service.createOrderService(req.body);
  res.status(201).json({ success: true, data: order });
};

export const getOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  const order = await service.getOrderById(id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  res.json({ success: true, data: order });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await service.getAllOrders();
  res.json({ success: true, data: orders });
};


export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body as { status: OrderStatus };

  if (typeof id !== "string") {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  const order = await service.updateOrderStatus(id, status);
  res.json({ success: true, data: order });
};