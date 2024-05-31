import { Comment } from "../models/comment.js";
import { Like } from "../models/likes.js";
import { Tweet } from "../models/tweet.js";
import { User } from "../models/user.js";

export async function addLike(authenticatedUserId, tweetId, commentId) {
  const [user, tweet, comment, liked] = await Promise.all([
    User.findById(authenticatedUserId),
    Tweet.findById(tweetId),
    commentId ? Comment.findById(commentId) : "Fake Comment Placeholder",
    Like.findOne({
      userId: authenticatedUserId,
      tweetId,
      commentId,
    }),
  ]);

  if (liked) throw new Error("User already liked this!");
  if (!comment || !tweet || !user) throw new Error("Could not add like");

  const createdLike = await Like.create({
    userId: authenticatedUserId,
    tweetId,
    commentId,
  });

  return createdLike;
}
