import express from "express";

import { CommentController } from "../controllers/commentController.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const commentRouter = express
  .Router()
  .post("/", doJwtAuth, CommentController.postCommentCtrl)
  .delete("/:commentId", doJwtAuth, CommentController.deleteCommentCtrl)
  .post("/:commentId/like", doJwtAuth, CommentController.postLikeCommentCtrl)
  .delete(
    "/:commentId/like",
    doJwtAuth,
    CommentController.deleteCommentLikeCtrl,
  );
