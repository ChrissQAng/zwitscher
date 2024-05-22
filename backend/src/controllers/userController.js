import { UserService } from "../services/index.js";

async function registerUserCtrl(req, res) {
  try {
    const userInfo = req.body;
    const result = await UserService.registerUser(userInfo);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not register user" });
  }
}

async function loginUserCtrl(req, res) {
  try {
    const userInfo = {
      email: req.body.email,
      password: req.body.password,
    };
    const result = await UserService.loginUser(userInfo);
    // console.log("-------", result);
    const refreshToken = result.tokens.refreshToken;
    if (refreshToken) {
      req.session.refreshToken = refreshToken;
    }
    // refresh token in http only cookie session speichern
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message || "Could not login" });
  }
}
async function refreshAccessTokenCtrl(req, res) {
  try {
    const result = await UserService.refreshAccessToken(
      req.authenticatedUserId
    );
    setTimeout(() => {
      res.json({ result });
    }, 700);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not refresh AT" });
  }
}
async function verifyUserEmailCtrl(req, res) {
  try {
    const verifyEmailInfo = {
      userId: req.body.userId,
      sixDigitCode: req.body.sixDigitCode,
    };
    const result = await UserService.verifyUserEmail(verifyEmailInfo);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not verify email" });
  }
}
async function sendEmailCtrl(req, res) {
  try {
    const userId = req.params.userId;
    const result = await UserService.sendVerificationEmail(userId);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not send email" });
  }
}

export const UserController = {
  registerUserCtrl,
  loginUserCtrl,
  refreshAccessTokenCtrl,
  verifyUserEmailCtrl,
  sendEmailCtrl,
};
