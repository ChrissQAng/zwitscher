import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import Navbar from "../components/Navbar";
import TweetBox from "../components/TweetBox";
import { useParams } from "react-router-dom";

import WriteTweet from "../components/WriteTweet";
import {
  TokenContext,
  UserContext,
  RefreshContext,
} from "../../context/Context";

const Feed = () => {
  const [tweetsFeed, setTweetsFeed] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [post, setPost] = useState("followed");
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const { refresh, setRefresh } = useContext(RefreshContext);

  const showDeleteButton = false;

  useEffect(() => {
    async function fetchTweetsFeed() {
      try {
        const res = await fetch(`${backendUrl}/api/v1/tweets/feed`, {
          headers: { authorization: `Bearer ${token}` },
          method: "GET",
        });

        const data = await res.json();

        if (!data) {
          setErrorMessage(data.message || "Could not load tweets");
          return;
        }

        setTweetsFeed(data.result.tweets); // Ensure tweets is an array
        setErrorMessage(""); // Reset error message
      } catch (error) {
        setErrorMessage("An error occurred while fetching tweets.");
      }
    }
    fetchTweetsFeed();
  }, [token, refresh]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className=" flex flex-col">
        <h2 className="text-left ml-6 mt-2 text-lg text-slate-600">
          Write Tweet
        </h2>
        <WriteTweet />
        <h2 className="text-left ml-6 mt-2 text-lg text-slate-600">Feed</h2>
        <div className="mt-4 mb-8">
          {tweetsFeed.map((tweet) => (
            <TweetBox
              key={tweet._id}
              tweet={tweet}
              showDeleteButton={showDeleteButton}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
