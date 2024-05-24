import { User } from "../models/user.js";

export async function verifyUserEmail({ userId, sixDigitCode }) {
  const user = await User.findById(userId);
  console.log("------", userId);
  if (!user) throw new Error("User not found");

  const codeMatched = user.sixDigitCode === sixDigitCode;
  if (!codeMatched) throw new Error("Invalid six digit code, please try again");

  user.isEmailVerified = true;
  await user.save(); // mongoose method

  // await User.findByIdAndUpdate(userId, { $set: { isEmailVerified: true } });

  return { message: "Your email is now verified" }; // return; empty result (aber 200 OK wird im controller gesendet)
}
