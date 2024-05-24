import { TweetService } from "../services/index.js";

async function getAllTweetsCtrl(req, res) {
  try {
    const result = await TweetService.getAllTweets();
    res.status(201).json({ result }); // 201 Status = "Created"
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not get all tweets" });
  }
}
async function postTweetCtrl(req, res) {
  try {
    const tweetInfo = { text: req.body.text, userId: req.authenticatedUserId };
    const result = await TweetService.postTweet(tweetInfo);
    res.status(201).json({ result }); // 201 Status = "Created"
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not add tweet" });
  }
}

async function deleteTweetCtrl(req, res) {
  try {
    const tweetId = req.params.tweetId;
    const userIdLogin = req.authenticatedUserId 
    const deletedTweet = await TweetService.deleteTweet(tweetId, userIdLogin);
    res.json(deletedTweet);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not delete tweet" });
  }
}

export const TweetController = {
  postTweetCtrl,
  deleteTweetCtrl,
  getAllTweetsCtrl
};
