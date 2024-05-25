import mongoose from "mongoose";

const followmentSchema = new mongoose.Schema(
  {
    followerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    followedId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { collection: "followment", timestamps: true }
);

export const Followment = mongoose.model("Followment", followmentSchema);
