import { Router } from "express";
import menuRoutes from "../modules/menu/menu.routes";
import orderRoutes from "../modules/order/order.routes";
import authRoutes from "../modules/auth/auth.routes";

const router = Router();

router.use("/menu", menuRoutes);
router.use("/orders", orderRoutes);
router.use("/auth", authRoutes);

export default router;