import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/Context";
import { Link } from "react-router-dom";

const TweetBox = ({ tweet }) => {
  const [pageUrl, setPageUrl] = useState("profile");

  const { user } = useContext(UserContext);

  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    const finalDate =
      date.getDate() +
      " " +
      date.toLocaleString("default", { month: "long" }) +
      " " +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();
    return finalDate;
  };

  useEffect(() => {
    let currUrl = window.location.href;
    if (currUrl.includes("feed")) {
      setPageUrl("feed");
    } else if (currUrl.includes("my-profile")) {
      setPageUrl("profile");
    } else if (currUrl.includes("discover")) {
      setPageUrl("discover");
    }
  }, [pageUrl]);

  return (
    <div className=" mx-6 my-2 p-2 border rounded-lg border-slate-600">
      <div className="flex items-center justify-between mb-2">
        <Link to={`/userprofile/${tweet.userId._id}`}>
          <p className="text-slate-600 text-xs">
            {tweet.userId.firstName} {tweet.userId.lastName}
          </p>
        </Link>
        <p className="text-slate-600 text-xs">{convertDate(tweet.createdAt)}</p>
      </div>
      <p className="bg-slate-600 text-slate-200 p-2 rounded-lg text-sm font-thin">
        {tweet.text}
      </p>
    </div>
  );
};

export default TweetBox;
