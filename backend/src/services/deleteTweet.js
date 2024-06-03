import { Tweet } from "../models/tweet.js";
import { Comment } from "../models/comment.js";

export async function deleteTweet(tweetId, userIdLogin) {
  try {
    // const foundTweet = await Tweet.findById(tweetId);
    // console.log("+++++++", foundTweet.userId, "++", userIdLogin);
    // if (userIdLogin !== foundTweet.userId) {
    //   throw new Error("Users are not the same!");
    // }
    const foundTweetDelete = await Tweet.findByIdAndDelete(tweetId);
    if (!foundTweetDelete) {
      throw new Error("Tweet with this ID doesn't exist");
    }
    const commentContainingTweet = await Comment.find({ tweetId: tweetId });
    if (!commentContainingTweet) {
      throw new Error("Tweet with this comment doesn't exist");
    }
    await Promise.all(
      commentContainingTweet.map(async (comment) => {
        await Comment.findByIdAndDelete(comment._id);
      })
    );
    return foundTweetDelete;
  } catch (err) {
    throw new Error(err.message);
  }
}
