import request from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/config/db";

describe("Menu API", () => {
  beforeEach(async () => {
    await prisma.menuItem.deleteMany();

    await prisma.menuItem.createMany({
      data: [
        {
          name: "Burger",
          description: "Test",
          price: 100,
          imageUrl: "img"
        }
      ]
    });
  });

  it("GET /menu should return menu items", async () => {
    const res = await request(app).get("/api/v1/menu");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});