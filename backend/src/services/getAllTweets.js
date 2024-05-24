import { Tweet } from "../models/tweet.js";

export async function getAllTweets() {
  const tweets = await Tweet.find({}).populate({path:"userId", select:"firstName lastName"});
  if (!tweets) throw new Error("tweets not found");
  return tweets;
}
