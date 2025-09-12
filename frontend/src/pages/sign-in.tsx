import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { auth } from '../services/auth'
import { validator } from '../models/validator'

export const SignIn = () => {
  const { isPending, data } = auth.useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if(!isPending && data?.user) navigate('/')
  }, [isPending, data])

  const handleSignIn = (formData: FormData) => {
    const signIn = async () => {
      const data = validator.sign_in.parse({
        email: formData.get('email'),
        password: formData.get('password')
      })

      auth.signIn.email(data)
    }
    signIn()
  } 
  
  return <div>
    <form className='bg-neutral-900 text-neutral-50 p-6 rounded-lg m-auto w-[350px] flex flex-col gap-4 mt-[25vh]' action={handleSignIn}>
      <input className='bg-neutral-800 p-4  outline-none rounded-lg' placeholder='Enter a email' type='email' name='email'/>
      <input className='bg-neutral-800 p-4  outline-none rounded-lg' placeholder='Type a password' type='password' name='password'/>
      <button className='bg-blue-500 p-4 rounded-lg' type='submit'>Sign-In</button>
    </form>
  </div>
}