import { useNavigate, Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { backendUrl } from '../api/api'
import Logo from '../components/Logo'
import { TokenContext, UserContext } from '../../context/Context'

const HomeLogin = () => {
  const [password, setPassword] = useState('hallo123')
  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('boaventura@outlook.de')

  const { user, setUser } = useContext(UserContext)
  const { setToken } = useContext(TokenContext)

  const navigate = useNavigate()

  const loginUser = async e => {
    e.preventDefault()

    const res = await fetch(`${backendUrl}/api/v1/users/login`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })

    const data = await res.json()

    if (!data.result)
      return setErrorMessage(data.message || 'Failed verify email')

    setUser({ user: data.result.user, tweets: data.result.tweets })
    setToken(data.result.tokens.accessToken)
    navigate('/my-profile')
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center gap-7 text-slate-600 relative">
        <div className=" fixed top-4">
          <Logo />
        </div>
        <p className="  text-2xl">Welcome to Zwitscher</p>
        <p className="  text-lg">Login</p>
        <form className="flex flex-col items-center gap-7">
          <p className=" text-center">{errorMessage}</p>
          <div>
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
            onClick={loginUser}>
            Login
          </button>
        </form>

        <p className=" text-center">
          Don't have an account yet?{' '}
          <Link
            className=" underline underline-offset-8 text-purple-600 hover:text-slate-600 duration-300"
            to="/register">
            Create Account
          </Link>
        </p>
      </div>
    </>
  )
}

export default HomeLogin
