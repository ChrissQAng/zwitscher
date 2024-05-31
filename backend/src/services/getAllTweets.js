import { Like } from "../models/likes.js";
import { Tweet } from "../models/tweet.js";

export async function getAllTweets(authenticatedUserId) {
  const tweets = await Tweet.find({})
    .sort({ createdAt: -1 })
    .populate({ path: "userId", select: "firstName lastName" });

  if (!tweets) throw new Error("tweets not found");

  const tweetIds = tweets.map((tweet) => tweet._id);
  const likes = await Like.find({
    userId: authenticatedUserId,
    tweetId: { $in: tweetIds },
    commentId: { $exists: false },
  }).map((like) => like.tweetId.toString());

  const allTweets = tweets.map((tweet) => ({
    ...tweet.toObject(),
    isLikedByUser: likes.includes(tweet._id.toString()),
  }));

  return allTweets;
}
