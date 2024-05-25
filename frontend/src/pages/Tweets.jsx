import { useEffect, useState } from 'react';
import { backendUrl } from '../api/api';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

const Tweets = ({ token }) => {
  const [tweets, setTweets] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { _id } = useParams();

  useEffect(() => {
    async function fetchTweets() {
      try {
        const res = await fetch(`${backendUrl}/api/v1/tweets`, {
          headers: { authorization: `Bearer ${token}` },
          method: 'GET',
        });

        const data = await res.json();

        if (!data) {
          setErrorMessage(data.message || 'Could not load tweets');
          return;
        }

        setTweets(data); // Ensure tweets is an array
        setErrorMessage(''); // Reset error message
      } catch (error) {
        setErrorMessage('An error occurred while fetching tweets.');
      }
    }

    fetchTweets();
  }, [token]);

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
    <>
      <Navbar userId={_id} />
      <h1>Tweets</h1>
      {tweets.result?.map((tweet) => (
        <div key={tweet._id}>
          <div>
            <p>
              {tweet.userId.firstName} {tweet.userId.lastName}
            </p>
            <p>{convertDate(tweet.createdAt)}</p>
          </div>
          <p>{tweet.text}</p>
        </div>
      ))}
    </>
  );
};

export default Tweets;
