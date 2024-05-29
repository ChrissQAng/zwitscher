import { registerUser } from './registerUser.js'
import { loginUser } from './loginUser.js'
import { refreshAccessToken } from './refreshAccessToken.js'
import { verifyUserEmail } from './verifyUserEmail.js'
import { sendVerificationEmail } from './sendEmail.js'
import { deleteUser } from './deleteUser.js'
import { getOneUser } from './getOneUser.js'
import { getAllUsers } from './getAllUsers.js'
import { postTweet } from './postTweet.js'
import { deleteTweet } from './deleteTweet.js'
import { postComment } from './postComment.js'
import { deleteComment } from './deleteComment.js'
import { getAllTweets } from './getAllTweets.js'
import { getDashboard } from './getDashboard.js'
import { followUser } from './followUser.js'
import { getFeedTweets } from './getFeedTweets.js'
import { getTrendingTweets } from './getTrendingTweets.js'
import { unfollowUser } from './unfollowUser.js'

export const UserService = {
  registerUser,
  loginUser,
  refreshAccessToken,
  verifyUserEmail,
  sendVerificationEmail,
  deleteUser,
  getOneUser,
  getAllUsers,
  getDashboard,
  followUser,
  unfollowUser,
}

export const TweetService = {
  postTweet,
  deleteTweet,
  getAllTweets,
  getFeedTweets,
  getTrendingTweets,
}
export const CommentService = {
  postComment,
  deleteComment,
}
