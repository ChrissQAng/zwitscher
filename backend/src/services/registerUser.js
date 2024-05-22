import { User } from "../models/user.js";
import { generateRandomSalt, hash } from "../utils/hash.js";
import { generateRandomSixDigitCode } from "../utils/sixDigitCode.js";
import { userToView } from "./help.js";

export async function registerUser({ firstName, lastName, email, password }) {
  const foundUserWithEmail = await User.findOne({ email });
  if (foundUserWithEmail)
    throw new Error("user with this email already exists");

  const passwordSalt = generateRandomSalt();
  const passwordHash = hash(`${password}${passwordSalt}`);

  const sixDigitCode = generateRandomSixDigitCode();
  const user = await User.create({
    firstName,
    lastName,
    email,
    passwordHash,
    passwordSalt,

    isEmailVerified: false,
    sixDigitCode,
  });

  return userToView(user);
}
