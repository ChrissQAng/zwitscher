import Navbar from "../components/Navbar";
import SendVerification from "../components/SendVerification";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import WriteTweet from "../components/WriteTweet";
import {
  RefreshContext,
  TokenContext,
  UserContext,
} from "../../context/Context";
import TweetBox from "../components/TweetBox";

const MyProfile = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [userFetch, setUserFetch] = useState("");
  const [userTweet, setUserTweet] = useState([]);
  const [stats, setStats] = useState({});
  const { refresh, setRefresh } = useContext(RefreshContext);
  const { user } = useContext(UserContext);
  const { token } = useContext(TokenContext);

  const showDeleteButton = true;

  useEffect(() => {
    async function getMyProfileInfos() {
      try {
        const res = await fetch(`${backendUrl}/api/v1/users/${user.user._id}`, {
          headers: { authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!data.result) {
          setErrorMessage(data.message || "Could not load trending tweets");
          return;
        }

        setUserFetch(data.result.user);
        setUserTweet(data.result.tweets);
        setStats(data.result.stats);

        setErrorMessage("");
      } catch (error) {
        setErrorMessage("An error occurred while fetching trending tweets");
      }
    }
    getMyProfileInfos();
  }, [refresh]);

  return (
    <div className="min-h-screen text-slate-600">
      <Navbar />
      {user.user.isEmailVerified ? "" : <SendVerification token={token} />}
      <div className=" flex flex-col">
        <h2 className="text-left ml-6 mt-2 text-lg">Write Post</h2>
        <WriteTweet token={token} />
        <h2 className="text-left ml-6 mt-2 text-lg text-slate-600">Stats</h2>
        <h2 className="text-left ml-6 mt-2 text-lg text-slate-600">Posts</h2>
        {userTweet?.map((tweet) => (
          <TweetBox
            key={tweet._id}
            tweet={tweet}
            showDeleteButton={showDeleteButton}
          />
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
