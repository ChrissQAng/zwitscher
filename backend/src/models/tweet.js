import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { collection: "tweets", timestamps: true },
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
