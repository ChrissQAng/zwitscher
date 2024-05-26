const TweetBox = ({ tweet }) => {
  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    const finalDate =
      date.getDate() +
      ' ' +
      date.toLocaleString('default', { month: 'long' }) +
      ' ' +
      date.getFullYear();
    return finalDate;
  };
  return (
    <div>
      <div>
        <p>
          {tweet.userId.firstName} {tweet.userId.lastName}
        </p>
        <p>{convertDate(tweet.createdAt)}</p>
      </div>
      <p>{tweet.text}</p>
    </div>
  );
};

export default TweetBox;
