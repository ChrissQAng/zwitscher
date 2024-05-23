import { User } from "../models/user.js";

export async function getOneUser(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User with id " + userId + " not found");
  return user;
}
