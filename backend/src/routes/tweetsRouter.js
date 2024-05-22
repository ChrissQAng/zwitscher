import express from "express";

import { TweetController } from "../controllers/TweetController.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const userRouter = express
  .Router()
  .post("/tweets", TweetController.postTweetsCtrl);
