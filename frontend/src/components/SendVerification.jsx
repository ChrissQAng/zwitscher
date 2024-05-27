import { useContext, useState } from 'react'
import { backendUrl } from '../api/api'
import { useNavigate } from 'react-router-dom'
import { TokenContext, UserContext } from '../../context/Context'

const SendVerification = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { token } = useContext(TokenContext)
  const { user } = useContext(UserContext)

  const navigate = useNavigate()
  const sendEmail = async e => {
    e.preventDefault()

    const res = await fetch(
      `${backendUrl}/api/v1/users/send-email/${user._id}`,
      {
        headers: { authorization: `Bearer ${token}` },
        method: 'GET',
      },
    )

    const data = await res.json()

    if (!data.result)
      return setErrorMessage(
        data.message || 'Failed to send email, please try again',
      )
    navigate(`/verify-email/${user._id}`)
  }
  console.log(user.isEmailVerified)
  return (
    <>
      {user.user.isEmailVerified === false ?
        <div className=" bg-slate-600 mx-6 mt-8 p-4 rounded-lg flex gap-2 items-center justify-center">
          <p className=" text-red-200">Please verify your account!</p>
          <p className=" text-red-200">{errorMessage}</p>
          <button
            onClick={sendEmail}
            className=" bg-red-200 text-slate-600 border-slate-200 border px-3 py-1 rounded-lg duration-300 hover:scale-105 hover:bg-slate-200 hover:text-slate-600">
            Verify Email
          </button>
        </div>
      : ''}
    </>
  )
}

export default SendVerification
