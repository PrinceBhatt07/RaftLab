import request from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/config/db";

describe("Order API", () => {
  let menuItemId: string;
  let adminToken: string;

  beforeEach(async () => {
    // Connect to DB and clear data
    await prisma.$connect();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.menuItem.deleteMany();
    await prisma.user.deleteMany();

    // Create a mock menu item
    const menu = await prisma.menuItem.create({
      data: {
        name: "Test Burger",
        description: "Delicious test burger",
        price: 150,
        imageUrl: "http://example.com/burger.jpg",
      },
    });
    menuItemId = menu.id;

    // Create an admin user for status update tests
    const admin = await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@test.com",
        password: "password123",
        role: "ADMIN",
      },
    });
    // In our simplified mock, token is just user ID
    adminToken = admin.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /api/v1/orders", () => {
    it("should create a new order successfully", async () => {
      const payload = {
        deliveryName: "John Doe",
        deliveryAddress: "123 Test St",
        deliveryPhone: "9998887776",
        items: [
          {
            menuItemId,
            quantity: 2,
          },
        ],
      };

      const response = await request(app)
        .post("/api/v1/orders")
        .send(payload);

      console.log("POST /orders response:", response.body);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.totalAmount).toBe(300); // 150 * 2
      expect(response.body.data.status).toBe("RECEIVED");
    });

    it("should fail validation if items are empty", async () => {
      const payload = {
        deliveryName: "John Doe",
        deliveryAddress: "123 Test St",
        deliveryPhone: "9998887776",
        items: [],
      };

      const response = await request(app)
        .post("/api/v1/orders")
        .send(payload);

      // Zod validation should fail
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/v1/orders/:id", () => {
    it("should fetch an order by ID", async () => {
      // First create an order
      const orderResponse = await request(app)
        .post("/api/v1/orders")
        .send({
          deliveryName: "Jane Doe",
          deliveryAddress: "456 Main St",
          deliveryPhone: "5555555555",
          items: [{ menuItemId, quantity: 1 }],
        });

      const orderId = orderResponse.body.data.id;

      // Now fetch it
      const response = await request(app).get(`/api/v1/orders/${orderId}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(orderId);
      expect(response.body.data.deliveryName).toBe("Jane Doe");
    });

    it("should return 404 for non-existent order", async () => {
      // Create a valid BSON objectId that doesn't exist
      const fakeId = "5f9d8e7c6b5a4938271605ab";
      const response = await request(app).get(`/api/v1/orders/${fakeId}`);

      expect(response.status).toBe(404);
    });
  });

  describe("PATCH /api/v1/orders/:id/status", () => {
    let orderId: string;

    beforeEach(async () => {
      // Create an order for status update
      const orderResponse = await request(app)
        .post("/api/v1/orders")
        .send({
          deliveryName: "Admin Test",
          deliveryAddress: "789 Admin St",
          deliveryPhone: "1112223334",
          items: [{ menuItemId, quantity: 1 }],
        });
      orderId = orderResponse.body.data.id;
    });

    it("should allow admin to update order status", async () => {
      const response = await request(app)
        .patch(`/api/v1/orders/${orderId}/status`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "PREPARING" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe("PREPARING");
    });

    it("should fail validation for invalid status", async () => {
      const response = await request(app)
        .patch(`/api/v1/orders/${orderId}/status`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ status: "INVALID_STATUS" });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should reject status update if not admin", async () => {
      const response = await request(app)
        .patch(`/api/v1/orders/${orderId}/status`)
        // No token provided
        .send({ status: "PREPARING" });

      expect(response.status).toBe(401); 
    });
  });
});