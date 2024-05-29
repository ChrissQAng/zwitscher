import { Followment } from '../models/followment.js'
import { User } from '../models/user.js'

export async function followUser(authenticatedUserId, followedId) {
  const user = await User.findById(authenticatedUserId)
  if (!user)
    throw new Error('User with id ' + authenticatedUserId + ' not found')

  const foundUserFollowedId = await User.findById(followedId)
  if (!foundUserFollowedId)
    throw new Error('user with this id doesn´t exists')

  const followment = await Followment.create({
    followerId: authenticatedUserId,
    followedId,
  })
  return followment
}
