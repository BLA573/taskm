import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    emoji: [{ type: String }],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Board || mongoose.model("Board", BoardSchema);
