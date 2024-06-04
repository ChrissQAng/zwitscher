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

    const userIdLogin = req.authenticatedUserId;

    const deletedComment = await CommentService.deleteComment(
      commentId,
      userIdLogin
    );
    res.json(deletedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not delete comment" });
  }
}

async function postLikeCommentCtrl(req, res) {
  try {
    const tweetId = req.body.tweetId;
    const commentId = req.params.commentId;
    const authenticatedUserId = req.authenticatedUserId;
    const result = await CommentService.addLike(
      authenticatedUserId,
      tweetId,
      commentId
    );
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not like comment" });
  }
}

async function deleteCommentLikeCtrl(req, res) {
  try {
    const tweetId = req.body.tweetId;
    const commentId = req.params.commentId;
    const authenticatedUserId = req.authenticatedUserId;
    const result = await CommentService.deleteLike(
      authenticatedUserId,
      tweetId,
      commentId
    );
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not like of comment" });
  }
}

export const CommentController = {
  postCommentCtrl,
  deleteCommentCtrl,
  postLikeCommentCtrl,
  deleteCommentLikeCtrl,
};
