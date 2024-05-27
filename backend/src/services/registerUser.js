import { User } from '../models/user.js'
import { generateRandomSalt, hash } from '../utils/hash.js'
import { generateRandomSixDigitCode } from '../utils/sixDigitCode.js'
import { userToView } from './help.js'
import { createToken } from '../utils/createToken.js'
import { Tweet } from '../models/tweet.js'

export async function registerUser({
  firstName,
  lastName,
  email,
  password,
}) {
  const foundUserWithEmail = await User.findOne({ email })
  if (foundUserWithEmail)
    throw new Error('user with this email already exists')

  const passwordSalt = generateRandomSalt()
  const passwordHash = hash(`${password}${passwordSalt}`)

  const sixDigitCode = generateRandomSixDigitCode()
  const user = await User.create({
    firstName,
    lastName,
    email,
    passwordHash,
    passwordSalt,
    isEmailVerified: false,
    sixDigitCode,
  })
  const accessToken = createToken(user, 'access') // header.payload.signature
  const refreshToken = createToken(user, 'refresh') // header.payload.signature
  // console.log(refreshToken);

  const userDb = await User.findOne({ email })
  if (!userDb) throw new Error('Invalid email')

  const tweets = await Tweet.find({ userId: user._id })

  return {
    user: userToView(user),
    tokens: { accessToken, refreshToken },
    tweets: { tweets },
  }
}
