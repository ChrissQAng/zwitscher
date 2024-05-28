import { TweetService } from "../services/index.js";

async function getFeedTweetsCtrl(req, res) {
  try {
    const result = await TweetService.getFeedTweets(req.authenticatedUserId);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not get dashboard" });
  }
}
async function getTrendingTweetsCtrl(req, res) {
  try {
    const result = await TweetService.getTrendingTweets();
    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not get dashboard" });
  }
}
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
    const tweetInfo = {
      text: req.body.text,
      userId: req.authenticatedUserId,
    };
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
    const userIdLogin = req.authenticatedUserId;
    const deletedTweet = await TweetService.deleteTweet(tweetId, userIdLogin);
    res.json(deletedTweet);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not delete tweet" });
  }
}
async function getOneTweetCtrl(req, res) {
  try {
    const tweetId = req.params.tweetId;
    const getedTweet = await TweetService.getOneTweet(tweetId);
    res.json(getedTweet);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not delete tweet" });
  }
}

export const TweetController = {
  postTweetCtrl,
  deleteTweetCtrl,
  getAllTweetsCtrl,
  getOneTweetCtrl,
  getFeedTweetsCtrl,
  getTrendingTweetsCtrl,
};
