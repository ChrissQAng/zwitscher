import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/Context'
import { Link } from 'react-router-dom'

const TweetBox = ({ tweet }) => {
  const [pageUrl, setPageUrl] = useState('profile')
  const [showComments, setShowComments] = useState(false)

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
        <p
          onClick={() => setShowComments(!showComments)}
          className="text-slate-600 text-xs mt-2 hover:text-slate-900 cursor-pointer ">
          {tweet.comments.length} Comments
        </p>
        {showComments ?
          <div className=" overflow-hidden">
            <div className=" animate-slideIn border p-2 my-2 rounded-lg border-slate-400">
              {tweet.comments.map(comment => (
                <div
                  key={comment._id}
                  className=" mx-4 pb-2 border-b border-slate-400">
                  <div className=" flex justify-between items-center">
                    <Link to={`/userprofile/${comment.userId._id}`}>
                      <p className="text-slate-600 font-bold text-xs mt-2 hover:text-slate-900 cursor-pointer">
                        {comment.userId.firstName}{' '}
                        {comment.userId.lastName}
                      </p>
                    </Link>
                    <p className="text-slate-600 text-xs">
                      {convertDate(comment.createdAt)}
                    </p>
                  </div>
                  <p className=" text-slate-600 text-sm mt-2 ">
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        : ''}
      </div>
    </div>
  )
}

export default TweetBox
