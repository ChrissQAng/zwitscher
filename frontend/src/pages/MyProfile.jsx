import Navbar from '../components/Navbar'
import SendVerification from '../components/SendVerification'
import { useContext, useEffect, useState } from 'react'
import { backendUrl } from '../api/api'
import TweetBox from '../components/TweetBox'
import WriteTweet from '../components/WriteTweet'
import {
  RefreshContext,
  TokenContext,
  UserContext,
} from '../../context/Context'

const MyProfile = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const { refresh, setRefresh } = useContext(RefreshContext)

  const { user } = useContext(UserContext)
  const { token } = useContext(TokenContext)

  console.log(user)

  return (
    <div className="min-h-screen text-slate-600">
      <Navbar />
      {user.user.isEmailVerified ? '' : <SendVerification token={token} />}
      <div className=" flex flex-col gap-2">
        <h2 className="text-left ml-6 mt-4 text-lg">Write Post</h2>
        <WriteTweet token={token} />
        <h2 className="text-left ml-6 text-lg">Stats</h2>
        <h2 className="text-left ml-6 text-lg">Post</h2>
        {user.tweets.tweets?.map((user, index) => (
          <TweetBox key={index} tweet={user} />
        ))}
      </div>
    </div>
  )
}

export default MyProfile
