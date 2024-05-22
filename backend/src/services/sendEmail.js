import { User } from "../models/user.js";
import { sendEmail } from "../utils/sendEmail.js";

export async function sendVerificationEmail(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User with this id not found");
  return sendEmail({
    to: user.email,
    subject: "Welcomne to Zwitscher",
    text: `Hi ${user.firstName},
  welcome to Zwitscher 🎉!!!
  Please enter the below six-digit-code verify your account to be able to login.
  ${user.sixDigitCode}
  See you on the other side :)
  - Zwitscher
  `,
  });
}
