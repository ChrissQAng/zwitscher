import { Comment } from "../models/comment.js";

export async function deleteComment(commentId, userIdLogin) {
  try {
    const foundComment = await Comment.findById(commentId);

    const foundCommentToString = foundComment.userId;

    if (!foundComment) {
      throw new Error("Comment with this ID doesn't exist");
    }
    if (userIdLogin !== foundCommentToString.toString()) {
      throw new Error("Comment is not written by this user");
    }

    const foundCommentDelete = await Comment.findByIdAndDelete(commentId);
    return foundCommentDelete;
  } catch (err) {
    throw new Error(err.message);
  }
}
