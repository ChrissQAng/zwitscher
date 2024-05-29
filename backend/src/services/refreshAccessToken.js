import { User } from '../models/user.js'
import { createToken } from '../utils/createToken.js'
import { userToView } from './help.js'
import { Tweet } from '../models/tweet.js'
import { Comment } from '../models/comment.js'

// refreshToken -> refreshToken() -> newAccessToken
export async function refreshAccessToken(authenticatedUserId) {
  const user = await User.findById(authenticatedUserId)
  if (!user) throw new Error('User not found')

  const tweets = await Tweet.find({ userId: authenticatedUserId })

  const tweetIds = tweets.map(doc => doc.toObject()._id)

  const comments = await Comment.find({ tweetId: { $in: tweetIds } })
    .populate({
      path: 'userId',
      select: '_id firstName lastName',
    })
    .sort({ createdAt: -1 })

  const tweetsWithComments = tweets.map(tweet => ({
    ...tweet.toObject(),
    comments: comments.filter(
      comment => comment.tweetId.toString() === tweet._id.toString(),
    ),
  }))

  //   if (!user.isEmailVerified) throw new Error("User is not verified");
  //   if (user.isBlocked) throw new Error("User blocked");

  const newAccessToken = createToken(user, 'access')
  return {
    newAccessToken,
    user: userToView(user),
    tweets: { tweetsWithComments },
  }
}
