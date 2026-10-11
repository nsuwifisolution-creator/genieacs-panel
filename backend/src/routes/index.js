import express from "express";
import authRoutes from "./authRoutes.js";
import deviceRoutes from "./deviceRoutes.js";
import taskRoutes from "./taskRoutes.js";
import presetRoutes from "./presetRoutes.js";
import userRoutes from "./userRoutes.js";
import logRoutes from "./logRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/devices", deviceRoutes);
router.use("/tasks", taskRoutes);
router.use("/presets", presetRoutes);
router.use("/users", userRoutes);
router.use("/logs", logRoutes);

export default router;
