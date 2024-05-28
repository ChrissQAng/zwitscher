import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { backendUrl } from "../api/api";
import { TokenContext, UserContext } from "../../context/Context";
import TweetBox from "../components/TweetBox";

const Discover = () => {
  const [trendingFeedData, setTrendingFeedData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useContext(TokenContext);

  useEffect(() => {
    async function getTrendingTweets() {
      try {
        const res = await fetch(`${backendUrl}/api/v1/tweets/trending`, {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!data) {
          setErrorMessage(data.message || "Could not load trending tweets");
          return;
        }

        setTrendingFeedData(data.result);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("An error occurred while fetching trending tweets");
      }
    }
    getTrendingTweets();
  }, []);
  return (
    <div className=" min-h-screen">
      <Navbar />
      <article className="mt-4 mb-8">
        {trendingFeedData.map((tweet) => (
          <TweetBox key={tweet._id} tweet={tweet} />
        ))}
      </article>
    </div>
  );
};

export default Discover;
