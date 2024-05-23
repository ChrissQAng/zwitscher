import { Tweet } from "../models/tweet.js";
import { User } from "../models/user.js";

export async function deleteTweet(tweetId) {
    try {
      const foundTweetDelete = await Tweet.findByIdAndDelete(tweetId);
      if (!foundTweetDelete) {
        throw new Error("Tweet with this ID doesn't exist");
      }
      const userContainingTweet = await User.find({ tweetsId: tweetId });
      if (!userContainingTweet) {
        throw new Error("Tweet with this user doesn't exist");
      }
      // Ahmed fragen
      await Promise.all(
        userContainingTweet.map(async (tweet) => {
          tweet.tweetsId = tweet.tweetsId.filter((tId) => tId.toString() !== tweetId);
          await tweet.save();
        })
      );
      return foundTweetDelete;
    } catch (err) {
      throw new Error(err.message);
    }
  }

