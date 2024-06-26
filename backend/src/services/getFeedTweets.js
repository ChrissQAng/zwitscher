import { Comment } from "../models/comment.js";
import { Followment } from "../models/followment.js";
import { Like } from "../models/likes.js";
import { Tweet } from "../models/tweet.js";
import { User } from "../models/user.js";

export async function getFeedTweets(authenticatedUserId) {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User not found");

  // disclaimer: followments is not an acutal word ;)
  const followmentsOfUser = await Followment.find({
    followerId: authenticatedUserId, // [{ followerId: authenticatedUserId, followedId }]
  });
  const followedIds = followmentsOfUser.map((doc) => doc.toObject().followedId);

  const tweets = await Tweet.find({
    userId: { $in: [...followedIds, authenticatedUserId] },
  })
    .populate({
      path: "userId",
      select: "_id firstName lastName",
    })
    .sort({ createdAt: -1 });

  const tweetIds = tweets.map((doc) => doc.toObject()._id);

  const comments = await Comment.find({ tweetId: { $in: tweetIds } })
    .populate({
      path: "userId",
      select: "_id firstName lastName",
    })
    .sort({ createdAt: -1 });

  const commentIds = comments.map((comment) => comment._id);

  const commentLikes = (
    await Like.find({
      userId: authenticatedUserId,
      commentId: { $in: commentIds },
    })
  ).map((like) => like.commentId.toString());

  const tweetLikes = (
    await Like.find({
      userId: authenticatedUserId,
      tweetId: { $in: tweetIds },
      commentId: { $exists: false },
    })
  ).map((like) => like.tweetId.toString());

  const tweetsWithComments = tweets.map((tweet) => ({
    ...tweet.toObject(),
    isLikedByUser: tweetLikes.includes(tweet._id.toString()),
    comments: comments
      .filter((comment) => comment.tweetId.toString() === tweet._id.toString())
      .map((comment) => ({
        ...comment.toObject(),
        isLikedByUser: commentLikes.includes(comment._id.toString()),
      })),
  }));

  console.log("feed", tweetsWithComments);

  return { tweets: tweetsWithComments };
}

/*
Aufgabe 1
Schreibe eine Funktion getDashboardFeed(authenticatedUserId) mit folgender Rückgabe:
{
  // tweets sind alle tweets von followedIds UND meine
  tweets: [
    {
      text,
      userId: { _id, firstName, lastName } // populated User
      // comments von dem jeweiligen tweet
      comments: [
        {
          text,
          tweetId,
          userId: { _id, firstName, lastName } // populated User
        }
      ] 
    }
  ]
}
*/

/*
getDashboard(userId) gerade:
{
  followments: [{ followerId, followedId}],
  tweets: [tweet1, tweet2, ...],
  comments: [[...commentsOfTweet1], [...commentsOfTweet2], ...]
}
*/
