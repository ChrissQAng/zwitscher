import { useEffect, useState } from 'react'
import { backendUrl } from '../api/api'
import Navbar from '../components/Navbar'
import TweetBox from '../components/TweetBox'
import { useParams } from 'react-router-dom'
import WriteTweet from '../components/WriteTweet'

const Tweets = ({ token }) => {
  const [tweets, setTweets] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const { _id } = useParams()

  useEffect(() => {
    async function fetchTweets() {
      try {
        const res = await fetch(`${backendUrl}/api/v1/tweets`, {
          headers: { authorization: `Bearer ${token}` },
          method: 'GET',
        })

        const data = await res.json()

        if (!data) {
          setErrorMessage(data.message || 'Could not load tweets')
          return
        }

        setTweets(data) // Ensure tweets is an array
        setErrorMessage('') // Reset error message
      } catch (error) {
        setErrorMessage('An error occurred while fetching tweets.')
      }
    }

    fetchTweets()
  }, [token])
  console.log(tweets)
  return (
    <div className="min-h-screen">
      <Navbar id={_id} />
      {/* <h2 className="text-left ml-8 mt-8 text-lg">Write Tweet</h2>
      <WriteTweet token={token} id={_id} /> */}
      {tweets.result?.map((tweet, index) => (
        <TweetBox key={index} tweet={tweet} />
      ))}
    </div>
  )
}

export default Tweets
