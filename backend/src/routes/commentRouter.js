import express from "express";

import { CommentController } from "../controllers/CommentController.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const userRouter = express
  .Router()
  .post("/comments", CommentController.postCommentCtrl);
