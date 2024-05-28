import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const TweetBoxProfile = ({ tweet, user }) => {
  const [pageUrl, setPageUrl] = useState('profile')

  const convertDate = timestamp => {
    const date = new Date(timestamp)
    const finalDate =
      date.getDate() +
      ' ' +
      date.toLocaleString('default', { month: 'long' }) +
      ' ' +
      date.getFullYear() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes()
    return finalDate
  }

  console.log(tweet)

  return (
    <div className=" mx-6 my-2 p-2 border-t border-slate-300">
      <div className="flex items-center justify-between mb-2">
        <Link to={`/userprofile/${user.user._id}`}></Link>
        <p className="text-slate-600 text-xs">
          {convertDate(tweet.createdAt)}
        </p>
      </div>
      <p className="bg-slate-300 text-slate-600 p-2 rounded-lg text-sm font-thin">
        {tweet.text}
      </p>
      <p>{tweet.comments.length} Comments</p>
    </div>
  )
}

export default TweetBoxProfile
