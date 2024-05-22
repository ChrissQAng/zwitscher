import express from "express";

import { UserController } from "../controllers/userController.js";
import { validateRefreshTokenInCookieSession } from "../middlewares/doJwtAuth.js";
// import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const userRouter = express
  .Router()
  .post("/login", UserController.loginUserCtrl)
  .post("/register", UserController.registerUserCtrl)
  .post(
    "/refresh-token",
    validateRefreshTokenInCookieSession,
    UserController.refreshAccessTokenCtrl
  )
  .post("/verify-email", UserController.verifyUserEmailCtrl)
  .get("/send-email/:userId",  UserController.sendEmailCtrl); // authorization is logg
