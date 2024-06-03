import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/Context";
import { Link } from "react-router-dom";
import CommentIcon from "./CommentIcon";
import ArrowUpIcon from "./ArrowUpIcon";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const TweetBox = ({ tweet }) => {
  const [pageUrl, setPageUrl] = useState("profile");
  const [showComments, setShowComments] = useState(false);

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

  return (
    <div className=" mx-6 p-2 border-t border-slate-300">
      <div className="flex items-center justify-between mb-2">
        <Link
          to={
            user.user._id === tweet.userId._id
              ? `/my-profile`
              : `/userprofile/${tweet.userId._id}`
          }
        >
          <p className="text-slate-600 text-xs hover:text-slate-900 font-bold">
            {tweet.userId.firstName} {tweet.userId.lastName}
          </p>
        </Link>
        <p className="text-slate-600 text-xs">{convertDate(tweet.createdAt)}</p>
      </div>
      <p className="bg-slate-300 text-slate-600 p-2 rounded-lg text-sm font-thin">
        {tweet.text}
      </p>
      <div>
        <div className="flex items-center">
          <div
            onClick={() =>
              tweet.comments.length === 0 ? "" : setShowComments(!showComments)
            }
            className={
              tweet.comments.length === 0
                ? "flex items-center mt-1 gap-2 pb-1 px-1 "
                : "flex items-center mt-1 gap-2 pb-1 px-1 cursor-pointer border hover:border-slate-400 rounded-lg"
            }
          >
            <p className="text-slate-600 text-xs mt-2  ">
              {tweet.comments.length}
            </p>
            <div className=" mt-1">
              <CommentIcon />
            </div>
          </div>
          <LikeButton tweetId={tweet._id} isLikedByUser={tweet.isLikedByUser} />
          <div className="">
            <DeleteButton tweetId={tweet._id} />
          </div>
        </div>
        {showComments ? (
          <div className="overflow-hidden">
            <div className="animate-slideIn border p-2 mb-2 mt-1 rounded-lg border-slate-400">
              {tweet.comments.map((comment) => (
                <div
                  key={comment._id}
                  className=" mx-4 pb-2 border-b border-slate-400"
                >
                  <div className=" flex justify-between items-center">
                    <Link to={`/userprofile/${comment.userId._id}`}>
                      <p className="text-slate-600 font-bold text-xs mt-2 hover:text-slate-900 cursor-pointer">
                        {comment.userId.firstName} {comment.userId.lastName}
                      </p>
                    </Link>
                    <p className="text-slate-600 text-xs">
                      {convertDate(comment.createdAt)}
                    </p>
                  </div>
                  <p className=" text-slate-600 text-sm mt-2 ">
                    {comment.text}
                  </p>
                  <LikeButton
                    commentId={comment._id}
                    tweetId={tweet._id}
                    isLikedByUser={comment.isLikedByUser}
                  />
                </div>
              ))}
              <div
                onClick={() => setShowComments(!showComments)}
                className="flex items-center justify-center w-full mx-auto pt-2 cursor-pointer"
              >
                <div className=" animate-bounce">
                  <ArrowUpIcon />
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TweetBox;
