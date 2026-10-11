import express from "express";
import { createTask, getTasks, retryTask } from "../controllers/taskController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, authorize("admin", "operator"), getTasks);
router.post("/:id", authenticate, authorize("admin", "operator"), createTask);
router.post("/:id/retry", authenticate, authorize("admin", "operator"), retryTask);

export default router;
