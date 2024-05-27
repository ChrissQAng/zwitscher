import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { backendUrl } from '../api/api'
import Navbar from '../components/Navbar'

const VerifyEmail = ({ token }) => {
  const [sixDigitCode, setSixDigitCode] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const { _id } = useParams()
  const verifyUserEmail = async e => {
    e.preventDefault()

    const res = await fetch(`${backendUrl}/api/v1/users/verify-email`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },

      method: 'POST',
      body: JSON.stringify({ userId: _id, sixDigitCode }),
    })

    const data = await res.json()

    if (!data.result)
      return setErrorMessage(data.message || 'Failed verify email')

    setErrorMessage('')
    setSuccessMessage(data.result.message)
    console.log(data)
  }
  return (
    <>
      <Navbar id={_id} />
      <div className=" min-h-screen flex flex-col items-center justify-center">
        <h2 className=" text-lg mb-8">Verify Email</h2>
        <form className="flex flex-col items-center">
          <div>
            <input
              className=" w-72 mb-5 bg-slate-600 text-slate-200 px-4 py-2 rounded-lg"
              id="sixDigitCode"
              type="text"
              placeholder="Enter the code..."
              value={sixDigitCode}
              onChange={e => setSixDigitCode(e.target.value)}
            />
          </div>
          <button
            className=" border-slate-600 border px-4 py-2 rounded-lg duration-300 hover:scale-105 hover:bg-slate-600 hover:text-slate-200"
            onClick={verifyUserEmail}>
            Confirm
          </button>
        </form>
        <p className="m-4" style={{ color: 'red' }}>
          {errorMessage}
        </p>
        {successMessage && (
          <>
            <p className=" m-4" style={{ color: 'green' }}>
              {successMessage}
            </p>
            <Link
              className="m-4 bg-slate-600 text-slate-200 border-slate-600 border px-4 py-2 rounded-lg duration-300 hover:scale-105 hover:bg-slate-200 hover:text-slate-600"
              to={`/dashboard/${_id}`}>
              Go to Dashboard
            </Link>
          </>
        )}
      </div>
    </>
  )
}

export default VerifyEmail
