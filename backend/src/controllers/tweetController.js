import { TweetService } from "../services/index.js";
import { UserService } from "../services/index.js";

async function postTweetCtrl(req, res) {
  try {
    console.log("+++++++", req.authenticatedUserId);
    const tweetInfo = { text: req.body.text, userId: req.authenticatedUserId };
    console.log("-----", tweetInfo);
    const result = await TweetService.postTweet(tweetInfo);
    res.status(201).json({ result }); // 201 Status = "Created"
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not add tweet" });
  }
}

export const TweetController = {
  postTweetCtrl,
};
