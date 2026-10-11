import express from "express";
import { createUser, listUsers } from "../controllers/userController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, authorize("admin"), listUsers);
router.post("/", authenticate, authorize("admin"), createUser);

export default router;
