import { useContext, useEffect, useState } from 'react'
import { TokenContext, UserContext } from '../../context/Context'
import { useParams } from 'react-router-dom'
import { backendUrl } from '../api/api'
import Navbar from '../components/Navbar'
import TweetBox from '../components/TweetBox'

const UserProfile = () => {
  const { user: loggedInUser } = useContext(UserContext)
  const { token } = useContext(TokenContext)
  const [errorMessage, setErrorMessage] = useState('')
  const [userTweet, setUserTweet] = useState([])
  const [user, setUser] = useState({})
  const [stats, setStats] = useState({})
  const [isFollowedByLoggedInUser, setIsFollowedByLoggedInUser] =
    useState()
  const { userId } = useParams()

  console.log(userId)

  useEffect(() => {
    async function getUserInfos() {
      try {
        const res = await fetch(`${backendUrl}/api/v1/users/${userId}`, {
          headers: { authorization: `Bearer ${token}` },
        })

        const data = await res.json()
        if (!data.result) {
          setErrorMessage(data.message || 'Could not load trending tweets')
          return
        }

        setUser(data.result.user)
        setUserTweet(data.result.tweets)
        setStats(data.result.stats)
        setIsFollowedByLoggedInUser(data.result.isFollowedByLoggedInUser)
        setErrorMessage('')
      } catch (error) {
        setErrorMessage('An error occurred while fetching trending tweets')
      }
    }
    getUserInfos()
  }, [isFollowedByLoggedInUser])

  const followUser = async () => {
    try {
      const res = await fetch(
        `${backendUrl}/api/v1/users/follow/${userId}`,
        {
          headers: { authorization: `Bearer ${token}` },
          method: 'PATCH',
        },
      )
      const data = await res.json()
      if (!data.result) {
        setErrorMessage(data.message || 'Could not follow user')
        return
      }
      setIsFollowedByLoggedInUser(true)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage('An error occurred while fetching following user')
    }
  }
  const unfollowUser = async () => {
    try {
      const res = await fetch(
        `${backendUrl}/api/v1/users/unfollow/${userId}`,
        {
          headers: { authorization: `Bearer ${token}` },
          method: 'PATCH',
        },
      )
      const data = await res.json()
      if (!data.result) {
        setErrorMessage(data.message || 'Could not unfollow user')
        return
      }
      setIsFollowedByLoggedInUser(false)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage('An error occurred while fetching unfollowing user')
    }
  }

  return (
    <div className="min-h-screen text-slate-600">
      <Navbar />
      <div className=" flex flex-col gap-2">
        <h1 className="text-left ml-6 mt-6 text-lg font-bold">{`${user?.firstName} ${user?.lastName}`}</h1>
        {isFollowedByLoggedInUser ?
          <button
            onClick={unfollowUser}
            className="ml-6  self-start text-slate-600 border-slate-600 bg-slate-200 border px-3 py-1 rounded-lg duration-300 hover:scale-105 hover:bg-slate-600 hover:text-slate-200">
            Unfollow
          </button>
        : <button
            onClick={followUser}
            className="ml-6  self-start text-slate-300 border-slate-600 bg-slate-600 border px-3 py-1 rounded-lg duration-300 hover:scale-105 hover:bg-slate-300 hover:text-slate-600">
            Follow
          </button>
        }
        <h2 className="text-left ml-6 text-lg">Stats</h2>
        <div className="ml-6">
          <p>Followers: {stats.followedBy}</p>
          <p>Following: {stats.following}</p>
        </div>
        <h2 className="text-left ml-6 text-lg">Post</h2>
        {userTweet?.map((user, index) => (
          <TweetBox key={index} tweet={user} />
        ))}
      </div>
    </div>
  )
}

export default UserProfile
