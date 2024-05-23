import { Comment } from "../models/comment.js";
import { Tweet } from "../models/tweet.js";
import { User } from "../models/user.js";

export async function deleteComment(commentId) {
  try {
    const foundCommentDelete = await Comment.findByIdAndDelete(commentId);
    if (!foundCommentDelete) {
      throw new Error("Comment with this ID doesn't exist");
    }
    const userContainingComment = await User.find({ commentsId: commentId });
    if (!userContainingComment) {
      throw new Error("Comment with this user doesn't exist");
    }
    // Ahmed fragen
    await Promise.all(
      userContainingComment.map((comment) => {
        comment.commentsId = comment.commentsId.filter(
          (cId) => cId.toString() !== commentId
        );
        return comment.save();
      })
    );
    const tweetContainingComment = await Tweet.find({ commentsId: commentId });
    if (!tweetContainingComment) {
      throw new Error("Comment with this tweet doesn't exist");
    }
    // Ahmed fragen
    await Promise.all(
      tweetContainingComment.map((comment) => {
        comment.commentsId = comment.commentsId.filter(
          (cId) => cId.toString() !== commentId
        );
        return comment.save();
      })
    );
    return foundCommentDelete;
  } catch (err) {
    throw new Error(err.message);
  }
}
