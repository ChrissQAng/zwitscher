const TweetBox = ({ tweet }) => {
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
    <div className=" m-6 p-2 border rounded-lg border-slate-600">
      <div className="flex items-center justify-between mb-4">
        <p className="text-slate-600 text-xs">
          {tweet.userId.firstName} {tweet.userId.lastName}
        </p>
        <p className="text-slate-600 text-xs">
          {convertDate(tweet.createdAt)}
        </p>
      </div>
      <p className=" bg-slate-600 text-slate-200 p-2 rounded-lg text-sm font-thin">
        {tweet.text}
      </p>
    </div>
  )
}

export default TweetBox
