import { User } from "../models/user.js";
import { userToView } from "./help.js";

export async function getOneUser(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User with id " + userId + " not found");
  return {user: userToView(user)};
}
