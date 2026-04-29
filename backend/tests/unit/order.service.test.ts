import { createOrderService } from "../../src/modules/order/order.service";
import { prisma } from "../../src/config/db";

jest.mock("../../src/config/db", () => ({
  prisma: {
    menuItem: {
      findMany: jest.fn()
    }
  }
}));

jest.mock("../../src/modules/order/order.repository", () => ({
  createOrder: jest.fn()
}));

import * as orderRepo from "../../src/modules/order/order.repository";

describe("Order Service", () => {
  it("should create order with correct total", async () => {
    (prisma.menuItem.findMany as jest.Mock).mockResolvedValue([
      { id: "1", price: 100 }
    ]);

    (orderRepo.createOrder as jest.Mock).mockResolvedValue({
      id: "order1",
      totalAmount: 200
    });

    const input = {
      userId: "user1",
      items: [{ menuItemId: "1", quantity: 2 }],
      deliveryName: "Test",
      deliveryAddress: "Address",
      deliveryPhone: "9999999999"
    };

    const result = await createOrderService(input);

    expect(result.totalAmount).toBe(200);
    expect(orderRepo.createOrder).toHaveBeenCalled();
  });

  it("should throw error if menu item not found", async () => {
    (prisma.menuItem.findMany as jest.Mock).mockResolvedValue([]);

    const input = {
      userId: "user1",
      items: [{ menuItemId: "invalid", quantity: 1 }],
      deliveryName: "Test",
      deliveryAddress: "Address",
      deliveryPhone: "9999999999"
    };

    await expect(createOrderService(input)).rejects.toThrow();
  });
});