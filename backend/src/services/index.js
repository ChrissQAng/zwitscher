import { registerUser } from "./registerUser.js";
import { loginUser } from "./loginUser.js";
import { refreshAccessToken } from "./refreshAccessToken.js";
import { verifyUserEmail } from "./verifyUserEmail.js";
import { sendVerificationEmail } from "./sendEmail.js";

export const UserService = {
  registerUser,
  loginUser,
  refreshAccessToken,
  verifyUserEmail,
  sendVerificationEmail,
};
