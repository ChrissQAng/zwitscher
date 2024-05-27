import { useState } from 'react'
import { backendUrl } from '../api/api'
import { useNavigate } from 'react-router-dom'

const SendVerification = ({ id, token, verified }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const sendEmail = async e => {
    e.preventDefault()

    const res = await fetch(
      `${backendUrl}/api/v1/users/send-email/${id}`,
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

    const userInfo = data.result
    navigate(`/verify-email/${id}`)
  }

  return (
    <>
      {!verified ?
        <div className=" bg-slate-600 m-4 p-4 rounded-lg flex gap-2 items-center justify-center">
          <p className=" text-red-200">Please verify your account!</p>
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
