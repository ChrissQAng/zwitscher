import { User } from "../models/user.js";
import {Tweet} from "../models/tweet.js"

export async function postTweet(tweetInfo) {
  const uId = tweetInfo.userId
  const foundUser = await User.findById(tweetInfo.userId);
  if (!foundUser) throw new Error("User doesn´t exist");
  const createdTweet = await Tweet.create({ ...tweetInfo, uId });
  foundUser.tweetsId.push(createdTweet._id);
  await foundUser.save();
  return createdTweet;
}
