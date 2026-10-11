import mongoose from "mongoose";

const presetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, default: "general" },
    description: { type: String, default: "" },
    config: { type: Object, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Preset", presetSchema);
