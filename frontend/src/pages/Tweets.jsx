import { useEffect, useState } from "react";
import { backendUrl } from "../api/api";
import Navbar from "../components/Navbar";

const Tweets = ({token}) => {
    const [tweets, setTweets] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
  
    useEffect(() => {
      async function fetchTweets() {
        const res = await fetch(`${backendUrl}/api/v1/tweets`, {
          headers: { authorization: `Bearer ${token}` },
        });
  
        const data = await res.json();
  
        if (!data.result)
          return setErrorMessage(data.message || "Could not load user");
  
        setTweets(data.result);
        console.log(tweets);
        setErrorMessage(""); // reset error message (zur sicherheit)
      }
  
      fetchTweets();
    }, []);
    return ( <>
    <h1>Tweets</h1>
    {tweets?.map((tweet, index) => (
        <div key={index}>
            <h3>{`${tweet.userId.firstName} ${tweet.userId.lastName}`}</h3>
            <p>{`${tweet.text}`}</p>
        </div>
    ))}
    </> );
}
 
export default Tweets;