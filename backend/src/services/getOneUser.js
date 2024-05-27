import { User } from '../models/user.js'
import { userToView } from './help.js'
import { Tweet } from '../models/tweet.js'

export async function getOneUser(userId) {
  const user = await User.findById(userId)
  if (!user) throw new Error('User with id ' + userId + ' not found')
  const findTweetsFromUser = await Tweet.find({ userId: userId }).sort({
    createdAt: -1,
  })
  return { user: userToView(user), tweets: findTweetsFromUser }
}
