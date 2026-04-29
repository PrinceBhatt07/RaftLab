import { prisma } from "../../config/db";
import * as repo from "./order.repository";
import { publishOrderStatusUpdate } from "../../realtime/order.publisher";
import { OrderStatus } from "@prisma/client";

export const createOrderService = async (input: any) => {
  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: { in: input.items.map((i: any) => i.menuItemId) }
    }
  });

  let totalAmount = 0;

  const items = input.items.map((item: any) => {
    const menu = menuItems.find(m => m.id === item.menuItemId)!;

    const total = menu.price * item.quantity;
    totalAmount += total;

    return {
      menuItemId: menu.id,
      quantity: item.quantity,
      price: menu.price,
      total
    };
  });

  return repo.createOrder({
    userId: input.userId,
    totalAmount,
    deliveryName: input.deliveryName,
    deliveryAddress: input.deliveryAddress,
    deliveryPhone: input.deliveryPhone,
    items: {
      create: items
    }
  });
};

export const getOrderById = async (orderId: string) => {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        select: {
          menuItem: {
            select: { name: true, price: true }
          },
          quantity: true,
          total: true
        }
      }
    }
  });
};

export const getAllOrders = async () => {
  return prisma.order.findMany({
    orderBy: { createdAt: 'desc' }
  });
};


export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  const order = await repo.updateOrderStatus(orderId, status);
  publishOrderStatusUpdate(orderId, status);
  return order;
};

