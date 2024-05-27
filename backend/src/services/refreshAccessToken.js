import { User } from '../models/user.js'
import { createToken } from '../utils/createToken.js'
import { userToView } from './help.js'
import { Tweet } from '../models/tweet.js'

// refreshToken -> refreshToken() -> newAccessToken
export async function refreshAccessToken(authenticatedUserId) {
  const user = await User.findById(authenticatedUserId)
  if (!user) throw new Error('User not found')

  const tweets = await Tweet.find({ userId: authenticatedUserId })

  //   if (!user.isEmailVerified) throw new Error("User is not verified");
  //   if (user.isBlocked) throw new Error("User blocked");

  const newAccessToken = createToken(user, 'access')
  return { newAccessToken, user: userToView(user), tweets: { tweets } }
}
