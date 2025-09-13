import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { auth } from '../services/auth'
import { validator } from '../models/validator'
import { LoadingSpin } from '../components/LoadingSpin'

export const SignUp = () => {
  const { isPending, data } = auth.useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if(!isPending && data?.user) navigate('/')
  }, [isPending, data])

  const handleSignUp = (formData: FormData) => {
    const signUp = async () => {
      const data = validator.sign_up.parse({
        email: formData.get('email'),
        password: formData.get('password'),
        name: formData.get('name')
      })

      auth.signUp.email(data)
    }
    signUp()
  } 

  if(isPending) return <LoadingSpin/>
  
  return <div>
    <form className='bg-neutral-900 text-neutral-50 p-6 rounded-lg m-auto w-[350px] flex flex-col gap-4 mt-[25vh]' action={handleSignUp}>
      <input className='bg-neutral-800 p-4  outline-none rounded-lg' placeholder='Enter your name' type='text' name='name'/>
      <input className='bg-neutral-800 p-4  outline-none rounded-lg' placeholder='Enter a email' type='email' name='email'/>
      <input className='bg-neutral-800 p-4  outline-none rounded-lg' placeholder='Type a password' type='password' name='password'/>
      <input className='bg-neutral-800 p-4  outline-none rounded-lg' placeholder='Confirm your password' type='password' name='password2'/>
      <button className='bg-blue-500 p-4 rounded-lg' type='submit'>Sign-Up</button>
    </form>
  </div>
}