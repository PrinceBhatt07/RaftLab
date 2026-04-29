import { prisma } from "../../config/db";
import { OrderStatus } from "@prisma/client";

export const createOrder = (data: any) => {
  return prisma.order.create({
    data,
    include: { items: true }
  });
};

export const getOrderById = (id: string) => {
  return prisma.order.findUnique({
    where: { id },
    include: { items: true }
  });
};

export const getAllOrders = () => {
  return prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true }
  });
};


export const updateOrderStatus = (id: string, status: OrderStatus) => {
  return prisma.order.update({
    where: { id },
    data: { status },
    include: { items: true }
  });
};