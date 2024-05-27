import { Link, useNavigate } from 'react-router-dom'
import { backendUrl } from '../api/api'
import Logo from './Logo'
import { useState } from 'react'
import { useEffect } from 'react'

const Navbar = ({ id }) => {
  const [url, setUrl] = useState('dashboard')
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
    if (currUrl.includes('tweets')) {
      setUrl('tweets')
    } else if (currUrl.includes('dashboard')) {
      setUrl('dashboard')
    }
  }, [])

  return (
    <nav className="flex items-center justify-around pt-3 bg-slate-200 text-slate-600">
      <div className="">
        <Logo />
      </div>
      <div className="flex gap-3">
        <Link
          className={
            url === 'tweets' ? ' underline underline-offset-4 ' : ''
          }
          to={`/tweets/${id}`}>
          Tweets
        </Link>
        <Link
          className={
            url === 'dashboard' ? ' underline underline-offset-4 ' : ''
          }
          to={`/dashboard/${id}`}>
          Dashboard
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
