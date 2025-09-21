import { Layout } from '../components/Layout'
import { auth } from '../services/auth'
import { LoadingSpin } from '../components/LoadingSpin'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api_auth } from '../services/api'

type User = {
  name: string,
  email: string,
  id: string
}

export const Profile = () => {
  const [ user, setUser ] = useState<User | null>(null)
  const [ isLoading, setIsLoading ] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await api_auth.get('http://192.168.1.103:3333/api/v1/user')

      if(res.status == 200) {
        const data = await res.data
        setUser(data)
      } 

      if(res?.status) setIsLoading(false)
    }
    fetchUserInfo()
  }, [])

  useEffect(() => {
    if(!isLoading && !user) navigate('/sign-in')
  }, [isLoading, user])

  if(isLoading) return <LoadingSpin/>

  const handleSignOut = async () => {
    const res = await auth.signOut()
    if(res.data?.success) navigate('/sign-in')
  }

  return <Layout>
    <div className='p-6 bg-neutral-950 text-neutral-50'>
      <h1 className='text-neutral-50 text-2xl font-bold pb-4'>Profile Information</h1>
      <div className='min-h-[200px] flex flex-col justify-between'>
        <ul>
          <li className='text-sm'><span className='text-neutral-400'>Name:</span>{' '}{ user?.name }</li>
          <li className='text-sm'><span className='text-neutral-400'>E-mail:</span>{' '}{ user?.email }</li>
          <li className='text-sm'><span className='text-neutral-400'>UserID:</span>{' '}{ user?.id }</li>
        </ul>
        <button onClick={handleSignOut} className='bg-red-600 rounded-lg p-2 w-full mt-4'>Logout</button>
      </div>
    </div>
  </Layout>
}
