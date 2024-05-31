import { Like } from "../models/likes.js";

export async function deleteLike(authenticatedUserId, tweetId, commentId) {
  const deleteQuery = commentId
    ? { userId: authenticatedUserId, tweetId, commentId }
    : { userId: authenticatedUserId, tweetId, commentId: { $exists: false } };

  const deletedLike = await Like.findOneAndDelete(deleteQuery);

  if (!deletedLike) throw new Error("Could not delete Like");

  return deletedLike;
}
