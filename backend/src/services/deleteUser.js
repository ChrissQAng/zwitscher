import { User } from "../models/user.js";

export async function deleteUser(userId) {
  const deleteUser = await User.findByIdAndDelete(userId);
  if (!deleteUser) throw new Error("User with id " + userId + " not found");
  await User.deleteMany({ userId }); 
  return deleteUser;
}
