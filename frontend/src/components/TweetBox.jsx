import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/Context'
import { Link } from 'react-router-dom'

const TweetBox = ({ tweet }) => {
  const [pageUrl, setPageUrl] = useState('profile')

  const { user } = useContext(UserContext)

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

  return (
    <div className=" mx-6 p-2 border-t border-slate-300">
      <div className="flex items-center justify-between mb-2">
        <Link to={`/userprofile/${tweet.userId._id}`}>
          <p className="text-slate-600 text-xs hover:text-slate-900 font-bold">
            {tweet.userId.firstName} {tweet.userId.lastName}
          </p>
        </Link>
        <p className="text-slate-600 text-xs">
          {convertDate(tweet.createdAt)}
        </p>
      </div>
      <p className="bg-slate-300 text-slate-600 p-2 rounded-lg text-sm font-thin">
        {tweet.text}
      </p>
      <div>
        <p className="text-slate-600 text-xs mt-2 hover:text-slate-900">
          {tweet.comments.length} Comments
        </p>
      </div>
    </div>
  )
}

export default TweetBox
