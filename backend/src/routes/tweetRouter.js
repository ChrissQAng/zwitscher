import express from "express";

import { TweetController } from "../controllers/tweetController.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const tweetRouter = express
  .Router()
  .post("/", doJwtAuth, TweetController.postTweetCtrl)
  .delete("/:tweetId", doJwtAuth, TweetController.deleteTweetCtrl)
  .get("/",doJwtAuth, TweetController.getAllTweetsCtrl)
