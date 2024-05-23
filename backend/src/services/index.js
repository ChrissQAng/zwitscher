import { registerUser } from "./registerUser.js";
import { loginUser } from "./loginUser.js";
import { refreshAccessToken } from "./refreshAccessToken.js";
import { verifyUserEmail } from "./verifyUserEmail.js";
import { sendVerificationEmail } from "./sendEmail.js";
import { deleteUser } from "./deleteUser.js";
import { getOneUser } from "./getOneUser.js";
import { getAllUsers } from "./getAllUsers.js";
import { postTweet } from "./postTweet.js";
import { deleteTweet } from "./deleteTweet.js";

export const UserService = {
  registerUser,
  loginUser,
  refreshAccessToken,
  verifyUserEmail,
  sendVerificationEmail,
  deleteUser,
  getOneUser,
  getAllUsers,
};

export const TweetService = {
  postTweet,
  deleteTweet
}