import { Comment } from "../models/comment.js";
import { Followment } from "../models/followment.js";
import { Tweet } from "../models/tweet.js";
import { User } from "../models/user.js";
import { userToView } from "./help.js";

export async function getDashboard(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User with id " + userId + " not found");

  const followments = await Followment.find({ followerId: userId }).populate({
    path: "followedId",
    select: "firstName lastName _id",
  });
  const followedIds = followments.map((e) => e.followedId._id);
  const tweets = await Tweet.find({ userId: { $in: followedIds } });
  // for (const e of tweets) {
  //   const comments = await Comment.find({ tweetId: e._id });
  //   console.log(e);
  //   e.comments = comments;
  // }

  const promises = tweets.map((e) => Comment.find({ tweetId: e._id }));
  const comments = await Promise.all(promises);

  return { followments, tweets, comments };
}
