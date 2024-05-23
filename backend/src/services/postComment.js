import { User } from "../models/user.js";
import { Comment } from "../models/comment.js";
import { Tweet } from "../models/tweet.js";

export async function postComment(commentInfo) {
  const uId = commentInfo.userId;
  const foundUser = await User.findById(commentInfo.userId);
  if (!foundUser) throw new Error("User doesn´t exist");

  const tId = commentInfo.tweetId;
  const foundTweet = await Tweet.findById(commentInfo.tweetId);
  if (!foundTweet) throw new Error("Tweet doesn´t exist");

  const createdComment = await Comment.create({ ...commentInfo, uId, tId });
  foundUser.commentsId.push(createdComment._id);
  foundTweet.commentsId.push(createdComment._id);
  await foundUser.save();
  await foundTweet.save();

  return createdComment;
}
