import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SendVerification from '../components/SendVerification'
import { useContext, useEffect, useState } from 'react'
import { backendUrl } from '../api/api'
import TweetBox from '../components/TweetBox'
import WriteTweet from '../components/WriteTweet'
import { RefreshContext } from '../../context/Context'

const Dashboard = ({ token }) => {
  const [user, setUser] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [verified, setVerified] = useState(false)
  const { refresh, setRefresh } = useContext(RefreshContext)

  const { _id } = useParams()

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`${backendUrl}/api/v1/users/${_id}`, {
        headers: { authorization: `Bearer ${token}` },
      })

      const data = await res.json()

      if (!data.result)
        return setErrorMessage(data.message || 'Could not load user')

      setUser(data.result)
      setVerified(data.result.user.isEmailVerified)
      setErrorMessage('')
    }

    fetchUser()
  }, [refresh])

  return (
    <div className="min-h-screen text-slate-600">
      <Navbar id={_id} />
      {verified ?
        ''
      : <SendVerification id={_id} token={token} verified={verified} />}
      <h2 className="text-left ml-8 mt-8 text-lg">Write Tweet</h2>
      <WriteTweet token={token} id={_id} verified={verified} />
      {/* <h2 className="text-left ml-8 text-lg">Stats</h2> */}
      <h2 className="text-left ml-8 text-lg">My Tweets</h2>
      {user.tweets?.map((user, index) => (
        <TweetBox key={index} tweet={user} />
      ))}
    </div>
  )
}

export default Dashboard
