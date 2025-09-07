import { useState } from 'react'
import { apiwc } from '../service/api'
import { useNavigate } from 'react-router-dom'
import { validateToken } from '../models/validator'

export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  validateToken(navigate)
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await apiwc.post('/auth/sign-in', { email, password })

      if (res.status == 200) {
        setMessage('Successfuly!')
        navigate('/')
      } else {
        setMessage('Error')
      }
    } catch (err) {
      setMessage('Server error')
      console.log(err)
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded-2xl p-8 w-80'
      >
        <h2 className='text-2xl font-bold text-center mb-6'>Sign In</h2>

        <input
          type='email'
          placeholder='E-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full mb-6 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
        >
          Enter
        </button>

        { message && (
          <p className='mt-4 text-center text-sm text-gray-600'>{message}</p>
        )}
      </form>
    </div>
  )
}