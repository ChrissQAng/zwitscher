import { TweetService } from "../services/index.js";

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
    console.log(tweetId);
    const deletedTweet = await TweetService.deleteTweet(tweetId);
    res.json(deletedTweet);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not delete tweet" });
  }
}

export const TweetController = {
  postTweetCtrl,
  deleteTweetCtrl
};
