import { Followment } from "../models/followment.js";
import { User } from "../models/user.js";
import { userToView } from "./help.js";

export async function postFollowment(userId, followedId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User with id " + userId + " not found");

  const foundUserFollowedId = await User.findById(followedId);
  if (!foundUserFollowedId) throw new Error("user with this id doesn´t exists");

  const followment = await Followment.create({
    followerId: userId,
    followedId,
  });
  return { message: "Followment created successfully" };
}
