import { Tweet } from "../models/tweet.js";

export async function getAlltweets() {
  const tweets = await Tweet.find({});
  if (!tweets) throw new Error("tweets not found");
  return tweets;
}
