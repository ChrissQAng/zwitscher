import { useContext, useState } from "react";
import { TokenContext } from "../../context/Context";
import { backendUrl } from "../api/api";

const LikeButton = ({ tweetId, commentId, isLikedByUser }) => {
    const { token } = useContext(TokenContext);
    const [isLiked, setIsLiked] = useState(isLikedByUser);

    const addLike = async (e) => {
        e.preventDefault();

        const res = commentId ? await fetch(`${backendUrl}/api/v1/comments/${commentId}/like`, {
            method: "POST",
            headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ tweetId })
        }) : await fetch(`${backendUrl}/api/v1/tweets/${tweetId}/like`, {
            method: "POST",
            headers: { authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        console.log(data);
        if (!data.result) return;

        setIsLiked(true);
    };

    const deleteLike = async (e) => {
        e.preventDefault();

        const res = commentId ? await fetch(`${backendUrl}/api/v1/comments/${commentId}/like`, {
            method: "DELETE",
            headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ tweetId })
        }) : await fetch(`${backendUrl}/api/v1/tweets/${tweetId}/like`, {
            method: "DELETE",
            headers: { authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (!data.result) return;

        setIsLiked(false);
    };




    return <>
        {isLiked ?
            <button onClick={deleteLike}> <Heart fill={"#475569"} />
            </button >
            : <button onClick={addLike}>
                <Heart fill={"none"} /></button>
        }



    </>;
};


const Heart = ({ fill }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#475569" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>;
};

export default LikeButton;