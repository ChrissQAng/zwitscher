import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    tweetId: { type: mongoose.Types.ObjectId, ref: "Tweet", required: true },
  },
  { collection: "comments", timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
