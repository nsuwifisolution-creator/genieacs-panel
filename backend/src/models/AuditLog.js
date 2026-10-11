import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    actor: { type: String, default: "system" },
    action: { type: String, required: true },
    target: { type: String, default: "" },
    details: { type: Object, default: {} },
    ip: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
