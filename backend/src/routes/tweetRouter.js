import express from "express";

import { TweetController } from "../controllers/tweetController.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const tweetRouter = express
  .Router()
  .post("/", doJwtAuth, TweetController.postTweetCtrl)
  .get("/feed", doJwtAuth, TweetController.getFeedTweetsCtrl)
  .get("/trending", doJwtAuth, TweetController.getTrendingTweetsCtrl)
  .delete("/:tweetId", doJwtAuth, TweetController.deleteTweetCtrl)
  .get("/", doJwtAuth, TweetController.getAllTweetsCtrl)
  .get("/:tweetId", doJwtAuth, TweetController.getOneTweetCtrl)
  .post("/:tweetId/like", doJwtAuth, TweetController.postLikeTweetCtrl)
  .delete("/:tweetId/like", doJwtAuth, TweetController.deleteTweetLikeCtrl);
