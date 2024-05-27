import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { backendUrl } from '../api/api'
import { RefreshContext } from '../../context/Context'

const WriteTweet = ({ token, id, verified }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [text, setText] = useState()
  const { refresh, setRefresh } = useContext(RefreshContext)
  const navigate = useNavigate()
  const postTweet = async e => {
    e.preventDefault()

    const res = await fetch(`${backendUrl}/api/v1/tweets`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({ text, userId: id }),
    })

    const data = await res.json()

    setRefresh(refresh => !refresh)

    if (!data.result)
      return setErrorMessage(data.message || 'Failed to write tweet')

    navigate(`/dashboard/${id}`)
  }

  return (
    <>
      <form className="flex flex-col m-6 p-2 border-2 rounded-lg bg-slate-600">
        <input
          className="text-sm w-full mb-2 bg-slate-200 text-slate-600 px-4 py-2 rounded-lg"
          id="text"
          type="text"
          placeholder="Write something..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        {verified ?
          <button
            className="self-end text-sm border-slate-200 border px-2 py-1 rounded-lg duration-300 hover:scale-105 text-slate-200 hover:bg-slate-200 hover:text-slate-600"
            onClick={postTweet}>
            Post
          </button>
        : <div className="flex items-center justify-between">
            <p className="text-red-200">Please verify your account!</p>
            <button
              className="self-end text-sm border-slate-200 border px-2 py-1 rounded-lg duration-300 hover:scale-105 text-slate-200 hover:bg-slate-200 hover:text-slate-600 pointer-events-none "
              onClick={postTweet}>
              Post
            </button>
          </div>
        }
      </form>
    </>
  )
}

export default WriteTweet
