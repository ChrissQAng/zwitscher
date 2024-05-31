//  *Version 1
// const likeSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
//     targetId: { type: mongoose.Types.ObjectId, required: true },
//   },
//   { collection: "likes", timestamps: true },
// );

// export const Like = mongoose.model("Like", likeSchema);

// *Version 2
import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    tweetId: { type: mongoose.Types.ObjectId, ref: "Tweet", required: true },
    commentId: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
      required: false,
    },
  },
  { collection: "likes", timestamps: true },
);

export const Like = mongoose.model("Like", likeSchema);
