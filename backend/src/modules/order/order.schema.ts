import { z } from "zod";
import { OrderStatus } from "./order.types";

export const createOrderSchema = z.object({
  userId: z.string().optional(),
  items: z.array(
    z.object({
      menuItemId: z.string(),
      quantity: z.number().min(1)
    })
  ).min(1),
  deliveryName: z.string(),
  deliveryAddress: z.string(),
  deliveryPhone: z.string()
});

export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus)
});