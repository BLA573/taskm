import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    detail: { type: String, required: true },
    tags: { type: String },
    status: {
      type: String,
      enum: ["in progress", "backlog", "review", "completed"],
      default: "in progress",
      required: true,
    },
    board_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
