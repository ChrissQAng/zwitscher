import { Comment } from "../models/comment.js";
export async function deleteComment(commentId) {
  try {
    const foundCommentDelete = await Comment.findByIdAndDelete(commentId);
    if (!foundCommentDelete) {
      throw new Error("Comment with this ID doesn't exist");
    }
    return foundCommentDelete;
  } catch (err) {
    throw new Error(err.message);
  }
}
