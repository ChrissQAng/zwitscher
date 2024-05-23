import { CommentService } from "../services/index.js";

async function postCommentCtrl(req, res) {
  try {
    const commentInfo = {
      text: req.body.text,
      tweetId: req.body.tweetId,
      userId: req.authenticatedUserId,
    };
    const result = await CommentService.postComment(commentInfo);
    res.status(201).json({ result }); // 201 Status = "Created"
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not add comment" });
  }
}
async function deleteCommentCtrl(req, res) {
  try {
    const commentId = req.params.commentId;

    const deletedComment = await CommentService.deleteComment(commentId);
    res.json(deletedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not delete comment" });
  }
}
export const CommentController = {
  postCommentCtrl,
  deleteCommentCtrl,
};
