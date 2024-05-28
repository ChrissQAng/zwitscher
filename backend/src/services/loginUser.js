import { User } from '../models/user.js'
import { Tweet } from '../models/tweet.js'
import { createToken } from '../utils/createToken.js'
import { hash } from '../utils/hash.js'
import { userToView } from './help.js'
import { Comment } from '../models/comment.js'

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email })
  if (!user) throw new Error('Invalid login')

  const passwordHash = hash(`${password}${user.passwordSalt}`)
  const correctPassword = passwordHash === user.passwordHash
  if (!correctPassword) throw new Error('Invalid login')

  const tweets = await Tweet.find({ userId: user._id }).sort({
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

  const accessToken = createToken(user, 'access') // header.payload.signature
  const refreshToken = createToken(user, 'refresh') // header.payload.signature

  return {
    user: userToView(user),
    tokens: { accessToken, refreshToken },
    tweets: { tweetsWithComments },
  }
}
