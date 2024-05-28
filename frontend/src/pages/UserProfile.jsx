import { useContext, useEffect, useState } from "react";
import { TokenContext, UserContext } from "../../context/Context";
import { useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import Navbar from "../components/Navbar";
import TweetBox from "../components/TweetBox";

const UserProfile = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [userTweet, setUserTweet] = useState([]);
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    async function getUserInfos() {
      try {
        const res = await fetch(`${backendUrl}/api/v1/users/${userId}`, {
          headers: { authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        console.log(data);
        if (!data.result) {
          setErrorMessage(data.message || "Could not load trending tweets");
          return;
        }

        setUser(data.result.user);
        setUserTweet(data.result.tweets);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("An error occurred while fetching trending tweets");
      }
    }
    getUserInfos();
  }, []);

  return (
    <div className="min-h-screen text-slate-600">
      <Navbar />
      <div className=" flex flex-col gap-2">
        <h1>{`${user?.firstName} ${user?.lastName}`}</h1>
        <h2 className="text-left ml-6 text-lg">Stats</h2>
        <h2 className="text-left ml-6 text-lg">Post</h2>
        {userTweet?.map((user, index) => (
          <TweetBox key={index} tweet={user} />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
