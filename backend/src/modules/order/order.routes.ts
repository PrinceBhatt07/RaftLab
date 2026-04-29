import { Router } from "express";
import { createOrder, getOrder, updateOrderStatus, getAllOrders } from "./order.controller";
import { validate } from "../../common/middleware/validation.middleware";
import { createOrderSchema, updateOrderStatusSchema } from "./order.schema";
import { requireAdmin } from "../../common/middleware/auth.middleware";

const router = Router();

router.post("/", validate(createOrderSchema), createOrder);
router.get("/", requireAdmin, getAllOrders);
router.get("/:id", getOrder);

router.patch("/:id/status", requireAdmin, validate(updateOrderStatusSchema), updateOrderStatus);

export default router;