import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    // commentsId: [{ type: String }],
  },
  { collection: "tweets", timestamps: true }
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
