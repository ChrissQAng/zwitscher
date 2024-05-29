import express from 'express'

import { UserController } from '../controllers/userController.js'
import { validateRefreshTokenInCookieSession } from '../middlewares/doJwtAuth.js'
import { doJwtAuth } from '../middlewares/doJwtAuth.js'

export const userRouter = express
  .Router()
  .post('/login', UserController.loginUserCtrl)
  .post('/register', UserController.registerUserCtrl)
  .post(
    '/refresh-token',
    validateRefreshTokenInCookieSession,
    UserController.refreshAccessTokenCtrl,
  )
  .get('/dashboard/:userId', doJwtAuth, UserController.getDashboardCtrl)
  .patch('/follow/:userId', doJwtAuth, UserController.patchFollowUserCtrl)
  .patch(
    '/unfollow/:userId',
    doJwtAuth,
    UserController.patchUnfollowUserCtrl,
  )
  .post('/verify-email', doJwtAuth, UserController.verifyUserEmailCtrl)
  .get('/send-email/:userId', doJwtAuth, UserController.sendEmailCtrl)
  .delete('/:userId', doJwtAuth, UserController.deleteUserCtrl)
  .get('/', doJwtAuth, UserController.getAllUsersCtrl)
  .get('/:userId', doJwtAuth, UserController.getOneUserCtrl)
  .post('/logout', doJwtAuth, UserController.logoutUserCtrl)
