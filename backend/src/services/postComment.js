import { User } from "../models/user.js";
import { Comment } from "../models/comment.js";
import { Tweet } from "../models/tweet.js";

export async function postComment(commentInfo) {
  const foundUser = await User.findById(commentInfo.userId);
  if (!foundUser) throw new Error("User doesn´t exist");

  const foundTweet = await Tweet.findById(commentInfo.tweetId);
  if (!foundTweet) throw new Error("Tweet doesn´t exist");

  const createdComment = await Comment.create(commentInfo);

  return createdComment;
}
