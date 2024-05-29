import { User } from '../models/user.js'
import { userToView } from './help.js'
import { Tweet } from '../models/tweet.js'
import { Comment } from '../models/comment.js'

export async function getOneUser(userId) {
  const user = await User.findById(userId)
  if (!user) throw new Error('User with id ' + userId + ' not found')
  const tweets = await Tweet.find({ userId: userId }).sort({
    createdAt: -1,
  })
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
  return { user: userToView(user), tweets: tweetsWithComments }
}
