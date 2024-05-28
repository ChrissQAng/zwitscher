/*

Discover Page mit Trending Posts
    
Schreibe eine Funktion getTrendingTweets() welche die Top 30 Tweets der letzen Woche, nach dem Zwitscher-Score sortiert, liefert.
Der Zwitscher-Score besteht aus Anzahl der Comments zu einem Tweet geteilt durch die Lebensdauer des Tweets in Stunden.
Hinweis: Wenn ein Tweet älter als 1ne Woche ist, dann wird er ignoriert (egal wie populär, zählt nicht mehr als Trending).

*/

import { Comment } from "../models/comment.js";
import { Tweet } from "../models/tweet.js";

export async function getTrendingTweets() {
  const recentTweets = await Tweet.find({
    createdAt: { $gte: Date.now() - 7 * 24 * 60 * 60 * 1000 },
  }).populate({ path: "userId", select: "_id firstName lastName" });

  const commentsCount = await Promise.all(
    recentTweets.map((tweet) => countCommentsOfTweet(tweet))
  );

  const trendingTweets = recentTweets
    .map((tweet, tweetIndex) => ({
      ...tweet.toObject(),
      score: commentsCount[tweetIndex] / getLifeSpanInHours(tweet.createdAt),
    }))
    .sort((t1, t2) => t2.score - t1.score)
    .slice(0, 30);

  return trendingTweets;
}

function getLifeSpanInHours(createdAt) {
  const ageMs = Date.now() - new Date(createdAt).getTime();
  return ageMs / 1000 / 60 / 60;
}

async function countCommentsOfTweet(tweet) {
  return Comment.find({ tweetId: tweet._id }, { _id: 1 }).countDocuments();
}
