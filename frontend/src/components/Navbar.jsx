import { Link, useNavigate } from 'react-router-dom'
import { backendUrl } from '../api/api'
import Logo from './Logo'
import { useState } from 'react'
import { useEffect } from 'react'

const Navbar = () => {
  const [pageUrl, setPageUrl] = useState('profile')
  const navigate = useNavigate()
  const logoutUser = async e => {
    e.preventDefault()

    const res = await fetch(`${backendUrl}/api/v1/users/logout`, {
      method: 'POST',
      credentials: 'include',
      // !!! nötig damit das Setzen des Refresh-Tokens auf null (im backend) übernommen wird
    })

    const data = await res.json()
    if (!data.result) return alert('Could not log out')
    navigate('/')
  }

  useEffect(() => {
    let currUrl = window.location.href
    if (currUrl.includes('feed')) {
      setPageUrl('feed')
    } else if (currUrl.includes('my-profile')) {
      setPageUrl('profile')
    } else if (currUrl.includes('discover')) {
      setPageUrl('discover')
    }
  }, [pageUrl])

  return (
    <nav className="flex items-center justify-around pt-3 bg-slate-200 text-slate-600">
      <div className="">
        <Logo />
      </div>
      <div className="flex gap-3">
        <Link
          className={
            pageUrl === 'discover' ? ' underline underline-offset-4 ' : ''
          }
          to={`/discover`}>
          Discover
        </Link>
        <Link
          className={
            pageUrl === 'feed' ? ' underline underline-offset-4 ' : ''
          }
          to={`/feed`}>
          Feed
        </Link>
        <Link
          className={
            pageUrl === 'profile' ? ' underline underline-offset-4 ' : ''
          }
          to={`/my-profile`}>
          My Profile
        </Link>
      </div>
      <div className="">
        <button
          className=" border-slate-600 border px-3 py-1 rounded-lg duration-300 hover:scale-105 hover:bg-slate-600 hover:text-slate-200"
          onClick={logoutUser}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
