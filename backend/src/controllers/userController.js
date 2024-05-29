import { UserService } from '../services/index.js'

async function registerUserCtrl(req, res) {
  try {
    const userInfo = req.body
    const result = await UserService.registerUser(userInfo)
    res.json({ result })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ err, message: err.message || 'Could not register user' })
  }
}

async function loginUserCtrl(req, res) {
  try {
    const userInfo = {
      email: req.body.email,
      password: req.body.password,
    }
    const result = await UserService.loginUser(userInfo)

    const refreshToken = result.tokens.refreshToken
    if (refreshToken) {
      req.session.refreshToken = refreshToken
    }
    // refresh token in http only cookie session speichern
    res.json({ result })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ err, message: err.message || 'Could not login' })
  }
}
async function refreshAccessTokenCtrl(req, res) {
  try {
    const result = await UserService.refreshAccessToken(
      req.authenticatedUserId,
    )
    setTimeout(() => {
      res.json({ result })
    }, 700)
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ err, message: err.message || 'Could not refresh AT' })
  }
}
async function verifyUserEmailCtrl(req, res) {
  try {
    const verifyEmailInfo = {
      userId: req.body.userId,
      sixDigitCode: req.body.sixDigitCode,
    }
    const result = await UserService.verifyUserEmail(verifyEmailInfo)
    res.json({ result })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ err, message: err.message || 'Could not verify email' })
  }
}
async function sendEmailCtrl(req, res) {
  try {
    const userId = req.params.userId
    const result = await UserService.sendVerificationEmail(userId)
    res.json({ result })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ err, message: err.message || 'Could not send email' })
  }
}
async function deleteUserCtrl(req, res) {
  try {
    const userId = req.params.userId
    const result = await UserService.deleteUser(userId)
    res.json({ result })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ err, message: err.message || 'Could not delete user' })
  }
}
async function getOneUserCtrl(req, res) {
  try {
    const userId = req.params.userId
    const authenticatedUserId = req.authenticatedUserId
    const result = await UserService.getOneUser(
      userId,
      authenticatedUserId,
    )

    res.json({ result })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ err, message: err.message || 'Could not find user' })
  }
}
async function getDashboardCtrl(req, res) {
  try {
    const userId = req.params.userId
    const result = await UserService.getDashboard(userId)

    res.json({ result })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ err, message: err.message || 'Could not get dashboard' })
  }
}
async function patchFollowUserCtrl(req, res) {
  try {
    const userId = req.authenticatedUserId
    const followedId = req.params.userId
    const result = await UserService.followUser(userId, followedId)

    res.json({ result })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ err, message: err.message || 'Could not follow' })
  }
}
async function patchUnfollowUserCtrl(req, res) {
  try {
    const userId = req.authenticatedUserId
    const followedId = req.params.userId
    const result = await UserService.unfollowUser(userId, followedId)

    res.json({ result })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ err, message: err.message || 'Could not post followment' })
  }
}
async function getAllUsersCtrl(req, res) {
  try {
    const result = await UserService.getAllUsers()

    res.json({ result })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ err, message: err.message || 'Could not find all users' })
  }
}

async function logoutUserCtrl(req, res) {
  req.session.refreshToken = null // refresh token löschen
  res.status(200).json({ result: { message: 'you are now logged out' } })
}

export const UserController = {
  deleteUserCtrl,
  getAllUsersCtrl,
  getDashboardCtrl,
  getOneUserCtrl,
  loginUserCtrl,
  logoutUserCtrl,
  refreshAccessTokenCtrl,
  registerUserCtrl,
  sendEmailCtrl,
  verifyUserEmailCtrl,
  patchFollowUserCtrl,
  patchUnfollowUserCtrl,
}
