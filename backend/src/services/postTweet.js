import { User } from "../models/user.js";

export async function postTweet(tweetInfo) {
  const userIdRefTweet = await User.findById(tweetInfo.userId);
  if (!userIdRefTweet) throw new Error("User doesn´t exist");

  const tweet = await User.create(tweetInfo);
  return tweet;
}
