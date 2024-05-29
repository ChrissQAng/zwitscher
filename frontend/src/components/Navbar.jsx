import { Link, NavLink, useNavigate } from 'react-router-dom'
import { backendUrl } from '../api/api'
import Logo from './Logo'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { TokenContext } from '../../context/Context'

const Navbar = () => {
  const navigate = useNavigate()
  const { token } = useContext(TokenContext)
  const logoutUser = async e => {
    e.preventDefault()

    const res = await fetch(`${backendUrl}/api/v1/users/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { authorization: `Bearer ${token}` },
    })

    const data = await res.json()
    if (!data.result) return alert('Could not log out')
    navigate('/')
  }

  return (
    <nav className="flex items-center justify-around pt-3 bg-slate-200 text-slate-600">
      <div className=" hover:animate-spin">
        <Logo />
      </div>
      <div className="flex gap-5">
        <NavLink
          className="hover:scale-105  aria-[current=page]:font-bold"
          to={`/discover`}>
          Discover
        </NavLink>
        <NavLink
          className=" hover:scale-105 aria-[current=page]:font-bold"
          to={`/feed`}>
          Feed
        </NavLink>
        <NavLink
          className="hover:scale-105 aria-[current=page]:font-bold"
          to={`/my-profile`}>
          My Profile
        </NavLink>
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
