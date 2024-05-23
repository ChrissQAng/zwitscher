import { User } from "../models/user.js";
import { userToView } from "./help.js";


export async function getAllUsers() {
  const users = await User.find({});
  if (!users) throw new Error("Users not found");
  const usersView = users.map((userToView));
  return usersView;
}
