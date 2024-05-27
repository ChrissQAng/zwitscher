import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { backendUrl } from '../api/api'
import Logo from '../components/Logo'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const { setUser } = useContext(UserContext)
  const { setToken } = useContext(TokenContext)

  const navigate = useNavigate()

  const registerUser = async e => {
    e.preventDefault()

    const res = await fetch(`${backendUrl}/api/v1/users/register`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
    })

    const data = await res.json()

    console.log('----', data)

    if (!data.result)
      return setErrorMessage(
        data.message || 'Failed to register, please try again',
      )

    navigate(`/my-profile`)

    setToken(data.result.tokens.accessToken)
    setUser(data.result.user)
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-7 text-slate-600 relative">
      <div className=" fixed top-4">
        <Logo />
      </div>
      <p className="  text-2xl">Welcome to Zwitscher</p>
      <p className="  text-lg">Create an Account</p>
      <form className="flex flex-col items-center gap-7">
        <p className=" text-center">{errorMessage}</p>
        <div>
          <div>
            <input
              className=" w-72 mb-5 bg-slate-600 text-slate-200 px-4 py-2 rounded-lg"
              id="firstname"
              type="text"
              placeholder="Fristname"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              className=" w-72 mb-5 bg-slate-600 text-slate-200 px-4 py-2 rounded-lg"
              id="lastname"
              type="text"
              placeholder="Lastname"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              className=" w-72 mb-5 bg-slate-600 text-slate-200 px-4 py-2 rounded-lg"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className=" w-72 mb-5 bg-slate-600 text-slate-200 px-4 py-2 rounded-lg"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className=" border-slate-600 border px-4 py-2 rounded-lg duration-300 hover:scale-105 hover:bg-slate-600 hover:text-slate-200"
          onClick={registerUser}>
          Continue
        </button>
      </form>
      <p className=" text-center">
        Already have an account?{' '}
        <Link
          className=" underline underline-offset-8 text-purple-600 hover:text-slate-600 duration-300"
          to="/">
          Login
        </Link>
      </p>
    </div>
  )
}

export default Register
