import { User } from "../models/user.js";

export async function getAllUsers() {
  const users = await User.find({});
  if (!users) throw new Error("Users not found");
  return users;
}
