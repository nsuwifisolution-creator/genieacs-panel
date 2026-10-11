import express from "express";
import {
  createPreset,
  deletePreset,
  listPresets,
  updatePreset
} from "../controllers/presetController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, authorize("admin", "operator", "viewer"), listPresets);
router.post("/", authenticate, authorize("admin", "operator"), createPreset);
router.put("/:id", authenticate, authorize("admin", "operator"), updatePreset);
router.delete("/:id", authenticate, authorize("admin"), deletePreset);

export default router;
