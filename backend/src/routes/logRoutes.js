import express from "express";
import { getServiceLogs, getSystemStats } from "../controllers/logController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/services/:service", authenticate, authorize("admin", "operator", "viewer"), getServiceLogs);
router.get("/system", authenticate, authorize("admin", "operator", "viewer"), getSystemStats);

export default router;
