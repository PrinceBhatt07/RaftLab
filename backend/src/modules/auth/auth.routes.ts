import { Router } from "express";
import { adminLogin } from "./auth.controller";

const router = Router();

router.post("/admin", adminLogin);

export default router;