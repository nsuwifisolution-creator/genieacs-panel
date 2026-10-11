import express from "express";
import { getDeviceById, getDevices } from "../controllers/deviceController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, authorize("admin", "operator", "viewer"), getDevices);
router.get("/:id", authenticate, authorize("admin", "operator", "viewer"), getDeviceById);

export default router;
