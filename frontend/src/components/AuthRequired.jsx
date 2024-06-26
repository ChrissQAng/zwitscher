import { useContext, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { backendUrl } from '../api/api'
import Logo from './Logo'
import { TokenContext, UserContext } from '../../context/Context'

const AuthRequired = ({ children }) => {
  // assume just re-loaded
  const timeoutRef = useRef(null) // aktuellen timeout für silent refresh
  const { token, setToken } = useContext(TokenContext)
  const { setUser } = useContext(UserContext)
  const [loading, setLoading] = useState(token ? false : true)
  const navigate = useNavigate()

  // try refreshing token --> get new access token
  // if succes --> show children
  // else --> navigate to login

  useEffect(() => {
    if (token) return doSilentRefresh(token) // logged in

    async function checkLoggedIn() {
      const response = await fetch(
        `${backendUrl}/api/v1/users/refresh-token`,
        {
          method: 'POST',
          credentials: 'include',
        },
      )

      const data = await response.json()
      if (data.result) {
        setToken(data.result.newAccessToken)
        setUser({ user: data.result.user, tweets: data.result.tweets })
        doSilentRefresh(data.result.newAccessToken)
      } else {
        navigate('/')
      }

      setLoading(false)
    }

    checkLoggedIn()

    function doSilentRefresh(currentAccessToken) {
      const tokenExpiration = calcTokenExpDuration(currentAccessToken) // per gegebenen token die expiration -10s berechnen

      timeoutRef.current = setTimeout(async () => {
        try {
          console.log('fetching backend for silent refresh')
          const response = await fetch(
            `${backendUrl}/api/v1/users/refresh-token`,
            {
              method: 'POST',
              credentials: 'include',
            },
          )

          if (!data.result) navigate('/login')

          const data = await response.json()
          setToken(data.result.newAccessToken)
          doSilentRefresh(data.result.newAccessToken) // rekursion (eine funktion sich selbst aufruft)
        } catch (err) {
          // error handling
          console.log(err)
          navigate('/login')
        }
      }, tokenExpiration)
    }

    function calcTokenExpDuration(accessToken) {
      const tokenPayloadBase64 = accessToken.split('.')[1]
      const tokenPayloadJson = atob(tokenPayloadBase64)
      const tokenPayload = JSON.parse(tokenPayloadJson)
      const duration = tokenPayload.exp - tokenPayload.iat
      const nextFetchAfter = duration - 30
      return nextFetchAfter * 1000
    }

    // clean up callback return
    return () => clearTimeout(timeoutRef.current)
  }, [])

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-200">
        <div className="animate-bounce">
          <Logo />
        </div>
      </div>
    )
  else return <>{children}</>
}

export default AuthRequired

/* <AuthRequired>
    // ... children
    // ... children
    // ... children
    </AuthRequired>; */
